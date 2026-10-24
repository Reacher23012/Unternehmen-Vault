---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-10-24
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App („Zählerklar“)

> **Keine Rechtsberatung.** Alles Rechtliche ist mein Wissensstand und unter **„vom Anwalt prüfen lassen“** markiert, wenn es unsicher ist. Kosten sind Größenordnungen und vor Ausgabe zu prüfen.

**Kurzfazit:** Die *Idee* ist nicht schützbar. Schützbar sind Code (automatisch), Name (Marke, kostet) und das Regelwerk als Geschäftsgeheimnis – aber nur, wenn ich es wirklich geheim halte. Genau das tut die App heute **nicht**: das gesamte Regelwerk liegt im Browser jedes Nutzers. Der echte Schutz bleibt Tempo, Netzwerk und Daten aus echten Fällen ([[Mein Vorteil]]). Und: Die **Arbeitgeber-Frage** muss geklärt sein, bevor Geld oder Reichweite investiert werden.

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz? | Wie / Kosten | Einschätzung |
|---|---|---|---|
| **Idee** („Foto → Ampel für Zählerschränke“) | Nein | – | Ideen sind frei. Jeder darf dasselbe bauen. |
| **Code** (Web-App, Edge Function) | Ja, automatisch als Werk (Urheberrecht, §§ 69a ff. UrhG) | 0 €, keine Anmeldung. Beweis: Git-Historie, Commit-Daten sichern | Schützt vor Abschreiben, **nicht** vor Nachbau mit eigenem Code. |
| **Name „Zählerklar“** | Marke beim DPMA | Online-Anmeldung ca. 290 € für 3 Klassen (Klassen 9, 42 + ggf. 35/41); Prüfung der Schutzfähigkeit, 3 Monate Widerspruchsfrist, Laufzeit 10 Jahre | Schutz ab Eintragung. **„klar“ ist beschreibend** – Eintragbarkeit unsicher → vom Anwalt prüfen lassen. Vorher Recherche (steht schon als Aufgabe, [[ADR-0006 Produktname Zählerklar]]). Bis dahin: Priorität über Nutzung, Domain, Handle. |
| **Regelwerk R01–R26** (Auswahl, Verknüpfung, Texte) | Als **Geschäftsgeheimnis** (GeschGehG) | 0 €, aber § 2 GeschGehG verlangt **„angemessene Geheimhaltungsmaßnahmen“**. Ohne sie kein Schutz. | Der Wert liegt in der Zusammenstellung und Bewertung, nicht in den Normen selbst. Die Fundstellen sind öffentlich (BDEW/TAB). Als Datenbank/Sammlung kommt evtl. ein Datenbankschutz (§§ 87a ff. UrhG) in Betracht → vom Anwalt prüfen lassen. |
| **Normtexte** | gehören nicht mir | – | Nur Fundstellen übernehmen (gilt schon, [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]). |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist nicht patentierbar (§ 1 Abs. 3 PatG); technischer Beitrag nötig | Patent mehrere Tausend € mit Anwalt; Gebrauchsmuster ca. 40 € Gebühr + Anwalt, Verfahren gibt es für Software kaum | **Nicht empfohlen.** Aufwand und Kosten stehen in keinem Verhältnis zu einer unbewiesenen Idee. Neuheitsschädlich: bereits Flyer/Gespräche über die Funktionsweise. |
| **Design** (Optik der App) | eingetragenes Design möglich | ca. 70 € | Nebensache. |

