---
name: inbox
description: Verarbeitet 00 Inbox – sortiert Ideen, Fehlerberichte, Logs und Dateien in Aufgaben, Wissen oder Entscheidungen und leert die Inbox. Nutzen, wenn der Nutzer /inbox sagt oder der Start-Hook ungelesene Inbox-Einträge meldet.
---
# Inbox verarbeiten

Für jede Datei in `00 Inbox/` außer `README.md`:

1. Lesen und einordnen:
   - **Neue Geschäfts-/KI-Idee** → wie `/idee` (Notiz aus Vorlage, Score, Pipeline-Zeile).
   - **Konkrete Arbeit** → Zeile in `Aufgaben.md` (Abschnitt nach Dringlichkeit: Jetzt / Als Nächstes / Irgendwann), mit `[[Link]]` auf eine Wissensnotiz, falls Details nötig.
   - **Fakten, Logs, XML, Erkenntnisse** → Notiz in `40 Wissen/` (bestehende ergänzen statt neue anlegen). Große Rohdateien (Logs, XML) nach `40 Wissen/Anhänge/` verschieben und verlinken.
   - **Grundsatzfrage** → mit dem Nutzer klären, dann `/entscheidung`. Läuft niemand mit (Start aus dem Dashboard): Eintrag liegen lassen und im Ergebnis nennen.
2. Die Inbox-Datei löschen (`git rm` bzw. `git mv` beim Verschieben).
3. Keine Geheimnisse übernehmen: Passwörter, Keys, Zugangsdaten aus Logs entfernen, bevor sie im Vault landen.

Zum Schluss dem Nutzer in wenigen Zeilen sagen, was wohin ging, und welche Aufgabe jetzt oben steht.
