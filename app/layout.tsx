import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { CompareProvider } from '@/context/CompareContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import CompareDrawer from '@/components/CompareDrawer';
import WhatsAppButton from '@/components/WhatsAppButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Muganwa Technology Solutions Ltd | Certified Security & Surveillance Systems',
    template: '%s | Muganwa Technology Solutions Ltd',
  },
  description: 'Rwanda and East Africa leader in CCTV installation, 4K IP cameras, biometric access control, perimeter intruder alarms, and surveillance hardware.',
  keywords: [
    'Muganwa Technology Solutions',
    'CCTV cameras Kigali',
    'Security systems Rwanda',
    'Hikvision distributor Rwanda',
    'Biometric access control ZKTeco',
    'NVR 4K surveillance',
    'MUKIZA Richard security',
    'Intruder alarms Ajax',
    'Security kit builder'
  ],
  authors: [{ name: 'MUKIZA Richard' }, { name: 'Muganwa Technology Solutions Ltd' }],
  metadataBase: new URL('https://muganwatech.rw'),
  openGraph: {
    title: 'Muganwa Technology Solutions Ltd | Certified Security & CCTV Systems',
    description: 'Turnkey CCTV surveillance, access control, and physical security engineering across residential, commercial, and industrial sites.',
    url: 'https://muganwatech.rw',
    siteName: 'Muganwa Technology Solutions Ltd',
    images: [
      {
        url: '/images/logo.png',
        width: 800,
        height: 800,
        alt: 'Muganwa Technology Solutions Ltd Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Muganwa Technology Solutions Ltd',
    image: 'https://muganwatech.rw/images/logo.png',
    '@id': 'https://muganwatech.rw',
    url: 'https://muganwatech.rw',
    telephone: '+250 788 345 678',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'KG 7 Ave, Kigali Commercial Tower',
      addressLocality: 'Kigali',
      addressRegion: 'Gasabo',
      postalCode: '00250',
      addressCountry: 'RW',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -1.9441,
      longitude: 30.0619,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      'https://www.linkedin.com/company/muganwa-technology-solutions',
      'https://twitter.com/muganwatech',
    ],
    founder: {
      '@type': 'Person',
      name: 'MUKIZA Richard',
      jobTitle: 'Managing Director & Lead Systems Engineer',
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-mts-dark text-slate-100 flex flex-col min-h-screen antialiased selection:bg-mts-teal-light selection:text-white`}>
        <LanguageProvider>
          <CurrencyProvider>
            <CartProvider>
              <CompareProvider>
                <Navbar />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
                <CartDrawer />
                <CompareDrawer />
                <WhatsAppButton />
              </CompareProvider>
            </CartProvider>
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
