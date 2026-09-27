<?php
/*
 * The public site's shared helpers: the company row, links to the PHP
 * site's pages and running ads. Include after bootstrap.php.
 */

/** The companyinfo row (id 1): name, city, logos, contacts and social links. */
function company()
{
	static $row = null;
	if ($row === null) {
		$row = query('SELECT * FROM companyinfo WHERE id = 1')->fetch();
		if (!$row) {
			throw new ApiError(500, 'The companyinfo table has no row with id 1.');
		}
	}
	return $row;
}

/** "Sri Narayani Hospital & Research" -> "Sri-Narayani-Hospital-Research", as CodeIgniter's url_title(). */
function url_title($text)
{
	return trim(preg_replace('/[^A-Za-z0-9]+/', '-', (string) $text), '-');
}

/** A listing's page on the PHP site: <city>/<Title-dashed>/<id> */
function listing_url($city, $title, $id)
{
	return site_url(rawurlencode($city) . '/' . url_title($title) . '/' . $id);
}

/**
 * Paid ads from ads_with_us running today on a page (adsPage) and slot
 * (adsType), most viewed first.
 */
function running_ads($page, $type)
{
	$today = date('Y-m-d');
	$rows = query(
		'SELECT id, title, website, adsImage FROM ads_with_us
		WHERE adsPage = ? AND adsType = ? AND fromDate <= ? AND toDate >= ? ORDER BY view DESC',
		array($page, $type, $today, $today)
	)->fetchAll();
	return array_map(function ($r) {
		return array(
			'id' => (int) $r['id'],
			'title' => $r['title'],
			'url' => $r['website'],
			'image' => upload_url('assets/advertise/', $r['adsImage']),
		);
	}, $rows);
}
