/** Walidacja formularza wniosku – wspólna dla serwera i testów. */
export type DaneWniosku = {
  usluga: string;
  imie: string;
  nazwisko: string;
  email: string;
  telefon?: string;
  pesel?: string;
  tresc: string;
  zgoda: boolean;
};
export type Bledy = Partial<Record<keyof DaneWniosku, string>>;

/** Suma kontrolna PESEL (wagi 1-3-7-9). Demo nie zapisuje numeru – sprawdza tylko poprawność. */
export function poprawnyPesel(p: string): boolean {
  if (!/^\d{11}$/.test(p)) return false;
  const w = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  const s = w.reduce((acc, waga, i) => acc + waga * Number(p[i]), 0);
  return (10 - (s % 10)) % 10 === Number(p[10]);
}

export function waliduj(d: DaneWniosku, slugi: string[]): Bledy {
  const b: Bledy = {};
  if (!slugi.includes(d.usluga)) b.usluga = "Wybierz usługę z listy.";
  if (d.imie.trim().length < 2) b.imie = "Podaj imię (co najmniej 2 znaki).";
  if (d.nazwisko.trim().length < 2) b.nazwisko = "Podaj nazwisko (co najmniej 2 znaki).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) b.email = "Podaj poprawny adres e-mail, np. jan@example.org.";
  const telefon = d.telefon?.trim() ?? "";
  const cyfryTelefonu = telefon.replace(/[\s-]/g, "");
  if (telefon && (!/^\+?[\d\s-]+$/.test(telefon) || !/^\+?\d{9,15}$/.test(cyfryTelefonu))) b.telefon = "Podaj numer telefonu (9–15 cyfr; możesz użyć spacji i myślników).";
  if (d.pesel && !poprawnyPesel(d.pesel.trim())) b.pesel = "Numer PESEL jest niepoprawny (sprawdź 11 cyfr).";
  if (d.tresc.trim().length < 10) b.tresc = "Opisz sprawę (co najmniej 10 znaków).";
  if (!d.zgoda) b.zgoda = "Potwierdź zapoznanie się z informacją o przetwarzaniu danych.";
  return b;
}

/** Deterministyczny numer sprawy demo z treści – bez zapisu danych. */
export function numerSprawy(seed: string, data = new Date()): string {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return `EU/${data.getFullYear()}/${String(h % 100000).padStart(5, "0")}`;
}
