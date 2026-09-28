import PublicLayout from '@/components/site/layout/PublicLayout';
import RequireAuth from '@/components/auth/RequireAuth';
import MemberShell from '@/components/member/MemberShell';
import { RECRUITER_BASE, RECRUITER_MENU } from '@/config/memberMenus';

export default function Layout({ children }) {
  return (
    <PublicLayout>
      <RequireAuth roles={['recruiter']}>
        <MemberShell menu={RECRUITER_MENU} base={RECRUITER_BASE}>
          {children}
        </MemberShell>
      </RequireAuth>
    </PublicLayout>
  );
}
