import Link from "next/link";
import { USLUGI } from "@/lib/uslugi";

export default function Start() {
  return (
    <>
      <h1>Załatw sprawę urzędową online</h1>
      <p>Przykładowy portal e-usług: katalog spraw z kartami usług, wieloetapowy formularz wniosku z walidacją po stronie serwera, sprawdzanie statusu sprawy i deklaracja dostępności.</p>
      <p><Link className="btn" href="/wniosek">Złóż wniosek</Link> <Link className="btn btn-ghost" href="/uslugi">Przeglądaj e-usługi</Link></p>
      <h2>Najczęściej wybierane</h2>
      <ul className="grid">
        {USLUGI.slice(0, 3).map((u) => (
          <li key={u.slug} className="card">
            <span className="tag">{u.kategoria}</span>
            <h3><Link href={`/uslugi/${u.slug}`}>{u.nazwa}</Link></h3>
            <p>{u.opis}</p>
          </li>
        ))}
      </ul>
      <h2>Technologia</h2>
      <ul>
        <li>Next.js 15 (App Router, Server Components, Server Actions), React 19, TypeScript (strict)</li>
        <li>Formularze działające także bez JavaScriptu (progressive enhancement)</li>
        <li>Testy jednostkowe (node:test) i testy dostępności axe-core w Playwright</li>
        <li>Obraz Docker „standalone”, wdrożenie przez Coolify</li>
      </ul>
    </>
  );
}
