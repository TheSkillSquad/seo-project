import React from 'react';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

interface ScoreCardProps {
  category: string;
  score: number;
  change: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  onNavigate: (tab: string) => void;
}

export function ScoreCard({ category, score, change, status, onNavigate }: ScoreCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'warning': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getNavigationTab = () => {
    const mapping: { [key: string]: string } = {
      'On-Page SEO': 'onpage',
      'Technical SEO': 'technical',
      'Site Speed': 'speed',
      'Backlinks': 'backlinks',
      'Keywords': 'keywords',
    };
    return mapping[category] || 'dashboard';
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border p-6 transition-all duration-200 hover:shadow-md cursor-pointer group ${getStatusColor()}`}
         onClick={() => onNavigate(getNavigationTab())}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{category}</h3>
        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-3xl font-bold text-gray-900">{score}</span>
          <span className="text-sm text-gray-500">/100</span>
        </div>
        
        <div className={`flex items-center space-x-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span className="text-sm font-medium">{Math.abs(change)}</span>
        </div>
      </div>
      
      <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            status === 'excellent' ? 'bg-green-500' :
            status === 'good' ? 'bg-blue-500' :
            status === 'warning' ? 'bg-orange-500' : 'bg-red-500'
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}