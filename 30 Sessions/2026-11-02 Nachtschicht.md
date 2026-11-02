---
typ: session
datum: 2026-11-02
projekt: "[[Zählerschrank-Check]]"
---
# 2026-11-02 Nachtschicht

**Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ als Wissensnotiz erstellen (nur Vault, kein Code geändert).

**Ergebnis:**
- Neue Notiz [[Schutz von Idee und App]]: Was in Deutschland schützbar ist (Idee nein, Code/Name/Know-how ja, Patent nicht empfohlen), technischer Befund, Verträge, Arbeitgeber-Frage, Tempo als Schutz, priorisierte Maßnahmenliste.
- **Befund:** `regeln.json` und die komplette Auswertungslogik (`regelwerk.ts`) werden ins App-Bundle gebaut. Das ganze Regelwerk liegt also beim Nutzer im Browser; die Edge Function kennt es nicht. Lösung skizziert (Regelwerk serverseitig + Login), vor Livegang für Fremde fällig.
- In [[Aufgaben]] unter „Als Nächstes“ 6 Folgeaufgaben angelegt, darunter „Regelwerk serverseitig“ und „Login + Rate-Limit“ als eigene Code-Zeilen für eine spätere Nachtschicht.
- Code-Repo: keine Änderung, daher kein Code-PR. Annahme: Die Aufgabe war ausdrücklich „nur Vault“. Tests nicht nötig.
- Die ersten Aufgaben in „Jetzt“ (Gespräche, Schlüssel, Konten, Hosting) brauchen Nutzer-Zugänge und wurden deshalb nicht gewählt.

**Offen (für dich):**
1. PR prüfen und mergen, dann die Aufgabe „Schutzkonzept“ in [[Aufgaben]] abhaken.
2. Arbeitsvertrag lesen und Erstberatung beim Anwalt buchen (Eigentum am Regelwerk, Nebentätigkeit).
3. GitHub-Repos auf privat und 2FA prüfen.
4. Vorrang bleibt: Gespräche mit Kollegen ([[Validierung & Go-No-Go]]). Das Schutzkonzept darf sie nicht verdrängen.
