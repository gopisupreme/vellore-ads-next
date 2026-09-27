import AdminShell from '@/components/admin/AdminShell';
import RequireAuth from '@/components/auth/RequireAuth';

export const metadata = { title: { template: '%s | Admin', default: 'Admin' } };

export default function AdminLayout({ children }) {
  return (
    <RequireAuth roles={['admin']}>
      <AdminShell>{children}</AdminShell>
    </RequireAuth>
  );
}
