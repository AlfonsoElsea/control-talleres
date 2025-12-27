import React from 'react';
import { EstadoLead } from '../../types';
import { 
  Circle, 
  Phone, 
  Search, 
  CheckCircle, 
  Wrench,
  Package,
  Truck,
  XCircle
} from 'lucide-react';

interface LeadStatusBadgeProps {
  estado: EstadoLead;
}

const LeadStatusBadge: React.FC<LeadStatusBadgeProps> = ({ estado }) => {
  const getStatusConfig = (estado: EstadoLead) => {
    const configs = {
      nuevo: {
        icon: Circle,
        color: 'bg-blue-500/20 text-blue-400',
        gradient: 'from-blue-500 to-cyan-500',
        label: 'Nuevo'
      },
      contactado: {
        icon: Phone,
        color: 'bg-purple-500/20 text-purple-400',
        gradient: 'from-purple-500 to-pink-500',
        label: 'Contactado'
      },
      diagnostico: {
        icon: Search,
        color: 'bg-amber-500/20 text-amber-400',
        gradient: 'from-amber-500 to-orange-500',
        label: 'Diagnóstico'
      },
      presupuesto_aceptado: {
        icon: CheckCircle,
        color: 'bg-emerald-500/20 text-emerald-400',
        gradient: 'from-emerald-500 to-green-500',
        label: 'Presupuesto Aceptado'
      },
      en_reparacion: {
        icon: Wrench,
        color: 'bg-indigo-500/20 text-indigo-400',
        gradient: 'from-indigo-500 to-blue-500',
        label: 'En Reparación'
      },
      reparado: {
        icon: Package,
        color: 'bg-green-500/20 text-green-400',
        gradient: 'from-green-500 to-emerald-500',
        label: 'Reparado'
      },
      entregado: {
        icon: Truck,
        color: 'bg-teal-500/20 text-teal-400',
        gradient: 'from-teal-500 to-cyan-500',
        label: 'Entregado'
      },
      perdido: {
        icon: XCircle,
        color: 'bg-red-500/20 text-red-400',
        gradient: 'from-red-500 to-rose-500',
        label: 'Perdido'
      },
    };
    return configs[estado];
  };

  const config = getStatusConfig(estado);
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${config.color}`}>
      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${config.gradient}`} />
      <Icon className="w-3.5 h-3.5" />
      <span className="text-sm font-medium">{config.label}</span>
    </div>
  );
};

export default LeadStatusBadge;
