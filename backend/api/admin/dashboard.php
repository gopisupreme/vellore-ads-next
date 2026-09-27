<?php
require __DIR__ . '/../_lib/bootstrap.php';
require __DIR__ . '/../_lib/listings.php';

// GET -> {stats, topListings}: the admin dashboard (PHP site: connect/dashboard)
handle(function () {
	require_method('GET');
	require_user(array('admin'));

	$today = date('Y-m-d');
	$tomorrow = date('Y-m-d', strtotime('+1 day'));
	$stats = array(
		'listings' => count_rows('listing'),
		'users' => count_rows('users'),
		'categories' => count_rows("category WHERE c_status = 'active'"),
		'reviews' => count_rows('reviews'),
		'customers' => count_rows("users WHERE u_type = 'customer'"),
		'posts' => count_rows('post_ad'),
		'postReviews' => count_rows('reviews_post'),
		'todayListings' => count_rows('listing WHERE l_adddate = ?', array($today)),
		'newUsers' => count_rows('users WHERE u_date >= ? AND u_date < ?', array($today, $tomorrow)),
		// visitor_counter.date is text (Y-m-d); a range uses its index
		'todayViews' => count_rows('visitor_counter WHERE date >= ? AND date < ?', array($today, $tomorrow)),
	);

	$rows = query(LISTING_SELECT . " WHERE l.l_status = 'active' ORDER BY l.l_visitor DESC LIMIT 100")->fetchAll();
	reply(array(
		'stats' => $stats,
		'topListings' => array_map('listing_row', $rows),
	));
});
