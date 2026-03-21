"use client";

import { useState } from "react";
import React from "react";

interface AuthInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  onTrailingIconClick?: () => void;
  error?: string;
  autoComplete?: string;
  required?: boolean;
}

export default function AuthInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  trailingIcon,
  onTrailingIconClick,
  error,
  autoComplete,
  required,
}: AuthInputProps) {
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

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full rounded-xl text-sm outline-none transition-all"
          style={{
            padding: icon ? "0.75rem 2.75rem 0.75rem 2.75rem" : "0.75rem 1rem",
            paddingRight: trailingIcon ? "2.75rem" : undefined,
            background: focused ? "#fff" : "#f5f6fb",
            border: error
              ? "1.5px solid #dc2626"
              : focused
              ? "1.5px solid #1434A4"
              : "1.5px solid #e5e7eb",
            color: "#111827",
            boxShadow: focused ? "0 0 0 3px rgba(20,52,164,0.08)" : "none",
          }}
        />

        {trailingIcon && (
          <button
            type="button"
            onClick={onTrailingIconClick}
            className="absolute right-3.5 top-1/2 -translate-y-1/2"
            style={{ color: "#9ca3af" }}
            tabIndex={-1}
          >
            {trailingIcon}
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs" style={{ color: "#dc2626" }}>
          {error}
        </p>
      )}
    </div>
  );
}
