import { useContext } from 'react';
import { motion } from 'framer-motion';
import { AudioContext } from '../App';

/**
 * AudioToggle Component
 * 
 * Global audio mute/unmute toggle button.
 * Positioned in bottom-right corner.
 */
function AudioToggle() {
  const { isMuted, toggleMute } = useContext(AudioContext);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1, ease: [0.4, 0, 0.2, 1] }}
      onClick={toggleMute}
      className="audio-toggle group"
      aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
      title={isMuted ? 'Play music' : 'Mute'}
    >
      {/* Sound icon */}
      <motion.svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-300 group-hover:scale-110"
      >
        {/* Speaker base */}
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        
        {/* Sound waves - animated based on state */}
        <motion.path
          d="M15.54 8.46a5 5 0 0 1 0 7.07"
          initial={false}
          animate={{ 
            opacity: !isMuted ? 1 : 0.3,
            pathLength: !isMuted ? 1 : 0.5
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.path
          d="M19.07 4.93a10 10 0 0 1 0 14.14"
          initial={false}
          animate={{ 
            opacity: !isMuted ? 1 : 0.2,
            pathLength: !isMuted ? 1 : 0.3
          }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Mute line */}
        <motion.line
          x1="1"
          y1="1"
          x2="23"
          y2="23"
          initial={false}
          animate={{ 
            opacity: isMuted ? 0.8 : 0,
            pathLength: isMuted ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.svg>
      
      {/* Pulse animation when unmuted */}
      {!isMuted && (
        <motion.div
          className="absolute inset-0 rounded-full border border-accent-amber/30"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: 'easeOut'
          }}
        />
      )}
    </motion.button>
  );
}

export default AudioToggle;
