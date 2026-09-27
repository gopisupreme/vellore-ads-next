<?php
require __DIR__ . '/../_lib/bootstrap.php';
require __DIR__ . '/../_lib/site.php';
require __DIR__ . '/../_lib/mail.php';
require __DIR__ . '/../_lib/account.php';

/*
 * POST {accountType: "listing"|"customer", firstName, lastName, mobile, email,
 *       password, confirmPassword, captcha?} -> {message, emailSent}
 * Creates an account that must verify its email before signing in
 * (PHP site: Users::register). "listing" is the register page's User tab.
 */
handle(function () {
	require_method('POST');
	$data = input();
	$type = field($data, 'accountType') === 'customer' ? 'customer' : 'listing';
	$first = field($data, 'firstName');
	$last = field($data, 'lastName');
	$mobile = field($data, 'mobile');
	$email = strtolower(field($data, 'email'));
	$password = isset($data['password']) ? (string) $data['password'] : '';

	$name = "/^[\\p{L}][\\p{L} .'-]{0,59}$/u";
	if (!preg_match($name, $first)) {
		throw new ApiError(422, 'Please enter your first name (letters only).');
	}
	if (!preg_match($name, $last)) {
		throw new ApiError(422, 'Please enter your last name (letters only).');
	}
	if (!preg_match('/^[6-9]\d{9}$/', $mobile)) {
		throw new ApiError(422, 'Please enter a valid 10 digit mobile number.');
	}
	if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 255) {
		throw new ApiError(422, 'Please enter a valid email address.');
	}
	check_new_password($password, isset($data['confirmPassword']) ? (string) $data['confirmPassword'] : '');
	if (count_rows('users WHERE u_mobile = ?', array($mobile))) {
		throw new ApiError(409, 'That mobile is already taken, Please choose a different one.');
	}
	if (count_rows('users WHERE u_email = ?', array($email))) {
		throw new ApiError(409, 'This email is already registered.');
	}
	check_recaptcha(field($data, 'captcha'));

	$token = new_token();
	$fullName = "$first $last";
	query(
		"INSERT INTO users (u_fullname, u_mobile, u_email, u_type, u_password, u_img, u_date, u_token, is_verified)
		VALUES (?, ?, ?, ?, ?, 'default.png', ?, ?, 0)",
		array($fullName, $mobile, $email, $type, stored_password($password), date('Y-m-d H:i:s'), $token)
	);

	$c = company();
	$link = app_url('verify-email/?token=' . $token);
	$sent = send_mail($email, $fullName, 'Registration Successfully', account_email(
		$fullName,
		'<p>Thanks for registering on our website ' . htmlspecialchars($c['cName']) . '. Now start your classifieds.</p>'
		. '<p>To verify your email address, please click the link below:</p>',
		'Verify Email',
		$link
	));

	reply(array(
		'emailSent' => $sent,
		// while developing no email goes out: the link comes back instead
		'devLink' => !$sent && config('DEBUG') ? $link : null,
		'message' => $sent
			? "You are registered. We have sent a link to $email: open it to verify your email, then sign in."
			: "You are registered, but the verification email to $email could not be sent. Please contact us to activate your account.",
	), 201);
});
