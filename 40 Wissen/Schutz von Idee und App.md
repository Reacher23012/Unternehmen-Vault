---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-10-10
---
# Schutz von Idee und App (Zählerklar)

> **Keine Rechtsberatung.** Das ist eine Analyse der Nachtschicht aus allgemeinem Wissen, ohne Recherche im Netz. Alles mit **⚖ Anwalt** muss vor einer Entscheidung geprüft werden. Gebühren und Paragrafen vor Gebrauch gegenprüfen (Stand der Angaben: Wissen bis 2026, nicht verifiziert).

**Kurzfassung:** Die *Idee* ist nicht schützbar. Schützbar sind Code, Name und – mit Aufwand – das Regelwerk als Geschäftsgeheimnis. Der größte konkrete Hebel ist technisch: Das Regelwerk liegt heute vollständig im Browser des Nutzers. Danach folgt die Arbeitgeber-Frage, die ich nicht beantworten kann. Den eigentlichen Schutz liefert Tempo (Abschnitt 5).

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Was es bringt / kostet | Einschätzung |
|---|---|---|---|
| **Idee** („Foto → Einordnung Zählerschrank“) | keiner | Ideen sind frei, jeder darf sie nachbauen | nicht schützbar |
| **Code** | Urheberrecht (§§ 69a ff. UrhG), entsteht automatisch | 0 €; schützt gegen Kopieren des Codes, nicht gegen eine eigene Neuimplementierung derselben Idee | sinnvoll, aber schwacher Schutz |
| **Name „Zählerklar“** | Marke (DPMA) | Anmeldung grob 290 € für bis zu 3 Klassen (Kl. 9, 42, evtl. 35/41), 10 Jahre Laufzeit; Recherche vorher, Widerspruchsrisiko ⚖ | lohnt erst nach Namensprüfung und erstem Signal, siehe [[ADR-0006 Produktname Zählerklar]] |
| **Regelwerk R01–R26** (Auswahl, Schwellen, Verknüpfung der Fundstellen) | Geschäftsgeheimnis nach GeschGehG, **nur wenn** „angemessene Geheimhaltungsmaßnahmen“ getroffen sind (§ 2 Nr. 1 GeschGehG) | 0 € plus Aufwand für Maßnahmen. Wer sein Wissen offen in den Browser ausliefert, hat dieses Merkmal schwer zu begründen | der eigentliche Kern, siehe Abschnitt 2 |
| **Zugrunde liegende Normen/TAB** | gehören Dritten (DIN, Netzbetreiber), nur Fundstellen genannt, keine Normtexte | – | nicht mein Schutzgegenstand, Urheberrecht Dritter beachten |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist ausgeschlossen (§ 1 Abs. 3 PatG, ähnlich beim Gebrauchsmuster) | Patent teuer und langsam, für ein Regelwerk dieser Art praktisch aussichtslos | **nicht verfolgen** |
| **Datenbank** (Sammlung echter Fälle) | evtl. Datenbankherstellerrecht (§§ 87a ff. UrhG) ⚖ | entsteht erst mit Menge | später relevant, siehe Abschnitt 5 |

Wichtig zum Geschäftsgeheimnis: Reverse Engineering eines öffentlich angebotenen Produkts ist nach § 3 GeschGehG grundsätzlich erlaubt, **sofern es nicht vertraglich verboten ist**. Deshalb gehören Nutzungsbedingungen mit Verbot dazu (Abschnitt 3).

## 2. Technischer Befund: Das Regelwerk liegt beim Nutzer
**Befund (im Code geprüft, 10.10.2026):**
- `web/src/regeln.json` (ca. 14 KB: alle Regeln mit Bedingung, Maßnahme, Stufe, Fundstelle, Geltung, Status) wird in `web/src/regelwerk.ts` per `import` geladen. `web/src/main.ts` ruft `bewerte()` direkt im Browser auf.
- Damit steckt das **gesamte Regelwerk samt Auswertungslogik im ausgelieferten JavaScript-Bundle**. Jeder, der die App-URL aufruft, kann es in den Entwicklertools lesen, ohne Login. Der `APP_CODE` schützt nur das Backend (Fotoanalyse, Fall-Speicher), **nicht** die Regeln.
- Der Zugangscode würde auch nichts ändern: Die Seite selbst ist öffentlich, sobald sie bei Netlify liegt (geplant, siehe [[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]]).
- Nebenbei: Die Edge Function (`supabase/functions/api/index.ts`) kennt die Regeln heute nicht, sie macht nur Fotoanalyse.

