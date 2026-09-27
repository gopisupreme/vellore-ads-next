'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Breadcrumbs, Card, StatTile } from '@/components/ui';
import { ADMIN_HOME, pendingHref } from '@/config/adminMenu';
import { fetchDashboard, selectDashboard } from '@/store/reducers/dashboardSlice';
import TopListingsTable from './TopListingsTable';

/** The counters, in the PHP dashboard's order: stats key, label, picture, the list it opens. */
const STATS = [
  { key: 'listings', label: 'All Listings', image: 'd1', php: 'connect/all_listing' },
  { key: 'users', label: 'Users', image: 'd4', php: 'connect/all_users' },
  { key: 'categories', label: 'Categories', image: 'd3', php: 'connect/all_category' },
  { key: 'reviews', label: 'Reviews', image: 'd2', php: 'connect/all_reviews' },
  { key: 'customers', label: 'Customers', image: 'd4', php: 'connect/all_customers' },
  { key: 'posts', label: 'Post Free Ads', image: 'd1', php: 'connect/all_post' },
  { key: 'postReviews', label: 'Reviews Post', image: 'd2', php: 'connect/all_reviews_post' },
  { key: 'todayListings', label: 'Today Listings', image: 'd1', php: 'connect/all_listing' },
  { key: 'newUsers', label: 'New Users', image: 'd4', php: 'connect/new_users' },
  { key: 'todayViews', label: "Today's Listing Views", image: 'd1', php: 'connect/today_listing_report' },
];

/** connect/dashboard of the PHP site: Overview counters and Top Listing Details. */
export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { stats, error } = useSelector(selectDashboard);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  return (
    <>
      <Breadcrumbs homeHref={ADMIN_HOME} current="Dashboard" />
      <Card title="Overview" bodyClassName="p-3 sm:p-5">
        {error && (
          <Alert tone="error" className="mb-5">
            {error}
          </Alert>
        )}
        <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {STATS.map((stat) => (
            <StatTile
              key={stat.label}
              href={pendingHref(stat.php, stat.label)}
              image={`/assets/images/icon/${stat.image}.png`}
              label={stat.label}
              value={stats?.[stat.key]}
            />
          ))}
        </div>
        <Card title="Top Listing Details" bodyClassName="p-4 sm:p-6">
          <TopListingsTable />
        </Card>
      </Card>
    </>
  );
}
