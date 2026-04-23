import React from 'react';
import type { PrioridadReporte } from '../../../domain/entities/Reporte';
import { cn } from '../../../lib/utils';
import { AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

interface PriorityBadgeProps {
  priority: PrioridadReporte;
  className?: string;
  showIcon?: boolean;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, className, showIcon = true }) => {
  const getColors = () => {
    switch (priority) {
      case 'Alta': return 'text-red-700 bg-red-50 border-red-200';
      case 'Media': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'Baja': return 'text-blue-700 bg-blue-50 border-blue-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getIcon = () => {
    if (!showIcon) return null;
    switch (priority) {
      case 'Alta': return <AlertCircle className="w-3 h-3 mr-1" />;
      case 'Media': return <Clock className="w-3 h-3 mr-1" />;
      case 'Baja': return <CheckCircle2 className="w-3 h-3 mr-1" />;
      default: return null;
    }
  };

  return (
    <span className={cn(`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border`, getColors(), className)}>
      {getIcon()}
      {priority}
    </span>
  );
};
