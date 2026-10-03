---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-09-29
quelle: web/src/regeln.json (aus Excel-Blatt „Regeln“)
---
# Regelwerk R01–R26

Das Regelwerk entscheidet, nicht die KI. Stufe 0 = Hinweis, 1 = Nachrüsten, 2 = Austausch; das Ergebnis ist die höchste ausgelöste Stufe. Ohne geplantes Vorhaben lautet das Ergebnis „Kein Vorhaben“.

Regelstand: TAB NS Westnetz 01.09.2025, Westnetz-Anweisung SteuVE 01.07.2024, Westnetz-Schulung Bestandsanlagen (09/2025), BDEW-Musterwortlaut TAB 2023 v2.0. **BDEW-Musterwortlaut TAB 2026 seit 31.07.2026 veröffentlicht – neue Westnetz-TAB beobachten.**

Keine Normtexte hier ablegen, nur Fundstellen (Urheberrecht).

**Noch nicht voll belegt:** R07 (Verweis belegt, Details in Norm prüfen), R09 (Entwurf – in Norm prüfen), R11 (Auslöser belegt, Grenzwert 50 A ist Annahme), R13 (–), R19 (Belegt (2019er Tabelle))

| ID | Regel | Stufe | Geltung | Status |
|---|---|---|---|---|
| R01 | Zählerplatz nicht weiterverwendbar | 2 · Austausch | Alle Netzbetreiber | Belegt |
| R02 | Zählerplatzverdrahtung unzureichend | 1 · Nachrüsten | Alle Netzbetreiber | Belegt |
| R03 | Sicherheitsmängel | 1 · Nachrüsten | Alle Netzbetreiber | Belegt |
| R04 | Kein Raum für Zusatzanwendungen | 1 · Nachrüsten | Alle (Details Westnetz) | Belegt |
| R05 | Modul 2 ohne Zählerplatz | 1 · Nachrüsten | Alle Netzbetreiber | Belegt |
| R06 | Keine Trennstelle hinter dem Zähler | 1 · Nachrüsten | Westnetz / 3-Punkt alle | Belegt |
| R07 | Kein SPD Typ 1 | 1 · Nachrüsten | Alle Netzbetreiber | Verweis belegt, Details in Norm prüfen |
| R08 | Wechselstromanschluss | 1 · Nachrüsten | Alle Netzbetreiber | Belegt |
| R09 | Erdung unklar | 0 · Hinweis | Alle Netzbetreiber | Entwurf – in Norm prüfen |
| R10 | Netzform TN-C / unklar | 0 · Hinweis | Alle Netzbetreiber | Belegt |
| R11 | Leistungsbilanz knapp | 0 · Hinweis | Alle Netzbetreiber | Auslöser belegt, Grenzwert 50 A ist Annahme |
| R12 | Wallbox > 12 kVA | 0 · Hinweis | Alle Netzbetreiber | Belegt |
| R13 | Bauart unbekannt | 0 · Hinweis | Alle Netzbetreiber | – |
| R14 | DIN-43870-Schrank nur mit Anpassung | 1 · Nachrüsten | Alle Netzbetreiber | Belegt |
| R15 | Keine RJ45-Buchse „CLS“ | 1 · Nachrüsten | Westnetz | Belegt |
| R16 | Relaissteuerung ohne Steuersignal-Klemmleiste | 1 · Nachrüsten | Westnetz | Belegt |
| R17 | Keine Datenleitung zur SteuVE | 1 · Nachrüsten | Westnetz | Belegt |
| R18 | Direktmessung überschritten | 2 · Austausch | Westnetz | Belegt |
| R19 | Verdrahtung 10 mm² zu schwach | 1 · Nachrüsten | Alle Netzbetreiber | Belegt (2019er Tabelle) |
| R20 | PV ≥ 25 kWp ohne FRE | 1 · Nachrüsten | Westnetz | Belegt |
| R21 | PV mit Smart-Meter-Steuerung | 0 · Hinweis | Westnetz | Belegt |
| R22 | Zählerauftrag durch Westnetz | 0 · Hinweis | Westnetz | Belegt |
| R23 | 3-Punkt-Zähler bei Relaissteuerung | 1 · Nachrüsten | Westnetz | Belegt |
| R24 | PV: 60 %-Begrenzung bis SMGW | 0 · Hinweis | Westnetz | Belegt |
| R25 | Speicher-Betriebsweise klären | 0 · Hinweis | Westnetz | Belegt |
| R26 | Relaissteuerung nur bis 2028 | 0 · Hinweis | Westnetz | Belegt |

