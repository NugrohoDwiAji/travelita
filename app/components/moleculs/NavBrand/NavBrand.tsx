import Link from "next/link";
import Logo from "@/app/components/atoms/Logo";

export default function NavBrand() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-400 rounded-md"
      aria-label="Travelita – Beranda"
    >
      <Logo />
      <span className="flex flex-col leading-tight">
        <span className="text-brand-text-light text-xl font-bold tracking-wider uppercase">
          Travelita
        </span>
        <span className="text-brand-accent-500 text-[10px] font-medium tracking-[0.2em] uppercase">
          Travel &amp; Adventure
        </span>
      </span>
    </Link>
  );
}
