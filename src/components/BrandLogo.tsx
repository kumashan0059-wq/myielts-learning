import React from 'react';

export interface BrandLogoProps {
  variant?: 'light' | 'dark'; // light: on white bg; dark: on black/dark bg
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  layout?: 'horizontal' | 'stacked' | 'emblem-only';
  showTagline?: boolean;
  className?: string;
  id?: string;
}

/**
 * Official MY IELTS Brand Emblem Vector
 * Accurately replicates the official logo:
 * - 3D Ribbon "M" with vibrant red left & right arches and sleek glossy black center crossover
 * - Delicate silver latitude/longitude globe behind
 * - Sweeping red dynamic contrail swooshing out of the ribbon
 * - Ascending red passenger jet airplane at the contrail tip
 */
export const BrandEmblem: React.FC<{
  className?: string;
  isDark?: boolean;
}> = ({ className = 'w-10 h-10', isDark = false }) => {
  const uid = React.useId().replace(/:/g, '');

  return (
    <svg
      viewBox="0 0 500 340"
      className={`flex-shrink-0 select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="MY IELTS Emblem"
    >
      <defs>
        {/* Left Red Ribbon Outer Gradient */}
        <linearGradient id={`redRibbonLeft-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF334B" />
          <stop offset="25%" stopColor="#E11D2A" />
          <stop offset="70%" stopColor="#B91420" />
          <stop offset="100%" stopColor="#7A0510" />
        </linearGradient>

        {/* Right Red Ribbon Gradient */}
        <linearGradient id={`redRibbonRight-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF4055" />
          <stop offset="35%" stopColor="#E11D2A" />
          <stop offset="75%" stopColor="#BA121E" />
          <stop offset="100%" stopColor="#66020B" />
        </linearGradient>

        {/* Center Glossy Black Ribbon */}
        <linearGradient id={`blackRibbon-${uid}`} x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor={isDark ? '#4B5563' : '#374151'} />
          <stop offset="25%" stopColor={isDark ? '#2D3748' : '#1F242D'} />
          <stop offset="60%" stopColor="#111115" />
          <stop offset="100%" stopColor="#050507" />
        </linearGradient>

        {/* Red Ribbon Underside / Inner Shadow */}
        <linearGradient id={`redUnder-${uid}`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#55030A" />
          <stop offset="60%" stopColor="#880A15" />
          <stop offset="100%" stopColor="#B91420" />
        </linearGradient>

        {/* Glossy White Sheen Highlights */}
        <linearGradient id={`whiteSheen-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        <linearGradient id={`blackSheen-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        <filter id={`ribbonShadow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="6"
            floodColor={isDark ? '#E11D2A' : '#000000'}
            floodOpacity={isDark ? '0.2' : '0.22'}
          />
        </filter>
      </defs>

      {/* 1. BACKGROUND GLOBE WIREFRAME */}
      <g
        stroke={isDark ? '#475569' : '#CBD5E1'}
        strokeWidth="2.2"
        fill="none"
        opacity={isDark ? '0.7' : '0.9'}
      >
        <circle cx="250" cy="180" r="108" />
        <ellipse cx="250" cy="180" rx="42" ry="108" />
        <line x1="250" y1="72" x2="250" y2="288" />
        <ellipse cx="250" cy="144" rx="98" ry="34" />
        <line x1="142" y1="180" x2="358" y2="180" />
        <ellipse cx="250" cy="216" rx="98" ry="34" />
      </g>

      {/* 2. AIRPLANE CONTRAIL & FLYING JET */}
      <g id="airplane-contrail">
        <path
          d="M 115 215 C 80 225 70 255 98 270 C 135 285 210 275 255 250 C 310 220 375 160 415 125"
          fill="none"
          stroke="#E11D2A"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M 85 235 C 72 252 82 272 112 278 C 158 282 225 264 270 238"
          fill="none"
          stroke="#FF6B7A"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Flying Red Passenger Airplane */}
        <g transform="translate(425, 115) rotate(35)">
          <path
            d="M 0 -22 C 2 -22 4 -15 4 -5 L 4 4 L 20 11 L 20 15 L 4 11 L 4 20 L 10 24 L 10 27 L 0 25 L -10 27 L -10 24 L -4 20 L -4 11 L -20 15 L -20 11 L -4 4 L -4 -5 C -4 -15 -2 -22 0 -22 Z"
            fill="#E11D2A"
            stroke="#9F1239"
            strokeWidth="0.8"
          />
        </g>
      </g>

      {/* 3. 3D METALLIC RIBBON "M" */}
      <g filter={`url(#ribbonShadow-${uid})`}>
        {/* Underside Shadows */}
        <path
          d="M 160 270 C 135 270 105 272 88 288 C 110 280 145 274 175 268 Z"
          fill={`url(#redUnder-${uid})`}
        />
        <path
          d="M 218 135 C 190 140 162 170 138 215 C 120 248 102 278 88 288 C 105 292 128 290 152 272 C 180 248 205 195 225 152 Z"
          fill={`url(#redUnder-${uid})`}
          opacity="0.8"
        />

        {/* Left Red Ribbon Arch */}
        <path
          d="M 88 288 C 115 288 138 268 160 230 C 185 185 208 132 238 132 C 255 132 258 145 248 168 C 235 198 200 255 178 288 C 150 292 118 293 88 288 Z"
          fill={`url(#redRibbonLeft-${uid})`}
        />

        {/* Left Arch White Sheen */}
        <path
          d="M 168 215 C 190 170 210 135 236 135 C 248 135 252 142 245 158 C 232 186 200 235 178 275 C 172 255 168 235 168 215 Z"
          fill={`url(#whiteSheen-${uid})`}
          opacity="0.55"
        />

        {/* Right Red Ribbon Leg */}
        <path
          d="M 285 175 C 300 145 320 132 342 132 C 372 132 388 185 408 238 C 420 268 435 285 452 288 C 422 292 395 288 375 260 C 352 230 338 178 325 152 C 315 150 298 165 285 175 Z"
          fill={`url(#redRibbonRight-${uid})`}
        />

        {/* Right Arch White Sheen */}
        <path
          d="M 330 136 C 355 136 375 175 392 222 C 405 255 418 275 435 284 C 418 284 398 275 382 252 C 362 218 348 170 330 136 Z"
          fill={`url(#whiteSheen-${uid})`}
          opacity="0.4"
        />

        {/* Center Glossy Black Ribbon Twist */}
        <path
          d="M 235 132 C 255 132 272 152 268 185 C 262 228 235 272 235 278 C 240 285 260 285 280 265 C 305 240 325 188 335 140 C 322 135 305 132 290 132 C 280 152 265 195 252 225 C 255 185 252 150 235 132 Z"
          fill={`url(#blackRibbon-${uid})`}
        />

        <path
          d="M 245 142 C 262 145 270 165 265 198 C 258 235 238 275 242 278 C 252 278 272 260 292 235 C 315 205 328 165 334 142 C 322 138 310 136 298 136 C 285 160 270 205 256 230 C 260 195 258 162 245 142 Z"
          fill={isDark ? '#222834' : '#1A1A1E'}
        />

        {/* Sharp Gloss Glare on Center Fold */}
        <path
          d="M 252 148 C 260 152 265 168 262 188 C 258 215 246 248 248 252 C 252 248 268 230 282 210 C 275 198 265 170 252 148 Z"
          fill={`url(#blackSheen-${uid})`}
          opacity="0.8"
        />

        <path
          d="M 230 268 C 235 278 242 284 252 284 C 268 284 285 265 300 248 C 290 262 275 276 260 278 C 248 278 240 274 235 265 Z"
          fill="#0B0B0E"
        />
      </g>
    </svg>
  );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  size = 'md',
  layout = 'horizontal',
  showTagline = false,
  className = '',
  id,
}) => {
  const isDark = variant === 'dark';

  // Size mapping for emblem & typography
  const sizeMap = {
    sm: {
      emblem: 'w-8 h-8',
      myText: 'text-xl',
      ieltsText: 'text-xl',
      taglineText: 'text-[9px]',
      dividerWidth: 'w-24',
      gap: 'gap-2',
      stackedEmblem: 'w-16 h-14',
    },
    md: {
      emblem: 'w-10 h-10',
      myText: 'text-2xl',
      ieltsText: 'text-2xl',
      taglineText: 'text-[10px]',
      dividerWidth: 'w-32',
      gap: 'gap-3',
      stackedEmblem: 'w-24 h-20',
    },
    lg: {
      emblem: 'w-14 h-14',
      myText: 'text-3xl',
      ieltsText: 'text-3xl',
      taglineText: 'text-xs',
      dividerWidth: 'w-44',
      gap: 'gap-3.5',
      stackedEmblem: 'w-32 h-26',
    },
    xl: {
      emblem: 'w-16 h-16',
      myText: 'text-4xl',
      ieltsText: 'text-4xl',
      taglineText: 'text-sm',
      dividerWidth: 'w-52',
      gap: 'gap-4',
      stackedEmblem: 'w-40 h-32',
    },
    hero: {
      emblem: 'w-16 h-16 sm:w-20 sm:h-20',
      myText: 'text-3xl sm:text-4xl lg:text-5xl',
      ieltsText: 'text-3xl sm:text-4xl lg:text-5xl',
      taglineText: 'text-xs sm:text-sm tracking-widest',
      dividerWidth: 'w-48 sm:w-64',
      gap: 'gap-4',
      stackedEmblem: 'w-36 h-28 sm:w-48 sm:h-36',
    },
  };

  const s = sizeMap[size];

  // 1. EMBLEM ONLY LAYOUT
  if (layout === 'emblem-only') {
    return (
      <div id={id} className={`inline-flex items-center justify-center ${className}`}>
        <BrandEmblem className={s.emblem} isDark={isDark} />
      </div>
    );
  }

  // 2. STACKED LAYOUT (Emblem on top, MY IELTS and Tagline below - exact official logo lockup)
  if (layout === 'stacked') {
    return (
      <div
        id={id}
        className={`inline-flex flex-col items-center text-center select-none ${className}`}
      >
        {/* Emblem on top */}
        <BrandEmblem className={s.stackedEmblem} isDark={isDark} />

        {/* "MY IELTS" Typography */}
        <div className="flex items-baseline justify-center font-serif font-black tracking-wider leading-none mt-1">
          <span
            className={isDark ? 'text-white' : 'text-[#111115]'}
            style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '0.04em' }}
          >
            MY
          </span>
          <span
            className="ml-2 bg-gradient-to-r from-[#E11D2A] via-[#C8102E] to-[#9F1239] bg-clip-text text-transparent font-black"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '0.06em' }}
          >
            IELTS
          </span>
        </div>

        {/* Red Divider Line with Centered Red Dot */}
        <div className={`relative flex items-center justify-center my-2 ${s.dividerWidth}`}>
          <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#E11D2A] to-transparent opacity-80" />
          <span className="absolute w-2 h-2 rounded-full bg-[#E11D2A] shadow-sm shadow-red-500/50" />
        </div>

        {/* Tagline */}
        {showTagline && (
          <span
            className={`font-sans font-semibold uppercase tracking-[0.2em] ${
              isDark ? 'text-neutral-300' : 'text-neutral-800'
            } ${s.taglineText}`}
          >
            Prepare Smart. Go Global.
          </span>
        )}
      </div>
    );
  }

  // 3. HORIZONTAL LAYOUT (Emblem on left, Typography & Tagline on right - ideal for Navbar/Header)
  return (
    <div
      id={id}
      className={`inline-flex items-center ${s.gap} select-none group ${className}`}
    >
      {/* Official 3D Ribbon Emblem with Globe & Plane */}
      <BrandEmblem className={s.emblem} isDark={isDark} />

      {/* Brand Typography & Tagline */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-baseline font-serif font-black tracking-wider">
          <span
            className={`${s.myText} transition-colors duration-200 ${
              isDark ? 'text-white' : 'text-[#111115]'
            }`}
            style={{
              fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
              letterSpacing: '0.03em',
            }}
          >
            MY
          </span>
          <span
            className={`${s.ieltsText} ml-1.5 font-black bg-gradient-to-r from-[#E11D2A] via-[#D71920] to-[#A00C1B] bg-clip-text text-transparent`}
            style={{
              fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
              letterSpacing: '0.05em',
            }}
          >
            IELTS
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className={`font-sans font-semibold tracking-[0.14em] uppercase whitespace-nowrap ${
                isDark ? 'text-neutral-400' : 'text-neutral-600'
              } ${s.taglineText}`}
            >
              Prepare Smart. Go Global.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
export default BrandLogo;
