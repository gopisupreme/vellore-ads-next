<?php
require __DIR__ . '/../_lib/bootstrap.php';

// POST {token} -> {message}: the link in the registration email (PHP site: Users::verify)
handle(function () {
	require_method('POST');
	$data = input();
	$token = isset($data['token']) ? (string) $data['token'] : '';
	// reset tokens ("<token>.<expiry>") are not verification tokens
	if (!preg_match('/^[a-f0-9]{64}$/', $token)) {
		throw new ApiError(400, 'Sorry, the link is invalid or has expired!');
	}
	$user = query('SELECT u_id FROM users WHERE u_token = ?', array($token))->fetch();
	if (!$user) {
		throw new ApiError(400, 'Sorry, the link is invalid or has expired!');
	}
	query('UPDATE users SET u_token = NULL, is_verified = 1 WHERE u_id = ?', array($user['u_id']));
	reply(array('message' => 'Email ID verified successfully! You can sign in now.'));
});
