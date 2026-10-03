---
typ: session
datum: 2026-10-03
branch:
---
# 2026-10-03 – Zählerklar: Sicherheit, Name, Marketing-Material

## Ziel
Die App absichern, die Gespräche vorbereiten und das Marketing so umbauen, dass ohne Infrastruktur Daten fürs Go/No-Go entstehen.

## Ergebnis
- **Sicherheits-Check (best-practices):** Schriften der App selbst gehostet, Netlify-Header mit CSP für App und Landingpage, Edge Function gehärtet (Fotolimit 5 MB, zeitkonstanter Code-Vergleich, ID-Prüfung, keine internen Fehler nach außen). 13 Tests grün. **Noch nicht committet, Edge Function noch nicht eingespielt** → [[App & Technik]]
- [[Gesprächsleitfaden]] + Vorlage `90 Vorlagen/Gespräch`
- [[ADR-0005 Direktansprache vor Instagram]]: Direktansprache jetzt, Instagram als Phase 2
- [[ADR-0006 Produktname Zählerklar]]
- [[Direktansprache]]: WhatsApp-Texte, WhatsApp-Business-Profil, Begrüßung, Schnellantworten, Labels, Kontaktliste
- Druckvorlagen in `Anhänge/Zählerklar Marketing/`: Flyer A5, Checkliste A5, Aushang A4 mit Abreißstreifen. Jeder hat einen QR-Code auf WhatsApp 0151 68837070 mit eigenem Vorschlagstext
- [[Instagram-Posts 1–10]]: Posts 4–10 als PNG (13 Folien), Bildtexte und Hashtags für alle 10, Plan mit 2 Posts pro Woche
- [[Anschreiben Handwerkskammern]]: Dortmund und Südwestfalen (Arnsberg)

## Erkenntnisse
- Canva-KI hat zweimal unbrauchbare Flyer erzeugt, darunter einen **echt aussehenden QR-Code mit Fantasienummer**. Druckvorlagen mit festem Text deshalb selbst als HTML → PDF bauen (`zaehlerschrank-check/marketing/`) → [[Canva-KI-Texte immer gegenlesen]]
- Fotos „aus dem Internet“ nur mit freier Lizenz und Bildnachweis → [[Bildrechte im Marketing]]
- Die Demo als claude.ai-Artifact ist für Fremde nicht erreichbar. Als Kontaktweg bleibt bis zur Landingpage WhatsApp.
- Instagram braucht die Landingpage nicht unbedingt (WhatsApp in der Bio), aber ein **Impressum** → hängt an [[Rechtliches]].
- Die normale WhatsApp-Business-App hat keine Schnittstelle. Anfragen kommen per Kopieren oder Chat-Export zu Claude, eine Cloud API erst bei Bedarf.

## Offen
- 04.10.: 3 Gespräche führen und in den [[Gesprächsleitfaden]] eintragen
- 04.10.: Secrets in Supabase eintragen → Claude spielt die Edge Function ein und testet mit einem Foto
- Code-Änderungen in `zaehlerschrank-check` committen (Sicherheit + `marketing/`), erst nach Rückfrage
- WhatsApp Business einrichten, QR-Codes der 3 Druckvorlagen mit dem Handy testen, dann drucken
- Namensprüfung: `zaehlerklar.de` bei DENIC, DPMA, Handle @zaehlerklar
- Instagram-Posts 4–10 fachlich gegenlesen, Canva-Posts 1–3 auf „Zählerklar“ umstellen
- HWK-Anschreiben: Platzhalter ausfüllen, Ansprechpartner prüfen, senden
