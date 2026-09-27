<?php
/* GET api/categories.php -- active categories, most visited first. ?limit= (1-100, default 24) */
require __DIR__ . '/_lib/bootstrap.php';

handle(function () {
	$limit = isset($_GET['limit']) ? max(1, min(100, (int) $_GET['limit'])) : 24;
	$rows = db()->query(
		"SELECT `c_id` AS id, `c_name` AS name, `c_img` AS image, `c_visitor` AS visitors
		FROM `category` WHERE `c_status` = 'active' ORDER BY `c_visitor` DESC LIMIT $limit"
	)->fetchAll();
	reply(array('categories' => $rows));
});
