import React from 'react';
import type { EstadoReporte } from '../../../domain/entities/Reporte';
import { cn } from '../../../lib/utils';

interface StatusBadgeProps {
  status: EstadoReporte;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getColors = () => {
    switch (status) {
      case 'Resuelto': return 'bg-green-100 text-green-800 border-green-200';
      case 'En Proceso': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Rechazado': return 'bg-red-100 text-red-800 border-red-200';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={cn(`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border`, getColors(), className)}>
      {status}
    </span>
  );
};
