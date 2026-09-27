<?php
/* GET api/health.php -- is PHP running and can it reach this site's database? */
require __DIR__ . '/_lib/bootstrap.php';

handle(function () {
	require_method('GET');
	$tables = (int) db()->query('SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE()')->fetchColumn();
	reply(array(
		'ok' => true,
		'php' => PHP_VERSION,
		'database' => config('DB_NAME'),
		'tables' => $tables,
	));
});
