import Link from "next/link";
import type { Metadata } from "next";
import { USLUGI, kategorie } from "@/lib/uslugi";

export const metadata: Metadata = { title: "Katalog e-usług" };

export default async function Katalog({ searchParams }: { searchParams: Promise<{ q?: string; kategoria?: string }> }) {
  const { q = "", kategoria = "" } = await searchParams;
  const fraza = q.trim().toLowerCase();
  const wyniki = USLUGI.filter((u) => (!kategoria || u.kategoria === kategoria) && (!fraza || (u.nazwa + " " + u.opis).toLowerCase().includes(fraza)));
  return (
    <>
      <h1>Katalog e-usług</h1>
      <form method="get" role="search" aria-label="Szukaj e-usługi">
        <div className="field"><label htmlFor="q">Czego szukasz?</label><input id="q" name="q" type="search" defaultValue={q} /></div>
        <div className="field"><label htmlFor="kategoria">Kategoria</label>
          <select id="kategoria" name="kategoria" defaultValue={kategoria}>
            <option value="">Wszystkie</option>
            {kategorie.map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
        <button className="btn" type="submit">Szukaj</button>
      </form>
      <p role="status">Znaleziono usług: {wyniki.length}</p>
      <ul className="grid">
        {wyniki.map((u) => (
          <li key={u.slug} className="card">
            <span className="tag">{u.kategoria}</span>
            <h2 style={{ fontSize: "1.1rem", margin: 0 }}><Link href={`/uslugi/${u.slug}`}>{u.nazwa}</Link></h2>
            <p>{u.opis}</p>
            <p className="hint">{u.online ? "Dostępna online" : "Tylko w urzędzie"}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
