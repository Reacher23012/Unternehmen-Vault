---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-11-11
---
# Schutz von Idee und App

> **Keine Rechtsberatung.** Das ist eine Analyse zum Sortieren der Fragen. Alles mit 🔶 gehört vor einer Entscheidung zum Anwalt (Marken-/IT-Recht, Arbeitsrecht). Kostenangaben sind grobe Größenordnungen aus dem Gedächtnis, nicht recherchiert: vor Verwendung prüfen.

**Kurzfassung:** Die *Idee* ist nicht schützbar. Schützbar sind *Code*, *Name* und mit Einschränkung das *Regelwerk als Geschäftsgeheimnis*. Der größte praktische Hebel ist, das Regelwerk **nicht mehr im Browser auszuliefern**. Alles Weitere ist Tempo, Netzwerk und Daten → [[Mein Vorteil]].

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Wie | Kosten / Aufwand | Einschätzung |
|---|---|---|---|---|
| **Idee** („Foto → KI → Maßnahmenliste“) | **keiner** | Ideen als solche sind frei | – | Jeder darf das nachbauen. Schutz nur über Vorsprung. |
| **Code** (Web-App, Edge Function) | Urheberrecht (Software, §§ 69a ff. UrhG) | entsteht automatisch, ohne Anmeldung | 0 € | Schützt vor 1:1-Kopie, **nicht** vor Nachbau mit eigenem Code. Git-Verlauf (Zeitstempel) als Nachweis aufheben. |
| **Name „Zählerklar“** | Marke (DPMA) bzw. Unternehmenskennzeichen | Anmeldung beim DPMA, Klassen 9 und 42 (laut [[ADR-0006 Produktname Zählerklar]]) | Anmeldegebühr im dreistelligen Euro-Bereich (online, bis 3 Klassen; aktuelle Gebühr beim DPMA prüfen) + evtl. Anwalt | Sinnvoll **erst nach** Recherche und **erst bei erstem Umsatz**. Vorher Domain/Handle sichern. 🔶 Markenrecherche (Verwechslungsgefahr) |
| **Regelwerk / Know-how** (R01–R26, Auslegung der TAB) | Geschäftsgeheimnis (GeschGehG) | nur geschützt, wenn es **geheim** ist, wirtschaftlichen Wert hat und der Inhaber **angemessene Geheimhaltungsmaßnahmen** getroffen hat (§ 2 Nr. 1 GeschGehG) | 0 € + Organisation | Der Schutz hängt an den Maßnahmen: Wer das Regelwerk ungeschützt ausliefert, hat ihn praktisch verspielt. Siehe Abschnitt 2 und 3. 🔶 |
| **Zugrunde liegende Normen / TAB-Texte** | fremde Rechte (Urheberrecht bei DIN/VDE, BDEW, Westnetz) | – | – | Nicht meins. Laut [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]] stehen nur **Fundstellen**, keine Normtexte in der App. Das muss so bleiben, sonst droht Ärger *gegen* mich. |
| **Patent** | bei Software „als solcher“ ausgeschlossen; nur bei technischem Beitrag | Anmeldung EPA/DPMA | hoch (vierstellig und mehr mit Anwalt) | Unrealistisch und unwirtschaftlich. **Nicht verfolgen.** |
| **Gebrauchsmuster** | Software als solche ebenfalls nicht schutzfähig | DPMA | niedrig bis mittel | Gleiches Fazit. Nicht verfolgen. |

## 2. Technischer Befund: Das Regelwerk liegt im Browser
**Geprüft im Code (11.11.2026):**
- `web/src/regeln.json` (261 Zeilen) enthält je Regel `id`, `name`, **`bedingung`**, **`massnahme`**, `stufe`, **`fundstelle`**, `geltung`, `status`: also Fachinhalt *und* Quellenarbeit.
- `web/src/regelwerk.ts` (124 Zeilen) importiert diese JSON-Datei und enthält die Auswertung (`ausgeloesteRegeln`, `bewerte`).
- `web/src/main.ts` importiert `bewerte` aus `./regelwerk` → die Entscheidung läuft **im Browser des Nutzers**. Folglich steckt das **komplette Regelwerk im ausgelieferten JS-Bundle**.
- Die Edge Function (`supabase/functions/api/index.ts`) bietet nur `/analyse` (Foto → KI), `/faelle` und `/warteliste`. Das Regelwerk wird dort nicht ausgewertet.

