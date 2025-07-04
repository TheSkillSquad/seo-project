// Determine API base URL based on environment
const getApiBaseUrl = () => {
  // Check if we're in development mode
  if (import.meta.env.DEV) {
    return 'http://localhost:3001/api';
  }
  
  // In production, use the /api endpoint which Netlify redirects to functions
  return '/api';
};

const API_BASE_URL = getApiBaseUrl();

export interface SpeedAnalysisResult {
  url: string;
  scores: {
    performance: number;
    seo: number;
    accessibility: number;
    bestPractices: number;
  };
  metrics: {
    lcp: string;
    fid: string;
    cls: string;
    fcp: string;
    ttfb: string;
  };
  opportunities: Array<{
    category: string;
    impact: string;
    savings: string;
    description: string;
    status: string;
  }>;
}

export interface OnPageAnalysisResult {
  url: string;
  metaTags: Array<{
    page: string;
    title: string;
    description: string;
    canonical: string;
    status: string;
  }>;
  headingStructure: Array<{
    page: string;
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    issues: string;
    status: string;
  }>;
  imageOptimization: Array<{
    page: string;
    total: number;
    withAlt: number;
    missing: number;
    status: string;
  }>;
  details?: {
    title: string;
    metaDescription: string;
    canonical: string;
    ogTitle: string;
    ogDescription: string;
    headings: Record<string, number>;
    imageData: {
      total: number;
      withAlt: number;
      missing: number;
    };
  };
}

export interface TechnicalSEOResult {
  url: string;
  coreWebVitals: Array<{
    metric: string;
    value: string;
    target: string;
    status: string;
  }>;
  technicalChecks: Array<{
    check: string;
    status: string;
    description: string;
  }>;
  crawlErrors: Array<{
    url: string;
    error: string;
    lastSeen: string;
    status: string;
  }>;
}

export const apiService = {
  async analyzePageSpeed(url: string): Promise<SpeedAnalysisResult> {
    try {
      const response = await fetch(`${API_BASE_URL}/pagespeed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error analyzing page speed:', error);
      throw error;
    }
  },

  async analyzeOnPage(url: string): Promise<OnPageAnalysisResult> {
    try {
      const response = await fetch(`${API_BASE_URL}/onpage-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error analyzing on-page SEO:', error);
      throw error;
    }
  },

  async analyzeTechnicalSEO(url: string): Promise<TechnicalSEOResult> {
    try {
      const response = await fetch(`${API_BASE_URL}/technical-seo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error analyzing technical SEO:', error);
      throw error;
    }
  }
};