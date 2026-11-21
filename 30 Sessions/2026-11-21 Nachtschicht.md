---
typ: session
datum: 2026-11-21
---
# 2026-11-21 Nachtschicht

**Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ als Wissensnotiz schreiben (nur Vault, kein Code geändert).

**Ergebnis:** [[Schutz von Idee und App]] – Analyse (keine Rechtsberatung) zu Schutzmöglichkeiten, technischem Befund, Verträgen, Arbeitgeber-Frage, Tempo-Schutz und priorisierter Maßnahmenliste. PR: https://github.com/Reacher23012/Unternehmen-Vault/pull/48.
- **Befund:** `web/src/regeln.json` und die Regellogik stecken im ausgelieferten Bundle (`regelwerk.ts` ← `main.ts`); das Regelwerk ist für jeden Nutzer im Browser auslesbar. Das schwächt auch den Geschäftsgeheimnis-Schutz. Lösung skizziert: Auswertung in die Edge Function, aber Konflikt mit der bisherigen Offline-/Funkloch-Fähigkeit.
- **Neue Aufgaben** unter „Als Nächstes“: Repo-Sichtbarkeit prüfen, Arbeitsvertrag lesen, Testbedingungen entwerfen, Code-Aufgabe „Regelwerk serverseitig“.
- **Annahmen:** Dass der Nutzer angestellt ist, steht nicht im Vault – die Arbeitgeber-Frage ist deshalb bedingt formuliert. Gebührenangaben (DPMA ca. 290 €) aus dem Gedächtnis, ohne Webprüfung; vor Nutzung nachsehen. Aufgabe in [[Aufgaben]] nicht abgehakt (erst nach Merge).
- Aufgabe gewählt, weil sie die erste „Jetzt“-Aufgabe ist, die ohne Zugangsdaten, Gespräche oder Veröffentlichung erledigbar ist. Die Gespräche bleiben Vorrang ([[2026-10-02 Ideen-Check]]).

**Offen (für dich):**
1. PR prüfen und mergen, dann „Schutzkonzept“ in [[Aufgaben]] abhaken.
2. Arbeitsvertrag lesen, Fragen für Anwalt/Steuerberater sammeln (Punkt 4 der Notiz); Repo-Sichtbarkeit auf GitHub prüfen.
3. Gespräche mit Kollegen und Tester-Einrichtung bleiben die wichtigste Sache für [[Zählerschrank-Check]]. Kein Code-PR in dieser Nacht.
