import { create } from 'zustand';
import type { Reporte } from '../../domain/entities/Reporte';
import { reporteRepository } from '../../data/repositories/reporteRepository';

interface ReporteState {
  reportes: Reporte[];
  loading: boolean;
  error: string | null;
  fetchReportes: () => Promise<void>;
  updateReporte: (reporte: Reporte) => Promise<void>;
}

export const useReporteStore = create<ReporteState>((set) => ({
  reportes: [],
  loading: false,
  error: null,
  fetchReportes: async () => {
    set({ loading: true, error: null });
    try {
      const data = await reporteRepository.obtenerTodos();
      set({ reportes: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
  updateReporte: async (reporte: Reporte) => {
    try {
      const updated = await reporteRepository.guardar(reporte);
      set((state) => ({
        reportes: state.reportes.map(r => r.id === updated.id ? updated : r)
      }));
    } catch (err: any) {
      set({ error: err.message });
    }
  }
}));
