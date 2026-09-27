<?php
/*
 * Settings for one site. Copy this file to api/sites/<domain>.php, e.g.
 * api/sites/velloreads.com.php (without "www."), fill it in, and upload it
 * only to that site's server. Files here other than this one are not in git.
 *
 * The database values are in Hostinger hPanel -> Databases -> Management.
 */
return array(
	'DB_HOST' => 'localhost',
	'DB_NAME' => 'u000000000_dbname',
	'DB_USER' => 'u000000000_dbuser',
	'DB_PASSWORD' => 'the-database-password',

	// address of the PHP site (its uploaded images and public pages);
	// "/" when this app is uploaded to the same site as the PHP site
	// 'SITE_URL' => '/',

	// the mailbox that sends the site's emails (Hostinger: hPanel -> Emails);
	// leave SMTP_HOST out to send nothing
	// 'SMTP_HOST' => 'smtp.hostinger.com',
	// 'SMTP_PORT' => 465,
	// 'SMTP_SECURE' => 'ssl',
	// 'SMTP_USER' => 'no-reply@example.com',
	// 'SMTP_PASS' => 'the-mailbox-password',

	// Google reCAPTCHA v2 ("I'm not a robot") for the register form, from
	// google.com/recaptcha/admin with this domain added; leave out to not use it
	// 'RECAPTCHA_SITE_KEY' => '',
	// 'RECAPTCHA_SECRET' => '',

	// true shows error details in API replies; only while setting up
	// 'DEBUG' => true,
);
