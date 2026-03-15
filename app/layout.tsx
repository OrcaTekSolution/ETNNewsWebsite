import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ETN News',
  description: 'ETN News website powered by the same ETN admin/backend used by the mobile app.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
