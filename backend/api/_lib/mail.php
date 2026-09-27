<?php
/*
 * Sends HTML email through the site's SMTP mailbox (SMTP_* settings in
 * api/sites/<domain>.php, e.g. Hostinger: smtp.hostinger.com, 465, ssl).
 * Without SMTP_HOST nothing is sent, so local copies never email anyone.
 */

/** @return bool whether the server accepted the message */
function send_mail($toEmail, $toName, $subject, $html, $replyTo = null)
{
	$host = config('SMTP_HOST');
	if (!$host) {
		error_log("Mail not sent (no SMTP_HOST): $subject to $toEmail");
		return false;
	}
	$port = (int) (config('SMTP_PORT') ?: 465);
	$secure = config('SMTP_SECURE') ?: 'ssl';
	$user = config('SMTP_USER');
	$from = config('SMTP_FROM') ?: $user;
	$fromName = company()['cName'];

	$socket = @stream_socket_client(($secure === 'ssl' ? 'ssl://' : 'tcp://') . $host . ':' . $port, $errno, $error, 20);
	if (!$socket) {
		error_log("SMTP connect to $host failed: $error");
		return false;
	}
	stream_set_timeout($socket, 20);
	$read = function () use ($socket) {
		$reply = '';
		while (($line = fgets($socket, 515)) !== false) {
			$reply .= $line;
			if (isset($line[3]) && $line[3] === ' ') {
				break;
			}
		}
		return $reply;
	};
	$say = function ($command, $expect) use ($socket, $read) {
		fwrite($socket, $command . "\r\n");
		$reply = $read();
		if (strpos($reply, (string) $expect) !== 0) {
			throw new RuntimeException('SMTP: ' . trim($reply));
		}
	};
	$encode = function ($text) {
		return '=?UTF-8?B?' . base64_encode($text) . '?=';
	};

	try {
		$read();
		$say('EHLO ' . gethostname(), 250);
		if ($secure === 'tls') {
			$say('STARTTLS', 220);
			stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
			$say('EHLO ' . gethostname(), 250);
		}
		$say('AUTH LOGIN', 334);
		$say(base64_encode($user), 334);
		$say(base64_encode(config('SMTP_PASS')), 235);
		$say("MAIL FROM:<$from>", 250);
		$say("RCPT TO:<$toEmail>", 250);
		$say('DATA', 354);
		$headers = array(
			'Date: ' . date('r'),
			'From: ' . $encode($fromName) . " <$from>",
			'To: ' . $encode($toName) . " <$toEmail>",
			'Subject: ' . $encode($subject),
			'MIME-Version: 1.0',
			'Content-Type: text/html; charset=UTF-8',
			'Content-Transfer-Encoding: base64',
		);
		if ($replyTo) {
			$headers[] = "Reply-To: <$replyTo>";
		}
		$say(implode("\r\n", $headers) . "\r\n\r\n" . chunk_split(base64_encode($html)) . "\r\n.", 250);
		$say('QUIT', 221);
		return true;
	} catch (RuntimeException $e) {
		error_log($e->getMessage());
		return false;
	} finally {
		fclose($socket);
	}
}
