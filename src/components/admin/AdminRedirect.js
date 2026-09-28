'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FullPageSpinner from '@/components/auth/FullPageSpinner';
import { ADMIN_HOME } from '@/config/adminMenu';

/** Sends the visitor to the admin dashboard (which asks them to sign in when needed). */
export default function AdminRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace(ADMIN_HOME);
  }, [router]);
  return <FullPageSpinner />;
}
