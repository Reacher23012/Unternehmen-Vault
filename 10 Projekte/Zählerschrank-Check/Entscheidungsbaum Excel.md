---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
status: validierung
erstellt: 2026-09-29
tags: [projekt, zählerschrank, westnetz, geschäftsidee]
---

# Entscheidungsbaum Excel

**Ziel:** Prüfen, ob ein einfacher Regelbaum bei realen Zählerschränken zur gleichen Entscheidung kommt wie ich (Weiterverwendbar / Nachrüsten / Austausch). Erst wenn das klappt, lohnt sich Software. Pilot-Netzbetreiber: **Westnetz**.

**Arbeitsdatei:** [[Entscheidungsbaum_Zaehlerschrank.xlsx]] (liegt in `Anhänge/`)

## Stand (29.09.2026)
- Die Excel-Mappe ist fertig: Anleitung, Fälle, Regeln, Auswertung, Listen.
- **26 Regeln** (R01–R26), fast alle mit Westnetz- bzw. BDEW-Unterlagen belegt. Noch offen:
  - R07 SPD Typ 1: Verweis belegt, Details in der Norm prüfen
  - R09 Erdung: Entwurf, in DIN 18014 prüfen
  - R11 Leistungsbilanz: Grenzwert 50 A ist eine Annahme
  - R19: Belegt, aber mit der Tabelle von 2019
- **Noch keine realen Fälle erfasst** (nur die Beispielzeile).
- Regelstand: TAB NS Westnetz 01.09.2025, Westnetz-Anweisung SteuVE 01.07.2024, Westnetz-Schulung Bestandsanlagen (09/2025), BDEW-Musterwortlaut TAB 2023 v2.0. Der BDEW-Musterwortlaut TAB 2026 ist seit 31.07.2026 draußen → **neue Westnetz-TAB beobachten**.

## Logik
- Pro Schrank eine Zeile, Eingaben per Auswahlliste. Jede Regel hat eine Stufe: 0 = Hinweis, 1 = Nachrüsten, 2 = Austausch. Die höchste ausgelöste Stufe ist das Ergebnis des Tools.
- Austausch (Stufe 2) bei: R01 Zählerplatz nicht weiterverwendbar (DIN 43853 / 43870-Tafel mit Vorsicherung), R18 Direktmessung überschritten (> 30 kW Dauerbetrieb).
- Die Auswertung vergleicht Tool und eigene Entscheidung. Ist das Tool **lockerer** als ich, fehlt eine Regel. Das ist der gefährlichere Fall.

## Go/No-Go-Kriterien
| Kriterium | Ziel | Stand |
|---|---|---|
| Kollegen mit dem Problem mind. monatlich (von 15 Gesprächen) | ≥ 10 | offen |
| Kollegen mit Preis ≥ 30 €/Monat und Bereitschaft zum Vorabzahlen/Mittesten | ≥ 5 | offen |
| Trefferquote Entscheidungsbaum (≥ 20 Fälle) | ≥ 85 % (17 von 20) | offen |
| Wartelisten-Einträge von Betrieben in 4 Wochen | ≥ 100 | offen |

Mind. 3 von 4 erfüllt → **GO: MVP bauen**. Sonst → **NO-GO:** Wissen als Schulung oder Checkliste verkaufen.

## Nächster Schritt
- [ ] Die ersten realen Zählerschränke im Blatt „Fälle“ erfassen (Ziel: 20)
- [ ] Interviews mit Kollegen führen (15) und die Ergebnisse im Blatt „Auswertung“ eintragen
- [ ] Die offenen Regeln R07, R09 und R11 in der Norm nachprüfen

## Hinweis
Keine Normtexte in Datei oder Notiz kopieren (Urheberrecht). Nur Fundstellen nennen.