## Details

### R01 · Zählerplatz nicht weiterverwendbar
- **Wann:** Bauart = DIN-43853-Zählertafel (mit/ohne Schutzklasse II) oder DIN-43870-Norm-Zählertafel mit Vorsicherung, und Wallbox/WP/Klima/Speicher/PV geplant
- **Maßnahme:** Neuen Zählerschrank nach DIN VDE 0603 / VDE-AR-N 4100 errichten
- **Fundstelle:** BDEW-Musterwortlaut TAB 2023 v2.0, Anhang G (S. 57) (Änderungsvarianten 1–3: „nein“); Westnetz-Schulung „Bewertung von Zählerplätzen in Bestandsanlagen“ (09/2025), Bild 1–4

### R02 · Zählerplatzverdrahtung unzureichend
- **Wann:** Bauart = DIN-43870-Zählerschrank (Trennvorrichtung im AAR oder NH-Sicherung im NAR), Verdrahtung unter 10 mm², starr oder unbekannt, Vorhaben geplant
- **Maßnahme:** Flexible Zählerplatzverdrahtung mind. 10 mm² nach DIN VDE 0603-2-1 herstellen
- **Fundstelle:** BDEW-Musterwortlaut TAB 2023 v2.0, Anhang G (S. 57), Fußnote 4

### R03 · Sicherheitsmängel
- **Wann:** Zustand/Berührungsschutz nicht in Ordnung, Vorhaben geplant
- **Maßnahme:** Mängel beseitigen (Berührungsschutz, Isolation, Abdeckungen, Plombierbarkeit). Westnetz: grober Mangel = kein Zählerwechsel, 6 Wochen Frist
- **Fundstelle:** BDEW-Musterwortlaut TAB 2023 v2.0, Kap. 7.4.2 (Sicherheitsmängel); Westnetz-Schulung „Bewertung von Zählerplätzen in Bestandsanlagen“ (09/2025), „Sicherheitsmängel“

### R04 · Kein Raum für Zusatzanwendungen
- **Wann:** Neue SteuVE > 4,2 kW oder PV, aber kein RfZ mit ausreichend Platz für SMGW und Steuerbox
- **Maßnahme:** RfZ direkt über dem Zählerfeld (Westnetz: 1 × 10 TE + 1 × 5 TE, mind. 8 TE für den MSB freihalten). Bei Platzmangel zusätzlicher RfZ (zRfZ): Steuergerätefeld mit Hutschiene, vorhandenes Verteilerfeld oder separates plombierbares Gehäuse, jeweils mit Spannungsversorgung aus dem ungemessenen Bereich und Datenleitung aus dem Zählerfeld. Erst wenn das nicht geht: Schrank tauschen
- **Fundstelle:** TAB NS Westnetz 01.09.2025, Kap. 9.2 und 14.5 (zRfZ); Westnetz-Anweisung „Techn. Mindestanforderungen steuerbare Einrichtungen“ 01.07.2024, Kap. 8.2.1 und 8.2.5; Westnetz-Schulung „Bewertung von Zählerplätzen in Bestandsanlagen“ (09/2025)

### R05 · Modul 2 ohne Zählerplatz
- **Wann:** §14a Modul 2 geplant, aber kein freier Zählerplatz
- **Maßnahme:** Separaten Zählerplatz für die SteuVE schaffen. Reserveplätze in DIN-VDE-0603-Schränken nur nutzbar mit Trennvorrichtung im NAR (oder NH + laienbedienbarer Trennvorrichtung im AAR) und AAR ≥ 150 mm mit Hauptleitungsabzweigklemme. Bei PV: Messkonzept 8 (Kaskade)
- **Fundstelle:** BNetzA BK8-22/010-A; BDEW-Musterwortlaut TAB, Kap. 7.4.1; Westnetz-Schulung „Bewertung von Zählerplätzen in Bestandsanlagen“ (09/2025), „Messkonzept 8“

