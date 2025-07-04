import React from 'react';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';

interface AlertsPanelProps {
  onNavigate: (tab: string) => void;
}

export function AlertsPanel({ onNavigate }: AlertsPanelProps) {
  const alerts = [
    {
      type: 'critical',
      title: 'Missing Meta Descriptions',
      description: '12 pages are missing meta descriptions',
      action: 'Fix Now',
      tab: 'onpage'
    },
    {
      type: 'warning',
      title: 'Slow Page Load Time',
      description: 'Homepage loads in 4.2s (target: <3s)',
      action: 'Optimize',
      tab: 'speed'
    },
    {
      type: 'info',
      title: 'New Backlink Opportunity',
      description: '3 high-quality domains linking to competitors',
      action: 'Review',
      tab: 'backlinks'
    },
    {
      type: 'success',
      title: 'Mobile Optimization',
      description: 'All pages are mobile-friendly',
      action: 'View Details',
      tab: 'technical'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'info': return <Info className="h-5 w-5 text-blue-500" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getAlertBorder = (type: string) => {
    switch (type) {
      case 'critical': return 'border-l-red-500';
      case 'warning': return 'border-l-orange-500';
      case 'info': return 'border-l-blue-500';
      case 'success': return 'border-l-green-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Alerts</h3>
      
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div key={index} className={`border-l-4 ${getAlertBorder(alert.type)} bg-gray-50 p-4 rounded-r-lg`}>
            <div className="flex items-start space-x-3">
              {getAlertIcon(alert.type)}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                <button 
                  onClick={() => onNavigate(alert.tab)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-2"
                >
                  {alert.action} →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}