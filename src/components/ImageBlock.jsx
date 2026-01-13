import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { animationConfig } from '../config/content';

/**
 * ImageBlock Component
 * 
 * Displays a photograph with cinematic treatment:
 * - Lazy loading for performance
 * - Parallax effect on scroll
 * - Subtle scale animation on reveal
 * - DIFFUSED edges that blend into background
 * - CURVED/organic corners
 * - Maintains FULL aspect ratio (no cropping!)
 */
function ImageBlock({ src, alt, isVisible, containerRef }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageAspect, setImageAspect] = useState(null);
  const imgRef = useRef(null);

  // Parallax effect using scroll position
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to parallax movement (subtle for portraits)
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    [`${animationConfig.parallaxStrength * 50}%`, `-${animationConfig.parallaxStrength * 50}%`]
  );

  // Image reveal animation
  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: animationConfig.imageScale,
      filter: 'blur(12px)',
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: animationConfig.imageDuration,
        ease: animationConfig.easing.emotional,
      }
    }
  };

  // Handle image load - detect aspect ratio
  const handleLoad = (e) => {
    const img = e.target;
    const aspect = img.naturalWidth / img.naturalHeight;
    setImageAspect(aspect);
    setIsLoaded(true);
  };

  // Handle image error - show placeholder
  const handleError = () => {
    setHasError(true);
  };

  // Determine if portrait (taller than wide)
  const isPortrait = imageAspect && imageAspect < 1;

  return (
    <div className="relative w-full flex items-center justify-center px-4 md:px-8">
      {/* Image container - adapts to image orientation */}
      <motion.div
        className="relative"
        style={{ y }}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={imageVariants}
      >
        {hasError ? (
          // Error/placeholder state
          <div 
            className="bg-bg-charcoal/50 flex items-center justify-center backdrop-blur-sm"
            style={{ 
              width: '300px', 
              height: '400px',
              borderRadius: '24px',
            }}
          >
            <div className="text-center text-text-whisper">
              <svg 
                className="w-12 h-12 mx-auto mb-3 opacity-40"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="1"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-xs tracking-widest uppercase opacity-60">Image not found</p>
            </div>
          </div>
        ) : (
          <div className="relative group">
            {/* Loading skeleton - shows while image loads */}
            {!isLoaded && (
              <div 
                className="bg-bg-charcoal/30 animate-pulse"
                style={{ 
                  width: '320px', 
                  height: '480px',
                  borderRadius: '28px',
                }}
              />
            )}
            
            {/* Outer glow/diffusion layer - creates the blend effect */}
            {isLoaded && (
              <div 
                className="absolute -inset-8 md:-inset-12 pointer-events-none"
                style={{
                  background: `
                    radial-gradient(
                      ellipse at center,
                      rgba(26, 24, 22, 0) 30%,
                      rgba(26, 24, 22, 0.4) 60%,
                      rgba(26, 24, 22, 0.8) 80%,
                      rgba(26, 24, 22, 1) 100%
                    )
                  `,
                  zIndex: 10,
                }}
                aria-hidden="true"
              />
            )}

            {/* Image wrapper with mask for feathered edges */}
            <div 
              className="relative overflow-hidden"
              style={{
                borderRadius: isPortrait ? '28px' : '20px',
                // CSS mask for soft feathered edges
                WebkitMaskImage: `
                  radial-gradient(
                    ellipse 85% 85% at center,
                    black 60%,
                    rgba(0,0,0,0.8) 75%,
                    rgba(0,0,0,0.4) 88%,
                    transparent 100%
                  )
                `,
                maskImage: `
                  radial-gradient(
                    ellipse 85% 85% at center,
                    black 60%,
                    rgba(0,0,0,0.8) 75%,
                    rgba(0,0,0,0.4) 88%,
                    transparent 100%
                  )
                `,
              }}
            >
              {/* Actual image - displayed at natural aspect ratio */}
              <motion.img
                ref={imgRef}
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={handleLoad}
                onError={handleError}
                className={`
                  block
                  transition-all duration-700 ease-emotional
                  ${isLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'}
                `}
                style={{
                  // Portrait photos: max height of 72vh, landscape: max width
                  maxHeight: isPortrait ? '72vh' : '60vh',
                  maxWidth: isPortrait ? '85vw' : 'min(85vw, 850px)',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  // Subtle cinematic filter
                  filter: 'contrast(0.97) saturate(0.92)',
                  borderRadius: isPortrait ? '28px' : '20px',
                }}
              />

              {/* Inner vignette for depth */}
              {isLoaded && (
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    borderRadius: isPortrait ? '28px' : '20px',
                    background: `
                      radial-gradient(
                        ellipse at center,
                        transparent 50%,
                        rgba(26, 24, 22, 0.2) 85%,
                        rgba(26, 24, 22, 0.35) 100%
                      )
                    `,
                  }}
                  aria-hidden="true"
                />
              )}

              {/* Subtle grain texture */}
              {isLoaded && (
                <div 
                  className="absolute inset-0 pointer-events-none opacity-[0.025]"
                  style={{
                    borderRadius: isPortrait ? '28px' : '20px',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Ambient glow behind image */}
            {isLoaded && (
              <div 
                className="absolute inset-0 -z-10"
                style={{
                  borderRadius: isPortrait ? '32px' : '24px',
                  background: `
                    radial-gradient(
                      ellipse at center,
                      rgba(196, 167, 125, 0.08) 0%,
                      rgba(196, 133, 125, 0.04) 40%,
                      transparent 70%
                    )
                  `,
                  transform: 'scale(1.15)',
                  filter: 'blur(30px)',
                }}
                aria-hidden="true"
              />
            )}

            {/* Soft shadow for depth */}
            {isLoaded && (
              <div 
                className="absolute inset-0 -z-20"
                style={{
                  borderRadius: isPortrait ? '32px' : '24px',
                  boxShadow: `
                    0 30px 60px -15px rgba(0, 0, 0, 0.4),
                    0 15px 30px -10px rgba(0, 0, 0, 0.3)
                  `,
                  transform: 'scale(0.95) translateY(8px)',
                }}
                aria-hidden="true"
              />
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default ImageBlock;
