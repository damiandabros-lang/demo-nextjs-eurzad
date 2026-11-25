import type { Metadata } from "next";
import { USLUGI } from "@/lib/uslugi";
import { Formularz } from "./formularz";

export const metadata: Metadata = { title: "Złóż wniosek" };

export default async function Wniosek({ searchParams }: { searchParams: Promise<{ usluga?: string }> }) {
  const { usluga } = await searchParams;
  return (
    <>
      <h1>Złóż wniosek</h1>
      <ol className="steps" aria-label="Etapy">
        <li aria-current="step">1. Dane i treść</li><li>2. Potwierdzenie</li>
      </ol>
      <Formularz uslugi={USLUGI.filter((u) => u.online)} domyslna={usluga} />
    </>
  );
}
