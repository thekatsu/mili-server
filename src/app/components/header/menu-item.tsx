'use client';

import React from 'react';
import { cn } from '@/app/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

export interface MenuItemProps extends LinkProps {
  active?: boolean;
  className?: string;
  children?: React.ReactNode;
  asChild?: boolean;
}

export const MenuItem = React.forwardRef<HTMLAnchorElement, MenuItemProps>(
  (
    { href, className, children, asChild = false, active = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : Link;

    const pathname = usePathname();

    return (
      <Comp
        ref={ref}
        href={href}
        className={cn(
          'text-muted-foreground transition-colors',
          (pathname.startsWith(href.toString()) || active) && 'text-foreground',
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
MenuItem.displayName = 'MenuItem';
