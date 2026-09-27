<?php
require __DIR__ . '/../_lib/bootstrap.php';
require __DIR__ . '/../_lib/listings.php';

// POST {id} -> {id}: deletes a listing and its reviews (PHP site: connect/action_listing)
handle(function () {
	require_method('POST');
	require_user(array('admin'));
	$data = input();
	$row = find_listing(isset($data['id']) ? $data['id'] : 0);

	$db = db();
	$db->beginTransaction();
	query('DELETE FROM reviews WHERE r_postid = ?', array($row['l_id']));
	query('DELETE FROM listing WHERE l_id = ?', array($row['l_id']));
	$db->commit();
	reply(array('id' => (int) $row['l_id']));
});
