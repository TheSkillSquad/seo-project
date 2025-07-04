import React from 'react';

export function TrendChart() {
  const data = [
    { month: 'Jan', score: 75 },
    { month: 'Feb', score: 78 },
    { month: 'Mar', score: 82 },
    { month: 'Apr', score: 79 },
    { month: 'May', score: 85 },
    { month: 'Jun', score: 87 },
  ];

  const maxScore = 100;
  const chartHeight = 200;

  return (
    <div className="w-full">
      <div className="flex items-end justify-between h-48 border-b border-gray-200">
        {data.map((point, index) => (
          <div key={point.month} className="flex flex-col items-center space-y-2 flex-1">
            <div className="relative flex-1 w-8 bg-gray-100 rounded-t-lg overflow-hidden">
              <div 
                className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500"
                style={{ height: `${(point.score / maxScore) * 100}%` }}
              />
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">
                {point.score}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-3">
        {data.map((point) => (
          <div key={point.month} className="text-xs text-gray-500 text-center flex-1">
            {point.month}
          </div>
        ))}
      </div>
    </div>
  );
}