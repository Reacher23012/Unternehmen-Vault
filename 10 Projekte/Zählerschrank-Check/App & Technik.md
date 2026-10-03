---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-09-29
---
# App & Technik

## Was die App macht
1. **Fotos:** bis zu 4 (Gesamtansicht, Zählerfeld, oberer Anschlussraum ohne Abdeckung, Hauptsicherung). Kamera oder Galerie, verkleinert auf 1568 px.
2. **KI-Vorschlag:** Claude (`claude-opus-5-5`) belegt 12 Schrank-Felder vor – Bauart, Befestigung, freie Plätze, APZ/RfZ, Trennstelle, SPD Typ 1, Zustand, RJ45 „CLS“, Klemmleiste, Steuergerätefeld, Verdrahtung, Anschluss. Je Feld: Wert, Sicherheit (hoch/mittel/niedrig), Begründung. Nicht Sichtbares → „Unbekannt“.
3. **Rest per Auswahl:** Vorhaben (Wallbox, WP, Klima, Speicher, PV, kW, §14a-Modul, Steuerung), Netzform, HA-Sicherung, Erdung, Datenleitung.
4. **Ergebnis:** Ampel, Maßnahmen mit Fundstelle, „Vor Ort klären“ (Regeln, die bei ungünstigen unbekannten Angaben greifen, samt Ergebnis im schlimmsten Fall), Hinweise, Messkonzept Westnetz.
5. **Deine tatsächliche Entscheidung** wird mit gespeichert → Trefferquote und Quote der Fotoerkennung auf der Startseite. CSV-Export in der Spaltenfolge des Excel-Blatts „Fälle“.

Grundsatz: **Die KI erkennt, das Regelwerk entscheidet** → [[Regelwerk R01–R26]], [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]].

## Wo was liegt
| Was | Ort |
|---|---|
| Code (Git) | `C:/Users/Jarvis/zaehlerschrank-check` |
| App (Vite + TypeScript) | `web/` – `npm run dev`, `npm test`, `npm run build` |
| Regelwerk im Code | `web/src/regelwerk.ts`, Texte `web/src/regeln.json` |
| Demo-Build | `web/` → `npm run build:demo` → `web/dist-artifact/zaehlerschrank-check.html` |
| Backend | `supabase/functions/api/index.ts` (Edge Function), `supabase/migrations/` |
| Landingpage | `landing/` → `npm run build` → `landing/dist/` |
| Excel-Grundlage | [[Entscheidungsbaum Excel]] |

## Backend (Supabase)
- Projekt `zaehlerschrank-check`, Ref `ezmjjigaarbgwmserngp`, Region Frankfurt (eu-central-1), kostenloser Tarif, Organisation „Kristian“.
- Adresse für die App-Einstellungen: `https://ezmjjigaarbgwmserngp.supabase.co/functions/v1/api`
- Edge Function `api` (Version 2): `POST /analyse`, `GET/PUT /faelle`, `GET /warteliste` – alle mit Header `x-app-code`. `POST /warteliste` ist öffentlich (Landingpage), mit Honeypot und Prüfung. **Die Warteliste-Route und -Tabelle sind noch nicht eingespielt** (erst wenn die Landingpage live geht).
- Tabelle `faelle`, privater Bucket `fotos`. RLS an, keine Policies → Zugriff nur über die Funktion (Supabase-Hinweis „RLS ohne Policy“ ist Absicht).
- **Secrets fehlen noch:** `ANTHROPIC_API_KEY`, `APP_CODE` – selbst eintragen unter Edge Functions → Secrets. Keine Schlüssel in diesen Vault!

## Kosten
- Supabase: 0 € (Free Tier).
- Claude-API: Guthaben vorab, grob 5–12 Cent je Check mit 4 Fotos (Schätzung, nicht gemessen). Ausgabenlimit in der Anthropic-Console setzen.

## Links
- Demo (privat, Beispieldaten): https://claude.ai/artifact/3uf3rpwPeuXL4Tt5NfeDJY
- Landingpage-Vorschau (privat): https://claude.ai/artifact/4mLRzhuYq5q6RTHSmMRPKu

## Stand der Qualität
- 13 Tests grün: Excel-Beispielzeile identisch (Nachrüsten, R04/R06/R07/R14/R15/R22, MK 0), Grenzwerte, offene Punkte, CSV, Zusammenführen.
- Sicherheits-Check 03.10. (best-practices): `npm audit` 0 Lücken. Ausgaben sind escaped (kein XSS über KI-Text oder Bemerkung). Behoben: App lud Schriften noch von Google (jetzt selbst gehostet wie die Landingpage, nur das Demo-Artifact nutzt Google Fonts). Netlify-Header mit CSP für App (`web/public/_headers`) und Landingpage (`bauen.mjs` erzeugt `_headers` mit Skript-Hash). Edge Function: Fotos max. 5 MB, Zugangscode zeitkonstant verglichen, Fall-ID/Datum geprüft, interne Fehler nur ins Log. **Noch nicht eingespielt.** Bewusst offen: kein Rate-Limit auf Zugangscode und Warteliste → langen, zufälligen `APP_CODE` wählen (≥ 20 Zeichen).
- Review 29.09.: Fälle gehen bei Funkloch nicht mehr verloren (lokal + Nachsenden), angefangene Checks überstehen Neuladen, Verbindungstest in den Einstellungen.

## Offen
- [ ] App öffentlich hosten (mit Landingpage, Netlify)
- [ ] App-Icon als PNG (iPhone zeigt SVG nicht)
- [ ] Zeitlimit Supabase (150 s) bei 4 Fotos im Echtbetrieb prüfen
- [ ] Offline-Modus (Service Worker) – erst nach Go
