import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { Reporte } from '../../../domain/entities/Reporte';

interface DistributionChartProps {
  reportes: Reporte[];
}

const COLORS = ['#003f92', '#087a6f', '#095e28', '#4878b1', '#f59e0b', '#8b5cf6'];

export const DistributionChart: React.FC<DistributionChartProps> = ({ reportes }) => {
  const data = useMemo(() => {
    const conteo: Record<string, number> = {};
    reportes.forEach(r => {
      conteo[r.categoria] = (conteo[r.categoria] || 0) + 1;
    });
    return Object.keys(conteo).map((key) => ({
      name: key,
      value: conteo[key]
    })).sort((a, b) => b.value - a.value);
  }, [reportes]);

  return (
    <div className="bg-white p-6 rounded-xl border border-border shadow-sm h-[350px] flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Reportes por Categoría</h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
