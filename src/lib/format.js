const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2020-07-31" -> "31 Jul 2020", as the PHP pages' date("d M Y"); '' for no date. */
export function formatDate(isoDate) {
  const [year, month, day] = String(isoDate ?? '').slice(0, 10).split('-');
  return year && month && day ? `${day} ${MONTHS[Number(month) - 1]} ${year}` : '';
}
