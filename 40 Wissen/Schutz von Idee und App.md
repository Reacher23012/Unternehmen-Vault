---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-10-14
status: analyse – keine Rechtsberatung, Rechtsfragen vom Anwalt prüfen lassen
---
# Schutz von Idee und App („Zählerklar“)

> **Ehrlicher Rahmen:** Das ist eine Analyse aus allgemeinem Wissen, **keine Rechtsberatung**. Alles mit ⚖️ ist unsicher und gehört vor einer Entscheidung zu Anwalt bzw. Steuerberater. Gebühren und Gesetzesstände vor Nutzung prüfen.

**Kurzfazit:** Die *Idee* ist nicht schützbar. Schützbar sind Code, Name und – mit Aufwand – das Regelwerk als Geschäftsgeheimnis. Der echte Schutz ist Tempo, Netzwerk und Falldaten. **Der größte konkrete Hebel ist technisch:** Das Regelwerk liegt heute komplett im Browser jedes Nutzers (siehe Abschnitt 2). Vor dem ersten Test mit Fremden ist Login Pflicht, die Regelauswertung gehört später auf den Server. Das darf aber die Gespräche nicht verdrängen ([[Validierung & Go-No-Go]], [[Ideen-System]]).

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Kosten / Aufwand | Wert hier |
|---|---|---|---|
| **Idee** („Foto → Maßnahmenliste“) | Kein Schutz. Ideen sind frei. | – | Nicht schützbar. |
| **Code** (App, Edge Function) | Urheberrecht für Software (§§ 69a ff. UrhG), entsteht automatisch, ohne Anmeldung. Schützt den konkreten Code, nicht die Funktionsweise: Ein Nachbau mit eigenem Code ist erlaubt. | 0 € | Gering gegen Nachbauer, hilft gegen 1:1-Kopie. |
| **Name / Logo** („Zählerklar“) | Marke beim DPMA (Wort- und/oder Bildmarke), Schutz 10 Jahre, verlängerbar. Vorher Recherche nötig (Kollisionen, Widerspruchsrisiko). Gebühr nach DPMA-Tarif, derzeit grob 290 € für bis zu 3 Klassen bei Online-Anmeldung (⚖️ aktuell prüfen). Anwaltliche Recherche zusätzlich. Die Recherche steht schon als Aufgabe: [[ADR-0006 Produktname Zählerklar]]. | ca. 300 € + ggf. Anwalt | Sinnvoll, **sobald der Name feststeht und Gespräche gut laufen**, nicht vorher. |
| **Regelwerk R01–R26 / Know-how** | Geschäftsgeheimnis nach GeschGehG: nur geschützt, wenn die Information **nicht allgemein bekannt** ist, **wirtschaftlichen Wert** hat und durch **angemessene Geheimhaltungsmaßnahmen** gesichert wird. Ohne diese Maßnahmen: kein Schutz. | Organisatorisch (NDA, Zugriff, Technik) | Mittel. **Einschränkung:** Die Regeln leiten sich aus öffentlichen Quellen ab (BDEW-Musterwortlaut, Westnetz-TAB, VDE, siehe Fundstellen in `regeln.json`). Schützbar ist am ehesten die **Auswahl, Verdichtung und Verknüpfung** (26 Regeln, Bedingungen, Stufen), nicht die einzelne Norm. ⚖️ Ob das für den Schutz reicht, ist offen. |
| **Patent / Gebrauchsmuster** | Computerprogramme „als solche“ sind ausgeschlossen (§ 1 Abs. 3 PatG, § 1 Abs. 2 GebrMG). Nur bei technischem Beitrag denkbar. | Patent: fünfstellig inkl. Anwalt | **Nicht empfohlen.** Zu teuer für eine unvalidierte Idee. |

## 2. Technischer Befund: Regelwerk liegt im Browser
**Geprüft im Code (14.10.2026):**
- `web/src/regeln.json` (ca. 14 KB: alle 26 Regeln mit Bedingung, Maßnahme, Stufe, Fundstelle, Geltung, Status) wird in `web/src/regelwerk.ts` per `import` eingebunden.
- `regelwerk.ts` enthält zusätzlich die komplette Logik (`ausgeloesteRegeln`, jede Bedingung im Klartext-Code). Sie wird von `main.ts` (und `demo.ts`) genutzt, läuft also **im Browser**.
- Die Edge Function (`supabase/functions/api/index.ts`) importiert das Regelwerk **nicht**; sie macht nur Fotoanalyse und Fallspeicher.
- Folge: Das Bundle, das jeder Besucher der App lädt, enthält Regeln **und** Logik, lesbar in den Browser-Entwicklertools (Minifizierung ist keine Sicherung). Zusätzlich liegt das Demo-Artifact mit Beispieldaten auf claude.ai (privat, aber bei Weitergabe des Links sichtbar).

