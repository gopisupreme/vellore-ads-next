'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import useSession from '@/hooks/useSession';
import { logoutRequested } from '@/store/reducers/authSlice';
import Link from 'next/link';
import { homeFor, roleLabel } from '@/config/roles';
import { Button, Card, Icon } from '@/components/ui';
import FullPageSpinner from './FullPageSpinner';

/**
 * Shows its children only to a signed-in user with one of `roles`;
 * sends everyone else to the login page. The API checks again on every call.
 */
export default function RequireAuth({ roles, children }) {
  const { user, checked } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (checked && !user) router.replace('/login/');
  }, [checked, user, router]);

  if (!user) return <FullPageSpinner />;

  if (roles && !roles.includes(user.role)) {
    return (
      <div className="grid min-h-screen place-items-center p-4">
        <Card className="max-w-md text-center" bodyClassName="p-8">
          <Icon name="lock" className="text-4xl text-slate-400" />
          <h1 className="mt-4 text-lg font-semibold text-slate-900">No access</h1>
          <p className="mt-2 text-sm text-slate-500">
            You are signed in as {user.name} ({roleLabel(user.role)}). This dashboard is only for{' '}
            {roles.map(roleLabel).join(', ').toLowerCase()} accounts.
          </p>
          <div className="mt-6 flex justify-center gap-2">
            {homeFor(user.role) && (
              <Link href={homeFor(user.role)} className="inline-flex h-10 items-center rounded-lg bg-brand-500 px-4 text-sm font-medium text-white hover:bg-brand-600">
                My dashboard
              </Link>
            )}
            <Button variant="secondary" onClick={() => dispatch(logoutRequested())}>
              Sign out
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return children;
}
