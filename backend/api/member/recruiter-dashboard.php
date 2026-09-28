<?php
require __DIR__ . '/../_lib/bootstrap.php';
require __DIR__ . '/../_lib/site.php';
require __DIR__ . '/../_lib/member.php';

/*
 * GET -> the recruiter's dashboard (PHP site: recruiter/dashboard): how many
 * jobs they posted (and how many are active) and the four newest.
 */
handle(function () {
	require_method('GET');
	$user = require_user(array('recruiter'));
	$uid = (int) $user['u_id'];

	$jobs = array_map(function ($r) {
		return array(
			'id' => (int) $r['id'],
			'position' => $r['position'],
			'company' => $r['company_name'],
			'createdOn' => date_only($r['created_date']),
			'lastDate' => date_only($r['last_date_to_apply']),
			// the PHP site writes "1" in some places and "active" in others
			'active' => in_array((string) $r['status'], array('1', 'active'), true),
			'views' => (int) $r['j_visitor'],
		);
	}, query('SELECT id, position, company_name, created_date, last_date_to_apply, status, j_visitor FROM job WHERE user_id = ? ORDER BY id DESC LIMIT 4', array($uid))->fetchAll());

	reply(array(
		'stats' => array(
			'jobs' => count_rows('job WHERE user_id = ?', array($uid)),
			'activeJobs' => count_rows("job WHERE user_id = ? AND status IN ('1', 'active')", array($uid)),
		),
		'jobs' => $jobs,
	));
});
