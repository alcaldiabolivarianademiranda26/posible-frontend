export type CategoriaServicio =
  | 'Aguas'
  | 'Vialidad'
  | 'Aseo Urbano'
  | 'Seguridad'
  | 'Alumbrado'
  | 'Transporte';

export type EstadoReporte =
  | 'Pendiente'
  | 'En Proceso'
  | 'Resuelto'
  | 'Rechazado';

export type PrioridadReporte =
  | 'Alta'
  | 'Media'
  | 'Baja';

export interface Reporte {
  id: string;
  numeroContacto: string;
  descripcion: string;
  categoria: CategoriaServicio;
  estado: EstadoReporte;
  prioridad: PrioridadReporte;
  sector: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  usuarioAsignado?: string;
  ciudadanoReporta?: string;
}

export interface TransicionEstado {
  de: EstadoReporte;
  a: EstadoReporte;
  fecha: Date;
  usuario: string;
  comentario?: string;
}
