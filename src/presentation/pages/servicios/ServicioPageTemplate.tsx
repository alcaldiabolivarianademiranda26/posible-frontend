import React, { useState } from 'react';
import { useReportes } from '../../hooks/useReportes';
import { useFilters } from '../../hooks/useFilters';
import { ReportTable } from '../../components/reports/ReportTable';
import { StatusBadge } from '../../components/reports/StatusBadge';
import { PriorityBadge } from '../../components/reports/PriorityBadge';
import { ExportButtons } from '../../components/reports/ExportButtons';
import type { CategoriaServicio, EstadoReporte, Reporte } from '../../../domain/entities/Reporte';
import type { ColumnDef } from '@tanstack/react-table';
import { Plus, Search, Filter } from 'lucide-react';

interface ServicioPageTemplateProps {
  categoria: CategoriaServicio;
  titulo: string;
}

export const ServicioPageTemplate: React.FC<ServicioPageTemplateProps> = ({ categoria, titulo }) => {
  const { reportes, loading } = useReportes(categoria);
  const { filters, updateFilter } = useFilters({ busqueda: '', estado: '' as EstadoReporte | '' });

  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(isModalOpen); // Suppress unused warning

  // Filtrado local básico para la tabla (en un caso real esto se haría en el store o backend)
  const reportesFiltrados = reportes.filter((r: Reporte) => {
    let coincide = true;
    if (filters.estado && r.estado !== filters.estado) coincide = false;
    if (filters.busqueda) {
      const q = filters.busqueda.toLowerCase();
      if (!r.numeroContacto.toLowerCase().includes(q) && !r.id.toLowerCase().includes(q)) coincide = false;
    }
    return coincide;
  });

  const columns: ColumnDef<Reporte>[] = [
    { accessorKey: 'id', header: 'ID Reporte', cell: info => <span className="font-mono text-gray-500">{info.getValue() as string}</span> },
    { accessorKey: 'numeroContacto', header: 'Número de contacto', cell: info => <span className="font-medium text-gray-900">{info.getValue() as string}</span> },
    { accessorKey: 'fechaCreacion', header: 'Fecha', cell: info => new Date(info.getValue() as string).toLocaleDateString() },
    { accessorKey: 'prioridad', header: 'Prioridad', cell: info => <PriorityBadge priority={info.getValue() as any} /> },
    { accessorKey: 'estado', header: 'Estado', cell: info => <StatusBadge status={info.getValue() as any} /> },
    { accessorKey: 'sector', header: 'Sector' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-border shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{titulo}</h2>
          <p className="text-sm text-gray-500 mt-1">Gestión y control de reportes ciudadanos</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <ExportButtons
            data={reportesFiltrados}
            headers={['ID', 'Número de contacto', 'Fecha', 'Prioridad', 'Estado', 'Sector']}
            filename={`Reportes_${categoria.replace(' ', '_')}`}
            title={`Reportes de ${categoria}`}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Nuevo Reporte
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-border shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por ID o título..."
            value={filters.busqueda}
            onChange={(e) => updateFilter('busqueda', e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filters.estado}
            onChange={(e) => updateFilter('estado', e.target.value)}
            className="w-full sm:w-48 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-white"
          >
            <option value="">Todos los estados</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En Proceso">En Proceso</option>
            <option value="Resuelto">Resuelto</option>
            <option value="Rechazado">Rechazado</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="h-64 flex items-center justify-center text-gray-500">Cargando reportes...</div>
      ) : (
        <ReportTable
          columns={columns}
          data={reportesFiltrados}
          onRowClick={(row) => console.log('View details', row)}
        />
      )}
    </div>
  );
};
