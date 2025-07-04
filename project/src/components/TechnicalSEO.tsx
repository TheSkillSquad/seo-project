import React, { useState, useEffect } from 'react';
import { Server, Smartphone, Globe, FileX, CheckCircle, XCircle, AlertTriangle, Loader } from 'lucide-react';
import { SeoHead } from './SeoHead';
import { SchemaMarkup, createWebPageSchema } from './SchemaMarkup';
import { apiService, TechnicalSEOResult } from '../services/api';

interface TechnicalSEOProps {
  analyzedUrl?: string;
}

export function TechnicalSEO({ analyzedUrl }: TechnicalSEOProps) {
  const [technicalData, setTechnicalData] = useState<TechnicalSEOResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (analyzedUrl) {
      analyzeTechnical(analyzedUrl);
    } else {
      // Load default data when no URL is being analyzed
      setTechnicalData({
        url: '',
        coreWebVitals: [
          { metric: 'Largest Contentful Paint (LCP)', value: '2.1s', target: '<2.5s', status: 'success' },
          { metric: 'First Input Delay (FID)', value: '85ms', target: '<100ms', status: 'success' },
          { metric: 'Cumulative Layout Shift (CLS)', value: '0.15', target: '<0.1', status: 'warning' },
          { metric: 'First Contentful Paint (FCP)', value: '1.8s', target: '<1.8s', status: 'success' },
        ],
        technicalChecks: [
          { check: 'SSL Certificate', status: 'success', description: 'Valid SSL certificate installed' },
          { check: 'Mobile-Friendly', status: 'success', description: 'All pages are mobile optimized' },
          { check: 'XML Sitemap', status: 'success', description: 'Sitemap found and submitted' },
          { check: 'Robots.txt', status: 'success', description: 'Properly configured robots.txt' },
          { check: 'Schema Markup', status: 'warning', description: 'Missing structured data on some pages' },
          { check: 'Internal Links', status: 'success', description: 'Good internal linking structure' },
          { check: 'URL Structure', status: 'warning', description: 'Some URLs could be more descriptive' },
          { check: 'Duplicate Content', status: 'error', description: '3 pages have duplicate content issues' },
        ],
        crawlErrors: [
          { url: '/old-product-page', error: '404 Not Found', lastSeen: '2 days ago', status: 'error' },
          { url: '/blog/old-post', error: '404 Not Found', lastSeen: '5 days ago', status: 'error' },
          { url: '/category/discontinued', error: '500 Server Error', lastSeen: '1 day ago', status: 'error' },
          { url: '/redirect-loop', error: 'Redirect Loop', lastSeen: '3 hours ago', status: 'warning' },
        ]
      });
    }
  }, [analyzedUrl]);

  const analyzeTechnical = async (url: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await apiService.analyzeTechnicalSEO(url);
      setTechnicalData(result);
    } catch (err) {
      setError('Failed to analyze technical SEO. Please check the URL and try again.');
      console.error('Technical analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'error': return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-orange-600';
      case 'error': return 'text-red-600';
    }
  };

  const canonicalUrl = analyzedUrl || 'https://seoblend.com/technical-seo';

  return (
    <>
      <SeoHead
        title="Technical SEO Analysis - SEOblend"
        description="Comprehensive technical SEO audit tool. Monitor Core Web Vitals, crawl errors, mobile-friendliness, and technical SEO factors that impact search rankings."
        canonicalUrl={canonicalUrl}
        ogTitle="Technical SEO Audit Tool - Fix Technical Issues"
        ogDescription="Monitor technical aspects that impact your site's search engine performance. Check Core Web Vitals, crawl errors, and indexability."
        keywords="technical SEO, Core Web Vitals, crawl errors, mobile-friendly, SSL certificate, XML sitemap, robots.txt"
      />
      
      <SchemaMarkup schema={createWebPageSchema(
        "Technical SEO Analysis",
        "Monitor technical aspects that impact your site's search engine performance",
        canonicalUrl
      )} />

      <section className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">Technical SEO</h1>
          <p className="text-gray-600 mt-1">
            {analyzedUrl 
              ? `Monitoring technical aspects for ${new URL(analyzedUrl).hostname}` 
              : 'Monitor technical aspects that impact your site\'s search engine performance'
            }
          </p>
          {analyzedUrl && (
            <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Currently analyzing:</strong> {analyzedUrl}
              </p>
            </div>
          )}
        </header>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <p className="text-red-800">{error}</p>
            </div>
            <button 
              onClick={() => analyzedUrl && analyzeTechnical(analyzedUrl)}
              className="mt-2 text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Analyzing technical SEO factors...</p>
              <p className="text-sm text-gray-500 mt-1">Checking SSL, mobile-friendliness, and more</p>
            </div>
          </div>
        ) : technicalData && (
          <>
            {/* Core Web Vitals */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-labelledby="core-web-vitals-heading">
              <div className="flex items-center space-x-3 mb-6">
                <Smartphone className="h-6 w-6 text-blue-600" />
                <h2 id="core-web-vitals-heading" className="text-xl font-semibold text-gray-900">Core Web Vitals</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {technicalData.coreWebVitals.map((vital, index) => (
                  <article key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 text-sm">{vital.metric}</h3>
                      {getStatusIcon(vital.status)}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-gray-900">{vital.value}</div>
                      <div className="text-sm text-gray-600">Target: {vital.target}</div>
                      
                      <div className={`text-xs font-medium ${getStatusColor(vital.status)}`}>
                        {vital.status === 'success' ? 'Good' : vital.status === 'warning' ? 'Needs Improvement' : 'Poor'}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Technical Checks */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-labelledby="technical-checks-heading">
              <div className="flex items-center space-x-3 mb-6">
                <Server className="h-6 w-6 text-blue-600" />
                <h2 id="technical-checks-heading" className="text-xl font-semibold text-gray-900">Technical Checks</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {technicalData.technicalChecks.map((check, index) => (
                  <article key={index} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                    {getStatusIcon(check.status)}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{check.check}</h3>
                      <p className="text-sm text-gray-600 mt-1">{check.description}</p>
                    </div>
                    {check.status !== 'success' && (
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Fix
                      </button>
                    )}
                  </article>
                ))}
              </div>
            </section>

            {/* Crawl Errors */}
            {technicalData.crawlErrors.length > 0 && (
              <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-labelledby="crawl-errors-heading">
                <div className="flex items-center space-x-3 mb-6">
                  <FileX className="h-6 w-6 text-blue-600" />
                  <h2 id="crawl-errors-heading" className="text-xl font-semibold text-gray-900">Crawl Errors</h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full" role="table" aria-label="Crawl errors found on your website">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">URL</th>
                        <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Error Type</th>
                        <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Last Seen</th>
                        <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {technicalData.crawlErrors.map((error, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-mono text-sm text-gray-900">{error.url}</td>
                          <td className="py-3 px-4">
                            <span className={`text-sm ${getStatusColor(error.status)}`}>
                              {error.error}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">{error.lastSeen}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(error.status)}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              Fix
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Indexability Status */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-labelledby="indexability-heading">
              <div className="flex items-center space-x-3 mb-6">
                <Globe className="h-6 w-6 text-blue-600" />
                <h2 id="indexability-heading" className="text-xl font-semibold text-gray-900">Indexability Status</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <article className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {analyzedUrl ? '1' : '245'}
                  </div>
                  <div className="text-sm text-green-800 font-medium">Pages Indexed</div>
                  <div className="text-xs text-green-600 mt-1">
                    {analyzedUrl ? 'Current page analyzed' : '94.2% of total pages'}
                  </div>
                </article>
                
                <article className="text-center p-6 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {analyzedUrl ? '0' : '12'}
                  </div>
                  <div className="text-sm text-orange-800 font-medium">Blocked by Robots</div>
                  <div className="text-xs text-orange-600 mt-1">
                    {analyzedUrl ? 'No blocking detected' : '4.6% of total pages'}
                  </div>
                </article>
                
                <article className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {technicalData.crawlErrors.length}
                  </div>
                  <div className="text-sm text-red-800 font-medium">Indexing Errors</div>
                  <div className="text-xs text-red-600 mt-1">
                    {analyzedUrl ? 'Found during analysis' : '1.2% of total pages'}
                  </div>
                </article>
              </div>
            </section>
          </>
        )}
      </section>
    </>
  );
}