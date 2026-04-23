import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Reporte } from '../../../domain/entities/Reporte';

interface TrendChartProps {
  reportes: Reporte[];
}

export const TrendChart: React.FC<TrendChartProps> = ({ reportes }) => {
  const data = useMemo(() => {
    // Agrupar por mes
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const conteo = Array(12).fill(0).map((_, i) => ({ mes: meses[i], cantidad: 0 }));
    
    reportes.forEach(r => {
      const month = new Date(r.fechaCreacion).getMonth();
      conteo[month].cantidad += 1;
    });

    // Mostrar solo los últimos 6 meses (o meses con datos)
    const currentMonth = new Date().getMonth();
    let startMonth = currentMonth - 5;
    if (startMonth < 0) startMonth = 0;
    
    return conteo.slice(startMonth, currentMonth + 1);
  }, [reportes]);

  return (
    <div className="bg-white p-6 rounded-xl border border-border shadow-sm h-[350px] flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Tendencia de Reportes (Últimos meses)</h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
            <Tooltip 
              cursor={{ fill: '#f3f4f6' }}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="cantidad" fill="#003f92" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
