'use client';

import {
  RxChevronLeft as ChevronLeftIcon,
  RxChevronRight as ChevronRightIcon,
  RxDoubleArrowLeft as DoubleArrowLeftIcon,
  RxDoubleArrowRight as DoubleArrowRightIcon,
} from 'react-icons/rx';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DataTableContext } from '../context';
import { useContext } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export function DataTablePagination() {
  const { table, pagination, rowCount, rowStart, rowEnd, pageCount } =
    useContext(DataTableContext);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const pageNumber = pagination.pageIndex + 1;
  console.log('pageNumber', pageNumber);

  const handlePageSize = (pageSize: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('perPage', pageSize.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const handlePaginationChange = (page: number) => {
    console.log('change', page);
    const params = new URLSearchParams(searchParams);
    page == 0 ? params.delete('page') : params.set('page', page.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const handleFirstPage = () => {
    handlePaginationChange(0);
  };

  const handlePreviousPage = () => {
    console.log(pageNumber);
    handlePaginationChange(pageNumber - 1);
  };

  const handleNextPage = () => {
    handlePaginationChange(pageNumber + 1);
  };

  const handleLastPage = () => {
    handlePaginationChange(pageCount);
  };

  return (
    <div className="flex items-center justify-between px-2">
      <div className="text-xs text-muted-foreground">
        Mostrando{' '}
        <strong>
          {rowStart} - {rowEnd}
        </strong>{' '}
        de <strong>{rowCount}</strong> registros.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-xs text-muted-foreground">Linhas por página</p>
          <Select
            value={`${pagination.pageSize}`}
            onValueChange={(value) => {
              handlePageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {pageNumber} de {pageCount}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handleFirstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePreviousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handleNextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handleLastPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
          {/* <Link href={`/cadastros/clientes?page=${pageNumber - 1}`}>Prev</Link> */}
          {/* <Link href={`/cadastros/clientes?page=${pageNumber + 1}`}>Next</Link> */}
        </div>
      </div>
    </div>
  );
}
