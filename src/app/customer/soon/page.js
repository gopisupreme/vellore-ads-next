import { Suspense } from 'react';
import PendingPage from '@/components/layout/PendingPage';
import { CUSTOMER_BASE } from '@/config/memberMenus';

export const metadata = { title: 'Being moved' };

// reads ?page=&title= in the browser (static export)
export default function PendingMemberPage() {
  return (
    <Suspense>
      <PendingPage homeHref={`${CUSTOMER_BASE}dashboard/`} />
    </Suspense>
  );
}
