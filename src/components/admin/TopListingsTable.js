'use client';

import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Badge, ConfirmDialog, DataTable, Icon, Spinner } from '@/components/ui';
import { formatDate } from '@/lib/format';
import {
  actionErrorDismissed,
  listingDeleteRequested,
  listingToggleRequested,
  selectDashboard,
} from '@/store/reducers/dashboardSlice';

const SWITCHABLE_PLANS = ['free', 'gold'];

/** What each confirmation asks (the PHP page's confirm() texts). */
function confirmText(pending) {
  if (pending.field === 'delete') return 'Are you sure you want to remove this advertisement?';
  if (pending.field === 'plan') {
    const change = pending.listing.plan === 'free' ? 'Free to Premium (gold)' : 'Premium (gold) to Free';
    return `Are you sure you want to change the plan of "${pending.listing.title}" from ${change}?`;
  }
  return 'Are you sure want to continue?';
}

/**
 * The dashboard's "Top Listing Details": the 100 most viewed listings with
 * their plan, status, verified and trusted switches, edit and delete.
 */
export default function TopListingsTable() {
  const dispatch = useDispatch();
  const { topListings, loading, busyId, actionError } = useSelector(selectDashboard);
  const [pending, setPending] = useState(null); // { listing, field } waiting for "yes"

  const ask = (listing, field) => setPending({ listing, field });
  const cancel = useCallback(() => setPending(null), []);
  const confirm = () => {
    const { listing, field } = pending;
    dispatch(field === 'delete' ? listingDeleteRequested({ id: listing.id }) : listingToggleRequested({ id: listing.id, field }));
    setPending(null);
  };

  const columns = [
    {
      key: 'title',
      header: 'Title',
      width: '25%',
      render: (r) => (
        <a href={r.url} target="_blank" rel="noreferrer" className="group block">
          <span className="block font-medium text-[#263238] group-hover:text-link">{r.title}</span>
          <span className="text-ink-body">{r.category}</span>
        </a>
      ),
    },
    {
      key: 'views',
      header: 'Listing Views',
      width: '10%',
      render: (r) => (
        <span className="inline-block rounded bg-label-primary px-3 py-1.5 font-medium text-white shadow-[0_2px_4px_rgba(0,0,0,.25)]">
          {r.views}
        </span>
      ),
    },
    {
      key: 'details',
      header: 'Details',
      width: '15%',
      render: (r) => (
        <>
          {formatDate(r.addedOn)}
          <br />
          +91 {r.phone}
        </>
      ),
    },
    {
      key: 'type',
      header: 'Listing Type',
      width: '15%',
      render: (r) => {
        const switchable = SWITCHABLE_PLANS.includes(r.plan);
        return (
          <div className="flex flex-col items-start gap-4">
            <Badge
              tone="info"
              onClick={switchable ? () => ask(r, 'plan') : undefined}
              disabled={busyId === r.id}
              title={switchable ? 'Switch between free and gold' : 'Change this plan on the edit page'}
            >
              {r.plan}
            </Badge>
            {r.owner === 'admin' ? <Badge tone="warning">Admin</Badge> : <Badge tone="danger">User</Badge>}
          </div>
        );
      },
    },
    {
      key: 'status',
      header: 'Status',
      width: '15%',
      render: (r) => (
        <div className="flex flex-col items-start gap-2.5">
          <Badge tone={r.status === 'active' ? 'success' : 'primary'} onClick={() => ask(r, 'status')} disabled={busyId === r.id}>
            {r.status === 'active' ? 'Active' : 'pending'}
          </Badge>
          <Badge tone={r.verified ? 'success' : 'danger'} onClick={() => ask(r, 'verified')} disabled={busyId === r.id}>
            {r.verified ? 'Verified' : 'Not Verified'}
          </Badge>
          <Badge tone={r.trusted ? 'primary' : 'danger'} onClick={() => ask(r, 'trusted')} disabled={busyId === r.id}>
            {r.trusted ? 'Trusted' : 'Not Trusted'}
          </Badge>
        </div>
      ),
    },
    {
      key: 'action',
      header: 'Action',
      width: '15%',
      render: (r) =>
        busyId === r.id ? (
          <Spinner className="size-4 text-link" label="Saving" />
        ) : (
          <div className="flex gap-3">
            <a
              href={r.editUrl}
              target="_blank"
              rel="noreferrer"
              title="Edit (on the PHP site)"
              className="grid size-6 place-items-center rounded-[2px] bg-edit text-[13px] text-white hover:brightness-125"
            >
              <Icon name="pencil" />
            </a>
            <button
              type="button"
              title="Delete"
              onClick={() => ask(r, 'delete')}
              className="grid size-6 place-items-center rounded-[2px] bg-delete text-[13px] text-white hover:brightness-110"
            >
              <Icon name="trash" />
            </button>
          </div>
        ),
    },
  ];

  if (loading && !topListings.length) {
    return (
      <div className="grid place-items-center py-16 text-link">
        <Spinner className="size-7" />
      </div>
    );
  }

  return (
    <>
      {actionError && (
        <Alert tone="error" className="mb-4">
          <div className="flex items-start justify-between gap-4">
            {actionError}
            <button type="button" aria-label="Dismiss" onClick={() => dispatch(actionErrorDismissed())}>
              <Icon name="times" />
            </button>
          </div>
        </Alert>
      )}
      <DataTable
        columns={columns}
        rows={topListings}
        rowKey={(r) => r.id}
        searchText={(r) => `${r.title} ${r.category} ${r.phone} ${r.plan}`}
      />
      <ConfirmDialog
        open={Boolean(pending)}
        title={pending?.field === 'delete' ? 'Remove listing' : 'Please confirm'}
        message={pending && confirmText(pending)}
        confirmLabel={pending?.field === 'delete' ? 'Yes, remove' : 'Yes, continue'}
        tone={pending?.field === 'delete' ? 'danger' : 'primary'}
        onConfirm={confirm}
        onCancel={cancel}
      />
    </>
  );
}
