"use client";

import { useState } from "react";
import Link from "next/link";
import React from "react";
import { IconChevronDown } from "@/app/components/admin/atoms/AdminIcons";

export interface SubNavItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

interface SidebarNavGroupProps {
  label: string;
  icon: React.ReactNode;
  items: SubNavItem[];
  isActive: (href: string) => boolean;
  onItemClick: () => void;
}

export default function SidebarNavGroup({
  label,
  icon,
  items,
  isActive,
  onItemClick,
}: SidebarNavGroupProps) {
  const anyActive = items.some(({ href }) => isActive(href));
  const [open, setOpen] = useState(() => items.some(({ href }) => isActive(href)));

  return (
    <div>
      {/* Parent toggle button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all"
        style={
          anyActive
            ? { background: "rgba(255,255,255,0.10)", color: "#fff" }
            : { color: "rgba(255,255,255,0.65)" }
        }
      >
        <span
          className="shrink-0"
          style={{ color: anyActive ? "#fff" : "rgba(255,255,255,0.50)" }}
        >
          {icon}
        </span>
        <span className="flex-1 text-left">{label}</span>
        <span
          className="shrink-0 transition-transform duration-200"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            color: "rgba(255,255,255,0.40)",
          }}
        >
          <IconChevronDown size={14} />
        </span>
      </button>

      {/* Sub-items */}
      {open && (
        <div
          className="mt-0.5 ml-4 pl-3 space-y-0.5"
          style={{ borderLeft: "1px solid rgba(255,255,255,0.12)" }}
        >
          {items.map(({ href, label: subLabel, icon: subIcon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={onItemClick}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-all"
                style={
                  active
                    ? {
                        background: "rgba(255,255,255,0.15)",
                        color: "#fff",
                        boxShadow: "inset 2px 0 0 rgba(255,255,255,0.5)",
                      }
                    : { color: "rgba(255,255,255,0.55)" }
                }
              >
                {subIcon && (
                  <span
                    className="shrink-0"
                    style={{ color: active ? "#fff" : "rgba(255,255,255,0.40)" }}
                  >
                    {subIcon}
                  </span>
                )}
                {subLabel}
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
