import React from 'react';
import { Zap, Download, Upload, RefreshCw } from 'lucide-react';

interface QuickActionsProps {
  onNavigate: (tab: string) => void;
}

export function QuickActions({ onNavigate }: QuickActionsProps) {
  const actions = [
    {
      icon: Zap,
      title: 'Quick Fix',
      description: 'Auto-fix common SEO issues',
      color: 'bg-green-500 hover:bg-green-600',
      action: () => onNavigate('onpage')
    },
    {
      icon: Download,
      title: 'Export Report',
      description: 'Download comprehensive SEO report',
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => onNavigate('reports')
    },
    {
      icon: Upload,
      title: 'Bulk Analysis',
      description: 'Upload URLs for batch analysis',
      color: 'bg-purple-500 hover:bg-purple-600',
      action: () => onNavigate('dashboard')
    },
    {
      icon: RefreshCw,
      title: 'Re-analyze',
      description: 'Run fresh SEO analysis',
      color: 'bg-orange-500 hover:bg-orange-600',
      action: () => onNavigate('dashboard')
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      
      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.action}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white transition-colors ${action.color}`}
            >
              <Icon className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs opacity-90">{action.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}