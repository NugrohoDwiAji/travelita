export function IconPlaneFlight({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconTrainRail({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="5" y="2" width="14" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 11h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="7.5" r="1.5" fill="currentColor" fillOpacity="0.7" />
      <circle cx="15" cy="7.5" r="1.5" fill="currentColor" fillOpacity="0.7" />
      <path
        d="M9 18l-2 3M15 18l2 3M8 21h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconBusTransport({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 9h3M14 9h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="20" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="20" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconFerryBoat({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M2 20h20M4 16l2-7h12l2 7H4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 9V5M9 5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 13h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconSeatClass({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M6 2v11M18 2v11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6 13c0 1.1.9 2 2 2h8a2 2 0 002-2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 15v4M16 15v4M6 19h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
