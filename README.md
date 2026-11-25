# DEMO: portal e-usług urzędu – Next.js, React, TypeScript

> **Projekt pokazowy (portfolio) Isvero Studio, listopad 2026 r.** Nie jest to serwis żadnej instytucji ani realizacja dla klienta. „Gmina Przykładowo” i wszystkie dane są fikcyjne. Formularze nic nie zapisują ani nie wysyłają.

## Co pokazuje
- katalog e-usług z wyszukiwarką i filtrem kategorii (działa bez JS – formularz GET),
- karty usług (wymagane dokumenty, opłata, termin), generowane statycznie (SSG),
- formularz wniosku na **Server Actions**: walidacja po stronie serwera (w tym suma kontrolna PESEL), podsumowanie błędów z przeniesieniem fokusu, `aria-invalid` i `aria-describedby` przy polach, działanie bez JavaScriptu; PESEL nigdy nie wraca do przeglądarki,
- sprawdzanie statusu sprawy, deklaracja dostępności, strona 404, `robots.txt` i `noindex`, nagłówki bezpieczeństwa.

## Jakość
- TypeScript `strict` (`npm run lint`), testy jednostkowe `node:test` (`npm test`, 5 testów),
- testy dostępności axe-core (WCAG 2.0/2.1 A+AA) w Playwright na 10 widokach × 2 szerokości (1280 i 320 px) + scenariusz formularza (błędy → fokus → poprawne wysłanie): **0 naruszeń** (`npm run test:e2e`),
- Lighthouse mobile (25.11.2026): wydajność 96–98, dostępność 100, dobre praktyki 96 (SEO obniżone celowo przez noindex),
- `npm audit --omit=dev`: 0 podatności (nadpisane `postcss` i `sharp`).

## Technologia
Next.js 15 (App Router, React Server Components, Server Actions, output `standalone`), React 19, TypeScript 5, CSS bez frameworka, Docker (testy w trakcie budowy obrazu), Coolify.

## Uruchomienie
```bash
npm ci && npm run dev            # http://localhost:3000
docker compose up --build
npm test && npm run build && npm start & node tests/e2e/a11y.mjs   # wymaga playwright
```
