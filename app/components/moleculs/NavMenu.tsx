"use client";

import NavLink, { type NavLinkProps } from "@/app/components/atoms/NavLink";
import { useTranslations } from "next-intl";

const NAV_ITEMS: NavLinkProps[] = [
  { label: "Shuttle Service", href: "/shuttle-service" },
  { label: "Private Car",     href: "/private-car" },
  { label: "Spear Fishing",   href: "/spear-fishing" },
  { label: "Travel",          href: "/travel" },
];

interface NavMenuProps {
  /** Tutup menu – dipakai oleh mobile drawer */
  onClose?: () => void;
  /** Orientasi tampilan */
  direction?: "horizontal" | "vertical";
}

export default function NavMenu({
  onClose,
  direction = "horizontal",
}: NavMenuProps) {
  const t = useTranslations("components.nav");

  return (
    <nav aria-label={t("mainMenu")}>
      <ul
        className={[
          "flex list-none p-0 m-0",
          direction === "horizontal"
            ? "flex-row items-center gap-6"
            : "flex-col items-start gap-1",
        ].join(" ")}
      >
        {NAV_ITEMS.map((item) => (
          <li key={item.href} onClick={onClose}>
            <NavLink {...item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export { NAV_ITEMS };
