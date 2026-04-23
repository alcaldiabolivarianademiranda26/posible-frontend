import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
  className?: string;
  iconClassName?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon: Icon, trend, className, iconClassName }) => {
  return (
    <div className={cn("bg-white p-6 rounded-xl border border-border shadow-sm flex flex-col", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className={cn("p-2 rounded-lg bg-gray-50 text-gray-600", iconClassName)}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {trend && (
          <p className="mt-2 text-sm flex items-center gap-1">
            <span className={cn("font-medium", trend.positive ? "text-green-600" : "text-red-600")}>
              {trend.positive ? '+' : ''}{trend.value}%
            </span>
            <span className="text-gray-500">{trend.label}</span>
          </p>
        )}
      </div>
    </div>
  );
};
