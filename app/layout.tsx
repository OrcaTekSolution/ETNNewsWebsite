import './globals.css';
import type { Metadata } from 'next';
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
      'ETN News website powered by the same ETN admin/backend used by the mobile app.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}