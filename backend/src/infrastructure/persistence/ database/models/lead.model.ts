import mongoose, { Schema, Document } from 'mongoose';
import { EstadoLead, Prioridad } from '../../../../core/domain/tipos';

export interface ILeadDocument extends Document {
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

const LeadSchema = new Schema({
  cliente: {
    nombre: { type: String, required: true },
    telefono: { type: String, required: true },
    email: { type: String },
    notas: { type: String }
  },
  dispositivo: {
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    problema: { type: String, required: true },
    accesorios: [{ type: String }],
    imei: { type: String }
  },
  fechaEntrada: { type: Date, default: Date.now },
  estado: { 
    type: String, 
    enum: ['nuevo', 'contactado', 'diagnostico', 'presupuesto_aceptado', 
           'en_reparacion', 'reparado', 'entregado', 'perdido'],
    default: 'nuevo'
  },
  prioridad: { 
    type: String, 
    enum: ['baja', 'media', 'alta', 'urgente'],
    default: 'media'
  },
  tecnicoAsignado: { type: String },
  presupuesto: { type: Number },
  fechaEntregaEstimada: { type: Date },
  notas: [{ type: String }],
  historial: [{
    fecha: { type: Date, default: Date.now },
    accion: { type: String, required: true },
    usuario: { type: String, required: true },
    notas: { type: String }
  }]
}, {
  timestamps: true
});

export const LeadModel = mongoose.model<ILeadDocument>('Lead', LeadSchema);
