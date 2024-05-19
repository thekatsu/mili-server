import React from 'react';

export type HeaderProps = {
  children?: React.ReactNode;
};
export async function Header({ children }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      {children}
    </header>
  );
}
