<?php
require __DIR__ . '/../_lib/bootstrap.php';
require __DIR__ . '/../_lib/site.php';
require __DIR__ . '/../_lib/mail.php';
require __DIR__ . '/../_lib/account.php';

/*
 * POST {email} -> {message}: emails a link to choose a new password, valid
 * for one hour. (The PHP site instead replaced the password with a random
 * one and mailed it, so anyone could reset anyone's password.)
 * The reply is the same whether or not the email has an account.
 */
const RESET_LINK_HOURS = 1;

handle(function () {
	require_method('POST');
	$email = strtolower(field(input(), 'email'));
	if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		throw new ApiError(422, 'Please enter a valid email address.');
	}

	$user = query('SELECT u_id, u_fullname FROM users WHERE u_email = ? LIMIT 1', array($email))->fetch();
	$devLink = null;
	if ($user) {
		// "<token>.<expires unix time>" in u_token; a new link replaces an older one
		$token = new_token() . '.' . (time() + RESET_LINK_HOURS * 3600);
		query('UPDATE users SET u_token = ? WHERE u_id = ?', array($token, $user['u_id']));
		$sent = send_mail($email, $user['u_fullname'], 'Password reset request', account_email(
			$user['u_fullname'],
			'<p>We received a request to reset your password. The link below works for one hour.</p>'
			. '<p>If you did not ask for this, ignore this email: your password stays the same.</p>',
			'Choose a new password',
			app_url('reset-password/?token=' . $token)
		));
		// while developing no email goes out: the link comes back instead
		if (!$sent && config('DEBUG')) {
			$devLink = app_url('reset-password/?token=' . $token);
		}
	} else {
		usleep(300000); // answers take as long either way
	}
	reply(array(
		'message' => "If $email has an account, we have sent it a link to choose a new password. Please check your email.",
		'devLink' => $devLink,
	));
});
