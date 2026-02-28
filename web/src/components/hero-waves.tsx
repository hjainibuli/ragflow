/**
 * Bottom wave decoration for patriotic theme.
 * Reference: abstract red/gold waves from hero visuals.
 */
export function HeroWaves() {
  return (
    <div
      className="hero-waves pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[180px] overflow-hidden"
      aria-hidden
    >
      <svg
        className="absolute bottom-0 w-full"
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hero-wave-gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#490d0d" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#8b4513" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#ffd700" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#8b4513" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#490d0d" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="hero-wave-red" x1="0%" y1="1" x2="0%" y2="0">
            <stop offset="0%" stopColor="#1a0505" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#de2910" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#490d0d" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {/* Flowing wave curves from bottom */}
        <path
          d="M0 120 Q360 80 720 120 T1440 120 L1440 180 L0 180 Z"
          fill="url(#hero-wave-red)"
        />
        <path
          d="M0 140 Q240 100 480 140 T960 140 T1440 140 L1440 180 L0 180 Z"
          fill="url(#hero-wave-gold)"
          opacity="0.9"
        />
        <path
          d="M0 160 Q180 130 360 160 T720 160 T1080 160 T1440 160 L1440 180 L0 180 Z"
          fill="rgba(222, 41, 16, 0.15)"
        />
      </svg>
    </div>
  );
}
