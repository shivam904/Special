import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../config/content';

/**
 * GlobalAudio Component
 * 
 * Single audio player that plays continuously throughout the site.
 * - Waits for user interaction (browser autoplay policy)
 * - Plays immediately on click/touch/scroll
 * - Loops continuously
 * - No mute button
 */
function GlobalAudio() {
  const audioRef = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set volume
    audio.volume = siteConfig.audio.volume;

    // Function to play audio
    const playAudio = () => {
      if (hasPlayed) return;
      
      // Try to play
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setHasPlayed(true);
            removeListeners();
          })
          .catch((error) => {
            // Autoplay was prevented, wait for user interaction
            console.log('Waiting for interaction to play audio...');
          });
      }
    };

    // Remove all listeners
    const removeListeners = () => {
      document.removeEventListener('click', playAudio, true);
      document.removeEventListener('touchstart', playAudio, true);
      document.removeEventListener('touchend', playAudio, true);
      document.removeEventListener('scroll', playAudio, true);
      document.removeEventListener('keydown', playAudio, true);
      document.removeEventListener('mousedown', playAudio, true);
    };

    // Add listeners with capture phase for reliability
    document.addEventListener('click', playAudio, true);
    document.addEventListener('touchstart', playAudio, true);
    document.addEventListener('touchend', playAudio, true);
    document.addEventListener('scroll', playAudio, true);
    document.addEventListener('keydown', playAudio, true);
    document.addEventListener('mousedown', playAudio, true);

    // Try playing immediately (in case user already interacted)
    playAudio();

    return () => {
      removeListeners();
    };
  }, [hasPlayed]);

  return (
    <audio
      ref={audioRef}
      src={siteConfig.audio.src}
      loop
      preload="auto"
      playsInline
    />
  );
}

export default GlobalAudio;
