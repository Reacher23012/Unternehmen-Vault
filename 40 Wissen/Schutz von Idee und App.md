---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-10-04
status: analyse – keine Rechtsberatung, Unsicheres vom Anwalt prüfen lassen
---
# Schutz von Idee und App

> **Analyse, keine Rechtsberatung.** Alles mit 🔶 ist unsicher und gehört zum Anwalt (Fachanwalt IT-/Urheberrecht) bzw. Steuerberater. Kostenangaben sind grobe Richtwerte, nicht geprüft.

**Kurzfassung:** Eine *Idee* ist nicht schützbar. Schützbar sind Code, Name und – mit Aufwand – das Regelwerk als Geschäftsgeheimnis. Der **größte reale Schwachpunkt ist technisch**: Das komplette Regelwerk R01–R26 liegt im Browser jedes Nutzers. Der beste Schutz ist trotzdem Tempo und Netzwerk (Punkt 5), nicht Paragrafen.

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz? | Wie / Kosten (Richtwert) | Bewertung für uns |
|---|---|---|---|
| **Die Idee** („Foto → Maßnahmenliste“) | Nein. Ideen sind frei. | – | Jeder darf sie nachbauen. Nur die konkrete Ausführung zählt. |
| **Code** | Ja, Urheberrecht (§ 69a ff. UrhG), entsteht automatisch, ohne Anmeldung | 0 € | Schützt vor 1:1-Kopie, nicht vor Nachbau mit eigenem Code. Beweis: Git-Historie mit Datum sichern. |
| **Name „Zählerklar“** | Marke beim DPMA (Wortmarke) | ab ca. 290 € für 3 Klassen, 10 Jahre; Recherche vorher → [[ADR-0006 Produktname Zählerklar]] | Sinnvoll, **sobald** erste Nutzer da sind und die Recherche sauber ist. Vorher kein Geld. Beschreibende Namen können abgelehnt werden 🔶. |
| **Regelwerk / Know-how** (R01–R26, Fundstellen, Grenzwerte) | Geschäftsgeheimnis nach GeschGehG – **nur** mit „angemessenen Geheimhaltungsmaßnahmen“ (§ 2 Nr. 1 b) | Kosten = Maßnahmen (Punkte 2 und 3) | Ohne Maßnahmen kein Schutz. Heute: Regelwerk ungeschützt im Bundle (s. u.). |
| **Einzelne Normfundstellen / TAB-Inhalte** | Fakten selbst nicht schützbar; Normtexte/TAB-Wortlaut urheberrechtlich geschützt | – | Nur Fundstellen nennen, nie Wortlaut kopieren (steht schon in [[Rechtliches]]). Das Regelwerk ist also *Auswahl + Verknüpfung*, nicht geheimes Wissen – jeder Kollege kennt die TAB. 🔶 Wie viel davon als „Geheimnis“ trägt, klären lassen. |
| **Datenbank** (gesammelte Fälle) | Datenbankherstellerrecht (§ 87a UrhG) bei wesentlicher Investition | 0 € | Wird erst mit echten Fällen relevant (Punkt 5). |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist nicht patentierbar (§ 1 Abs. 3 PatG); nur bei technischem Beitrag. Gebrauchsmuster schließt Verfahren aus. | Patent: 4–5-stellig | **Nicht empfohlen.** Aufwand und Erfolgsaussicht passen nicht zu einer Validierungsphase. 🔶 |

## 2. Technischer Befund: Regelwerk liegt im Browser
**Geprüft im Code** (`zaehlerschrank-check`, Stand `34e3b80`):
- `web/src/regeln.json` (14 KB: alle 26 Regeln mit Bedingung, Maßnahme, Stufe, **Fundstelle**, Geltung, Status) wird in `web/src/regelwerk.ts` per `import` eingebunden.
- `web/src/main.ts` ruft `bewerte()` aus `regelwerk.ts` **im Browser** auf (Zeilen 267, 281). Vite bündelt JSON und Logik ins ausgelieferte JavaScript.
- Folge: Wer die App-URL kennt, kann in den Entwicklerwerkzeugen (Netzwerk → JS-Datei) das **gesamte Regelwerk samt Fundstellen** lesen, ohne sich einzuloggen – die App hat derzeit nur einen Zugangscode für die *Edge Function* (Analyse, Fälle), nicht für das Laden der Seite. Auch der Demo-Build (`build:demo`) enthält alles.
- Das Regelwerk ist laut [[Zählerschrank-Check]] der Kern des „Vorsprungs“ (Score 5/5). Es ist zugleich das Einzige, was ein Nachbauer nicht per KI aus dem Foto bekommt.

