import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Reporte } from '../../../domain/entities/Reporte';
import { ArrowUpRight } from 'lucide-react';

interface RecentReportsProps {
  reportes: Reporte[];
}

export const RecentReports: React.FC<RecentReportsProps> = ({ reportes }) => {
  const navigate = useNavigate();
  const recent = reportes.slice(0, 5);

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'Resuelto': return 'bg-green-100 text-green-800';
      case 'En Proceso': return 'bg-blue-100 text-blue-800';
      case 'Rechazado': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getPathForCategory = (cat: string) => {
    const slug = cat.toLowerCase().replace(' ', '');
    return `/servicios/${slug}`;
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-border shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Reportes Recientes</h3>
      </div>
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="space-y-4">
          {recent.map((reporte) => (
            <div key={reporte.id} className="flex items-start justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors group cursor-pointer" onClick={() => navigate(getPathForCategory(reporte.categoria))}>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900 line-clamp-1">{reporte.numeroContacto}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="font-mono">{reporte.id}</span>
                  <span>•</span>
                  <span>{new Date(reporte.fechaCreacion).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{reporte.categoria}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0 ml-4">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(reporte.estado)}`}>
                  {reporte.estado}
                </span>
                <ArrowUpRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
