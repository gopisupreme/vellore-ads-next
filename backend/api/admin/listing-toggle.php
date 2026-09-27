<?php
require __DIR__ . '/../_lib/bootstrap.php';
require __DIR__ . '/../_lib/listings.php';

/*
 * POST {id, field} -> {listing}: switches one setting of a listing, as the
 * PHP site's labels do (connect/action_listing):
 *   status    active <-> inactive
 *   verified  on <-> off
 *   trusted   on <-> off
 *   plan      free <-> gold (other plans change on the edit page)
 */
handle(function () {
	require_method('POST');
	require_user(array('admin'));
	$data = input();
	$field = isset($data['field']) ? $data['field'] : '';
	$row = find_listing(isset($data['id']) ? $data['id'] : 0);

	switch ($field) {
		case 'status':
			$sql = 'UPDATE listing SET l_status = ? WHERE l_id = ?';
			$value = $row['l_status'] === 'active' ? 'inactive' : 'active';
			break;
		case 'verified':
			$sql = 'UPDATE listing SET l_verified = ? WHERE l_id = ?';
			$value = (string) $row['l_verified'] === '1' ? '0' : '1';
			break;
		case 'trusted':
			$sql = 'UPDATE listing SET l_trusted = ? WHERE l_id = ?';
			$value = (string) $row['l_trusted'] === '1' ? '0' : '1';
			break;
		case 'plan':
			if (!in_array($row['l_type'], array('free', 'gold'), true)) {
				throw new ApiError(422, 'Only free and gold plans switch here. Change a ' . $row['l_type'] . ' plan on the edit page.');
			}
			$sql = 'UPDATE listing SET l_type = ? WHERE l_id = ?';
			$value = $row['l_type'] === 'free' ? 'gold' : 'free';
			break;
		default:
			throw new ApiError(422, 'Unknown setting: ' . $field);
	}

	query($sql, array($value, $row['l_id']));
	reply(array('listing' => listing_row(find_listing($row['l_id']))));
});
