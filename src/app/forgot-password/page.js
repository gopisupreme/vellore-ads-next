import PublicLayout from '@/components/site/layout/PublicLayout';
import SignInLayout from '@/components/site/auth/SignInLayout';
import ForgotPasswordForm from '@/components/site/auth/ForgotPasswordForm';

export const metadata = { title: 'Forgot Password' };

export default function ForgotPasswordPage() {
  return (
    <PublicLayout>
      <SignInLayout>
        <ForgotPasswordForm />
      </SignInLayout>
    </PublicLayout>
  );
}
