import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Smartphone,
  Activity
} from 'lucide-react';
import LeadCard from '../components/leads/LeadCard';
import StatsCard from '../components/layout/StatsCard';
import StatusChart from '../components/charts/StatusChart';
import PriorityChart from '../components/charts/PriorityChart';
import { Lead, Estadisticas } from '../types';

const Dashboard: React.FC = () => {
  const [estadisticas, setEstadisticas] = useState<Estadisticas>({
    totalLeads: 0,
    leadsNuevos: 0,
    tasaConversion: 0,
    ingresosTotales: 0,
    tiempoPromedioReparacion: 0,
  });

  const [leadsRecientes, setLeadsRecientes] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setEstadisticas({
        totalLeads: 156,
        leadsNuevos: 12,
        tasaConversion: 78,
        ingresosTotales: 45230,
        tiempoPromedioReparacion: 3.5,
      });

      setLeadsRecientes([
        {
          id: '1',
          cliente: { nombre: 'María González', telefono: '+5491122334455' },
          dispositivo: { marca: 'iPhone', modelo: '14 Pro', problema: 'Pantalla rota', accesorios: ['Cargador'] },
          fechaEntrada: new Date(),
          estado: 'urgente',
          prioridad: 'urgente',
          presupuesto: 45000,
          notas: [],
          historial: []
        },
        // ... más leads de ejemplo
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con título */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Panel de Control</h1>
          <p className="text-gray-500">Resumen general de tu taller</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Activity className="w-4 h-4 animate-pulse" />
          <span>Actualizado hace 5 min</span>
        </div>
      </div>

      {/* Grid de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Leads"
          value={estadisticas.totalLeads.toString()}
          change="+12%"
          icon={<Users className="w-6 h-6" />}
          color="from-blue-500 to-cyan-500"
        />
        
        <StatsCard
          title="Leads Nuevos"
          value={estadisticas.leadsNuevos.toString()}
          change="+5 hoy"
          icon={<Smartphone className="w-6 h-6" />}
          color="from-purple-500 to-pink-500"
        />
        
        <StatsCard
          title="Ingresos Totales"
          value={`$${estadisticas.ingresosTotales.toLocaleString()}`}
          change="+18%"
          icon={<DollarSign className="w-6 h-6" />}
          color="from-emerald-500 to-green-500"
        />
        
        <StatsCard
          title="Tasa Conversión"
          value={`${estadisticas.tasaConversion}%`}
          change="+2.3%"
          icon={<TrendingUp className="w-6 h-6" />}
          color="from-amber-500 to-orange-500"
        />
      </div>

      {/* Gráficos y leads recientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de estados */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold mb-6">Distribución por Estado</h2>
          <div className="h-64">
            <StatusChart />
          </div>
        </motion.div>

        {/* Gráfico de prioridades */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold mb-6">Distribución por Prioridad</h2>
          <div className="h-64">
            <PriorityChart />
          </div>
        </motion.div>
      </div>

      {/* Leads recientes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">Leads Recientes</h2>
            <p className="text-gray-500">Últimos leads agregados al sistema</p>
          </div>
          <button className="text-sm text-primary-400 hover:text-primary-300 font-medium">
            Ver todos →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leadsRecientes.map((lead, index) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <LeadCard
                lead={lead}
                onClick={() => console.log('Ver lead:', lead.id)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tiempo promedio */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              Tiempo Promedio de Reparación
            </h3>
            <p className="text-gray-500">Eficiencia del taller</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">
              {estadisticas.tiempoPromedioReparacion}h
            </div>
            <div className="text-sm text-gray-500">por dispositivo</div>
          </div>
        </div>
        
        {/* Barra de progreso */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Meta: 2.5h</span>
            <span className="text-emerald-500">-0.8h vs mes anterior</span>
          </div>
          <div className="h-3 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(estadisticas.tiempoPromedioReparacion / 8) * 100}%` }}
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
