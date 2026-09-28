/**
 * The side menus of the members' dashboards, as on the PHP site
 * (templates/sidemenu.php, customer-sidemenu.php, recruiter/left-nav.php).
 * `icon` is a picture in public/assets/images/icon. An item with `href` is
 * built here; the others open the section's "being moved" page (soon/),
 * which links to `php` on the PHP site. `url` opens another website.
 */

/** A section's page for a PHP page that is not built here yet. */
export function memberPendingHref(base, php, title) {
  return `${base}soon/?${new URLSearchParams({ page: php, title })}`;
}

export const OWNER_BASE = '/users/';
export const CUSTOMER_BASE = '/customer/';
export const RECRUITER_BASE = '/recruiter/';

export const OWNER_MENU = [
  { label: 'My Dashboard', icon: 'dbl1', href: '/users/dashboard/' },
  { label: 'All Listing', icon: 'dbl2', php: 'users/db_all_listing' },
  { label: 'Add New Listing', icon: 'dbl3', php: 'users/db_listing_add' },
  { label: 'Reviews', icon: 'dbl13', php: 'users/db_review' },
  { label: 'Applied Jobs', icon: 'dbl13', php: 'users/db_jobs' },
  { label: 'My Profile', icon: 'dbl6', php: 'users/profile' },
  { label: 'All Post Ads', icon: 'dbl2', php: 'users/db_all_post' },
  { label: 'Category', icon: 'dbl2', php: 'users/all_categories' },
  { label: 'Brand', icon: 'dbl2', php: 'users/all_brand' },
  { label: 'Sub Category', icon: 'dbl2', php: 'users/all_sub_categories' },
  { label: 'All Products', icon: 'dbl13', php: 'users/all_product' },
  { label: 'Add Product', icon: 'dbl2', php: 'users/add_product' },
  { label: 'All Orders', icon: 'dbl2', php: 'users/db_all_orders' },
  { label: 'Add New Post', icon: 'dbl3', php: 'users/db_post_add' },
  { label: 'Post Reviews', icon: 'dbl13', php: 'users/db_post_review' },
  { label: 'Claim Business', icon: 'dbl7', php: 'users/claim_business' },
  { label: 'Lead Management', icon: 'dbl7', php: 'users/db_all_enquiry' },
  { label: 'Free Business CRM', icon: 'dbl7', url: 'https://workspace.ind.in/', highlight: true },
];

export const CUSTOMER_MENU = [
  { label: 'My Dashboard', icon: 'dbl1', href: '/customer/dashboard/' },
  { label: 'My Profile', icon: 'dbl6', php: 'customer/profile' },
];

export const RECRUITER_MENU = [
  { label: 'My Dashboard', icon: 'dbl1', href: '/recruiter/dashboard/' },
  { label: 'Post Job', icon: 'dbl3', php: 'recruiter/postjob' },
  { label: 'Job Listing', icon: 'dbl2', php: 'recruiter/job_list' },
  { label: 'Applied Jobs', icon: 'dbl13', php: 'recruiter/job_applied_list' },
  { label: 'Company', icon: 'dbl7', php: 'recruiter/company_list' },
  { label: 'My Profile', icon: 'dbl6', php: 'recruiter/profile' },
];
