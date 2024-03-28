import { SideMenu } from '@/components/SideMenu';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menu = {
    title: 'Configurações',
    menus: [
      {
        href: '/setting/general',
        label: 'Geral',
      },
      {
        href: '/setting/integration',
        label: 'Integração',
      },
    ],
  };

  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full gap-2">
        <h1 className="text-3xl font-semibold">{menu.title}</h1>
      </div>
      <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[250px_1fr]">
        <SideMenu title={menu.title} menus={menu.menus} />
        <div className="grid gap-6">{children}</div>
      </div>
    </div>
  );
}
