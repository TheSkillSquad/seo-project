import React, { useState } from 'react';
import { FileText, Target, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface ContentAnalysisProps {
  content: {
    wordCount: number;
    readabilityScore: number;
    keywordDensity: { [key: string]: number };
    headingStructure: { level: number; text: string; optimized: boolean }[];
    internalLinks: number;
    externalLinks: number;
    issues: string[];
    suggestions: string[];
  };
}

export function ContentAnalysis({ content }: ContentAnalysisProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const getReadabilityColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getKeywordDensityColor = (density: number) => {
    if (density >= 1 && density <= 3) return 'text-green-600';
    if (density > 3 || (density > 0 && density < 1)) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <FileText className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Content Optimization Analysis</h2>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'keywords', label: 'Keywords' },
          { id: 'structure', label: 'Structure' },
          { id: 'suggestions', label: 'Suggestions' }
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

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{content.wordCount}</div>
              <div className="text-sm text-gray-600">Word Count</div>
              <div className="text-xs text-gray-500 mt-1">
                {content.wordCount < 300 ? 'Too short' : content.wordCount > 2000 ? 'Very long' : 'Good length'}
              </div>
            </div>
            <div className={`text-center p-4 border rounded-lg ${getReadabilityColor(content.readabilityScore)}`}>
              <div className="text-2xl font-bold">{content.readabilityScore}</div>
              <div className="text-sm font-medium">Readability Score</div>
              <div className="text-xs mt-1">
                {content.readabilityScore >= 80 ? 'Easy to read' : 
                 content.readabilityScore >= 60 ? 'Moderate' : 'Difficult'}
              </div>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{content.internalLinks + content.externalLinks}</div>
              <div className="text-sm text-gray-600">Total Links</div>
              <div className="text-xs text-gray-500 mt-1">
                {content.internalLinks} internal, {content.externalLinks} external
              </div>
            </div>
          </div>

          {/* Issues and Quick Wins */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span>Issues Found</span>
              </h3>
              <div className="space-y-2">
                {content.issues.map((issue, index) => (
                  <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                    {issue}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span>Quick Wins</span>
              </h3>
              <div className="space-y-2">
                {content.suggestions.slice(0, 3).map((suggestion, index) => (
                  <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Keywords Tab */}
      {activeTab === 'keywords' && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Keyword Density Analysis</h3>
          <div className="space-y-3">
            {Object.entries(content.keywordDensity).map(([keyword, density]) => (
              <div key={keyword} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <span className="font-medium text-gray-900">{keyword}</span>
                <div className="flex items-center space-x-3">
                  <span className={`font-bold ${getKeywordDensityColor(density)}`}>
                    {density.toFixed(1)}%
                  </span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        density >= 1 && density <= 3 ? 'bg-green-500' : 
                        density > 3 || (density > 0 && density < 1) ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(density * 20, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Optimal keyword density:</strong> 1-3% for primary keywords, 0.5-1% for secondary keywords.
            </p>
          </div>
        </div>
      )}

      {/* Structure Tab */}
      {activeTab === 'structure' && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Heading Structure Analysis</h3>
          <div className="space-y-2">
            {content.headingStructure.map((heading, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    heading.level === 1 ? 'bg-blue-100 text-blue-800' :
                    heading.level === 2 ? 'bg-green-100 text-green-800' :
                    heading.level === 3 ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    H{heading.level}
                  </span>
                  <span className="text-gray-900 truncate max-w-md">{heading.text}</span>
                </div>
                {heading.optimized ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions Tab */}
      {activeTab === 'suggestions' && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Optimization Suggestions</h3>
          <div className="space-y-3">
            {content.suggestions.map((suggestion, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <p className="text-gray-900 flex-1">{suggestion}</p>
                  <button className="ml-4 px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700">
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface KeywordOpportunityProps {
  opportunities: Array<{
    keyword: string;
    currentRank: number | null;
    difficulty: 'Low' | 'Medium' | 'High';
    volume: number;
    intent: 'Informational' | 'Commercial' | 'Transactional';
    competitorRank: number;
    opportunity: 'High' | 'Medium' | 'Low';
  }>;
}

export function KeywordOpportunities({ opportunities }: KeywordOpportunityProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Target className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Keyword Opportunities</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-600">Keyword</th>
              <th className="text-center py-3 px-4 font-medium text-gray-600">Current Rank</th>
              <th className="text-center py-3 px-4 font-medium text-gray-600">Volume</th>
              <th className="text-center py-3 px-4 font-medium text-gray-600">Difficulty</th>
              <th className="text-center py-3 px-4 font-medium text-gray-600">Intent</th>
              <th className="text-center py-3 px-4 font-medium text-gray-600">Opportunity</th>
              <th className="text-center py-3 px-4 font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((opp, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-900">{opp.keyword}</td>
                <td className="py-3 px-4 text-center">
                  {opp.currentRank ? (
                    <span className="font-bold text-blue-600">#{opp.currentRank}</span>
                  ) : (
                    <span className="text-gray-400">Not ranking</span>
                  )}
                </td>
                <td className="py-3 px-4 text-center text-sm">{opp.volume.toLocaleString()}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    opp.difficulty === 'Low' ? 'bg-green-100 text-green-800' :
                    opp.difficulty === 'Medium' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {opp.difficulty}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    opp.intent === 'Commercial' ? 'bg-purple-100 text-purple-800' :
                    opp.intent === 'Transactional' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {opp.intent}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    opp.opportunity === 'High' ? 'bg-green-100 text-green-800' :
                    opp.opportunity === 'Medium' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {opp.opportunity}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Optimize
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}