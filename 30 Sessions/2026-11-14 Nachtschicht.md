---
typ: session
datum: 2026-11-14
---
# Nachtschicht 14.11.2026

**Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ für [[Zählerschrank-Check]] schreiben (nur Vault, kein Code geändert).

**Ergebnis:** Neue Notiz [[Schutz von Idee und App]] (PR: PRLINK).
- Idee nicht schützbar; Code per Urheberrecht automatisch, Name per DPMA-Marke (ca. 290 €), Patent nicht sinnvoll.
- **Technischer Befund:** `web/src/regeln.json` und die Entscheidungslogik (`regelwerk.ts`) werden ins Bundle gebaut, das ganze Regelwerk liegt beim Nutzer offen. Lösung skizziert: Route `POST /bewerte` in der Edge Function.
- Verträge (Spielregeln für Tester, Nutzungsbedingungen mit Verbot von Reverse Engineering, Login) und Arbeitgeber-Frage als offene Frage für Anwalt markiert.
- In [[Aufgaben]] sechs Folgeaufgaben unter „Als Nächstes“ angelegt, darunter die Code-Aufgabe „Regelwerk serverseitig“.
- Annahmen: Ob du angestellt oder selbstständig bist, steht nirgends – ich bin vom ungünstigeren Fall ausgegangen. Gebühren sind Schätzungen nach meinem Wissensstand. Ob die GitHub-Repos privat sind, konnte ich nicht prüfen.

**Offen:**
- Weiter vorrangig: die 5 Gespräche mit Kollegen ([[Validierung & Go-No-Go]]). In den Notizen stehen 4 geführt, keine Auswertung im Vault gefunden.
- Schutz-Checkliste (10 Min.) und Arbeitsvertrag lesen.
- PR prüfen, mergen, dann Aufgabe abhaken; `git pull` im Vault.
