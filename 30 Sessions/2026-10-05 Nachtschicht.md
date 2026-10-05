---
typ: session
datum: 2026-10-05
projekt: "[[Zählerschrank-Check]]"
---
# 2026-10-05 Nachtschicht

## Ziel
Schutzkonzept „Idee und App vor Diebstahl schützen“ als Wissensnotiz schreiben (nur Vault, kein Code geändert).

## Ergebnis
PR: https://github.com/Reacher23012/Unternehmen-Vault/pull/3
- Neue Notiz [[Schutz von Idee und App]]: schützbar sind Code (Urheberrecht), Name (Marke) und geheim gehaltenes Know-how (GeschGehG); die Idee selbst nicht; Patent nicht empfohlen.
- **Technischer Befund bestätigt:** `web/src/regeln.json` und die Logik in `regelwerk.ts` werden ins App-Bundle gebaut, das ganze Regelwerk liegt beim Nutzer im Browser. Lösung skizziert: Auswertung in die Edge Function (`POST /bewerten`).
- Arbeitgeber-Frage als offene Frage für Anwalt/Steuerberater markiert (nicht beurteilt, Vertrag unbekannt).
- Neue Aufgaben in [[Aufgaben]] unter „Als Nächstes“, darunter „Regelwerk serverseitig“ als eigene Code-Zeile.
- Annahme: Gebühren und Kosten sind Größenordnungen aus Allgemeinwissen, vor Ausgabe aktuell prüfen. Keine Rechtsberatung.
- PR im Code-Repo: keiner (Aufgabe war ausdrücklich nur Vault).

## Offen
1. Notiz lesen, Annahmen korrigieren, Arbeitsvertrag nachlesen und Anwalt-Termin planen.
2. Prüfen, ob das GitHub-Repo `zaehlerschrank-check` privat ist (konnte die Nachtschicht nicht beurteilen).
3. Vorrang bleibt: 5 Gespräche bis 09.10. ([[Gesprächsleitfaden]]). „Regelwerk serverseitig“ erst vor dem Livegang.
