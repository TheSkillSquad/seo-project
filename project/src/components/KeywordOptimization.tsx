import React from 'react';
import { Target, TrendingUp, TrendingDown, Search, ArrowUp, ArrowDown } from 'lucide-react';
import { SeoHead } from './SeoHead';
import { SchemaMarkup, createWebPageSchema } from './SchemaMarkup';

export function KeywordOptimization() {
  const keywordOverview = [
    { metric: 'Total Keywords', value: '1,247', change: '+89', trend: 'up' },
    { metric: 'Top 10 Rankings', value: '156', change: '+12', trend: 'up' },
    { metric: 'Average Position', value: '18.4', change: '-2.1', trend: 'up' },
    { metric: 'Click-Through Rate', value: '3.8%', change: '+0.5%', trend: 'up' },
  ];

  const topKeywords = [
    {
      keyword: 'seo analysis tool',
      position: 3,
      previousPosition: 5,
      volume: 8100,
      difficulty: 'Medium',
      traffic: 245,
      intent: 'Commercial'
    },
    {
      keyword: 'website seo checker',
      position: 7,
      previousPosition: 9,
      volume: 5400,
      difficulty: 'High',
      traffic: 156,
      intent: 'Commercial'
    },
    {
      keyword: 'on page seo audit',
      position: 12,
      previousPosition: 8,
      volume: 3200,
      difficulty: 'Medium',
      traffic: 89,
      intent: 'Informational'
    },
    {
      keyword: 'seo optimization guide',
      position: 4,
      previousPosition: 4,
      volume: 2900,
      difficulty: 'Low',
      traffic: 198,
      intent: 'Informational'
    }
  ];

  const keywordGaps = [
    {
      keyword: 'technical seo audit',
      volume: 6700,
      difficulty: 'Medium',
      competitorRank: 2,
      opportunity: 'High',
      intent: 'Commercial'
    },
    {
      keyword: 'site speed optimization',
      volume: 4100,
      difficulty: 'Low',
      competitorRank: 1,
      opportunity: 'High',
      intent: 'Commercial'
    },
    {
      keyword: 'backlink analysis tool',
      volume: 3800,
      difficulty: 'High',
      competitorRank: 4,
      opportunity: 'Medium',
      intent: 'Commercial'
    },
    {
      keyword: 'seo reporting software',
      volume: 2300,
      difficulty: 'Medium',
      competitorRank: 3,
      opportunity: 'Medium',
      intent: 'Commercial'
    }
  ];

  const getPositionChange = (current: number, previous: number) => {
    const change = previous - current;
    if (change > 0) {
      return { icon: <ArrowUp className="h-4 w-4 text-green-600" />, color: 'text-green-600', value: `+${change}` };
    } else if (change < 0) {
      return { icon: <ArrowDown className="h-4 w-4 text-red-600" />, color: 'text-red-600', value: `${change}` };
    }
    return { icon: null, color: 'text-gray-500', value: '-' };
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <SeoHead
        title="Keyword Optimization - SEOblend"
        description="Advanced keyword optimization and tracking tool. Monitor keyword rankings, discover new opportunities, analyze search intent, and optimize your content strategy."
        canonicalUrl="https://seoblend.com/keyword-optimization"
        ogTitle="Keyword Optimization Tool - Track Rankings & Opportunities"
        ogDescription="Track keyword rankings and discover new opportunities for content optimization. Analyze search intent, difficulty, and competitor performance."
        keywords="keyword optimization, keyword tracking, search rankings, keyword research, content optimization, search intent analysis"
      />
      
      <SchemaMarkup schema={createWebPageSchema(
        "Keyword Optimization",
        "Track keyword rankings and discover new opportunities for content optimization",
        "https://seoblend.com/keyword-optimization"
      )} />

      <section className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">Keyword Optimization</h1>
          <p className="text-gray-600 mt-1">Track keyword rankings and discover new opportunities for content optimization</p>
        </header>

        {/* Keyword Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" aria-labelledby="keyword-overview-heading">
          <h2 id="keyword-overview-heading" className="sr-only">Keyword Performance Overview</h2>
          {keywordOverview.map((metric, index) => (
            <article key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">{metric.metric}</h3>
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
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

        {/* Top Performing Keywords */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-labelledby="top-keywords-heading">
          <div className="flex items-center space-x-3 mb-6">
            <Target className="h-6 w-6 text-blue-600" />
            <h2 id="top-keywords-heading" className="text-xl font-semibold text-gray-900">Top Performing Keywords</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full" role="table" aria-label="Top performing keywords and their rankings">
              <thead>
                <tr className="border-b border-gray-200">
                  <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Keyword</th>
                  <th scope="col" className="text-center py-3 px-4 font-medium text-gray-600">Position</th>
                  <th scope="col" className="text-center py-3 px-4 font-medium text-gray-600">Change</th>
                  <th scope="col" className="text-center py-3 px-4 font-medium text-gray-600">Volume</th>
                  <th scope="col" className="text-center py-3 px-4 font-medium text-gray-600">Difficulty</th>
                  <th scope="col" className="text-center py-3 px-4 font-medium text-gray-600">Traffic</th>
                  <th scope="col" className="text-center py-3 px-4 font-medium text-gray-600">Intent</th>
                </tr>
              </thead>
              <tbody>
                {topKeywords.map((keyword, index) => {
                  const positionChange = getPositionChange(keyword.position, keyword.previousPosition);
                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{keyword.keyword}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="font-bold text-2xl text-blue-600">#{keyword.position}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          {positionChange.icon}
                          <span className={`text-sm font-medium ${positionChange.color}`}>
                            {positionChange.value}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center text-sm text-gray-600">
                        {keyword.volume.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(keyword.difficulty)}`}>
                          {keyword.difficulty}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-medium text-gray-900">
                        {keyword.traffic}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          keyword.intent === 'Commercial' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {keyword.intent}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Keyword Gap Analysis */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-labelledby="keyword-gaps-heading">
          <div className="flex items-center space-x-3 mb-6">
            <Search className="h-6 w-6 text-blue-600" />
            <h2 id="keyword-gaps-heading" className="text-xl font-semibold text-gray-900">Keyword Gap Analysis</h2>
          </div>
          
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Opportunities Detected:</strong> These keywords are ranking well for competitors but missing from your content strategy.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full" role="table" aria-label="Keyword gap analysis showing missed opportunities">
              <thead>
                <tr className="border-b border-gray-200">
                  <th scope="col" className="text-left py-3 px-4 font-medium text-gray-600">Keyword</th>
                  <th scope="col" className="text-center py-3 px-4 font-medium text-gray-600">Volume</th>
                  <th scope="col" className="text-center py-3 px-4 font-medium text-gray-600">Difficulty</th>
                  <th scope="col" className="text-center py-3 px-4 font-medium text-gray-600">Competitor Rank</th>
                  <th scope="col" className="text-center py-3 px-4 font-medium text-gray-600">Opportunity</th>
                  <th scope="col" className="text-center py-3 px-4 font-medium text-gray-600">Intent</th>
                  <th scope="col" className="text-center py-3 px-4 font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {keywordGaps.map((gap, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{gap.keyword}</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">
                      {gap.volume.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(gap.difficulty)}`}>
                        {gap.difficulty}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-bold text-lg text-orange-600">#{gap.competitorRank}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOpportunityColor(gap.opportunity)}`}>
                        {gap.opportunity}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        gap.intent === 'Commercial' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {gap.intent}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Create Content
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Content Suggestions */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-labelledby="content-suggestions-heading">
          <h2 id="content-suggestions-heading" className="text-xl font-semibold text-gray-900 mb-6">Content Optimization Suggestions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Pages Needing Optimization</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Homepage</div>
                    <div className="text-sm text-gray-600">Target: "seo analysis tool"</div>
                  </div>
                  <button className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                    Optimize
                  </button>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Product Page</div>
                    <div className="text-sm text-gray-600">Missing: "website seo checker"</div>
                  </div>
                  <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                    Add Keywords
                  </button>
                </div>
              </div>
            </article>

            <article className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Content Opportunities</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Blog Post Idea</div>
                    <div className="text-sm text-gray-600">"Complete Technical SEO Guide"</div>
                  </div>
                  <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                    Create
                  </button>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Landing Page</div>
                    <div className="text-sm text-gray-600">"Site Speed Optimization Service"</div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Plan
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>
      </section>
    </>
  );
}