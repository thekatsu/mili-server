import '@/app/styles/globals.css';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import { cn } from '@/app/lib/utils';
import { Header } from '@/components/header';
import { Menu } from '@/components/header/menu';
import { MenuItem } from '@/components/header/menu-item';
import { Package2, Menu as MenuDrawer } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import MenuBreadcrumb from '@/components/header/menu-breadcrumb';
import ReactQueryProvider from '@/app/providers/react-query';

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className="">
      <body
        className={cn(
          'min-h-screen bg-background bg-slate-200 font-sans antialiased',
          fontSans.variable,
        )}
      >
        <ReactQueryProvider>
          <Header>
            <Menu>
              <MenuItem href="/" active>
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Mili Studios</span>
              </MenuItem>
              <MenuItem href="/cadastros">Cadastros</MenuItem>
            </Menu>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <MenuDrawer className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium">
                  <SheetClose asChild>
                    <MenuItem href="/" active>
                      <Package2 className="h-6 w-6" />
                      <span className="sr-only">Mili Studios</span>
                    </MenuItem>
                    {/* <Link
                      href="/"
                      className="flex items-center gap-2 text-lg font-semibold"
                    >
                      
                    </Link> */}
                  </SheetClose>
                  <SheetClose asChild>
                    <MenuItem href="/cadastros">Cadastros</MenuItem>
                    {/* <Link
                      href="/registrations"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Cadastros
                    </Link> */}
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </Header>
          <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] w-full flex-col gap-7 bg-muted/40 px-8 py-6">
            <MenuBreadcrumb />
            <div className="">{children}</div>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
