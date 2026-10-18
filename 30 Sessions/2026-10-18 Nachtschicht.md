---
typ: session
datum: 2026-10-18
---
# Nachtschicht 18.10.2026

**Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ als Wissensnotiz erstellen (nur Vault, kein Code geändert).

**Ergebnis:** [[Schutz von Idee und App]] (PR: PRLINK).
- Idee nicht schützbar; Code (Urheberrecht), Name (Marke) und Regelwerk (nur als Geschäftsgeheimnis mit Geheimhaltungsmaßnahmen) schon.
- **Technischer Befund bestätigt:** `web/src/regeln.json` wird im Browser ausgewertet (`main.ts`, `demo.ts` rufen `bewerte` clientseitig auf), die Edge Function macht keine Regelauswertung. Lösung skizziert: `POST /bewerte`.
- Neue Aufgaben in [[Aufgaben]] unter „Als Nächstes“: Code „Regelwerk serverseitig“ (für eine spätere Nachtschicht), Arbeitgeber-Frage, Nutzungsbedingungen + NDA; „Login statt Zugangscode“ vorgezogen. Stand in [[Zählerschrank-Check]] ergänzt.
- Annahmen: Gebühren und Rechtsstand aus dem Gedächtnis, deshalb mit 🔶 „vom Anwalt prüfen“ markiert; Repo-Sichtbarkeit nicht geprüft.

**Offen (für dich):**
1. Die Frist „5 Gespräche bis 09.10.“ ist verstrichen; im Vault ist keine Gesprächsnotiz zu sehen. Das bleibt wichtiger als jede Schutzmaßnahme → [[Validierung & Go-No-Go]].
2. Arbeitsvertrag/Nebentätigkeit lesen, Erstberatung planen.
3. PR prüfen und mergen, dann `git pull`; Aufgabe erst danach abhaken.
