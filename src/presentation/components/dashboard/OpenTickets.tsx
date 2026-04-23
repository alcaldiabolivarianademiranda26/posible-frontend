import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Reporte } from '../../../domain/entities/Reporte';
import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

interface OpenTicketsProps {
  reportes: Reporte[];
}

export const OpenTickets: React.FC<OpenTicketsProps> = ({ reportes }) => {
  const navigate = useNavigate();
  // Mostrar solo reportes que no estén resueltos o rechazados, ordenados por prioridad y fecha
  const open = reportes
    .filter(r => r.estado !== 'Resuelto' && r.estado !== 'Rechazado')
    .sort((a, b) => {
      const p = { 'Alta': 3, 'Media': 2, 'Baja': 1 };
      if (p[a.prioridad] !== p[b.prioridad]) return p[b.prioridad] - p[a.prioridad];
      return new Date(a.fechaCreacion).getTime() - new Date(b.fechaCreacion).getTime();
    })
    .slice(0, 6);

  const getPriorityColor = (prioridad: string) => {
    switch (prioridad) {
      case 'Alta': return 'text-red-600 bg-red-50';
      case 'Media': return 'text-orange-600 bg-orange-50';
      case 'Baja': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityIcon = (prioridad: string) => {
    switch (prioridad) {
      case 'Alta': return <AlertCircle className="w-4 h-4" />;
      case 'Media': return <Clock className="w-4 h-4" />;
      case 'Baja': return <CheckCircle2 className="w-4 h-4" />;
      default: return null;
    }
  };

  const getPathForCategory = (cat: string) => {
    const slug = cat.toLowerCase().replace(' ', '');
    return `/servicios/${slug}`;
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-border shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Tickets Pendientes de Atención</h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="grid gap-3">
          {open.map((reporte) => (
            <div 
              key={reporte.id} 
              onClick={() => navigate(getPathForCategory(reporte.categoria))}
              className="flex items-center p-3 rounded-lg border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer"
            >
              <div className={`p-2 rounded-md mr-3 ${getPriorityColor(reporte.prioridad)} shrink-0`}>
                {getPriorityIcon(reporte.prioridad)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{reporte.numeroContacto}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">{reporte.categoria}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs text-gray-500 truncate">{reporte.sector}</span>
                </div>
              </div>
              <div className="ml-3 shrink-0 text-right">
                <span className="text-xs font-medium text-gray-500 block">{new Date(reporte.fechaCreacion).toLocaleDateString()}</span>
                <span className="text-xs font-mono text-gray-400 mt-1">{reporte.id}</span>
              </div>
            </div>
          ))}
          {open.length === 0 && (
            <div className="text-center py-8 text-gray-500 text-sm">
              No hay tickets pendientes con prioridad.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
