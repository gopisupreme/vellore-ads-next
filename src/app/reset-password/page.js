import { Suspense } from 'react';
import PublicLayout from '@/components/site/layout/PublicLayout';
import SignInLayout from '@/components/site/auth/SignInLayout';
import ResetPasswordForm from '@/components/site/auth/ResetPasswordForm';

export const metadata = { title: 'Choose a new password' };

// reads ?token= in the browser (static export)
export default function ResetPasswordPage() {
  return (
    <PublicLayout>
      <SignInLayout>
        <Suspense>
          <ResetPasswordForm />
        </Suspense>
      </SignInLayout>
    </PublicLayout>
  );
}
