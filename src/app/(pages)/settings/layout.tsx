import { SideMenu } from '@/app/components/SideMenu';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menu = {
    title: 'Configurações',
    items: [
      {
        href: '/settings/general',
        label: 'Geral',
        selected: true,
      },
      {
        href: '/settings/integration',
        label: 'Integração',
        selected: false,
      },
    ],
  };

  return (
    <div className="flex flex-1 flex-row border-r border-slate-200 bg-slate-50 p-8">
      <SideMenu menu={menu} />
      {children}
    </div>
  );
}
