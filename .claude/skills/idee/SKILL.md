---
name: idee
description: Nimmt eine neue Geschäfts- oder KI-Idee auf, bewertet sie kritisch mit dem Score aus „Ideen-System“ und trägt sie in die Ideen-Pipeline ein. Nutzen bei /idee <Text>, bei „ich hab eine Idee“, oder wenn /inbox eine neue Idee findet. Mit /idee bewerten <Name> eine bestehende Idee neu bewerten.
---
# Idee aufnehmen und bewerten

Argument: `$ARGUMENTS`

1. `40 Wissen/Ideen-System.md`, `40 Wissen/Geldmodelle für KI-Ideen.md` und `40 Wissen/Mein Vorteil.md` lesen.
2. Gibt es die Idee schon (auch sinngemäß) in `10 Projekte/` oder der Pipeline: dort ergänzen und neu bewerten, keine Dublette.
3. Neue Notiz `10 Projekte/<Name>.md` nach `90 Vorlagen/Idee.md`. Ausfüllen, was bekannt ist; Unbekanntes als **Frage** stehen lassen, nichts erfinden.
4. **Score** als kritischer Mitgründer: jedes Kriterium 1–5 mit Begründung. Ohne Beleg höchstens 3 und Summe als „vorläufig“ markieren. Score und Geldmodell auch ins Frontmatter (`score:`, `geldmodell:`).
5. Phase setzen: ≥ 18 → `prüfen` mit Empfehlung Validierung (nur wenn keine andere Idee in Validierung/MVP ist, sonst Warteschlange nennen), 13–17 → `prüfen` (geparkt), ≤ 12 → Empfehlung `verworfen`. Verwerfen nur mit Zustimmung des Nutzers.
6. Zeile in `10 Projekte/Ideen-Pipeline.md` anlegen/aktualisieren: Idee · Phase · Score · Geldmodell · Nächster Schritt.
7. Dem Nutzer antworten: Score-Tabelle, größte Schwäche, **ein** billigstes Experiment für den ersten Beleg (Vorlage `90 Vorlagen/Experiment.md`).
