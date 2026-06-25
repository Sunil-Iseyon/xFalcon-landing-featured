import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Geist_Mono, Buenard } from "next/font/google";
import { METADATA_BASE_URL } from '@/lib/app-config';
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

const googleSans = localFont({
  src: [
    { path: "./fonts/GoogleSans-Variable.ttf", style: "normal" },
    { path: "./fonts/GoogleSans-Italic.ttf", style: "italic" },
  ],
  variable: "--font-google-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* Buenard — serif for headlines/wordmark. next/font/google self-hosts at build time. */
const buenard = Buenard({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-buenard',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F8FC' },
    { media: '(prefers-color-scheme: dark)',  color: '#061122' },
  ],
};

export const metadata: Metadata = {
  metadataBase: METADATA_BASE_URL,
  title: 'xFalcon — The Operating System for Enterprise Intelligence',
  description: 'The hard parts of analytics, solved in days, not months. 75–93% lower TCO. Live in 4–6 weeks. Zero data migration.',
  icons: {
    icon: [
      { url: "/favicon_256.png", sizes: "256x256", type: "image/png" },
      { url: "/favicon_128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon_64.png",  sizes: "64x64",   type: "image/png" },
      { url: "/favicon_32.png",  sizes: "32x32",   type: "image/png" },
      { url: "/favicon_16.png",  sizes: "16x16",   type: "image/png" },
    ],
    apple: "/favicon_256.png",
  },
  openGraph: {
    title: 'xFalcon — The Operating System for Enterprise Intelligence',
    description: 'The hard parts of analytics, solved in days, not months. 75–93% lower TCO. Live in 4–6 weeks. Zero data migration.',
    url: 'https://www.xfalcon.ai',
    siteName: 'xFalcon',
    images: [{ url: '/brand/hero/og_1200x630.png', width: 1200, height: 630, alt: 'xFalcon — AI Business Intelligence' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'xFalcon — The Operating System for Enterprise Intelligence',
    description: 'The hard parts of analytics, solved in days, not months.',
    images: ['/brand/hero/og_1200x630.png'],
  },
  alternates: { canonical: 'https://www.xfalcon.ai' },
};

/* Tiny inline script — sets data-theme before first paint to prevent FOUC */
const themeScript = `
(function(){
  try{
    var saved = localStorage.getItem('xf-theme');
    var theme = saved === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if(meta) meta.setAttribute('content', theme === 'dark' ? '#061122' : '#F5F8FC');
  }catch(e){}
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${googleSans.variable} ${geistMono.variable} ${buenard.variable}`}
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        {/* Preload Buenard — prevents FOUT on headlines */}
        <link rel="preload" href="/fonts/Buenard-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* Anti-FOUC: set theme before render */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://www.xfalcon.ai/#organization',
                  name: 'xFalcon',
                  legalName: 'Iseyon',
                  url: 'https://www.xfalcon.ai',
                  logo: 'https://www.xfalcon.ai/favicon_256.png',
                  contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: 'info@iseyon.com' },
                  sameAs: ['https://twitter.com/xfalconai', 'https://instagram.com/xfalconai'],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://www.xfalcon.ai/#website',
                  url: 'https://www.xfalcon.ai',
                  name: 'xFalcon',
                  description: 'The operating system for enterprise intelligence.',
                  publisher: { '@id': 'https://www.xfalcon.ai/#organization' },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
