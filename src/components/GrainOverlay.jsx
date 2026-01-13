/**
 * GrainOverlay Component
 * 
 * Creates a subtle film grain texture that overlays the entire viewport.
 * Uses CSS animation for continuous, organic movement.
 * 
 * The grain effect adds:
 * - Cinematic quality
 * - Warmth and texture
 * - Reduced "digital" feel
 */
function GrainOverlay() {
  return (
    <div 
      className="grain-overlay" 
      aria-hidden="true"
      role="presentation"
    />
  );
}

export default GrainOverlay;
