"use server";
import { USLUGI } from "@/lib/uslugi";
import { waliduj, numerSprawy, type Bledy, type DaneWniosku } from "@/lib/walidacja";

export type Stan = { bledy: Bledy; wartosci: Partial<DaneWniosku>; numer?: string };

export async function wyslij(_prev: Stan, fd: FormData): Promise<Stan> {
  const d: DaneWniosku = {
    usluga: String(fd.get("usluga") ?? ""),
    imie: String(fd.get("imie") ?? ""),
    nazwisko: String(fd.get("nazwisko") ?? ""),
    email: String(fd.get("email") ?? ""),
    telefon: String(fd.get("telefon") ?? "") || undefined,
    pesel: String(fd.get("pesel") ?? "") || undefined,
    tresc: String(fd.get("tresc") ?? ""),
    zgoda: fd.get("zgoda") === "on",
  };
  const bledy = waliduj(d, USLUGI.filter((u) => u.online).map((u) => u.slug));
  const { pesel: _pominiety, ...bezPesel } = d; // PESEL nigdy nie wraca do przeglądarki
  if (Object.keys(bledy).length) return { bledy, wartosci: bezPesel };
  // DEMO: nic nie zapisujemy i nic nie wysyłamy.
  return { bledy: {}, wartosci: {}, numer: numerSprawy(d.usluga + d.email + Date.now()) };
}
