import PublicLayout from '@/components/site/layout/PublicLayout';
import RequireAuth from '@/components/auth/RequireAuth';
import MemberShell from '@/components/member/MemberShell';
import { CUSTOMER_BASE, CUSTOMER_MENU } from '@/config/memberMenus';

export default function Layout({ children }) {
  return (
    <PublicLayout>
      <RequireAuth roles={['customer']}>
        <MemberShell menu={CUSTOMER_MENU} base={CUSTOMER_BASE}>
          {children}
        </MemberShell>
      </RequireAuth>
    </PublicLayout>
  );
}
