<?php
/* GET api/health.php -- is PHP running and can it reach the database? */
require __DIR__ . '/_lib/bootstrap.php';

handle(function () {
	$tables = (int) db()->query('SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE()')->fetchColumn();
	reply(array(
		'ok' => true,
		'php' => PHP_VERSION,
		'database' => setting('DB_NAME'),
		'tables' => $tables,
		'site' => array('city' => setting('SITE_CITY'), 'brand' => setting('SITE_BRAND')),
	));
});
