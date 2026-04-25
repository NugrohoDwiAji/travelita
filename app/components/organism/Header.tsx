"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import NavBrand from "@/app/components/moleculs/NavBrand";
import NavMenu from "@/app/components/moleculs/NavMenu";
import LanguageSwitcherBar from "@/app/components/moleculs/LanguageSwitcherBar";

export default function Header() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (!profileMenuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!profileMenuRef.current?.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileMenuOpen(false);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [profileMenuOpen]);

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-8 z-50 w-full",
          "bg-brand-navy-900 border-b border-(--brand-divider)",
          "transition-shadow duration-300",
          scrolled ? "shadow-[0_4px_24px_rgba(20,52,164,0.12)]" : "",
        ].join(" ")}
      >
        <LanguageSwitcherBar />
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Kiri – Brand */}
          <NavBrand />

          {/* Tengah/Kanan – Desktop Menu */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <NavMenu direction="horizontal" />

            {/* Auth Buttons */}
            <div className="ml-4 flex items-center gap-3">
              {status === "loading" ? (
                <div className="h-9 w-20 animate-pulse rounded-full bg-white/10" />
              ) : session ? (
                <div className="relative" ref={profileMenuRef}>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/orders"
                      aria-label="Pesanan Saya"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-brand-text-light transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3h1.5l.3 1.6m0 0L6 12h11l2-7.4H4.8Zm1.7 11.9a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm10.9 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"
                        />
                      </svg>
                    </Link>

                    <button
                      type="button"
                      aria-label={profileMenuOpen ? "Tutup menu akun" : "Buka menu akun"}
                      aria-haspopup="menu"
                      aria-expanded={profileMenuOpen}
                      onClick={() => setProfileMenuOpen((open) => !open)}
                      className="flex  gap-3 h-10  items-center justify-center rounded-full border border-white/15 bg-white/5 text-brand-text-light transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-500 cursor-pointer"
                    >
                       <span className="text-sm font-medium text-brand-text-light">
                      {session.user?.name}
                    </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className={[
                          "h-5 w-5 transition-transform duration-200",
                          profileMenuOpen ? "rotate-180" : "",
                        ].join(" ")}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  </div>

                  <div
                    className={[
                      "absolute right-0 top-[calc(100%+0.75rem)] w-52 rounded-2xl border border-white/10 bg-brand-navy-800/95 p-2 shadow-[0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur-md transition-all duration-200",
                      profileMenuOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
                    ].join(" ")}
                  >
                    <Link
                      href="/profile"
                      onClick={() => setProfileMenuOpen(false)}
                      className="block rounded-xl px-4 py-3 text-sm font-medium text-brand-text-light transition-colors duration-200 hover:bg-white/10"
                    >
                      Edit Profile
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="mt-1 w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-red-500 transition-colors duration-200 hover:bg-red-500/25 hover:text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="rounded-full border border-brand-accent-500 px-5 py-2 text-sm font-semibold text-brand-accent-500 transition-colors duration-200 hover:bg-brand-accent-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded-full bg-brand-accent-500 px-5 py-2 text-sm font-semibold text-white shadow-md transition-colors duration-200 hover:bg-brand-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
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

          <div className="mt-8 flex flex-col gap-3">
            {session ? (
              <>
                <Link
                  href="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-center text-sm font-semibold text-brand-text-light transition-colors hover:bg-white/10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h1.5l.3 1.6m0 0L6 12h11l2-7.4H4.8Zm1.7 11.9a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm10.9 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"
                    />
                  </svg>
                  Pesanan Saya
                </Link>
                <span className="text-center text-sm font-medium text-brand-text-light">
                  {session.user?.name}
                </span>
                <button
                  type="button"
                  onClick={() => { setMenuOpen(false); signOut({ callbackUrl: "/" }); }}
                  className="rounded-full border border-red-400 px-5 py-3 text-center text-sm font-semibold text-red-400 transition-colors hover:bg-red-500 hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full border border-brand-accent-500 px-5 py-3 text-center text-sm font-semibold text-brand-accent-500 transition-colors hover:bg-brand-accent-500 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full bg-brand-accent-500 px-5 py-3 text-center text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-accent-400"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </aside>
      </div>

      {/* Spacer agar konten tidak tertutup fixed header */}
      <div className="h-34" aria-hidden="true" />
    </>
  );
}
