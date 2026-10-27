---
typ: session
datum: 2026-10-27
---
# 2026-10-27 Nachtschicht

**Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ als Wissensnotiz erstellen (nur Vault, kein Code geändert).

**Ergebnis:** [[Schutz von Idee und App]] geschrieben, PR im Vault: PRLINK. Code-Repo unverändert, daher dort kein PR.
- Idee nicht schützbar; Code (Urheberrecht), Name (Marke, DPMA), Regelwerk nur als Geschäftsgeheimnis mit Geheimhaltungsmaßnahmen; Patent unrealistisch.
- **Technischer Befund:** `web/src/regeln.json` (ca. 14 KB, alle 26 Regeln im Klartext) und die Auslöse-Logik werden in das Browser-Bundle gebaut; die Entscheidung fällt komplett im Client. Lösung skizziert: Route `POST /bewerte` in der Edge Function.
- Neue Aufgaben in [[Aufgaben]] unter „Als Nächstes“: Regelwerk serverseitig (Code), NDA-Vorlage, Arbeitgeber-Frage, Nutzungsbedingungen, Vault-Sichtbarkeit prüfen.
- Annahmen: Gebühren (DPMA ca. 290 €) und Anwaltskosten sind Schätzungen aus meinem Wissen und vor Ausgabe zu prüfen; nichts davon ist Rechtsberatung.

**Offen (für dich):**
1. PR prüfen und mergen, danach `git pull`, dann die Aufgabe abhaken.
2. Arbeitsvertrag lesen und Erstberatung beim Anwalt vereinbaren (Arbeitgeber-Frage), bevor die App öffentlich wird.
3. Vault-Sichtbarkeit auf GitHub prüfen (muss privat sein).
4. Vorrang bleibt: Gespräche mit Kollegen ([[Validierung & Go-No-Go]]). Schutzmaßnahmen nicht vor Validierung ziehen; nur NDA und Arbeitgeber-Klärung vor dem ersten Testzugang.
5. Die Code-Aufgabe „Regelwerk serverseitig“ kann eine spätere Nachtschicht umsetzen ([[Zählerschrank-Check]]).