### R06 · Keine Trennstelle hinter dem Zähler
- **Wann:** Keine Trennstelle (Hauptschalter oder RCD) im AAR hinter der Messeinrichtung, Vorhaben geplant. Bei Westnetz immer (jedes Vorhaben bringt dort einen neuen Zähler bzw. Zählerwechsel), sonst bei 3-Punkt
- **Maßnahme:** Trennstelle hinter jeder Messeinrichtung im AAR setzen (Hauptschalter oder RCD)
- **Fundstelle:** TAB NS Westnetz 01.09.2025, Kap. 7.2 (gilt für alle neuen Zählerplätze/Zähler); VDE-AR-N 4100:2026-04 (Hauptschalter AAR bei 3-Punkt)

### R07 · Kein SPD Typ 1
- **Wann:** Kein Überspannungsschutz Typ 1 vorhanden, Vorhaben geplant
- **Maßnahme:** SPD Typ 1 im Hauptstromversorgungssystem nach DIN VDE 0100-443/-534 und VDE-AR-N 4100 Abschn. 11.2 nachrüsten
- **Fundstelle:** BDEW-Musterwortlaut TAB, Kap. 11 (5) → DIN VDE 0100-443, VDE-AR-N 4100 Abschn. 11.2

### R08 · Wechselstromanschluss
- **Wann:** Anschluss 1-phasig und Gerät > 4,6 kVA oder PV geplant
- **Maßnahme:** Umstellung auf Drehstrom: Netzbetreiber anfragen, Hauptleitung und Zählerplatz anpassen
- **Fundstelle:** TAB NS Westnetz 01.09.2025, Kap. 10.1 (> 4,6 kVA im Drehstromsystem); BDEW-Musterwortlaut TAB 2023 v2.0, Kap. 7.4.2; BDEW-Musterwortlaut TAB 2023 v2.0, Anhang G (S. 57) (Variante 2)

### R09 · Erdung unklar
- **Wann:** Erdung = Nein oder Unbekannt
- **Maßnahme:** HINWEIS: Erdungsanlage prüfen, ggf. nach DIN 18014 nachrüsten
- **Fundstelle:** DIN 18014; VDE-AR-N 4100:2026-04

### R10 · Netzform TN-C / unklar
- **Wann:** Netzform = TN-C oder Unbekannt
- **Maßnahme:** HINWEIS: Umstellung der Netzform in der Kundenanlage (TN-C → TN-S) ist Anpassungsauslöser für den Zählerplatz; PEN-Aufteilung und RCD prüfen
- **Fundstelle:** BDEW-Musterwortlaut TAB 2023 v2.0, Kap. 7.4.2; TAB NS Westnetz 01.09.2025, Kap. 11 (TN-System)

### R11 · Leistungsbilanz knapp
- **Wann:** Hausanschlusssicherung unter 50 A und zwei oder mehr Vorhaben
- **Maßnahme:** HINWEIS: Leistungsbilanz rechnen; Leistungserhöhung, die eine höhere Absicherung bedingt, ist Anpassungsauslöser
- **Fundstelle:** BDEW-Musterwortlaut TAB 2023 v2.0, Kap. 7.4.2

### R12 · Wallbox > 12 kVA
- **Wann:** Wallbox geplant und größte SteuVE > 12 kW
- **Maßnahme:** HINWEIS: genehmigungspflichtig (nicht nur anmeldepflichtig) – vor Installation beim Netzbetreiber beantragen
- **Fundstelle:** NAV § 19

### R13 · Bauart unbekannt
- **Wann:** Bauart = Unbekannt
- **Maßnahme:** HINWEIS: Bauart vor Ort nach BDEW-Tabelle Anhang G bestimmen, sonst keine Aussage möglich
- **Fundstelle:** BDEW-Musterwortlaut TAB 2023 v2.0, Anhang G (S. 57)

