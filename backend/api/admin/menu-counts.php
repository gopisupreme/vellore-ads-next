<?php
require __DIR__ . '/../_lib/bootstrap.php';

// GET -> {counts}: the numbers beside the admin side menu's links
handle(function () {
	require_method('GET');
	require_user(array('admin'));
	reply(array('counts' => array(
		'users' => count_rows('users'),
		'categories' => count_rows('category'),
		'listings' => count_rows('listing'),
		'matrimony' => count_rows('matrimony'),
		'matrimonyCategories' => count_rows('category_matrimony'),
		'spa' => count_rows('spa'),
		'spaCategories' => count_rows('category_spa'),
		'reviews' => count_rows('reviews'),
		'locations' => count_rows('location'),
		'posts' => count_rows('post_ad'),
		'customers' => count_rows("users WHERE u_type = 'customer'"),
	)));
});
