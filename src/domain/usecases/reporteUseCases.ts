import type { Reporte, EstadoReporte, CategoriaServicio } from '../entities/Reporte';

// Estos UseCases son interfaces o funciones puras que dictan las reglas de negocio.
// La implementación real usará Zustand/Mocks en la capa de datos.

export const filtrarReportes = (
  reportes: Reporte[], 
  filtros: { categoria?: CategoriaServicio, estado?: EstadoReporte, busqueda?: string }
): Reporte[] => {
  return reportes.filter(r => {
    let coincide = true;
    if (filtros.categoria && r.categoria !== filtros.categoria) coincide = false;
    if (filtros.estado && r.estado !== filtros.estado) coincide = false;
    if (filtros.busqueda) {
      const q = filtros.busqueda.toLowerCase();
      if (!r.numeroContacto.toLowerCase().includes(q) && !r.id.toLowerCase().includes(q)) {
        coincide = false;
      }
    }
    return coincide;
  });
};

export const calcularKpisReportes = (reportes: Reporte[]) => {
  const activos = reportes.filter(r => r.estado !== 'Resuelto' && r.estado !== 'Rechazado').length;
  const resueltosMes = reportes.filter(r => {
    if (r.estado !== 'Resuelto') return false;
    const mesActual = new Date().getMonth();
    return new Date(r.fechaActualizacion).getMonth() === mesActual;
  }).length;
  const tasaResolucion = reportes.length > 0 
    ? ((reportes.filter(r => r.estado === 'Resuelto').length / reportes.length) * 100).toFixed(1)
    : '0.0';

  return {
    activos,
    resueltosMes,
    tasaResolucion: parseFloat(tasaResolucion)
  };
};
