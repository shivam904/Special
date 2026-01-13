import { motion } from 'framer-motion';
import { animationConfig } from '../config/content';

/**
 * TextOverlay Component
 * 
 * Displays the honest thought for each section.
 * Features:
 * - Smooth fade and slide animations
 * - Support for multiline text
 * - Serif typography for emotional impact
 * - Responsive sizing
 */
function TextOverlay({ text, isVisible, delay = 0, variant = 'default' }) {
  // Parse multiline text
  const lines = text.split('\n');
  
  // Animation variants based on section type
  const variants = {
    opening: {
      hidden: { 
        opacity: 0, 
        y: 30,
        filter: 'blur(4px)'
      },
      visible: { 
        opacity: 1, 
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: animationConfig.textDuration * 1.5,
          ease: animationConfig.easing.emotional,
          delay: delay + 0.5,
        }
      }
    },
    default: {
      hidden: { 
        opacity: 0, 
        y: 20,
      },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: animationConfig.textDuration,
          ease: animationConfig.easing.settle,
          delay: delay + animationConfig.textDelay,
        }
      }
    },
    closing: {
      hidden: { 
        opacity: 0, 
        scale: 0.98,
        filter: 'blur(2px)'
      },
      visible: { 
        opacity: 1, 
        scale: 1,
        filter: 'blur(0px)',
        transition: {
          duration: animationConfig.textDuration * 1.8,
          ease: animationConfig.easing.breathe,
          delay: delay + 0.8,
        }
      }
    }
  };

  const selectedVariant = variants[variant] || variants.default;

  // Style classes based on variant
  const textClasses = {
    opening: 'text-hero text-text-ivory text-center font-light tracking-story',
    default: 'text-statement text-text-sand text-center font-light tracking-wide',
    closing: 'text-whisper text-text-ivory/90 text-center font-light tracking-breathe leading-poem',
  };

  return (
    <motion.div
      className={`max-w-3xl mx-auto px-4 ${variant === 'closing' ? 'py-8' : ''}`}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={selectedVariant}
    >
      {lines.map((line, index) => (
        <motion.p
          key={index}
          className={`${textClasses[variant] || textClasses.default} text-glow`}
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            duration: animationConfig.textDuration,
            ease: animationConfig.easing.settle,
            delay: delay + animationConfig.textDelay + (index * 0.3),
          }}
        >
          {line}
        </motion.p>
      ))}
    </motion.div>
  );
}

export default TextOverlay;
