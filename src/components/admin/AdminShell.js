'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardShell from '@/components/layout/DashboardShell';
import { ADMIN_ACCOUNT_MENU, ADMIN_HOME, ADMIN_MENU, pendingHref } from '@/config/adminMenu';
import { fetchMenuCounts, selectMenuCounts } from '@/store/reducers/adminSlice';

const accountMenu = ADMIN_ACCOUNT_MENU.map((item) => ({ ...item, href: item.href ?? pendingHref(item.php, item.label) }));

/** The admin frame: DashboardShell with the admin menu and its counts. */
export default function AdminShell({ children }) {
  const dispatch = useDispatch();
  const counts = useSelector(selectMenuCounts);

  useEffect(() => {
    dispatch(fetchMenuCounts());
  }, [dispatch]);

  return (
    <DashboardShell menu={ADMIN_MENU} accountMenu={accountMenu} counts={counts} homeHref={ADMIN_HOME}>
      {children}
    </DashboardShell>
  );
}
