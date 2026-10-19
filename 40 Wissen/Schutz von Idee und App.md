---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-10-19
status: analyse – keine Rechtsberatung, offene Punkte vom Anwalt prüfen lassen
---
# Schutz von Idee und App („Zählerklar“)

> Analyse der Nachtschicht vom 19.10.2026, **keine Rechtsberatung**. Alles mit ⚖️ ist unsicher und gehört vor einer Entscheidung zu Anwalt oder Steuerberater. Kosten sind Größenordnungen aus dem Gedächtnis und vor Ausgabe zu prüfen.

**Kurzfassung:** Eine *Idee* ist in Deutschland nicht schützbar. Schützbar sind Code, Name und mit Einschränkung das Regelwerk als Geheimnis. Der wertvollste Teil ist das Regelwerk R01–R26 (siehe [[Regelwerk R01–R26]]). **Es liegt heute komplett im Browser jedes Nutzers.** Das ist das größte konkrete Risiko, aber erst relevant, sobald Fremde Zugang bekommen. Gegen Nachahmer schützt in dieser Phase vor allem Tempo und Netzwerk ([[Mein Vorteil]]), nicht Recht.

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Wie / Kosten | Einschätzung |
|---|---|---|---|
| **Idee** („Foto → Zählerschrank-Einschätzung“) | keiner | – | Jeder darf sie nachbauen. Nicht ändern, nur schneller sein. |
| **Quellcode** (Web-App, Edge Function) | Urheberrecht (§§ 69a ff. UrhG), entsteht automatisch | 0 € | Schützt nur vor 1:1-Kopie, nicht vor Nachbau mit eigenem Code. Entstehungsnachweis: Git-Historie, Commit-Daten sichern. |
| **Texte, Bilder, Flyer, Posts** | Urheberrecht | 0 € | Eigene Fotos/Texte ja; Canva-/KI-Material und Fremdbilder → [[Bildrechte im Marketing]]. |
| **Name „Zählerklar“** | Marke (DPMA) oder Benutzungsmarke/Geschäftsbezeichnung | Anmeldung DPMA grob 290 € für bis zu 3 Klassen, weitere Klassen ca. 100 € je Klasse (Online-Anmeldung, Stand ⚖️ prüfen); Klassen 9 und 42 laut [[ADR-0006 Produktname Zählerklar]] | **Sinnvoll, aber erst nach Recherche und erst bei Go.** Zeitrang zählt (Priorität). Ohne Recherche riskiert man, selbst abgemahnt zu werden. |
| **Regelwerk** (26 Regeln, Auslegung, Gewichtung) | Geschäftsgeheimnis nach GeschGehG; als Tabelle/Datenbank evtl. Urheberrecht/Datenbankschutz ⚖️ | 0 €, aber **nur mit „angemessenen Geheimhaltungsmaßnahmen“** (§ 2 Nr. 1 GeschGehG) | Schutz entfällt praktisch, wenn man das Geheimnis selbst ungeschützt ausliefert (siehe Abschnitt 2). |
| **Zugrunde liegende Fakten** (TAB, VDE-Normen, BDEW-Musterwortlaut) | keiner für mich, **Normtexte sind Rechte Dritter** | – | Nur Fundstellen verwenden, wie in [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]] festgelegt. Das Regelwerk ist großenteils *öffentlich ableitbar* – wertvoll ist die Zusammenstellung, nicht die einzelne Aussage. |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist nicht patentierbar (§ 1 Abs. 3 PatG); Gebrauchsmuster schließt Computerprogramme aus | Patent: vier- bis fünfstellig plus Anwalt | **Nicht verfolgen.** Kosten und Aussicht stehen in keinem Verhältnis zum Stand der Idee. ⚖️ falls später ein technisches Verfahren (z. B. Foto-Erkennungsverfahren) als Besonderheit gilt. |

