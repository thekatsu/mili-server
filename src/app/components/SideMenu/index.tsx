import { cn } from '@/app/lib/utils';
import Link from 'next/link';

export type SideMenuItems = {
  path: string;
  selected: boolean;
  label: string;
};

export type SideMenuProps = {
  menu: {
    title: string;
    items: {
      href: string;
      selected: boolean;
      label: string;
    }[];
  };
};

export async function SideMenu({ menu, ...props }: SideMenuProps) {
  return (
    // flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10
    <nav className="mr-6 flex max-w-6xl flex-col gap-6" {...props}>
      <div className="mx-auto grid w-full gap-2">
        <h1 className="text-3xl font-semibold">{menu.title}</h1>
      </div>
      <div className="mx-auto grid w-full items-start gap-6 ">
        <div className="grid gap-4 text-sm text-muted-foreground">
          {menu.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(item.selected && ['font-semibold', 'text-primary'])}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