**Risiko-Bewertung:**
- **Kopierrisiko hoch, Schaden mittel.** Ein Konkurrent (oder ein Kollege) kann das Regelwerk in Minuten kopieren. Der Schaden ist begrenzt, weil das Regelwerk allein noch kein Produkt ist (Foto-Erkennung, Pflege bei TAB-Änderungen, Vertrieb fehlen) und viele Inhalte letztlich aus öffentlichen TAB/Normen stammen.
- **Rechtlich:** Das Argument „Geschäftsgeheimnis“ wird schwach, wenn die Regeln offen ausgeliefert werden ⚖.
- **Zeitpunkt:** Das Risiko entsteht erst mit Livegang. Solange nur mit Testern auf einem privaten Link gearbeitet wird, ist es klein (NDA, Abschnitt 3).

**Lösungsskizze „Regelwerk serverseitig“:**
1. `regelwerk.ts` + `regeln.json` in die Edge Function verlegen (Deno kann TypeScript und JSON direkt importieren; Tests laufen weiter lokal).
2. Neue Route `POST /bewerte` (mit `x-app-code`/später Login): Eingaben rein, Ergebnis raus (Ampel, Maßnahmen, „Vor Ort klären“ samt Worst-Case, Hinweise, Messkonzept). Die App bekommt je Maßnahme **Text + Fundstelle**, aber nicht die Bedingungen, Schwellen und Regel-Verknüpfungen.
3. Die App bündelt `regeln.json` nicht mehr; das Datenformat `Eingaben`/`Ergebnis` (`modell.ts`) bleibt in der App.
4. Folgen: App braucht für Ergebnisse Netz (Offline-Modus ist ohnehin „erst nach Go“, siehe [[App & Technik]]); Fall-Speicher und Trefferquote ändern sich nicht. Die Demo (Artifact) bräuchte eine abgespeckte Fassung.
5. **Grenze der Maßnahme (ehrlich):** Wer sich einloggt, kann das Regelwerk durch systematisches Abfragen Stück für Stück ausleiten („Orakel“): Der Eingaberaum ist klein. Gegenmittel: Login pro Person, Rate-Limit, Protokoll, Nutzungsbedingungen. Vollständigen Schutz gibt es nicht, es geht um „angemessene Maßnahmen“ und um Hürden.
6. Aufwand: etwa 0,5–1 Tag Code plus Tests; Kosten 0 € (bleibt im Free Tier). Reihenfolge: **nach** den Gesprächen und vor dem öffentlichen Livegang.

## 3. Verträge und Zugang
| Baustein | Zweck | Hinweis |
|---|---|---|
| **Geheimhaltungsvereinbarung (NDA)** für Tester und Kollegen, die das Regelwerk sehen oder mittesten | stärkt das Merkmal „angemessene Maßnahmen“ | einseitig oder gegenseitig, kurz und verständlich; Mustertext vom Anwalt ⚖. Praktisch: Vor dem Mittesten kurz bestätigen lassen (per WhatsApp reicht zum Anfang nicht, besser schriftlich) |
| **Nutzungsbedingungen** (kein Kopieren, kein Reverse Engineering, keine Weitergabe des Zugangs, keine automatisierte Abfrage) | macht Reverse Engineering vertraglich verboten (§ 3 GeschGehG) | Teil der späteren Rechtstexte, siehe [[Rechtliches]]; Endfassung ⚖ |
| **Zugang nur mit Login** (statt gemeinsamem Zugangscode) | Zuordnung pro Person, Sperren möglich | ist bereits als Aufgabe „Login statt Zugangscode, bevor Kollegen testen“ vermerkt; hängt mit dem Orakel-Schutz zusammen |
| **Zugangscode pro Tester** statt ein Code für alle | günstige Zwischenlösung: Weitergabe wäre nachvollziehbar | geringer Aufwand, aber braucht Backend-Änderung (mehrere Codes) |

