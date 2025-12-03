import React from 'react';
import { BarChart3, Users, Building2, Map, FileText, Settings, HelpCircle, ExternalLink, X } from 'lucide-react';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  onClick?: () => void;
}

interface SidebarProps {
  items?: SidebarItemProps[];
  isMobileOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ items, isMobileOpen = false, onClose }) => {
  const defaultItems = [
    { icon: BarChart3, label: 'Analytics Dashboard', href: '#' },
    { icon: Building2, label: 'Real Estate Insights', href: '#' },
    { icon: Users, label: 'Market Demographics', href: '#' },
    { icon: Map, label: 'Location Intelligence', href: '#' },
    { icon: FileText, label: 'Custom Reports', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' },
  ];

  const navigationItems = items || defaultItems;
  const closeMobileMenu = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-30 transition-opacity duration-200 md:hidden ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 px-3 py-4 flex flex-col transform transition-transform duration-200 md:static md:translate-x-0 md:w-64 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="mb-8 px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-blue-600">CensusAI</h1>
              <p className="text-sm text-gray-500">Predictive Analytics</p>
            </div>
          </div>
          <button
            className="md:hidden p-2 rounded-md border border-gray-200 text-gray-600"
            onClick={closeMobileMenu}
            aria-label="Close navigation menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <nav className="space-y-1">
          {navigationItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={() => {
                item.onClick?.();
                closeMobileMenu();
              }}
              className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors group"
            >
              <item.icon className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500" />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
        
        <div className="mt-auto space-y-4 px-4 py-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-medium text-blue-800">AI Assistant</h3>
            </div>
            <p className="text-xs text-blue-600 mb-3">Get personalized insights and analysis recommendations</p>
            <button className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <span>Start Analysis</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-gray-500 px-2">
            <p>© 2024 CensusAI Analytics</p>
            <p>Powered by U.S. Census Bureau Data</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
