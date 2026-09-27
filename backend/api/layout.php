<?php
require __DIR__ . '/_lib/bootstrap.php';
require __DIR__ . '/_lib/site.php';

/*
 * GET -> {site, categories, areas, visitors}: what the public pages' header
 * and footer show (PHP site: templates/header-index.php, footer.php).
 * Counts the visitor once per two hours, as the PHP site's Pages::counter().
 */
handle(function () {
	require_method('GET');
	$c = company();

	if (!isset($_COOKIE['visitors'])) {
		query('UPDATE page SET page_opens = page_opens + 1 WHERE id = 1');
		setcookie('visitors', '1', array('expires' => time() + 7200, 'path' => '/', 'httponly' => true, 'samesite' => 'Lax'));
	}

	// the Google map is stored as <iframe> HTML: only its https src is passed on
	$map = null;
	if (preg_match('/src="(https:\/\/www\.google\.com\/maps\/embed[^"]*)"/', (string) $c['map'], $m)) {
		$map = html_entity_decode($m[1]);
	}

	reply(array(
		'site' => array(
			'name' => $c['cName'],
			'city' => $c['city'],
			'logo' => upload_url('assets/images/services/', $c['logo']),
			'mobile' => $c['mobile'],
			'phone' => $c['phone'],
			'siteUrl' => site_url(),
			'showHeadlines' => (string) $c['blog'] === '1',
			'social' => array(
				'facebook' => $c['facebook'],
				'instagram' => $c['instagram'],
				'twitter' => $c['twitter'],
				'linkedin' => $c['linkedin'],
				'whatsapp' => $c['whatsapp'],
			),
			'map' => $map,
			// the register form shows Google's "I'm not a robot" box when set
			'recaptchaSiteKey' => config('RECAPTCHA_SITE_KEY') ?: null,
		),
		'categories' => query("SELECT c_id AS id, c_name AS name FROM category WHERE c_status = 'active' ORDER BY c_id")->fetchAll(),
		'areas' => query("SELECT DISTINCT loc_name FROM location WHERE loc_status = 'active' ORDER BY loc_name")->fetchAll(PDO::FETCH_COLUMN),
		'visitors' => (int) query('SELECT page_opens FROM page WHERE id = 1')->fetchColumn(),
	));
});
