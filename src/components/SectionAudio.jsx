import { useEffect, useRef } from 'react';

/**
 * SectionAudio Component
 * 
 * Handles section-specific audio that plays automatically when visible.
 * Features:
 * - Fades in when section becomes visible
 * - Fades out when leaving section
 * - Loops during section visibility
 * - Auto-plays (no mute option)
 */
function SectionAudio({ src, isVisible, volume = 0.3, isAudioEnabled }) {
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current || !src || !isAudioEnabled) return;

    const audio = audioRef.current;

    const fadeIn = () => {
      clearInterval(fadeIntervalRef.current);
      audio.volume = 0;
      
      audio.play().catch((err) => {
        console.log('Audio play prevented:', err.message);
      });
      
      fadeIntervalRef.current = setInterval(() => {
        if (audio.volume < volume - 0.02) {
          audio.volume = Math.min(volume, audio.volume + 0.02);
        } else {
          audio.volume = volume;
          clearInterval(fadeIntervalRef.current);
        }
      }, 50);
    };

    const fadeOut = () => {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = setInterval(() => {
        if (audio.volume > 0.02) {
          audio.volume = Math.max(0, audio.volume - 0.02);
        } else {
          audio.volume = 0;
          audio.pause();
          audio.currentTime = 0;
          clearInterval(fadeIntervalRef.current);
        }
      }, 30);
    };

    if (isVisible) {
      fadeIn();
    } else {
      fadeOut();
    }

    return () => {
      clearInterval(fadeIntervalRef.current);
    };
  }, [isVisible, isAudioEnabled, volume, src]);

  if (!src) return null;

  return (
    <audio
      ref={audioRef}
      src={src}
      loop
      preload="auto"
    />
  );
}

export default SectionAudio;
