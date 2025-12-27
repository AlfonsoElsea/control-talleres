import { LeadEntity } from '../../core/domain/lead.entity';
import { ILeadRepository } from '../../infrastructure/persistence/database/repositories/lead.repository.interface';
import { Cliente } from '../../core/domain/tipos';

export class CrearLeadUseCase {
  constructor(private leadRepository: ILeadRepository) {}

  async execute(data: {
    cliente: Cliente;
    dispositivo: {
      marca: string;
      modelo: string;
      problema: string;
      accesorios?: string[];
      imei?: string;
    };
    prioridad?: 'baja' | 'media' | 'alta' | 'urgente';
    notasIniciales?: string;
  }): Promise<LeadEntity> {
    
    // Validaciones
    if (!data.cliente.telefono) {
      throw new Error('El teléfono del cliente es obligatorio');
    }

    if (!data.dispositivo.problema) {
      throw new Error('La descripción del problema es obligatoria');
    }

    // Crear entidad
    const lead = new LeadEntity(
      this.generateId(),
      data.cliente,
      {
        ...data.dispositivo,
        accesorios: data.dispositivo.accesorios || []
      },
      new Date(),
      'nuevo',
      data.prioridad || 'media'
    );

    if (data.notasIniciales) {
      lead.agregarNota(data.notasIniciales, 'sistema');
    }

    // Calcular fecha estimada de entrega
    lead.fechaEntregaEstimada = lead.calcularFechaEntrega();

    // Guardar en repositorio
    return await this.leadRepository.guardar(lead);
  }

  private generateId(): string {
    return `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
