export type EstadoLead = 
  | 'nuevo' 
  | 'contactado' 
  | 'diagnostico' 
  | 'presupuesto_aceptado' 
  | 'en_reparacion' 
  | 'reparado' 
  | 'entregado' 
  | 'perdido';

export type Prioridad = 'baja' | 'media' | 'alta' | 'urgente';

export interface Dispositivo {
  marca: string;
  modelo: string;
  problema: string;
  accesorios?: string[];
  imei?: string;
}

export interface LeadDTO {
  id: string;
  cliente: ClienteDTO;
  dispositivo: Dispositivo;
  fechaEntrada: Date;
  estado: EstadoLead;
  prioridad: Prioridad;
  tecnicoAsignado?: string;
  presupuesto?: number;
  fechaEntregaEstimada?: Date;
  notas?: string[];
  historial: HistorialItemDTO[];
}

export interface CrearLeadDTO {
  cliente: {
    nombre: string;
    telefono: string;
    email?: string;
  };
  dispositivo: {
    marca: string;
    modelo: string;
    problema: string;
    accesorios?: string[];
    imei?: string;
  };
  prioridad?: Prioridad;
  notasIniciales?: string;
}

export interface ActualizarLeadDTO {
  estado?: EstadoLead;
  tecnicoAsignado?: string;
  presupuesto?: number;
  notas?: string[];
}

export interface HistorialItemDTO {
  fecha: Date;
  accion: string;
  usuario: string;
  notas?: string;
}
