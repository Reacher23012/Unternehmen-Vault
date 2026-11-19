---
typ: session
datum: 2026-11-19
---
# Nachtschicht 19.11.2026

**Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ als Wissensnotiz schreiben (nur Vault, kein Code geändert).

**Ergebnis:**
- Neue Notiz [[Schutz von Idee und App]]: was in Deutschland schützbar ist (Idee nein, Code ja, Name nur als Marke, Regelwerk nur als Geschäftsgeheimnis mit Geheimhaltungsmaßnahmen, Patent praktisch nein), Verträge (NDA, Nutzungsbedingungen, Login), Arbeitgeber-Frage, Schutz durch Tempo und Falldaten, priorisierte Maßnahmenliste.
- **Wichtigster Befund:** `web/src/regeln.json` und die komplette Auswertung in `web/src/regelwerk.ts` stecken im öffentlichen App-Bundle. Sobald die App online ist, kann jeder Besucher das Regelwerk samt Fundstellen auslesen. Lösung skizziert: Auswertung in die Edge Function verlegen.
- In [[Aufgaben]] vier neue Zeilen unter „Als Nächstes“ (Code-Aufgabe „Regelwerk serverseitig“, Arbeitsvertrag lesen, Kurz-NDA, Anwalt-Erstberatung).
- Pull Request Vault: siehe Aufgabe in [[Aufgaben]] (Link hinten angehängt). Kein Code-PR, weil die Aufgabe ausdrücklich nur den Vault betraf.

**Annahmen:** Befund am Stand `master` vom 19.11.2026 geprüft (`regelwerk.ts`, `main.ts`, `_headers`). Gebühren sind grobe Schätzungen und vor Ausgabe zu prüfen. Rechtsaussagen sind Analyse, keine Beratung; alles Unsichere ist mit „⚖ Anwalt“ markiert.

**Offen (für dich):**
1. PR mergen, danach `git pull` und die Aufgabe abhaken.
2. Den Arbeitsvertrag lesen (Nebentätigkeit/Wettbewerb), das klärt die größte offene Rechtsfrage ohne Kosten.
3. Vor Netlify-Livegang oder Fremd-Test die Code-Aufgabe „Regelwerk serverseitig“ umsetzen lassen und die Edge Function selbst einspielen.
4. Bedenken: Aufgaben „Jetzt“ sind seit dem 04.10. unverändert (Gespräche, API-Schlüssel, Netlify). Die Schutzmaßnahmen dürfen die Validierung nicht verdrängen ([[Validierung & Go-No-Go]]).
