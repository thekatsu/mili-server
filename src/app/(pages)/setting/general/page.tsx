import erp from './erps.json';
import endpoints from './end-points.json';
import IntegrationCard from '@/app/components/IntegrationCard';
import { Search } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { ConfigIntegration } from '@prisma/client';
import { fetchConfigIntegration } from '@/app/api/v1/integration/actions';

export default async function SettingsPage() {
  const response: ConfigIntegration[] = await fetchConfigIntegration();

  return (
    <>
      <div className="flex w-full items-center justify-center gap-4 ">
        <form className="flex max-w-[600px] flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 "
            />
          </div>
          <Button className="relative">Add</Button>
        </form>
      </div>

      <main className="flex flex-1 flex-col">
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {response.map((item) => (
            <IntegrationCard
              key={item.id}
              title={item.name}
              description={item.description}
              href={`/setting/integration/${item.id}/edit`}
            />
          ))}
        </div>
      </main>
    </>
  );
}
