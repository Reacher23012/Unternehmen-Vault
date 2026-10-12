---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-10-12
status: analyse – keine Rechtsberatung, alles Markierte vom Anwalt prüfen lassen
---
# Schutz von Idee und App („vor Diebstahl schützen“)

Erstellt von der Nachtschicht am 12.10.2026 als Analyse. **Keine Rechtsberatung.** Alles mit ⚖️ gehört vor einer Entscheidung zu Anwalt oder Steuerberater. Zahlen (Gebühren) sind Größenordnungen aus dem Gedächtnis und vor Nutzung beim DPMA zu prüfen.

## Kurzfazit
1. **Die Idee selbst ist nicht schützbar.** Wer „Foto vom Zählerschrank → Maßnahmenliste“ nachbauen will, darf das.
2. Schützbar sind **konkrete Ergebnisse**: Code und Texte (Urheberrecht, automatisch), der Name (Marke, kostet), das Regelwerk (nur als Geschäftsgeheimnis, und nur wenn man es wirklich geheim hält).
3. **Größte Lücke heute:** Das Regelwerk (`regeln.json` + `regelwerk.ts`) steckt im ausgelieferten App-Bundle und liegt damit jedem Nutzer offen im Browser. Das untergräbt den Geheimnisschutz und den eigentlichen Vorsprung (siehe [[Mein Vorteil]], Score „Vorsprung 5“).
4. Der wirksamste Schutz ist realistisch **Tempo, Netzwerk und Daten aus echten Fällen**, nicht Recht.
5. **Offene Frage Nr. 1 ist der Arbeitgeber** (Abschnitt 4). Sie sollte vor dem Livegang geklärt sein, weil sie die Rechte an allem betrifft.

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Wie / Kosten | Einschätzung |
|---|---|---|---|
| **Idee / Konzept** („Foto → Einordnung“) | keiner | – | Jeder darf sie nutzen. Nur Vorsprung und Umsetzung zählen. |
| **Quellcode, Texte, Grafiken** | Urheberrecht (§ 69a ff. UrhG für Software), entsteht automatisch | 0 €; Entstehung mit Datum dokumentieren (Git-Verlauf, Commits) | Schützt gegen **Kopieren** des Codes, nicht gegen einen **Nachbau mit eigenem Code**. |
| **Name „Zählerklar“** | Marke (DPMA, Klassen 9 und 42) oder Benutzungsmarke / Unternehmenskennzeichen | Anmeldung beim DPMA grob 290 € für 3 Klassen (⚖️ aktuelle Gebühr prüfen); Recherche vorher ist Pflicht ([[ADR-0006 Produktname Zählerklar]]) | Sinnvoll **erst nach** Namensrecherche und erstem Interesse. Schützt Namen und Logo, nicht die Funktion. |
| **Domain** | kein Schutzrecht, aber first come first served | `zaehlerklar.de` ca. 1 €/Monat | Billig und sofort sinnvoll (liegt schon in den Aufgaben). |
| **Regelwerk R01–R26** (Auswahl, Formulierung, Gewichtung, Fundstellen) | als **Geschäftsgeheimnis** nach GeschGehG, aber nur bei „angemessenen Geheimhaltungsmaßnahmen“ (§ 2 Nr. 1 GeschGehG); die Zusammenstellung kann zusätzlich als Datenbank-/Sammelwerk geschützt sein (⚖️) | Maßnahmen: technisch (Abschnitt 2) und vertraglich (Abschnitt 3) | **Wichtigster Wert**, aber heute schlecht gesichert. Die zugrunde liegenden Normen und TAB sind fremde bzw. öffentliche Quellen, geschützt wäre nur meine **Auswahl und Aufbereitung**. |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist nicht patentierbar (§ 1 Abs. 3 PatG); nur bei technischem Beitrag | Patent mehrere tausend €, Gebrauchsmuster ca. 40 € + Anwalt; Veröffentlichung gibt das Verfahren preis | **Nicht sinnvoll.** Eine Regelauswertung über Bauteile ist eher Geschäftsmethode. Keine Mittel hierfür. |
| **Fotos / Falldaten** | Daten sind kaum schützbar; Zugriff und Vertrag zählen | Datenbank-Herstellerrecht (§ 87a UrhG) möglich (⚖️) | Wert wächst mit der Zahl echter Fälle. Datenschutz (Fotos, Adressen) beachten, [[Rechtliches]]. |

