import './globals.css';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://erithazhal.com'),
  title: 'ETN News',
  description:
    'ETN News website powered by the same ETN admin/backend used by the mobile app.',
  openGraph: {
    title: 'ETN News',
    description:
      'ETN News website powered by the same ETN admin/backend used by the mobile app.',
    url: 'https://erithazhal.com',
    siteName: 'ETN News',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ETN News',
    description:
      'Erithazhal News website powered by the same ETN used by the mobile app.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5102546518342948"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}