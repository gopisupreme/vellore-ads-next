import { Suspense } from 'react';
import PublicLayout from '@/components/site/layout/PublicLayout';
import SignInLayout from '@/components/site/auth/SignInLayout';
import VerifyEmail from '@/components/site/auth/VerifyEmail';

export const metadata = { title: 'Email verification' };

// reads ?token= in the browser (static export)
export default function VerifyEmailPage() {
  return (
    <PublicLayout>
      <SignInLayout>
        <Suspense>
          <VerifyEmail />
        </Suspense>
      </SignInLayout>
    </PublicLayout>
  );
}
