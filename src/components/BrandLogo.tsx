import React from 'react';

export const OFFICIAL_LOGO_SRC = '/my-ielts-logo.png';

export interface BrandLogoProps {
  variant?: 'light' | 'dark'; // light: on light/white bg; dark: on dark/black bg
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero' | 'navbar';
  layout?: 'horizontal' | 'stacked' | 'emblem-only';
  showTagline?: boolean;
  className?: string;
  id?: string;
}

/**
 * Official MY IELTS Brand Emblem Image
 * Uses the exact updated logo asset without modification.
 */
export const BrandEmblem: React.FC<{
  className?: string;
  isDark?: boolean;
}> = ({ className = 'w-10 h-10', isDark = false }) => {
  return (
    <img
      src={OFFICIAL_LOGO_SRC}
      alt="MY IELTS - Prepare Smart. Go Global."
      width={1254}
      height={1254}
      decoding="async"
      draggable={false}
      className={`flex-shrink-0 select-none object-contain ${
        isDark ? 'rounded-lg bg-white p-0.5' : ''
      } ${className}`}
    />
  );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  size = 'md',
  className = '',
  id,
}) => {
  const isDark = variant === 'dark';

  // Compact height-based sizing preserving the exact 1:1 logo proportions
  // so the navbar, hero, CTA, and footer retain their original slim heights.
  const sizeClassMap: Record<NonNullable<BrandLogoProps['size']>, string> = {
    sm: 'h-10 sm:h-12 w-auto',
    md: 'h-12 sm:h-14 w-auto',
    navbar: 'h-12 sm:h-14 xl:h-[60px] w-auto',
    lg: 'h-20 sm:h-24 w-auto',
    xl: 'h-24 sm:h-28 w-auto',
    hero: 'h-28 sm:h-32 w-auto',
  };

  // Lightweight white surface on dark backgrounds without thick borders or heavy padding
  const darkSurfaceClass = isDark
    ? size === 'sm' || size === 'md'
      ? 'rounded-lg bg-white px-2 py-1 shadow-xs'
      : 'rounded-xl bg-white px-2.5 py-1.5 shadow-sm'
    : '';

  return (
    <div
      id={id}
      className={`inline-flex items-center justify-center select-none shrink-0 ${darkSurfaceClass} ${className}`}
    >
      <img
        src={OFFICIAL_LOGO_SRC}
        alt="MY IELTS - Prepare Smart. Go Global."
        width={1254}
        height={1254}
        decoding="async"
        draggable={false}
        className={`${sizeClassMap[size]} aspect-square object-contain block`}
      />
    </div>
  );
};

export default BrandLogo;
