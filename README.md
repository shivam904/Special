# When I Think of You

An emotionally immersive, single-scroll storytelling website built with React, Framer Motion, and Lenis smooth scrolling.

## ✨ Features

- **Cinematic Scroll Experience**: Fullscreen sections with smooth, deliberate transitions
- **Emotional Design**: Custom color palette with warm undertones and film grain effects
- **Framer Motion Animations**: Subtle parallax, fade-ins, and scale effects
- **Lenis Smooth Scrolling**: Buttery smooth scroll behavior
- **Ambient Audio**: Optional background music with mute toggle
- **Mobile-First**: Responsive design that works beautifully on all devices
- **Easy Customization**: Simple config file for photos and text

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 📸 Adding Your Content

### 1. Add Your Photos

Place your photos in `/public/images/`:
- `photo-1.jpg`
- `photo-2.jpg`
- `photo-3.jpg`

**Recommendations:**
- High resolution (1920px width minimum)
- 3:2 or 16:9 aspect ratio
- Emotionally meaningful photographs

### 2. Add Ambient Audio (Optional)

Place your audio file in `/public/audio/`:
- `ambient.mp3`

**Recommendations:**
- Soft piano or atmospheric pad
- Loopable (seamless)
- 128-256kbps MP3

### 3. Customize Content

Edit `/src/config/content.js`:

```javascript
export const sections = [
  {
    id: "opening",
    type: "opening",
    text: "When I think of you…",
  },
  {
    id: "memory-1",
    type: "photo",
    text: "Your honest thought here.",
    image: "/images/photo-1.jpg",
    alt: "Description of the photo",
  },
  // Add more sections...
];
```

## 🎨 Customization

### Colors

The color palette is defined in `tailwind.config.js`:

```javascript
colors: {
  bg: {
    deep: '#1a1816',      // Deep smoky brown-black
    charcoal: '#2a2723',  // Muted charcoal
    olive: '#2d2e28',     // Deep olive-gray
    warm: '#322e29',      // Smoky brown
  },
  text: {
    ivory: '#f5f0e8',     // Soft ivory
    sand: '#d4c8b8',      // Desaturated sand
    muted: '#a89b8a',     // Muted warm gray
  },
  accent: {
    rose: '#c4a5a0',      // Dusty rose
    amber: '#c4a77d',     // Burnt amber
    copper: '#b8977a',    // Aged copper
  }
}
```

### Animation Timing

Adjust animation settings in `/src/config/content.js`:

```javascript
export const animationConfig = {
  imageDuration: 1.2,      // Image fade-in duration
  textDuration: 0.8,       // Text animation duration
  textDelay: 0.4,          // Delay before text appears
  parallaxStrength: 0.15,  // Parallax effect intensity
  imageScale: 1.05,        // Image scale on reveal
};
```

## 📁 Project Structure

```
├── public/
│   ├── images/          # Your photos go here
│   └── audio/           # Ambient audio goes here
├── src/
│   ├── components/
│   │   ├── AudioPlayer.jsx     # Ambient audio with mute toggle
│   │   ├── GrainOverlay.jsx    # Film grain effect
│   │   ├── ImageBlock.jsx      # Photo with parallax
│   │   ├── ScrollSection.jsx   # Fullscreen section
│   │   └── TextOverlay.jsx     # Animated text
│   ├── config/
│   │   └── content.js          # ⭐ Edit this for content
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js          # Custom theme
└── package.json
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy automatically

### Netlify

```bash
npm run build
# Deploy the 'dist' folder
```

## 🎵 Audio Credits

If you need royalty-free ambient music:
- [Epidemic Sound](https://www.epidemicsound.com)
- [Artlist](https://artlist.io)
- [Free Music Archive](https://freemusicarchive.org)

## 📝 License

This is a personal project. Feel free to use this as a template for your own emotional storytelling.

---

*Built with quiet sincerity.*
# Special
