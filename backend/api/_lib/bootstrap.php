<?php
/*
 * Shared start-up for every API endpoint: per-site settings, database,
 * session sign-in and JSON replies. Works on PHP 7.3+.
 *
 * An endpoint looks like:
 *
 *   require __DIR__ . '/_lib/bootstrap.php';
 *   handle(function () {
 *       require_method('GET');
 *       reply(array('items' => db()->query('SELECT ...')->fetchAll()));
 *   });
 */

error_reporting(E_ALL);
ini_set('display_errors', '0');

require __DIR__ . '/auth.php';

/** Ends the request with a JSON error. */
class ApiError extends Exception
{
	public $status;

	public function __construct($status, $message)
	{
		parent::__construct($message);
		$this->status = $status;
	}
}

/* ------------------------------------------------------------------------ */
/* Settings                                                                 */
/* ------------------------------------------------------------------------ */

/**
 * Settings of the site this request came to, from api/sites/<domain>.php
 * (without "www."; 127.0.0.1 counts as localhost). One build serves every
 * site: only that file differs from server to server.
 */
function config($key)
{
	static $values = null;
	if ($values === null) {
		$host = isset($_SERVER['HTTP_HOST']) ? strtolower($_SERVER['HTTP_HOST']) : 'localhost';
		$host = preg_replace(array('/:\d+$/', '/^www\./'), '', $host);
		if ($host === '127.0.0.1') {
			$host = 'localhost';
		}
		$file = __DIR__ . '/../sites/' . $host . '.php';
		if (!preg_match('/^[a-z0-9.-]+$/', $host) || !is_file($file)) {
			throw new ApiError(500, 'This site is not set up: add api/sites/' . $host . '.php (copy example.com.php).');
		}
		$values = array_merge(array(
			'DB_HOST' => 'localhost',
			'DB_PORT' => 3306,
			'DB_SOCKET' => '',
			'DB_NAME' => '',
			'DB_USER' => '',
			'DB_PASSWORD' => '',
			// address of the PHP site: its uploaded files (assets/...) and public pages
			'SITE_URL' => '/',
			// the PHP site's time zone ("today" in the reports)
			'TIMEZONE' => 'Asia/Kolkata',
			'SESSION_NAME' => 'va_admin',
			// address of these pages, for links in emails; empty = the address the request came to
			'APP_URL' => '',
			// true stores new passwords hashed; false keeps them readable by the old PHP site's login
			'HASH_PASSWORDS' => false,
			// Google reCAPTCHA v2 for the register form; leave empty to not use it
			'RECAPTCHA_SITE_KEY' => '',
			'RECAPTCHA_SECRET' => '',
			'DEBUG' => false,
		), require $file);
		date_default_timezone_set($values['TIMEZONE']);
	}
	return array_key_exists($key, $values) ? $values[$key] : null;
}

/* ------------------------------------------------------------------------ */
/* Database                                                                 */
/* ------------------------------------------------------------------------ */

/** @return PDO */
function db()
{
	static $pdo = null;
	if ($pdo === null) {
		$dsn = config('DB_SOCKET') !== ''
			? 'mysql:unix_socket=' . config('DB_SOCKET')
			: 'mysql:host=' . config('DB_HOST') . ';port=' . (int) config('DB_PORT');
		$pdo = new PDO($dsn . ';dbname=' . config('DB_NAME') . ';charset=utf8mb4', config('DB_USER'), config('DB_PASSWORD'), array(
			PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES => false,
		));
	}
	return $pdo;
}

/** Runs a prepared statement: query('SELECT * FROM users WHERE u_id = ?', array($id)) */
function query($sql, array $params = array())
{
	$statement = db()->prepare($sql);
	$statement->execute($params);
	return $statement;
}

/** Number of rows: count_rows('users WHERE u_type = ?', array('admin')) */
function count_rows($from, array $params = array())
{
	return (int) query('SELECT COUNT(*) FROM ' . $from, $params)->fetchColumn();
}

/** Full URL of a page or file on the PHP site, e.g. site_url('connect/edit_list/5') */
function site_url($path = '')
{
	return rtrim(config('SITE_URL'), '/') . '/' . ltrim($path, '/');
}

/** Full URL of a file the PHP site uploaded, e.g. upload_url('assets/uploads/', 'me.jpg') */
function upload_url($folder, $file)
{
	if ($file === null || $file === '') {
		return null;
	}
	return site_url($folder . rawurlencode($file));
}

/* ------------------------------------------------------------------------ */
/* Requests and replies                                                     */
/* ------------------------------------------------------------------------ */

function require_method($method)
{
	if ($_SERVER['REQUEST_METHOD'] !== $method) {
		header('Allow: ' . $method);
		throw new ApiError(405, 'Use ' . $method . ' for this address.');
	}
}

/**
 * The JSON body of a POST. Requiring JSON also stops other websites from
 * posting here with the visitor's cookie: browsers only send that
 * content type cross-site after a CORS check, which this API never allows.
 */
function input()
{
	$type = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';
	if (stripos($type, 'application/json') !== 0) {
		throw new ApiError(415, 'Send the data as JSON.');
	}
	$data = json_decode(file_get_contents('php://input'), true);
	if (!is_array($data)) {
		throw new ApiError(400, 'The data is not valid JSON.');
	}
	return $data;
}

function reply($data, $status = 200)
{
	http_response_code($status);
	header('Content-Type: application/json; charset=utf-8');
	header('Cache-Control: no-store');
	echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PARTIAL_OUTPUT_ON_ERROR);
	exit;
}

/** Runs an endpoint, turning errors into JSON replies. */
function handle($endpoint)
{
	try {
		$endpoint();
	} catch (ApiError $e) {
		reply(array('error' => $e->getMessage()), $e->status);
	} catch (Throwable $e) {
		error_log('API error: ' . $e);
		$debug = false;
		try {
			$debug = (bool) config('DEBUG');
		} catch (Exception $ignored) {
		}
		reply(array('error' => $debug ? $e->getMessage() : 'Something went wrong. Please try again.'), 500);
	}
}
