import type { Reporte } from '../../domain/entities/Reporte';
import { reportesMock } from '../mocks/reportesMock';

// Simulando latencia de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class ReporteRepository {
  private reportes: Reporte[] = [...reportesMock];

  async obtenerTodos(): Promise<Reporte[]> {
    await delay(500);
    return [...this.reportes];
  }

  async obtenerPorId(id: string): Promise<Reporte | undefined> {
    await delay(300);
    return this.reportes.find(r => r.id === id);
  }

  async guardar(reporte: Reporte): Promise<Reporte> {
    await delay(500);
    const index = this.reportes.findIndex(r => r.id === reporte.id);
    if (index >= 0) {
      this.reportes[index] = reporte;
    } else {
      this.reportes.unshift(reporte);
    }
    return reporte;
  }
}

export const reporteRepository = new ReporteRepository();
