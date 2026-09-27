import { Container, SafeImage, SectionTitle } from '@/components/site/ui';

/** "Explore your Trending": the six newest news posts (blog table). */
export default function TrendingNews({ news }) {
  if (!news?.length) return null;
  return (
    <section className="pt-[100px]">
      <Container>
        <SectionTitle title="Explore your" highlight="Trending" text="Stay updated with global headlines and breaking news; our Trending News section delivers key updates." />
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-x-[30px]">
          {news.map((n) => (
            <li key={n.id}>
              <a href={n.url} title={n.title} className="group relative block aspect-[355/200] overflow-hidden rounded-[3px]">
                <SafeImage src={n.image} alt="" className="size-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/80" />
                <span className="absolute inset-x-0 bottom-0 p-5">
                  <span className="block truncate font-heading text-lg font-bold text-white">{n.title}</span>
                  <span className="text-[13px] text-white/80">News</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
