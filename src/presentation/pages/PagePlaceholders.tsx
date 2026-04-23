import { ServicioPageTemplate } from './servicios/ServicioPageTemplate';
import { BienesPage as RealBienesPage } from './BienesPage';

export const AguasPage = () => <ServicioPageTemplate categoria="Aguas" titulo="Gestión de Aguas" />;
export const VialidadPage = () => <ServicioPageTemplate categoria="Vialidad" titulo="Gestión de Vialidad" />;
export const AseoPage = () => <ServicioPageTemplate categoria="Aseo Urbano" titulo="Aseo Urbano" />;
export const SeguridadPage = () => <ServicioPageTemplate categoria="Seguridad" titulo="Seguridad Ciudadana" />;
export const AlumbradoPage = () => <ServicioPageTemplate categoria="Alumbrado" titulo="Alumbrado Público" />;
export const TransportePage = () => <ServicioPageTemplate categoria="Transporte" titulo="Transporte Público" />;

export const BienesPage = () => <RealBienesPage />;

export const ConfiguracionPage = () => (
  <div className="bg-white p-6 rounded-xl border border-border shadow-sm min-h-[400px]">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Configuración del Sistema</h2>
    <p className="text-gray-500">Opciones generales, usuarios y parámetros del sistema se gestionan aquí.</p>
  </div>
);
