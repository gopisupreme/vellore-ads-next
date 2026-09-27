<?php
require __DIR__ . '/../_lib/bootstrap.php';

// GET -> {user}, or 401 when nobody is signed in
handle(function () {
	require_method('GET');
	reply(array('user' => public_user(require_user())));
});
