<?php
require __DIR__ . '/_lib/bootstrap.php';
require __DIR__ . '/_lib/site.php';
require __DIR__ . '/_lib/mail.php';

/*
 * POST {name, mobile, email, service} -> {message}: the "Quick service
 * request" form. Saved in quick_service (the admin's enquiries), then the
 * visitor gets a thank-you mail and the site a notice. reply 0 = not answered yet
 * (PHP site: Manage_Ajax::indexQuickEnquiry).
 */
handle(function () {
	require_method('POST');
	$data = input();
	$field = function ($name) use ($data) {
		return isset($data[$name]) ? trim((string) $data[$name]) : '';
	};
	$name = $field('name');
	$mobile = $field('mobile');
	$email = $field('email');
	$service = $field('service');

	if ($name === '' || mb_strlen($name) > 75) {
		throw new ApiError(422, 'Please enter your name.');
	}
	if (!preg_match('/^[6-9]\d{9}$/', $mobile)) {
		throw new ApiError(422, 'Please enter a valid 10 digit mobile number.');
	}
	if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 150) {
		throw new ApiError(422, 'Please enter a valid email address.');
	}
	if ($service === '' || mb_strlen($service) > 500) {
		throw new ApiError(422, 'Please tell us the service you need.');
	}

	query(
		"INSERT INTO quick_service (name, mobile, email, message, date, time, month, year, reply, status)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, 1)",
		array($name, $mobile, $email, $service, date('Y-m-d'), date('H:i:s'), (int) date('m'), (int) date('Y'))
	);

	$c = company();
	$h = function ($text) {
		return htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
	};
	$signature = '<br>--<br>Sincerely,<br>Technical &amp; Development Team';
	send_mail($email, $name, 'Quick Enquiry',
		'Dear ' . $h($name) . ',<br><br>Thanks for contacting ' . $h($c['cName']) . ', we will contact you soon.<br><br>'
		. 'For further assist reach us on ' . $h($c['mobile']) . '<br>' . $signature);
	send_mail($c['email'], $c['cName'], 'Quick Enquiry',
		'Dear ' . $h($c['cName']) . ',<br><br>Quick Enquiry from ' . $h($name) . ', for ' . $h($service)
		. ' and contact no is ' . $h($mobile) . '.<br>' . $signature, $email);

	reply(array('message' => "Thanks for contacting us, we'll get back to you soon."));
});
