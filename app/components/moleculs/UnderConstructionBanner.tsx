"use client";

export default function UnderConstructionBanner() {
  return (
    <div
      className="fixed inset-x-0 top-0 z-100 h-8"
      style={{
        background:
          "repeating-linear-gradient(135deg, #f59e0b 0px, #f59e0b 18px, #111827 18px, #111827 36px)",
        borderBottom: "1px solid rgba(17,24,39,0.22)",
      }}
      role="status"
      aria-label="Under Construction"
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center px-4">
        <p className="text-[11px] font-extrabold tracking-[0.2em] text-white">
          UNDER CONSTRUCTION
        </p>
      </div>
    </div>
  );
}
