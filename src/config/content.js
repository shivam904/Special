/**
 * Content Configuration
 * =====================
 * Edit this file to customize photos and text for each section.
 * 
 * Each section requires:
 * - id: Unique identifier
 * - type: 'opening' | 'photo' | 'closing'
 * - text: The honest thought to display (can be multiline with \n)
 * - image: Path to the image (for 'photo' type sections)
 * - alt: Accessible description of the image
 * - music: Path to music file (uses music.mp3 for all sections)
 * 
 * Images should be placed in the /public/images/ folder
 */

export const siteConfig = {
  // Site metadata
  title: "When I Think of You",
  description: "A quiet moment of honesty",
  
  // Global audio configuration
  audio: {
    enabled: true,
    src: "/audio/music.mp3",
    volume: 0.5,
  },
};

export const sections = [
  {
    id: "opening",
    type: "opening",
    text: "When I think of you…",
    music: "/audio/music.mp3",
  },
  {
    id: "memory-1",
    type: "photo",
    text: "That smile with the sunlight?\nI forgot how to think for a second.",
    image: "/images/attachments/p-1.1.jpg",
    alt: "A warm smile in golden sunlight",
    music: "/audio/music.mp3",
  },
  {
    id: "memory-2", 
    type: "photo",
    text: "Some people glow without trying.\nYou just exist and it's unfair.",
    image: "/images/attachments/p-1.jpg",
    alt: "A gentle moment in soft light",
    music: "/audio/music.mp3",
  },
  
  {
    id: "memory-4",
    type: "photo",
    text: "Mountains, flowers, and you.\nNature really said 'let me set the scene.'",
    image: "/images/attachments/p-3.jpg",
    alt: "Traditional elegance with mountain backdrop",
    music: "/audio/music.mp3",
  },
  {
    id: "memory-5",
    type: "photo",
    text: "Black dress energy?\nMain kuch bolunga bhi nahi, bus respect.",
    image: "/images/attachments/p-4.jpg",
    alt: "Elegant mirror moment",
    music: "/audio/music.mp3",
  },
  {
    id: "memory-6",
    type: "photo",
    text: "Casual fit, confident vibe.\nYou make 'normal' look like a mood.",
    image: "/images/attachments/p-5.jpg",
    alt: "Effortless casual style",
    music: "/audio/music.mp3",
  },
  {
    id: "memory-7",
    type: "photo",
    text: "The jhumkas, the embroidery, the grace.\nKuch traditional hits different.",
    image: "/images/attachments/p-10.jpg",
    alt: "Beautiful in traditional attire",
    music: "/audio/music.mp3",
  },
  {
    id: "memory-8",
    type: "photo",
    text: "Cozy sweater, warm light, soft eyes.\nThis photo feels like a warm chai on a cold day.",
    image: "/images/attachments/1000147648.jpg",
    alt: "A cozy, intimate moment",
    music: "/audio/music.mp3",
  },
  {
    id: "closing",
    type: "closing",
    text: "This is not a promise.\nJust someone who notices\nthe little things about you.",
    music: "/audio/music.mp3",
  },
];

/**
 * Animation Configuration
 * Adjust timing and easing for different feels
 */
export const animationConfig = {
  // How long images take to fade in (seconds)
  imageDuration: 1.2,
  
  // How long text takes to appear (seconds)
  textDuration: 0.8,
  
  // Delay before text appears after image (seconds)
  textDelay: 0.4,
  
  // Parallax strength (0 = none, 1 = strong)
  parallaxStrength: 0.1,
  
  // Image scale on reveal (1 = no scale, 1.05 = slight zoom)
  imageScale: 1.02,
  
  // Easing curves
  easing: {
    // Smooth, emotional easing
    emotional: [0.4, 0.0, 0.2, 1],
    // Gentle settle
    settle: [0.33, 1, 0.68, 1],
    // Soft breathe
    breathe: [0.25, 0.1, 0.25, 1],
  },
};
