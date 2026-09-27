import PublicLayout from '@/components/site/layout/PublicLayout';
import SignInLayout from '@/components/site/auth/SignInLayout';
import SignInForm from '@/components/site/auth/SignInForm';

export const metadata = { title: 'Sign In' };

export default function LoginPage() {
  return (
    <PublicLayout>
      <SignInLayout>
        <SignInForm />
      </SignInLayout>
    </PublicLayout>
  );
}
