/**
 * The admin side menu, as on the PHP site (views/admin/header.php): same
 * labels, order and icons (Font Awesome 4). `php` is the PHP site's page an
 * item stands for; `count` names the number shown beside it
 * (api/admin/menu-counts.php).
 *
 * Give an item an `href` once its page is built here. Until then it opens
 * the "being moved" page, which links to the PHP site's page.
 */
export const ADMIN_HOME = '/admin/';

/** The page for a PHP admin page that is not built here yet. */
export function pendingHref(php, title) {
  return `/admin/soon/?${new URLSearchParams({ page: php, title })}`;
}

export const ADMIN_MENU = [
  { label: 'Dashboard', icon: 'tachometer', href: ADMIN_HOME, php: 'connect/dashboard' },
  {
    label: 'Users',
    icon: 'user',
    items: [
      { label: 'All Users', php: 'connect/all_users', count: 'users' },
      { label: 'Add New user', php: 'connect/add_user' },
    ],
  },
  {
    label: 'Listing Categories',
    icon: 'list-ul',
    items: [
      { label: 'All listing Categories', php: 'connect/all_category', count: 'categories' },
      { label: 'Add New Category', php: 'connect/add_category' },
    ],
  },
  {
    label: 'Listing',
    icon: 'list-ul',
    items: [
      { label: 'All listing', php: 'connect/all_listing', count: 'listings' },
      { label: 'Add New Listing', php: 'connect/add_list' },
      { label: 'Upload Listing', php: 'connect/upload_listing' },
      { label: 'Search Listing', php: 'connect/search_listing' },
      { label: 'Users Listing Count', php: 'connect/users_listing' },
    ],
  },
  {
    label: 'Matrimony Listing',
    icon: 'list-ul',
    items: [
      { label: 'All Listing', php: 'connect/all_matrimony', count: 'matrimony' },
      { label: 'Add New Listing', php: 'connect/add_matrimony' },
      { label: 'Search Listing', php: 'connect/search_matrimony' },
      { label: 'All listing Categories', php: 'connect/all_category_matrimony', count: 'matrimonyCategories' },
    ],
  },
  {
    label: 'Spa Listing',
    icon: 'list-ul',
    items: [
      { label: 'All Listing', php: 'connect/all_spa', count: 'spa' },
      { label: 'Add New Listing', php: 'connect/add_spa' },
      { label: 'Search Listing', php: 'connect/search_spa' },
      { label: 'All listing Categories', php: 'connect/all_category_spa', count: 'spaCategories' },
    ],
  },
  {
    label: 'Cinema Listing',
    icon: 'list-ul',
    items: [{ label: 'Add New Listing', php: 'cinema' }],
  },
  {
    label: 'Reviews',
    icon: 'envelope-o',
    items: [
      { label: 'All Reviews', php: 'connect/all_reviews', count: 'reviews' },
      { label: 'Add Review', php: 'connect/add_review' },
      { label: 'All Post Reviews', php: 'connect/all_reviews_post' },
      { label: 'All Matrimony Reviews', php: 'connect/all_reviews_matrimony' },
      { label: 'All Spa Reviews', php: 'connect/all_reviews_spa' },
    ],
  },
  {
    label: 'Locations',
    icon: 'map-marker',
    items: [
      { label: 'All Locations', php: 'connect/all_location', count: 'locations' },
      { label: 'Add New Location', php: 'connect/add_location' },
      { label: 'Upload Location', php: 'connect/upload_location' },
    ],
  },
  {
    label: 'Post Free Ads',
    icon: 'list-ul',
    items: [
      { label: 'All Posts', php: 'connect/all_post', count: 'posts' },
      { label: 'Add New Post', php: 'connect/add_post' },
      { label: 'Search Post', php: 'connect/search_post' },
    ],
  },
  {
    label: 'Jobs',
    icon: 'envelope-o',
    items: [
      { label: 'All Applied Jobs', php: 'connect/all_applied_jobs' },
      { label: 'All Job Category', php: 'connect/all_job_category' },
      { label: 'All Jobs', php: 'connect/all_jobs' },
    ],
  },
  {
    label: 'Customer',
    icon: 'users',
    items: [
      { label: 'All Customers', php: 'connect/all_customers', count: 'customers' },
      { label: 'Add New Customer', php: 'connect/add_customer' },
    ],
  },
  { label: 'Quick Ads', icon: 'bar-chart', php: 'connect/quick_ads' },
  {
    label: 'Ads',
    icon: 'buysellads',
    items: [
      { label: 'All Ads', php: 'connect/admin_ads' },
      { label: 'All Ads Page', php: 'connect/admin_ads_page' },
      { label: 'All Ads Type', php: 'connect/admin_ads_type' },
    ],
  },
  {
    label: 'Listing View Report',
    icon: 'buysellads',
    items: [
      { label: "Today's Listing Report", php: 'connect/today_listing_report' },
      { label: 'Weekly Listing Report', php: 'connect/weekly_listing_report' },
      { label: 'Monthly Listing Report', php: 'connect/monthly_listing_report' },
      { label: 'Custom Listing Report', php: 'connect/custom_listing_report' },
    ],
  },
  {
    label: 'Product',
    icon: 'buysellads',
    items: [
      { label: 'Product SubCategory', php: 'connect/all_sub_categories' },
      { label: 'Product Category', php: 'connect/all_categories' },
      { label: 'Brand', php: 'connect/all_brand' },
      { label: 'Groups', php: 'connect/all_groups' },
      { label: 'Product', php: 'connect/all_product' },
      { label: 'Order', php: 'connect/all_order' },
    ],
  },
  { label: 'Blog', php: 'connect/all_blog' },
  { label: 'Premium', php: 'connect/all_premium' },
  { label: 'Profile', php: 'connect/profile' },
  { label: 'Contact Message', php: 'connect/all_contact' },
  { label: 'Top Attractions', php: 'connect/all_top_attractions' },
  { label: 'Change Password', php: 'connect/change_password' },
  { label: 'Admin Settings', php: 'connect/admin_setting' },
  { label: 'Youtube Videos', php: 'connect/all_youtube_videos' },
];

/** The "My Account" drop-down of the top bar. */
export const ADMIN_ACCOUNT_MENU = [
  { label: 'Admin Profile', icon: 'cogs', php: 'connect/profile' },
  { label: 'Ads', icon: 'buysellads', php: 'connect/admin_ads' },
];
