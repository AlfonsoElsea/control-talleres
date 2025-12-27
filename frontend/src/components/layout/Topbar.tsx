import React, { useState } from 'react';
import { Search, Filter, Download, Plus, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Topbar: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-white/10">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Breadcrumb y título */}
          <div>
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p className="text-sm text-gray-500">Gestión de leads y reparaciones</p>
          </div>

          {/* Acciones y búsqueda */}
          <div className="flex items-center gap-4">
            {/* Barra de búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar leads, clientes..."
                className="pl-10 pr-4 py-2 w-64 bg-white/5 border border-white/10 rounded-xl 
                         text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
              />
            </div>

            {/* Filtros rápidos */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
            >
              <Filter className="w-5 h-5" />
            </motion.button>

            {/* Calendario */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
            >
              <Calendar className="w-5 h-5" />
            </motion.button>

            {/* Exportar */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
            >
              <Download className="w-5 h-5" />
            </motion.button>

            {/* Botón principal - Nuevo Lead */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              <Plus className="w-5 h-5" />
              Nuevo Lead
            </motion.button>
          </div>
        </div>

        {/* Stats en tiempo real */}
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">
              <span className="text-white font-semibold">12</span> leads activos
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-warning-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">
              <span className="text-white font-semibold">3</span> urgentes
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">
              <span className="text-white font-semibold">8</span> completados hoy
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
