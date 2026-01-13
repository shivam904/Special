import { useEffect } from 'react';
import Lenis from 'lenis';
import { sections } from './config/content';
import ScrollSection from './components/ScrollSection';
import GrainOverlay from './components/GrainOverlay';
import GlobalAudio from './components/GlobalAudio';

/**
 * Main App Component
 * 
 * Orchestrates the emotional scroll experience with:
 * - Lenis smooth scrolling for buttery transitions
 * - Grain overlay for cinematic texture
 * - Auto-playing background music (after first interaction)
 * - Dynamic scroll sections from config
 */
function App() {
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
    <main className="relative">
      {/* Background music - auto-plays after user interaction */}
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
  );
}

export default App;
