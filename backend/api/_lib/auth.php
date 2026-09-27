<?php
/*
 * Sign-in with the PHP session. Accounts are the `users` table shared with
 * the PHP site; u_type is the role: admin, listing, customer or recruiter.
 */

function start_session()
{
	if (session_status() === PHP_SESSION_ACTIVE) {
		return;
	}
	$https = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
	session_name(config('SESSION_NAME'));
	session_set_cookie_params(array(
		'lifetime' => 0,
		'path' => '/',
		'secure' => $https,
		'httponly' => true,
		'samesite' => 'Lax',
	));
	session_start();
}

/**
 * The old PHP site keeps passwords as plain text, so both forms are accepted
 * here. Stored passwords are not changed: the old site would stop accepting
 * a hashed one.
 */
function password_matches($given, $stored)
{
	if ($stored === null || $stored === '') {
		return false;
	}
	if (password_get_info($stored)['algo']) {
		return password_verify($given, $stored);
	}
	return hash_equals($stored, $given);
}

/**
 * A password as the users table keeps it. The old PHP site still signs
 * people in by comparing plain text, so hashing stays off (HASH_PASSWORDS)
 * until that site no longer has a login.
 */
function stored_password($password)
{
	return config('HASH_PASSWORDS') ? password_hash($password, PASSWORD_DEFAULT) : $password;
}

/** Address of a page of this app, for links in emails: app_url('verify-email/?token=...') */
function app_url($path = '')
{
	$base = config('APP_URL');
	if (!$base) {
		$https = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
		$base = ($https ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'] . '/';
	}
	return rtrim($base, '/') . '/' . ltrim($path, '/');
}

/** A new random token for an email link. */
function new_token()
{
	return bin2hex(random_bytes(32));
}

/** The fields of a user the front end may see. */
function public_user(array $row)
{
	return array(
		'id' => (int) $row['u_id'],
		'name' => $row['u_fullname'],
		'email' => $row['u_email'],
		'role' => $row['u_type'],
		// "default.png" is what the PHP site stores for "no photo"
		'avatar' => $row['u_img'] === 'default.png' ? null : upload_url('assets/uploads/', $row['u_img']),
	);
}

/** The signed-in user's row, or null. */
function current_user()
{
	static $user = false;
	if ($user === false) {
		start_session();
		$user = null;
		if (isset($_SESSION['uid'])) {
			$row = query('SELECT * FROM users WHERE u_id = ?', array($_SESSION['uid']))->fetch();
			$user = $row ?: null;
		}
	}
	return $user;
}

/**
 * Stops unless someone is signed in, and (when given) has one of the roles.
 * @return array the user's row
 */
function require_user(array $roles = array())
{
	$user = current_user();
	if ($user === null) {
		throw new ApiError(401, 'Please sign in.');
	}
	if ($roles && !in_array($user['u_type'], $roles, true)) {
		throw new ApiError(403, 'Your account cannot do this.');
	}
	return $user;
}
