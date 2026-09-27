<?php
/*
 * Business listings (the `listing` table) as the admin API sends them.
 * Include after bootstrap.php.
 */

/** Columns listing_row() needs; `owner_type` is the u_type of the listing's user. */
const LISTING_SELECT = 'SELECT l.l_id, l.l_title, l.l_category, l.l_city, l.l_visitor, l.l_adddate, l.l_phone,
	l.l_type, l.l_status, l.l_verified, l.l_trusted, u.u_type AS owner_type
	FROM listing l LEFT JOIN users u ON u.u_id = l.l_userid';

function listing_row(array $r)
{
	$phones = array_map('trim', explode(',', (string) $r['l_phone']));
	return array(
		'id' => (int) $r['l_id'],
		'title' => $r['l_title'],
		'category' => $r['l_category'],
		'city' => $r['l_city'],
		'views' => (int) $r['l_visitor'],
		'addedOn' => $r['l_adddate'],
		'phone' => $phones[0],
		'plan' => $r['l_type'],
		'owner' => $r['owner_type'] === 'admin' ? 'admin' : 'user',
		'status' => $r['l_status'],
		'verified' => (string) $r['l_verified'] === '1',
		'trusted' => (string) $r['l_trusted'] === '1',
		// the listing's public page and its edit page on the PHP site
		'url' => site_url(rawurlencode($r['l_city']) . '/' . rawurlencode(str_replace(' ', '-', $r['l_title'])) . '/' . $r['l_id']),
		'editUrl' => site_url('connect/edit_list/' . $r['l_id']),
	);
}

/** @return array the listing, or a 404 */
function find_listing($id)
{
	$row = query(LISTING_SELECT . ' WHERE l.l_id = ?', array((int) $id))->fetch();
	if (!$row) {
		throw new ApiError(404, 'This listing no longer exists.');
	}
	return $row;
}
