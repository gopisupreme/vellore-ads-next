import ApiStatus from '@/components/ApiStatus';
import CategoryList from '@/components/CategoryList';

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
      <h1 className="text-3xl font-semibold">Vellore Ads</h1>
      <p className="mt-2 text-sm opacity-70">Next.js front end with the PHP API and MySQL database.</p>
      <ApiStatus />
      <CategoryList />
    </main>
  );
}
