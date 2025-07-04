import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Zap, 
  Gauge, 
  Link, 
  Target, 
  BarChart3,
  ChevronRight,
  Settings
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'onpage', label: 'On-Page SEO', icon: FileText },
  { id: 'technical', label: 'Technical SEO', icon: Zap },
  { id: 'speed', label: 'Site Speed', icon: Gauge },
  { id: 'backlinks', label: 'Backlink Analysis', icon: Link },
  { id: 'keywords', label: 'Keywords', icon: Target },
  { id: 'content-optimization', label: 'Content Optimizer', icon: Settings },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="h-4 w-4 text-blue-600" />}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}