**Bewertung des Risikos**
| Szenario | Folge |
|---|---|
| Jeder, der die App-URL kennt, kann das Bundle laden, auch ohne Login (heute liegt nur die KI-Analyse und die Fall-Speicherung hinter dem Zugangscode, **die Auswertung nicht**). Sobald die App bei Netlify liegt, ist das Regelwerk öffentlich lesbar (Browser-Entwicklertools genügen). | Ein Nachahmer bekommt R01–R26 samt Fundstellen geschenkt. Das ist genau der Teil, der laut [[Zählerschrank-Check]] den „Vorsprung“ (5/5 im Score) ausmacht. |
| Rechtlich: Was veröffentlicht ist, ist kein Geheimnis mehr | Der Schutz als Geschäftsgeheimnis entfällt für das, was jeder abrufen kann. 🔶 Wie weit der Schutz trotz Nutzungsbedingungen reicht, klärt der Anwalt. |
| Obfuskation / Minifizierung | bremst nur Faule, ist **kein** Schutz. Nicht darauf verlassen. |

**Ehrliche Gegenrechnung:** Der Fachinhalt ist aus öffentlichen Quellen (TAB, Westnetz-Schulung) abgeleitet. Ein Konkurrent *könnte* ihn selbst erarbeiten. Geschützt wird also vor allem **Zeit und Mühe**, nicht ein unauffindbares Geheimnis. Das ist trotzdem der Kern des Vorsprungs, solange keine Kunden und keine Daten da sind.

**Lösungsskizze: Regelauswertung serverseitig**
1. `regeln.json` und die Logik aus `regelwerk.ts` wandern in die Edge Function (neue Route `POST /bewerte`, hinter `x-app-code` bzw. später Login).
2. Die App schickt nur die **Eingaben** (Felder, Vorhaben) und bekommt das **Ergebnis**: Ampel, Maßnahmen mit Fundstelle, „Vor Ort klären“, Hinweise. **Nie** die Liste aller Regeln.
3. Die Regeldatei verlässt den Server nicht (nicht im Repo-Ordner `web/`, nicht im Bundle). Im Git-Repo bleibt sie privat → Repository privat halten; Test-Daten ohne Echtinhalt.
4. Tests (`regelwerk.test.ts`, `daten.test.ts`) laufen weiter gegen die Logik, die dazu in einen gemeinsamen Ordner (z. B. `supabase/functions/_shared/`) zieht. Demo-Build (`build:demo`) braucht eine abgespeckte Beispielauswertung.
5. Restrisiko: Wer viele Eingaben durchprobiert, rekonstruiert das Regelwerk Stück für Stück (Black-Box-Abfrage). Gegenmittel: Zugang nur mit Login, Rate-Limit pro Nutzer, Auffälligkeiten im Log. Das ist hoher Aufwand für den Angreifer, aber nicht unmöglich.
6. Nebenwirkung: Offline-Nutzung (steht ohnehin erst „nach Go“ auf der Liste) und Auswertung ohne Netz fallen weg. Auf der Baustelle ohne Empfang ist das ein echter Nachteil → bewusst entscheiden, siehe Priorisierung.
7. Aufwand grob: 1–2 Tage (Logik verschieben, Route, App umstellen, Tests anpassen, einspielen). Einspielen der Edge Function braucht Zugangsdaten, also nicht die Nachtschicht.

