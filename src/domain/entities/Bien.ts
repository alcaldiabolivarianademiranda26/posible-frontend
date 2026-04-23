export type TipoBien = 'Mueble' | 'Inmueble';

export type EstadoBien = 
  | 'Funcional' 
  | 'Requiere Mantenimiento' 
  | 'Dañado';

export interface HistorialCambio {
  id: string;
  fecha: Date;
  usuario: string;
  cambio: string; // Ej: "Cambio de estado: Funcional -> Dañado"
  detalles?: string;
}

export interface Bien {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: TipoBien;
  valorEstimado: number;
  ubicacion: string;
  estadoFisico: EstadoBien;
  fechaRegistro: Date;
  historial: HistorialCambio[];
}
