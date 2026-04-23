import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Droplets, 
  Route, 
  Trash2, 
  ShieldAlert, 
  Lightbulb, 
  Bus,
  Box,
  Settings,
  LogOut,
  ChevronDown,
  Building2
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const serviciosPublicos = [
  { name: 'Aguas', icon: Droplets, path: '/servicios/aguas' },
  { name: 'Vialidad', icon: Route, path: '/servicios/vialidad' },
  { name: 'Aseo Urbano', icon: Trash2, path: '/servicios/aseo' },
  { name: 'Seguridad', icon: ShieldAlert, path: '/servicios/seguridad' },
  { name: 'Alumbrado', icon: Lightbulb, path: '/servicios/alumbrado' },
  { name: 'Transporte', icon: Bus, path: '/servicios/transporte' },
];

export const Sidebar: React.FC = () => {
  const [serviciosOpen, setServiciosOpen] = useState(true);
  const logout = useAuthStore(state => state.logout);

  return (
    <aside className="w-64 bg-primary text-white flex flex-col h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <Building2 className="w-8 h-8 text-white" />
        <div>
          <h2 className="font-bold text-lg leading-tight tracking-tight">Portal</h2>
          <p className="text-xs text-white/70">Administrativo</p>
        </div>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-white/20 text-white font-medium' : 'text-white/80 hover:bg-white/10 hover:text-white'}`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>

        <div className="pt-4">
          <button 
            onClick={() => setServiciosOpen(!serviciosOpen)}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-white/50 uppercase tracking-wider hover:text-white transition-colors"
          >
            Servicios Públicos
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${serviciosOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {serviciosOpen && (
            <div className="mt-2 space-y-1 pl-2 border-l border-white/10 ml-3">
              {serviciosPublicos.map((srv) => (
                <NavLink 
                  key={srv.path}
                  to={srv.path} 
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${isActive ? 'bg-white/15 text-white font-medium' : 'text-white/70 hover:bg-white/10 hover:text-white'}`
                  }
                >
                  <srv.icon className="w-4 h-4" />
                  {srv.name}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4">
          <p className="px-3 py-2 text-xs font-semibold text-white/50 uppercase tracking-wider">Gestión Interna</p>
          <NavLink 
            to="/bienes" 
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors mt-1 ${isActive ? 'bg-white/20 text-white font-medium' : 'text-white/80 hover:bg-white/10 hover:text-white'}`
            }
          >
            <Box className="w-5 h-5" />
            Control de Bienes
          </NavLink>
        </div>
      </nav>

      <div className="p-4 border-t border-white/10 space-y-1">
        <NavLink 
          to="/configuracion" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${isActive ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`
          }
        >
          <Settings className="w-4 h-4" />
          Configuración
        </NavLink>
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm text-red-300 hover:bg-red-500/20 hover:text-red-200"
        >
          <LogOut className="w-4 h-4" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};
