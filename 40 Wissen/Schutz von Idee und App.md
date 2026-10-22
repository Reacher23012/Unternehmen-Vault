---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-10-22
status: analyse – keine Rechtsberatung, alles Juristische vom Anwalt prüfen lassen
---
# Schutz von Idee und App (Zählerklar)

> **Ehrlicher Rahmen:** Analyse aus allgemeinem Wissen, keine Rechtsberatung. Was unsicher ist, steht als **⚖ Anwalt** und gehört in einen Termin (Fachanwalt für IT-/Urheberrecht oder Gründungsberatung der HWK). Stand der Gesetze vor der Beratung gegenprüfen.

**Kurzfazit:** Die *Idee* ist nicht schützbar. Schützbar sind Code (automatisch), Name (Marke, gegen Gebühr) und das Regelwerk – aber nur als Geschäftsgeheimnis, und nur, wenn es wirklich geheim gehalten wird. **Genau das ist heute nicht der Fall:** das komplette Regelwerk steckt im Browser-Bundle. Der größte Hebel ist technisch (Regelwerk auf den Server) und kostet nichts außer Aufwand. Danach zählt Tempo.

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Kosten / Aufwand | Einschätzung |
|---|---|---|---|
| **Idee / Konzept** („Foto → Zählerschrank-Einordnung“) | keiner. Ideen sind frei. | – | Jeder darf dasselbe bauen. Schutz nur über Vorsprung. |
| **Quellcode der App** | Urheberrecht (§§ 69a ff. UrhG) entsteht automatisch, schützt aber nur die konkrete Umsetzung, nicht die Funktion. | 0 € | Hilft gegen 1:1-Kopie, nicht gegen Nachbau. |
| **Name „Zählerklar“** | Marke beim DPMA (Klassen 9 und 42). | ca. 290 € für bis zu 3 Klassen (online), danach je Klasse mehr; 10 Jahre; Widerspruchsfrist Dritter 3 Monate. Recherche vorher, siehe [[ADR-0006 Produktname Zählerklar]]. | Sinnvoll, sobald Name sicher und Livegang absehbar. Schützt nur den Namen. ⚖ Anwalt: Kollisionsrisiko, „beschreibende“ Anteile („Zähler“). |
| **Regelwerk R01–R26** (Auswahl, Verknüpfung, Fundstellen, Maßnahmentexte) | Geschäftsgeheimnis nach GeschGehG – **nur** bei „angemessenen Geheimhaltungsmaßnahmen“ (§ 2 Nr. 1b). Zusätzlich evtl. Datenbank-/Schriftwerkschutz für Texte. | 0 € + Maßnahmen (Abschnitt 2, 3) | Der eigentliche Wert (→ [[Regelwerk R01–R26]]). Die zugrunde liegenden Normen und TAB sind öffentlich/fremd; geschützt wäre nur *deine* Zusammenstellung und Bewertung. ⚖ Anwalt: Was davon wirklich „Geheimnis“ ist. |
| **Normtexte, TAB-Zitate** | gehören anderen (DIN, BDEW, Netzbetreiber) | – | Nur Fundstellen nennen, nie abschreiben – gilt weiter (siehe [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]). |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist nicht patentfähig (§ 1 Abs. 3 PatG); Gebrauchsmuster schließt Verfahren aus. | Patent ab ca. 5 stellig inkl. Anwalt | Praktisch nicht sinnvoll: keine technische Neuerung, nur Regelanwendung. Nicht verfolgen. |

## 2. Technischer Befund: Regelwerk liegt beim Nutzer im Browser
**Befund (geprüft am Code, 22.10.2026):**
- `web/src/regeln.json` (26 Regeln mit Bedingung, Maßnahme, Stufe, **Fundstelle**, Geltung, Status, ca. 14 KB) wird in `web/src/regelwerk.ts` importiert.
- `ausgeloesteRegeln()` (alle 26 Bedingungen als Code) und `bewerte()` laufen komplett im Browser; `main.ts` und `demo.ts` rufen sie direkt auf.
- Folge: Wer die App öffnet, bekommt Regeltexte *und* Logik als JavaScript im Bundle. Sichtbar im Browser-Netzwerk-Tab; minifizieren ändert daran nichts. Zusätzlich liegt `regeln.json` im Git-Repo.
- Nebenwirkung für das Recht: Wer das Regelwerk jedem Zugangscode-Inhaber ausliefert, hat es kaum „angemessen geheim“ gehalten (⚖ Anwalt). Reverse Engineering eines öffentlich verfügbar gemachten Produkts ist nach § 3 Abs. 1 Nr. 2 GeschGehG **erlaubt, wenn es vertraglich nicht untersagt ist** – ohne Nutzungsbedingungen (Abschnitt 3) gibt es keinen Hebel.

