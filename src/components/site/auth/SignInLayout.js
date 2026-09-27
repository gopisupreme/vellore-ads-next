import { Icon } from '@/components/ui';
import AuthBackground from './AuthBackground';

/**
 * The two-part box of the sign-in pages: "Hello..." on the left (large
 * screens) and the form on the right (PHP site: log-in-pop).
 */
export default function SignInLayout({ children }) {
  return (
    <AuthBackground>
      <div className="mx-auto flex max-w-[864px] overflow-hidden bg-white shadow-xl">
        <aside className="hidden w-2/5 flex-col justify-center bg-[#728294] bg-[url(/assets/images/mail/bg.png)] px-[6%] py-[11%] text-white md:flex">
          <h1 className="font-heading text-[32px] font-bold">Hello...</h1>
          <p className="mt-3 font-medium">Don&apos;t have an account? Create your account. It&apos;s take less then a minutes</p>
          <h2 className="mt-4 border-t border-[#525f6d] pt-4 font-heading text-lg font-bold">Login with social media</h2>
          <ul className="mt-4 space-y-3 font-heading font-bold">
            <li>
              <span title="Coming soon" className="flex cursor-not-allowed items-center gap-3 rounded-[2px] bg-[#3f51b5] p-3">
                <Icon name="facebook" /> Facebook
              </span>
            </li>
            <li>
              <span title="Coming soon" className="flex cursor-not-allowed items-center gap-3 rounded-[2px] bg-[#f24033] p-3">
                <Icon name="twitter" /> Twitter
              </span>
            </li>
          </ul>
        </aside>
        <div className="w-full p-6 sm:p-[50px] md:w-3/5">{children}</div>
      </div>
    </AuthBackground>
  );
}
