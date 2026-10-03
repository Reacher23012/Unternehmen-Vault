---
typ: session
datum: 2026-09-29
branch: master (zaehlerschrank-check)
---
# 2026-09-29 – Zählerschrank-Check: Prototyp, Demo, Marketing

## Ziel
Die Excel-Idee „Entscheidungsbaum Zählerschrank“ in eine App (Foto → Maßnahmen) bringen, vorzeigbar machen und Marketing über Instagram vorbereiten.

## Ergebnis
- Projekt angelegt: [[Zählerschrank-Check]] mit Unterseiten [[Regelwerk R01–R26]], [[App & Technik]], [[Validierung & Go-No-Go]], [[Landingpage & Warteliste]], [[Rechtliches]], [[Instagram]], [[Entscheidungsbaum Excel]]
- App-Prototyp (Vite/TypeScript) mit Regelwerk 1:1 aus Excel, Fotoanalyse über Claude, Fälle mit echter Entscheidung → Trefferquote; Code-Review mit 2 behobenen Fehlern; 13 Tests grün
- Supabase-Projekt in Frankfurt, Edge Function deployt (Secrets fehlen noch)
- Demo als privates Artifact zum Vorzeigen auf dem Handy (QR-Code erzeugt)
- Landingpage mit Warteliste (Go/No-Go-Fragen), Impressum + Datenschutz als Entwurf, Schriften selbst gehostet
- 3 Instagram-Posts in Canva (2 fertig und korrigiert, der dritte hing bei Canva), Bildtexte + Hashtags
- Entscheidungen: [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]], [[ADR-0002 Marketing zuerst über Instagram]], [[ADR-0003 Schriften selbst hosten]], [[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]]
- Erinnerung 30.09., 20 Uhr im Google Kalender: API-Schlüssel einrichten
- Vollständiger Chatverlauf: Vault Brain → `Claude Chats/2026-09-29 Chats in Obsidian.md` (Session f5c91697)

## Erkenntnisse
- [[Canva-KI-Texte immer gegenlesen]] – erfundene Maßnahmen und falsche Einheiten in den ersten Posts
- [[Artifacts eignen sich nicht für öffentliche Formulare]]
- Die App muss die Validierung beschleunigen, nicht ersetzen: 0 Fälle, 0 Gespräche sind der eigentliche Engpass.

## Offen
- [ ] 30.09., 20 Uhr: Anthropic-API-Schlüssel (Guthaben + Ausgabenlimit) und `APP_CODE` in Supabase → Verbindungstest
- [ ] Projekt-E-Mail-Adresse anlegen (Vorschlag: eigene Domain) → in Impressum/Datenschutz
- [ ] Rechtstexte prüfen lassen
- [ ] Netlify-Konto anlegen → Landingpage + App online, Warteliste-Tabelle/-Route einspielen
- [ ] Instagram-Konto anlegen, Bio + Link, dritten Post in Canva fertigstellen
- [ ] 20 reale Schränke erfassen, 15 Gespräche mit Kollegen
