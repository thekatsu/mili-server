import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { DataTable } from '@/app/components/data-table';
import { columns } from './columns';
import { DataTableControler } from '@/app/components/data-table/controller';
import { DataTablePagination } from '@/app/components/data-table/pagination';
import { fetchFilteredPartners } from '@/database/partner';

type SearchParams = {
  filter: string;
  page: number;
  perPage: number;
};

export default async function Inativos({
  page,
  perPage,
  filter,
}: SearchParams) {
  const data = { data: [], rowCount: 0 }; //await fetchFilteredPartners(filter, 'Inativo', page, perPage);
  // console.log('page', page);

  return (
    <DataTableControler
      columns={columns}
      data={data?.data}
      rowCount={data.rowCount}
      pagination={{
        pageIndex: page - 1,
        pageSize: perPage,
      }}
    >
      <Card x-chunk="dashboard-06-chunk-0" className="flex flex-1 flex-col">
        <CardHeader>
          <CardTitle>Clientes</CardTitle>
          <CardDescription>
            Lista de clientes ativos importados do ERP
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <DataTable />
        </CardContent>
        <CardFooter>
          <DataTablePagination />
        </CardFooter>
      </Card>
    </DataTableControler>
  );
}