Reverse Engineering ist nach GeschGehG (§ 3 Abs. 1 Nr. 2) grundsätzlich *erlaubt*, **wenn nichts anderes vertraglich vereinbart ist**. Deshalb sind Nutzungsbedingungen (Abschnitt 3) kein Beiwerk, sondern Teil des Schutzes. ⚖️ Durchsetzbarkeit gegenüber Verbrauchern/Handwerkern vom Anwalt prüfen lassen.

## 2. Technischer Befund: Regelwerk liegt im Browser
**Befund (geprüft im Code, 19.10.2026):**
- `web/src/regeln.json` (ca. 14 KB, Regel-ID, Name, Bedingung als Klartext, Maßnahme, Stufe, Fundstelle, Geltung, Status) wird in `web/src/regelwerk.ts` per `import` eingebunden und von Vite ins JavaScript-Bundle gebaut.
- `regelwerk.ts` enthält zusätzlich die **komplette Auswertelogik** (`ausgeloesteRegeln`, 1:1 aus der Excel).
- Wer die App öffnet, kann das Bundle in den Browser-Entwicklertools lesen. Gleiches gilt für das Demo-Artifact (`build:demo`, privat auf claude.ai, aber ein Artifact ist ein einzelnes HTML mit allem drin – nicht weitergeben).
- Der Zugangscode `APP_CODE` schützt nur die **Edge Function** (Analyse, Fälle), **nicht** das Regelwerk: Die App-Dateien selbst werden von Netlify öffentlich ausgeliefert, sobald sie online ist ([[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]]). Ein Login-Zwang in der Oberfläche würde das Bundle nicht verstecken.

**Bewertung:**
| Aspekt | Einschätzung |
|---|---|
| Wahrscheinlichkeit | Heute gering (App nicht online, kaum Nutzer, kleine Nische). Steigt mit Reichweite. Wer die Regeln will, braucht nur 5 Minuten. |
| Schaden | Mittel bis hoch: Der Vorsprung laut Score ([[Zählerschrank-Check]], „Vorsprung 5“) ist genau dieses Regelwerk. Ein Nachbauer müsste dann nur noch die Foto-Erkennung anstecken. |
| Rechtliche Folge | Das Regelwerk gilt kaum noch als „Geheimnis mit angemessenen Maßnahmen“, wenn es öffentlich ausgeliefert wird ⚖️. Auch Urheberrecht bleibt bestehen, ist aber schwer durchzusetzen. |
| Entschärfend | Die Inhalte beruhen auf öffentlichen Quellen (Fundstellen stehen sogar im Text). Ein Konkurrent könnte sie in Monaten selbst herleiten. Der Schutzwert liegt in der *Aufbereitung und Belegtheit* (offene Regeln R07, R09, R11, R19 sind es noch nicht). |

**Lösungsskizze: Auswertung serverseitig**
1. Die Auswertung (`ausgeloesteRegeln` + Regeltexte) läuft in der Edge Function, neuer Endpunkt z. B. `POST /bewerten` (mit `x-app-code`/später Login). Eingabe: die `Eingaben` aus `modell.ts`. Ausgabe: `Ergebnis` mit Ampel, Maßnahmen, Fundstelle, „Vor Ort klären“ und Hinweisen – **nur für den konkreten Fall**, nie die Regelliste.
2. `regeln.json` wandert nach `supabase/functions/api/` (nicht ins `web/`-Bundle). `regelwerk.ts` wird in ein gemeinsames Modul ohne Browserabhängigkeit zerlegt, das die Tests (`regelwerk.test.ts`, 13 Tests) weiter ausführen. Deno-Funktion und Vitest nutzen denselben Code.
3. Die Web-App ruft nur noch `bewerten` auf. Der Demo-Build (`build:demo`) braucht eine Sonderlösung (Beispieldaten fest hinterlegt, **keine** echten Regeln).
4. Kosten/Aufwand: ca. 1 Nachtschicht für Umbau und Tests; Folgekosten Edge-Function-Aufrufe im Free Tier unkritisch.

