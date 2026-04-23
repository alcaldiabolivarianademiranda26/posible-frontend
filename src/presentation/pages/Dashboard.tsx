import React from 'react';
import { useReportes } from '../hooks/useReportes';
import { useBienes } from '../hooks/useBienes';
import { KpiCard } from '../components/dashboard/KpiCard';
import { TrendChart } from '../components/dashboard/TrendChart';
import { DistributionChart } from '../components/dashboard/DistributionChart';
import { RecentReports } from '../components/dashboard/RecentReports';
import { OpenTickets } from '../components/dashboard/OpenTickets';
import { AlertCircle, CheckCircle2, Percent, Box, Loader2 } from 'lucide-react';

export const Dashboard: React.FC = () => {

  <div className="lg:col-span-2 bento-card bg-white p-8 rounded-[2rem] border border-blue-200 min-h-[600px] flex flex-col hover:shadow-xl transition-all duration-300">
    <div className="mb-6">
      <h3 className="text-2xl font-extrabold text-blue-950 tracking-tight">
        Municipio Miranda: Distribución Geográfica
      </h3>
      <p className="text-sm text-slate-500">Vista satelital y vial de Coro, Falcón</p>
    </div>

    <div className="flex-grow rounded-2xl overflow-hidden border border-slate-100 relative shadow-inner bg-slate-100">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed/v1/place?key=TU_API_KEY&q=Coro,Falcon,Venezuela"
        className="grayscale-[0.1] contrast-[1.05]"
        title="Mapa de Gestión Coro"
      ></iframe>
    </div>
  </div>

  const { reportes, kpis: kpisReportes, loading: repLoading } = useReportes();
  const { kpis: kpisBienes, loading: bienLoading } = useBienes();

  // En un caso real usaríamos fetch en useEffect si no existieran,
  // pero nuestros custom hooks ya leen del store que se auto-hidrata o lo llamamos acá.

  if (repLoading || bienLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 text-gray-600 font-medium">Cargando panel de control...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Total Reportes Activos"
          value={kpisReportes.activos}
          icon={AlertCircle}
          iconClassName="text-orange-600 bg-orange-100"
          trend={{ value: 12, label: 'vs mes anterior', positive: false }}
        />
        <KpiCard
          title="Reportes Resueltos (Mes)"
          value={kpisReportes.resueltosMes}
          icon={CheckCircle2}
          iconClassName="text-green-600 bg-green-100"
          trend={{ value: 8, label: 'vs mes anterior', positive: true }}
        />
        <KpiCard
          title="Tasa de Resolución"
          value={`${kpisReportes.tasaResolucion}%`}
          icon={Percent}
          iconClassName="text-blue-600 bg-blue-100"
        />
        <KpiCard
          title="Bienes Registrados"
          value={kpisBienes.total}
          icon={Box}
          iconClassName="text-indigo-600 bg-indigo-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendChart reportes={reportes} />
        <DistributionChart reportes={reportes} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
        <RecentReports reportes={reportes} />
        <OpenTickets reportes={reportes} />
      </div>
    </div>

  );
};
