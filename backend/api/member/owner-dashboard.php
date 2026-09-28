<?php
require __DIR__ . '/../_lib/bootstrap.php';
require __DIR__ . '/../_lib/site.php';
require __DIR__ . '/../_lib/member.php';

/*
 * GET -> the business owner's dashboard (PHP site: users/dashboard): counts,
 * the five newest listings and posts with their payment and plan.
 * Reviews and ratings are those the owner's listings / posts received.
 */
handle(function () {
	require_method('GET');
	$user = require_user(array('listing'));
	$uid = (int) $user['u_id'];

	list($listingReviews, $listingRating) = owner_review_stats('listing', 'reviews', $uid);
	list($postReviews, $postRating) = owner_review_stats('post_ad', 'reviews_post', $uid);

	reply(array(
		'stats' => array(
			'listings' => count_rows('listing WHERE l_userid = ?', array($uid)),
			'listingReviews' => $listingReviews,
			'listingRating' => $listingRating,
			'posts' => count_rows('post_ad WHERE l_userid = ?', array($uid)),
			'postReviews' => $postReviews,
			'postRating' => $postRating,
		),
		'listings' => owner_items('listing', 'reviews', $uid, 5),
		'posts' => owner_items('post_ad', 'reviews_post', $uid, 5),
	));
});
