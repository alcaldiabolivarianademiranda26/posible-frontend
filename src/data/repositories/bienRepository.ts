import type { Bien } from '../../domain/entities/Bien';
import { bienesMock } from '../mocks/bienesMock';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class BienRepository {
  private bienes: Bien[] = [...bienesMock];

  async obtenerTodos(): Promise<Bien[]> {
    await delay(500);
    return [...this.bienes];
  }

  async obtenerPorId(id: string): Promise<Bien | undefined> {
    await delay(300);
    return this.bienes.find(b => b.id === id);
  }

  async guardar(bien: Bien): Promise<Bien> {
    await delay(500);
    const index = this.bienes.findIndex(b => b.id === bien.id);
    if (index >= 0) {
      this.bienes[index] = bien;
    } else {
      this.bienes.unshift(bien);
    }
    return bien;
  }

  async eliminar(id: string): Promise<void> {
    await delay(500);
    this.bienes = this.bienes.filter(b => b.id !== id);
  }
}

export const bienRepository = new BienRepository();
