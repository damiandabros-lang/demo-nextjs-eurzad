"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKI = [
  { href: "/", label: "Start" },
  { href: "/uslugi", label: "Katalog e-usług" },
  { href: "/wniosek", label: "Złóż wniosek" },
  { href: "/status", label: "Sprawdź status" },
  { href: "/dostepnosc", label: "Dostępność" },
];

export function Nav() {
  const path = usePathname();
  return (
    <nav aria-label="Menu główne">
      <ul>
        {LINKI.map((l) => {
          const aktywny = l.href === "/" ? path === "/" : path.startsWith(l.href);
          return <li key={l.href}><Link href={l.href} aria-current={aktywny ? "page" : undefined}>{l.label}</Link></li>;
        })}
      </ul>
    </nav>
  );
}
