'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { DataTableContext } from './context';

export type PaginationType = {
  pageIndex: number;
  pageSize: number;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  children: React.ReactNode;
  pagination: PaginationType;
  rowCount: number;
  //onPaginationChange: Dispatch<SetStateAction<PaginationType>>;
}

export function DataTableControler<TData, TValue>({
  columns,
  data,
  children,
  pagination,
  rowCount,
}: DataTableProps<TData, TValue>) {
  const [columnSorting, setColumnSorting] = useState<SortingState>([]);
  const [columnFilter, setColumnFilter] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    rowCount,
    state: {
      sorting: columnSorting,
      columnFilters: columnFilter,
      pagination,
    },
    manualPagination: true,
    //getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setColumnSorting,
    onColumnFiltersChange: setColumnFilter,
    //onPaginationChange: onPaginationChange,
  });

  const pageCount = table.getPageCount();
  const rowStart = pagination.pageIndex * pagination.pageSize;
  const rowEnd =
    rowStart + pagination.pageSize >= rowCount
      ? rowCount
      : rowStart + pagination.pageSize;

  const value = {
    table,
    columns,
    columnFilter,
    columnSorting,
    pagination,
    pageCount,
    rowCount,
    rowStart,
    rowEnd,
  };

  return (
    <DataTableContext.Provider value={value}>
      {children}
    </DataTableContext.Provider>
  );
}
