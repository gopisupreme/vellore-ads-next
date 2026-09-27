import { Spinner } from '@/components/ui';

export default function FullPageSpinner() {
  return (
    <div className="grid min-h-screen place-items-center text-brand-500">
      <Spinner className="size-8" />
    </div>
  );
}
