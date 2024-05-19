'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { MenuItem } from './menu-item';
import { usePathname } from 'next/navigation';

export default function MenuBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname
    // .substring(1)
    .replaceAll('/', '//')
    .split('/')
    .map((seg, idx) => ({
      name: idx == 0 ? 'Home' : seg ? seg.replace('-', ' ') : '/',
      href: seg
        ? pathname.substring(0, pathname.lastIndexOf(seg) + seg.length)
        : '/',
    }));

  if (segments.length <= 1 || pathname == '/') return null;

  return (
    <Breadcrumb className="flex ">
      <BreadcrumbList>
        {segments &&
          segments.map((seg, idx) =>
            seg.href === '/' && seg.name === seg.href ? (
              <BreadcrumbSeparator key={idx} />
            ) : (
              <BreadcrumbItem key={seg.href}>
                <BreadcrumbLink asChild>
                  {idx === segments.length - 1 ? (
                    <BreadcrumbPage className="first-letter:capitalize">
                      {seg.name}
                    </BreadcrumbPage>
                  ) : (
                    <MenuItem
                      className="first-letter:capitalize"
                      href={seg.href}
                    >
                      {seg.name || 'Home'}
                    </MenuItem>
                  )}
                </BreadcrumbLink>
              </BreadcrumbItem>
            ),
          )}
        {/* <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <MenuItem href="#">Dashboard</MenuItem>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <MenuItem href="#">Products</MenuItem>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>All Products</BreadcrumbPage>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
