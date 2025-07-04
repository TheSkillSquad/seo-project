import React, { useState } from 'react';
import { Link2, ExternalLink, ArrowRight, Target, TrendingUp } from 'lucide-react';

interface InternalLink {
  fromPage: string;
  toPage: string;
  anchorText: string;
  context: string;
  relevanceScore: number;
  authority: number;
}

interface LinkOpportunity {
  fromPage: string;
  toPage: string;
  suggestedAnchor: string;
  reason: string;
  impact: 'High' | 'Medium' | 'Low';
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface InternalLinkingProps {
  currentLinks: InternalLink[];
  opportunities: LinkOpportunity[];
  orphanPages: string[];
}

export function InternalLinkingStrategy({ currentLinks, opportunities, orphanPages }: InternalLinkingProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const linkStrength = currentLinks.reduce((acc, link) => acc + link.relevanceScore, 0) / currentLinks.length;
  const totalPages = new Set([...currentLinks.map(l => l.fromPage), ...currentLinks.map(l => l.toPage)]).size;
  const avgLinksPerPage = currentLinks.length / totalPages;

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Link2 className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Internal Linking Analysis</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">{currentLinks.length}</div>
            <div className="text-sm text-blue-800">Total Internal Links</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">{linkStrength.toFixed(1)}</div>
            <div className="text-sm text-green-800">Avg Link Relevance</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-2xl font-bold text-orange-600">{avgLinksPerPage.toFixed(1)}</div>
            <div className="text-sm text-orange-800">Links per Page</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="text-2xl font-bold text-red-600">{orphanPages.length}</div>
            <div className="text-sm text-red-800">Orphan Pages</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
          {[
            { id: 'overview', label: 'Link Map' },
            { id: 'opportunities', label: 'Opportunities' },
            { id: 'orphans', label: 'Orphan Pages' },
            { id: 'anchor-text', label: 'Anchor Text' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Link Map Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Current Internal Link Structure</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {currentLinks.slice(0, 20).map((link, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="text-sm text-gray-600 truncate max-w-xs">{link.fromPage}</div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{link.toPage}</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-gray-500 max-w-xs truncate">"{link.anchorText}"</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${link.relevanceScore * 10}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{link.relevanceScore.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Opportunities Tab */}
        {activeTab === 'opportunities' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Link Building Opportunities</h3>
              <span className="text-sm text-gray-600">{opportunities.length} opportunities found</span>
            </div>
            <div className="space-y-3">
              {opportunities.map((opp, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(opp.impact)}`}>
                          {opp.impact} Impact
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(opp.difficulty)}`}>
                          {opp.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-gray-600 truncate max-w-xs">{opp.fromPage}</span>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900 truncate max-w-xs">{opp.toPage}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Suggested anchor: "{opp.suggestedAnchor}"</p>
                      <p className="text-xs text-gray-500">{opp.reason}</p>
                    </div>
                    <button className="ml-4 px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700">
                      Add Link
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orphan Pages Tab */}
        {activeTab === 'orphans' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Orphan Pages</h3>
              <span className="text-sm text-red-600">{orphanPages.length} pages need internal links</span>
            </div>
            {orphanPages.length > 0 ? (
              <div className="space-y-3">
                {orphanPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-red-200 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <ExternalLink className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium text-gray-900">{page}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700">
                        Find Link Opportunities
                      </button>
                      <button className="px-3 py-1 border border-gray-300 text-gray-700 text-xs rounded-lg hover:bg-gray-50">
                        View Page
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Target className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No orphan pages found! All pages have internal links.</p>
              </div>
            )}
          </div>
        )}

        {/* Anchor Text Tab */}
        {activeTab === 'anchor-text' && (
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Anchor Text Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Most Used Anchor Texts</h4>
                <div className="space-y-2">
                  {['click here', 'read more', 'learn more', 'SEO tools', 'website analysis'].map((anchor, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-900">"{anchor}"</span>
                      <span className="text-xs text-gray-600">{Math.floor(Math.random() * 20) + 1} uses</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Anchor Text Recommendations</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm text-orange-800">
                      <strong>Reduce generic anchors:</strong> "Click here" and "read more" should be more descriptive
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Good keyword usage:</strong> Using relevant keywords in anchor text
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Opportunity:</strong> Add more branded anchor text for authority pages
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function LinkBuildingRecommendations() {
  const recommendations = [
    {
      type: 'Hub Page Creation',
      description: 'Create topic cluster hub pages to improve internal linking structure',
      impact: 'High',
      effort: 'Medium',
      pages: ['SEO Guide Hub', 'Technical SEO Resources', 'Content Marketing Center']
    },
    {
      type: 'Contextual Links',
      description: 'Add more contextual internal links within blog content',
      impact: 'Medium',
      effort: 'Low',
      pages: ['Blog posts', 'Resource pages', 'Case studies']
    },
    {
      type: 'Footer/Navigation',
      description: 'Optimize footer and navigation links for better crawlability',
      impact: 'Medium',
      effort: 'Low',
      pages: ['Site footer', 'Main navigation', 'Breadcrumbs']
    },
    {
      type: 'Related Content',
      description: 'Implement "Related Articles" sections on all content pages',
      impact: 'High',
      effort: 'Medium',
      pages: ['Blog posts', 'Product pages', 'Landing pages']
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <TrendingUp className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Link Building Recommendations</h2>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-medium text-gray-900">{rec.type}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    rec.impact === 'High' ? 'bg-green-100 text-green-800' :
                    rec.impact === 'Medium' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {rec.impact} Impact
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    rec.effort === 'Low' ? 'bg-green-100 text-green-800' :
                    rec.effort === 'Medium' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {rec.effort} Effort
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                <div className="flex flex-wrap gap-1">
                  {rec.pages.map((page, pageIndex) => (
                    <span key={pageIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {page}
                    </span>
                  ))}
                </div>
              </div>
              <button className="ml-4 px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700">
                Implement
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}