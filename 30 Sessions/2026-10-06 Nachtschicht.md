---
typ: session
datum: 2026-10-06
---
# 2026-10-06 Nachtschicht

**Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ als Wissensnotiz für [[Zählerschrank-Check]] schreiben (nur Vault, kein Code geändert).

**Ergebnis:**
- Neue Notiz [[Schutz von Idee und App]]: Schutzmöglichkeiten in Deutschland, technischer Befund, Verträge, Arbeitgeber-Frage, Tempo-Argument, priorisierte Maßnahmenliste. PR: PR_VAULT
- **Befund:** `regeln.json` und die komplette Regellogik liegen im App-Bundle (`web/src/regelwerk.ts`), die Edge Function kennt sie nicht. Das schwächt ein Geschäftsgeheimnis. Lösung skizziert: Route `/bewerte` in der Edge Function, App bekommt nur das Ergebnis.
- In [[Aufgaben]] vier neue Zeilen unter „Als Nächstes“, darunter die Code-Aufgabe „Regelwerk serverseitig“ für eine spätere Nachtschicht. Keine Code-Änderung, daher kein Code-PR.
- Angenommen: Kostenangaben (Marke ab ca. 290 €, Anwalt 300–800 €) sind Schätzungen aus dem Gedächtnis und müssen aktuell geprüft werden. Rechtsaussagen sind unverbindlich.

**Offen:**
1. PR mergen, danach „Schutzkonzept“ in [[Aufgaben]] abhaken.
2. Repo `zaehlerschrank-check` auf privat prüfen.
3. Arbeitsvertrag lesen, Fragen aus Abschnitt 4 der Notiz für Anwalt/Steuerberater sammeln.
4. Vorrang bleibt: **5 Gespräche bis 09.10.** Das Schutzkonzept ist kein Grund, sie zu verschieben.
5. Entscheiden, ob „Login statt Zugangscode“ vor dem Kollegen-Test vorgezogen wird.
