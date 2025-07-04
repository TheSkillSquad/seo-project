import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, FileText, Hash, Image, Loader } from 'lucide-react';
import { SeoHead } from './SeoHead';
import { SchemaMarkup, createWebPageSchema } from './SchemaMarkup';
import { apiService, OnPageAnalysisResult } from '../services/api';

interface OnPageAnalysisProps {
  analyzedUrl?: string;
}

export function OnPageAnalysis({ analyzedUrl }: OnPageAnalysisProps) {
  const [analysisData, setAnalysisData] = useState<OnPageAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (analyzedUrl) {
      analyzeUrl(analyzedUrl);
    } else {
      // Load default data when no URL is being analyzed
      setAnalysisData({
        url: '',
        metaTags: [
          { page: 'Homepage', title: 'Present', description: 'Missing', canonical: 'Present', status: 'warning' },
          { page: 'About', title: 'Present', description: 'Present', canonical: 'Present', status: 'success' },
          { page: 'Products', title: 'Present', description: 'Missing', canonical: 'Missing', status: 'error' },
          { page: 'Contact', title: 'Duplicate', description: 'Present', canonical: 'Present', status: 'warning' },
        ],
        headingStructure: [
          { page: 'Homepage', h1: 1, h2: 3, h3: 8, h4: 2, issues: 'Multiple H1 tags', status: 'error' },
          { page: 'About', h1: 1, h2: 2, h3: 4, h4: 1, issues: 'Good structure', status: 'success' },
          { page: 'Products', h1: 0, h2: 5, h3: 12, h4: 3, issues: 'Missing H1', status: 'error' },
          { page: 'Contact', h1: 1, h2: 1, h3: 2, h4: 0, issues: 'Good structure', status: 'success' },
        ],
        imageOptimization: [
          { page: 'Homepage', total: 15, withAlt: 12, missing: 3, status: 'warning' },
          { page: 'About', total: 8, withAlt: 8, missing: 0, status: 'success' },
          { page: 'Products', total: 24, withAlt: 18, missing: 6, status: 'error' },
          { page: 'Contact', total: 3, withAlt: 3, missing: 0, status: 'success' },
        ]
      });
    }
  }, [analyzedUrl]);

  const analyzeUrl = async (url: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await apiService.analyzeOnPage(url);
      setAnalysisData(result);
    } catch (err) {
      setError('Failed to analyze the URL. Please check the URL and try again.');
      console.error('Analysis error:', err);
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

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'success': return `${baseClasses} bg-green-100 text-green-800`;
      case 'warning': return `${baseClasses} bg-orange-100 text-orange-800`;
      case 'error': return `${baseClasses} bg-red-100 text-red-800`;
    }
  };

  const canonicalUrl = analyzedUrl || 'https://seoblend.com/onpage-analysis';

  return (
    <>
      <SeoHead
        title="On-Page SEO Analysis - SEOblend"
        description="Comprehensive on-page SEO analysis tool. Analyze meta tags, heading structure, image optimization, and content quality to improve your search rankings."
        canonicalUrl={canonicalUrl}
        ogTitle="On-Page SEO Analysis Tool - Optimize Your Content"
        ogDescription="Analyze and optimize your page elements for better search engine visibility. Check meta tags, headings, images, and content structure."
        keywords="on-page SEO, meta tags analysis, heading structure, image optimization, content analysis, SEO audit"
      />
      
      <SchemaMarkup schema={createWebPageSchema(
        "On-Page SEO Analysis",
        "Analyze and optimize your page elements for better search engine visibility",
        canonicalUrl
      )} />

      <section className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">On-Page SEO Analysis</h1>
          <p className="text-gray-600 mt-1">
            {analyzedUrl 
              ? `Analyzing page elements for ${new URL(analyzedUrl).hostname}` 
              : 'Analyze and optimize your page elements for better search engine visibility'
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
              onClick={() => analyzedUrl && analyzeUrl(analyzedUrl)}
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
              <p className="text-gray-600">Analyzing on-page elements...</p>
              <p className="text-sm text-gray-500 mt-1">This may take a few seconds</p>
            </div>
          </div>
        ) : analysisData && (
          <>
            {/* Real-time Analysis Results */}
            {analyzedUrl && analysisData.details && (
              <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Live Analysis Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Title:</strong> {analysisData.details.title || 'Missing'}
                  </div>
                  <div>
                    <strong>Meta Description:</strong> {analysisData.details.metaDescription || 'Missing'}
                  </div>
                  <div>
                    <strong>Canonical URL:</strong> {analysisData.details.canonical || 'Missing'}
                  </div>
                  <div>
                    <strong>Open Graph Title:</strong> {analysisData.details.ogTitle || 'Missing'}
                  </div>
                </div>
              </section>
            )}

            {/* Meta Tags Analysis */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-labelledby="meta-tags-heading">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="h-6 w-6 text-blue-600" />
                <h2 id="meta-tags-heading" className="text-xl font-semibold text-gray-900">Meta Tags Analysis</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full" role="table" aria-label="Meta tags analysis results">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Page</th>
                      <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Title Tag</th>
                      <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Meta Description</th>
                      <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Canonical</th>
                      <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysisData.metaTags.map((tag, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{tag.page}</td>
                        <td className="py-3 px-4">
                          <span className={tag.title === 'Present' ? 'text-green-600' : tag.title === 'Duplicate' ? 'text-orange-600' : 'text-red-600'}>
                            {tag.title}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={tag.description === 'Present' ? 'text-green-600' : 'text-red-600'}>
                            {tag.description}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={tag.canonical === 'Present' ? 'text-green-600' : 'text-red-600'}>
                            {tag.canonical}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(tag.status)}
                            <span className={getStatusBadge(tag.status)}>
                              {tag.status === 'success' ? 'Good' : tag.status === 'warning' ? 'Needs Attention' : 'Critical'}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Fix Now
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Heading Structure */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-labelledby="heading-structure-heading">
              <div className="flex items-center space-x-3 mb-6">
                <Hash className="h-6 w-6 text-blue-600" />
                <h2 id="heading-structure-heading" className="text-xl font-semibold text-gray-900">Heading Structure</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {analysisData.headingStructure.map((structure, index) => (
                  <article key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">{structure.page}</h3>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(structure.status)}
                        <span className={getStatusBadge(structure.status)}>
                          {structure.status === 'success' ? 'Good' : 'Issues Found'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 mb-3" role="group" aria-label={`Heading count for ${structure.page}`}>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{structure.h1}</div>
                        <div className="text-xs text-gray-500">H1</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{structure.h2}</div>
                        <div className="text-xs text-gray-500">H2</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{structure.h3}</div>
                        <div className="text-xs text-gray-500">H3</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{structure.h4}</div>
                        <div className="text-xs text-gray-500">H4</div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600">{structure.issues}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* Image Optimization */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-labelledby="image-optimization-heading">
              <div className="flex items-center space-x-3 mb-6">
                <Image className="h-6 w-6 text-blue-600" />
                <h2 id="image-optimization-heading" className="text-xl font-semibold text-gray-900">Image Optimization</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {analysisData.imageOptimization.map((image, index) => (
                  <article key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">{image.page}</h3>
                      {getStatusIcon(image.status)}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Images:</span>
                        <span className="font-medium">{image.total}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">With Alt Text:</span>
                        <span className="font-medium text-green-600">{image.withAlt}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Missing Alt:</span>
                        <span className="font-medium text-red-600">{image.missing}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 w-full bg-gray-200 rounded-full h-2" role="progressbar" aria-valuenow={Math.round((image.withAlt / image.total) * 100)} aria-valuemin={0} aria-valuemax={100}>
                      <div 
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${(image.withAlt / image.total) * 100}%` }}
                      />
                    </div>
                    
                    <div className="mt-2 text-xs text-gray-500 text-center">
                      {Math.round((image.withAlt / image.total) * 100)}% optimized
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </section>
    </>
  );
}