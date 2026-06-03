"use client";

export default function AdminSavedToast({ visible }: { visible: boolean }) {
  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-xl transition-all duration-300"
      style={{
        background: "#16a34a",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        pointerEvents: "none",
      }}
    >
      ✓ Perubahan berhasil disimpan
    </div>
  );
}
