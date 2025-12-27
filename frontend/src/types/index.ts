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

export interface Lead {
  id: string;
  cliente: {
    nombre: string;
    telefono: string;
    email?: string;
    notas?: string;
  };
  dispositivo: {
    marca: string;
    modelo: string;
    problema: string;
    accesorios: string[];
    imei?: string;
  };
  fechaEntrada: Date;
  estado: EstadoLead;
  prioridad: Prioridad;
  tecnicoAsignado?: string;
  presupuesto?: number;
  fechaEntregaEstimada?: Date;
  notas: string[];
  historial: Array<{
    fecha: Date;
    accion: string;
    usuario: string;
    notas?: string;
  }>;
}

export interface Estadisticas {
  totalLeads: number;
  leadsNuevos: number;
  tasaConversion: number;
  ingresosTotales: number;
  tiempoPromedioReparacion: number;
}
