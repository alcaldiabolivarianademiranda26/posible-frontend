export type RolUsuario = 'Admin' | 'Operador' | 'Lector';

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: RolUsuario;
  departamento?: string;
  avatarUrl?: string;
}