## 2. Technischer Befund: Regelwerk liegt im Browser
**Stand im Code (geprüft am 12.10.2026):**
- `web/src/regelwerk.ts` importiert `./regeln.json` und enthält die komplette Auswertung (`bewerte(...)`, 26 Regeln mit Bedingung, Maßnahme, Stufe, Fundstelle). `web/src/main.ts` ruft sie direkt im Browser auf.
- `npm run build` (Vite) packt beides in das JavaScript-Bundle. Wer die App öffnet, kann mit den Browser-Werkzeugen **das gesamte Regelwerk lesen und kopieren**, auch minifiziert. Das lässt sich durch Verschleierung nicht ernsthaft verhindern.
- Der Zugriff ist heute nur durch einen **gemeinsamen Zugangscode** (`APP_CODE`) auf die Edge Function geschützt. Die **statischen Dateien der App** (also auch das Regelwerk) sind aber öffentlich, sobald die App bei Netlify liegt, denn der Code wird nur für Backend-Aufrufe abgefragt, nicht fürs Laden der Seite.
- Auch das Demo-Artifact (`build:demo`) enthält das Regelwerk komplett.

**Risiko-Bewertung:**
| Aspekt | Einschätzung |
|---|---|
| Wahrscheinlichkeit, dass es jemand nutzt | gering bis mittel, solange die App unbekannt ist; steigt mit jedem Tester und jedem Konkurrenten, der in einen Betrieb schaut |
| Schaden | hoch: Das Regelwerk ist der Kern des Vorsprungs. Wer es kopiert, braucht nur noch ein Foto-Frontend |
| Rechtliche Folge | Wer ein Geheimnis **offen ausliefert, ohne Schutzmaßnahmen**, hat kaum einen Geheimnisschutz (⚖️). Gleichzeitig sind die einzelnen Regeln inhaltlich Wiedergabe öffentlicher Normen und TAB; schützbar bleibt nur die Aufbereitung |
| Bedeutung **vor** dem Go | gering: In der Validierung testen vertraute Kollegen. Trotzdem: nichts Offenes ausliefern, was später nicht mehr zurückzuholen ist (einmal gelesen ist gelesen) |

**Lösungsskizze „Regelwerk serverseitig“:**
1. `regeln.json` und die Auswertung (`bewerte`) wandern in die Edge Function (`supabase/functions/api`), z. B. als neue Route `POST /bewerte` mit den Eingaben der App.
2. Die Funktion liefert nur das **Ergebnis**: Ampel, Maßnahmenliste (Text + **Fundstelle**), „Vor Ort klären“, Hinweise, Messkonzept. Die App zeigt es nur an. Die Bedingungslogik und die nicht ausgegebenen Regeln verlassen den Server nie.
3. Die Fundstelle ist ein Teil des Nutzens und wird bewusst mit ausgegeben; sie ist öffentliche Quelle, kein Geheimnis.
4. Tests (`regelwerk.test.ts`) bleiben und laufen gegen dieselbe Logik. Praktisch: Auswertung als gemeinsames Modul, das Funktion und Tests importieren (Deno-kompatibel, ohne Vite-Importe).
5. Ohne Backend (lokaler Modus) entfiele die Auswertung. Das ist akzeptabel, weil ohne Foto-Analyse ohnehin kein Produkt entsteht; die Demo (`build:demo`) bekommt dann feste Beispielergebnisse statt Regelwerk.
6. **Restrisiko bleibt:** Wer viele Eingaben durchprobiert, kann das Regelwerk aus den Antworten rekonstruieren. Dagegen helfen Zugang nur mit Login, Mengenbegrenzung (Rate-Limit pro Konto) und Protokoll auffälliger Abfragemuster. Vollständig verhindern lässt es sich nicht.
7. **Aufwand:** etwa 1 Tag Umbau + Tests. Voraussetzung ist ein Weg, die Funktion neu einzuspielen (Supabase, Zugangsdaten), also kein Schritt, den die Nachtschicht selbst ausliefern kann; sie kann aber den Code und die Tests liefern.

**Wichtig zur Reihenfolge:** Das ist **Infrastruktur**. Laut der Regel „Erst verkaufen, dann bauen“ (siehe [[Ideen-System]]) darf sie die Gespräche und Messungen nicht verdrängen. Empfehlung: **nach** den ersten Gesprächen und vor dem Mittesten durch Fremde, nicht vorher. Spätestens vor dem Livegang bei Netlify.

