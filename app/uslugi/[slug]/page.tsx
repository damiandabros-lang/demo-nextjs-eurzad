import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { USLUGI, znajdz } from "@/lib/uslugi";

export function generateStaticParams() { return USLUGI.map((u) => ({ slug: u.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const u = znajdz((await params).slug);
  return { title: u?.nazwa ?? "Usługa", description: u?.opis };
}

export default async function Karta({ params }: { params: Promise<{ slug: string }> }) {
  const u = znajdz((await params).slug);
  if (!u) notFound();
  return (
    <>
      <nav aria-label="Okruszki"><Link href="/uslugi">Katalog e-usług</Link> › <span aria-current="page">{u.nazwa}</span></nav>
      <h1>{u.nazwa}</h1>
      <p>{u.opis}</p>
      <dl className="meta">
        <dt>Kategoria</dt><dd>{u.kategoria}</dd>
        <dt>Opłata</dt><dd>{u.oplata}</dd>
        <dt>Termin</dt><dd>{u.termin}</dd>
        <dt>Sposób załatwienia</dt><dd>{u.online ? "online lub w urzędzie" : "w urzędzie"}</dd>
      </dl>
      <h2>Co przygotować</h2>
      <ul>{u.wymagane.map((w) => <li key={w}>{w}</li>)}</ul>
      {u.zrodlo && <p className="hint">Sprawdź zasady i wyjątki: <a href={u.zrodlo.url}>{u.zrodlo.nazwa}</a>. Ta karta jest przykładem demonstracyjnym.</p>}
      {u.online && <p><Link className="btn" href={`/wniosek?usluga=${u.slug}`}>Złóż wniosek online</Link></p>}
    </>
  );
}
