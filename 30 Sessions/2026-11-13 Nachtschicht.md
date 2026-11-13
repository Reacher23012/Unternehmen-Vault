---
typ: session
datum: 2026-11-13
branch: nachtschicht/2026-11-13
---
# 2026-11-13 – Nachtschicht

## Ziel
Schutzkonzept „Idee und App vor Diebstahl schützen“ für [[Zählerschrank-Check]] als Wissensnotiz schreiben (nur Vault, kein Code geändert, Analyse statt Rechtsberatung).

## Ergebnis
- Neue Notiz [[Schutz von Idee und App]]: Was ist schützbar (Idee nein, Code ja, Name per Marke, Regelwerk nur als Geschäftsgeheimnis mit Geheimhaltungsmaßnahmen, Patent unrealistisch), technischer Befund, Verträge, Arbeitgeber-Frage, Schutz durch Tempo/Netzwerk/Daten, priorisierte Maßnahmenliste mit Kosten.
- **Technischer Befund:** `web/src/regeln.json` und die Regellogik in `web/src/regelwerk.ts` werden ins App-Bundle gebaut und laufen im Browser. Der Zugangscode (`APP_CODE`) schützt nur die Edge Function, nicht die statischen Dateien. Risiko beginnt mit öffentlichem Hosting oder dem Link an Fremde. Lösung skizziert: Route `POST /bewerten` in der Edge Function.
- [[Aufgaben]]: fünf Folgeaufgaben unter „Als Nächstes“ angelegt (Code-Aufgabe „Regelwerk serverseitig“ als eigene Zeile, damit eine spätere Nachtschicht sie umsetzen kann). Projektnotiz ergänzt.
- Kein Code-Pull-Request, weil die Aufgabe ausdrücklich „kein Code ändern“ verlangte. PR im Vault: siehe [[Aufgaben]]-Zeile.

**Annahmen:**
- Der Gründer ist im Elektrohandwerk angestellt (so formuliert die Aufgabe); sonst entfallen Teile von Abschnitt 4.
- Kostenangaben (z. B. DPMA ca. 290 € für bis zu 3 Klassen) und Paragrafen sind aus dem Gedächtnis und im Dokument als zu prüfen markiert; ich konnte hier nichts im Netz nachsehen.
- Die Aufgaben-Reihenfolge habe ich nicht verändert: Die Schutzmaßnahmen sind Infrastruktur und stehen bewusst **hinter** den Gesprächen. Billige Punkte (Arbeitgeber-Frage, NDA) sind aber vor dem Test mit Fremden nötig.

## Offen
1. Gespräche mit Kollegen weiterführen ([[Validierung & Go-No-Go]]) – Vorrang vor allem hier.
2. Notiz lesen und korrigieren, v. a. Abschnitt 4 (stimmt die Annahme zur Anstellung?). Dann Arbeitsvertrag durchlesen und Anwalts-Erstberatung planen.
3. Bis „Regelwerk serverseitig“ umgesetzt ist: App nicht öffentlich hosten und Link nicht an Fremde geben.
4. GitHub-Repos auf „privat“ prüfen.
5. Beim nächsten Score-Lauf die Begründung für „Vorsprung“ anpassen (Tempo und Daten statt Geheimnis).
