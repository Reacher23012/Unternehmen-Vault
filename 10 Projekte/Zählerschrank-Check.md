---
typ: projekt
aliases: [Zählerklar]
phase: validierung
status: aktiv
score: 18 (vorläufig)
geldmodell: App-Abo, Fallback Checkliste/Schulung
erfasst: 2026-09-29
---
# Zählerschrank-Check

**Produktname: Zählerklar** (seit 03.10.2026) → [[ADR-0006 Produktname Zählerklar]]

Ein Elektriker fotografiert einen Zählerschrank, und die App sagt ihm, welche Maßnahmen nötig sind – **weiterverwendbar / nachrüsten / austauschen** – nach TAB und Vorgaben des Netzbetreibers, mit Fundstelle. Pilot-Netzbetreiber: **Westnetz**.

- **Problem:** Jede Wallbox, Wärmepumpe oder PV (§14a EnWG) bringt den Zählerplatz auf den Prüfstand. Die Einordnung im Bestand (DIN 43853 / 43870 / VDE 0603) kostet Zeit und fällt im Angebot oft zu knapp aus.
- **Lösung:** Foto → KI erkennt Merkmale → festes Regelwerk (26 Regeln) entscheidet → Maßnahmenliste.
- **Zielgruppe:** Elektrobetriebe im Westnetz-Gebiet; Preisannahme ~30 €/Monat.
- **Wettbewerb/Alternativen:** Erfahrung + TAB-PDF + Rückfrage beim Netzbetreiber; noch nicht recherchiert.

## Stand (29.09.2026)
| Baustein | Stand |
|---|---|
| Regelwerk | 26 Regeln, fast alle belegt (offen: R07, R09, R11, R19) → [[Regelwerk R01–R26]] |
| App-Prototyp | fertig, 13 Tests grün, läuft lokal → [[App & Technik]] |
| Backend | Supabase Frankfurt läuft, **Secrets fehlen** (API-Schlüssel, Zugangscode) |
| Demo zum Vorzeigen | [privat auf claude.ai](https://claude.ai/artifact/3uf3rpwPeuXL4Tt5NfeDJY) |
| Landingpage + Warteliste | gebaut, noch nicht online → [[Landingpage & Warteliste]] |
| Impressum / Datenschutz | Entwurf, E-Mail fehlt, prüfen lassen → [[Rechtliches]] |
| Marketing Phase 1 | Direktansprache: Flyer A5 (Entwurf), WhatsApp-Texte → [[Direktansprache]] |
| Instagram (Phase 2) | 3 Posts in Canva, Bildtexte fertig, Konto fehlt → [[Instagram]] |
| Validierung | 0 Fälle, 0 Gespräche, 0 Einträge → [[Validierung & Go-No-Go]], Leitfaden steht → [[Gesprächsleitfaden]] |

## Score (vorläufig, 03.10.2026)
| Kriterium | Punkte | Begründung |
|---|---|---|
| Schmerz | 3 | plausibel (§14a, Wallbox/WP/PV), aber noch kein Gespräch, deshalb max. 3 |
| Zahlungsbereitschaft | 3 | 30 €/Monat ist eine Annahme, nicht belegt |
| Zugang | 5 | Kollegen und Betriebe direkt erreichbar |
| Vorsprung | 5 | eigenes Regelwerk R01–R26, Fachwissen; schwer zu kopieren |
| Weg zum ersten Euro | 2 | App braucht Recht, Hosting, Trefferquote; Fallback Checkliste wäre schneller |
| **Summe** | **18/25** | Grenze zur Validierung; die 5 Gespräche entscheiden über Schmerz und Zahlungsbereitschaft |

Nach [[Ideen-System]] · Geldmodelle: [[Geldmodelle für KI-Ideen]]

## Go/No-Go
10 von 15 Kollegen haben das Problem mind. monatlich · 5 zahlen ≥ 30 €/Monat · Trefferquote ≥ 85 % bei 20 Fällen · 100 Wartelisten-Einträge in 4 Wochen. **3 von 4 → MVP bauen**, sonst Wissen als Schulung/Checkliste verkaufen.

## Nächster Schritt
**03.10.:** 3 Gespräche mit Kollegen für den 04.10. vereinbart → Ergebnisse je Gespräch als Notiz aus `90 Vorlagen/Gespräch`, Zeile in der Auswertung im [[Gesprächsleitfaden]].

**Ideen-Check 02.10.:** Die Phase „Validierung“ stimmt nur formal: Die Kriterien stehen, gemessen ist aber noch nichts. Seit dem 29.09. ist im Vault kein Schritt abgehakt. Alle sechs „Jetzt“-Aufgaben sind Infrastruktur (Schlüssel, Mail, Recht, Hosting, Instagram), keine davon liefert Daten. **Der wichtigste Schritt: bis 09.10. fünf Gespräche mit Kollegen** (wie oft, wie lange dauert's heute, würdest du 30 €/Monat zahlen, magst du mittesten?). Ergebnisse unter [[Validierung & Go-No-Go]] eintragen. Das braucht keinen Code und deckt 2 der 4 Kriterien ab. → [[2026-10-02 Ideen-Check]]

1. **30.09., 20 Uhr:** Anthropic-API-Schlüssel + `APP_CODE` in Supabase eintragen → Verbindungstest (Erinnerung im Google Kalender)
2. Projekt-E-Mail anlegen → Impressum/Datenschutz fertig → Netlify-Konto → Landingpage + App online
3. Instagram-Konto anlegen, Link in Bio, erste Posts
4. 20 reale Schränke mit der App erfassen, 15 Gespräche führen

## Entscheidungen
- [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]
- [[ADR-0002 Marketing zuerst über Instagram]]
- [[ADR-0003 Schriften selbst hosten]]
- [[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]]
- [[ADR-0005 Direktansprache vor Instagram]]
- [[ADR-0006 Produktname Zählerklar]]

## Unterlagen
- [[Entscheidungsbaum Excel]] – Ursprung, Datei in `Anhänge/Entscheidungsbaum_Zaehlerschrank.xlsx`
- Code: `C:/Users/Jarvis/zaehlerschrank-check` (Git)
- Canva-Ordner: https://www.canva.com/folder/FAHWm2kKNgU
- Supabase: Projekt `zaehlerschrank-check` (Ref `ezmjjigaarbgwmserngp`)
- Sitzungen: [[2026-09-29 Zählerschrank-Check – Prototyp, Demo, Marketing]]
