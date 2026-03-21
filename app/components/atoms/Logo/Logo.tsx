import type { SVGProps } from "react";

/** SVG icon logo Travelita – siluet pesawat + gelombang laut */
export default function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      aria-label="Travelita logo"
      width={36}
      height={36}
      {...props}
    >
      {/* Lingkaran latar */}
      <circle cx="24" cy="24" r="24" fill="var(--brand-accent-500)" />

      {/* Pesawat */}
      <path
        d="M10 26l5-2 3 4 9-12 2 1-8 14-4-2-1 4-3-2 1-4-4-1z"
        fill="var(--brand-text-light)"
      />

      {/* Gelombang laut (bawah) */}
      <path
        d="M8 35 Q14 32 20 35 Q26 38 32 35 Q38 32 44 35"
        stroke="var(--brand-gold-400)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
