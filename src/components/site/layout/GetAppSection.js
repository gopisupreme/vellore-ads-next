/* eslint-disable @next/next/no-img-element -- static export has no image server */
import { Icon } from '@/components/ui';
import { Container } from '@/components/site/ui';
import { GET_APP } from '@/config/site/home';

/** "Looking for the Best Service Provider? Get the App!" above the footer. */
export default function GetAppSection() {
  return (
    <section className="bg-[url(/assets/images/city.webp)] bg-size-[100%] bg-bottom bg-no-repeat py-16">
      <Container className="grid items-center gap-10 md:grid-cols-2">
        <img src="/assets/images/mobile01.webp" alt="The app on a phone and a tablet" loading="lazy" className="mx-auto w-full max-w-[470px]" />
        <div>
          <h2 className="font-heading text-[28px] leading-tight font-light text-ink md:text-[34px]">
            Looking for the Best Service Provider? <span className="font-sans text-[34px] font-bold text-[#333] md:text-[42px]">Get The App!</span>
          </h2>
          <ul className="mt-5">
            {GET_APP.features.map((f) => (
              <li key={f} className="text-lg leading-[34px] text-ink">
                <Icon name="check" className="mr-2 text-brand-500" /> {f}
              </li>
            ))}
          </ul>
          <p className="mt-4 mb-4 text-base text-[#333]">We&apos;ll send you a link, open it on your phone to download the app</p>
          <form action={GET_APP.playStore} target="_blank" className="flex shadow-sm">
            <span className="grid w-14 place-items-center border border-[#f1f3f5] bg-white text-[15px]">+91</span>
            <input type="tel" inputMode="numeric" pattern="[6-9][0-9]{9}" maxLength={10} aria-label="Mobile number" placeholder="Enter mobile number" className="min-w-0 flex-1 border border-[#f1f3f5] bg-white px-3 py-3 text-[15px] focus:outline-none" />
            <button type="submit" className="bg-linear-to-b from-brand-500 to-[#0485b3] px-6 font-heading font-semibold text-white md:px-10">
              Get App Link
            </button>
          </form>
          <div className="mt-5 flex gap-2">
            <a href={GET_APP.playStore} target="_blank" rel="noreferrer">
              <img src="/assets/images/android.png" alt="Get it on Google Play" loading="lazy" className="h-12 w-auto" />
            </a>
            <img src="/assets/images/apple.png" alt="Download on the App Store (coming soon)" loading="lazy" className="h-12 w-auto opacity-90" />
          </div>
        </div>
      </Container>
    </section>
  );
}
