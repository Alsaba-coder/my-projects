import React from 'react';
import { ArrowUpRight, Users, Database, Activity, Building2, TrendingUp, Map, BarChart } from 'lucide-react';

interface DashboardProps {
  onDataSourceClick: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onDataSourceClick }) => {
  const industries = [
    {
      title: "Real Estate Analytics",
      description: "Location intelligence & property valuation insights",
      icon: Building2,
      metrics: ["Property Values", "Occupancy Rates", "Market Trends"],
      color: "blue"
    },
    {
      title: "Business Intelligence",
      description: "Market expansion & demographic analysis",
      icon: TrendingUp,
      metrics: ["Market Size", "Growth Potential", "Competition"],
      color: "green"
    },
    {
      title: "Government Insights",
      description: "Community development & policy planning",
      icon: Map,
      metrics: ["Population Trends", "Housing Needs", "Economic Indicators"],
      color: "purple"
    },
    {
      title: "Research Analytics",
      description: "Advanced analysis & data modeling",
      icon: BarChart,
      metrics: ["Historical Trends", "Predictive Models", "Custom Exports"],
      color: "orange"
    }
  ];

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-2xl font-semibold text-gray-900">Census Analytics Platform</h1>
        <p className="text-gray-500 mt-1">AI-Powered Insights for Data-Driven Decisions</p>
      </header>

      <main className="px-8 py-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Active Projects"
            value="1,243"
            change="+12.5%"
            icon={Users}
            color="blue"
          />
          <StatCard
            title="Data Points"
            value="2.5M"
            change="+8.3%"
            icon={Database}
            color="green"
          />
          <StatCard
            title="Predictions Made"
            value="45.2K"
            change="+15.2%"
            icon={Activity}
            color="purple"
          />
          <StatCard
            title="Accuracy Rate"
            value="97.8%"
            change="+2.1%"
            icon={TrendingUp}
            color="orange"
          />
        </div>

        {/* Industry Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {industries.map((industry, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-${industry.color}-50 rounded-lg flex items-center justify-center`}>
                    <industry.icon className={`w-6 h-6 text-${industry.color}-600`} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{industry.title}</h2>
                    <p className="text-sm text-gray-500">{industry.description}</p>
                  </div>
                </div>
                <button 
                  onClick={onDataSourceClick}
                  className={`text-${industry.color}-600 hover:text-${industry.color}-700`}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {industry.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-600">{metric}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Insights */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent AI Insights</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              {
                title: "Population Growth Trend",
                description: "AI predicts 15% growth in urban areas over next 5 years",
                time: "2 hours ago",
                icon: TrendingUp,
                color: "blue"
              },
              {
                title: "Market Opportunity",
                description: "New business district showing strong development potential",
                time: "4 hours ago",
                icon: Building2,
                color: "green"
              },
              {
                title: "Housing Analysis",
                description: "Rental market analysis suggests increasing demand in suburbs",
                time: "6 hours ago",
                icon: BarChart,
                color: "purple"
              }
            ].map((insight, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={onDataSourceClick}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 bg-${insight.color}-100 rounded-full flex items-center justify-center`}>
                    <insight.icon className={`w-5 h-5 text-${insight.color}-600`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {insight.title}
                    </h3>
                    <p className="text-sm text-gray-500">{insight.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{insight.time}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-500">
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 bg-${color}-50 rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
      <div className="mt-4">
        <span className="text-sm font-medium text-green-600">{change}</span>
        <span className="text-sm text-gray-500 ml-2">vs last month</span>
      </div>
    </div>
  );
}

export default Dashboard;