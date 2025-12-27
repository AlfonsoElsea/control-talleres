// Puerto para persistencia
export interface ILeadRepository {
  guardar(lead: LeadEntity): Promise<LeadEntity>;
  buscarPorId(id: string): Promise<LeadEntity | null>;
  buscarPorTelefono(telefono: string): Promise<LeadEntity[]>;
  buscarPorEstado(estado: EstadoLead): Promise<LeadEntity[]>;
  actualizar(id: string, datos: Partial<LeadEntity>): Promise<LeadEntity | null>;
  eliminar(id: string): Promise<boolean>;
  listar(filtros?: LeadFiltrosDTO): Promise<LeadEntity[]>;
}

// Puerto para notificaciones
export interface INotificationService {
  notificarNuevoLead(lead: LeadDTO): Promise<void>;
  notificarCambioEstado(lead: LeadDTO, anteriorEstado: EstadoLead): Promise<void>;
}

// Puerto para generación de reportes
export interface IReportService {
  generarReporteDiario(): Promise<ReporteDiarioDTO>;
  generarReporteTecnico(tecnicoId: string, periodo: PeriodoDTO): Promise<ReporteTecnicoDTO>;
}

// DTOs para filtros
export interface LeadFiltrosDTO {
  estado?: EstadoLead;
  tecnicoAsignado?: string;
  fechaDesde?: Date;
  fechaHasta?: Date;
  prioridad?: Prioridad;
}
