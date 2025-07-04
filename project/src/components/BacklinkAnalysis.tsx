import React from 'react';
import { Link, TrendingUp, TrendingDown, ExternalLink, Shield } from 'lucide-react';
import { SeoHead } from './SeoHead';
import { SchemaMarkup, createWebPageSchema } from './SchemaMarkup';

export function BacklinkAnalysis() {
  const backlinkMetrics = [
    { metric: 'Total Backlinks', value: '2,847', change: '+156', trend: 'up' },
    { metric: 'Referring Domains', value: '342', change: '+23', trend: 'up' },
    { metric: 'Domain Authority', value: '68', change: '+3', trend: 'up' },
    { metric: 'Toxic Links', value: '12', change: '-5', trend: 'down' },
  ];

  const topBacklinks = [
    {
      domain: 'techcrunch.com',
      url: '/startup-features-innovative-seo-tool',
      authority: 92,
      anchor: 'SEO optimization platform',
      traffic: 'High',
      status: 'healthy'
    },
    {
      domain: 'searchengineland.com',
      url: '/seo-tools-comparison-2024',
      authority: 88,
      anchor: 'comprehensive SEO analysis',
      traffic: 'High',
      status: 'healthy'
    },
    {
      domain: 'marketingpro.com',
      url: '/best-seo-tools-list',
      authority: 76,
      anchor: 'click here',
      traffic: 'Medium',
      status: 'warning'
    },
    {
      domain: 'spamsite.info',
      url: '/random-backlink',
      authority: 15,
      anchor: 'best seo tool',
      traffic: 'Low',
      status: 'toxic'
    }
  ];

  const competitorComparison = [
    { competitor: 'Your Site', backlinks: 2847, domains: 342, authority: 68, trend: 'up' },
    { competitor: 'competitor1.com', backlinks: 4521, domains: 578, authority: 74, trend: 'up' },
    { competitor: 'competitor2.com', backlinks: 1923, domains: 287, authority: 61, trend: 'down' },
    { competitor: 'competitor3.com', backlinks: 3156, domains: 445, authority: 71, trend: 'up' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-orange-600 bg-orange-100';
      case 'toxic': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  return (
    <>
      <SeoHead
        title="Backlink Analysis - SEOblend"
        description="Comprehensive backlink analysis tool. Monitor your backlink profile, analyze link quality, identify toxic links, and discover new link building opportunities."
        canonicalUrl="https://seoblend.com/backlink-analysis"
        ogTitle="Backlink Analysis Tool - Monitor Your Link Profile"
        ogDescription="Monitor your backlink profile and identify opportunities for improvement. Analyze link quality, track referring domains, and compare with competitors."
        keywords="backlink analysis, link building, referring domains, domain authority, toxic links, competitor backlinks"
      />
      
      <SchemaMarkup schema={createWebPageSchema(
        "Backlink Analysis",
        "Monitor your backlink profile and identify opportunities for improvement",
        "https://seoblend.com/backlink-analysis"
      )} />

      <section className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">Backlink Analysis</h1>
          <p className="text-gray-600 mt-1">Monitor your backlink profile and identify opportunities for improvement</p>
        </header>

        {/* Backlink Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" aria-labelledby="backlink-metrics-heading">
          <h2 id="backlink-metrics-heading" className="sr-only">Backlink Performance Metrics</h2>
          {backlinkMetrics.map((metric, index) => (
            <article key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">{metric.metric}</h3>
                {getTrendIcon(metric.trend)}
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
                <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </span>
              </div>
            </article>
          ))}
        </section>

        {/* Top Backlinks */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-labelledby="top-backlinks-heading">
          <div className="flex items-center space-x-3 mb-6">
            <Link className="h-6 w-6 text-blue-600" />
            <h2 id="top-backlinks-heading" className="text-xl font-semibold text-gray-900">Top Backlinks</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full" role="table" aria-label="Top backlinks to your website">
              <thead>
                <tr className="border-b border-gray-200">
                  <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Source Domain</th>
                  <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Authority</th>
                  <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Anchor Text</th>
                  <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Traffic</th>
                  <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {topBacklinks.map((backlink, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{backlink.domain}</span>
                        <ExternalLink className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{backlink.url}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-gray-900">{backlink.authority}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">{backlink.anchor}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        backlink.traffic === 'High' ? 'bg-green-100 text-green-800' :
                        backlink.traffic === 'Medium' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {backlink.traffic}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(backlink.status)}`}>
                        {backlink.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {backlink.status === 'toxic' ? (
                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                          Disavow
                        </button>
                      ) : (
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Competitor Comparison */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-labelledby="competitor-comparison-heading">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="h-6 w-6 text-blue-600" />
            <h2 id="competitor-comparison-heading" className="text-xl font-semibold text-gray-900">Competitor Comparison</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full" role="table" aria-label="Backlink comparison with competitors">
              <thead>
                <tr className="border-b border-gray-200">
                  <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Website</th>
                  <th scope="col" className="text-center py-3 px-4 font-medium text-gray-600">Backlinks</th>
                  <th scope="col" className="text-center py-3 px-4 font-medium text-gray-600">Referring Domains</th>
                  <th scope="col" className="text-center py-3 px-4 font-medium text-gray-600">Domain Authority</th>
                  <th scope="col" className="text-center py-3 px-4 font-medium text-gray-600">Trend</th>
                </tr>
              </thead>
              <tbody>
                {competitorComparison.map((competitor, index) => (
                  <tr key={index} className={`border-b border-gray-100 hover:bg-gray-50 ${
                    competitor.competitor === 'Your Site' ? 'bg-blue-50' : ''
                  }`}>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${
                        competitor.competitor === 'Your Site' ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {competitor.competitor}
                      </span>
                      {competitor.competitor === 'Your Site' && (
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          You
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center font-medium">{competitor.backlinks.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center font-medium">{competitor.domains}</td>
                    <td className="py-3 px-4 text-center font-bold">{competitor.authority}</td>
                    <td className="py-3 px-4 text-center">
                      {getTrendIcon(competitor.trend)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Link Building Opportunities */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-labelledby="link-opportunities-heading">
          <h2 id="link-opportunities-heading" className="text-xl font-semibold text-gray-900 mb-6">Link Building Opportunities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <article className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Competitor Backlinks</h3>
              <p className="text-sm text-gray-600 mb-3">
                23 high-quality domains linking to competitors but not to you
              </p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
                View Opportunities
              </button>
            </article>

            <article className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Broken Link Building</h3>
              <p className="text-sm text-gray-600 mb-3">
                15 broken links on relevant sites that you could replace
              </p>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 text-sm font-medium">
                Find Opportunities
              </button>
            </article>

            <article className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Resource Page Links</h3>
              <p className="text-sm text-gray-600 mb-3">
                8 resource pages in your niche where you could request inclusion
              </p>
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 text-sm font-medium">
                View Resources
              </button>
            </article>
          </div>
        </section>
      </section>
    </>
  );
}