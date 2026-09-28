'use client';

import Link from 'next/link';
import { Badge, Icon } from '@/components/ui';
import useMemberDashboard from '@/hooks/useMemberDashboard';
import { memberPendingHref, RECRUITER_BASE } from '@/config/memberMenus';
import { formatDate } from '@/lib/format';
import { CountTile, DashboardError, MemberPanel, MemberTable } from './MemberShell';

const columns = [
  { key: 'position', header: 'Job Title', render: (j) => <span className="font-medium text-ink">{j.position}</span> },
  { key: 'date', header: 'Date', render: (j) => formatDate(j.createdOn) || '—' },
  { key: 'status', header: 'Status', render: (j) => (j.active ? <Badge tone="success">Active</Badge> : <Badge tone="muted">Inactive</Badge>) },
  {
    key: 'edit',
    header: 'Edit',
    render: (j) => (
      <Link href={memberPendingHref(RECRUITER_BASE, `recruiter/edit_job/${j.id}`, 'Edit job')} aria-label={`Edit ${j.position}`} className="text-brand-600 hover:text-brand-700">
        <Icon name="edit" />
      </Link>
    ),
  },
];

/** recruiter/dashboard of the PHP site: the recruiter's jobs. */
export default function RecruiterDashboard() {
  const { data, error } = useMemberDashboard('recruiter');
  return (
    <MemberPanel title="Dashboard">
      <DashboardError error={error} />
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <CountTile label="Job Listings" note="Total no of Job listings" value={data?.stats.jobs} />
        <CountTile label="Active Jobs" note="Open for applications" value={data?.stats.activeJobs} />
      </div>
      <MemberTable title="Job Listings" columns={columns} rows={data?.jobs ?? []} empty="You have not posted a job yet." />
      <Link
        href={memberPendingHref(RECRUITER_BASE, 'recruiter/postjob', 'Post Job')}
        className="mt-6 inline-flex items-center gap-2 rounded-[3px] bg-[#f44336] px-4 py-2.5 font-medium text-white hover:brightness-110"
      >
        <Icon name="plus" /> Post a Job
      </Link>
    </MemberPanel>
  );
}
