import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import type { SortingState, ColumnDef } from '@tanstack/react-table';
import { ChevronDown, ChevronUp, ChevronsUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
}

export function ReportTable<TData, TValue>({
  columns,
  data,
  onRowClick
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    initialState: {
      pagination: { pageSize: 10 }
    }
  });

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b border-border text-gray-500 font-medium">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th 
                    key={header.id} 
                    className="px-6 py-3 whitespace-nowrap cursor-pointer select-none hover:bg-gray-100 transition-colors"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {{
                        asc: <ChevronUp className="w-4 h-4 ml-1" />,
                        desc: <ChevronDown className="w-4 h-4 ml-1" />,
                      }[header.column.getIsSorted() as string] ?? (
                        header.column.getCanSort() ? <ChevronsUpDown className="w-4 h-4 ml-1 opacity-50" /> : null
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-border">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick && onRowClick(row.original)}
                  className={`hover:bg-gray-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center text-gray-500">
                  No hay resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-3 border-t border-border bg-gray-50">
        <div className="text-sm text-gray-500">
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount() || 1}
          <span className="ml-4">Total: {table.getFilteredRowModel().rows.length}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="p-1 rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100 disabled:hover:bg-transparent"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <button
            className="p-1 rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100 disabled:hover:bg-transparent"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            className="p-1 rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100 disabled:hover:bg-transparent"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            className="p-1 rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100 disabled:hover:bg-transparent"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
