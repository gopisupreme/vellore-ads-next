<?php
/*
 * Sign-up helpers: validation, reCAPTCHA and the account emails.
 * Include after bootstrap.php, site.php and mail.php.
 */

/** The field of a JSON body as trimmed text. */
function field(array $data, $name)
{
	return isset($data[$name]) ? trim((string) $data[$name]) : '';
}

/** A password rule of the PHP site: 6 to 15 characters, typed twice. */
function check_new_password($password, $confirm)
{
	$length = mb_strlen($password);
	if ($length < 6 || $length > 15) {
		throw new ApiError(422, 'The password needs 6 to 15 characters.');
	}
	if ($password !== $confirm) {
		throw new ApiError(422, 'The two passwords do not match.');
	}
}

/** Checks Google's "I'm not a robot" answer when the site uses reCAPTCHA. */
function check_recaptcha($answer)
{
	$secret = config('RECAPTCHA_SECRET');
	if (!$secret) {
		return;
	}
	if ($answer === '') {
		throw new ApiError(422, 'Please tick "I\'m not a robot".');
	}
	$context = stream_context_create(array('http' => array(
		'method' => 'POST',
		'header' => 'Content-Type: application/x-www-form-urlencoded',
		'content' => http_build_query(array('secret' => $secret, 'response' => $answer, 'remoteip' => $_SERVER['REMOTE_ADDR'])),
		'timeout' => 10,
	)));
	$reply = json_decode((string) @file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $context), true);
	if (empty($reply['success'])) {
		throw new ApiError(422, 'The "I\'m not a robot" check failed. Please try again.');
	}
}

/** An email in the site's style: greeting, message (HTML), a button and the signature. */
function account_email($name, $message, $buttonText = null, $buttonUrl = null)
{
	$c = company();
	$h = function ($text) {
		return htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
	};
	$button = $buttonUrl
		? '<p><a href="' . $h($buttonUrl) . '" style="display:inline-block;padding:10px 18px;background:#4CAF50;color:#fff;text-decoration:none;border-radius:3px">' . $h($buttonText) . '</a></p>'
		. '<p style="font-size:12px;color:#777">Or open this address: ' . $h($buttonUrl) . '</p>'
		: '';
	return '<div style="font-family:Arial,sans-serif;font-size:14px;color:#333">'
		. '<p>Dear ' . $h($name) . ',</p>' . $message . $button
		. '<p>For further assistance, reach us at ' . $h($c['mobile']) . '</p>'
		. '<p>--<br>Sincerely,<br>Technical &amp; Development Team<br>' . $h($c['cName']) . '</p></div>';
}
