import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "./nav";

export const metadata: Metadata = {
  title: { default: "e-Urząd Gminy Przykładowo (DEMO)", template: "%s – e-Urząd (DEMO)" },
  description: "DEMO Isvero Studio: portal e-usług urzędu w Next.js, React i TypeScript, projektowany pod WCAG 2.1 AA. Dane fikcyjne.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <a className="skip-link" href="#zawartosc">Przejdź do treści</a>
        <div className="demo-bar" role="region" aria-label="Informacja o wersji demonstracyjnej">
          <p><span className="badge">DEMO</span>Projekt pokazowy <a href="https://isverostudio.com/">Isvero Studio</a> (2026). Nie jest to serwis żadnej instytucji, a wszystkie dane są fikcyjne.</p>
        </div>
        <header className="site">
          <div className="wrap">
            <a className="brand" href="/">e-Urząd Gminy Przykładowo<small>portal e-usług – wersja demonstracyjna</small></a>
            <Nav />
          </div>
        </header>
        <main id="zawartosc" className="wrap" tabIndex={-1}>{children}</main>
        <footer className="site">
          <div className="wrap">
            <p>DEMO portfolio Isvero Studio, 2026 · Next.js, React, TypeScript · <a href="/dostepnosc">Deklaracja dostępności</a></p>
            <p>„Gmina Przykładowo” jest fikcyjna. Formularz wysyła dane do serwera demo do walidacji; nie zapisuje wniosku ani nie przekazuje go do urzędu. Używaj danych fikcyjnych.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
