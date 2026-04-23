import { useCallback, useMemo } from 'react';
import { useBienStore } from '../stores/bienStore';
import { filtrarBienes, registrarCambioEstado } from '../../domain/usecases/bienUseCases';
import type { TipoBien, EstadoBien, Bien } from '../../domain/entities/Bien';

export function useBienes(tipoFiltrado?: TipoBien) {
  const { bienes, loading, error, updateBien, deleteBien } = useBienStore();

  const bienesFiltrados = useMemo(() => {
    if (!tipoFiltrado) return bienes;
    return filtrarBienes(bienes, { tipo: tipoFiltrado });
  }, [bienes, tipoFiltrado]);

  const kpis = useMemo(() => {
    const total = bienes.length;
    const funcionales = bienes.filter(b => b.estadoFisico === 'Funcional').length;
    const requierenMantenimiento = bienes.filter(b => b.estadoFisico === 'Requiere Mantenimiento').length;
    const danados = bienes.filter(b => b.estadoFisico === 'Dañado').length;
    const valorTotal = bienes.reduce((acc, curr) => acc + curr.valorEstimado, 0);

    return { total, funcionales, requierenMantenimiento, danados, valorTotal };
  }, [bienes]);

  const cambiarEstado = useCallback((bien: Bien, nuevoEstado: EstadoBien, usuario: string, detalles?: string) => {
    const bienActualizado = registrarCambioEstado(bien, nuevoEstado, usuario, detalles);
    updateBien(bienActualizado);
  }, [updateBien]);

  return {
    bienes: bienesFiltrados,
    loading,
    error,
    kpis,
    updateBien,
    deleteBien,
    cambiarEstado
  };
}
