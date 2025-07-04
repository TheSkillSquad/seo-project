import React, { useState, useEffect } from 'react';
import { Gauge, Clock, Zap, FileText, Loader, XCircle } from 'lucide-react';
import { SeoHead } from './SeoHead';
import { SchemaMarkup, createWebPageSchema } from './SchemaMarkup';
import { apiService, SpeedAnalysisResult } from '../services/api';

interface SiteSpeedProps {
  analyzedUrl?: string;
}

export function SiteSpeed({ analyzedUrl }: SiteSpeedProps) {
  const [speedData, setSpeedData] = useState<SpeedAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (analyzedUrl) {
      analyzeSpeed(analyzedUrl);
    } else {
      // Load default data when no URL is being analyzed
      setSpeedData({
        url: '',
        scores: {
          performance: 73,
          seo: 85,
          accessibility: 92,
          bestPractices: 88
        },
        metrics: {
          lcp: '2.1s',
          fid: '85ms',
          cls: '0.15',
          fcp: '1.8s',
          ttfb: '450ms'
        },
        opportunities: [
          {
            category: 'Image Optimization',
            impact: 'High',
            savings: '1.2s',
            description: 'Compress and resize images, use modern formats (WebP)',
            status: 'critical'
          },
          {
            category: 'JavaScript Optimization',
            impact: 'Medium',
            savings: '0.8s',
            description: 'Remove unused JavaScript and defer non-critical scripts',
            status: 'warning'
          }
        ]
      });
    }
  }, [analyzedUrl]);

  const analyzeSpeed = async (url: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await apiService.analyzePageSpeed(url);
      setSpeedData(result);
    } catch (err) {
      setError('Failed to analyze page speed. Please check the URL and try again.');
      console.error('Speed analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 70) return 'bg-orange-100';
    return 'bg-red-100';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const canonicalUrl = analyzedUrl || 'https://seoblend.com/site-speed';

  return (
    <>
      <SeoHead
        title="Site Speed Analysis - SEOblend"
        description="Comprehensive website speed analysis and optimization tool. Monitor page load times, Core Web Vitals, and get actionable recommendations to improve performance."
        canonicalUrl={canonicalUrl}
        ogTitle="Site Speed Optimization Tool - Improve Performance"
        ogDescription="Monitor and optimize your website's performance metrics. Analyze load times, Core Web Vitals, and get optimization recommendations."
        keywords="site speed, page speed, performance optimization, Core Web Vitals, load time analysis, website performance"
      />
      
      <SchemaMarkup schema={createWebPageSchema(
        "Site Speed Analysis",
        "Monitor and optimize your website's performance metrics",
        canonicalUrl
      )} />

      <section className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">Site Speed Analysis</h1>
          <p className="text-gray-600 mt-1">
            {analyzedUrl 
              ? `Monitoring performance metrics for ${new URL(analyzedUrl).hostname}` 
              : 'Monitor and optimize your website\'s performance metrics'
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
              onClick={() => analyzedUrl && analyzeSpeed(analyzedUrl)}
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
              <p className="text-gray-600">Analyzing site speed performance...</p>
              <p className="text-sm text-gray-500 mt-1">This may take up to 30 seconds</p>
            </div>
          </div>
        ) : speedData && (
          <>
            {/* Speed Overview */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6" aria-labelledby="speed-overview-heading">
              <h2 id="speed-overview-heading" className="sr-only">Speed Performance Overview</h2>
              
              <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Gauge className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
                </div>
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-2 ${getScoreColor(speedData.scores.performance)}`}>
                    {speedData.scores.performance}
                  </div>
                  <div className="text-sm text-gray-600">Performance Score</div>
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-3" role="progressbar" aria-valuenow={speedData.scores.performance} aria-valuemin={0} aria-valuemax={100}>
                    <div 
                      className={`h-3 rounded-full ${speedData.scores.performance >= 90 ? 'bg-green-500' : speedData.scores.performance >= 70 ? 'bg-orange-500' : 'bg-red-500'}`}
                      style={{ width: `${speedData.scores.performance}%` }}
                    />
                  </div>
                </div>
              </article>

              <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">LCP</h3>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">{speedData.metrics.lcp}</div>
                  <div className="text-sm text-gray-600">Largest Contentful Paint</div>
                  <div className="text-xs text-gray-500 mt-2">Target: &lt; 2.5s</div>
                </div>
              </article>

              <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">FID</h3>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">{speedData.metrics.fid}</div>
                  <div className="text-sm text-gray-600">First Input Delay</div>
                  <div className="text-xs text-gray-500 mt-2">Target: &lt; 100ms</div>
                </div>
              </article>

              <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">CLS</h3>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">{speedData.metrics.cls}</div>
                  <div className="text-sm text-gray-600">Cumulative Layout Shift</div>
                  <div className="text-xs text-gray-500 mt-2">Target: &lt; 0.1</div>
                </div>
              </article>
            </section>

            {/* All Scores */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Lighthouse Scores</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {Object.entries(speedData.scores).map(([category, score]) => (
                  <div key={category} className="text-center">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getScoreBg(score)} mb-3`}>
                      <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
                        {score}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-gray-900 capitalize">
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Core Web Vitals Details */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Core Web Vitals Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {Object.entries(speedData.metrics).map(([metric, value]) => (
                  <div key={metric} className="border border-gray-200 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-gray-900 mb-1">{value}</div>
                    <div className="text-sm text-gray-600 uppercase tracking-wide">{metric}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Optimization Opportunities */}
            {speedData.opportunities.length > 0 && (
              <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-labelledby="optimization-suggestions-heading">
                <div className="flex items-center space-x-3 mb-6">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <h2 id="optimization-suggestions-heading" className="text-xl font-semibold text-gray-900">Optimization Opportunities</h2>
                </div>
                
                <div className="space-y-4">
                  {speedData.opportunities.map((opportunity, index) => (
                    <article key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-medium text-gray-900">{opportunity.category}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(opportunity.impact)}`}>
                              {opportunity.impact} Impact
                            </span>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Save {opportunity.savings}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{opportunity.description}</p>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 text-sm font-medium">
                            Learn More
                          </button>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                            Auto-Fix
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </section>
    </>
  );
}