## 3. Verträge
| Baustein | Zweck | Stand / Empfehlung |
|---|---|---|
| **NDA für Tester/Kollegen** | Vertraulichkeit über Regelwerk und App-Inhalte, damit „angemessene Geheimhaltungsmaßnahmen“ belegbar sind | Einseitiges, kurzes NDA (1 Seite) mit Vertragsstrafe-Frage ⚖️. Vor dem **Mittesten** unterschreiben lassen (4 Tester warten). Im Erstgespräch **nicht** nötig, solange man nur über Problem und Preis spricht und nichts Internes zeigt. |
| **Nutzungsbedingungen** | kein Kopieren, kein Reverse Engineering, kein Weitergeben des Zugangs, Haftungsausschluss (ersetzt keine Prüfung durch Errichter) | Bei Livegang mit Kollegen. AGB-Recht (B2B) beachten ⚖️; Entwurf aus Generator + Anwaltsprüfung. |
| **Zugang nur mit Login** | Wer das Regelwerk nutzt, ist bekannt und sperrbar; Basis für Rate-Limit | Heute: ein gemeinsamer Zugangscode, in [[Aufgaben]] „Irgendwann“ bereits „Login statt Zugangscode“. Für den Schutz **vorziehen**, siehe Maßnahmenliste. |
| **Fremdquellen** | Keine Normtexte kopieren, nur Fundstellen (steht schon in [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]) | Beibehalten; schützt auch vor Ansprüchen Dritter (DIN, VDE sind urheberrechtlich geschützt) ⚖️. |

Wichtig: Ein NDA schützt nur das, was **wirklich vertraulich** ist. Zeigt die App das Regelwerk jedem im Browser, hilft das beste NDA wenig.

## 4. Offene Frage: Arbeitgeber ⚖️
Unklar, ob die Idee im Rahmen einer Anstellung im Elektrohandwerk entstanden ist. **Das kann ich nicht beurteilen und der Vault enthält keinen Arbeitsvertrag.** Zu klären (Anwalt für Arbeitsrecht oder Steuerberater/Handwerkskammer-Rechtsberatung):
1. **Arbeitnehmererfindung / Diensterfindung:** Das ArbnErfG gilt für patent- und gebrauchsmusterfähige Erfindungen. Software als solche fällt meist nicht darunter, die Abgrenzung ist aber Sache des Anwalts.
2. **Urheberrecht im Arbeitsverhältnis (§ 69b UrhG):** Entsteht Software **in Wahrnehmung der Aufgaben** oder nach Anweisung des Arbeitgebers, stehen die Nutzungsrechte grundsätzlich dem Arbeitgeber zu. Entscheidend ist, ob die Entwicklung zu den Aufgaben gehört (Elektriker eher nein, aber Wissen und Unterlagen aus dem Betrieb sind ein Thema).
3. **Betriebs- und Geschäftsgeheimnisse des Arbeitgebers:** Nutze ich Unterlagen, Kalkulationen, Fälle oder Kundendaten aus dem Betrieb? Das Regelwerk stützt sich laut Notiz auf TAB, BDEW-Wortlaut und eine Westnetz-Schulung; Prüfen, ob die Schulung vertraulich oder an den Arbeitgeber gebunden war.
4. **Nebentätigkeit:** Anzeige- oder Genehmigungspflicht im Arbeitsvertrag? Oft zustimmungspflichtig, wenn die Tätigkeit Interessen des Arbeitgebers berührt.
5. **Wettbewerbsverbot:** Während der Anstellung gilt ein gesetzliches Wettbewerbsverbot (§ 60 HGB analog, bei Handlungsgehilfen; für Arbeitnehmer allgemein aus Treuepflicht). Eine App für **Kollegen anderer Betriebe** kann konkurrierend wirken, wenn der Arbeitgeber Zählerschrank-Beratung oder ähnliches anbietet. Das ist der heikelste Punkt, wenn Kollegen derselben Region Zielgruppe sind.
6. **Zeit und Mittel:** Entstand das Regelwerk in Arbeitszeit oder mit Betriebsmitteln (Firmenhandy, Fotos von Kundenanlagen)?

**Was ich als Nächstes tun kann (ohne Anwalt):** Arbeitsvertrag, Betriebsvereinbarungen und eine Aufstellung „was im Betrieb / was privat entstanden ist“ bereithalten. Die Zusammenfassung in 5–10 Zeilen reicht für das Erstgespräch (häufig als kurze Erstberatung günstig; Kosten ⚖️ vorab erfragen).
**Bis zur Klärung:** keine Fotos von Kundenanlagen des Arbeitgebers verwenden, keine Betriebsunterlagen ins Regelwerk übernehmen, Werbung nicht über Arbeitgeber-Kanäle.

