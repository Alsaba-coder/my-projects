import React, { useState } from 'react';
import { Database, ArrowLeft, Building2, TrendingUp, Map, BarChart } from 'lucide-react';

interface DataSourcePageProps {
  onCensusData: (data: any[]) => void;
}

const DataSourcePage: React.FC<DataSourcePageProps> = ({ onCensusData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnectAPI = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://api.census.gov/data/2020/dec/dhc?get=group(H3)&for=place:39878&in=state:27'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch census data');
      }

      const data = await response.json();
      onCensusData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const dataCategories = [
    {
      title: "Real Estate Data",
      description: "Housing characteristics, property values, and market trends",
      icon: Building2,
      color: "blue"
    },
    {
      title: "Business Analytics",
      description: "Demographics, income levels, and consumer patterns",
      icon: TrendingUp,
      color: "green"
    },
    {
      title: "Community Insights",
      description: "Population dynamics, social indicators, and development metrics",
      icon: Map,
      color: "purple"
    },
    {
      title: "Research Data",
      description: "Historical trends, comparative analysis, and predictive models",
      icon: BarChart,
      color: "orange"
    }
  ];

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center space-x-4">
          <a href="/" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
          </a>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Census Data Explorer</h1>
            <p className="text-gray-500 mt-1">Access industry-specific insights and analytics</p>
          </div>
        </div>
      </header>

      <main className="px-8 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Data Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {dataCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-${category.color}-50 rounded-lg flex items-center justify-center`}>
                    <category.icon className={`w-6 h-6 text-${category.color}-600`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                    <p className="text-sm text-gray-500">{category.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Data Connection */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Database className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-center text-gray-900 mb-2">
              Connect to Census Data
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Access real-time census data with AI-powered analytics and insights
            </p>
            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <button 
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                onClick={handleConnectAPI}
                disabled={loading}
              >
                {loading ? 'Connecting...' : 'Connect to Census API'}
              </button>
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Access to detailed demographic, housing, and economic data
                </p>
              </div>
            </div>
          </div>

          {/* Features Preview */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "AI Predictions",
                description: "Get market predictions and trends analysis"
              },
              {
                title: "Custom Reports",
                description: "Generate industry-specific insights and reports"
              },
              {
                title: "Data Visualization",
                description: "Interactive charts and geographic mapping"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default DataSourcePage;