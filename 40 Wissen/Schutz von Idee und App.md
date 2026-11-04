---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-11-04
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App („Zählerklar“)

> **Hinweis:** Das ist eine Sach-Analyse der Nachtschicht, **keine Rechtsberatung**. Alles mit ⚖️ bitte vom Anwalt (Fachanwalt für IT-/Urheberrecht bzw. Arbeitsrecht) oder Patentanwalt prüfen lassen. Kosten sind grobe Größenordnungen, Stand Wissen der Nachtschicht, nicht tagesaktuell geprüft.

**Kurzfazit:** Die *Idee* ist nicht schützbar. Schützbar sind Code, Texte, Name und – mit Aufwand – das Regelwerk als Geschäftsgeheimnis. Das größte *technische* Loch: das komplette Regelwerk liegt im Browser jedes Nutzers. Das größte *rechtliche* Fragezeichen: ob der Arbeitgeber Ansprüche anmelden könnte (⚖️). Der realistisch beste Schutz ist Tempo und ein Datenvorsprung (→ [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]).

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Wie / Kosten | Einschätzung |
|---|---|---|---|
| **Die bloße Idee** („Foto → Maßnahmenliste“) | keiner | – | Ideen sind frei. Wer sie nachbaut, verletzt nichts. |
| **Quellcode, Oberfläche, Texte** | Urheberrecht (§ 69a ff. UrhG), entsteht automatisch | 0 €. Nachweis: Git-Historie mit Datum, ggf. Hinterlegung | Schützt nur vor 1:1-Kopie, nicht vor Nachbau mit eigenem Code. |
| **Name „Zählerklar“** | Marke beim DPMA (Klassen 9, 42) | Anmeldung ca. 290 € (Online, 3 Klassen inkl.), Laufzeit 10 Jahre; vorher Recherche (→ [[ADR-0006 Produktname Zählerklar]]) | Sinnvoll, **sobald** Name und Domain sicher sind und erste Nutzer da sind. Beschreibende Anklänge („Zähler“, „klar“) können die Eintragung erschweren ⚖️. |
| **Regelwerk R01–R26, Texte, Know-how, Fotodaten** | Geschäftsgeheimnisgesetz (GeschGehG) | 0 € – aber nur, wenn **„angemessene Geheimhaltungsmaßnahmen“** getroffen sind (§ 2 Nr. 1 b GeschGehG) | Hier liegt der eigentliche Wert. Ohne Maßnahmen (siehe 2 und 3) kein Schutz. |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist nicht patentierbar (§ 1 Abs. 3 PatG); technische Lösungen können es sein | Patentanwalt, 4-stellig und aufwendig | Für dieses Produkt unrealistisch: ein Regelwerk aus Normen/TAB ist keine technische Erfindung. **Nicht verfolgen.** ⚖️ |
| **Normtexte / TAB-Inhalte** | gehören den Herausgebern | – | Nicht übernehmen, nur Fundstellen (steht schon so in [[Rechtliches]]). Schützt auch uns vor Ansprüchen. |
| **Datenbank** (Fälle, Fotos) | Datenbankschutzrecht (§§ 87a ff. UrhG) bei wesentlicher Investition | 0 € | Greift erst bei einem größeren Bestand. |

## 2. Technischer Befund: Das Regelwerk liegt im Browser
**Befund (geprüft im Code):** `web/src/regelwerk.ts` importiert `web/src/regeln.json` und die Auswertung läuft im Browser. Beides wird ins App-Bundle gebaut (Vite). Jeder, der die App öffnen kann, bekommt damit *alle* 26 Regeln, Bedingungen, Maßnahmen und Fundstellen (~14 KB JSON) plus die komplette Entscheidungslogik – lesbar über die Browser-Entwicklertools, Minifizierung ändert daran praktisch nichts.

**Bewertung:**
- Heute: Zugang nur mit Zugangscode, und die App ist nicht online → Risiko gering.
- Sobald App online ist oder Kollegen testen: Jeder Tester kann das Regelwerk in 5 Minuten kopieren. Das wäre auch rechtlich ein Problem: Ein Geschäftsgeheimnis, das jedem Nutzer ohne Schranke ausgeliefert wird, gilt schwerlich als „angemessen geschützt“ ⚖️. Reverse Engineering ist nach § 3 GeschGehG grundsätzlich *erlaubt*, sofern es nicht vertraglich ausgeschlossen ist (→ Punkt 3).
- Der Wert liegt nicht in den Normverweisen (öffentlich), sondern in der **Zusammenstellung, Gewichtung und Ablauflogik** und später in den **gemessenen Trefferdaten**.

