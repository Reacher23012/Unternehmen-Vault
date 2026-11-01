---
typ: session
datum: 2026-11-01
---
# Nachtschicht 2026-11-01

**Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ als Notiz schreiben (nur Vault, keine Rechtsberatung).

**Ergebnis:**
- [[Schutz von Idee und App]] geschrieben: Was in Deutschland schützbar ist, technischer Befund, Verträge, Arbeitgeber-Frage, Schutz durch Tempo, priorisierte Maßnahmenliste.
- **Technischer Befund (am Code geprüft):** `web/src/regeln.json` und die gesamte Logik in `web/src/regelwerk.ts` werden ins App-Bundle gebaut. Nach dem Livegang kann jeder mit der Adresse das Regelwerk lesen; der Zugangscode schützt nur die Backend-Routen. Lösungsskizze: Auswertung per `POST /bewerte` in der Edge Function (Nachteil: Bewertung braucht Netz).
- In [[Aufgaben]] vier neue Zeilen unter „Als Nächstes“ (Arbeitsvertrag/Anwalt, Repos privat + 2FA, NDA/Nutzungsbedingungen, Code-Aufgabe „Regelwerk serverseitig“), Stand in [[Zählerschrank-Check]] ergänzt.
- Vault-PR: https://github.com/Reacher23012/Unternehmen-Vault/pull/28. Der Code wurde nicht geändert, daher kein Code-PR.

**Annahmen:** Gebühren (Marke ca. 300 €) und Paragrafen aus dem Gedächtnis, nicht gegen aktuelle Quellen geprüft, deshalb als „vor Entscheidung nachsehen“ markiert. Den Arbeitsvertrag kenne ich nicht.

**Offen:**
1. Arbeitsvertrag lesen und Erstberatung beim Anwalt (wichtigster Punkt).
2. GitHub-Repos privat halten, 2FA prüfen.
3. Entscheiden, ob die Regelauswertung serverseitig laufen soll (Offline-Nachteil im Keller), dann ADR schreiben; erst danach kann eine Nachtschicht die Code-Aufgabe umsetzen.
4. Der Stand in [[Aufgaben]] ist seit 04.10. unverändert: Ergebnisse der Gespräche in [[Validierung & Go-No-Go]] eintragen; sie haben weiter Vorrang vor allem hier.
