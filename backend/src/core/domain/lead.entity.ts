import { EstadoLead, Lead, HistorialItem, Prioridad } from './tipos';

export class LeadEntity implements Lead {
  constructor(
    public id: string,
    public cliente: Lead['cliente'],
    public dispositivo: Lead['dispositivo'],
    public fechaEntrada: Date,
    public estado: EstadoLead,
    public prioridad: Prioridad,
    public historial: HistorialItem[] = [],
    public tecnicoAsignado?: string,
    public presupuesto?: number,
    public fechaEntregaEstimada?: Date,
    public notas: string[] = []
  ) {}

  cambiarEstado(nuevoEstado: EstadoLead, usuario: string, nota?: string): void {
    const historialItem: HistorialItem = {
      fecha: new Date(),
      accion: `Cambio de estado: ${this.estado} -> ${nuevoEstado}`,
      usuario,
      notas: nota
    };

    this.estado = nuevoEstado;
    this.historial.push(historialItem);
  }

  asignarTecnico(tecnico: string, usuario: string): void {
    this.tecnicoAsignado = tecnico;
    this.historial.push({
      fecha: new Date(),
      accion: `Técnico asignado: ${tecnico}`,
      usuario
    });
  }

  agregarNota(nota: string, usuario: string): void {
    this.notas.push(nota);
    this.historial.push({
      fecha: new Date(),
      accion: 'Nota agregada',
      usuario,
      notas: nota
    });
  }

  calcularFechaEntrega(): Date {
    const fecha = new Date(this.fechaEntrada);
    // Lógica para calcular fecha de entrega basada en prioridad
    const dias = this.prioridad === 'urgente' ? 1 : 
                 this.prioridad === 'alta' ? 2 : 
                 this.prioridad === 'media' ? 4 : 7;
    
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }
}
