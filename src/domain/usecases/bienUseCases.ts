import type { Bien, TipoBien, EstadoBien } from '../entities/Bien';

export const filtrarBienes = (
  bienes: Bien[],
  filtros: { tipo?: TipoBien, estado?: EstadoBien, busqueda?: string }
): Bien[] => {
  return bienes.filter(b => {
    let coincide = true;
    if (filtros.tipo && b.tipo !== filtros.tipo) coincide = false;
    if (filtros.estado && b.estadoFisico !== filtros.estado) coincide = false;
    if (filtros.busqueda) {
      const q = filtros.busqueda.toLowerCase();
      if (!b.nombre.toLowerCase().includes(q) && !b.id.toLowerCase().includes(q)) {
        coincide = false;
      }
    }
    return coincide;
  });
};

export const registrarCambioEstado = (bien: Bien, nuevoEstado: EstadoBien, usuario: string, detalles?: string): Bien => {
  if (bien.estadoFisico === nuevoEstado) return bien;
  
  const nuevoHistorial = {
    id: Math.random().toString(36).substr(2, 9),
    fecha: new Date(),
    usuario,
    cambio: `Cambio de estado: ${bien.estadoFisico} -> ${nuevoEstado}`,
    detalles
  };

  return {
    ...bien,
    estadoFisico: nuevoEstado,
    historial: [nuevoHistorial, ...bien.historial]
  };
};
