import type { Metadata } from "next";
export const metadata: Metadata = { title: "Sprawdź status sprawy" };

const ETAPY = ["Wniosek przyjęty", "Przekazany do referatu", "W trakcie rozpatrywania", "Załatwiony"];

export default async function Status({ searchParams }: { searchParams: Promise<{ numer?: string }> }) {
  const { numer = "" } = await searchParams;
  const ok = /^EU\/\d{4}\/\d{5}$/.test(numer.trim());
  const etap = ok ? Number(numer.slice(-1)) % ETAPY.length : -1;
  return (
    <>
      <h1>Sprawdź status sprawy</h1>
      <form method="get" role="search" aria-label="Status sprawy">
        <div className="field"><label htmlFor="numer">Numer sprawy</label><input id="numer" name="numer" defaultValue={numer} aria-describedby="numer-hint" /><p className="hint" id="numer-hint">Format: EU/2026/01234</p></div>
        <button className="btn" type="submit">Sprawdź</button>
      </form>
      {numer && !ok && <p className="err" role="alert">Niepoprawny format numeru sprawy.</p>}
      {ok && (
        <section aria-labelledby="wynik-h" className="success" role="status">
          <h2 id="wynik-h">Sprawa {numer} (dane demonstracyjne)</h2>
          <ol>{ETAPY.map((e, i) => <li key={e} aria-current={i === etap ? "step" : undefined}>{e}{i < etap ? " – zakończono" : i === etap ? " – obecny etap" : ""}</li>)}</ol>
        </section>
      )}
    </>
  );
}
