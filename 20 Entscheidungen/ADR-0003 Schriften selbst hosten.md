---
typ: entscheidung
status: vorgeschlagen
datum: 2026-09-29
projekt: "[[Zählerschrank-Check]]"
---
# ADR-0003: Schriften selbst hosten

## Kontext
- Die Landingpage nutzt Barlow Condensed und IBM Plex (Open Font License).
- Werden Schriften von Google Fonts geladen, geht die IP-Adresse jedes Besuchers an Google. Das LG München I hat das 2022 als Datenschutzverstoß gewertet; danach gab es Abmahnwellen.

## Entscheidung
Öffentliche Seiten laden Schriften ausschließlich vom eigenen Server (`landing/dist/fonts`, aus den @fontsource-Paketen). Google Fonts wird nur in der privaten claude.ai-Vorschau genutzt, weil Artifacts keine andere Schriftquelle erlauben.

## Folgen
- ✅ Keine Datenübermittlung an Google, einfachere Datenschutzerklärung, kein Cookie-Banner nötig.
- ✅ Seite lädt unabhängig von Google.
- ⚠️ Schriftdateien liegen im Build (ca. 7 Dateien) und müssen bei Änderungen mitgebaut werden – erledigt `npm run build` in `landing/`.

Siehe [[Rechtliches]].
