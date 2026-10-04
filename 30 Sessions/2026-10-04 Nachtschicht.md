---
typ: session
datum: 2026-10-04
---
# Nachtschicht 04.10.2026

**Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ für [[Zählerschrank-Check]] als Wissensnotiz (nur Vault, kein Code geändert).

**Ergebnis:** [[Schutz von Idee und App]] geschrieben. Wichtigster Befund: `web/src/regeln.json` wird über `regelwerk.ts` ins App-Bundle gebaut und `bewerte()` läuft im Browser – das ganze Regelwerk ist für jeden Nutzer lesbar. Lösung skizziert (Route `POST /bewerte` in der Edge Function). Vier neue Zeilen in [[Aufgaben]] („Als Nächstes“), darunter die Code-Aufgabe „Regelwerk serverseitig“. PR: PRLINK

**Annahmen:** Repo-Stand `34e3b80`; Kostenangaben sind grobe Richtwerte aus dem Gedächtnis, nicht recherchiert; Rechtliches ist Analyse, keine Beratung.

**Offen (für dich):**
- PR mergen, dann Aufgabe abhaken.
- Arbeitsvertrag raussuchen, Anwalt-Erstberatung zur Arbeitgeber-Frage (🔶 in der Notiz).
- Bei den 5 Gesprächen bis 09.10. kein Regelwerk/Code zeigen.
- Vor Netlify-Deployment: Regelwerk serverseitig (nächste Nachtschicht kann das übernehmen).
