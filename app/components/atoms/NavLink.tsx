"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavLinkProps {
  label: string;
  href: string;
}

export default function NavLink({ label, href }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={[
        "relative px-1 py-2 text-sm font-medium tracking-wide transition-colors duration-200",
        "text-brand-text-muted hover:text-brand-text-light",
        "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full",
        "after:origin-left after:scale-x-0 after:rounded-full after:bg-brand-accent-500",
        "after:transition-transform after:duration-300 hover:after:scale-x-100",
        isActive
          ? "text-brand-text-light after:scale-x-100"
          : "",
      ]
        .join(" ")
        .trim()}
    >
      {label}
    </Link>
  );
}
