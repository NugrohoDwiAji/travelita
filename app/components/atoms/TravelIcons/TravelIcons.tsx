import React from "react";

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function IconMap({ size = 20, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M9 4L3 7v13l6-3 6 3 6-3V4l-6 3-6-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 4v13M15 7v13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconMountain({ size = 20, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M3 20l6-10 4 6 3-4 5 8H3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="17" cy="6" r="2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function IconBeach({ size = 20, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M12 2C12 2 5 8 5 14a7 7 0 0014 0c0-6-7-12-7-12z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 14v6M9 20h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconSunrise({ size = 20, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M12 6V3M6.3 8.7L4.2 6.6M17.7 8.7l2.1-2.1M3 13h3m12 0h3M5 17h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 17a4 4 0 018 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconCamera({ size = 20, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="14" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 7l1.5-3h5L16 7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export function IconBus({ size = 20, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <rect x="3" y="5" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 11h18M8 18v2M16 18v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="7.5" cy="15" r="1" fill="currentColor" />
      <circle cx="16.5" cy="15" r="1" fill="currentColor" />
    </svg>
  );
}

export function IconFood({ size = 20, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M18 8h1a2 2 0 010 4h-1M2 8h16v9a2 2 0 01-2 2H4a2 2 0 01-2-2V8zM6 2v3M10 2v3M14 2v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconHotel({ size = 20, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M3 22V6a2 2 0 012-2h14a2 2 0 012 2v16" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M2 22h20M9 22v-5h6v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="7" y="8" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="8" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconGuide({ size = 20, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 21c0-4.418 4.03-8 9-8s9 3.582 9 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 11l2 2-4 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconStar({ size = 20, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
