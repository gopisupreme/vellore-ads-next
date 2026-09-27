import PublicLayout from '@/components/site/layout/PublicLayout';
import RegisterForm from '@/components/site/auth/RegisterForm';

export const metadata = { title: 'Create an Account' };

export default function RegisterPage() {
  return (
    <PublicLayout>
      <RegisterForm />
    </PublicLayout>
  );
}
