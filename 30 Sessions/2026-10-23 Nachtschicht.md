---
typ: session
datum: 2026-10-23
---
# Nachtschicht 23.10.2026

**Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ für [[Zählerschrank-Check]] als Wissensnotiz erarbeiten (nur Vault, kein Code geändert).

**Ergebnis:**
- Neue Notiz [[Schutz von Idee und App]]: Was ist schützbar (Idee nein, Code ja, Name per Marke, Regelwerk nur als Geschäftsgeheimnis), Verträge, Arbeitgeber-Frage, Schutz durch Tempo, priorisierte Maßnahmenliste mit Kosten.
- **Technischer Befund:** `web/src/regeln.json` und die Auslöse-Logik (`regelwerk.ts`) werden ins Browser-Bundle gebaut; `bewerte()` läuft im Browser. Der `APP_CODE` schützt nur das Backend. Sobald die App öffentlich liegt, ist das Regelwerk für jeden lesbar. Lösungsskizze: `POST /bewerten` in der Edge Function, App bekommt nur Ergebnis + Fundstelle.
- Vier neue Zeilen unter „Als Nächstes“ in [[Aufgaben]], darunter die Code-Aufgabe „Regelwerk serverseitig“ für eine spätere Nachtschicht. Projektnotiz ergänzt.
- Annahmen: Gebühren- und Rechtsangaben (DPMA ca. 290 €, Anwaltskosten) stammen aus allgemeinem Wissen, nicht recherchiert, und sind in der Notiz als 🔶 „prüfen lassen“ markiert. Es wurde keine Rechtsberatung gegeben. Die Aufgaben „Jetzt“ vom 04.10. (Gespräche, API-Schlüssel) sind unverändert offen; sie brauchen Zugangsdaten bzw. echte Gespräche.

**Offen (für dich):**
1. Arbeitsvertrag lesen, Fragen aus Abschnitt 4 sammeln, ein Erstgespräch mit Anwalt/Handwerkskammer vereinbaren.
2. Entscheiden: App bis zum Umbau „Regelwerk serverseitig“ nicht öffentlich hosten (Landingpage zuerst). Das verschiebt die Netlify-Aufgabe für die App.
3. Die Aufgabe „Regelwerk serverseitig“ kann eine nächste Nachtschicht umsetzen (reine Code-Arbeit, keine Zugangsdaten); Edge Function muss danach von dir neu eingespielt werden.
4. Weiter vorrangig: die Gespräche mit Kollegen ([[Gesprächsleitfaden]]) – der Vault zeigt seit dem 04.10. keine neuen Ergebnisse.
