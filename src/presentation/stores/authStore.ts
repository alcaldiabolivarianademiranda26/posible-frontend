import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Usuario } from '../../domain/entities/Usuario';
import { usuariosMock } from '../../data/mocks/usuariosMock';

interface AuthState {
  user: Usuario | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email: string) => {
        // Simulando latencia
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        const user = usuariosMock.find(u => u.email === email);
        if (user) {
          set({
            user,
            token: `mock-jwt-token-${user.id}`,
            isAuthenticated: true
          });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);
