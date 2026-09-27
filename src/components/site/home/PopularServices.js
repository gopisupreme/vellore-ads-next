import { Container, SafeImage, SectionTitle } from '@/components/site/ui';
import { POPULAR_SERVICES } from '@/config/site/home';

const BARS = { green: 'border-[#17b599]', blue: 'border-brand-500', red: 'border-[#df431f]' };

/** "Popular Services": five picture cards on a light blue band. */
export default function PopularServices({ links }) {
  return (
    <section className="border-y border-[#cfe5ec] bg-[#e9f8fd] py-[50px]">
      <Container>
        <SectionTitle title="Popular" highlight="Services" text="Find expert services for home repairs, tutoring, legal advice, and more, tailored to your needs." />
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {POPULAR_SERVICES.map((s) => (
            <li key={s.label}>
              <a href={links.of(s)} title={`${s.label} in ${links.city}`} className="group block">
                <SafeImage src={s.image} alt="" className="aspect-[205/175] w-full object-cover transition group-hover:brightness-105" />
                <span className={`block border-b-[3px] bg-white p-[15px] text-center text-[15px] font-semibold text-ink ${BARS[s.bar]}`}>{s.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