## 2. Technischer Befund: Das Regelwerk liegt beim Nutzer
**Geprüft im Code (24.10.2026):**
- `web/src/regeln.json` (ca. 14 KB: ID, Name, Bedingung, Maßnahme, Stufe, Fundstelle, Geltung, Status aller 26 Regeln) wird in `web/src/regelwerk.ts` per `import` eingebunden.
- `web/src/regelwerk.ts` enthält zusätzlich die **komplette Auswertungslogik** (`ausgeloesteRegeln`, `ergebnisAus`, `schlimmsterFall`, `messkonzept`) mit allen Schwellen (4,2 kW, 4,6 kW, 12 kW, 25 kW, 50 A, 32 A …).
- Beides geht beim Build ins Browser-Bundle. Jeder, der die App aufrufen kann, kann **Regeln und Logik im Browser (Entwicklertools) lesen und kopieren** – auch ohne Login, sobald die App öffentlich gehostet ist. Der Zugangscode schützt nur Fotoanalyse und Fall-Speicher (Edge Function), **nicht** das Regelwerk.
- Auch die Demo (`build:demo`) enthält es.

**Risikobewertung:**
- *Wie schlimm?* Mittel. Ein Mitbewerber mit TAB-Kenntnis kann die 26 Regeln auch selbst aus öffentlichen Quellen ableiten; der Aufwand ist aber real (Excel-Entscheidungsbaum, Recherche, Fundstellen) und für ihn per Kopie fast null. Schlimmer: **Ohne Geheimhaltungsmaßnahme ist es kein Geschäftsgeheimnis mehr** (§ 2 GeschGehG). Zudem erlaubt Reverse Engineering rechtlich Beobachten/Testen eines öffentlich bereitgestellten Produkts (§ 3 Abs. 1 Nr. 2 GeschGehG), solange es vertraglich nicht ausgeschlossen ist – also Verträge nötig (Punkt 3).
- *Wann relevant?* Erst, wenn die App öffentlich oder bei vielen Testern ist. **Heute** (ein Nutzer, lokal) kein Problem – deshalb jetzt keine Eile, vor der Netlify-Veröffentlichung aber entscheiden.

**Lösungsskizze „Regelwerk serverseitig“:**
1. `regeln.json` und Auswertung (`ausgeloesteRegeln`, `ergebnisAus`, `schlimmsterFall`, `messkonzept`) wandern in die Edge Function (`supabase/functions/api`, neue Route z. B. `POST /bewerte`).
2. Die App schickt nur die **Eingaben**, bekommt **Ergebnis + Maßnahmen + Fundstelle + offene Punkte + Messkonzept** zurück (nur das, was der Nutzer sehen soll – also nie die Bedingungen oder Schwellen).
3. Zugriff nur mit Login/Zugangscode (heute `x-app-code`; später Login, siehe Irgendwann-Aufgabe).
4. Tests: bestehende `regelwerk.test.ts` gegen die ausgelagerte Logik laufen lassen (Deno/Vitest), Ergebnisse müssen identisch sein.
5. Ohne Funkloch-Fähigkeit: Die App funktionierte bisher lokal ohne Backend. Offline-Bewertung geht dann nicht mehr – bewusster Kompromiss, passt zu „Offline-Modus erst nach Go“.

**Grenzen:** Wer viele Abfragen stellt, kann die Regeln über **Probing** rekonstruieren (Eingaben variieren, Ergebnisse vergleichen). Gegenmaßnahmen: Rate-Limit je Konto, keine „Warum“-Details für ungeprüfte Nutzer, Nutzungsbedingungen. Voller Schutz ist nicht erreichbar; es geht um *angemessen*, nicht *lückenlos*.

**Aufwand:** ca. 1 Tag (Code + Tests + Neueinspielen der Edge Function – letzteres braucht Zugangsdaten, also nicht durch die Nachtschicht). Kosten: 0 €.

