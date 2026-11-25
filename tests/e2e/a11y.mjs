// Testy dostępności axe-core (WCAG 2.0/2.1 A+AA) + scenariusz formularza z klawiatury.
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const axe = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const BASE = process.argv[2] || "http://127.0.0.1:3000";
const PAGES = ["/", "/uslugi", "/uslugi?q=zaś", "/uslugi/deklaracja-odpady", "/wniosek", "/status", "/status?numer=EU/2026/00012", "/status?numer=zly", "/dostepnosc", "/nie-ma"];
let fails = 0;
const b = await chromium.launch();
async function check(pg, label) {
  await pg.addScriptTag({ content: axe });
  const r = await pg.evaluate(() => axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] }));
  const over = await pg.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
  if (r.violations.length || over) { fails += r.violations.length + (over ? 1 : 0); console.log("FAIL", label, over ? "H-SCROLL" : "", r.violations.map((v) => `${v.id}:${v.nodes[0].target}`)); }
}
for (const vp of [{ width: 1280, height: 900 }, { width: 320, height: 640 }]) {
  const ctx = await b.newContext({ viewport: vp }); const pg = await ctx.newPage();
  for (const p of PAGES) { await pg.goto(BASE + p); await check(pg, `${vp.width} ${p}`); }
  // Formularz: wyślij pusty → podsumowanie błędów z fokusem, potem poprawnie → numer sprawy.
  await pg.goto(BASE + "/wniosek");
  await pg.click("button[type=submit]");
  await pg.waitForSelector(".error-summary");
  const focused = await pg.evaluate(() => document.activeElement?.className);
  if (focused !== "error-summary") { fails++; console.log("FAIL fokus nie na podsumowaniu błędów:", focused); }
  await check(pg, `${vp.width} /wniosek (błędy)`);
  await pg.selectOption("#usluga", "deklaracja-odpady");
  await pg.fill("#imie", "Jan"); await pg.fill("#nazwisko", "Przykładowy"); await pg.fill("#email", "jan@example.org");
  await pg.fill("#tresc", "Zmiana liczby osób w deklaracji."); await pg.check("#zgoda");
  await pg.keyboard.press("Tab");
  await pg.click("button[type=submit]");
  await pg.waitForSelector(".success");
  await check(pg, `${vp.width} /wniosek (sukces)`);
  await ctx.close();
}
await b.close();
console.log(fails ? `NARUSZENIA: ${fails}` : "OK: 0 naruszeń");
process.exit(fails ? 1 : 0);