**Risiko-Bewertung**
- *Eintrittswahrscheinlichkeit:* gering, solange die App nicht öffentlich ist (heute: nicht online). Mit Netlify-Deployment und Kollegen-Test **steigt sie** – ein Kollege oder Entwickler braucht ~5 Minuten.
- *Schaden:* mittel. Fachwissen ist per TAB/Schulung ohnehin öffentlich; kopierbar wäre die Aufbereitung (Auswahl, Formulierung, Stufen, Fundstellen-Zuordnung) – die Arbeit von R01–R26.
- *Rechtlich:* Wer das Regelwerk ungeschützt ausliefert, kann sich später schwer auf „angemessene Geheimhaltungsmaßnahmen“ berufen. 🔶

**Lösungsskizze: Regelauswertung serverseitig**
1. `regeln.json` und die Logik aus `regelwerk.ts` wandern in die Edge Function (neue Route `POST /bewerte`, Header `x-app-code` wie bei den anderen Routen). Die Regeldatei wird **nicht** in `web/` gebaut, sondern liegt nur unter `supabase/functions/api/`.
2. App sendet nur die `Eingaben`; Antwort = `Bewertung` (ausgelöste Regeln mit Name, Maßnahme, Stufe, Fundstelle; Ergebnis; Messkonzept; „Vor Ort klären“-Fälle). Der Nutzer sieht nur, was *auf seinen Fall* zutrifft – nicht die 26 Regeln mit Bedingungen im Ganzen.
3. Offline/Funkloch: Fälle werden schon lokal gepuffert (Review 29.09.); die Bewertung bräuchte dann Netz oder einen „später bewerten“-Status. Trade-off ehrlich nennen: schlechtere Offline-Nutzung auf der Baustelle.
4. Tests: `regelwerk.test.ts` (13 Tests, u. a. Excel-Beispielzeile) wandern mit in den Function-Ordner und laufen weiter gegen dieselbe Logik.
5. Grenzen: Auch serverseitig kann ein Nutzer durch **systematisches Abfragen** vieler Eingabe-Kombinationen das Regelwerk Stück für Stück rekonstruieren. Das erhöht den Aufwand stark, ist aber kein Schutz gegen entschlossene Gegner → ergänzend Login, Rate-Limit, Nutzungsbedingungen (Punkt 3). Siehe auch [[App & Technik]] (kein Rate-Limit bisher).
6. Der Demo-Build für claude.ai bleibt eine private Vorschau mit Beispieldaten; vor einer Weitergabe prüfen, ob er das volle Regelwerk enthält (er bündelt `regelwerk.ts`).

## 3. Verträge und Zugang
- **NDA für Tester/Kollegen** (Geheimhaltungsvereinbarung): kurz, einseitig, Gegenstand „Regelwerk, App, Testzugang“, Dauer, Vertragsstrafe 🔶. Mustervorlage vom Anwalt oder Handwerkskammer prüfen lassen; **Gespräche über das Problem brauchen kein NDA** – nur der Testzugang. Für die 5 Gespräche bis 09.10. *nichts zeigen, was das Regelwerk offenlegt* (kein Bildschirm mit Fundstellen-Liste, kein Code).
- **Nutzungsbedingungen (AGB light)** in der App: Zugang nur persönlich, kein Weitergeben des Zugangscodes, kein Kopieren/Auslesen/Reverse Engineering, keine automatisierten Abfragen, Haftungshinweis (Hilfsmittel, ersetzt keine Prüfung). 🔶 Wirksamkeit gegenüber Gewerbetreibenden und Haftungsklauseln anwaltlich prüfen.
- **Zugang nur mit Login:** Ein gemeinsamer Zugangscode ist weitergebbar und nicht einer Person zuordnbar (steht schon als ⚠️ in [[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]]). Pro Tester ein Konto (Supabase Auth) – ermöglicht Sperren, Protokoll, Nachweis bei Missbrauch. Auf der Warteliste/Landingpage steht bewusst nichts Inhaltliches.
- **Zugangsprotokoll** (wer hat wann wie oft abgefragt) = Geheimhaltungsmaßnahme *und* Frühwarnung.

