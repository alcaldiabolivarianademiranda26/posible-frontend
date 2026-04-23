import type { Reporte, CategoriaServicio, EstadoReporte, PrioridadReporte } from '../../domain/entities/Reporte';

const categorias: CategoriaServicio[] = ['Aguas', 'Vialidad', 'Aseo Urbano', 'Seguridad', 'Alumbrado', 'Transporte'];
const estados: EstadoReporte[] = ['Pendiente', 'En Proceso', 'Resuelto', 'Rechazado'];
const prioridades: PrioridadReporte[] = ['Alta', 'Media', 'Baja'];

const descripciones = [
  "Bote de aguas blancas en la calle principal",
  "Semáforo dañado en la intersección",
  "Acumulación de basura desde hace 3 días",
  "Robo de alcantarilla",
  "Poste de luz sin funcionar",
  "Falla en el servicio de transporte público",
  "Tubería rota inundando la acera",
  "Hueco profundo en la avenida",
  "Falta de recolección de desechos sólidos",
  "Necesidad de patrullaje policial en la zona"
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
      titulo: descripciones[Math.floor(Math.random() * descripciones.length)],
      descripcion: "Detalle completo del reporte ciudadano con información adicional y contexto de la situación reportada por el usuario en el sistema.",
      categoria,
      estado,
      prioridad,
      ubicacion: `Sector ${Math.floor(Math.random() * 10) + 1}, Calle ${Math.floor(Math.random() * 20) + 1}`,
      fechaCreacion,
      fechaActualizacion,
      usuarioAsignado: Math.random() > 0.5 ? 'Admin' : 'Operador',
      ciudadanoReporta: `Ciudadano ${i}`
    });
  }

  return reportes.sort((a, b) => b.fechaCreacion.getTime() - a.fechaCreacion.getTime());
};

export const reportesMock = generarReportesMock(50);
