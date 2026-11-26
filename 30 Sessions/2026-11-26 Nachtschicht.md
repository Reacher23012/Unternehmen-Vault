---
typ: session
datum: 2026-11-26
---
# Nachtschicht 2026-11-26

**Ziel:** Aufgabe „Schutzkonzept Idee und App“ für [[Zählerschrank-Check]] als Analysenotiz erstellen (nur Vault, kein Code geändert).

**Ergebnis:**
- Neue Notiz [[Schutz von Idee und App]]: Schutzmöglichkeiten in Deutschland (Idee nicht schützbar; Urheberrecht, Marke, GeschGehG, Patent), technischer Befund, Verträge, Arbeitgeber-Frage, Schutz durch Tempo, priorisierte Maßnahmenliste mit Kosten.
- **Technischer Befund:** `web/src/regeln.json` wird über `regelwerk.ts` ins Client-Bundle gebaut, die Edge Function wertet keine Regeln aus. Das Regelwerk ist für jeden App-Nutzer kopierbar und erfüllt damit kaum die „angemessenen Geheimhaltungsmaßnahmen“ des GeschGehG. Lösung skizziert: `POST /bewerte` in der Edge Function.
- [[Aufgaben]]: 5 neue Zeilen unter „Als Nächstes“ (Arbeitsvertrag/Beratung, NDA, Nutzungsbedingungen, Code „Regelwerk serverseitig“, Marke); Ausgangsaufgabe nicht abgehakt, PR-Hinweis angehängt.
- PR Vault: siehe PR „Nachtschicht: Schutzkonzept“ (Zweig `nachtschicht/2026-11-26`). Kein Code-PR, weil die Aufgabe nur den Vault betrifft.

**Annahmen:** Kosten (Marke ca. 290 €, Beratung 0–250 €) sind grobe Schätzungen aus Allgemeinwissen, nicht recherchiert – vor Entscheidungen aktuell prüfen. Keine Rechtsberatung.

**Offen (für dich):**
1. Arbeitsvertrag lesen und die Arbeitgeber-Frage mit einem Anwalt/der HWK klären – vor der öffentlichen Veröffentlichung.
2. Die Notiz lesen und korrigieren, dann nach Merge die Aufgabe abhaken.
3. Weiter Vorrang: Gespräche mit Kollegen ([[Validierung & Go-No-Go]]). Die Code-Aufgabe „Regelwerk serverseitig“ kann eine spätere Nachtschicht umsetzen.
