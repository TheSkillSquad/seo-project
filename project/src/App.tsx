import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { OnPageAnalysis } from './components/OnPageAnalysis';
import { TechnicalSEO } from './components/TechnicalSEO';
import { SiteSpeed } from './components/SiteSpeed';
import { BacklinkAnalysis } from './components/BacklinkAnalysis';
import { KeywordOptimization } from './components/KeywordOptimization';
import { Reports } from './components/Reports';
import { ContentOptimizationDashboard } from './components/ContentOptimizationDashboard';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentAnalyzedUrl, setCurrentAnalyzedUrl] = useState('');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} onAnalyzeUrl={setCurrentAnalyzedUrl} />;
      case 'onpage':
        return <OnPageAnalysis analyzedUrl={currentAnalyzedUrl} />;
      case 'technical':
        return <TechnicalSEO analyzedUrl={currentAnalyzedUrl} />;
      case 'speed':
        return <SiteSpeed analyzedUrl={currentAnalyzedUrl} />;
      case 'backlinks':
        return <BacklinkAnalysis analyzedUrl={currentAnalyzedUrl} />;
      case 'keywords':
        return <KeywordOptimization analyzedUrl={currentAnalyzedUrl} />;
      case 'reports':
        return <Reports analyzedUrl={currentAnalyzedUrl} />;
      case 'content-optimization':
        return <ContentOptimizationDashboard analyzedUrl={currentAnalyzedUrl} />;
      default:
        return <Dashboard onNavigate={setActiveTab} onAnalyzeUrl={setCurrentAnalyzedUrl} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Layout activeTab={activeTab} onTabChange={setActiveTab} currentUrl={currentAnalyzedUrl}>
        {renderContent()}
      </Layout>
    </div>
  );
}

export default App;