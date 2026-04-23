import { create } from 'zustand';
import type { Bien } from '../../domain/entities/Bien';
import { bienRepository } from '../../data/repositories/bienRepository';

interface BienState {
  bienes: Bien[];
  loading: boolean;
  error: string | null;
  fetchBienes: () => Promise<void>;
  updateBien: (bien: Bien) => Promise<void>;
  deleteBien: (id: string) => Promise<void>;
}

export const useBienStore = create<BienState>((set) => ({
  bienes: [],
  loading: false,
  error: null,
  fetchBienes: async () => {
    set({ loading: true, error: null });
    try {
      const data = await bienRepository.obtenerTodos();
      set({ bienes: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
  updateBien: async (bien: Bien) => {
    try {
      const updated = await bienRepository.guardar(bien);
      set((state) => ({
        bienes: state.bienes.map(b => b.id === updated.id ? updated : b)
      }));
    } catch (err: any) {
      set({ error: err.message });
    }
  },
  deleteBien: async (id: string) => {
    try {
      await bienRepository.eliminar(id);
      set((state) => ({
        bienes: state.bienes.filter(b => b.id !== id)
      }));
    } catch (err: any) {
      set({ error: err.message });
    }
  }
}));
