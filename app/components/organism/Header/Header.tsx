"use client";

import { useState, useEffect } from "react";
import NavBrand from "@/app/components/moleculs/NavBrand";
import NavMenu from "@/app/components/moleculs/NavMenu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Efek shadow saat halaman di-scroll */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* Tutup drawer saat resize ke desktop */
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  /* Cegah scroll body saat mobile menu terbuka */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 w-full",
          "bg-brand-navy-900 border-b border-(--brand-divider)",
          "transition-shadow duration-300",
          scrolled ? "shadow-[0_4px_24px_rgba(20,52,164,0.12)]" : "",
        ].join(" ")}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Kiri – Brand */}
          <NavBrand />

          {/* Tengah/Kanan – Desktop Menu */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <NavMenu direction="horizontal" />

            {/* CTA Button */}
            <a
              href="/booking"
              className="ml-4 rounded-full bg-brand-accent-500 px-5 py-2 text-sm font-semibold text-white shadow-md transition-colors duration-200 hover:bg-brand-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Book Now
            </a>
          </div>

          {/* Hamburger – Mobile */}
          <button
            type="button"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex md:hidden flex-col justify-center items-center gap-1.25 p-2 rounded-md text-brand-text-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-500"
          >
            <span
              className={[
                "block h-0.5 w-6 rounded-full bg-current transition-transform duration-300",
                menuOpen ? "translate-y-1.75 rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block h-0.5 w-6 rounded-full bg-current transition-opacity duration-300",
                menuOpen ? "opacity-0" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block h-0.5 w-6 rounded-full bg-current transition-transform duration-300",
                menuOpen ? "-translate-y-1.75 -rotate-45" : "",
              ].join(" ")}
            />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={[
          "fixed inset-0 z-40 flex md:hidden",
          "transition-opacity duration-300",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Panel */}
        <aside
          className={[
            "relative ml-auto flex h-full w-72 flex-col",
            "bg-brand-navy-800 px-6 pt-20 pb-8",
            "transition-transform duration-300 ease-in-out",
            menuOpen ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
        >
          <NavMenu direction="vertical" onClose={() => setMenuOpen(false)} />

          <a
            href="/booking"
            onClick={() => setMenuOpen(false)}
            className="mt-8 rounded-full bg-brand-accent-500 px-5 py-3 text-center text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-accent-400"
          >
            Book Now
          </a>
        </aside>
      </div>

      {/* Spacer agar konten tidak tertutup fixed header */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}
