'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import * as Icons from '@/app/components/icons';
import { CircleUser, Menu, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/app/lib/utils';

export function TopMenu() {
  const pathname = usePathname();

  const menus = [
    {
      href: '/home',
      label: 'Mili Studios',
      iconName: 'beer',
    },
    {
      href: '/dashboard',
      label: 'Dashboard',
      iconName: null,
    },
    {
      href: '/setting/integration',
      label: 'Configurações',
      iconName: null,
    },
  ];

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 md:flex md:flex-row md:items-center">
        {menus.map((menu, index) => {
          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={cn(
                'flex items-center gap-2 text-base ',
                pathname === menu.href && ['font-semibold', 'text-foreground'],
              )}
            >
              {menu.iconName &&
                // @ts-ignore
                Icons[menu.iconName]({ className: 'h-5 w-5' })}
              {index !== 0 && menu.label}
              <span className="sr-only">{menu.label}</span>
            </Link>
          );
        })}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6">
            {menus.map((menu, index) => {
              return (
                <Link
                  key={menu.href}
                  href={menu.href}
                  className={cn(
                    'flex items-center gap-2 text-base hover:text-foreground',
                    pathname === menu.href && [
                      'text-foreground',
                      'font-medium',
                    ],
                    index == 0 && 'mb-2 text-xl font-bold text-foreground',
                  )}
                >
                  {menu.iconName &&
                    // @ts-ignore
                    Icons[menu.iconName]({ className: 'h-5 w-5' })}
                  {menu.label}
                  <span className="sr-only">{menu.label}</span>
                </Link>
              );
            })}
            {/* 
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Orders
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Products
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Customers
            </Link>
            <Link href="#" className="hover:text-foreground">
              Settings
            </Link> */}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center justify-end gap-4 ">
        <form className="max-w-[400px] flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 "
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
