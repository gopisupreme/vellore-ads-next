import { Container, SafeImage, SectionTitle } from '@/components/site/ui';
import { CITY_SITES } from '@/config/site/home';

function CityCard({ city, large = false }) {
  return (
    <a href={city.url} target="_blank" rel="noreferrer" title={city.name} className={`group relative block overflow-hidden rounded-[3px] ${large ? 'h-full min-h-[200px]' : 'aspect-[259/162]'}`}>
      <SafeImage src={city.image} alt="" className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105" />
      <span className="absolute inset-0 bg-linear-to-b from-transparent via-black/10 to-black/75" />
      <span className="absolute inset-x-0 bottom-0 p-5">
        <span className="block font-heading text-lg font-bold text-white">{city.name}</span>
        <span className="text-[13px] text-white/85">{city.stats}</span>
      </span>
    </a>
  );
}

/** "Explore your City Listings": the sister sites of other cities. */
export default function CityListings() {
  const [first, ...rest] = CITY_SITES;
  return (
    <section className="pt-10 pb-[50px]">
      <Container>
        <SectionTitle title="Explore your" highlight="City Listings" text="Explore other city listings near you." />
        <div className="grid grid-cols-1 gap-[30px] md:grid-cols-4">
          <div className="md:col-span-2 md:row-span-2">
            <CityCard city={first} large />
          </div>
          {rest.map((city) => (
            <CityCard key={city.name} city={city} />
          ))}
        </div>
      </Container>
    </section>
  );
}