## 3. Verträge
- **NDA für Tester/Kollegen:** kurze Einseitig-Vereinbarung (Gegenstand: Regelwerk, Funktionsweise, Zugang; Zweck; Laufzeit; keine Weitergabe). Vorlage von Handwerkskammer/IHK oder Anwalt; **vom Anwalt prüfen lassen**, ob eine Pauschalvorlage für Einzelgespräche reicht. Hinweis: Wer schon ohne NDA über Details gesprochen hat, kann diese nicht „rückwirkend“ geheim machen. Ab jetzt: im Gespräch nur zeigen, was nötig ist ([[Gesprächsleitfaden]]: App nur auf eigenem Handy).
- **Nutzungsbedingungen (AGB B2B):** kein Kopieren, Auslesen, Scraping, Reverse Engineering, keine Weitergabe des Zugangs; Haftungsbegrenzung ([[Rechtliches]]). Vor dem ersten fremden Nutzer.
- **Zugang nur mit Login:** Heute gibt es einen einzigen Zugangscode ([[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]]). Für Tester: persönliches Konto, damit Nutzung zuordenbar ist und Zugänge entziehbar sind. Das ist selbst eine Geheimhaltungsmaßnahme im Sinn des GeschGehG.
- Landingpage und Flyer: **nichts Funktionales verraten**, was nicht nötig ist (kein Regel-Detail, keine Schwellen).

## 4. Offene Frage für Anwalt/Steuerberater: Wem gehört die Idee?
Ich arbeite im Elektrohandwerk (laut [[Mein Vorteil]]; Anstellung vs. Selbständigkeit ist hier **nicht belegt** – bitte klären). **Fragen, die ein Anwalt für Arbeitsrecht beantworten muss:**
1. **Arbeitsvertrag:** Gibt es eine Nebentätigkeitsklausel (Anzeige/Genehmigung), ein Wettbewerbsverbot oder eine Verschwiegenheitspflicht über Betriebsinterna? Das App-Konzept richtet sich an Elektrobetriebe – evtl. auch an den Arbeitgeber oder seine Wettbewerber (§ 60 HGB gilt für Handlungsgehilfen während des Arbeitsverhältnisses; Wettbewerbsproblem möglich).
2. **Arbeitnehmererfindung / Urheberrecht:** Software, die ein Arbeitnehmer *in Erfüllung seiner Aufgaben* schafft, steht dem Arbeitgeber zu (§ 69b UrhG). Entstand sie in der Freizeit, ohne Betriebsmittel und ohne Aufgabenbezug, dürfte sie mir gehören – **Grenzfall**, wenn das Wissen (TAB, Netzbetreiber-Vorgaben, Fälle) aus dem Job stammt. Das Gesetz über Arbeitnehmererfindungen betrifft Erfindungen (Patent/Gebrauchsmuster), hier nur am Rande.
3. **Betriebsgeheimnisse:** Stammen Fälle, Fotos, Kundendaten oder Preise aus der Arbeit, dürfen sie weder ins Regelwerk noch in Testdaten. Fotos echter Schränke nur anonymisiert (kein Name, keine Adresse, keine Zählernummer – steht schon in [[Aufgaben]]).
4. **Nutzung von Arbeitszeit, Firmenhandy, Firmenlaptop, Werkzeug** für Fotos/Entwicklung: vermeiden und dokumentieren.
5. **Quellen:** Ist das Westnetz-Schulungsmaterial („Bewertung von Zählerplätzen in Bestandsanlagen“, 09/2025) als Fundstelle in [[Regelwerk R01–R26]] über den Arbeitgeber oder öffentlich erhalten worden? Nutzungs-/Weitergabebedingungen prüfen.

**Empfehlung:** *Vor* der Veröffentlichung (Netlify, Flyer, Instagram) einmal ca. 1 Stunde Erstberatung bei einem Fachanwalt für Arbeitsrecht (Kosten ungefähr 150–250 €, Erstberatungsgrenze für Verbraucher 190 € netto) und Arbeitsvertrag mitbringen. Gegebenenfalls schriftliche Freigabe/Nebentätigkeitsanzeige beim Arbeitgeber. Steuerlich getrennt: Gewerbeanmeldung, Kleinunternehmerregelung – Steuerberater. Das ist eine **Voraussetzung**, kein Optimierungsthema.