## 3. Verträge und Zugang
| Maßnahme | Zweck | Hinweis |
|---|---|---|
| **Geheimhaltungsvereinbarung (NDA)** für Tester/Kollegen, die Einblick ins Regelwerk bekommen | Voraussetzung für „angemessene Geheimhaltungsmaßnahmen“ | 1 Seite, einfach halten. Reine Gespräche über das Problem brauchen kein NDA (und ein NDA vor dem ersten Gespräch schreckt Kollegen ab). Nur bei echtem Zugang zur App/zum Regelwerk. 🔶 Muster vom Anwalt prüfen lassen |
| **Nutzungsbedingungen / AGB**: kein Kopieren, kein systematisches Auslesen, kein Reverse Engineering | Reverse Engineering ist nach GeschGehG grundsätzlich erlaubt, **außer** es ist vertraglich ausgeschlossen (§ 3 GeschGehG) → der Ausschluss muss in die Bedingungen | 🔶 Wirksamkeit von Klauseln in AGB gegenüber Unternehmern vom Anwalt prüfen lassen; gehört zu [[Rechtliches]] |
| **Zugang nur mit Login** (statt gemeinsamem `APP_CODE`) | Zuordnung, Sperrung, Nachweis, wer was abgerufen hat | Steht schon als „Login statt Zugangscode“ unter „Irgendwann“ und wird durch dieses Konzept zur Voraussetzung vor dem Kollegen-Test |
| **Vertraulichkeit intern** | Wer darf das Regelwerk-Original (Excel, Vault, Repo) sehen? | Repos privat lassen, keine Weitergabe der Excel-Mappe, keine Regeln in öffentliche Posts (Instagram-Rätsel zeigen *einzelne* Fälle, nicht das ganze System; bei [[Instagram-Posts 1–10]] auf diesen Punkt achten) |

## 4. Arbeitgeber-Frage (🔶 offene Frage für Anwalt/Steuerberater)
Das Regelwissen stammt aus meiner Arbeit im Elektrohandwerk. **Wem gehört die Idee, wenn sie im Rahmen einer Anstellung entstanden ist?** Hier weiß ich zu wenig und rate nicht. Punkte, die ein Anwalt für Arbeitsrecht klären sollte:
1. **Arbeitsvertrag lesen:** Nebentätigkeitsklausel (Anzeige-/Genehmigungspflicht?), Wettbewerbsverbot, Verschwiegenheit, Regelungen zu Arbeitsergebnissen.
2. **Software:** Für Programme, die ein Arbeitnehmer in Wahrnehmung seiner Aufgaben schafft, stehen die Verwertungsrechte nach § 69b UrhG grundsätzlich dem Arbeitgeber zu. Entscheidend: Gehört Programmieren zu meinen Aufgaben? (Vermutlich nein, aber nicht selbst entscheiden.)
3. **Arbeitnehmererfindungsgesetz:** gilt für patent-/gebrauchsmusterfähige Erfindungen. Bei Software kaum relevant, weil dort ohnehin kein Patent geplant ist.
4. **Know-how aus dem Betrieb:** Wurden Regeln aus Betriebsunterlagen, internen Schulungen oder Kundenfällen des Arbeitgebers gewonnen? Dann könnte der Arbeitgeber Ansprüche stellen (Geschäftsgeheimnis des Arbeitgebers). Wichtig ist die Trennung: öffentliche Quellen (TAB, Westnetz-Schulung, Normen) vs. Betriebsinternes. Die `fundstelle`-Angaben in `regeln.json` helfen genau dabei: Regeln, die nur aus Betriebswissen stammen, sind der Risikobereich.
5. **Wettbewerb:** Wenn mein Arbeitgeber selbst Elektrobetrieb ist und die Zielgruppe (Elektrobetriebe im Westnetz-Gebiet) mein Arbeitgeber und dessen Wettbewerber sind: Interessenkonflikt, evtl. Zustimmung nötig.
6. **Praktisch:** Arbeit am Projekt nur in der Freizeit, mit eigenen Geräten, ohne Betriebsmittel, Fotos nur von Schränken, die ich privat/anonym beschaffe (nichts aus Kundenaufträgen des Arbeitgebers → auch [[Bildrechte im Marketing]]).

**Empfehlung:** Einmalige Erstberatung beim Fachanwalt für Arbeitsrecht **vor dem ersten Euro Umsatz** und möglichst vor dem Kollegen-Test, mit Arbeitsvertrag in der Hand. Das kostet wenig gegenüber dem Risiko, nachträglich Rechte zu verlieren. Fragen vorher in einem Dokument sammeln (diese Liste reicht als Gerüst).

