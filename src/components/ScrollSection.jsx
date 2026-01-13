import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImageBlock from './ImageBlock';
import TextOverlay from './TextOverlay';

/**
 * ScrollSection Component
 * 
 * A fullscreen section that reveals content on scroll.
 * Uses Intersection Observer for performance-optimized visibility detection.
 * 
 * Section types:
 * - opening: Text only, gradient background
 * - photo: Image with text overlay
 * - closing: Text only, fade to stillness
 * 
 * Music plays globally via GlobalAudio component.
 */
function ScrollSection({ section, index, totalSections }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  // Intersection Observer for scroll-based reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);
        
        // Track if section has ever been visible (for animation state)
        if (visible && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
      },
      {
        // Trigger when 40% of section is visible
        threshold: 0.4,
        // Start observing slightly before entering viewport
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasBeenVisible]);

  // Background styles based on section type and position
  const getBackgroundStyle = () => {
    const { type, bgColor } = section;
    
    if (bgColor) {
      return { backgroundColor: bgColor };
    }

    switch (type) {
      case 'opening':
        return {
          background: `
            radial-gradient(
              ellipse 80% 60% at 50% 50%,
              rgba(50, 46, 41, 0.4) 0%,
              rgba(26, 24, 22, 1) 100%
            )
          `,
        };
      case 'closing':
        return {
          background: `
            linear-gradient(
              180deg,
              rgba(26, 24, 22, 1) 0%,
              rgba(20, 18, 16, 1) 100%
            )
          `,
        };
      default:
        // Subtle variation for photo sections
        const warmth = index % 2 === 0 ? '42, 39, 35' : '45, 46, 40';
        return {
          background: `
            linear-gradient(
              180deg,
              rgba(26, 24, 22, 1) 0%,
              rgba(${warmth}, 0.3) 50%,
              rgba(26, 24, 22, 1) 100%
            )
          `,
        };
    }
  };

  // Render content based on section type
  const renderContent = () => {
    const { type, text, image, alt } = section;

    switch (type) {
      case 'opening':
        return (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <TextOverlay
              text={text}
              isVisible={isVisible || hasBeenVisible}
              variant="opening"
              delay={0.5}
            />
            
            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ 
                opacity: isVisible ? 0.4 : 0, 
                y: isVisible ? 0 : -10 
              }}
              transition={{ 
                duration: 1, 
                delay: 2,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="text-text-whisper/50"
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        );

      case 'photo':
        return (
          <div className="flex flex-col items-center justify-center min-h-screen gap-6 md:gap-10 py-12 md:py-20">
            <ImageBlock
              src={image}
              alt={alt}
              isVisible={isVisible || hasBeenVisible}
              containerRef={sectionRef}
            />
            <TextOverlay
              text={text}
              isVisible={isVisible || hasBeenVisible}
              variant="default"
              delay={0.3}
            />
          </div>
        );

      case 'closing':
        return (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <TextOverlay
              text={text}
              isVisible={isVisible || hasBeenVisible}
              variant="closing"
              delay={0.3}
            />
            
            {/* Subtle end indicator */}
            <motion.div
              className="absolute bottom-16 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 0.2 : 0 }}
              transition={{ duration: 1.5, delay: 2.5 }}
            >
              <div className="w-8 h-px bg-text-whisper/30" />
            </motion.div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      className="scroll-section relative overflow-hidden"
      style={getBackgroundStyle()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      aria-label={`Section ${index + 1} of ${totalSections}`}
    >
      {/* Ambient glow for depth */}
      {section.type === 'photo' && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(
                circle at 50% 40%,
                rgba(196, 167, 125, 0.03) 0%,
                transparent 60%
              )
            `,
          }}
          aria-hidden="true"
        />
      )}

      {renderContent()}
    </motion.section>
  );
}

export default ScrollSection;
