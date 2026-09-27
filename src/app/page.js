import HomePage from '@/components/site/home/HomePage';
import PublicLayout from '@/components/site/layout/PublicLayout';

export const metadata = {
  title: { absolute: 'Vellore Ads | Local Search, Free Classified Ads & Business Listings' },
};

export default function Home() {
  return (
    // the dark header slides in once the banner has scrolled away
    <PublicLayout headerRevealAfter={560}>
      <HomePage />
    </PublicLayout>
  );
}
