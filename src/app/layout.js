import { Poppins, Quicksand } from 'next/font/google';
// Font Awesome 4 from the PHP site (assets/), for <Icon name="..." />
import '@/assets/font-awesome/css/font-awesome.min.css';
import './globals.css';
import StoreProvider from '@/store/StoreProvider';

// the PHP site's fonts (assets/fonts/font1.css): Poppins for text, Quicksand for headings.
// next/font downloads them at build time, so pages load them from this site.
const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const quicksand = Quicksand({
  variable: '--font-quicksand',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
});

export const metadata = {
  title: {
    template: '%s | Vellore Ads',
    default: 'Vellore Ads',
  },
  description: 'Local search, free classified ads and business listings.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${quicksand.variable} h-full antialiased`}>
      <body className="min-h-full">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