**Lösung (Skizze):**
1. Regelauswertung in die Edge Function verlegen (`supabase/functions/api`): neue Route z. B. `POST /auswertung` nimmt die `Eingaben`, liefert nur `Ergebnis` (Ampel, Maßnahmen, „Vor Ort klären“, Fundstellen) zurück.
2. `regeln.json` und die Logik aus `regelwerk.ts` wandern in die Funktion (Code-Teil gemeinsam nutzbar, nicht ins Web-Bundle). Die App behält nur Typen (`modell.ts`) und die Darstellung.
3. Offline-Fähigkeit entfällt (ist ohnehin „erst nach Go“, siehe [[App & Technik]]); die lokale Entwicklung ohne Backend braucht einen Dev-Modus mit Beispieldaten.
4. Tests (`regelwerk.test.ts`, 13 Stück) laufen weiter gegen dieselbe Logik, nur an anderem Ort.
5. Grenze: Auch dann kann ein Nutzer durch *Probieren* (viele Eingabekombinationen) das Verhalten nachbilden. Das ist der Preis jedes SaaS. Gegenmittel: Login, Rate-Limit, Nutzungsbedingungen, Auffälligkeiten loggen. Es bleibt ein Vorsprung auf Zeit, kein Panzerschutz.
6. Aufwand: etwa 1 Nachtschicht für den Umzug, 1 weitere für Tests/Dev-Modus. Kein neuer Dienst, keine Kosten. Edge-Function-Neueinspielung ist ohnehin offen.

## 3. Verträge und Zugang
- **NDA für Tester/Kollegen:** Kurze Geheimhaltungsvereinbarung (1 Seite) *bevor* jemand die App sieht. Inhalt: Zweck (Mittesten), keine Weitergabe, kein Kopieren/Nachbauen, Laufzeit (z. B. 2–5 Jahre), Rückgabe/Löschung. Kosten: Vorlage ~0 €, anwaltliche Prüfung ⚖️ ~100–300 €. Realistisch: Mit Kollegen im Handwerk ist ein NDA unüblich; als freundliche „Testvereinbarung“ formulieren. Ehrlich: **Durchsetzbar ist das nur gegen Leute, die man kennt.**
- **Nutzungsbedingungen (AGB) für die App:** Zweck, Haftungshinweis (ersetzt keine Prüfung durch den Errichter), **Verbot von Kopieren, automatisiertem Abfragen und Reverse Engineering** (macht den Ausnahmetatbestand in § 3 GeschGehG unwirksam), Rechteeinräumung an hochgeladenen Fotos (für Auswertung/Verbesserung). Kosten ⚖️ Anwalt/Generator, 150–500 €. Hängt mit [[Rechtliches]] zusammen.
- **Zugang nur mit Login:** Heute ein gemeinsamer `APP_CODE` – wird er weitergegeben, ist er wertlos. Schon als Aufgabe vorhanden („Login statt Zugangscode, bevor Kollegen testen“, derzeit unter *Irgendwann*). **Empfehlung: vor dem ersten Kollegen-Test hochziehen**, dazu pro Tester ein Konto, damit Abfluss nachvollziehbar ist. Das widerspricht nicht der Regel „erst validieren“, weil es den Test absichert.
- **Landingpage/Flyer:** Nichts Regelwerk-Internes veröffentlichen; Instagram-Rätsel zeigen einzelne Beispiele, nicht die Struktur. Posts 1–10 darauf gegenlesen ([[Instagram-Posts 1–10]]).

## 4. Offene Frage: Gehört die Idee dem Arbeitgeber? ⚖️
**Nicht von der Nachtschicht zu beantworten – bitte Anwalt (Arbeitsrecht) oder Steuerberater/Handwerkskammer-Rechtsberatung fragen.** Fragen dazu:
1. **Arbeitsvertrag:** Wie ist der Vertrag formuliert (Nebentätigkeit, Wettbewerbsverbot, Verschwiegenheit, Rechteübertragung)? Ist eine Nebentätigkeit genehmigungspflichtig/angezeigt?
2. **Wettbewerb:** Ist ein Produkt für Elektrobetriebe, also potenzielle Konkurrenten/Kunden des Arbeitgebers, ein Wettbewerbsfeld? Während des Arbeitsverhältnisses gilt ein gesetzliches Wettbewerbsverbot (§ 60 HGB analog für Handlungsgehilfen; im Handwerk je nach Vertrag) ⚖️.
3. **Arbeitnehmererfindung:** ArbnErfG betrifft *patentfähige* Erfindungen/Gebrauchsmuster. Für Software/Regelwerk ohne Patent meist nicht einschlägig, aber **Diensterfindung** vs. **freie Erfindung** wäre zu klären ⚖️.
4. **Urheberrecht am Code:** Für Programme, die ein Arbeitnehmer *in Ausübung seiner Pflichten oder nach Weisung* schafft, stehen die Nutzungsrechte dem Arbeitgeber zu (§ 69b UrhG). Wurde der Code komplett privat, in der Freizeit, mit privaten Mitteln gebaut, spricht viel dagegen – ⚖️ zu klären.
5. **Know-how aus dem Betrieb:** Stammt das Regelwerk aus betrieblichen Unterlagen (Schulungen, Kundenfälle, interne TAB-Auswertungen)? Dann kann der Arbeitgeber Verschwiegenheit oder Eigentum geltend machen. Das Regelwerk basiert laut Notizen auf der Westnetz-Schulung (09/2025) und dem BDEW-Musterwortlaut; woher die Schulung stammt und ob sie intern ist, sollte geklärt werden.
6. **Kundendaten/Fotos:** Fotos echter Schränke aus dem Arbeitsalltag gehören nicht ohne Weiteres dem Nutzer (Datenschutz, Kundenvertrag, Arbeitgeberdaten). Eigene Fotos, ohne Adresse/Namen/Zählernummer (steht schon in [[Aufgaben]]).
7. **Praktisch:** Wer genau ist Anbieter – Privatperson, Kleingewerbe, später GbR/UG? Das hängt mit Impressum, Steuer (Steuerberater) und Haftung zusammen.

