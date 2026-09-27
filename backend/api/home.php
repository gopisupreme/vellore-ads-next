<?php
require __DIR__ . '/_lib/bootstrap.php';
require __DIR__ . '/_lib/site.php';

/*
 * GET -> the home page's data (PHP site: views/pages/index.php): headlines,
 * ads, theatres, news, service counts, top trending listings, videos and
 * attractions. Everything else on the page is fixed text in the front end.
 */
handle(function () {
	require_method('GET');
	$c = company();
	$city = $c['city'];

	$headlines = array();
	if ((string) $c['blog'] === '1') {
		$headlines = query(
			"SELECT b.b_id AS id, b.b_title AS title, cat.c_name AS category
			FROM blog b LEFT JOIN category cat ON cat.c_id = b.b_cate WHERE b.b_status = '1'"
		)->fetchAll();
	}

	$news = array_map(function ($r) {
		return array(
			'id' => (int) $r['b_id'],
			'title' => $r['b_title'],
			'image' => upload_url('assets/images/services/', $r['b_image']),
			'url' => site_url('blog/' . rawurlencode(str_replace(' ', '-', $r['b_title'])) . '/' . $r['b_id']),
		);
	}, query("SELECT b_id, b_title, b_image FROM blog WHERE b_status = '1' ORDER BY b_id DESC LIMIT 6")->fetchAll());

	// "Find your Services": listings of the city whose category contains a word
	$serviceCounts = array();
	foreach (array(
		'hotels' => array('%Hotel%', '%Resort%'),
		'hospitals' => array('%Hospital%'),
		'transport' => array('%Transport%'),
		'property' => array('%Property%'),
		'automobiles' => array('%Automobile%'),
		'electronics' => array('%Electronics%'),
		'education' => array('%Education%'),
		'sports' => array('%Sport%'),
	) as $key => $patterns) {
		$like = implode(' OR ', array_fill(0, count($patterns), 'l_category LIKE ?'));
		$serviceCounts[$key] = count_rows("listing WHERE ($like) AND l_city = ?", array_merge($patterns, array($city)));
	}

	$trending = array();
	$rows = query(
		"SELECT l.l_id, l.l_title, l.l_category, l.l_address, l.l_visitor, l.l_img, l.l_city,
			cat.c_wideImage,
			(SELECT COUNT(*) FROM reviews r WHERE r.r_postid = l.l_id AND r.r_status = 'active') AS reviews,
			(SELECT AVG(r.r_rating) FROM reviews r WHERE r.r_postid = l.l_id AND r.r_status = 'active') AS rating,
			(SELECT COUNT(*) FROM favorites_likes f WHERE f.l_id = l.l_id) AS likes
		FROM listing l LEFT JOIN category cat ON cat.c_name = l.l_category
		WHERE l.l_type != 'free' AND l.l_status = 'active' AND l.l_city = ?
		ORDER BY l.l_visitor DESC LIMIT 8",
		array($city)
	)->fetchAll();
	foreach ($rows as $r) {
		// the category's wide picture, else the listing's own, else the default (Company_Model::get_categroy_thumbnail_url)
		if ($r['c_wideImage'] !== null && $r['c_wideImage'] !== '') {
			$image = upload_url('assets/advertise/', $r['c_wideImage']);
		} elseif ($r['l_img'] !== null && $r['l_img'] !== '') {
			$image = upload_url('assets/uploads/', $r['l_img']);
		} else {
			$image = null;
		}
		$trending[] = array(
			'id' => (int) $r['l_id'],
			'title' => $r['l_title'],
			'category' => $r['l_category'],
			'address' => $r['l_address'],
			'views' => (int) $r['l_visitor'],
			'reviews' => (int) $r['reviews'],
			'likes' => (int) $r['likes'],
			'rating' => number_format((float) $r['rating'], 1),
			'image' => $image,
			'url' => listing_url($r['l_city'], $r['l_title'], $r['l_id']),
		);
	}

	reply(array(
		'city' => $city,
		'headlines' => $headlines,
		'ads' => running_ads(1, 1),
		'cinemas' => query('SELECT c_id AS id, c_title AS title, c_url AS url, c_img AS image FROM cinemas ORDER BY c_id')->fetchAll(),
		'news' => $news,
		'serviceCounts' => $serviceCounts,
		'trending' => $trending,
		'videos' => query("SELECT yv_id AS id, tv_embed AS youtubeId, yv_name AS name FROM youtube_videos WHERE yv_status = '1' ORDER BY yv_id DESC")->fetchAll(),
		'attractions' => array_map(function ($r) {
			return array(
				'id' => (int) $r['ta_id'],
				'name' => $r['ta_name'],
				'image' => upload_url('assets/images/services/', $r['ta_image']),
				'url' => $r['ta_url'],
			);
		}, query("SELECT ta_id, ta_name, ta_image, ta_url FROM top_attractions WHERE ta_status = '1' ORDER BY RAND()")->fetchAll()),
	));
});
