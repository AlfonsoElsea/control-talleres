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

export interface Cliente {
  id: string;
  nombre: string;
  telefono: string;
  email?: string;
  notas?: string;
  fechaRegistro: Date;
}

export interface Lead {
  id: string;
  cliente: Cliente;
  dispositivo: Dispositivo;
  fechaEntrada: Date;
  estado: EstadoLead;
  prioridad: Prioridad;
  tecnicoAsignado?: string;
  presupuesto?: number;
  fechaEntregaEstimada?: Date;
  notas?: string[];
  historial: HistorialItem[];
}

export interface HistorialItem {
  fecha: Date;
  accion: string;
  usuario: string;
  notas?: string;
}

export interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  precioBase: number;
  tiempoEstimado: number; // en horas
  categoria: 'pantalla' | 'bateria' | 'software' | 'conector' | 'otros';
}
