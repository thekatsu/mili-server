import { SideMenu } from '@/app/components/side-menu';

export default async function Layout({
  children,
  edit,
}: Readonly<{
  edit: React.ReactNode;
  children: React.ReactNode;
}>) {
  const menu = {
    title: 'Configurações',
    menus: [
      {
        href: '/setting/integration',
        label: 'Integração',
      },
    ],
  };

  return (
    <>
      <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col bg-muted/40 p-5  ">
        <div className="mx-auto grid w-full gap-2">
          <h1 className="text-3xl font-semibold">{menu.title}</h1>

          <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[230px_1fr]">
            <SideMenu title={menu.title} menus={menu.menus} />
            <div className="grid gap-6">{children}</div>
          </div>
        </div>
      </div>
      {edit}
    </>
  );
}
