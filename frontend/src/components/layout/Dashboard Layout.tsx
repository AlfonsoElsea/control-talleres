import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { motion } from 'framer-motion';

const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-gray-200 flex">
      {/* Fondo con efectos */}
      <div className="particles-bg" />
      
      <Sidebar />
      
      <div className="flex-1 flex flex-col ml-64">
        <Topbar />
        
        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 p-6 overflow-y-auto"
        >
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </motion.main>
        
        <footer className="border-t border-white/10 py-4 px-6">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
              <span>Sistema en línea</span>
            </div>
            <span>© 2024 TallerTech Leads v1.0</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
