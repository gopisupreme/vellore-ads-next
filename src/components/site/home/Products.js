import { Icon } from '@/components/ui';
import { Carousel, Container, SafeImage, SectionTitle } from '@/components/site/ui';
import { PRODUCTS } from '@/config/site/home';

/** "Buy your Products": product cards linking to the shops. */
export default function Products() {
  return (
    <section className="pt-[50px] pb-[60px]">
      <Container>
        <SectionTitle title="Buy your" highlight="Products" text="Shop a variety of products from electronics to fashion with quality, competitive prices, and fast delivery." />
        <Carousel label="Products" trackClassName="gap-[30px]">
          {PRODUCTS.map((p, i) => (
            <a
              key={i}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="group shrink-0 basis-[calc(50%-15px)] snap-start overflow-hidden rounded-xl border border-[#e5e5e5] bg-white pb-5 text-center sm:basis-[calc(33.333%-20px)] lg:basis-[calc(20%-24px)]"
            >
              <SafeImage src={p.image} alt="" className="aspect-square w-full bg-[#f2f2f2] object-contain transition group-hover:scale-105" />
              <h3 className="mt-4 truncate px-3 text-[13px] font-medium text-ink uppercase">{p.title}</h3>
              <p className="mt-2 text-[13px] text-ink">
                <Icon name="inr" /> {p.price}
              </p>
              <span className="mt-3 inline-block rounded-[2px] bg-[#78a206] px-2.5 py-1.5 text-xs font-medium text-white uppercase group-hover:bg-[#6a8f05]">Shop Now</span>
            </a>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
