import { useEffect, useRef, useContext } from 'react';
import { AudioContext } from '../App';
import { siteConfig } from '../config/content';

/**
 * GlobalAudio Component
 * 
 * Single audio player that plays continuously throughout the site.
 * - Auto-plays after first user interaction
 * - Loops continuously
 * - No mute button - always plays
 */
function GlobalAudio() {
  const audioRef = useRef(null);
  const { isAudioEnabled } = useContext(AudioContext);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!audioRef.current || !isAudioEnabled || hasStartedRef.current) return;

    const audio = audioRef.current;
    audio.volume = 0;

    // Try to play and fade in
    const playAudio = async () => {
      try {
        await audio.play();
        hasStartedRef.current = true;
        
        // Fade in
        const fadeIn = setInterval(() => {
          if (audio.volume < siteConfig.audio.volume - 0.02) {
            audio.volume = Math.min(siteConfig.audio.volume, audio.volume + 0.02);
          } else {
            audio.volume = siteConfig.audio.volume;
            clearInterval(fadeIn);
          }
        }, 50);
      } catch (err) {
        console.log('Audio autoplay prevented, will retry on next interaction');
      }
    };

    playAudio();
  }, [isAudioEnabled]);

  return (
    <audio
      ref={audioRef}
      src={siteConfig.audio.src}
      loop
      preload="auto"
    />
  );
}

export default GlobalAudio;
