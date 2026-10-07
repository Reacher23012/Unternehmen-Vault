---
typ: session
datum: 2026-10-07
---
# Nachtschicht 07.10.2026

- **Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ als Analyse für den [[Zählerschrank-Check]] schreiben (nur Vault, kein Code geändert).
- **Ergebnis:** Neue Notiz [[Schutz von Idee und App]] (PR: https://github.com/Reacher23012/Unternehmen-Vault/pull/5).
  - Schützbar: Code (Urheberrecht, automatisch), Name (Marke DPMA, ca. 290 €), Regelwerk nur als Geschäftsgeheimnis mit angemessenen Maßnahmen; Idee nicht; Patent praktisch nicht.
  - **Technischer Befund (am Code geprüft):** `web/src/regelwerk.ts` und `regeln.json` werden ins Browser-Bundle gebaut; ohne Serveraufruf, auch ohne Zugangscode lesbar, sobald die App öffentlich liegt. Lösungsskizze: Route `/bewerten` in der Edge Function, App bekommt nur greifende Regeln samt Fundstelle.
  - Verträge (NDA, Nutzungsbedingungen, Login), Arbeitgeber-Frage als offene Anwaltsfrage, Schutz durch Tempo/Netzwerk/Falldaten, priorisierte Maßnahmenliste mit Kosten.
  - Neue Aufgaben in [[Aufgaben]] („Als Nächstes“), darunter die Code-Aufgabe „Regelwerk serverseitig“.
- **Annahmen:** Die Aufgabe „5 Gespräche“ und alle Aufgaben mit Konten/Schlüsseln waren nicht für die Nachtschicht geeignet. Rechtliche Aussagen und Preise stammen aus dem Gedächtnis, ohne Quellenprüfung. Deshalb Entwurf und markierte Anwaltsfragen. Ob der Nutzer angestellt ist, steht nicht im Vault; Abschnitt 4 formuliert nur Fragen.
- **Offen (für dich):**
  1. PR prüfen und mergen, danach in [[Aufgaben]] die Aufgabe „Schutzkonzept“ abhaken.
  2. Die **Gespräche bis 09.10.** bleiben vorrangig ([[Validierung & Go-No-Go]]); die neuen Schutz-Aufgaben nicht vorziehen.
  3. Repo `zaehlerschrank-check` auf „privat“ prüfen, App nicht öffentlich hosten, Build-Dateien/Demo nicht weitergeben.
  4. Arbeitsvertrag sichten, Anwaltstermin zur Arbeitgeber-Frage vor dem Livegang.