## 5. Realistischer Schutz: Tempo statt Paragrafen
Ehrlich: Rechtlich ist hier wenig mit Gewissheit zu schützen. Der tatsächliche Wall sind:
- **Vorsprung:** Wer zuerst bei den Betrieben im Westnetz-Gebiet ist und liefert, wird der Standard. Das passt zu [[ADR-0005 Direktansprache vor Instagram]].
- **Netzwerk:** persönliche Kontakte zu Kollegen, Innung, Großhändler: nicht kopierbar.
- **Daten aus echten Fällen:** jeder erfasste Fall mit „tatsächlicher Entscheidung“ verbessert Regeln und Trefferquote. Konkurrenz startet bei null. Das ist der eigentliche Schutzgraben **und** ein Grund, Fälle sauber zu erfassen (Einwilligung der Kunden/Betriebe in den Nutzungsbedingungen regeln 🔶, Datenschutz).
- **Netzbetreiber-Beziehung:** Wer die TAB-Änderungen (z. B. neue Westnetz-TAB 2026) zuerst einarbeitet, bleibt aktuell.
- **Gegenseite denken:** Der wahrscheinlichste „Dieb“ ist kein Hacker, sondern ein Kollege, der es nachbaut, oder ein größerer Anbieter (z. B. ein Netzbetreiber-Portal, Software für Elektrohandwerker), der es später selbst einbaut. Dagegen schützt nur Vorsprung und Kundenbindung.

## 6. Priorisierte Maßnahmenliste
Reihenfolge nach Wirkung pro Aufwand, **ohne die Validierung zu verdrängen**: Die 5 Gespräche stehen weiter vorn (Regel „erst verkaufen, dann bauen“, [[Ideen-System]]).

| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | **Repos privat halten**, keine Excel/Regeln in öffentliche Posts oder Gruppen | 0 € | Minuten | sofort |
| 2 | **Regelwerk serverseitig** (Abschnitt 2) | 0 € | 1–2 Tage | **vor** dem öffentlichen Livegang bzw. Kollegen-Test mit Zugriff aufs Bundle |
| 3 | **Login statt Zugangscode** | 0 € (Supabase Auth) | ca. 1 Tag | zusammen mit 2 |
| 4 | Nutzungsbedingungen mit Reverse-Engineering-Verbot, Einwilligung zur Fallnutzung | Anwalt 🔶 | 1–2 Std. + Anwaltskosten | vor Livegang, parallel zu [[Rechtliches]] |
| 5 | **NDA-Muster** für Tester mit echtem Zugang | Anwalt 🔶 | 1 Seite | vor dem Kollegen-Test |
| 6 | Arbeitgeber-Frage klären (Abschnitt 4) | Erstberatung Fachanwalt Arbeitsrecht 🔶 | 1 Termin | vor dem ersten Euro, besser früher |
| 7 | Domain `zaehlerklar.de` + Handle sichern, DPMA-Recherche | wenige € / Domain | Minuten | steht schon unter „Jetzt“ |
| 8 | Markenanmeldung „Zählerklar“ (Klassen 9, 42) | Gebühr beim DPMA, dreistellig | 1 Std. | erst bei klarem Go |
| 9 | Zeitstempel/Nachweis des Codes (Git-Verlauf sichern, regelmäßig Backup) | 0 € | Minuten | laufend |
| – | Patent / Gebrauchsmuster | – | – | nicht verfolgen |

## Entscheidung nötig (nicht von der Nachtschicht getroffen)
Die Maßnahmen 2 und 3 kosten Entwicklungszeit, bevor Zahlungsbereitschaft belegt ist. Vorschlag: Beide erst **nach** den ersten Gesprächen und **vor** dem Kollegen-Test mit Fremdzugriff umsetzen. Ein einzelner Test im eigenen Betrieb mit dem lokal laufenden Bundle verschenkt kein Geheimnis. Wird das Regelwerk nach Go als Hauptvorsprung gesehen, als ADR festhalten (`/entscheidung`).