## 4. Offene Frage: Arbeitgeber (🔶 Anwalt / Steuerberater)
Entstanden ist die Idee im Elektrohandwerk (Anstellung?). Zu klären, **bevor Geld oder Kunden im Spiel sind**:
- **Arbeitnehmererfindung / Urheberrecht:** Software, die ein Arbeitnehmer *in Erfüllung seiner Pflichten* schafft, gehört nach § 69b UrhG dem Arbeitgeber. Entsteht sie privat, in der Freizeit, ohne Arbeitsmittel, ist das anders – aber die Abgrenzung ist fallabhängig. Das Regelwerk speist sich teils aus Arbeitswissen (Westnetz-Schulung, Betriebserfahrung) → Know-how-Frage.
- **Nebentätigkeit:** Arbeitsvertrag auf Genehmigungs-/Anzeigepflicht prüfen (auch bei unentgeltlicher Tätigkeit und bei Gewerbeanmeldung).
- **Wettbewerbsverbot:** Während des Arbeitsverhältnisses gilt ein Wettbewerbsverbot (§ 60 HGB analog / Treuepflicht). Ein Produkt, das **Kollegen und Betriebe der Branche** als Kunden hat, kann in die Nähe eines Konkurrenzgeschäfts kommen, besonders wenn der Arbeitgeber selbst Zählerplatz-Beratung/Angebote macht.
- **Vertraulichkeit:** Keine Betriebsinterna, Kundendaten, Angebotsunterlagen, Fotos von Kundenanlagen des Arbeitgebers in Regelwerk oder Testfälle übernehmen.
- **Gewerbe/Steuer (Steuerberater):** Gewerbeanmeldung, Kleinunternehmerregelung, Abo-Umsatz, Umsatzsteuer.
**Konkreter Schritt:** Arbeitsvertrag raussuchen und die drei Klauseln (Nebentätigkeit, Wettbewerb, Erfindungen/Urheberrechte) markieren – das spart dem Anwalt Zeit. Ob hier ein Problem besteht, **kann diese Notiz nicht beurteilen**.

## 5. Realistischer Schutz: Tempo, Netzwerk, Daten
Was ein Nachbauer nicht in einem Wochenende kopiert:
- **Vorsprung:** Mit KI-Werkzeugen ist eine Foto-App schnell nachgebaut; das Regelwerk samt Belegen nicht. Tempo bis zu den Daten zählt mehr als Geheimhaltung.
- **Netzwerk:** Kollegen und Betriebe im Westnetz-Gebiet kennen *dich* ([[Mein Vorteil]], Zugang 5/5). Erste Kunden binden – persönlich, nicht über Anzeigen.
- **Daten aus echten Fällen:** Jede erfasste Entscheidung („deine tatsächliche Entscheidung wird mit gespeichert“) verbessert Trefferquote und Regeln. 20 Schränke → 200 Fälle ist ein Vorsprung, den eine Kopie nicht hat. 🔶 Datenschutz: Fotos können Kundendaten/Personen zeigen; Einwilligung und Auftragsverarbeitung klären → [[Rechtliches]].
- **Pflege des Regelwerks** (neue TAB, BDEW-Musterwortlaut 2026): Ein Kopierer hat einen veralteten Stand, du nicht.
- **Ehrlich:** Wenn der Markt echt ist, kommt ein Nachahmer. Schutz heißt, *schneller und näher am Kunden* zu sein. Das passt zur Regel „erst verkaufen, dann bauen“ aus [[Ideen-System]].

## 6. Maßnahmenliste (priorisiert)
| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | Arbeitsvertrag prüfen (Nebentätigkeit, Wettbewerb, Erfindungen) + Anwaltstermin zu Punkt 4 | Erstberatung ca. 100–250 € 🔶 | 1–2 Std. | **vor** erstem Geld/Kunden, besser bald |
| 2 | Bei den 5 Gesprächen: Problem besprechen, **kein** Regelwerk/Code zeigen | 0 € | 0 | sofort |
| 3 | Regelauswertung serverseitig (Edge Function) | 0 € (Free Tier) | ca. 0,5–1 Tag Code | **vor** Netlify-Deployment mit Testern |
| 4 | Login statt Zugangscode, Rate-Limit | 0 € | ca. 1 Tag | vor Kollegen-Test |
| 5 | Nutzungsbedingungen + NDA-Muster prüfen lassen | ca. 200–500 € 🔶 | 2 Std. + Anwalt | vor Kollegen-Test |
| 6 | Git-Historie sichern (privates Repo, regelmäßig pushen) und Repo **privat** lassen | 0 € | 0 | läuft |
| 7 | Marken-Recherche DPMA, dann Wortmarke anmelden | Recherche 0 €, Anmeldung ab ca. 290 € | 1 Std. | nach Recherche, wenn Nutzer da sind |
| 8 | Datenschutz für Fotos/Fälle (AV-Verträge, Einwilligung) | 0 € bis Anwalt | 2 Std. | vor Betrieb mit Kollegen |
| – | Patent / Gebrauchsmuster | hoch | – | **nein** |

Die Code-Aufgabe (3) und Login (4) sind als eigene Zeilen in [[Aufgaben]] angelegt. Reihenfolge laut Regel „erst verkaufen, dann bauen“: **Gespräche vor Code**, siehe [[2026-10-02 Ideen-Check]].
