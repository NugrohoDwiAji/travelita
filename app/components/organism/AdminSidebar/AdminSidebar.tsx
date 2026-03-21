"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconDashboard,
  IconShuttle,
  IconCar,
  IconTicket,
  IconFishAdmin,
  IconMapAdmin,
  IconSettings,
  IconLogout,
  IconMenu,
  IconClose,
  IconContent,
} from "@/app/components/atoms/AdminIcons/AdminIcons";
import SidebarNavGroup, {
  SubNavItem,
} from "@/app/components/moleculs/SidebarNavGroup/SidebarNavGroup";

const NAV_ITEMS = [
  { href: "/admin",               label: "Dashboard",      icon: <IconDashboard size={18} /> },
  { href: "/admin/shuttle-service", label: "Shuttle Service", icon: <IconShuttle size={18} />  },
  { href: "/admin/private-car",   label: "Private Car",     icon: <IconCar size={18} />      },
  { href: "/admin/ticketing",     label: "Ticketing",       icon: <IconTicket size={18} />   },
  { href: "/admin/spear-fishing", label: "Spear Fishing",   icon: <IconFishAdmin size={18} />},
  { href: "/admin/travel",        label: "Wisata Travel",   icon: <IconMapAdmin size={18} /> },
];

const CONTENT_ITEMS: SubNavItem[] = [
  { href: "/admin/content/shuttle-service", label: "Shuttle Service", icon: <IconShuttle size={14} /> },
  { href: "/admin/content/private-car",     label: "Private Car",     icon: <IconCar size={14} />     },
  { href: "/admin/content/ticketing",       label: "Ticketing",       icon: <IconTicket size={14} />  },
  { href: "/admin/content/spear-fishing",   label: "Spear Fishing",   icon: <IconFishAdmin size={14} />},
  { href: "/admin/content/travel",          label: "Wisata Travel",   icon: <IconMapAdmin size={14} />},
];

interface SidebarContentProps {
  isActive: (href: string) => boolean;
  onClose: () => void;
}

function SidebarContent({ isActive, onClose }: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col" style={{ background: "#0d2280" }}>
      {/* Brand */}
      <div
        className="flex items-center gap-3 px-5 py-5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.09)" }}
      >
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl text-lg font-extrabold text-white"
          style={{ background: "rgba(255,255,255,0.15)" }}
        >
          T
        </div>
        <div>
          <p className="text-sm font-extrabold text-white leading-none">Travelita</p>
          <p className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.50)" }}>
            Admin Panel
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {/* Bookings section */}
        <p
          className="mb-2 px-3 text-[9px] font-bold uppercase tracking-[0.2em]"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Menu Utama
        </p>
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all"
              style={
                active
                  ? {
                      background: "rgba(255,255,255,0.15)",
                      color: "#fff",
                      boxShadow: "inset 3px 0 0 rgba(255,255,255,0.6)",
                    }
                  : { color: "rgba(255,255,255,0.65)" }
              }
            >
              <span
                className="shrink-0"
                style={{ color: active ? "#fff" : "rgba(255,255,255,0.50)" }}
              >
                {icon}
              </span>
              {label}
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
              )}
            </Link>
          );
        })}

        {/* Content Management section */}
        <div className="pt-3">
          <p
            className="mb-2 px-3 text-[9px] font-bold uppercase tracking-[0.2em]"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Kelola Konten
          </p>
          <SidebarNavGroup
            label="Konten Layanan"
            icon={<IconContent size={18} />}
            items={CONTENT_ITEMS}
            isActive={isActive}
            onItemClick={onClose}
          />
        </div>
      </nav>

      {/* Bottom */}
      <div
        className="space-y-0.5 px-3 py-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.09)" }}
      >
        <button
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          <IconSettings size={18} />
          Pengaturan
        </button>
        <button
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          <IconLogout size={18} />
          Keluar
        </button>
      </div>
    </div>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="fixed left-0 top-0 z-30 hidden h-full w-60 lg:block"
        style={{ boxShadow: "2px 0 20px rgba(13,34,128,0.25)" }}
      >
        <SidebarContent isActive={isActive} onClose={() => {}} />
      </aside>

      {/* Mobile toggle button */}
      <button
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-lg lg:hidden"
        style={{ background: "#1434A4" }}
        onClick={() => setOpen(true)}
      >
        <IconMenu size={20} />
      </button>

      {/* Mobile drawer overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: "rgba(0,0,0,0.45)" }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-60 transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent isActive={isActive} onClose={() => setOpen(false)} />
        <button
          className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
          onClick={() => setOpen(false)}
        >
          <IconClose size={16} />
        </button>
      </aside>
    </>
  );
}


