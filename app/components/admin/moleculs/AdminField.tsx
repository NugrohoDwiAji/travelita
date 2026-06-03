"use client";

export default function AdminField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase tracking-wide" style={{ color: "#4050b5" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

export const inputCls = "w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2";
export const inputStyle = {
  border: "1.5px solid #e5e7eb",
  color: "#111827",
  background: "#f9fafb",
};
