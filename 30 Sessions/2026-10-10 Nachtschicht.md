---
typ: session
datum: 2026-10-10
---
# 2026-10-10 Nachtschicht

**Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ für [[Zählerschrank-Check]] als Wissensnotiz schreiben (nur Vault, kein Code geändert).

**Ergebnis:**
- Neue Notiz [[Schutz von Idee und App]]: Was ist schützbar, technischer Befund, Verträge, Arbeitgeber-Frage, Schutz durch Tempo, priorisierte Maßnahmenliste.
- **Wichtigster Befund:** `web/src/regeln.json` und die Auswertungslogik werden ins App-Bundle gebaut, das Regelwerk liegt also öffentlich im Browser (der `APP_CODE` schützt nur das Backend). Lösung skizziert: Auswertung in die Edge Function (`POST /bewerte`).
- Vier neue Aufgaben unter „Als Nächstes“ in [[Aufgaben]], darunter die Code-Aufgabe „Regelwerk serverseitig“ für eine spätere Nachtschicht.
- PR: https://github.com/Reacher23012/Unternehmen-Vault/pull/8

**Annahmen:** Reine Analyse aus allgemeinem Wissen, ohne Internetrecherche; Gebühren und Paragrafen sind nicht verifiziert und als „⚖ Anwalt“ gekennzeichnet. Die Gespräche bis 09.10. (Vorrang) und die übrigen „Jetzt“-Aufgaben brauchen den Nutzer (Gespräche, Konten, Schlüssel) und blieben unberührt.

**Offen:**
1. PR prüfen, mergen, dann `git pull`; erst danach die Aufgabe abhaken.
2. Arbeitsvertrag lesen und Erstberatung zur Arbeitgeber-Frage buchen, bevor Geld oder Livegang folgen.
3. Gesprächsergebnisse (Frist war 09.10.) in [[Validierung & Go-No-Go]] eintragen; sie haben weiter Vorrang vor Infrastruktur.