**Risiko-Bewertung:**
| Szenario | Wahrscheinlichkeit | Schaden |
|---|---|---|
| Tester/Kollege kopiert das Regelwerk (zuerst nur ein paar Leute mit Zugangscode) | gering–mittel | mittel: Vorsprung weg, bevor es Umsatz gibt |
| Konkurrent/Bastler zieht es aus öffentlicher App | mittel, sobald App öffentlich ist | hoch, wenn Regelwerk der einzige Vorsprung ist |
| Rein technische Kopie ohne Fachwissen | gering | gering – Pflege (neue TAB, Westnetz-Änderungen) kann niemand mitkopieren |

**Lösung (Skizze):**
1. Neue Route `POST /bewerten` in der Edge Function (`supabase/functions/api/index.ts`): Eingaben rein, Ergebnis raus (Ampel, ausgelöste Regeln mit Maßnahmentext und Fundstelle, „Vor Ort klären“, Hinweise). `regeln.json` und Logik liegen nur dort.
2. App ruft `/bewerten` statt `bewerte()`; `regeln.json` aus dem Bundle entfernen. Die App bekommt nur das, was für *diesen* Fall nötig ist.
3. Tests: Regelwerk-Tests laufen weiter gegen dieselbe Logik (gemeinsames Modul, das Browser-Bundle nicht importiert).
4. Offline/Funkloch: Fälle werden bereits lokal gesammelt und nachgesendet; Bewertung ohne Netz fällt weg (bewusst, Offline-Modus ist ohnehin „erst nach Go“).
5. Nebenwirkung abfedern: Demo-Build (`demo.ts`) braucht Beispieldaten ohne echtes Regelwerk (Platzhalterregeln).
6. Repo: Das Git-Repo ist privat zu halten. ⚖/offen: ob `regeln.json` zusätzlich getrennt (z. B. nur im Supabase-Projekt) liegen soll.

**Grenzen:** Auch serverseitig kann ein Nutzer durch viele Testfälle das Verhalten ausprobieren und nachbauen („Black-Box-Abtasten“). Gegenmaßnahmen: Login statt Gruppencode, Rate-Limit, Nutzungsbedingungen, Beschränkung auf Maßnahmenliste statt Regeltabelle. Das senkt das Risiko, beseitigt es nicht.

## 3. Verträge und Zugang
| Maßnahme | Zweck | Kosten | Hinweis |
|---|---|---|---|
| **NDA für Tester/Kollegen** (1 Seite, gegenseitig oder einseitig) | Geheimhaltungsmaßnahme im Sinne GeschGehG; Beleg „angemessen“ | 0 € mit Mustervorlage, ca. 100–300 € Anwaltsprüfung | ⚖ Anwalt: Vorlage prüfen lassen. Realistisch: Kollegen im Handwerk unterschreiben ungern – stattdessen kurze Zustimmung beim Login (Nutzungsbedingungen). |
| **Nutzungsbedingungen / AGB** der App | kein Kopieren, kein Auslesen, kein Reverse Engineering, Weitergabe verboten; Haftungsrahmen („ersetzt keine Prüfung vor Ort“) | Entwurf 0 €, Prüfung ca. 300–800 € | Reverse-Engineering-Verbot ist die Voraussetzung, damit § 3 GeschGehG nicht greift. ⚖ Anwalt (AGB-Kontrolle B2B/B2C). |
| **Zugang nur mit Login** | Personenbezug, Sperren möglich, Protokoll | Aufwand: Supabase Auth, einige Tage | steht schon als „Login statt Zugangscode“ unter „Irgendwann“; mit Öffnung für Kollegen vorziehen. |
| Dokumentation der Geheimhaltung | Nachweis „angemessen“ | 0 € | Kurzliste in einer Notiz: wer hat welchen Zugang, wann, welche Hinweise. |
| Rechtstexte (Impressum/Datenschutz) | Pflicht, kein Schutz | siehe [[Rechtliches]] | unverändert offen. |

