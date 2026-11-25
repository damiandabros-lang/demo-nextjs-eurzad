export type Usluga = {
  slug: string;
  nazwa: string;
  kategoria: "Mieszkańcy" | "Podatki i opłaty" | "Środowisko" | "Przedsiębiorcy";
  opis: string;
  wymagane: string[];
  oplata: string;
  termin: string;
  online: boolean;
  zrodlo?: { url: string; nazwa: string };
};

/** Katalog e-usług fikcyjnej Gminy Przykładowo (DEMO). */
export const USLUGI: Usluga[] = [
  { slug: "deklaracja-odpady", nazwa: "Deklaracja o wysokości opłaty za odpady", kategoria: "Środowisko", opis: "Złożenie lub zmiana deklaracji śmieciowej dla nieruchomości zamieszkałej.", wymagane: ["dane właściciela", "adres nieruchomości", "liczba osób"], oplata: "bez opłat", termin: "Pierwsza deklaracja: 14 dni od zamieszkania pierwszego mieszkańca. Zmiana danych wpływających na opłatę: do 10. dnia miesiąca następującego po miesiącu zmiany.", online: true },
  { slug: "zaswiadczenie-przeznaczenie", nazwa: "Zaświadczenie o przeznaczeniu działki", kategoria: "Mieszkańcy", opis: "Informacja o przeznaczeniu działki w planie miejscowym.", wymagane: ["numer działki", "obręb ewidencyjny"], oplata: "17 zł (opłata skarbowa za zaświadczenie)", termin: "do 7 dni", online: true },
  { slug: "podatek-nieruchomosci", nazwa: "Informacja o nieruchomościach i obiektach budowlanych (IN-1)", kategoria: "Podatki i opłaty", opis: "Zgłoszenie nabycia, zbycia lub zmiany nieruchomości – podatek od nieruchomości.", wymagane: ["informacja IN-1 (dla osób fizycznych)", "odpowiednie załączniki ZIN-1, ZIN-2 lub ZIN-3", "dane podatnika i nieruchomości; dodatkowe dokumenty zależnie od sprawy"], oplata: "bez opłat", termin: "14 dni od zdarzenia", online: true },
  { slug: "zajecie-pasa", nazwa: "Zezwolenie na zajęcie pasa drogowego", kategoria: "Przedsiębiorcy", opis: "Zajęcie pasa drogi gminnej na czas robót lub umieszczenia urządzeń.", wymagane: ["plan sytuacyjny", "harmonogram robót"], oplata: "według stawek uchwały (przykład)", termin: "do 30 dni", online: false },
  { slug: "wycinka-drzew", nazwa: "Zgłoszenie wycinki drzew", kategoria: "Środowisko", opis: "Zgłoszenie zamiaru usunięcia drzewa z nieruchomości stanowiącej własność osoby fizycznej, na cel niezwiązany z działalnością gospodarczą. Obowiązek zgłoszenia zależy m.in. od gatunku i obwodu pnia; nie każda wycinka go wymaga.", wymagane: ["numer działki", "gatunek i obwód drzewa", "rysunek lokalizacji"], oplata: "bez opłat", termin: "Do 21 dni od doręczenia zgłoszenia na oględziny; następnie 14 dni od oględzin na wniesienie sprzeciwu przez organ.", online: true, zrodlo: { url: "https://www.gov.pl/web/gdos/ochrona-zadrzewien", nazwa: "Zasady ochrony zadrzewień — GDOŚ" } },
];

export const kategorie = Array.from(new Set(USLUGI.map((u) => u.kategoria)));
export const znajdz = (slug: string) => USLUGI.find((u) => u.slug === slug);
