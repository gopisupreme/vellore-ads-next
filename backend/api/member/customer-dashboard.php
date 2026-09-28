<?php
require __DIR__ . '/../_lib/bootstrap.php';
require __DIR__ . '/../_lib/site.php';
require __DIR__ . '/../_lib/member.php';

/*
 * GET -> the customer's dashboard (PHP site: customer/dashboard): their
 * account details, and which profile details are still missing.
 */
handle(function () {
	require_method('GET');
	$u = require_user(array('customer'));

	$missing = array();
	foreach (array('u_mobile' => 'Mobile number', 'u_address' => 'Address', 'u_dob' => 'Date of birth', 'u_gender' => 'Gender') as $column => $label) {
		if ($u[$column] === null || trim((string) $u[$column]) === '' || $u[$column] === '0000-00-00') {
			$missing[] = $label;
		}
	}

	reply(array(
		'profile' => array(
			'name' => $u['u_fullname'],
			'email' => $u['u_email'],
			'mobile' => $u['u_mobile'],
			'address' => $u['u_address'],
			'joinedOn' => date_only($u['u_date']),
			'verified' => (string) $u['is_verified'] === '1',
		),
		'missing' => $missing,
	));
});