### R14 · DIN-43870-Schrank nur mit Anpassung
- **Wann:** Bauart = DIN-43870-Zählerschrank mit Trennvorrichtung im AAR oder NH-Sicherung im NAR, Vorhaben geplant
- **Maßnahme:** Weiterverwendung nur nach Anpassung: Vorgaben des Netzbetreibers umsetzen, Verantwortung liegt beim Errichter
- **Fundstelle:** BDEW-Musterwortlaut TAB 2023 v2.0, Anhang G (S. 57), „ja 4)“; Westnetz-Schulung „Bewertung von Zählerplätzen in Bestandsanlagen“ (09/2025), Bild 5–8

### R15 · Keine RJ45-Buchse „CLS“
- **Wann:** SteuVE > 4,2 kW oder PV geplant und keine RJ45-Buchse am Zählerplatz. Westnetz fordert sie auch bei Relaissteuerung
- **Maßnahme:** RJ45-Buchse (Hutschiene, max. 1 TE, mind. Cat 5e, hinter Abdeckung) im AAR oberhalb RfZ setzen und mit „CLS“ beschriften; bei 3-Punkt mit zusätzlicher Relaissteuerung oberhalb des Steuergerätefelds. Vorhandene Buchse weiterverwenden
- **Fundstelle:** TAB NS Westnetz 01.09.2025, Kap. 9.2 und 14.5; Westnetz-Anweisung „Techn. Mindestanforderungen steuerbare Einrichtungen“ 01.07.2024, Kap. 7.2.2

### R16 · Relaissteuerung ohne Steuersignal-Klemmleiste
- **Wann:** Steuerung über potentialfreie Kontakte geplant (oder PV ≥ 25 kWp mit FRE) und keine 6-polige Steuersignal-Klemmleiste im AAR
- **Maßnahme:** 6-polige Steuersignal-Klemmleiste (UNSM / 60 % / 30 % / 0 % / UsteuVE / steuVE) im AAR über dem RfZ, bei 3-Punkt über dem Steuergerätefeld; immer vollständig 6-polig. Koppelrelais im Verteilerfeld nur bei > 1 A, mehreren SteuVE oder Invertierung; Versorgung aus dem gemessenen Bereich
- **Fundstelle:** TAB NS Westnetz 01.09.2025, Kap. 9.2 (Abb. 4, Tab. 1) und 14.5

### R17 · Keine Datenleitung zur SteuVE
- **Wann:** Digitale Steuerung geplant und keine Datenleitung (mind. Cat 5) von SteuVE/EMS zur RJ45-Buchse
- **Maßnahme:** Datenleitung mind. Cat 5 von SteuVE oder EMS zur RJ45-Buchse im AAR; mehrere Geräte über EEBUS-fähigen Switch (max. 4 Geräte je Steuerbox). Westnetz nutzt ausschließlich EEBUS
- **Fundstelle:** TAB NS Westnetz 01.09.2025, Kap. 9.2; Westnetz-Anweisung „Techn. Mindestanforderungen steuerbare Einrichtungen“ 01.07.2024, Kap. 7.1

### R18 · Direktmessung überschritten
- **Wann:** Summe Dauerbetrieb nach Umbau > 30 kW
- **Maßnahme:** Wandlermessung (halbindirekt) nach DIN VDE 0603-2-2 mit 3-Punkt oder BKE-I; über 200 A mit Westnetz abstimmen
- **Fundstelle:** Westnetz-Schulung „Bewertung von Zählerplätzen in Bestandsanlagen“ (09/2025), „Messarten“ (60-A-Zähler bis max. 30 kW Dauerbetrieb); TAB NS Westnetz 01.09.2025, Kap. 7.3

### R19 · Verdrahtung 10 mm² zu schwach
- **Wann:** Verdrahtung 10 mm² und Dauerbetriebsstrom > 32 A (≈ 22 kW bei 400 V)
- **Maßnahme:** Zählerplatzverdrahtung 16 mm² (Dauerbetrieb bis 44 A, SLS bis 50 A)
- **Fundstelle:** VDE-AR-N 4100, Tabelle Strombelastbarkeit Zählerplatz (in Westnetz-Schulung „Bewertung von Zählerplätzen in Bestandsanlagen“ (09/2025)); BDEW-Musterwortlaut TAB 2023 v2.0, Kap. 7.4.2 (Dauerstrombelastung). Werte der Ausgabe 2026-04 prüfen