## 4. Arbeitgeber-Frage (offene Frage, ⚖ Anwalt / Steuerberater)
**Ist die Idee im Rahmen einer Anstellung im Elektrohandwerk entstanden? Dann klären:**
- **Arbeitnehmererfindung (ArbnErfG):** Gilt nur für patent- oder gebrauchsmusterfähige Erfindungen. Software als solche und reine Regelwerke fallen kaum darunter – Risiko eher gering, aber ⚖ Anwalt.
- **Urheberrecht an Programmen (§ 69b UrhG):** Programme, die ein Arbeitnehmer *in Wahrnehmung seiner Aufgaben oder nach Anweisung* schafft, gehören dem Arbeitgeber. Wurde die App privat, in der Freizeit, ohne Betriebsmittel und außerhalb der Aufgaben gebaut, ist das eher kein Thema – **aber Fachwissen aus Betriebsunterlagen, Kundenfällen oder Schulungen des Arbeitgebers ist heikel**.
- **Nebentätigkeit:** Arbeitsvertrag prüfen auf Anzeige-/Genehmigungspflicht für Nebentätigkeiten.
- **Wettbewerb / Treuepflicht:** Während des Arbeitsverhältnisses darf keine Konkurrenztätigkeit zum Arbeitgeber betrieben werden (u. a. § 60 HGB bei Handlungsgehilfen, sonst Nebenpflicht aus § 241 Abs. 2 BGB). Ist ein Betrieb mit Elektro-Prüfungen *Kunde* statt Konkurrent des Produkts? Das Produkt konkurriert wohl nicht mit dem Betrieb, aber Kollegen des eigenen Arbeitgebers als Kunden anzusprechen, kann Konflikte bringen.
- **Betriebs- und Geschäftsgeheimnisse des Arbeitgebers:** keine Kundenadressen, Fotos von Kundenschränken ohne Einwilligung, interne Preise, Schulungsunterlagen in den Vault/die App.
- **Vorgehen:** Arbeitsvertrag, evtl. Betriebsvereinbarung heraussuchen; **vor dem öffentlichen Start** 1 Beratungstermin (Fachanwalt Arbeitsrecht/Gründungsberatung). Im Zweifel dem Arbeitgeber offen schreiben lassen, dass keine Rechte beansprucht werden („Freigabe“). Offene Frage: Wie sieht der Vertrag aus? (Ich kenne ihn nicht.)

## 5. Realistischer Schutz: Tempo und Nähe
Rechtlich sicher ist wenig, deshalb zählt, was ein Nachbauer nicht in einer Woche kann:
1. **Vorsprung bei der Validierung:** Wer zuerst echte Fälle und Zahlungsbereitschaft hat, hat die Wahrheit über Preis und Zielgruppe – das ist wertvoller als jede Regel.
2. **Netzwerk:** Direkter Zugang zu Kollegen im Westnetz-Gebiet → [[Mein Vorteil]], [[Direktansprache]]. Vertrauen ist nicht kopierbar.
3. **Daten aus echten Fällen:** Trefferquote, korrigierte KI-Felder, „Deine tatsächliche Entscheidung“ – ein wachsender Datensatz, den der Nachbauer nicht hat (Datenschutz beachten, siehe [[Rechtliches]]).
4. **Pflege des Regelwerks:** neue TAB, Westnetz-Änderungen laufend einarbeiten; ein einmal kopierter Stand veraltet.
5. **Marke und Community:** „Zählerklar“ als bekannter Name beim Großhändler/in der Innung.
6. **Nicht übertreiben:** Frühes Geheimhalten bremst die Validierung. Die Gespräche und die Tests mit Kollegen haben Vorrang vor Schutzmaßnahmen (Regel „Erst verkaufen, dann bauen“, [[Ideen-System]]).

## 6. Priorisierte Maßnahmenliste
| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | Repo privat lassen, keine Regeln in öffentliche Posts/Flyer/Demo-Links (Fundstellen-Details nicht ins Marketing) | 0 € | gering | sofort |
| 2 | Nutzungsbedingungen-Entwurf (kein Kopieren/Reverse Engineering, Weitergabeverbot) + Zustimmung beim ersten Start | 0 € Entwurf | klein | vor dem Mittesten mit Kollegen |
| 3 | **Regelwerk serverseitig** (`/bewerten`, `regeln.json` raus aus Bundle) | 0 € | mittel (1–2 Tage Code) | vor dem öffentlichen Livegang, am besten vor dem Mittesten |
| 4 | Login statt Zugangscode (+ Rate-Limit) | 0 € | mittel | spätestens beim Öffnen für mehr als 4 Tester |
| 5 | Arbeitsvertrag prüfen, Arbeitgeber-Frage klären (Beratung) | ca. 100–300 € Erstberatung | gering | vor Livegang, ggf. früher |
| 6 | DPMA-Recherche + Markenanmeldung „Zählerklar“ | ca. 290 € + Recherche | gering | nach DENIC-Prüfung, vor Druck/Livegang |
| 7 | NDA-Vorlage / AGB anwaltlich prüfen lassen | ca. 300–800 € | gering | wenn die ersten Zahlungen absehbar sind |
| 8 | Dokumentation der Geheimhaltungsmaßnahmen (wer, wann, was) | 0 € | gering | laufend |
| 9 | Patent/Gebrauchsmuster | – | – | nicht verfolgen |

## Offene Fragen für den Anwalt
1. Wie viel des Regelwerks ist „Geheimnis“, wenn Normen und TAB öffentlich sind?
2. Reichen Nutzungsbedingungen, oder braucht jeder Tester ein NDA?
3. Arbeitsvertrag: Nebentätigkeit, § 69b UrhG, Wettbewerb, Zugang zu Kollegen des Arbeitgebers.
4. Markenanmeldung „Zählerklar“: Kollisionen, Schutzfähigkeit.
5. Haftung bei falscher Einordnung (ergänzt [[Rechtliches]]).
