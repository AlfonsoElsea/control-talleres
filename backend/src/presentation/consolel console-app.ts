import * as readline from 'readline';
import { CrearLeadUseCase } from '../application/use-cases/crear-lead.usecase';
import { JsonLeadRepository } from '../infrastructure/persistence/local-storage/json-storage';

class ConsoleApp {
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async iniciar() {
    console.log('=== Sistema de Gestión de Leads - Taller de Teléfonos ===\n');
    
    while (true) {
      const opcion = await this.preguntar(
        'Seleccione una opción:\n' +
        '1. Crear nuevo lead\n' +
        '2. Ver leads\n' +
        '3. Buscar lead\n' +
        '4. Actualizar estado\n' +
        '5. Salir\n' +
        'Opción: '
      );

      switch (opcion) {
        case '1':
          await this.crearLead();
          break;
        case '2':
          await this.verLeads();
          break;
        case '3':
          await this.buscarLead();
          break;
        case '4':
          await this.actualizarEstado();
          break;
        case '5':
          console.log('¡Hasta luego!');
          this.rl.close();
          return;
        default:
          console.log('Opción no válida\n');
      }
    }
  }

  private async crearLead() {
    console.log('\n--- Crear Nuevo Lead ---');
    
    const nombre = await this.preguntar('Nombre del cliente: ');
    const telefono = await this.preguntar('Teléfono: ');
    const marca = await this.preguntar('Marca del dispositivo: ');
    const modelo = await this.preguntar('Modelo: ');
    const problema = await this.preguntar('Problema: ');
    
    // Aquí usarías el use case real
    console.log(`Lead creado para ${nombre} - ${telefono}`);
    console.log('Dispositivo:', marca, modelo);
    console.log('Problema:', problema);
    console.log('Lead registrado exitosamente!\n');
  }

  private async verLeads() {
    console.log('\n--- Lista de Leads ---');
    // Implementar lógica para mostrar leads
    console.log('Función en desarrollo...\n');
  }

  private preguntar(pregunta: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(pregunta, resolve);
    });
  }
}

// Iniciar aplicación
const app = new ConsoleApp();
app.iniciar();
