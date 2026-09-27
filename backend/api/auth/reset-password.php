<?php
require __DIR__ . '/../_lib/bootstrap.php';
require __DIR__ . '/../_lib/site.php';
require __DIR__ . '/../_lib/account.php';

// POST {token, password, confirmPassword} -> {message}: the link from forgot-password.php
handle(function () {
	require_method('POST');
	$data = input();
	$token = field($data, 'token');
	$invalid = 'This link is invalid or has expired. Please ask for a new one.';
	if (!preg_match('/^[a-f0-9]{64}\.(\d+)$/', $token, $m) || (int) $m[1] < time()) {
		throw new ApiError(400, $invalid);
	}
	$user = query('SELECT u_id FROM users WHERE u_token = ?', array($token))->fetch();
	if (!$user) {
		throw new ApiError(400, $invalid);
	}
	$password = isset($data['password']) ? (string) $data['password'] : '';
	check_new_password($password, isset($data['confirmPassword']) ? (string) $data['confirmPassword'] : '');

	// the link came through the account's email, so the email is verified too
	query('UPDATE users SET u_password = ?, u_token = NULL, is_verified = 1 WHERE u_id = ?', array(stored_password($password), $user['u_id']));
	reply(array('message' => 'Your password has been changed. You can sign in with it now.'));
});
