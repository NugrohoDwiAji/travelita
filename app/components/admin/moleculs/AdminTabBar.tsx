"use client";

export interface TabItem {
  key: string;
  label: string;
  count?: number;
}

export default function AdminTabBar({
  tabs,
  activeTab,
  onTabChange,
  disabled,
}: {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (key: string) => void;
  disabled?: boolean;
}) {
  return (
    <div
      className="flex gap-1 rounded-xl p-1 mb-6 w-fit"
      style={{ background: "#e8eaf6" }}
    >
      {tabs.map(({ key, label, count }) => (
        <button
          key={key}
          type="button"
          disabled={disabled}
          onClick={() => onTabChange(key)}
          className="rounded-lg px-5 py-2 text-sm font-semibold transition-all disabled:opacity-50"
          style={
            activeTab === key
              ? { background: "#fff", color: "#0d2280", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }
              : { color: "#4050b5" }
          }
        >
          {label}
          {count !== undefined && (
            <span
              className="ml-2 rounded-full px-1.5 py-0.5 text-[10px] font-extrabold"
              style={{ background: "rgba(20,52,164,0.12)", color: "#1434A4" }}
            >
              {count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