**Risikobewertung:**
- Wer die App öffnen kann, kann das gesamte Regelwerk kopieren, ohne irgendetwas zu „hacken“. Gegen Kopieren hilft kein Frontend-Trick.
- Rechtlich ist das auch ein Problem für das GeschGehG: Wer ein Geheimnis ungeschützt jedem Nutzer ausliefert, hat kaum „angemessene Geheimhaltungsmaßnahmen“ ⚖️.
- Praktisch aktuell **geringes Risiko**: Die App ist noch nicht online, es gibt keinen Login, die Regeln sind großteils aus öffentlichen TAB ableitbar, und ein Nachbauer braucht weiter Fachwissen, Fotoerkennung und Vertrieb. Das Risiko steigt mit Reichweite (Netlify-Livegang, Instagram, Wartelistentester).

**Lösung (Skizze):**
1. **Kurzfristig, ohne Umbau:** App nur mit Login (siehe [[Aufgaben]] „Login statt Zugangscode“) und erst nach Zustimmung zu Nutzungsbedingungen/NDA ausliefern. Der heutige Zugangscode (`APP_CODE`) schützt nur die Edge-Function-Aufrufe, **nicht** das Bundle: die App-Dateien selbst sind öffentlich, sobald sie bei Netlify liegen. Alternativ App-Auslieferung selbst hinter Zugang (z. B. Netlify-Passwortschutz, kostenpflichtiger Tarif ⚖️ Preis prüfen) oder nur für bekannte Tester.
2. **Mittelfristig (Code-Aufgabe):** Regelauswertung in die Edge Function verlegen. Die App schickt nur die Eingaben (`Eingaben`); Antwort: ausgelöste Regeln mit Maßnahme, Stufe und Fundstelle **nur für die ausgelösten Regeln**. `regeln.json` und die Prüflogik liegen nur noch serverseitig. Nebenwirkung: Wer ein Konto hat, sieht weiter jeweils die Ergebnisse seiner Fälle, kann aber das Gesamtregelwerk nur durch systematisches Abfragen rekonstruieren, das sich per Rate-Limit und Protokoll bremsen lässt.
3. Nachteil: Offline-Nutzung und Demo-Build brauchen dann eine abgespeckte Variante. Der Offline-Modus steht ohnehin erst nach Go an (siehe [[App & Technik]]).
4. Aufwand grob: 1 Nachtschicht für Verlagerung + Tests (Tests laufen bereits gegen `ausgeloesteRegeln`, lassen sich in den Server-Code übernehmen), plus Einspielen der Edge Function (manuell, braucht Konto).

**Grenze:** Auch serverseitig lässt sich ein Regelwerk durch viele Testfälle „abtasten“. Das macht Kopieren mühsam, nicht unmöglich. Mehr als „mühsam machen“ ist realistisch nicht drin.

## 3. Verträge
- **NDA für Tester/Kollegen:** Kurze Vereinbarung (1 Seite): Zugang nur für den Tester, keine Weitergabe von Zugang, Screenshots und Regelinhalten, kein Nachbau, Dauer. Das ist genau die Art „angemessene Geheimhaltungsmaßnahme“. ⚖️ Vom Anwalt prüfen lassen, bevor Fremde testen; für Kollegen aus dem Bekanntenkreis wirkt ein ungewöhnlich förmliches NDA allerdings abschreckend. Abwägen: Auswahl der Tester vs. Aufwand.
- **Nutzungsbedingungen (AGB-artig):** Kein Kopieren, kein Reverse Engineering, kein automatisiertes Abfragen, Hinweis „ersetzt keine Prüfung vor Ort“ (Haftung). Gehört zu [[Rechtliches]] und wird zusammen mit Impressum/Datenschutz geprüft. ⚖️ Haftungsbeschränkungen sind eng begrenzt (AGB-Recht).
- **Zugang nur mit Login:** persönlicher Zugang je Tester statt gemeinsamer Zugangscode, damit Weitergabe nachvollziehbar ist.
- **Zurückhaltung beim öffentlichen Zeigen:** Instagram-Posts und Rätselfälle zeigen Ergebnisse, aber nicht die vollständige Regelliste.

