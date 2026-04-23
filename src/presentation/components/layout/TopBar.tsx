import React from 'react';
import { useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

export const TopBar: React.FC = () => {
  const location = useLocation();
  const user = useAuthStore(state => state.user);

  // Generar titulo simple basado en ruta
  const pathParts = location.pathname.split('/').filter(Boolean);
  const title = pathParts.length > 0
    ? pathParts[pathParts.length - 1].charAt(0).toUpperCase() + pathParts[pathParts.length - 1].slice(1)
    : 'Dashboard';

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-gray-800">{title.replace('-', ' ')}</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-gray-700">{user?.nombre || 'Usuario'}</p>
            <p className="text-xs text-gray-500">{user?.rol || 'Rol'}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            {user?.nombre ? user.nombre.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
          </div>
        </div>
      </div>
    </header>
  );
};