**Grenzen, ehrlich:**
- Auch serverseitig kann ein Nutzer das Regelwerk durch systematisches Ausprobieren (viele Eingaben, Ergebnisse vergleichen) rekonstruieren. Das ist bei 26 Regeln machbar, aber mühsam und je Versuch ein Aufruf. Dagegen helfen **Login statt Zugangscode, Rate-Limit pro Konto, Protokoll auffälliger Nutzung** – alles bisher offen ([[App & Technik]], „bewusst offen: kein Rate-Limit“).
- Der Offline-Modus (bisher „erst nach Go“) verträgt sich nicht mit serverseitigem Regelwerk. Das ist ein Zielkonflikt, den man bewusst entscheiden muss: Offline auf der Baustelle (Funkloch) gegen Schutz. Der Entwurf ist deshalb für die **Test-Phase mit wenigen Kollegen** nicht zwingend, **vor einem öffentlichen Start** schon.
- Das Git-Repository `zaehlerschrank-check` enthält `regeln.json` im Klartext. Sichtbarkeit auf GitHub (privat/öffentlich) prüfen, nicht öffentlich stellen. Auch der Vault enthält [[Regelwerk R01–R26]] und die Excel – ebenfalls privat halten.

## 3. Verträge und Zugang
| Maßnahme | Zweck | Anmerkung |
|---|---|---|
| **NDA/Geheimhaltung für Tester** | Kollegen, die mittesten (4 warten laut [[Aufgaben]]), sehen Regelwerk-Ergebnisse und sind Zeugen | Kurze Einseitige Vereinbarung (Text oder Anhang zur WhatsApp-Zusage). Für Kollegen im Gespräch reicht keine NDA – dort nichts Regelwerks-Internes herausgeben. ⚖️ Vorlage vom Anwalt, keine Fremd-Vorlage unbesehen. |
| **Nutzungsbedingungen** | Kopier-, Weitergabe- und Reverse-Engineering-Verbot, Zugang nur persönlich, kein Scraping, Hinweis auf Haftungsausschluss (Ersteinschätzung, Prüfung durch Elektrofachkraft) | Gehört in App und Landingpage, zusammen mit [[Rechtliches]]. ⚖️ Wirksamkeit gegenüber Verbrauchern (AGB-Recht) prüfen. |
| **Zugang nur mit Login** | Ein Konto je Person, Zugangscode weg | Steht bereits in „Irgendwann“ („Login statt Zugangscode, bevor Kollegen testen“) und wird hiermit **wichtiger**. Supabase Auth ist die naheliegende Lösung. |
| **Datenschutz** | Auftragsverarbeitung Supabase, Anthropic, Netlify | Schon in [[Rechtliches]]; unabhängig vom Diebstahlschutz nötig. |

## 4. Arbeitgeber-Frage (offene Frage für Anwalt/Steuerberater)
**Unbekannt ist:** ob der Nutzer angestellt im Elektrohandwerk arbeitet und wie der Arbeitsvertrag lautet. Die Analyse kann das nicht beantworten, das Fachwissen kommt aus dem Beruf ([[Mein Vorteil]]). Mögliche Berührungspunkte:
- **Urheberrecht an Software** (§ 69b UrhG): Programme, die ein Arbeitnehmer *in Wahrnehmung seiner Aufgaben oder nach Anweisung* schreibt, gehören dem Arbeitgeber. Programmieren gehört bei einem Elektriker normalerweise nicht zu den Aufgaben, daher eher unkritisch ⚖️. Wichtig: nichts auf Arbeitszeit, mit Betriebsgeräten oder Firmenkonten erstellen.
- **Arbeitnehmererfindungsgesetz:** betrifft patentierbare Erfindungen; bei Software meist nicht einschlägig ⚖️.
- **Nebentätigkeit:** Vertrag auf Anzeige-/Genehmigungspflicht prüfen. Eine Tätigkeit, die dem Arbeitgeber *Konkurrenz* macht, kann verboten sein (während des Arbeitsverhältnisses besteht Wettbewerbsverbot ⚖️). Die App richtet sich an Elektrobetriebe, also u. U. an Wettbewerber/Kunden des Arbeitgebers.
- **Herkunft des Wissens:** Die Excel-Grundlage ([[Entscheidungsbaum Excel]]) und die Westnetz-Schulung (09/2025) als Quelle: Wer hat sie wann und womit erstellt, wer darf sie nutzen? Interne Firmenunterlagen dürfen nicht ins Regelwerk fließen. Nur öffentliche Quellen und Fundstellen belegen.
- **Offene Frage für Anwalt:** „Wem gehören Regelwerk und App, wenn das Fachwissen im Angestelltenverhältnis entstanden ist, und welche Anzeige-/Wettbewerbspflichten bestehen?“ Die Frage hat Vorrang, bevor Geld (Marke, Gewerbe, Kunden) fließt.

