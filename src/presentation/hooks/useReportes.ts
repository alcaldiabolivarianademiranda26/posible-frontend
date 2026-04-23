import { useCallback, useMemo } from 'react';
import { useReporteStore } from '../stores/reporteStore';
import { filtrarReportes, calcularKpisReportes } from '../../domain/usecases/reporteUseCases';
import type { CategoriaServicio, EstadoReporte } from '../../domain/entities/Reporte';

export function useReportes(categoriaFiltrada?: CategoriaServicio) {
  const { reportes, loading, error, updateReporte } = useReporteStore();

  const reportesFiltrados = useMemo(() => {
    if (!categoriaFiltrada) return reportes;
    return filtrarReportes(reportes, { categoria: categoriaFiltrada });
  }, [reportes, categoriaFiltrada]);

  const kpis = useMemo(() => calcularKpisReportes(reportes), [reportes]);

  const obtenerReportesPaginados = useCallback((page: number, limit: number, filtrosAdicionales: { estado?: EstadoReporte, busqueda?: string } = {}) => {
    let base = reportesFiltrados;
    if (filtrosAdicionales.estado || filtrosAdicionales.busqueda) {
      base = filtrarReportes(base, filtrosAdicionales);
    }
    return {
      data: base.slice((page - 1) * limit, page * limit),
      total: base.length,
      totalPages: Math.ceil(base.length / limit)
    };
  }, [reportesFiltrados]);

  return {
    reportes: reportesFiltrados,
    loading,
    error,
    kpis,
    updateReporte,
    obtenerReportesPaginados
  };
}
