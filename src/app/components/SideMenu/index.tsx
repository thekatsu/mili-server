'use client';

import { cn } from '@/app/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type SideMenuProps = {
  title: string;
  menus: {
    href: string;
    label: string;
  }[];
};

export function SideMenu({ title, menus, ...props }: SideMenuProps) {
  const pathname = usePathname();

  return (
    // flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10

    <nav className="grid max-w-3xl flex-col gap-6" {...props}>
      <div className="mx-auto grid w-full items-start gap-6">
        <div className="flex gap-2 text-sm text-muted-foreground md:grid">
          {menus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className={cn(
                pathname === menu.href && ['font-semibold', 'text-primary'],
              )}
            >
              {menu.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
