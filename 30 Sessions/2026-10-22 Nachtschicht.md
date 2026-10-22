---
typ: session
datum: 2026-10-22
---
# 2026-10-22 Nachtschicht

**Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ für [[Zählerschrank-Check]] als Wissensnotiz schreiben (nur Vault, kein Code geändert).

**Ergebnis:**
- Neue Notiz [[Schutz von Idee und App]]: Was ist schützbar, Technikbefund, Verträge, Arbeitgeber-Frage, Schutz durch Tempo, priorisierte Maßnahmen.
- **Befund:** `web/src/regeln.json` und die gesamte Regellogik (`regelwerk.ts`) laufen im Browser, das Regelwerk ist also für jeden Nutzer auslesbar. Lösung skizziert: `POST /bewerten` in der Edge Function.
- Vier neue Aufgaben unter „Als Nächstes“ in [[Aufgaben]] (u. a. Code-Aufgabe „Regelwerk serverseitig“ für eine spätere Nachtschicht).
- Annahmen: Gesetzesangaben und Kosten aus allgemeinem Wissen, nicht recherchiert; alles Juristische ist als „Anwalt“ markiert.
- PR: siehe Aufgabe in [[Aufgaben]] (Vault-PR vom 22.10.2026).

**Offen:**
- Notiz lesen, Annahmen korrigieren; Arbeitsvertrag heraussuchen (Nebentätigkeit, Wettbewerb).
- Entscheiden, ob „Regelwerk serverseitig“ vor dem Mittesten mit den 4 Testern passiert.
- Weiter vorrangig: Gespräche mit Kollegen und Auswertung in [[Validierung & Go-No-Go]]; API-Schlüssel/`APP_CODE` für das Mittesten eintragen.
- PR mergen, dann „Jetzt“-Aufgabe abhaken.