## 4. Offene Frage für Anwalt/Steuerberater: Wem gehört die Idee?
**Ich kann das nicht beantworten, die Frage ist real.** Der Nutzer arbeitet im Elektrohandwerk; Fachwissen und Regelwerk stammen aus dieser Tätigkeit. Zu klären ⚖:
1. **Arbeitsvertrag:** Nebentätigkeits-Klausel (Anzeige- oder Genehmigungspflicht?), Wettbewerbsverbot, Verschwiegenheit über Betriebsinterna (Kunden, Preise, Verfahren des Arbeitgebers).
2. **Wettbewerb:** Richtet sich Zählerklar an Betriebe der gleichen Branche wie der Arbeitgeber? Das Angebot an Kollegen anderer Firmen kann als konkurrierend gelten. Erhöhtes Risiko, wenn Wissen oder Fälle aus dem Betrieb stammen.
3. **Urheberrecht am Programm:** Programme, die ein Arbeitnehmer in Wahrnehmung seiner Aufgaben schafft, stehen dem Arbeitgeber zu (§ 69b UrhG). Die Frage ist, ob Programmieren zu den Aufgaben gehört (vermutlich nein bei Elektriker, aber ⚖).
4. **Arbeitnehmererfindung:** gilt nur für patent-/gebrauchsmusterfähige Erfindungen, bei Software daher meist irrelevant. Trotzdem im Vertrag nachsehen.
5. **Arbeitszeit und Material:** Nichts mit Betriebsmitteln, in der Arbeitszeit oder mit Fotos aus Kundenobjekten des Arbeitgebers erstellen. Fotos echter Schränke: ohne Adresse, Namen, Zählernummer und nur mit Erlaubnis des Eigentümers/Betriebs, siehe auch [[Bildrechte im Marketing]].
6. **Steuerberater:** Nebengewerbe anmelden, Gewerbeanmeldung, Kleinunternehmerregel, Haftpflicht (Fehleinschätzung einer Zählerschrank-App ist ein Haftungsfall: Berufs-/Betriebshaftpflicht ⚖).

**Empfehlung:** Arbeitsvertrag diese Woche selbst durchlesen und mit einer **Erstberatung** (Fachanwalt für Arbeitsrecht oder IT-/Urheberrecht, oft Festpreis 100–250 €, nicht verifiziert) abklären, **bevor** Geld, Marketing oder Livegang folgen. Das ist ein Gründungsrisiko und kein Detail.

## 5. Realistischer Schutz: Tempo
Rechtlich bleibt das meiste dünn. Was ein Nachbauer nicht schnell kopieren kann:
- **Vorsprung:** erste Betriebe und Handwerkskammer/Innung als Kanal, bevor jemand anderes kommt (siehe [[ADR-0005 Direktansprache vor Instagram]]).
- **Netzwerk und Vertrauen:** Kollegen kennen den Nutzer persönlich. Das ist der echte Vorteil, siehe [[Mein Vorteil]].
- **Daten aus echten Fällen:** Jeder gespeicherte Fall samt tatsächlicher Entscheidung verbessert Trefferquote und Fotoerkennung. Das ist mit der Zeit wertvoller als die 26 Regeln. Datenschutz beachten (Fotos, Adressen, DSGVO ⚖).
- **Pflege:** Das Regelwerk veraltet mit jeder TAB-Änderung (siehe „Neue Westnetz-TAB beobachten“). Wer es laufend aktuell hält, ist dem Nachbauer voraus.
- **Marke und Domain:** `zaehlerklar.de` und DPMA-Recherche, bevor Material gedruckt wird.

Ehrlich: Gegen einen gut finanzierten Wettbewerber hilft das alles nicht. Das Ziel ist hier nicht Unangreifbarkeit, sondern ein schneller erster Euro bei Kollegen. Schutz darf die Validierung nicht aufhalten: **Regel 1 des [[Ideen-System]]s bleibt: erst verkaufen.**

## 6. Maßnahmenliste (priorisiert)
| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | Arbeitsvertrag lesen, Erstberatung zur Arbeitgeber-Frage ⚖ | ca. 100–250 € (Schätzung) | 2 Std. + Termin | **vor** Livegang und Geld |
| 2 | Kurze NDA für Tester/Kollegen (Vorlage vom Anwalt) | im Beratungstermin enthalten oder gering | 1 Std. | vor dem Mittesten |
| 3 | Regelwerk serverseitig (Abschnitt 2) | 0 € | 0,5–1 Tag Code | vor öffentlichem Livegang |
| 4 | Pro-Tester-Zugangscodes bzw. Login, Rate-Limit | 0 € | 0,5–1 Tag Code | mit 3 |
| 5 | Nutzungsbedingungen (Kopier-/Reverse-Engineering-Verbot) in Rechtstexte | im Anwaltstermin (⚖ Endfassung) | 1 Std. | mit [[Rechtliches]] |
| 6 | Namensprüfung, danach Markenanmeldung Kl. 9/42 | ca. 290 € + Recherche | 2 Std. | nach Go, nicht davor |
| 7 | Daten sammeln (20 Fälle, dann mehr) und Regelwerk pflegen | 0 € | laufend | dauerhaft |
| – | Patent / Gebrauchsmuster | hoch | – | **nicht verfolgen** |

Aus 3 und 4 sind Aufgaben in [[Aufgaben]] angelegt (3 als eigene Code-Zeile für eine spätere Nachtschicht).
