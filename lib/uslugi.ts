export type Usluga = {
  slug: string;
  nazwa: string;
  kategoria: "Mieszkańcy" | "Podatki i opłaty" | "Środowisko" | "Przedsiębiorcy";
  opis: string;
  wymagane: string[];
  oplata: string;
  termin: string;
  online: boolean;
};

/** Katalog e-usług fikcyjnej Gminy Przykładowo (DEMO). */
export const USLUGI: Usluga[] = [
  { slug: "deklaracja-odpady", nazwa: "Deklaracja o wysokości opłaty za odpady", kategoria: "Środowisko", opis: "Złożenie lub zmiana deklaracji śmieciowej dla nieruchomości zamieszkałej.", wymagane: ["dane właściciela", "adres nieruchomości", "liczba osób"], oplata: "bez opłat", termin: "14 dni od zamieszkania lub zmiany", online: true },
  { slug: "zaswiadczenie-przeznaczenie", nazwa: "Zaświadczenie o przeznaczeniu działki", kategoria: "Mieszkańcy", opis: "Informacja o przeznaczeniu działki w planie miejscowym.", wymagane: ["numer działki", "obręb ewidencyjny"], oplata: "17 zł (opłata skarbowa za zaświadczenie)", termin: "do 7 dni", online: true },
  { slug: "podatek-nieruchomosci", nazwa: "Informacja o nieruchomościach i obiektach budowlanych (IN-1)", kategoria: "Podatki i opłaty", opis: "Zgłoszenie nabycia, zbycia lub zmiany nieruchomości – podatek od nieruchomości.", wymagane: ["dane podatnika", "dane nieruchomości", "akt notarialny (skan)"], oplata: "bez opłat", termin: "14 dni od zdarzenia", online: true },
  { slug: "zajecie-pasa", nazwa: "Zezwolenie na zajęcie pasa drogowego", kategoria: "Przedsiębiorcy", opis: "Zajęcie pasa drogi gminnej na czas robót lub umieszczenia urządzeń.", wymagane: ["plan sytuacyjny", "harmonogram robót"], oplata: "według stawek uchwały (przykład)", termin: "do 30 dni", online: false },
  { slug: "wycinka-drzew", nazwa: "Zgłoszenie wycinki drzew", kategoria: "Środowisko", opis: "Zgłoszenie zamiaru usunięcia drzewa z nieruchomości osoby fizycznej.", wymagane: ["numer działki", "gatunek i obwód drzewa", "rysunek lokalizacji"], oplata: "bez opłat", termin: "21 dni na oględziny", online: true },
];

export const kategorie = Array.from(new Set(USLUGI.map((u) => u.kategoria)));
export const znajdz = (slug: string) => USLUGI.find((u) => u.slug === slug);
