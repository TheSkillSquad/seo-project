import React, { useState, useEffect } from 'react';
import { Activity, Zap, Clock, Gauge, TrendingUp, TrendingDown } from 'lucide-react';

interface CoreWebVitalsProps {
  metrics: {
    lcp: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
    fid: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
    cls: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
    fcp: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
    ttfb: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
  };
  trend: {
    lcp: number;
    fid: number;
    cls: number;
  };
}

export function CoreWebVitalsMonitor({ metrics, trend }: CoreWebVitalsProps) {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-600 bg-green-50 border-green-200';
      case 'needs-improvement': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'poor': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatMetricValue = (metric: string, value: number) => {
    switch (metric) {
      case 'lcp':
      case 'fcp':
      case 'ttfb':
        return `${(value / 1000).toFixed(1)}s`;
      case 'fid':
        return `${value}ms`;
      case 'cls':
        return value.toFixed(3);
      default:
        return value.toString();
    }
  };

  const getMetricName = (metric: string) => {
    switch (metric) {
      case 'lcp': return 'Largest Contentful Paint';
      case 'fid': return 'First Input Delay';
      case 'cls': return 'Cumulative Layout Shift';
      case 'fcp': return 'First Contentful Paint';
      case 'ttfb': return 'Time to First Byte';
      default: return metric.toUpperCase();
    }
  };

  const getTrendIcon = (trendValue: number) => {
    if (trendValue > 0) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    } else if (trendValue < 0) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Activity className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Core Web Vitals Monitor</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Object.entries(metrics).map(([key, metric]) => (
          <div key={key} className={`p-4 rounded-lg border ${getRatingColor(metric.rating)}`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">{getMetricName(key)}</h3>
              {trend[key as keyof typeof trend] !== undefined && getTrendIcon(trend[key as keyof typeof trend])}
            </div>
            <div className="text-2xl font-bold mb-1">
              {formatMetricValue(key, metric.value)}
            </div>
            <div className="text-xs font-medium capitalize">
              {metric.rating.replace('-', ' ')}
            </div>
            {trend[key as keyof typeof trend] !== undefined && (
              <div className="text-xs mt-1 opacity-75">
                {Math.abs(trend[key as keyof typeof trend])}% vs last week
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Performance Score */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900">Overall Performance Score</h3>
            <p className="text-sm text-gray-600">Based on Core Web Vitals and other metrics</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">87</div>
            <div className="text-sm text-blue-800">Good</div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface RealTimeMetricsProps {
  isMonitoring: boolean;
  onToggleMonitoring: () => void;
}

export function RealTimeMetrics({ isMonitoring, onToggleMonitoring }: RealTimeMetricsProps) {
  const [metrics, setMetrics] = useState({
    pageViews: 1247,
    bounceRate: 34.2,
    avgSessionDuration: 245,
    conversionRate: 3.8
  });

  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      setMetrics(prev => ({
        pageViews: prev.pageViews + Math.floor(Math.random() * 5),
        bounceRate: Math.max(20, Math.min(60, prev.bounceRate + (Math.random() - 0.5) * 2)),
        avgSessionDuration: Math.max(120, Math.min(400, prev.avgSessionDuration + (Math.random() - 0.5) * 10)),
        conversionRate: Math.max(1, Math.min(8, prev.conversionRate + (Math.random() - 0.5) * 0.2))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Gauge className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Real-Time Performance</h2>
        </div>
        <button
          onClick={onToggleMonitoring}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isMonitoring
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <h3 className="text-sm font-medium text-gray-600">Page Views</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900">{metrics.pageViews.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Last 24 hours</div>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <h3 className="text-sm font-medium text-gray-600">Bounce Rate</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900">{metrics.bounceRate.toFixed(1)}%</div>
          <div className="text-xs text-gray-500">Current session</div>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <h3 className="text-sm font-medium text-gray-600">Avg. Session</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900">{Math.floor(metrics.avgSessionDuration / 60)}m {metrics.avgSessionDuration % 60}s</div>
          <div className="text-xs text-gray-500">Duration</div>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <h3 className="text-sm font-medium text-gray-600">Conversion Rate</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900">{metrics.conversionRate.toFixed(1)}%</div>
          <div className="text-xs text-gray-500">This week</div>
        </div>
      </div>
    </div>
  );
}

export function PerformanceAlerts() {
  const alerts = [
    {
      type: 'critical',
      metric: 'LCP',
      message: 'Largest Contentful Paint exceeded 4s on mobile',
      timestamp: '2 minutes ago',
      page: '/product-page'
    },
    {
      type: 'warning',
      metric: 'CLS',
      message: 'Layout shift detected on homepage',
      timestamp: '15 minutes ago',
      page: '/homepage'
    },
    {
      type: 'info',
      metric: 'FID',
      message: 'First Input Delay improved by 20ms',
      timestamp: '1 hour ago',
      page: '/checkout'
    }
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-200 bg-red-50 text-red-800';
      case 'warning': return 'border-orange-200 bg-orange-50 text-orange-800';
      case 'info': return 'border-blue-200 bg-blue-50 text-blue-800';
      default: return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Clock className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Performance Alerts</h2>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div key={index} className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium">{alert.metric}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-50">
                    {alert.type}
                  </span>
                </div>
                <p className="text-sm mb-1">{alert.message}</p>
                <div className="text-xs opacity-75">
                  {alert.page} • {alert.timestamp}
                </div>
              </div>
              <button className="text-sm font-medium hover:underline">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}