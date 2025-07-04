import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  activeTab: string;
}

const tabToBreadcrumbMap: Record<string, BreadcrumbItem[]> = {
  dashboard: [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard', active: true }
  ],
  onpage: [
    { label: 'Home', path: '/' },
    { label: 'SEO Analysis', path: '/analysis' },
    { label: 'On-Page SEO', path: '/onpage-analysis', active: true }
  ],
  technical: [
    { label: 'Home', path: '/' },
    { label: 'SEO Analysis', path: '/analysis' },
    { label: 'Technical SEO', path: '/technical-seo', active: true }
  ],
  speed: [
    { label: 'Home', path: '/' },
    { label: 'Performance', path: '/performance' },
    { label: 'Site Speed', path: '/site-speed', active: true }
  ],
  backlinks: [
    { label: 'Home', path: '/' },
    { label: 'Link Building', path: '/link-building' },
    { label: 'Backlink Analysis', path: '/backlink-analysis', active: true }
  ],
  keywords: [
    { label: 'Home', path: '/' },
    { label: 'Content', path: '/content' },
    { label: 'Keyword Optimization', path: '/keyword-optimization', active: true }
  ],
  'content-optimization': [
    { label: 'Home', path: '/' },
    { label: 'Advanced Tools', path: '/advanced' },
    { label: 'Content Optimization', path: '/content-optimization', active: true }
  ],
  reports: [
    { label: 'Home', path: '/' },
    { label: 'Analytics', path: '/analytics' },
    { label: 'SEO Reports', path: '/reports', active: true }
  ]
};

export function Breadcrumbs({ activeTab }: BreadcrumbsProps) {
  const breadcrumbs = tabToBreadcrumbMap[activeTab] || tabToBreadcrumbMap.dashboard;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map((item, index) => (
          <li key={item.path} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-400 mx-2" aria-hidden="true" />
            )}
            
            {index === 0 ? (
              <button
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Go to homepage"
              >
                <Home className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ) : item.active ? (
              <span className="font-medium text-blue-600" aria-current="page">
                {item.label}
              </span>
            ) : (
              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}