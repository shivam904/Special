import { useEffect, useState, createContext } from 'react';
import Lenis from 'lenis';
import { sections } from './config/content';
import ScrollSection from './components/ScrollSection';
import GrainOverlay from './components/GrainOverlay';
import GlobalAudio from './components/GlobalAudio';

// Create context for audio state (always playing after interaction)
export const AudioContext = createContext({
  isAudioEnabled: false,
});

/**
 * Main App Component
 * 
 * Orchestrates the emotional scroll experience with:
 * - Lenis smooth scrolling for buttery transitions
 * - Grain overlay for cinematic texture
 * - Auto-playing background music
 * - Dynamic scroll sections from config
 */
function App() {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  // Enable audio after first user interaction (browser requirement)
  useEffect(() => {
    const enableAudio = () => {
      setIsAudioEnabled(true);
      // Remove listeners after first interaction
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('scroll', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
      document.removeEventListener('keydown', enableAudio);
    };

    document.addEventListener('click', enableAudio);
    document.addEventListener('scroll', enableAudio);
    document.addEventListener('touchstart', enableAudio);
    document.addEventListener('keydown', enableAudio);

    return () => {
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('scroll', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
      document.removeEventListener('keydown', enableAudio);
    };
  }, []);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      // Smooth, deliberate scrolling
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Animation frame loop for Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <AudioContext.Provider value={{ isAudioEnabled }}>
      <main className="relative">
        {/* Background music - plays continuously */}
        <GlobalAudio />
        
        {/* Cinematic grain overlay */}
        <GrainOverlay />
        
        {/* Vignette effect */}
        <div className="vignette" aria-hidden="true" />
        
        {/* Scroll sections */}
        <div className="scroll-container">
          {sections.map((section, index) => (
            <ScrollSection
              key={section.id}
              section={section}
              index={index}
              totalSections={sections.length}
            />
          ))}
        </div>
      </main>
    </AudioContext.Provider>
  );
}

export default App;
