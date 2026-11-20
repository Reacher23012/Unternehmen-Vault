---
typ: session
datum: 2026-11-20
---
# 2026-11-20 Nachtschicht

**Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ für [[Zählerschrank-Check]] als Wissensnotiz erstellen (nur Vault, kein Code geändert).

**Ergebnis:** [[Schutz von Idee und App]] geschrieben – PR: PRLINK
- Idee nicht schützbar; Code automatisch (Urheberrecht), Name per Marke (DPMA), Regelwerk nur als Geschäftsgeheimnis mit echten Geheimhaltungsmaßnahmen. Patent/Gebrauchsmuster: nicht verfolgen.
- **Technischer Befund bestätigt:** `regeln.json` und die Regellogik stecken im Browser-Bundle der App, Kopieren ist trivial. Lösung skizziert: Auswertung in die Edge Function, App bekommt nur Ergebnis + Fundstelle (Grenzen: Ausleseangriff durch systematisches Probieren, Offline-Modus).
- Arbeitgeber-Frage als offen für Anwalt markiert.
- Neue Aufgaben in [[Aufgaben]] unter „Als Nächstes“ (u. a. Code-Aufgabe „Regelwerk serverseitig“).

**Annahmen:** Nur der Code-Stand `master` (34e3b80) wurde gelesen, kein Bundle gebaut. Rechtsangaben und Gebühren sind Gedächtniswerte und müssen geprüft werden. Aufgabe in [[Aufgaben]] nicht abgehakt (erst nach Merge).

**Offen (für dich):**
1. PRs prüfen und mergen, dann Aufgabe abhaken.
2. Arbeitsvertrag lesen, Anwaltstermin zur Arbeitgeber-Frage vereinbaren.
3. Priorität bleibt: Gespräche mit Kollegen. Schutz-Code (Regelwerk serverseitig) vor dem öffentlichen Livegang, nicht davor.
