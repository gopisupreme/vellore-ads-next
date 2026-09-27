<?php
/*
 * Shared start of every API file: settings, the database and JSON replies.
 * Runs on PHP 7.3+ (the Hostinger servers).
 *
 * Settings are read in this order, later ones winning:
 *   1. the defaults below (local MAMP)
 *   2. api/sites/<domain>.php  for the domain the site is opened at
 *                              ("www." and the port are ignored)
 *   3. environment variables with the same names
 * Copy api/sites/example.com.php for each site; those files are not in git.
 */

error_reporting(E_ALL);
ini_set('display_errors', '0');

function site_domain()
{
	$host = isset($_SERVER['HTTP_HOST']) ? strtolower($_SERVER['HTTP_HOST']) : '';
	$host = preg_replace('/:\d+$/', '', $host);
	$host = preg_replace('/^www\./', '', $host);
	return preg_match('/^[a-z0-9]([a-z0-9.-]*[a-z0-9])?$/', $host) && strpos($host, '..') === false ? $host : '';
}

function setting($name)
{
	static $values = null;
	if ($values === null) {
		$values = array(
			'DB_HOST' => 'localhost',
			'DB_PORT' => 3306,
			'DB_SOCKET' => file_exists('/Applications/MAMP/tmp/mysql/mysql.sock') ? '/Applications/MAMP/tmp/mysql/mysql.sock' : '',
			'DB_NAME' => 'velloreads',
			'DB_USER' => 'root',
			'DB_PASSWORD' => 'root',
			'SITE_CITY' => 'Vellore',
			'SITE_BRAND' => 'VELLOREADS',
			'DEBUG' => false,
		);
		$file = __DIR__ . '/../sites/' . site_domain() . '.php';
		if (site_domain() !== '' && is_file($file)) {
			$values = array_merge($values, (array) include $file);
		}
	}
	$env = getenv($name);
	if ($env !== false) {
		return $env;
	}
	return array_key_exists($name, $values) ? $values[$name] : null;
}

/** The PDO connection, opened on first use. */
function db()
{
	static $pdo = null;
	if ($pdo === null) {
		$dsn = setting('DB_SOCKET') !== ''
			? 'mysql:unix_socket=' . setting('DB_SOCKET')
			: 'mysql:host=' . setting('DB_HOST') . ';port=' . (int) setting('DB_PORT');
		$pdo = new PDO($dsn . ';dbname=' . setting('DB_NAME') . ';charset=utf8', setting('DB_USER'), setting('DB_PASSWORD'), array(
			PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES => false,
		));
	}
	return $pdo;
}

/** Sends $data as JSON and stops. */
function reply($data, $status = 200)
{
	http_response_code($status);
	header('Content-Type: application/json; charset=utf-8');
	header('Cache-Control: no-store');
	echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE);
	exit;
}

/** Runs an endpoint; any uncaught error becomes a JSON 500 (details only when DEBUG is on). */
function handle($endpoint)
{
	try {
		$endpoint();
	} catch (Throwable $e) {
		error_log('[api] ' . $e->getMessage());
		reply(array('error' => setting('DEBUG') ? $e->getMessage() : 'Server error'), 500);
	}
}
