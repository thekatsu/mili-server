import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/ui/tabs';
import { Search } from '@/app/components/search';
import Ativos from './ativos';
import Inativos from './inativos';
import { Suspense } from 'react';

type SearchParams = {
  searchParams?: {
    query?: string;
    page?: string;
    perPage?: string;
  };
};

export default async function Page({ searchParams }: SearchParams) {
  const query = searchParams?.query || '';
  const page = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.perPage) || 10;

  // console.log('searchParams', searchParams);
  return (
    <Tabs defaultValue="active" className="flex flex-1 flex-col">
      <div className="flex justify-between">
        <TabsList>
          <TabsTrigger value="active">Ativos</TabsTrigger>
          <TabsTrigger value="inactive">Inativos</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <Search placeholder="Pesquisar clientes..." />
        </div>
      </div>
      <TabsContent value="active" className="flex flex-1">
        <Suspense fallback={<h1>Carregando!!!!</h1>}>
          <Ativos page={page} perPage={perPage} filter={query} />
        </Suspense>
      </TabsContent>
      <TabsContent value="inactive" className="flex flex-1">
        <Suspense fallback={<h1>Carregando!!!!</h1>}>
          <Inativos
            page={Number(searchParams?.page) | 1}
            perPage={Number(searchParams?.perPage) | 10}
            filter={searchParams?.query || ''}
          />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}
