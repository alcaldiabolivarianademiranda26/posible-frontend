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
  ChevronLeft,
  ChevronRight,
  Landmark,
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

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const [serviciosOpen, setServiciosOpen] = useState(true);
  const logout = useAuthStore(state => state.logout);

  return (
    <aside className={`custom-scrollbar bg-primary text-white flex flex-col h-screen fixed left-0 top-0 overflow-y-auto transition-all duration-300 z-50 ${isCollapsed ? 'w-20' : 'w-64'}`}>

      {/* Header */}
      <div className={`p-6 flex items-center border-b border-white/10 relative ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
        <Landmark className="w-8 h-8 text-white shrink-0" />
        {!isCollapsed && (
          <div className="whitespace-nowrap overflow-hidden">
            <h2 className="font-bold text-lg leading-tight tracking-tight">Municipio Miranda</h2>
            <p className="text-xs text-white/70">Gestión Soberana</p>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute top-1/2 -translate-y-1/2 bg-blue-800 text-white rounded-full p-1.5 shadow-md hover:bg-blue-700 transition-all ${isCollapsed ? '-right-3.5 opacity-0 hover:opacity-100 group-hover:opacity-100 hidden' /* Opcional: mostrar un boton flotante, pero es mejor dejarlo estatico */ : ''}`}
          style={isCollapsed ? { right: 'auto', left: '50%', transform: 'translate(-50%, 20px)' } : { right: '-12px' }}
        >
          {/* El botón de colapsar es un poco engorroso si la barra es de 20px de ancho y no hay donde hacer clic. Mejor un botón fijo al lado o al final del header. */}
        </button>
      </div>

      {/* Como el absolute con w-20 puede verse mal, pondremos el botón de colapsar integrado en la UI principal para que sea facil de clickear */}
      <div className="flex justify-end p-2 border-b border-white/10">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white/50 hover:text-white p-1 rounded-md transition-colors mx-auto"
          title={isCollapsed ? "Expandir" : "Contraer"}
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-x-hidden">
        <NavLink
          to="/dashboard"
          title={isCollapsed ? "Dashboard" : undefined}
          className={({ isActive }) =>
            `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-white/20 text-white font-medium' : 'text-white/80 hover:bg-white/10 hover:text-white'}`
          }
        >
          <LayoutDashboard className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span>Dashboard</span>}
        </NavLink>

        <div className="pt-4">
          {!isCollapsed ? (
            <button
              onClick={() => setServiciosOpen(!serviciosOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-white/50 uppercase tracking-wider hover:text-white transition-colors"
            >
              <span>Servicios Públicos</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${serviciosOpen ? 'rotate-180' : ''}`} />
            </button>
          ) : (
            <div className="flex justify-center py-2 mb-1">
              <div className="w-8 h-px bg-white/20"></div>
            </div>
          )}

          {(!isCollapsed ? serviciosOpen : true) && (
            <div className={isCollapsed ? 'space-y-2 mt-2' : 'mt-2 space-y-1 pl-2 border-l border-white/10 ml-3'}>
              {serviciosPublicos.map((srv) => (
                <NavLink
                  key={srv.path}
                  to={srv.path}
                  title={isCollapsed ? srv.name : undefined}
                  className={({ isActive }) =>
                    `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 rounded-lg transition-colors text-sm ${isActive ? 'bg-white/15 text-white font-medium' : 'text-white/70 hover:bg-white/10 hover:text-white'}`
                  }
                >
                  <srv.icon className="w-4 h-4 shrink-0" />
                  {!isCollapsed && <span>{srv.name}</span>}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4">
          {!isCollapsed ? (
            <p className="px-3 py-2 text-xs font-semibold text-white/50 uppercase tracking-wider">Gestión Interna</p>
          ) : (
            <div className="flex justify-center py-2 mt-2 mb-1">
              <div className="w-8 h-px bg-white/20"></div>
            </div>
          )}
          <NavLink
            to="/bienes"
            title={isCollapsed ? "Control de Bienes" : undefined}
            className={({ isActive }) =>
              `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2.5 rounded-lg transition-colors mt-1 ${isActive ? 'bg-white/20 text-white font-medium' : 'text-white/80 hover:bg-white/10 hover:text-white'}`
            }
          >
            <Box className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span>Control de Bienes</span>}
          </NavLink>
        </div>
      </nav>

      <div className="p-4 border-t border-white/10 space-y-1">
        <NavLink
          to="/configuracion"
          title={isCollapsed ? "Configuración" : undefined}
          className={({ isActive }) =>
            `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 rounded-lg transition-colors text-sm ${isActive ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`
          }
        >
          <Settings className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Configuración</span>}
        </NavLink>
        <button
          onClick={logout}
          title={isCollapsed ? "Cerrar Sesión" : undefined}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 rounded-lg transition-colors text-sm text-red-300 hover:bg-red-500/20 hover:text-red-200`}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
};
