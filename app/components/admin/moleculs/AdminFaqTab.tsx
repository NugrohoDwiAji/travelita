"use client";

import { useState } from "react";
import { IconPlus, IconTrash, IconEdit } from "@/app/components/admin/atoms/AdminIcons";
import AdminField, { inputCls, inputStyle } from "./AdminField";
import AdminSaveButton from "./AdminSaveButton";
import type { FaqEntry } from "@/app/components/admin/templates/AdminContentTemplate";

const uid = () => Math.random().toString(36).slice(2, 9);

export default function AdminFaqTab({
  faqs,
  onChange,
  onSave,
  loading,
}: {
  faqs: FaqEntry[];
  onChange: (f: FaqEntry[]) => void;
  onSave: () => void;
  loading?: boolean;
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
              <AdminField label="Pertanyaan">
                <input className={inputCls} style={inputStyle} value={faq.question} onChange={(e) => update(faq.id, { question: e.target.value })} placeholder="Tulis pertanyaan di sini..." />
              </AdminField>
              <AdminField label="Jawaban">
                <textarea
                  rows={4}
                  className={inputCls}
                  style={{ ...inputStyle, resize: "vertical" }}
                  value={faq.answer}
                  onChange={(e) => update(faq.id, { answer: e.target.value })}
                  placeholder="Tulis jawaban di sini..."
                />
              </AdminField>
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
        <AdminSaveButton onClick={onSave} loading={loading} />
      </div>
    </div>
  );
}
