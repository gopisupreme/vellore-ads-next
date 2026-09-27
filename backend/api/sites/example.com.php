<?php
/*
 * Settings for one site. Copy this file to api/sites/<domain>.php, e.g.
 * api/sites/hyderabadads.co.in.php (without "www."), fill it in, and upload it
 * only to that site's server. Files here other than this one are not in git.
 *
 * The database values are in Hostinger hPanel -> Databases -> Management.
 */
return array(
	'DB_HOST' => 'localhost',
	'DB_SOCKET' => '',
	'DB_NAME' => 'u000000000_dbname',
	'DB_USER' => 'u000000000_dbuser',
	'DB_PASSWORD' => 'the-database-password',

	// shown in page text, e.g. "Top Attractions in Vellore"
	'SITE_CITY' => 'Vellore',
	'SITE_BRAND' => 'VELLOREADS',

	// true shows error details in API replies; only while setting up
	// 'DEBUG' => true,
);
