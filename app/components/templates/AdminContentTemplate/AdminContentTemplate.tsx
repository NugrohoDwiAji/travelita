"use client";

import { useState } from "react";
import {
  IconSave,
  IconPlus,
  IconTrash,
  IconEdit,
} from "@/app/components/atoms/AdminIcons/AdminIcons";

/* ─── Types ─────────────────────────────────────────────── */
export interface GeneralInfo {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string;   // newline-separated
  badge: string;
  highlighted: boolean;
}

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

export interface AdminContentTemplateProps {
  serviceTitle: string;
  serviceIcon: string;
  breadcrumb?: string;
  initialGeneral?: Partial<GeneralInfo>;
  initialPackages?: ServicePackage[];
  initialFaqs?: FaqEntry[];
}

type Tab = "general" | "packages" | "faq";

/* ─── Helpers ────────────────────────────────────────────── */
const uid = () => Math.random().toString(36).slice(2, 9);

function SavedToast({ visible }: { visible: boolean }) {
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

/* ─── Input primitives ───────────────────────────────────── */
function Field({
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

const inputCls =
  "w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2";
const inputStyle = {
  border: "1.5px solid #e5e7eb",
  color: "#111827",
  background: "#f9fafb",
};

/* ─── Tab: General Info ──────────────────────────────────── */
function GeneralTab({
  data,
  onChange,
  onSave,
}: {
  data: GeneralInfo;
  onChange: (d: GeneralInfo) => void;
  onSave: () => void;
}) {
  const set = (key: keyof GeneralInfo) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => onChange({ ...data, [key]: e.target.value });

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Badge / Tag Hero">
          <input className={inputCls} style={inputStyle} value={data.badge} onChange={set("badge")} placeholder="cth: Layanan Terpercaya" />
        </Field>
        <Field label="Teks Tombol Utama (CTA)">
          <input className={inputCls} style={inputStyle} value={data.ctaPrimary} onChange={set("ctaPrimary")} placeholder="cth: Pesan Sekarang" />
        </Field>
      </div>

      <Field label="Judul Utama (Hero Title)">
        <input className={inputCls} style={inputStyle} value={data.title} onChange={set("title")} placeholder="cth: Shuttle Service Terbaik di Lombok" />
      </Field>

      <Field label="Sub-judul (Hero Subtitle)">
        <input className={inputCls} style={inputStyle} value={data.subtitle} onChange={set("subtitle")} placeholder="cth: Nyaman, Tepat Waktu, Terjangkau" />
      </Field>

      <Field label="Deskripsi Layanan">
        <textarea
          rows={4}
          className={inputCls}
          style={{ ...inputStyle, resize: "vertical" }}
          value={data.description}
          onChange={set("description")}
          placeholder="Deskripsi singkat layanan yang akan ditampilkan di halaman utama..."
        />
      </Field>

      <Field label="Teks Tombol Sekunder">
        <input className={inputCls} style={inputStyle} value={data.ctaSecondary} onChange={set("ctaSecondary")} placeholder="cth: Lihat Jadwal" />
      </Field>

      <div className="flex justify-end pt-2">
        <SaveButton onClick={onSave} />
      </div>
    </div>
  );
}

/* ─── Tab: Packages ──────────────────────────────────────── */
function PackagesTab({
  packages,
  onChange,
  onSave,
}: {
  packages: ServicePackage[];
  onChange: (p: ServicePackage[]) => void;
  onSave: () => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const update = (id: string, patch: Partial<ServicePackage>) =>
    onChange(packages.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const remove = (id: string) => {
    onChange(packages.filter((p) => p.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const addNew = () => {
    const id = uid();
    onChange([
      ...packages,
      { id, name: "", description: "", price: "", features: "", badge: "", highlighted: false },
    ]);
    setEditingId(id);
  };

  return (
    <div className="flex flex-col gap-4">
      {packages.length === 0 && (
        <p className="text-sm text-center py-8" style={{ color: "#9ca3af" }}>
          Belum ada paket. Klik &ldquo;Tambah Paket&rdquo; untuk mulai.
        </p>
      )}

      {packages.map((pkg, idx) => (
        <div
          key={pkg.id}
          className="rounded-2xl border overflow-hidden"
          style={{
            border: pkg.highlighted ? "1.5px solid #1434A4" : "1.5px solid #e5e7eb",
            background: "#fff",
          }}
        >
          {/* Card header */}
          <div
            className="flex items-center justify-between px-5 py-3.5"
            style={{ background: pkg.highlighted ? "rgba(20,52,164,0.04)" : "#f9fafb", borderBottom: "1px solid #f3f4f6" }}
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-extrabold text-white"
                style={{ background: "#1434A4" }}
              >
                {idx + 1}
              </span>
              <span className="font-semibold text-sm" style={{ color: "#111827" }}>
                {pkg.name || "Paket Baru"}
              </span>
              {pkg.badge && (
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-bold"
                  style={{ background: "rgba(20,52,164,0.1)", color: "#1434A4" }}
                >
                  {pkg.badge}
                </span>
              )}
              {pkg.highlighted && (
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-bold"
                  style={{ background: "rgba(234,179,8,0.15)", color: "#ca8a04" }}
                >
                  ★ Unggulan
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditingId(editingId === pkg.id ? null : pkg.id)}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all"
                style={{ background: "rgba(20,52,164,0.08)", color: "#1434A4" }}
              >
                <IconEdit size={13} />
                {editingId === pkg.id ? "Tutup" : "Edit"}
              </button>
              <button
                type="button"
                onClick={() => remove(pkg.id)}
                className="flex h-7 w-7 items-center justify-center rounded-lg transition-all"
                style={{ background: "rgba(220,38,38,0.08)", color: "#dc2626" }}
              >
                <IconTrash size={13} />
              </button>
            </div>
          </div>

          {/* Inline edit form */}
          {editingId === pkg.id && (
            <div className="p-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Nama Paket">
                <input
                  className={inputCls}
                  style={inputStyle}
                  value={pkg.name}
                  onChange={(e) => update(pkg.id, { name: e.target.value })}
                  placeholder="cth: Paket Reguler"
                />
              </Field>
              <Field label="Harga">
                <input
                  className={inputCls}
                  style={inputStyle}
                  value={pkg.price}
                  onChange={(e) => update(pkg.id, { price: e.target.value })}
                  placeholder="cth: Rp 150.000"
                />
              </Field>
              <Field label="Deskripsi Singkat">
                <input
                  className={inputCls}
                  style={inputStyle}
                  value={pkg.description}
                  onChange={(e) => update(pkg.id, { description: e.target.value })}
                  placeholder="Deskripsi singkat paket..."
                />
              </Field>
              <Field label="Badge / Label (opsional)">
                <input
                  className={inputCls}
                  style={inputStyle}
                  value={pkg.badge}
                  onChange={(e) => update(pkg.id, { badge: e.target.value })}
                  placeholder="cth: Terlaris, Baru"
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Fitur / Keunggulan (satu per baris)">
                  <textarea
                    rows={4}
                    className={inputCls}
                    style={{ ...inputStyle, resize: "vertical" }}
                    value={pkg.features}
                    onChange={(e) => update(pkg.id, { features: e.target.value })}
                    placeholder={"AC & wifi gratis\nSupir berpengalaman\nArmada terbaru"}
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    className="relative h-5 w-9 rounded-full transition-all"
                    style={{ background: pkg.highlighted ? "#1434A4" : "#d1d5db" }}
                    onClick={() => update(pkg.id, { highlighted: !pkg.highlighted })}
                  >
                    <div
                      className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all"
                      style={{ left: pkg.highlighted ? "18px" : "2px" }}
                    />
                  </div>
                  <span className="text-sm font-medium" style={{ color: "#374151" }}>
                    Tandai sebagai paket unggulan
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Collapsed preview */}
          {editingId !== pkg.id && (
            <div className="px-5 py-3 flex items-center gap-6 text-xs" style={{ color: "#6b7280" }}>
              <span>💰 {pkg.price || "—"}</span>
              <span>📝 {pkg.description || "Belum ada deskripsi"}</span>
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addNew}
        className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed py-3.5 text-sm font-semibold transition-all"
        style={{ borderColor: "#d1d5db", color: "#6b7280" }}
      >
        <IconPlus size={16} />
        Tambah Paket
      </button>

      <div className="flex justify-end pt-2">
        <SaveButton onClick={onSave} />
      </div>
    </div>
  );
}

/* ─── Tab: FAQ ───────────────────────────────────────────── */
function FaqTab({
  faqs,
  onChange,
  onSave,
}: {
  faqs: FaqEntry[];
  onChange: (f: FaqEntry[]) => void;
  onSave: () => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const update = (id: string, patch: Partial<FaqEntry>) =>
    onChange(faqs.map((f) => (f.id === id ? { ...f, ...patch } : f)));

  const remove = (id: string) => {
    onChange(faqs.filter((f) => f.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const addNew = () => {
    const id = uid();
    onChange([...faqs, { id, question: "", answer: "" }]);
    setEditingId(id);
  };

  return (
    <div className="flex flex-col gap-4">
      {faqs.length === 0 && (
        <p className="text-sm text-center py-8" style={{ color: "#9ca3af" }}>
          Belum ada FAQ. Klik &ldquo;Tambah FAQ&rdquo; untuk mulai.
        </p>
      )}

      {faqs.map((faq, idx) => (
        <div
          key={faq.id}
          className="rounded-2xl border overflow-hidden"
          style={{ border: "1.5px solid #e5e7eb", background: "#fff" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-3.5"
            style={{ background: "#f9fafb", borderBottom: "1px solid #f3f4f6" }}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold text-white"
                style={{ background: "#4050b5" }}
              >
                {idx + 1}
              </span>
              <p className="text-sm font-medium truncate" style={{ color: "#374151" }}>
                {faq.question || "Pertanyaan Baru"}
              </p>
            </div>
            <div className="flex items-center gap-2 ml-3 shrink-0">
              <button
                type="button"
                onClick={() => setEditingId(editingId === faq.id ? null : faq.id)}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold"
                style={{ background: "rgba(20,52,164,0.08)", color: "#1434A4" }}
              >
                <IconEdit size={13} />
                {editingId === faq.id ? "Tutup" : "Edit"}
              </button>
              <button
                type="button"
                onClick={() => remove(faq.id)}
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{ background: "rgba(220,38,38,0.08)", color: "#dc2626" }}
              >
                <IconTrash size={13} />
              </button>
            </div>
          </div>

          {editingId === faq.id ? (
            <div className="p-5 flex flex-col gap-4">
              <Field label="Pertanyaan">
                <input
                  className={inputCls}
                  style={inputStyle}
                  value={faq.question}
                  onChange={(e) => update(faq.id, { question: e.target.value })}
                  placeholder="Tulis pertanyaan di sini..."
                />
              </Field>
              <Field label="Jawaban">
                <textarea
                  rows={4}
                  className={inputCls}
                  style={{ ...inputStyle, resize: "vertical" }}
                  value={faq.answer}
                  onChange={(e) => update(faq.id, { answer: e.target.value })}
                  placeholder="Tulis jawaban di sini..."
                />
              </Field>
            </div>
          ) : (
            <p className="px-5 py-3 text-xs" style={{ color: "#6b7280" }}>
              {faq.answer || "Belum ada jawaban"}
            </p>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addNew}
        className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed py-3.5 text-sm font-semibold"
        style={{ borderColor: "#d1d5db", color: "#6b7280" }}
      >
        <IconPlus size={16} />
        Tambah FAQ
      </button>

      <div className="flex justify-end pt-2">
        <SaveButton onClick={onSave} />
      </div>
    </div>
  );
}

/* ─── Save button ────────────────────────────────────────── */
function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-extrabold text-white transition-all"
      style={{
        background: "linear-gradient(90deg, #0d2280 0%, #1434A4 100%)",
        boxShadow: "0 4px 14px rgba(20,52,164,0.30)",
      }}
    >
      <IconSave size={15} />
      Simpan Perubahan
    </button>
  );
}

/* ─── Main Template ──────────────────────────────────────── */
const DEFAULT_GENERAL: GeneralInfo = {
  badge: "",
  title: "",
  subtitle: "",
  description: "",
  ctaPrimary: "Pesan Sekarang",
  ctaSecondary: "Pelajari Lebih Lanjut",
};

export default function AdminContentTemplate({
  serviceTitle,
  serviceIcon,
  breadcrumb = "Kelola Konten",
  initialGeneral,
  initialPackages = [],
  initialFaqs = [],
}: AdminContentTemplateProps) {
  const [tab, setTab] = useState<Tab>("general");
  const [general, setGeneral] = useState<GeneralInfo>({
    ...DEFAULT_GENERAL,
    ...initialGeneral,
  });
  const [packages, setPackages] = useState<ServicePackage[]>(initialPackages);
  const [faqs, setFaqs] = useState<FaqEntry[]>(initialFaqs);
  const [savedVisible, setSavedVisible] = useState(false);

  const handleSave = () => {
    // TODO: persist to API / database
    setSavedVisible(true);
    setTimeout(() => setSavedVisible(false), 2500);
  };

  const TABS: { key: Tab; label: string }[] = [
    { key: "general",  label: "Informasi Umum"    },
    { key: "packages", label: "Paket & Penawaran"  },
    { key: "faq",      label: "FAQ"                },
  ];

  return (
    <div className="p-6 lg:p-8" style={{ background: "#f5f6fb", minHeight: "100vh" }}>
      {/* Page header */}
      <div className="mb-6">
        <p className="text-xs font-semibold mb-1" style={{ color: "#4050b5" }}>
          {breadcrumb}
        </p>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{serviceIcon}</span>
          <h1 className="text-2xl font-extrabold" style={{ color: "#0d2280" }}>
            Konten {serviceTitle}
          </h1>
        </div>
        <p className="mt-1 text-sm" style={{ color: "#6b7280" }}>
          Kelola informasi, paket, dan FAQ yang ditampilkan pada halaman layanan.
        </p>
      </div>

      {/* Tab bar */}
      <div
        className="flex gap-1 rounded-xl p-1 mb-6 w-fit"
        style={{ background: "#e8eaf6" }}
      >
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className="rounded-lg px-5 py-2 text-sm font-semibold transition-all"
            style={
              tab === key
                ? { background: "#fff", color: "#0d2280", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }
                : { color: "#4050b5" }
            }
          >
            {label}
            {key === "packages" && (
              <span
                className="ml-2 rounded-full px-1.5 py-0.5 text-[10px] font-extrabold"
                style={{ background: "rgba(20,52,164,0.12)", color: "#1434A4" }}
              >
                {packages.length}
              </span>
            )}
            {key === "faq" && (
              <span
                className="ml-2 rounded-full px-1.5 py-0.5 text-[10px] font-extrabold"
                style={{ background: "rgba(20,52,164,0.12)", color: "#1434A4" }}
              >
                {faqs.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div
        className="rounded-2xl p-6"
        style={{ background: "#fff", boxShadow: "0 2px 16px rgba(20,52,164,0.07)" }}
      >
        {tab === "general" && (
          <GeneralTab data={general} onChange={setGeneral} onSave={handleSave} />
        )}
        {tab === "packages" && (
          <PackagesTab packages={packages} onChange={setPackages} onSave={handleSave} />
        )}
        {tab === "faq" && (
          <FaqTab faqs={faqs} onChange={setFaqs} onSave={handleSave} />
        )}
      </div>

      <SavedToast visible={savedVisible} />
    </div>
  );
}
