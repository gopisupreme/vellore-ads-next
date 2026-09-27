<?php
require __DIR__ . '/_lib/bootstrap.php';

// GET -> {site}: name, city and logos from the companyinfo table
handle(function () {
	require_method('GET');
	$row = query('SELECT * FROM companyinfo WHERE id = 1')->fetch();
	if (!$row) {
		throw new ApiError(500, 'The companyinfo table has no row with id 1.');
	}
	reply(array('site' => array(
		'name' => $row['cName'],
		'shortName' => $row['sName'],
		'city' => $row['city'],
		'website' => $row['web'],
		// the PHP site, for links to its pages
		'siteUrl' => site_url(),
		'logo' => upload_url('assets/images/services/', $row['logo']),
		'adminLogo' => upload_url('assets/images/services/', $row['adminLogo']),
	)));
});