## 5. Realistischer Schutz durch Tempo
Rechtlich lässt sich nur wenig absichern. Nachahmer sind weniger gefährlich, wenn der Vorsprung aus Dingen besteht, die man nicht kopieren kann:
- **Vorsprung in der Zeit:** Wer zuerst bei Kollegen, Innung und Großhändler bekannt ist, wird als „der Zählerklar-Mensch“ gesehen ([[Direktansprache]]).
- **Netzwerk und Vertrauen:** Der Zugang zu Elektrikern ist laut [[Mein Vorteil]] der echte Burggraben. Kein KI-Aufsatz hat den.
- **Daten aus echten Fällen:** 20, später hunderte Fälle mit tatsächlicher Entscheidung (Trefferquote!) verbessern das Regelwerk und die Foto-Erkennung. Das kann ein Nachbauer nicht ohne Betriebe nachholen. Das spricht dafür, früh Fälle zu sammeln (Datenschutz beachten).
- **Pflege:** Regeln ändern sich (neue Westnetz-TAB, BDEW 2026). Wer sie laufend nachführt, ist dem Kopierer immer einen Schritt voraus. Das spricht für ein Abo-Modell statt Einmalverkauf.
- **Marke / Name:** Wer bekannt ist, gewinnt auch dann, wenn jemand den Code kopiert.
- **Kein Perfektionismus:** Wer 3 Monate in Schutzmaßnahmen steckt, bevor er einen Kunden hat, verliert den Vorsprung eher als durch einen Kopierer. Das Risiko „jemand klaut die Idee“ ist **kleiner** als das Risiko „niemand will zahlen“ ([[Validierung & Go-No-Go]]).

## 6. Priorisierte Maßnahmenliste
| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | Arbeitgeber-Frage klären (Arbeitsvertrag lesen, ggf. Erstberatung) ⚖️ | 0 € für Lesen; Erstberatung grob 0–250 € ⚖️ | 1–3 Std. + Termin | **vor Livegang**, am besten diese Woche lesen |
| 2 | Domain `zaehlerklar.de` sichern; DPMA-Recherche (Klassen 9/42) | ca. 12 €/Jahr; Recherche 0 € | 30 Min. | schon in Aufgaben „Jetzt“ |
| 3 | **Regelwerk serverseitig** (Code, Tests; Abschnitt 2) | 0 € | ca. 1 Tag (Nachtschicht kann Code liefern, Einspielen macht der Nutzer) | **vor** Mittesten durch Fremde / Livegang |
| 4 | NDA-Muster (1 Seite) für Tester; unterschreiben lassen | 0 € Muster; Anwaltsprüfung ⚖️ ca. 100–300 € | 1–2 Std. | vor dem Mittesten |
| 5 | Login statt gemeinsamer Zugangscode + Mengenbegrenzung pro Konto | 0 € (Supabase Auth, Free Tier) | 1–2 Tage | vor Livegang |
| 6 | Nutzungsbedingungen (kein Reverse Engineering, kein Teilen, Haftungsausschluss) | Generator 0–100 €; Anwaltsprüfung ⚖️ | 2–3 Std. | mit Impressum/Datenschutz, [[Rechtliches]] |
| 7 | Urheberhinweis „© Kristian Brunnen“ in App/Landingpage; Git-Verlauf als Nachweis behalten | 0 € | 15 Min. | beim Livegang (nach Punkt 1) |
| 8 | Marke Zählerklar beim DPMA anmelden | ca. 290 € + Gebühren pro Klasse ⚖️ | 1 Std. | **erst bei Go** (3 von 4 Kriterien) |
| 9 | Falldatenbank sauber aufbauen (Einwilligung der Kollegen, Datenschutz) | 0 € | laufend | mit den ersten 20 Fällen |
| 10 | Patent / Gebrauchsmuster | mehrere tausend € | hoch | **nicht verfolgen** |

## Was ich nicht weiß
- Ob und wie der Arbeitsvertrag die Sache berührt (Abschnitt 4) – ⚖️.
- Ob Auswahl und Aufbereitung des Regelwerks als Geschäftsgeheimnis oder Datenbankwerk tragfähig geschützt sind – ⚖️.
- Aktuelle DPMA-Gebühren und genaue Erstberatungskosten – selbst nachsehen, ⚖️.
- Ob die Westnetz-Schulung (09/2025) vertraulich war und wer Rechte an den Unterlagen hat.

Siehe auch: [[Rechtliches]], [[App & Technik]], [[Mein Vorteil]], [[Validierung & Go-No-Go]], [[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]].
