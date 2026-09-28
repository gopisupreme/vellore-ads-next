import AdminRedirect from '@/components/admin/AdminRedirect';

export const metadata = { title: 'Dashboard' };

/** The PHP site's admin address (connect/dashboard) opens the admin dashboard here. */
export default function ConnectDashboardPage() {
  return <AdminRedirect />;
}
