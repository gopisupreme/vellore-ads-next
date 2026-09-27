<?php
require __DIR__ . '/../_lib/bootstrap.php';
require __DIR__ . '/../_lib/site.php';

/*
 * GET ?type=title&q=hos -> {items: [{label, url}]}: categories, sub categories
 *     and listings whose name contains q, most visited first
 * GET ?type=city&q=vel -> {items: [{label}]}: states, cities and areas starting with q
 * (PHP site: pages/searchHeaderTitle and searchHeaderArea)
 */
handle(function () {
	require_method('GET');
	$q = isset($_GET['q']) ? trim((string) $_GET['q']) : '';
	$type = isset($_GET['type']) ? $_GET['type'] : 'title';
	if (mb_strlen($q) < 2) {
		reply(array('items' => array()));
	}
	$like = str_replace(array('\\', '%', '_'), array('\\\\', '\\%', '\\_'), $q);

	if ($type === 'city') {
		$rows = query(
			"SELECT area FROM (
				SELECT DISTINCT loc_state AS area FROM location WHERE loc_state LIKE ?
				UNION SELECT DISTINCT loc_city FROM location WHERE loc_city LIKE ?
				UNION SELECT DISTINCT loc_name FROM location WHERE loc_name LIKE ?
			) areas WHERE area <> '' ORDER BY area LIMIT 10",
			array("$like%", "$like%", "$like%")
		)->fetchAll(PDO::FETCH_COLUMN);
		reply(array('items' => array_map(function ($area) {
			return array('label' => $area);
		}, $rows)));
	}

	$city = company()['city'];
	$rows = query(
		"SELECT name, id, visitor FROM (
			SELECT c_name AS name, c_id AS id, c_visitor AS visitor FROM category WHERE c_name LIKE ?
			UNION ALL SELECT name, s_id, visitor FROM sub_category WHERE name LIKE ?
			UNION ALL SELECT l_title, l_id, l_visitor FROM listing WHERE l_title LIKE ? AND l_status = 'active'
		) found ORDER BY visitor DESC LIMIT 10",
		array("%$like%", "%$like%", "%$like%")
	)->fetchAll();
	reply(array('items' => array_map(function ($r) use ($city) {
		return array('label' => $r['name'], 'url' => listing_url($city, $r['name'], $r['id']));
	}, $rows)));
});
