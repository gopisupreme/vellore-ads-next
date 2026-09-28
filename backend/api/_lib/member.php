<?php
/*
 * The signed-in members' dashboards (business owners, customers, recruiters).
 * Include after bootstrap.php and site.php.
 */

/** "2024-03-01 10:00:00" -> "2024-03-01"; null for empty dates ("0000-00-00 ..." included). */
function date_only($value)
{
	$date = substr((string) $value, 0, 10);
	return $date === '' || $date === '0000-00-00' ? null : $date;
}

/** An average review rating as the PHP site shows it: "4.5", or "0.0" without reviews. */
function rating_text($avg)
{
	return number_format((float) $avg, 1);
}

/**
 * The latest rows of a listing-like table (listing or post_ad) of one owner,
 * with the rating and review count from its reviews table.
 */
function owner_items($table, $reviewTable, $userId, $limit)
{
	$rows = query(
		"SELECT t.l_id, t.l_title, t.l_city, t.l_adddate, t.l_visitor, t.l_status, t.l_renewal, t.l_payment, t.l_type,
			(SELECT AVG(r.r_rating) FROM $reviewTable r WHERE r.r_postid = t.l_id) AS rating
		FROM $table t WHERE t.l_userid = ? ORDER BY t.l_adddate DESC, t.l_id DESC LIMIT " . (int) $limit,
		array($userId)
	)->fetchAll();
	return array_map(function ($r) use ($table) {
		return array(
			'id' => (int) $r['l_id'],
			'title' => $r['l_title'],
			// a post's public page has no id in its address (PHP site: post-free-ads)
			'url' => $table === 'listing' ? listing_url($r['l_city'], $r['l_title'], $r['l_id']) : site_url(rawurlencode($r['l_city']) . '/' . str_replace(' ', '-', $r['l_title'])),
			'addedOn' => date_only($r['l_adddate']),
			'rating' => rating_text($r['rating']),
			'views' => (int) $r['l_visitor'],
			'active' => $r['l_status'] === 'active',
			'renewalOn' => date_only($r['l_renewal']),
			'paid' => (string) $r['l_payment'] === '1',
			'plan' => $r['l_type'],
		);
	}, $rows);
}

/** How many reviews an owner's items got, and their average rating. */
function owner_review_stats($table, $reviewTable, $userId)
{
	$row = query(
		"SELECT COUNT(r.r_id) AS reviews, AVG(r.r_rating) AS rating
		FROM $reviewTable r JOIN $table t ON t.l_id = r.r_postid WHERE t.l_userid = ?",
		array($userId)
	)->fetch();
	return array((int) $row['reviews'], rating_text($row['rating']));
}
