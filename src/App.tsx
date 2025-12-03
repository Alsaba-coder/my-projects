import React, { useMemo, useState } from 'react';
import { BarChart3, Users, Settings, Home, Database, PieChart, Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import DataSourcePage from './components/DataSourcePage';
import CensusDataPage from './components/CensusDataPage';

type Page = 'dashboard' | 'datasource' | 'censusdata';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [censusData, setCensusData] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCensusData = (data: any[]) => {
    setCensusData(data);
    setCurrentPage('censusdata');
  };

  const sidebarItems = [
    { icon: Home, label: 'Home', href: '#', onClick: () => setCurrentPage('dashboard') },
    { icon: BarChart3, label: 'Analytics', href: '#' },
    { icon: Users, label: 'Customers', href: '#' },
    { icon: Database, label: 'Data Sources', href: '#' },
    { icon: PieChart, label: 'Reports', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' },
  ];

  const pageTitle = useMemo(() => {
    switch (currentPage) {
      case 'datasource':
        return 'Census Data Explorer';
      case 'censusdata':
        return 'Census Analytics';
      default:
        return 'Dashboard';
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gray-50 flex md:flex-row">
      <Sidebar 
        items={sidebarItems}
        isMobileOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        <div className="md:hidden sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-md border border-gray-200 text-gray-700"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="text-center">
            <p className="text-xs uppercase tracking-wide text-gray-400">CensusAI</p>
            <p className="text-base font-semibold text-gray-900">{pageTitle}</p>
          </div>
          <div className="w-9" />
        </div>

        <div className="flex-1 overflow-hidden pt-14 md:pt-0">
          {currentPage === 'dashboard' && (
            <Dashboard onDataSourceClick={() => setCurrentPage('datasource')} />
          )}
          {currentPage === 'datasource' && (
            <DataSourcePage onCensusData={handleCensusData} />
          )}
          {currentPage === 'censusdata' && (
            <CensusDataPage 
              data={censusData} 
              onBack={() => setCurrentPage('datasource')} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
