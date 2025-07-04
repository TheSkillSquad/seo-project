import React from 'react';
import { Code, Star, DollarSign, Calendar, User } from 'lucide-react';
import { SchemaMarkup } from './SchemaMarkup';

// Advanced schema generators for specific content types
export const createProductSchema = (product: {
  name: string;
  description: string;
  price: string;
  currency: string;
  availability: string;
  rating: number;
  reviewCount: number;
  brand: string;
  sku: string;
  image: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "image": product.image,
  "brand": {
    "@type": "Brand",
    "name": product.brand
  },
  "sku": product.sku,
  "offers": {
    "@type": "Offer",
    "price": product.price,
    "priceCurrency": product.currency,
    "availability": `https://schema.org/${product.availability}`,
    "url": window.location.href,
    "seller": {
      "@type": "Organization",
      "name": product.brand
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": product.rating,
    "reviewCount": product.reviewCount,
    "bestRating": "5",
    "worstRating": "1"
  }
});

export const createServiceSchema = (service: {
  name: string;
  description: string;
  provider: string;
  areaServed: string;
  serviceType: string;
  price: string;
  currency: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.name,
  "description": service.description,
  "serviceType": service.serviceType,
  "provider": {
    "@type": "Organization",
    "name": service.provider
  },
  "areaServed": service.areaServed,
  "offers": {
    "@type": "Offer",
    "price": service.price,
    "priceCurrency": service.currency
  }
});

export const createArticleSchema = (article: {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  image: string;
  publisher: string;
  wordCount: number;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.headline,
  "description": article.description,
  "image": article.image,
  "author": {
    "@type": "Person",
    "name": article.author
  },
  "publisher": {
    "@type": "Organization",
    "name": article.publisher,
    "logo": {
      "@type": "ImageObject",
      "url": "https://seoblend.com/logo.png"
    }
  },
  "datePublished": article.datePublished,
  "dateModified": article.dateModified,
  "wordCount": article.wordCount,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": window.location.href
  }
});

export const createFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const createHowToSchema = (howTo: {
  name: string;
  description: string;
  totalTime: string;
  steps: Array<{ name: string; text: string; image?: string }>;
}) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": howTo.name,
  "description": howTo.description,
  "totalTime": howTo.totalTime,
  "step": howTo.steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": step.name,
    "text": step.text,
    ...(step.image && { "image": step.image })
  }))
});

export const createReviewSchema = (review: {
  itemName: string;
  rating: number;
  reviewBody: string;
  author: string;
  datePublished: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Thing",
    "name": review.itemName
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": review.rating,
    "bestRating": "5",
    "worstRating": "1"
  },
  "reviewBody": review.reviewBody,
  "author": {
    "@type": "Person",
    "name": review.author
  },
  "datePublished": review.datePublished
});

interface SchemaManagerProps {
  schemas: Array<{
    type: string;
    name: string;
    status: 'active' | 'inactive' | 'error';
    lastUpdated: string;
    pages: number;
  }>;
}

export function SchemaManager({ schemas }: SchemaManagerProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '✓';
      case 'inactive': return '○';
      case 'error': return '✗';
      default: return '?';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Code className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Schema Markup Manager</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">{schemas.length}</div>
          <div className="text-sm text-blue-800">Total Schemas</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">
            {schemas.filter(s => s.status === 'active').length}
          </div>
          <div className="text-sm text-green-800">Active Schemas</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div className="text-2xl font-bold text-orange-600">
            {schemas.reduce((acc, s) => acc + s.pages, 0)}
          </div>
          <div className="text-sm text-orange-800">Pages with Schema</div>
        </div>
      </div>

      <div className="space-y-3">
        {schemas.map((schema, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getStatusIcon(schema.status)}</span>
                <div>
                  <h3 className="font-medium text-gray-900">{schema.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>{schema.type}</span>
                    <span>•</span>
                    <span>{schema.pages} pages</span>
                    <span>•</span>
                    <span>Updated {schema.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(schema.status)}`}>
                {schema.status}
              </span>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Edit
              </button>
              <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                Test
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Schema Recommendations</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Add Product schema to service pages for better rich snippets</li>
          <li>• Implement FAQ schema on support pages</li>
          <li>• Add HowTo schema to tutorial content</li>
          <li>• Include Review schema for testimonials</li>
        </ul>
      </div>
    </div>
  );
}

export function RichSnippetPreview() {
  const snippetTypes = [
    {
      type: 'Product',
      title: 'SEOblend - Professional SEO Analysis Tool',
      description: 'Comprehensive SEO analysis and optimization platform. Monitor performance, track keywords...',
      rating: 4.8,
      reviews: 127,
      price: 'Free',
      availability: 'Available'
    },
    {
      type: 'Article',
      title: 'Complete Guide to Technical SEO in 2024',
      description: 'Learn everything about technical SEO including Core Web Vitals, crawlability, and indexing...',
      author: 'SEO Expert',
      date: '2024-01-15',
      readTime: '12 min read'
    },
    {
      type: 'FAQ',
      title: 'SEOblend - Frequently Asked Questions',
      description: 'Find answers to common questions about SEO analysis, keyword tracking, and optimization...',
      questions: 8
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Star className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Rich Snippet Preview</h2>
      </div>

      <div className="space-y-6">
        {snippetTypes.map((snippet, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                {snippet.type}
              </span>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg text-blue-600 hover:underline cursor-pointer">
                {snippet.title}
              </h3>
              <div className="text-sm text-green-700">
                https://seoblend.com/{snippet.type.toLowerCase()}
              </div>
              <p className="text-sm text-gray-600">
                {snippet.description}
              </p>
              
              {snippet.type === 'Product' && (
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(Math.floor(snippet.rating))}
                    </div>
                    <span>{snippet.rating}</span>
                    <span className="text-gray-500">({snippet.reviews} reviews)</span>
                  </div>
                  <span className="font-medium">{snippet.price}</span>
                  <span className="text-green-600">{snippet.availability}</span>
                </div>
              )}
              
              {snippet.type === 'Article' && (
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>By {snippet.author}</span>
                  <span>{snippet.date}</span>
                  <span>{snippet.readTime}</span>
                </div>
              )}
              
              {snippet.type === 'FAQ' && (
                <div className="text-sm text-gray-500">
                  {snippet.questions} frequently asked questions
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}