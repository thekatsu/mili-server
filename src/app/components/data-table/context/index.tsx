import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  Table,
} from '@tanstack/react-table';
import { createContext } from 'react';

export type PaginationType = { pageIndex: number; pageSize: number };

export type DataTableContextType<TData, TValue> = {
  table: Table<TData>;
  columns: ColumnDef<TData, TValue>[];
  columnFilter: ColumnFiltersState;
  columnSorting: SortingState;
  //setPagination: (state: PaginationType) => void;
  pagination: PaginationType;
  pageCount: number;
  rowCount: number;
  rowStart: number;
  rowEnd: number;
};

export const DataTableContext = createContext<DataTableContextType<any, any>>(
  {} as DataTableContextType<any, any>,
);
