---
typ: session
datum: 2026-10-15
---
# 2026-10-15 Nachtschicht

**Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ für [[Zählerschrank-Check]] als Wissensnotiz schreiben (nur Vault, kein Code geändert).

## Ergebnis
- Neue Notiz [[Schutz von Idee und App]]: schützbar ist Code (Urheberrecht), Name (Marke), Regelwerk nur als Geschäftsgeheimnis; Idee und Software-Patent nicht.
- **Technischer Befund bestätigt:** `web/src/regeln.json` (26 Regeln, 14 KB) wird über `regelwerk.ts` ins Bundle gebaut und `bewerte()` läuft im Browser. Nach dem Hosting hätte jeder Besucher das ganze Regelwerk, auch ohne Zugangscode. Lösung skizziert: Auswertung serverseitig.
- Priorisierte Maßnahmenliste mit Kosten; vier neue Aufgaben unter „Als Nächstes“ in [[Aufgaben]] (u. a. „Regelwerk serverseitig“ als eigene Code-Zeile).
- PR: https://github.com/Reacher23012/Unternehmen-Vault/pull/13

**Annahmen:** Rechtliches aus allgemeinem Wissen, nicht gegen aktuelle Quellen geprüft; Gebührenangaben (DPMA) ungeprüft und als solche markiert.

## Offen
1. Arbeitsvertrag lesen und die Arbeitgeber-Frage klären (Anwalt/Steuerberater) – vor dem ersten Euro.
2. NDA-Vorlage für die 4 Tester prüfen lassen.
3. Weiter vorrangig: die Gespräche mit Kollegen ([[Validierung & Go-No-Go]]); die Nachtschicht-Aufgabe „Regelwerk serverseitig“ erst nach Go.
