import type { Metadata } from "next";
export const metadata: Metadata = { title: "Deklaracja dostępności" };

export default function Dostepnosc() {
  return (
    <>
      <h1>Deklaracja dostępności (DEMO)</h1>
      <p>Przykładowa deklaracja dla fikcyjnej Gminy Przykładowo według wzoru do ustawy z dnia 4 kwietnia 2019 r. o dostępności cyfrowej stron internetowych i aplikacji mobilnych podmiotów publicznych.</p>
      <h2>Stan dostępności cyfrowej</h2>
      <p>Serwis jest projektowany pod WCAG 2.1 na poziomie AA. Wyniki testów automatycznych axe-core: 0 naruszeń na wszystkich podstronach (desktop i mobile). Formularze działają bez JavaScriptu, błędy są wskazywane w podsumowaniu i przy polach, fokus przenosi się do podsumowania błędów.</p>
      <h2>Informacje zwrotne i dane kontaktowe</h2>
      <p>Koordynator do spraw dostępności (osoba fikcyjna): <a href="mailto:dostepnosc@example.org">dostepnosc@example.org</a>, tel. 00 000 00 00.</p>
      <p>Każdy ma prawo wystąpić z żądaniem zapewnienia dostępności cyfrowej. Podmiot zrealizuje żądanie nie później niż w ciągu 7 dni. Po wyczerpaniu procedury można złożyć wniosek do Rzecznika Praw Obywatelskich.</p>
    </>
  );
}
