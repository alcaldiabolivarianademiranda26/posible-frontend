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

      {/* Mapa Interactivo */}
      <div className="bg-white p-8 rounded-3xl border border-blue-200 min-h-[500px] flex flex-col hover:shadow-xl transition-all duration-300">
        <div className="mb-6">
          <h3 className="text-2xl font-extrabold text-blue-950 tracking-tight">
            Municipio Miranda: Distribución Geográfica
          </h3>
          <p className="text-sm text-slate-500">Vista satelital y vial de Coro, Falcón</p>
        </div>

        <div className="flex-grow rounded-2xl overflow-hidden border border-slate-100 relative shadow-inner bg-slate-100 min-h-[400px]">
          <iframe
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500732.8787385312!2d-70.18814430858382!3d11.336491644073504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e85d7c0428e2b2d%3A0xda15163ab9084d67!2sMiranda%2C%20Falc%C3%B3n!5e0!3m2!1ses-419!2sve!4v1776965524547!5m2!1ses-419!2sve"
            className="absolute inset-0 w-full h-full grayscale-[0.1] contrast-[1.05]"
            title="Mapa de Gestión Coro"
          ></iframe>
        </div>
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