### R20 · PV ≥ 25 kWp ohne FRE
- **Wann:** PV geplant mit ≥ 25 kWp
- **Maßnahme:** Funkrundsteuerempfänger auf TSG-Feld (DIN VDE 0603, 3-Punkt), parallel zur späteren Steuerbox über die Steuersignal-Klemmleiste verdrahtet; Relais K1 nicht anschließen
- **Fundstelle:** TAB NS Westnetz 01.09.2025, Kap. 14.5, Tab. 14.2

### R21 · PV mit Smart-Meter-Steuerung
- **Wann:** PV geplant und (SteuVE am Anschluss oder PV > 7 kWp)
- **Maßnahme:** HINWEIS: Messstellenbetreiber baut iMSys + Steuerbox; danach PV und Speicher ab 0 kW separat über das SMGW steuern. Steuerung schon jetzt vorbereiten (RJ45 oder Klemmleiste im AAR), damit später nichts mehr umgebaut werden muss
- **Fundstelle:** TAB NS Westnetz 01.09.2025, Kap. 14.5; Westnetz-Anweisung „Techn. Mindestanforderungen steuerbare Einrichtungen“ 01.07.2024, Kap. 6.3

### R22 · Zählerauftrag durch Westnetz
- **Wann:** SteuVE > 4,2 kW geplant
- **Maßnahme:** HINWEIS: I-Auftrag über das Installateurportal; Zählermontage durch Westnetz (kein ZZV). Messkonzeptwechsel ebenfalls per I-Auftrag
- **Fundstelle:** Westnetz-Schulung „Bewertung von Zählerplätzen in Bestandsanlagen“ (09/2025), „Montage durch Westnetz“, „Messkonzeptwechsel“

### R23 · 3-Punkt-Zähler bei Relaissteuerung
- **Wann:** Relaissteuerung geplant, Zählerbefestigung 3-Punkt, kein freies Steuergerätefeld
- **Maßnahme:** Umrüstung auf eHZ: BKE-I mit Adapterplatte BKE-AZ (Anschluss 10–16 mm², RfZ waagerecht auf mind. 2 Hutschienen, 1 × 10 + 1 × 5 TE); Adapterplatte gehört zur Kundenanlage
- **Fundstelle:** Westnetz-Anweisung „Techn. Mindestanforderungen steuerbare Einrichtungen“ 01.07.2024, Kap. 6.4 und 8.2.5; TAB NS Westnetz 01.09.2025, Kap. 7.2 (Hinweis Adapterplatte)

### R24 · PV: 60 %-Begrenzung bis SMGW
- **Wann:** PV geplant
- **Maßnahme:** HINWEIS: EEG-Anlagen < 100 kW mit Einspeisevergütung auf 60 % Einspeiseleistung begrenzen, bis iMSys mit Steuerbox eingebaut und getestet ist
- **Fundstelle:** TAB NS Westnetz 01.09.2025, Kap. 14.5

### R25 · Speicher-Betriebsweise klären
- **Wann:** Speicher geplant
- **Maßnahme:** HINWEIS: Lädt der Speicher auch aus dem Netz, braucht er eine eigene Steuerung (eigene Steuerbox und Klemmleiste je Energieart); nur PV-geladen ohne Rückspeisung: keine; PV-geladen mit Rückspeisung: gemeinsam mit PV. Betriebsweise per Energieflussrichtungssensor sicherstellen
- **Fundstelle:** TAB NS Westnetz 01.09.2025, Kap. 14.5

### R26 · Relaissteuerung nur bis 2028
- **Wann:** Relaissteuerung geplant
- **Maßnahme:** HINWEIS: Ein Relaiskontakt reicht bei Neuanlagen nur bis 31.12.2028; ab 01.01.2029 werden Neuanlagen über die digitale Schnittstelle angebunden. Bestands-SteuVE (vor 2024) bis 01.01.2029 umstellen
- **Fundstelle:** Westnetz-Anweisung „Techn. Mindestanforderungen steuerbare Einrichtungen“ 01.07.2024, Kap. 6.1
