import { MenuItem } from '@/components/header/menu-item';

export default async function RegistrationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid gap-4 md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr]">
      {/* <div className="flex flex-1 flex-col sm:flex-row"> */}
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">Cadastros</h1>
        <nav
          className="flex flex-wrap gap-4 text-sm text-muted-foreground md:grid"
          x-chunk="dashboard-04-chunk-0"
        >
          <MenuItem href="/cadastros/clientes">Clientes</MenuItem>
          <MenuItem href="/cadastros/grupos-tags">Grupo de Tags</MenuItem>
          <MenuItem href="/cadastros/tags">Tags</MenuItem>
          <MenuItem href="/cadastros/produtos">Produtos</MenuItem>
        </nav>
      </div>
      <main>{children}</main>
    </div>
  );
}
