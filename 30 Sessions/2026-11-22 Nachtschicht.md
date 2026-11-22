---
typ: session
datum: 2026-11-22
---
# 2026-11-22 Nachtschicht

**Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ für [[Zählerschrank-Check]] als Wissensnotiz schreiben (nur Vault, kein Code geändert).

**Ergebnis:**
- Neue Notiz [[Schutz von Idee und App]]: Schutzmöglichkeiten in Deutschland (Idee nicht schützbar; Code Urheberrecht; Marke DPMA; Regelwerk nur als Geschäftsgeheimnis mit Maßnahmen; Patent unrealistisch), Verträge, Arbeitgeber-Frage, Tempo/Daten, priorisierte Maßnahmenliste mit Kosten.
- **Technischer Befund bestätigt:** `web/src/regelwerk.ts` und `web/src/regeln.json` (26 Regeln mit Bedingung im Klartext und Fundstelle) landen im Browser-Bundle; der Zugangscode schützt sie nicht. Lösungsskizze: `POST /bewerte` in der Edge Function.
- In [[Aufgaben]] fünf Folgeaufgaben unter „Als Nächstes“ angelegt, darunter die Code-Aufgabe „Regelwerk serverseitig“ als eigene Zeile für eine spätere Nachtschicht.
- Projektnotiz ergänzt. Pull Request: siehe Anhang an die Aufgabe in [[Aufgaben]].
- Annahmen: Du bist (auch) angestellt im Elektrohandwerk (im Vault nicht belegt); Kosten sind Größenordnungen aus dem Gedächtnis; Rechtsaussagen sind Orientierung, vom Anwalt prüfen lassen.

**Offen (für dich):**
1. Arbeitsvertrag lesen und Herkunft der Westnetz-Schulung klären, bevor Tester Zugang bekommen.
2. Prüfen, ob beide GitHub-Repos auf „privat“ stehen.
3. Annahme in Abschnitt 4 der Notiz korrigieren, falls sie nicht stimmt.
4. Entscheiden, ob „Regelwerk serverseitig“ vor dem Kollegen-Test gebaut wird (Empfehlung: ja, vor Netlify-Livegang).
5. Hinweis: Seit dem 04.10. ist hier kein Gespräch dokumentiert. Die 5 Gespräche (Frist 09.10.) und Ergebnisse unter [[Validierung & Go-No-Go]] haben weiter Vorrang vor allem Schutzaufwand.
