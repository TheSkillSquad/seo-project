import React from 'react';
import { Clock, ExternalLink, TrendingUp } from 'lucide-react';

interface RecentAnalysisProps {
  onNavigate: (tab: string) => void;
}

export function RecentAnalysis({ onNavigate }: RecentAnalysisProps) {
  const analyses = [
    {
      url: 'example.com/homepage',
      score: 87,
      date: '2 hours ago',
      issues: 3,
      improvements: '+5 points'
    },
    {
      url: 'example.com/products',
      score: 92,
      date: '5 hours ago',
      issues: 1,
      improvements: '+3 points'
    },
    {
      url: 'example.com/blog',
      score: 78,
      date: '1 day ago',
      issues: 7,
      improvements: '+8 points'
    },
    {
      url: 'example.com/contact',
      score: 85,
      date: '1 day ago',
      issues: 2,
      improvements: '+2 points'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Analysis</h3>
        <button 
          onClick={() => onNavigate('reports')}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          View All →
        </button>
      </div>
      
      <div className="space-y-4">
        {analyses.map((analysis, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{analysis.url}</span>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">{analysis.date}</span>
                  </div>
                  <span className="text-xs text-red-600">{analysis.issues} issues</span>
                  <div className="flex items-center space-x-1 text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    <span className="text-xs">{analysis.improvements}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">{analysis.score}</div>
                <div className="text-xs text-gray-500">SEO Score</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <div className="text-sm font-bold text-blue-600">{analysis.score}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}