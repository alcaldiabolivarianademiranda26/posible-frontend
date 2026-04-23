import React from 'react';
import { useBienes } from '../hooks/useBienes';
import { useFilters } from '../hooks/useFilters';
import { ReportTable } from '../components/reports/ReportTable';
import { ExportButtons } from '../components/reports/ExportButtons';
import type { Bien, EstadoBien, TipoBien } from '../../domain/entities/Bien';
import type { ColumnDef } from '@tanstack/react-table';
import { Plus, Search, Filter } from 'lucide-react';
import { cn } from '../../lib/utils';

export const BienesPage: React.FC = () => {
  const { bienes, loading } = useBienes();
  const { filters, updateFilter } = useFilters({ busqueda: '', estado: '' as EstadoBien | '', tipo: '' as TipoBien | '' });

  // Filtrado local básico para la tabla
  const bienesFiltrados = bienes.filter((b: Bien) => {
    let coincide = true;
    if (filters.estado && b.estadoFisico !== filters.estado) coincide = false;
    if (filters.tipo && b.tipo !== filters.tipo) coincide = false;
    if (filters.busqueda) {
      const q = filters.busqueda.toLowerCase();
      if (!b.nombre.toLowerCase().includes(q) && !b.id.toLowerCase().includes(q)) coincide = false;
    }
    return coincide;
  });

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'Funcional': return 'bg-green-100 text-green-800 border-green-200';
      case 'Requiere Mantenimiento': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Dañado': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const columns: ColumnDef<Bien>[] = [
    { accessorKey: 'id', header: 'Código', cell: info => <span className="font-mono text-gray-500">{info.getValue() as string}</span> },
    { accessorKey: 'nombre', header: 'Nombre del Bien', cell: info => <span className="font-medium text-gray-900">{info.getValue() as string}</span> },
    { accessorKey: 'tipo', header: 'Tipo' },
    { accessorKey: 'estadoFisico', header: 'Estado', cell: info => (
      <span className={cn(`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border`, getStatusColor(info.getValue() as string))}>
        {info.getValue() as string}
      </span>
    )},
    { accessorKey: 'ubicacion', header: 'Ubicación' },
    { accessorKey: 'valorEstimado', header: 'Valor Est.', cell: info => `$${(info.getValue() as number).toLocaleString()}` },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-border shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Control de Bienes Institucionales</h2>
          <p className="text-sm text-gray-500 mt-1">Gestión e inventario de activos</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <ExportButtons 
            data={bienesFiltrados} 
            headers={['Código', 'Nombre', 'Tipo', 'Estado', 'Ubicación', 'Valor Estimado']}
            filename="Inventario_Bienes"
            title="Inventario General de Bienes"
          />
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Registrar Bien
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-border shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar por código o nombre..." 
            value={filters.busqueda}
            onChange={(e) => updateFilter('busqueda', e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-gray-400" />
            <select 
              value={filters.tipo}
              onChange={(e) => updateFilter('tipo', e.target.value)}
              className="w-full sm:w-40 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-white"
            >
              <option value="">Todos los tipos</option>
              <option value="Mueble">Muebles</option>
              <option value="Inmueble">Inmuebles</option>
            </select>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select 
              value={filters.estado}
              onChange={(e) => updateFilter('estado', e.target.value)}
              className="w-full sm:w-40 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-white"
            >
              <option value="">Todos los estados</option>
              <option value="Funcional">Funcional</option>
              <option value="Requiere Mantenimiento">Req. Mantenimiento</option>
              <option value="Dañado">Dañado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="h-64 flex items-center justify-center text-gray-500">Cargando inventario...</div>
      ) : (
        <ReportTable 
          columns={columns as any} 
          data={bienesFiltrados} 
          onRowClick={(row) => console.log('View asset', row)} 
        />
      )}
    </div>
  );
};
