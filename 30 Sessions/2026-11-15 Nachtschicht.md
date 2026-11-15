---
typ: session
datum: 2026-11-15
---
# Nachtschicht 15.11.2026

**Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ für [[Zählerschrank-Check]] als Analyse in den Vault schreiben (nur Text, kein Code geändert).

**Ergebnis:**
- Neue Notiz [[Schutz von Idee und App]]: schützbar ist der Code (Urheberrecht) und der Name (Marke, ca. 290 €), das Regelwerk nur mit Geheimhaltungsmaßnahmen, die Idee gar nicht, Patent nicht empfohlen.
- **Technischer Befund bestätigt:** `regeln.json` + `regelwerk.ts` werden im Browser-Bundle ausgeliefert, der Zugangscode schützt nur die API. Lösung skizziert: `POST /bewerte` in der Edge Function.
- Vier neue Aufgaben in [[Aufgaben]] („Als Nächstes“), darunter die Code-Aufgabe „Regelwerk serverseitig“ für eine spätere Nachtschicht.
- Vault-PR: PRLINK. Kein Code-PR (kein Code geändert).
- Annahmen: Anstellung im Elektrohandwerk laut Aufgabentext; Arbeitsvertrag unbekannt. Gebühren und Rechtsnormen aus dem Gedächtnis, nicht live geprüft → vor Verwendung prüfen.

**Offen:**
- Du: [[Aufgaben]] „Jetzt“ – Gespräche mit Kollegen haben weiter Vorrang; die Schutz-Notiz durchlesen und die Punkte mit **⚖ Anwalt** für eine Erstberatung sammeln.
- Du: Prüfen, ob beide GitHub-Repos privat sind.
- Du: Aufgabe erst nach Merge abhaken; dann ist die Code-Aufgabe „Regelwerk serverseitig“ für eine spätere Nachtschicht freigegeben (sie kommt aber erst nach den Go-Signalen, siehe [[Ideen-System]]).
