import type { Reporte, CategoriaServicio, EstadoReporte, PrioridadReporte } from '../../domain/entities/Reporte';

const categorias: CategoriaServicio[] = ['Aguas', 'Vialidad', 'Aseo Urbano', 'Seguridad', 'Alumbrado', 'Transporte'];
const estados: EstadoReporte[] = ['Pendiente', 'En Proceso', 'Resuelto', 'Rechazado'];
const prioridades: PrioridadReporte[] = ['Alta', 'Media', 'Baja'];


const descripciones = [
  "Bote de aguas blancas en la calle principal, afectando el paso peatonal.",
  "Semáforo dañado en la intersección, generando fuerte retraso vehicular.",
  "Acumulación de basura desde hace 3 días en la esquina de la plaza.",
  "Robo de alcantarilla, representa un peligro para los conductores.",
  "Poste de luz sin funcionar, la calle queda totalmente a oscuras de noche.",
  "Falla en el servicio de transporte público, las unidades no están pasando.",
  "Tubería rota inundando la acera y parte de la vía.",
  "Hueco profundo en la avenida principal que daña los vehículos.",
  "Falta de recolección de desechos sólidos en el sector residencial.",
  "Necesidad de patrullaje policial constante en la zona por reportes de seguridad."
];

const generarReportesMock = (cantidad: number): Reporte[] => {
  const reportes: Reporte[] = [];
  const now = new Date();

  for (let i = 1; i <= cantidad; i++) {
    const categoria = categorias[Math.floor(Math.random() * categorias.length)];
    const estado = estados[Math.floor(Math.random() * estados.length)];
    const prioridad = prioridades[Math.floor(Math.random() * prioridades.length)];
    const esResuelto = estado === 'Resuelto';

    // Fechas entre hace 30 días y hoy
    const diasAtras = Math.floor(Math.random() * 30);
    const fechaCreacion = new Date(now.getTime() - diasAtras * 24 * 60 * 60 * 1000);
    const fechaActualizacion = esResuelto
      ? new Date(fechaCreacion.getTime() + Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000)
      : new Date(fechaCreacion.getTime() + Math.floor(Math.random() * 2) * 24 * 60 * 60 * 1000);

    reportes.push({
      id: `REP-${now.getFullYear()}-${String(i).padStart(4, '0')}`,
      numeroContacto: `+58 412 ${Math.floor(1000000 + Math.random() * 9000000)}`,
      descripcion: descripciones[Math.floor(Math.random() * descripciones.length)],
      categoria,
      estado,
      prioridad,
      sector: `Sector ${Math.floor(Math.random() * 10) + 1}, Calle ${Math.floor(Math.random() * 20) + 1}`,
      fechaCreacion,
      fechaActualizacion,
      usuarioAsignado: Math.random() > 0.5 ? 'Admin' : 'Operador',
      ciudadanoReporta: `Ciudadano ${i}`
    });
  }

  return reportes.sort((a, b) => b.fechaCreacion.getTime() - a.fechaCreacion.getTime());
};

export const reportesMock = generarReportesMock(5);
