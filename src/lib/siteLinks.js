/**
 * Links into the PHP site (its listing, category and content pages), made
 * from api/layout.php's siteUrl and city.
 */

/** "Real Estate Agency" -> "Real-Estate-Agency", as the PHP site's links. */
export const dashed = (text) => String(text).trim().replace(/\s+/g, '-');

export function makeSiteLinks(site) {
  const base = site?.siteUrl ?? '/';
  const city = site?.city ?? '';
  return {
    city,
    /** A PHP site page, e.g. page('about-us') */
    page: (path) => `${base}${path}`,
    /** The city's list for a category or search term, e.g. search('Hotel') */
    search: (term, inCity = city) => `${base}${encodeURIComponent(dashed(inCity))}/${dashed(term)}`,
    /** The href of a config link: {path} | {term} | {url} */
    of: (link) => link.url ?? (link.path ? `${base}${link.path}` : `${base}${encodeURIComponent(city)}/${link.term}`),
  };
}
