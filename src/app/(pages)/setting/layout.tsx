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
    <div className="flex flex-1 flex-row border-r border-slate-200 bg-slate-50 p-8">
      <SideMenu title={menu.title} menus={menu.menus} />
      {children}
    </div>
  );
}
