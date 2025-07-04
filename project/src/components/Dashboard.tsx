import React, { useState } from 'react';
import { ScoreCard } from './ScoreCard';
import { AlertsPanel } from './AlertsPanel';
import { RecentAnalysis } from './RecentAnalysis';
import { QuickActions } from './QuickActions';
import { TrendChart } from './TrendChart';
import { AnalyzeURLModal } from './AnalyzeURLModal';
import { SeoHead } from './SeoHead';
import { SchemaMarkup, createSoftwareApplicationSchema, createWebPageSchema } from './SchemaMarkup';

interface DashboardProps {
  onNavigate: (tab: string) => void;
  onAnalyzeUrl: (url: string) => void;
}

export function Dashboard({ onNavigate, onAnalyzeUrl }: DashboardProps) {
  const [showAnalyzeModal, setShowAnalyzeModal] = useState(false);

  const seoScores = [
    { category: 'Overall SEO', score: 87, change: 5, status: 'good' },
    { category: 'On-Page SEO', score: 92, change: 3, status: 'excellent' },
    { category: 'Technical SEO', score: 78, change: -2, status: 'good' },
    { category: 'Site Speed', score: 65, change: 8, status: 'warning' },
    { category: 'Backlinks', score: 84, change: 12, status: 'good' },
    { category: 'Keywords', score: 76, change: 4, status: 'good' },
  ];

  const handleAnalyzeUrl = (url: string) => {
    onAnalyzeUrl(url);
    // Optionally navigate to a specific analysis tab
    // onNavigate('onpage');
  };

  return (
    <>
      <SeoHead
        title="SEOblend Dashboard - Monitor Your SEO Performance"
        description="Comprehensive SEO dashboard showing your website's performance metrics, keyword rankings, backlink analysis, and actionable insights to improve search visibility."
        canonicalUrl="https://seoblend.com/dashboard"
        ogTitle="SEOblend SEO Dashboard - Real-time Performance Monitoring"
        ogDescription="Track your SEO progress with our comprehensive dashboard. Monitor rankings, analyze performance, and get actionable insights."
        keywords="SEO dashboard, website performance, SEO monitoring, search rankings, SEO metrics"
      />
      
      <SchemaMarkup schema={createSoftwareApplicationSchema()} />
      <SchemaMarkup schema={createWebPageSchema(
        "SEOblend Dashboard",
        "Monitor your website's SEO performance with comprehensive analytics and insights",
        "https://seoblend.com/dashboard"
      )} />

      <section className="space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">SEO Dashboard</h1>
            <p className="text-gray-600 mt-1">Monitor your website's SEO performance and get actionable insights</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowAnalyzeModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Analyze New URL
            </button>
            <a 
              href="http://paypal.me/marquesmedical"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Upgrade Plan
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6" aria-labelledby="seo-scores-heading">
              <h2 id="seo-scores-heading" className="sr-only">SEO Performance Scores</h2>
              {seoScores.map((score) => (
                <ScoreCard key={score.category} {...score} onNavigate={onNavigate} />
              ))}
            </section>
            
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6" aria-labelledby="performance-trend-heading">
              <h3 id="performance-trend-heading" className="text-lg font-semibold text-gray-900 mb-4">SEO Performance Trend</h3>
              <TrendChart />
            </section>

            <RecentAnalysis onNavigate={onNavigate} />
          </div>

          <aside className="space-y-6">
            <AlertsPanel onNavigate={onNavigate} />
            <QuickActions onNavigate={onNavigate} />
            
            {/* Contact & Support Card */}
            <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6" aria-labelledby="support-heading">
              <h3 id="support-heading" className="text-lg font-semibold text-gray-900 mb-3">Need Expert Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get personalized SEO recommendations and support from our experts.
              </p>
              <div className="space-y-2">
                <a 
                  href="mailto:seo@theskillsquad.com?subject=SEOblend Support Request"
                  className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Contact SEO Expert
                </a>
                <a 
                  href="http://paypal.me/marquesmedical"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  Upgrade for Premium Features
                </a>
              </div>
            </section>
          </aside>
        </div>
      </section>

      <AnalyzeURLModal
        isOpen={showAnalyzeModal}
        onClose={() => setShowAnalyzeModal(false)}
        onAnalyze={handleAnalyzeUrl}
      />
    </>
  );
}