## 4. Arbeitgeber-Frage (offen – klären lassen)
Das ist die wichtigste **rechtliche** Unsicherheit. Aus der Nachtschicht lässt sich nur der Fragenkatalog liefern, keine Antwort:
- Bin ich angestellt im Elektrohandwerk (laut [[Mein Vorteil]] arbeite ich dort)? Wenn ja: Was steht im **Arbeitsvertrag** zu Nebentätigkeit, Wettbewerbsverbot und Rechten an Arbeitsergebnissen?
- **Software:** Für Programme, die ein Arbeitnehmer in Wahrnehmung seiner Aufgaben oder nach Weisung schafft, gehen die Nutzungsrechte nach § 69b UrhG auf den Arbeitgeber über. Eine in der Freizeit entwickelte App ist eher mein Eigentum, aber ⚖️ die Abgrenzung hängt vom Einzelfall ab.
- **Regelwerk/Fachwissen:** Wurde das Wissen im Betrieb erworben (Schulungen, Unterlagen des Arbeitgebers, interne Kalkulationen)? Das Regelwerk aus öffentlichen Quellen (BDEW, TAB) ist unkritischer als betriebsinterne Unterlagen. ⚖️ Geschäftsgeheimnisse des Arbeitgebers dürfen nicht verwendet werden.
- **Arbeitnehmererfindungsgesetz** betrifft Erfindungen (patent-/gebrauchsmusterfähig); bei Software meist nicht einschlägig, ⚖️ aber prüfen.
- **Wettbewerb:** Während der Anstellung gilt eine Treuepflicht. Wenn die App Wettbewerb zum Arbeitgeber ist oder dessen Kunden anspricht (Elektrobetriebe als Zielgruppe, evtl. der Arbeitgeber selbst), kann das zum Problem werden. ⚖️ Nebentätigkeit ggf. anzeigen oder genehmigen lassen.
- Steuerlich: Gewerbeanmeldung/Kleinunternehmer, wenn Einnahmen entstehen → Steuerberater (nicht Teil dieser Analyse).

**Konkrete Aufgabe für mich:** Arbeitsvertrag lesen, Fragen oben notieren, 1 Beratungstermin Fachanwalt für Arbeits-/IT-Recht (Erstberatung, Kosten vorab erfragen). **Vor dem Livegang**, aber nach den Gesprächen.

## 5. Realistischer Schutz: Tempo und Nähe
Rechtlicher Schutz ist hier schwach, der echte Schutz kommt aus anderem:
- **Vorsprung:** Wer zuerst echte Betriebe hat, ist schwer einzuholen. Ein Kopierer braucht Fachwissen, Regelpflege (Westnetz-TAB ändert sich, siehe Aufgabe „Neue Westnetz-TAB beobachten“) und Vertrauen.
- **Netzwerk:** Direktansprache bei Kollegen, Innung, Handwerkskammer ([[Direktansprache]]) – das kann niemand per Code kopieren.
- **Daten aus echten Fällen:** Die gesammelten Fälle (Foto-Erkennung vs. Entscheidung des Elektrikers) sind der eigentliche Schatz: Trefferquote, typische Fehlerbilder. Diese Daten gehören nicht in öffentliche Bundles. ⚖️ Datenschutz: Fotos können Kundendaten enthalten.
- **Pflege:** Ein aktuelles Regelwerk schlägt einen alten Klon.

## 6. Maßnahmenliste (priorisiert)
| Prio | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | **Gespräche führen** (Validierung vor Schutz) | 0 € | – | jetzt |
| 2 | Keine öffentlichen Links auf die App ohne Zugang; Tester nur persönlich; kein ungeschützter Livegang | 0 € | gering | bis Mittesten |
| 3 | Login statt Zugangscode (persönlich je Tester) | 0 € | mittel | vor Fremdtestern |
| 4 | Regelwerk serverseitig (Code-Aufgabe) | 0 € | 1 Nachtschicht + Einspielen | vor öffentlichem Livegang |
| 5 | Einseitige Tester-Vereinbarung (NDA + Nutzungsbedingungen) prüfen lassen | ca. 150–400 € Anwalt (Schätzung) | gering | vor Fremdtestern |
| 6 | Arbeitgeber-Frage klären (Arbeitsvertrag, Erstberatung) | Erstberatung, Kosten vorab erfragen | gering | vor Livegang |
| 7 | Markenrecherche + Anmeldung „Zählerklar“ | ca. 300 € + ggf. Anwalt | gering | nach Namensprüfung und guten Gesprächen |
| 8 | Patent/Gebrauchsmuster | – | – | **nicht** verfolgen |

Entscheidung (kein ADR, solange offen): Schutz kommt **nach** den Gesprächen, aber Punkte 2 und 3 vor dem Mittesten durch Fremde.