## 5. Realistischer Schutz: Tempo, Netzwerk, Daten
Gegen einen entschlossenen Nachbauer mit Budget schützt das Recht wenig. Was wirklich zählt:
- **Vorsprung:** erste Kunden und Referenzen, bevor jemand kopiert. Das heißt Gespräche und Tester, nicht Schutzrechte. Das passt zur Reihenfolge in [[Ideen-System]] („erst verkaufen, dann bauen“).
- **Netzwerk:** Zugang zu Kollegen, Innung, Großhändler ([[Direktansprache]]) – das hat ein Konzern nicht.
- **Daten aus echten Fällen:** Jeder erfasste Fall (Foto, KI-Vorschlag, tatsächliche Entscheidung) macht Erkennung und Trefferquote besser. Das ist ein Datenschatz, der mit Nutzung wächst und sich nicht kopieren lässt. Voraussetzung: Einwilligung/Nutzungsrechte klären ⚖️ (Fotos von Anlagen Dritter, Datenschutz).
- **Belegte Regeln:** Die offenen Regeln R07, R09, R11, R19 mit Unterlagen zu belegen steigert den Wert – und senkt die Haftung.
- **Marke zur rechten Zeit:** Name sichern, sobald Recherche sauber ist.

## 6. Maßnahmenliste (priorisiert)
| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | **Arbeitgeber-Frage klären** (Arbeitsvertrag lesen, Frage an Anwalt/Steuerberater) | ggf. Erstberatung ⚖️ | 1–2 h + Termin | **vor Geld und vor öffentlichem Start** |
| 2 | GitHub-Repos und Vault auf „privat“ prüfen, Demo-Artifact nicht weitergeben | 0 € | 15 Min. | sofort |
| 3 | **Regelwerk serverseitig** (Edge Function `bewerten`) | 0 € | 1 Nachtschicht | vor öffentlichem Zugang, spätestens vor Test mit Fremden |
| 4 | Login statt Zugangscode + Rate-Limit | 0 € | 1 Nachtschicht | vor Test mit Kollegen |
| 5 | Nutzungsbedingungen + Tester-Vereinbarung (NDA light) | Anwalt/Generator, ⚖️ | 2–3 h Entwurf, Prüfung extern | vor dem ersten Tester-Zugang |
| 6 | DPMA-Recherche, dann Marke anmelden | Recherche 0 €, Anmeldung ca. 290 € | 1 h + Anmeldung | nach Go, nicht vorher |
| 7 | Entstehungsnachweis: Git-Historie sichern, Commits signiert/regelmäßig pushen | 0 € | laufend | läuft |
| 8 | Patent/Gebrauchsmuster | – | – | **nicht verfolgen** |

Daraus entstandene Aufgaben stehen in [[Aufgaben]] unter „Als Nächstes“.

## Offen / ⚖️ Anwalt
- Wem gehört die Idee im Angestelltenverhältnis (Abschnitt 4)?
- Wirksamkeit von Reverse-Engineering-Verbot und Nutzungsbedingungen gegenüber Gewerbekunden und Verbrauchern.
- Reicht eine „Geschäftsgeheimnis“-Einstufung, wenn das Regelwerk über Ergebnisse einzeln abrufbar ist?
- Schutz der Regel-Zusammenstellung als Datenbank/Sammelwerk.
- Haftung bei falscher Einschätzung (nicht Teil dieser Note, aber verwandt) → [[Rechtliches]].
