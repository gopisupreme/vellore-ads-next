import { Container, SafeImage, SectionTitle } from '@/components/site/ui';
import { FIND_SERVICES } from '@/config/site/home';

/** "Find your Services": eight categories with how many listings the city has. */
export default function FindServices({ links, counts }) {
  return (
    <section className="pt-5">
      <Container>
        <SectionTitle title="Find your" highlight="Services" text="Explore professional services for home repairs, tutoring, legal advice, and more, with quality experts." />
        <ul className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
          {FIND_SERVICES.map((s) => (
            <li key={s.label}>
              <a href={links.search(s.term)} title={`${s.label} in ${links.city}`} className="group block bg-white shadow-[0_2px_6px_rgba(0,0,0,.15)] transition hover:shadow-[0_6px_16px_rgba(0,0,0,.18)]">
                <SafeImage src={s.image} alt="" className="aspect-[259/150] w-full object-cover" />
                <span className="flex items-baseline justify-between gap-2 px-[15px] py-3.5">
                  <span className="truncate font-heading text-base font-bold text-[#273440]">{s.label}</span>
                  <span className="shrink-0 text-[13px] text-[#7a7a7a]">Show All ({counts?.[s.count] ?? '…'})</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
