export interface TallerLeadsModuleConfig {
  // Configuración de base de datos
  database?: {
    type: 'mongodb' | 'postgres' | 'mysql' | 'sqlite' | 'memory';
    connectionString?: string;
    options?: Record<string, any>;
  };
  
  // Configuración de notificaciones
  notifications?: {
    enabled: boolean;
    providers: Array<'sms' | 'email' | 'whatsapp'>;
    templates?: {
      nuevoLead?: string;
      cambioEstado?: string;
    };
  };
  
  // Configuración de negocio
  business?: {
    tiempoMaximoReparacion: number; // en horas
    prioridades: Record<Prioridad, number>; // días para cada prioridad
    estadosPermitidos: EstadoLead[];
  };
  
  // Integraciones
  integrations?: {
    sistemaExterno?: {
      url: string;
      apiKey?: string;
    };
    facturacion?: {
      enabled: boolean;
      servicioUrl: string;
    };
  };
}

export const defaultConfig: TallerLeadsModuleConfig = {
  database: {
    type: 'memory',
  },
  notifications: {
    enabled: false,
    providers: [],
  },
  business: {
    tiempoMaximoReparacion: 168, // 7 días
    prioridades: {
      baja: 7,
      media: 4,
      alta: 2,
      urgente: 1,
    },
    estadosPermitidos: ['nuevo', 'contactado', 'diagnostico', 'presupuesto_aceptado', 
                       'en_reparacion', 'reparado', 'entregado', 'perdido'],
  },
};