→ Empfehlung: **eine Beratungsstunde Arbeitsrecht vor dem ersten Euro Umsatz** (grob 150–300 €), Vertrag mitbringen. Die Antwort kann *Wettbewerbs- und Rechteproblem* sofort lösen (z. B. schriftliche Freigabe des Arbeitgebers).

## 5. Realistischer Schutz: Tempo, Netzwerk, Daten
Ehrlich: Eine Idee dieser Art lässt sich von einem fähigen Wettbewerber in Wochen nachbauen. Was *nicht* so schnell kopierbar ist:
- **Vorsprung:** Regelwerk R01–R26 mit Fundstellen, Fachurteil, Pflege bei TAB-Änderungen ([[Mein Vorteil]]).
- **Netzwerk:** Direkter Zugang zu Kollegen/Innung/Großhändler ([[Direktansprache]]). Wer zuerst bei den ersten 20 Betrieben ist, wird zum Standard.
- **Daten aus echten Fällen:** Fall + Foto + „tatsächliche Entscheidung“ ergibt Trefferquote und Trainings-/Prüfdaten. Das ist der härteste Graben. **Jeder erfasste Fall ist Schutz** (und bestätigt die Priorität „20 Schränke erfassen“).
- **Vertrauen/Marke:** Fachlich korrekt, Fundstelle immer dabei, Pflege des Namens.
- **Geschwindigkeit der Validierung:** Wer die Gespräche führt, lernt, was Betriebe wirklich zahlen. Schutz-Maßnahmen dürfen die Validierung nicht verzögern (CLAUDE.md: erst verkaufen, dann bauen).

## 6. Priorisierte Maßnahmenliste
| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | Nichts Regelwerk-Internes online/öffentlich, solange nicht serverseitig (App bleibt privat, Demo nur mit Beispieldaten) | 0 € | 0 | sofort |
| 2 | Beratung Arbeitsrecht: Nebentätigkeit/Wettbewerb/Rechte (Frage 4.1–4.7) ⚖️ | 150–300 € | 1–2 h | vor erstem Umsatz, am besten vor dem Mittesten |
| 3 | Testvereinbarung/NDA für Tester (Vorlage, prüfen lassen) ⚖️ | 0–300 € | 1 h | vor Mittesten |
| 4 | Login statt Zugangscode (pro Tester Konto) | 0 € | 1 Nachtschicht+ | vor Kollegen-Test |
| 5 | **Regelwerk serverseitig** (Code-Aufgabe) | 0 € | 1–2 Nachtschichten | vor App-Livegang |
| 6 | Nutzungsbedingungen mit Kopier-/Reverse-Engineering-Verbot ⚖️ | 150–500 € | 2 h | vor Livegang |
| 7 | Git-Historie sauber halten, Repos privat lassen, keine Schlüssel im Code | 0 € | laufend | laufend |
| 8 | Domain + Markenrecherche DPMA; später Anmeldung Wortmarke (Klassen 9, 42) | ~290 € + ggf. Anwalt | 2 h | nach Namensprüfung, vor großem Marketing |
| 9 | Fälle + Fotos systematisch sammeln (Datenvorsprung), Einwilligung in AGB | 0 € | laufend | ab erstem Test |
| 10 | Patent: nicht verfolgen | – | – | – |

## Quellen und Grenzen
Grundlage: GeschGehG, UrhG (§§ 69a ff., 87a ff.), PatG § 1, MarkenG, Preisangaben des DPMA (Größenordnung, nicht geprüft), Code-Stand `master` im Repo `zaehlerschrank-check`. Keine Rechtsauskunft. Wo Unsicherheit besteht, steht ⚖️.
