import PublicLayout from '@/components/site/layout/PublicLayout';
import RequireAuth from '@/components/auth/RequireAuth';
import MemberShell from '@/components/member/MemberShell';
import { OWNER_BASE, OWNER_MENU } from '@/config/memberMenus';

export default function Layout({ children }) {
  return (
    <PublicLayout>
      <RequireAuth roles={['listing']}>
        <MemberShell menu={OWNER_MENU} base={OWNER_BASE}>
          {children}
        </MemberShell>
      </RequireAuth>
    </PublicLayout>
  );
}
