'use client';

import { Badge } from '@/components/ui';
import useMemberDashboard from '@/hooks/useMemberDashboard';
import { memberPendingHref, OWNER_BASE } from '@/config/memberMenus';
import { formatDate } from '@/lib/format';
import { CountTile, DashboardError, MemberPanel, MemberTable } from './MemberShell';

/** The plan label of a listing or post (PHP site: Premium / Gold / Free). */
function PlanBadge({ plan }) {
  const name = String(plan ?? '').toLowerCase();
  if (name === 'premium') return <Badge tone="success">Premium</Badge>;
  if (name === 'gold') return <Badge tone="primary">Gold</Badge>;
  if (name === 'platinum') return <Badge tone="info">Platinum</Badge>;
  return <Badge tone="muted">Free</Badge>;
}

const titleLink = (r) => (
  <a href={r.url} target="_blank" rel="noreferrer" title={r.title} className="inline-block max-w-72 truncate rounded-[3px] bg-label-danger px-2 py-0.5 text-sm text-white hover:brightness-110">
    {r.title}
  </a>
);

/** The "Recent ..." columns: name, date, rating, views, status. */
const recentColumns = (nameHeader) => [
  { key: 'title', header: nameHeader, render: titleLink },
  { key: 'date', header: 'Date', render: (r) => formatDate(r.addedOn) || '—' },
  { key: 'rating', header: 'Rating', render: (r) => <Badge tone="success">{r.rating}</Badge> },
  { key: 'views', header: 'Views', render: (r) => r.views },
  { key: 'status', header: 'Status', render: (r) => (r.active ? <Badge tone="success">Active</Badge> : <Badge tone="primary">Pending</Badge>) },
];

/** The "Payment & analytics" columns: renewal, payment, plan and an upgrade link. */
const paymentColumns = [
  { key: 'title', header: 'Listing Name', render: titleLink },
  { key: 'renewal', header: 'Renewal Date', render: (r) => formatDate(r.renewalOn) || '—' },
  { key: 'paid', header: 'Payment', render: (r) => (r.paid ? <Badge tone="success">Done</Badge> : <Badge tone="danger">No</Badge>) },
  { key: 'plan', header: 'Listing Type', render: (r) => <PlanBadge plan={r.plan} /> },
  {
    key: 'upgrade',
    header: 'Make Payment',
    render: (r) => (
      <a href={memberPendingHref(OWNER_BASE, `users/userListingUpgrade/${r.id}`, 'Upgrade listing')} className="font-medium text-brand-600 hover:underline">
        Upgrade Now
      </a>
    ),
  },
];

/** users/dashboard of the PHP site: a business owner's listings and posts. */
export default function OwnerDashboard() {
  const { data, error } = useMemberDashboard('owner');
  const stats = data?.stats;
  return (
    <MemberPanel title="Dashboard">
      <DashboardError error={error} />
      <div className="grid grid-cols-1 sm:grid-cols-3">
        <CountTile image="d1" label="All Listing" value={stats?.listings} />
        <CountTile image="d2" label="Reviews" value={stats?.listingReviews} />
        <CountTile image="d3" label="Ratings" value={stats?.listingRating} />
      </div>
      <MemberTable title="Recent Listings" columns={recentColumns('Listing Name')} rows={data?.listings ?? []} empty="You have no listings yet." />
      <MemberTable title="Payment & analytics" columns={paymentColumns} rows={data?.listings ?? []} empty="You have no listings yet." />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3">
        <CountTile image="d1" label="All Posts" value={stats?.posts} />
        <CountTile image="d2" label="Reviews" value={stats?.postReviews} />
        <CountTile image="d3" label="Ratings" value={stats?.postRating} />
      </div>
      <MemberTable title="Recent Posts" columns={recentColumns('Post Title')} rows={data?.posts ?? []} empty="You have no posts yet." />
      <MemberTable title="Post Module Payment & analytics" columns={paymentColumns} rows={data?.posts ?? []} empty="You have no posts yet." />
    </MemberPanel>
  );
}
