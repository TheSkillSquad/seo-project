import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SchemaMarkupProps {
  schema: object;
}

export function SchemaMarkup({ schema }: SchemaMarkupProps) {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema, null, 2)}
      </script>
    </Helmet>
  );
}

// Predefined schema generators for common use cases
export const createSoftwareApplicationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SEOblend",
  "description": "Comprehensive SEO analysis and optimization tool for websites. Monitor performance, track keywords, analyze backlinks, and get actionable insights.",
  "url": "https://seoblend.com",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://seoblend.com"
  },
  "creator": {
    "@type": "Organization",
    "name": "The Skill Squad",
    "email": "seo@theskillsquad.com"
  },
  "featureList": [
    "On-Page SEO Analysis",
    "Technical SEO Audits",
    "Site Speed Monitoring",
    "Backlink Analysis",
    "Keyword Tracking",
    "SEO Reporting"
  ],
  "screenshot": "https://seoblend.com/screenshot.jpg",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  }
});

export const createBreadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const createWebPageSchema = (title: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": title,
  "description": description,
  "url": url,
  "isPartOf": {
    "@type": "WebSite",
    "name": "SEOblend",
    "url": "https://seoblend.com"
  },
  "about": {
    "@type": "Thing",
    "name": "SEO Analysis and Optimization"
  },
  "mainEntity": {
    "@type": "SoftwareApplication",
    "name": "SEOblend"
  }
});