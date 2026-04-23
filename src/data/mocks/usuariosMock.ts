import type { Usuario } from '../../domain/entities/Usuario';

export const usuariosMock: Usuario[] = [
  {
    id: 'USR-001',
    nombre: 'Administrador Principal',
    email: 'admin@institucion.gob',
    rol: 'Admin',
    departamento: 'Dirección General'
  },
  {
    id: 'USR-002',
    nombre: 'Operador de Servicios',
    email: 'operador@institucion.gob',
    rol: 'Operador',
    departamento: 'Atención Ciudadana'
  }
];
