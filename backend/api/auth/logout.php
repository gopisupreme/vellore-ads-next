<?php
require __DIR__ . '/../_lib/bootstrap.php';

// POST -> {ok}
handle(function () {
	require_method('POST');
	start_session();
	$_SESSION = array();
	$cookie = session_get_cookie_params();
	setcookie(session_name(), '', array(
		'expires' => time() - 3600,
		'path' => $cookie['path'],
		'secure' => $cookie['secure'],
		'httponly' => true,
		'samesite' => 'Lax',
	));
	session_destroy();
	reply(array('ok' => true));
});
