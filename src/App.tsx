import React, { useState } from 'react';
import { BarChart3, Users, Settings, Home, Database, PieChart } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import DataSourcePage from './components/DataSourcePage';
import CensusDataPage from './components/CensusDataPage';

type Page = 'dashboard' | 'datasource' | 'censusdata';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [censusData, setCensusData] = useState<any[]>([]);

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

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar items={sidebarItems} />
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
  );
}

export default App;