"use client";

import { useState } from "react";
import React from "react";

interface AuthSelectProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  icon?: React.ReactNode;
  error?: string;
  required?: boolean;
}

export default function AuthSelect({
  id,
  label,
  placeholder,
  value,
  onChange,
  options,
  icon,
  error,
  required,
}: AuthSelectProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-sm font-semibold"
        style={{ color: "#0d2280" }}
      >
        {label}
        {required && <span style={{ color: "#dc2626" }}> *</span>}
      </label>

      <div className="relative">
        {icon && (
          <span
            className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: focused ? "#1434A4" : "#9ca3af" }}
          >
            {icon}
          </span>
        )}

        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full rounded-xl text-sm outline-none transition-all appearance-none cursor-pointer"
          style={{
            padding: icon ? "0.75rem 2.75rem 0.75rem 2.75rem" : "0.75rem 2rem 0.75rem 1rem",
            background: focused ? "#fff" : "#f5f6fb",
            border: error
              ? "1.5px solid #dc2626"
              : focused
              ? "1.5px solid #1434A4"
              : "1.5px solid #e5e7eb",
            color: value ? "#111827" : "#9ca3af",
            boxShadow: focused ? "0 0 0 3px rgba(20,52,164,0.08)" : "none",
          }}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        {/* Dropdown arrow */}
        <span
          className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: focused ? "#1434A4" : "#9ca3af" }}
        >
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {error && (
        <p className="text-xs" style={{ color: "#dc2626" }}>
          {error}
        </p>
      )}
    </div>
  );
}
