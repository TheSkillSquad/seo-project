import React, { useState } from 'react';
import { X, Globe, Search, AlertCircle } from 'lucide-react';

interface AnalyzeURLModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalyze: (url: string) => void;
}

export function AnalyzeURLModal({ isOpen, onClose, onAnalyze }: AnalyzeURLModalProps) {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const validateUrl = (inputUrl: string): boolean => {
    try {
      const urlObj = new URL(inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a URL to analyze');
      return;
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid URL (e.g., example.com or https://example.com)');
      return;
    }

    setIsAnalyzing(true);

    // Simulate analysis delay
    setTimeout(() => {
      const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;
      onAnalyze(normalizedUrl);
      setIsAnalyzing(false);
      setUrl('');
      onClose();
    }, 2000);
  };

  const handleQuickAnalyze = (quickUrl: string) => {
    setUrl(quickUrl);
  };

  const quickUrls = [
    'example.com',
    'google.com',
    'github.com',
    'stackoverflow.com'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Globe className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Analyze Website</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isAnalyzing}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website URL
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL (e.g., example.com)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isAnalyzing}
              />
            </div>
            {error && (
              <div className="mt-2 flex items-center space-x-2 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quick Examples
            </label>
            <div className="grid grid-cols-2 gap-2">
              {quickUrls.map((quickUrl) => (
                <button
                  key={quickUrl}
                  type="button"
                  onClick={() => handleQuickAnalyze(quickUrl)}
                  className="text-left px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  disabled={isAnalyzing}
                >
                  {quickUrl}
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={isAnalyzing}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAnalyzing}
              className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span>Start Analysis</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>What we analyze:</strong> On-page SEO, technical issues, site speed, 
            keyword opportunities, and more. Analysis typically takes 30-60 seconds.
          </p>
        </div>
      </div>
    </div>
  );
}