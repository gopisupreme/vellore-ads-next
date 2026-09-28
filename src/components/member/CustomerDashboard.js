'use client';

import Link from 'next/link';
import { Alert, Icon } from '@/components/ui';
import useMemberDashboard from '@/hooks/useMemberDashboard';
import { CUSTOMER_BASE, memberPendingHref } from '@/config/memberMenus';
import { formatDate } from '@/lib/format';
import { DashboardError, MemberPanel } from './MemberShell';

const profileHref = memberPendingHref(CUSTOMER_BASE, 'customer/profile', 'My Profile');

/**
 * customer/dashboard of the PHP site. That page only opened a "Complete
 * Your Profile" pop-up (which saved nothing); here the customer sees their
 * account and which details are still missing.
 */
export default function CustomerDashboard() {
  const { data, error } = useMemberDashboard('customer');
  const profile = data?.profile;
  const rows = profile
    ? [
        ['user', 'Name', profile.name],
        ['envelope', 'Email', profile.email],
        ['phone', 'Mobile', profile.mobile],
        ['map-marker', 'Address', profile.address],
        ['calendar', 'Member since', formatDate(profile.joinedOn)],
      ]
    : [];

  return (
    <MemberPanel title="Dashboard">
      <DashboardError error={error} />
      {profile && (
        <>
          <p className="font-heading text-2xl font-bold text-ink">Welcome, {profile.name}</p>
          {data.missing.length > 0 && (
            <Alert tone="warning" className="mt-4">
              <p className="font-medium">Complete your profile</p>
              <p>Still missing: {data.missing.join(', ')}.</p>
              <Link href={profileHref} className="mt-2 inline-block font-medium underline">Update my profile</Link>
            </Alert>
          )}
          <dl className="mt-6 divide-y divide-line border-y border-line">
            {rows.map(([icon, label, value]) => (
              <div key={label} className="grid grid-cols-[28px_140px_1fr] items-center gap-2 py-3 text-[15px]">
                <Icon name={icon} className="text-center text-ink-faint" />
                <dt className="text-ink-soft">{label}</dt>
                <dd className="min-w-0 break-words text-ink">{value || '—'}</dd>
              </div>
            ))}
          </dl>
        </>
      )}
    </MemberPanel>
  );
}
