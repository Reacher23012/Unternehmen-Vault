---
typ: session
datum: 2026-10-29
---
# Nachtschicht 29.10.2026

**Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ als Notiz schreiben (nur Vault, kein Code).

**Ergebnis:** [[Schutz von Idee und App]] erstellt (schützbare Dinge, technischer Befund, Verträge, Arbeitgeber-Frage, Maßnahmenliste). PR: PR_LINK
- **Wichtigster Fund:** Der GitHub-Repo `Unternehmen-Vault` ist **öffentlich** und enthält das Regelwerk-Excel sowie Name/Anschrift. Sofort auf privat stellen.
- Technisch bestätigt: `regeln.json` und die komplette Logik in `regelwerk.ts` stecken im Browser-Bundle; Lösung `POST /bewerten` skizziert (mit Grenzen: Black-Box-Abfragen, Offline-Verlust).
- Neue Aufgaben in [[Aufgaben]] angelegt, darunter die Code-Aufgabe „Regelwerk serverseitig“.
- Es wurde kein Code geändert; Gespräche, Zugangsdaten und Rechtsprüfung waren nicht möglich.

**Offen:**
1. Repo `Unternehmen-Vault` auf privat stellen, Forks prüfen.
2. Arbeitsvertrag lesen und Arbeitgeber-Frage mit Anwalt/Steuerberater klären (vor Livegang).
3. Entscheiden, ob „Regelwerk serverseitig“ trotz Offline-Verlust gebaut wird (dann kurze ADR).
4. PR mergen, danach Aufgabe in [[Aufgaben]] abhaken. Weiter gilt Vorrang der Gespräche → [[Zählerschrank-Check]].
