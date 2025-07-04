import React, { useState } from 'react';
import { ContentAnalysis, KeywordOpportunities } from './ContentOptimizer';
import { ImageAnalysis } from './ImageOptimizer';
import { InternalLinkingStrategy, LinkBuildingRecommendations } from './InternalLinkingStrategy';
import { CoreWebVitalsMonitor, RealTimeMetrics, PerformanceAlerts } from './PerformanceMonitor';
import { SchemaManager, RichSnippetPreview } from './AdvancedSchemaMarkup';
import { SeoHead } from './SeoHead';
import { SchemaMarkup, createWebPageSchema } from './SchemaMarkup';

export function ContentOptimizationDashboard() {
  const [isMonitoring, setIsMonitoring] = useState(false);

  // Sample data for demonstration
  const contentData = {
    wordCount: 1247,
    readabilityScore: 78,
    keywordDensity: {
      'SEO analysis': 2.3,
      'website optimization': 1.8,
      'keyword tracking': 1.2,
      'content optimization': 0.9
    },
    headingStructure: [
      { level: 1, text: 'Complete SEO Analysis Guide', optimized: true },
      { level: 2, text: 'On-Page Optimization', optimized: true },
      { level: 3, text: 'Meta Tags', optimized: false },
      { level: 3, text: 'Content Structure', optimized: true },
      { level: 2, text: 'Technical SEO', optimized: true }
    ],
    internalLinks: 12,
    externalLinks: 8,
    issues: [
      'Meta description missing on 3 pages',
      'H1 tag appears multiple times on homepage',
      'Some images missing alt text'
    ],
    suggestions: [
      'Add more internal links to related content',
      'Optimize keyword density for "SEO tools"',
      'Improve readability by shortening sentences',
      'Add FAQ section for better user engagement',
      'Include more semantic keywords in content'
    ]
  };

  const keywordOpportunities = [
    {
      keyword: 'technical SEO audit',
      currentRank: null,
      difficulty: 'Medium' as const,
      volume: 6700,
      intent: 'Commercial' as const,
      competitorRank: 2,
      opportunity: 'High' as const
    },
    {
      keyword: 'site speed optimization',
      currentRank: 15,
      difficulty: 'Low' as const,
      volume: 4100,
      intent: 'Commercial' as const,
      competitorRank: 1,
      opportunity: 'High' as const
    },
    {
      keyword: 'SEO analysis tool',
      currentRank: 8,
      difficulty: 'High' as const,
      volume: 8900,
      intent: 'Commercial' as const,
      competitorRank: 3,
      opportunity: 'Medium' as const
    }
  ];

  const imageData = [
    {
      src: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg',
      alt: 'SEO dashboard analytics',
      size: '245KB',
      format: 'JPEG',
      optimized: true,
      issues: []
    },
    {
      src: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg',
      alt: '',
      size: '892KB',
      format: 'PNG',
      optimized: false,
      issues: ['Missing alt text', 'Large file size']
    },
    {
      src: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpg',
      alt: 'Website performance metrics',
      size: '156KB',
      format: 'JPEG',
      optimized: true,
      issues: []
    }
  ];

  const internalLinkingData = {
    currentLinks: [
      {
        fromPage: '/homepage',
        toPage: '/seo-analysis',
        anchorText: 'comprehensive SEO analysis',
        context: 'Learn more about our comprehensive SEO analysis tools',
        relevanceScore: 9.2,
        authority: 8.5
      },
      {
        fromPage: '/blog/seo-guide',
        toPage: '/technical-seo',
        anchorText: 'technical SEO audit',
        context: 'Perform a technical SEO audit to identify issues',
        relevanceScore: 8.8,
        authority: 7.9
      },
      {
        fromPage: '/features',
        toPage: '/keyword-tracking',
        anchorText: 'keyword tracking tools',
        context: 'Our keyword tracking tools help monitor rankings',
        relevanceScore: 9.0,
        authority: 8.2
      }
    ],
    opportunities: [
      {
        fromPage: '/blog/content-optimization',
        toPage: '/keyword-research',
        suggestedAnchor: 'keyword research tools',
        reason: 'High topical relevance and user intent alignment',
        impact: 'High' as const,
        difficulty: 'Easy' as const
      },
      {
        fromPage: '/homepage',
        toPage: '/site-speed-analysis',
        suggestedAnchor: 'site speed optimization',
        reason: 'Core feature that should be prominently linked',
        impact: 'Medium' as const,
        difficulty: 'Easy' as const
      }
    ],
    orphanPages: [
      '/old-blog-post-2023',
      '/legacy-feature-page'
    ]
  };

  const coreWebVitalsData = {
    metrics: {
      lcp: { value: 2100, rating: 'good' as const },
      fid: { value: 85, rating: 'good' as const },
      cls: { value: 0.15, rating: 'needs-improvement' as const },
      fcp: { value: 1800, rating: 'good' as const },
      ttfb: { value: 450, rating: 'good' as const }
    },
    trend: {
      lcp: -5,
      fid: -12,
      cls: 8
    }
  };

  const schemaData = [
    {
      type: 'SoftwareApplication',
      name: 'SEOblend Application Schema',
      status: 'active' as const,
      lastUpdated: '2 days ago',
      pages: 1
    },
    {
      type: 'WebPage',
      name: 'Page-specific Schema',
      status: 'active' as const,
      lastUpdated: '1 week ago',
      pages: 15
    },
    {
      type: 'BreadcrumbList',
      name: 'Navigation Breadcrumbs',
      status: 'active' as const,
      lastUpdated: '3 days ago',
      pages: 12
    },
    {
      type: 'FAQ',
      name: 'FAQ Pages Schema',
      status: 'inactive' as const,
      lastUpdated: '2 weeks ago',
      pages: 0
    }
  ];

  return (
    <>
      <SeoHead
        title="Content Optimization Dashboard - SEOblend"
        description="Advanced content optimization dashboard with real-time performance monitoring, keyword analysis, internal linking strategies, and schema markup management."
        canonicalUrl="https://seoblend.com/content-optimization"
        ogTitle="Content Optimization Dashboard - Advanced SEO Tools"
        ogDescription="Optimize your content with advanced analytics, performance monitoring, and strategic recommendations for better search rankings."
        keywords="content optimization, SEO dashboard, performance monitoring, keyword analysis, internal linking, schema markup"
      />
      
      <SchemaMarkup schema={createWebPageSchema(
        "Content Optimization Dashboard",
        "Advanced content optimization tools and performance monitoring",
        "https://seoblend.com/content-optimization"
      )} />

      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">Content Optimization Dashboard</h1>
          <p className="text-gray-600 mt-1">Advanced content analysis, performance monitoring, and optimization strategies</p>
        </header>

        {/* Performance Monitoring Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Performance Monitoring</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CoreWebVitalsMonitor metrics={coreWebVitalsData.metrics} trend={coreWebVitalsData.trend} />
            <RealTimeMetrics 
              isMonitoring={isMonitoring} 
              onToggleMonitoring={() => setIsMonitoring(!isMonitoring)} 
            />
          </div>
          <PerformanceAlerts />
        </section>

        {/* Content Analysis Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Content Analysis & Optimization</h2>
          <ContentAnalysis content={contentData} />
          <KeywordOpportunities opportunities={keywordOpportunities} />
        </section>

        {/* Image Optimization Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Image Optimization</h2>
          <ImageAnalysis images={imageData} />
        </section>

        {/* Internal Linking Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Internal Linking Strategy</h2>
          <InternalLinkingStrategy {...internalLinkingData} />
          <LinkBuildingRecommendations />
        </section>

        {/* Schema Markup Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Advanced Schema Markup</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SchemaManager schemas={schemaData} />
            <RichSnippetPreview />
          </div>
        </section>

        {/* Quick Actions */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Optimization Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-left">
              <h4 className="font-medium text-gray-900 mb-2">Auto-Fix Images</h4>
              <p className="text-sm text-gray-600">Optimize images and add missing alt text</p>
            </button>
            <button className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-left">
              <h4 className="font-medium text-gray-900 mb-2">Generate Schema</h4>
              <p className="text-sm text-gray-600">Add structured data to improve rich snippets</p>
            </button>
            <button className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-left">
              <h4 className="font-medium text-gray-900 mb-2">Link Suggestions</h4>
              <p className="text-sm text-gray-600">Implement recommended internal links</p>
            </button>
            <button className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-left">
              <h4 className="font-medium text-gray-900 mb-2">Content Audit</h4>
              <p className="text-sm text-gray-600">Run comprehensive content analysis</p>
            </button>
          </div>
        </section>
      </div>
    </>
  );
}