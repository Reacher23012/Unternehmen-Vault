---
typ: session
datum: 2026-10-24
---
# Nachtschicht 2026-10-24

**Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ als Wissensnotiz erarbeiten (nur Vault, kein Code geändert).

**Ergebnis:** [[Schutz von Idee und App]] geschrieben: schützbar sind Code (Urheberrecht), Name (Marke) und Regelwerk (nur mit Geheimhaltungsmaßnahmen), die Idee selbst nicht. **Befund:** `regeln.json` und die komplette Auswertungslogik (`regelwerk.ts`) landen im Browser-Bundle – nach Veröffentlichung kann jeder das Regelwerk lesen. Lösung skizziert (Auswertung in die Edge Function). Drei neue Aufgaben in [[Aufgaben]] (Arbeitgeber-Frage, Regelwerk serverseitig, NDA/Nutzungsbedingungen). PR Vault: https://github.com/Reacher23012/unternehmen-vault/pull/22. Kein Code-PR, weil die Aufgabe ausdrücklich „nur Vault“ war.

**Annahmen:** Die ersten beiden „Jetzt“-Aufgaben brauchen Gespräche bzw. Zugangsdaten und waren nicht möglich; die Schutz-Aufgabe ist die erste umsetzbare. Ob der Nutzer angestellt ist, ist unbekannt.

**Offen (für dich):**
1. Arbeitsvertrag lesen, Erstberatung beim Fachanwalt für Arbeitsrecht buchen – vor Netlify/Flyer/Instagram.
2. Entscheiden: Regelwerk serverseitig vor der öffentlichen App (Empfehlung: ja); dann kann eine spätere Nachtschicht den Code umsetzen, Einspielen mit Zugangsdaten machst du.
3. Weiter mit Vorrang: Auswertung der Gespräche → [[Validierung & Go-No-Go]]; Projekt: [[Zählerschrank-Check]].
