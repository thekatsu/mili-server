import '@/app/styles/globals.css';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import { cn } from '@/app/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Mili Studios',
  description: '',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <div className="flex min-h-screen w-full flex-col ">
          <div className="flex flex-1 bg-slate-50 ">{children}</div>
        </div>
      </body>
    </html>
  );
}
