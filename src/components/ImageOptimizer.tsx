import React from 'react';
import { Image, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}: OptimizedImageProps) {
  // Generate responsive image URLs (in production, this would use a CDN)
  const generateSrcSet = (baseSrc: string) => {
    const sizes = [320, 640, 768, 1024, 1280, 1920];
    return sizes.map(size => `${baseSrc}?w=${size} ${size}w`).join(', ');
  };

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      srcSet={generateSrcSet(src)}
      sizes={sizes}
      onError={(e) => {
        console.warn(`Failed to load image: ${src}`);
        e.currentTarget.style.display = 'none';
      }}
    />
  );
}

interface ImageAnalysisProps {
  images: Array<{
    src: string;
    alt: string;
    size: string;
    format: string;
    optimized: boolean;
    issues: string[];
  }>;
}

export function ImageAnalysis({ images }: ImageAnalysisProps) {
  const totalImages = images.length;
  const optimizedImages = images.filter(img => img.optimized).length;
  const missingAlt = images.filter(img => !img.alt || img.alt.trim() === '').length;
  const largeImages = images.filter(img => parseInt(img.size) > 500).length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Image className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Image Optimization Analysis</h2>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{totalImages}</div>
          <div className="text-sm text-blue-800">Total Images</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{optimizedImages}</div>
          <div className="text-sm text-green-800">Optimized</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">{missingAlt}</div>
          <div className="text-sm text-orange-800">Missing Alt Text</div>
        </div>
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{largeImages}</div>
          <div className="text-sm text-red-800">Large Files (&gt;500KB)</div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="space-y-4">
        {images.slice(0, 10).map((image, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-4">
              <img 
                src={image.src} 
                alt={image.alt || 'Image preview'} 
                className="w-16 h-16 object-cover rounded-lg"
                loading="lazy"
              />
              <div>
                <div className="font-medium text-gray-900 truncate max-w-xs">{image.src}</div>
                <div className="text-sm text-gray-600">
                  {image.format.toUpperCase()} • {image.size}
                </div>
                {image.alt ? (
                  <div className="text-xs text-green-600 flex items-center space-x-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>Alt text present</span>
                  </div>
                ) : (
                  <div className="text-xs text-red-600 flex items-center space-x-1">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Missing alt text</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {image.optimized ? (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Optimized
                </span>
              ) : (
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                  Needs Optimization
                </span>
              )}
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                <Zap className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}