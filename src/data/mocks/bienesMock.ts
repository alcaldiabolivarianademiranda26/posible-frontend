import type { Bien, TipoBien, EstadoBien } from '../../domain/entities/Bien';

const tipos: TipoBien[] = ['Mueble', 'Inmueble'];
const estados: EstadoBien[] = ['Funcional', 'Requiere Mantenimiento', 'Dañado'];

const nombresInmuebles = ['Sede Principal', 'Oficina de Tránsito', 'Almacén General', 'Plaza Central', 'Centro Deportivo'];
const nombresMuebles = ['Camioneta 4x4', 'Computadora de Escritorio', 'Servidor Principal', 'Retroexcavadora', 'Impresora Multifuncional'];

const generarBienesMock = (cantidad: number): Bien[] => {
  const bienes: Bien[] = [];
  const now = new Date();

  for (let i = 1; i <= cantidad; i++) {
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    const estadoFisico = estados[Math.floor(Math.random() * estados.length)];
    const nombre = tipo === 'Inmueble' 
      ? nombresInmuebles[Math.floor(Math.random() * nombresInmuebles.length)]
      : nombresMuebles[Math.floor(Math.random() * nombresMuebles.length)];
    
    const valorEstimado = tipo === 'Inmueble' 
      ? Math.floor(Math.random() * 500000) + 50000 
      : Math.floor(Math.random() * 20000) + 500;

    const diasAtras = Math.floor(Math.random() * 365);
    const fechaRegistro = new Date(now.getTime() - diasAtras * 24 * 60 * 60 * 1000);

    bienes.push({
      id: `BIEN-${now.getFullYear()}-${String(i).padStart(4, '0')}`,
      nombre: `${nombre} - ${String(i).padStart(3, '0')}`,
      descripcion: `Descripción detallada del bien institucional, características técnicas y uso destinado.`,
      tipo,
      valorEstimado,
      ubicacion: tipo === 'Inmueble' ? `Sector ${Math.floor(Math.random() * 5) + 1}` : 'Sede Principal',
      estadoFisico,
      fechaRegistro,
      historial: [
        {
          id: Math.random().toString(36).substr(2, 9),
          fecha: fechaRegistro,
          usuario: 'Admin',
          cambio: 'Registro Inicial en el sistema',
        }
      ]
    });
  }

  return bienes.sort((a, b) => b.fechaRegistro.getTime() - a.fechaRegistro.getTime());
};

export const bienesMock = generarBienesMock(30);
