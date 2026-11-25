import type { Metadata } from "next";
import { USLUGI } from "@/lib/uslugi";
import { Formularz } from "./formularz";

export const metadata: Metadata = { title: "Złóż wniosek" };

export default async function Wniosek({ searchParams }: { searchParams: Promise<{ usluga?: string }> }) {
  const { usluga } = await searchParams;
  return (
    <>
      <h1>Złóż wniosek</h1>
      <Formularz uslugi={USLUGI.filter((u) => u.online)} domyslna={usluga} />
    </>
  );
}
