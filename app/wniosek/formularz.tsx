"use client";
import { useActionState, useEffect, useRef } from "react";
import { wyslij, type Stan } from "./actions";
import type { Usluga } from "@/lib/uslugi";

function Etapy({ gotowe = false }: { gotowe?: boolean }) {
  return <ol className="steps" aria-label="Etapy"><li aria-current={!gotowe ? "step" : undefined}>1. Dane i treść</li><li aria-current={gotowe ? "step" : undefined}>2. Potwierdzenie</li></ol>;
}

const POLA: Record<string, string> = { usluga: "Usługa", imie: "Imię", nazwisko: "Nazwisko", email: "E-mail", telefon: "Telefon", pesel: "PESEL", tresc: "Opis sprawy", zgoda: "Zgoda" };

export function Formularz({ uslugi, domyslna }: { uslugi: Usluga[]; domyslna?: string }) {
  const [stan, akcja, trwa] = useActionState<Stan, FormData>(wyslij, { bledy: {}, wartosci: { usluga: domyslna } });
  const podsumowanie = useRef<HTMLDivElement>(null);
  const sukces = useRef<HTMLDivElement>(null);
  const b = stan.bledy;
  const w = stan.wartosci;
  useEffect(() => { if (Object.keys(b).length) podsumowanie.current?.focus(); else if (stan.numer) sukces.current?.focus(); }, [stan, b]);

  if (stan.numer) {
    return (
      <>
      <Etapy gotowe />
      <div className="success" role="status" tabIndex={-1} ref={sukces}>
        <h2>Wniosek przyjęty (demo)</h2>
        <p>Numer sprawy: <strong>{stan.numer}</strong>. W wersji demonstracyjnej dane nie zostały zapisane ani wysłane.</p>
        <p><a href={`/status?numer=${encodeURIComponent(stan.numer)}`}>Sprawdź status tej sprawy</a></p>
      </div>
      </>
    );
  }
  const opis = (pole: string, hint?: string) => [hint, b[pole as keyof typeof b] ? `${pole}-err` : undefined].filter(Boolean).join(" ") || undefined;
  return (
    <>
    <Etapy />
    <form action={akcja} noValidate>
      {Object.keys(b).length > 0 && (
        <div className="error-summary" role="alert" tabIndex={-1} ref={podsumowanie} aria-labelledby="bledy-h">
          <h2 id="bledy-h">Popraw błędy w formularzu ({Object.keys(b).length})</h2>
          <ul>{Object.entries(b).map(([k, v]) => <li key={k}><a href={`#${k}`}>{POLA[k]}: {v}</a></li>)}</ul>
        </div>
      )}
      <p className="hint">Używaj wyłącznie fikcyjnych danych. Nie wpisuj prawdziwego numeru PESEL.</p>
      <p className="hint">Pola oznaczone gwiazdką (*) są wymagane.</p>
      <div className="field">
        <label htmlFor="usluga">Usługa *</label>
        <select id="usluga" name="usluga" required defaultValue={w.usluga ?? ""} aria-invalid={!!b.usluga} aria-describedby={opis("usluga")}>
          <option value="">– wybierz –</option>
          {uslugi.map((u) => <option key={u.slug} value={u.slug}>{u.nazwa}</option>)}
        </select>
        {b.usluga && <p className="err" id="usluga-err">{b.usluga}</p>}
      </div>
      <fieldset className="field">
        <legend>Dane wnioskodawcy</legend>
        <div className="field"><label htmlFor="imie">Imię *</label><input id="imie" name="imie" required autoComplete="given-name" defaultValue={w.imie} aria-invalid={!!b.imie} aria-describedby={opis("imie")} />{b.imie && <p className="err" id="imie-err">{b.imie}</p>}</div>
        <div className="field"><label htmlFor="nazwisko">Nazwisko *</label><input id="nazwisko" name="nazwisko" required autoComplete="family-name" defaultValue={w.nazwisko} aria-invalid={!!b.nazwisko} aria-describedby={opis("nazwisko")} />{b.nazwisko && <p className="err" id="nazwisko-err">{b.nazwisko}</p>}</div>
        <div className="field"><label htmlFor="email">E-mail *</label><input id="email" name="email" required type="email" autoComplete="email" defaultValue={w.email} aria-invalid={!!b.email} aria-describedby={opis("email")} />{b.email && <p className="err" id="email-err">{b.email}</p>}</div>
        <div className="field"><label htmlFor="telefon">Telefon</label><input id="telefon" name="telefon" type="tel" autoComplete="tel" defaultValue={w.telefon} aria-invalid={!!b.telefon} aria-describedby={opis("telefon")} />{b.telefon && <p className="err" id="telefon-err">{b.telefon}</p>}</div>
        <div className="field"><label htmlFor="pesel">PESEL</label><input id="pesel" name="pesel" inputMode="numeric" autoComplete="off" aria-invalid={!!b.pesel} aria-describedby={opis("pesel", "pesel-hint")} /><p className="hint" id="pesel-hint">Opcjonalnie. W demo sprawdzamy tylko sumę kontrolną i nie zapisujemy numeru.</p>{b.pesel && <p className="err" id="pesel-err">{b.pesel}</p>}</div>
      </fieldset>
      <div className="field"><label htmlFor="tresc">Opis sprawy *</label><textarea id="tresc" name="tresc" required rows={6} defaultValue={w.tresc} aria-invalid={!!b.tresc} aria-describedby={opis("tresc")} />{b.tresc && <p className="err" id="tresc-err">{b.tresc}</p>}</div>
      <div className="field check"><input id="zgoda" name="zgoda" required type="checkbox" defaultChecked={!!w.zgoda} aria-invalid={!!b.zgoda} aria-describedby={opis("zgoda")} /><label htmlFor="zgoda">Zapoznałem(-am) się z informacją o przetwarzaniu danych (demo). *</label></div>
      {b.zgoda && <p className="err" id="zgoda-err">{b.zgoda}</p>}
      <button className="btn" type="submit" disabled={trwa} aria-disabled={trwa}>{trwa ? "Wysyłanie…" : "Wyślij wniosek"}</button>
    </form>
    </>
  );
}