## 5. Realistischer Schutz: Tempo, Netzwerk, Daten
Rechtliche Mittel schützen nur gegen Kopieren. Gegen einen Konkurrenten, der es *neu* baut, hilft:
- **Vorsprung:** Wer zuerst 20 geprüfte reale Fälle und 5 zahlende Betriebe hat, hat Beleg, Referenzen und Feedback, die niemand kopiert. Das entspricht dem Go/No-Go ([[Validierung & Go-No-Go]]).
- **Netzwerk:** direkter Zugang zu Kollegen, Innung, Großhändler ([[Direktansprache]]) – das ist mein „Zugang“-Punkt im Score.
- **Daten aus echten Fällen:** gespeicherte Fälle samt „tatsächlicher Entscheidung“ (Trefferquote) sind der eigentliche Burggraben, nicht die 26 Regeln. Deshalb: **Fälle und Fotos serverseitig, nie im Browser/Export frei zugänglich**; Datenschutz sauber (siehe [[Rechtliches]]).
- **Pflege:** Neue TAB, neue Netzbetreiber (Westnetz-Beobachtung) – laufender Aktualitätsvorsprung ist schwer kopierbar.
- Ehrlich: Ein ernsthafter Nachbau durch ein Softwareteam ist möglich. Die Frage ist, ob sich der Markt (Elektrobetriebe im Westnetz-Gebiet) dafür lohnt – je kleiner, desto unwahrscheinlicher.

## 6. Maßnahmenliste (priorisiert)
| # | Maßnahme | Aufwand | Kosten | Wann |
|---|---|---|---|---|
| 1 | **Arbeitgeber-Frage klären** (Arbeitsvertrag lesen, Erstberatung Fachanwalt Arbeitsrecht) | 2–3 h | ca. 150–250 € | **vor jeder Veröffentlichung** |
| 2 | Im Gespräch/Mittesten nur auf eigenem Handy zeigen, keine Regel-Details verteilen (gilt schon) | 0 | 0 | sofort |
| 3 | Git-Historie sichern (Repo privat lassen, Backup), Commit-Zeiten als Entstehungsbeleg | 0,5 h | 0 | sofort |
| 4 | **Regelwerk serverseitig** (Edge Function, App bekommt nur Ergebnis) | ca. 1 Tag | 0 € | vor Netlify/öffentlicher App |
| 5 | NDA-Vorlage für Tester/Kollegen (prüfen lassen) | 1–2 h | 0–150 € | vor erstem Test mit Fremden |
| 6 | Nutzungsbedingungen (kein Kopieren/Auslesen/Reverse Engineering) | 2 h | 0–200 € | vor erstem Nutzer außerhalb |
| 7 | Login statt gemeinsamer Zugangscode + Rate-Limit | 1–2 Tage | 0 € | vor Kollegen-Test (steht schon unter Irgendwann) |
| 8 | Marke „Zählerklar“ recherchieren, dann DPMA anmelden | 1 h + 1 h | ca. 290 € | nach positiver Recherche, vor Druck/Livegang |
| 9 | Domain `zaehlerklar.de` + Handle sichern | 0,5 h | ca. 1 €/Monat | sofort (steht schon) |
| 10 | Patent/Gebrauchsmuster | – | – | **nicht verfolgen** |

## Annahmen und Grenzen
- Rechtslage nach meinem Wissensstand (Juni 2026), Gebühren ungeprüft – vor Ausgabe bei DPMA/Anwalt bestätigen.
- Ob ich angestellt bin, wie der Vertrag lautet und wie das Regelwerk entstanden ist, weiß ich nicht.
- Der Code-Befund (Regelwerk im Bundle) ergibt sich aus dem Aufbau von `web/src`; ein tatsächlicher Build wurde nicht ausgewertet, die Aussage gilt für jede Vite-App mit `import` der JSON-Datei.
