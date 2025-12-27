import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Phone, 
  Wrench, 
  BarChart3,
  Settings,
  Bell,
  HelpCircle,
  LogOut
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/leads', icon: Users, label: 'Leads' },
    { path: '/nuevo-lead', icon: Phone, label: 'Nuevo Lead' },
    { path: '/tecnicos', icon: Wrench, label: 'Técnicos' },
    { path: '/reportes', icon: BarChart3, label: 'Reportes' },
    { path: '/configuracion', icon: Settings, label: 'Configuración' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-surface border-r border-white/10 z-50">
      {/* Logo con efecto */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-success-500 rounded-full border-2 border-surface" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              TallerTech
            </h1>
            <p className="text-xs text-gray-500">Leads Manager</p>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary-500/20 text-primary-400 border-l-4 border-primary-500'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Notificaciones rápidas */}
      <div className="mt-auto p-4 border-t border-white/10">
        <div className="space-y-4">
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 w-full">
            <Bell className="w-5 h-5" />
            <span className="font-medium">Notificaciones</span>
            <span className="ml-auto w-2 h-2 bg-danger-500 rounded-full" />
          </button>
          
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 w-full">
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium">Ayuda</span>
          </button>
        </div>
      </div>

      {/* Perfil */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
            <span className="font-bold text-white">AM</span>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">Admin Manager</p>
            <p className="text-xs text-gray-500">Administrador</p>
          </div>
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <LogOut className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
