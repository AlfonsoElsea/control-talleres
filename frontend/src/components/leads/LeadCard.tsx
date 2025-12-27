import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, Phone, Clock, AlertCircle, 
  ChevronRight, Smartphone, Calendar,
  DollarSign, UserCircle
} from 'lucide-react';
import { Lead, EstadoLead } from '../../types';
import LeadStatusBadge from './LeadStatusBadge';

interface LeadCardProps {
  lead: Lead;
  onClick: () => void;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, onClick }) => {
  const getPriorityColor = () => {
    switch (lead.prioridad) {
      case 'urgente': return 'bg-gradient-to-r from-danger-500/20 to-danger-600/20 border-danger-500/30';
      case 'alta': return 'bg-gradient-to-r from-warning-500/20 to-warning-600/20 border-warning-500/30';
      case 'media': return 'bg-gradient-to-r from-primary-500/20 to-primary-600/20 border-primary-500/30';
      default: return 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 border-gray-500/30';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={`glass-card rounded-2xl p-5 cursor-pointer transition-all duration-300 
                 hover:border-primary-500/50 border border-white/10 ${getPriorityColor()}`}
    >
      {/* Header con prioridad y estado */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded-lg">
            <Smartphone className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{lead.cliente.nombre}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Phone className="w-4 h-4" />
              {lead.cliente.telefono}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <LeadStatusBadge estado={lead.estado} />
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            lead.prioridad === 'urgente' ? 'bg-danger-500/20 text-danger-300' :
            lead.prioridad === 'alta' ? 'bg-warning-500/20 text-warning-300' :
            lead.prioridad === 'media' ? 'bg-primary-500/20 text-primary-300' :
            'bg-gray-500/20 text-gray-300'
          }`}>
            {lead.prioridad.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Información del dispositivo */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-primary-500 rounded-full" />
          <span className="text-sm font-medium">Dispositivo</span>
        </div>
        <div className="flex items-center justify-between bg-white/5 rounded-xl p-3">
          <div>
            <p className="font-semibold">{lead.dispositivo.marca} {lead.dispositivo.modelo}</p>
            <p className="text-sm text-gray-400 truncate">{lead.dispositivo.problema}</p>
          </div>
          {lead.dispositivo.imei && (
            <span className="text-xs font-mono bg-black/30 px-2 py-1 rounded">
              IMEI: {lead.dispositivo.imei.slice(-6)}
            </span>
          )}
        </div>
      </div>

      {/* Detalles */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>{formatDate(lead.fechaEntrada)}</span>
        </div>
        
        {lead.presupuesto && (
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span>${lead.presupuesto.toLocaleString()}</span>
          </div>
        )}
        
        {lead.tecnicoAsignado && (
          <div className="flex items-center gap-2 text-sm col-span-2">
            <UserCircle className="w-4 h-4 text-gray-400" />
            <span className="truncate">Téc: {lead.tecnicoAsignado}</span>
          </div>
        )}
      </div>

      {/* Footer con acciones */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          {lead.notas.length > 0 && (
            <span className="text-xs text-gray-400">
              {lead.notas.length} nota{lead.notas.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        
        <motion.button
          whileHover={{ x: 5 }}
          className="flex items-center gap-1 text-primary-400 hover:text-primary-300"
        >
          <span className="text-sm font-medium">Ver detalles</span>
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LeadCard;
