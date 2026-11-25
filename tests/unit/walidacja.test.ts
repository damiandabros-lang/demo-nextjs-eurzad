import { test } from "node:test";
import assert from "node:assert/strict";
import { poprawnyPesel, waliduj, numerSprawy } from "../../lib/walidacja.ts";

const ok = { usluga: "a", imie: "Jan", nazwisko: "Przykładowy", email: "jan@example.org", tresc: "Proszę o zaświadczenie", zgoda: true };

test("PESEL: suma kontrolna", () => {
  assert.equal(poprawnyPesel("44051401359"), true);
  assert.equal(poprawnyPesel("44051401358"), false);
  assert.equal(poprawnyPesel("123"), false);
});
test("poprawny wniosek nie ma błędów", () => assert.deepEqual(waliduj(ok, ["a"]), {}));
test("puste pola i zła usługa dają komunikaty", () => {
  const b = waliduj({ ...ok, usluga: "x", imie: "", email: "zly", zgoda: false }, ["a"]);
  assert.deepEqual(Object.keys(b).sort(), ["email", "imie", "usluga", "zgoda"]);
});
test("zły PESEL jest odrzucany", () => assert.ok(waliduj({ ...ok, pesel: "11111111111" }, ["a"]).pesel));
test("numer sprawy ma format EU/RRRR/NNNNN", () => assert.match(numerSprawy("abc", new Date("2026-11-25")), /^EU\/2026\/\d{5}$/));


test("telefon: liczymy cyfry, nie separatory", () => {
  for (const telefon of [undefined, "", "   ", "123456789", "+48 123-456-789"]) {
    assert.equal(waliduj({ ...ok, telefon }, ["a"]).telefon, undefined);
  }
  for (const telefon of ["---------", "12-------", "12345678", "1234567890123456", "12+3456789", "abcdefghi"]) {
    assert.ok(waliduj({ ...ok, telefon }, ["a"]).telefon, telefon);
  }
});
