import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './presentation/pages/LoginPage';
import { Dashboard } from './presentation/pages/Dashboard';
import { Layout } from './presentation/components/layout/Layout';
import { ProtectedRoute } from './presentation/components/auth/ProtectedRoute';
import { Toaster } from 'sonner';

import { 
  AguasPage, 
  VialidadPage, 
  AseoPage, 
  SeguridadPage, 
  AlumbradoPage, 
  TransportePage,
  BienesPage,
  ConfiguracionPage
} from './presentation/pages/PagePlaceholders';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            <Route path="/servicios/aguas" element={<AguasPage />} />
            <Route path="/servicios/vialidad" element={<VialidadPage />} />
            <Route path="/servicios/aseo" element={<AseoPage />} />
            <Route path="/servicios/seguridad" element={<SeguridadPage />} />
            <Route path="/servicios/alumbrado" element={<AlumbradoPage />} />
            <Route path="/servicios/transporte" element={<TransportePage />} />
            
            <Route path="/bienes" element={<BienesPage />} />
            <Route path="/configuracion" element={<ConfiguracionPage />} />
          </Route>
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
