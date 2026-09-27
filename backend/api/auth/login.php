<?php
require __DIR__ . '/../_lib/bootstrap.php';

// POST {email, password} -> {user}
handle(function () {
	require_method('POST');
	$data = input();
	$email = isset($data['email']) ? trim((string) $data['email']) : '';
	$password = isset($data['password']) ? (string) $data['password'] : '';
	if ($email === '' || $password === '') {
		throw new ApiError(422, 'Enter your email and password.');
	}

	$row = query('SELECT * FROM users WHERE u_email = ? LIMIT 1', array($email))->fetch();
	if (!$row || !password_matches($password, $row['u_password'])) {
		usleep(300000); // slows down password guessing
		throw new ApiError(401, 'The email or password is wrong.');
	}
	if ((string) $row['is_verified'] === '0') {
		throw new ApiError(403, 'Please verify your email before signing in.');
	}

	start_session();
	session_regenerate_id(true);
	$_SESSION['uid'] = (int) $row['u_id'];
	reply(array('user' => public_user($row)));
});
