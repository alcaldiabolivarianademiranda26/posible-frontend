import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { useReporteStore } from '../../stores/reporteStore';
import { useBienStore } from '../../stores/bienStore';

export const Layout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const fetchReportes = useReporteStore(state => state.fetchReportes);
  const fetchBienes = useBienStore(state => state.fetchBienes);

  useEffect(() => {
    fetchReportes();
    fetchBienes();
  }, [fetchReportes, fetchBienes]);

  return (
    <div className="flex h-screen overflow-hidden bg-brightSnow font-sans">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <TopBar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
