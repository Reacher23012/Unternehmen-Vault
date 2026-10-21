---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-10-21
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App

> **Wichtig:** Das ist eine Analyse der Nachtschicht, **keine Rechtsberatung**. Alles, was unten mit ⚖️ markiert ist, bitte vom Anwalt prüfen lassen. Die Gebühren sind Größenordnungen aus dem Gedächtnis (Stand nicht geprüft), vor der Anmeldung auf dpma.de nachsehen.

**Kurzfassung:** Die *Idee* ist nicht schützbar. Der *Code*, der *Name* und das *Regelwerk als Geheimnis* sind es eingeschränkt. Das größte konkrete Loch ist technisch: Das komplette Regelwerk liegt heute im App-Bundle und damit bei jedem, der die App-Adresse öffnet (siehe Abschnitt 2). Das lässt sich mit einem überschaubaren Umbau schließen. Offen und potenziell wichtiger ist die Arbeitgeber-Frage (Abschnitt 4), weil sie die Rechte an allem betreffen kann.

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Was es bringt | Kosten / Aufwand |
|---|---|---|---|
| **Idee** („Foto → Maßnahmenliste“) | keiner. Ideen und Konzepte sind frei | nichts: Jeder darf dieselbe Idee bauen | – |
| **Code der App** | Urheberrecht für Computerprogramme (§§ 69a ff. UrhG), entsteht automatisch, ohne Anmeldung | Niemand darf den Code 1:1 kopieren. Die *Funktion* und die *Idee dahinter* schützt es nicht, ein Nachbau mit eigenem Code ist erlaubt | 0 €. Nur Belege aufheben (Git-Verlauf mit Datum, Zeitstempel) |
| **Name „Zählerklar“** | Marke (MarkenG) per Anmeldung beim DPMA; ohne Anmeldung nur schwacher Schutz durch Benutzung | Kann Nachahmern den Namen/Verwechslungsgefahr verbieten. Dafür vorher Recherche (Identische/ähnliche Marken, auch „Zählerklar“ als Wort in der Branche beschreibend?) | DPMA-Online-Anmeldung grob 290 € für bis zu 3 Klassen (Stand prüfen), dazu Recherche; Anwalt optional. Dauer einige Monate. → Aufgabe „DPMA-Markenrecherche“ steht schon in [[Aufgaben]] |
| **Regelwerk R01–R26** (Auswahl, Bedingungen, Texte, Zusammenstellung) | (a) als **Geschäftsgeheimnis** nach Geschäftsgeheimnisgesetz (GeschGehG), (b) eventuell Urheberrecht an den eigenen Texten, (c) evtl. Datenbankschutz (§§ 87a ff. UrhG) für die Sammlung | (a) gilt nur, wenn das Regelwerk **tatsächlich geheim** ist *und* **angemessene Geheimhaltungsmaßnahmen** getroffen werden (§ 2 Nr. 1 GeschGehG). Liegt es offen im Browser, wird der Schutz schwer bis unmöglich. ⚖️ (b)/(c): Tragweite unsicher | Maßnahmen siehe Abschnitte 2 und 3 |
| **Patent** | Software „als solche“ ist nicht patentierbar (§ 1 Abs. 3 PatG), nur technische Lösungen mit technischem Beitrag. Ein Regelwerk „wenn Bauart X, dann Maßnahme Y“ ist kaum patentfähig. Gebrauchsmuster: Programme sind hier ausgeschlossen | praktisch kein Schutz | Patent mehrere tausend Euro mit Anwalt: **nicht empfohlen** |
| **Fachinhalt aus Normen/TAB** | gehört dem Normgeber bzw. Netzbetreiber | Wir dürfen nur Fundstellen nennen, keine Normtexte kopieren (so schon in [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]). Das Regelwerk ist deshalb auch keine „Erfindung“, sondern Auslegung öffentlicher Vorgaben. Der Wert liegt in der Auswahl und Verdichtung, die ein Konkurrent aus denselben TAB-PDFs auch selbst bauen kann | – |

**Ehrliche Einschätzung:** Recht schützt hier vor *dreistem Kopieren* (Code, Name, geheime Unterlagen), nicht vor *Nachbauen*. Wer die TAB des Netzbetreibers liest, kann ein ähnliches Regelwerk selbst bauen. Der eigentliche Schutz ist Abschnitt 5.

## 2. Technischer Befund: Das Regelwerk liegt im Browser
Geprüft im Code-Repo `zaehlerschrank-check` (Stand 21.10.2026):

- `web/src/regelwerk.ts` importiert `web/src/regeln.json` und enthält zusätzlich die **komplette Auswertungslogik** (`ausgeloesteRegeln`, `ergebnisAus`, `messkonzept`, `schlimmsterFall`). Vite bündelt beides in das JavaScript der App.
- `web/src/main.ts` und `web/src/demo.ts` rufen `bewerte(...)` **im Browser** auf. Die Edge Function (`supabase/functions/api`) kennt nur `/analyse`, `/faelle`, `/warteliste`, keine Bewertung.
- `regeln.json` (ca. 14 KB) enthält pro Regel Name, Bedingung, Maßnahme, Stufe, **Fundstelle**, Geltung, Status. Die Fundstellen mit Seitenzahlen und Bildverweisen sind der Teil, der am meisten Recherche kostet.
- Der `APP_CODE` schützt nur die **API** (Fotoanalyse, Fälle). Er schützt **nicht** die ausgelieferten Dateien. Sobald die App auf Netlify liegt, kann jeder die Adresse öffnen, das JavaScript lesen (Entwicklerwerkzeuge, „Quelltext anzeigen“) und das ganze Regelwerk ohne Login herauslesen. Selbst ohne Source Maps ist das nur minimierter, nicht verschlüsselter Code.
- Das **Demo-Artifact** (`npm run build:demo`) enthält dasselbe Regelwerk in einer einzigen HTML-Datei. Nicht weitergeben, solange das Regelwerk nicht anderweitig geschützt ist.

**Risikobewertung:**
- *Eintrittswahrscheinlichkeit jetzt:* gering. Die App ist noch nicht online, der Kreis der Tester ist klein. Das ändert sich mit dem Netlify-Deployment und der Landingpage, die dann auf die App verweisen kann.
- *Schaden:* mittel. Ein Nachbauer spart sich die Regelrecherche, nicht mehr. Ein größerer Schaden ist rechtlich: Wer sein Regelwerk als Geschäftsgeheimnis behandeln will, aber es ungeschützt ausliefert, verliert den Schutz nach GeschGehG weitgehend. ⚖️
- *Aufwand zum Schließen:* überschaubar, siehe unten.

**Lösungsskizze („Regelwerk serverseitig“):**
1. Neue Route `POST /bewerte` in der Edge Function: nimmt die `Eingaben`, führt `bewerte()` aus und liefert nur das **Ergebnis** (Ampel, ausgelöste Regeln mit Maßnahme und Fundstelle, offene Punkte, Messkonzept).
2. `regelwerk.ts` und `regeln.json` wandern aus dem App-Bundle in die Edge Function (Deno). Die Logik kann als gemeinsames Modul für Tests im Repo bleiben, wird aber nicht mehr von `web/` importiert. Die Tests (`regelwerk.test.ts`) laufen weiter gegen das Modul.
3. `main.ts` und der Fall-Speicher rufen `/bewerte` auf (mit `x-app-code`). Der Fall enthält weiterhin die angezeigte Ausgabe.
4. Die App zeigt nur Ergebnis + Fundstelle der **ausgelösten** Regeln. Nicht ausgelöste Regeln und Bedingungen bleiben auf dem Server. Wichtig: Wer viele Eingaben durchprobiert, kann das Regelwerk trotzdem **Stück für Stück erraten** („Black-Box-Abtastung“). Dagegen helfen Zugang nur mit Login, Mengenbegrenzung pro Konto und Protokollierung auffälliger Abfragen, aber kein vollständiger Schutz.
5. **Preis dafür:** Die Auswertung braucht Netz. Heute funktioniert das Ergebnis offline, die Fälle werden bei Funkloch lokal gespeichert und nachgesendet (siehe [[App & Technik]], Review 29.09.). Mit serverseitiger Bewertung gilt: Foto/Eingabe offline sammeln, Ergebnis erst mit Netz. Auf der Baustelle im Keller ein echter Nachteil, den wir in den Gesprächen abfragen sollten.
6. **Demo-Build** bekommt ein stark gekürztes Beispiel-Regelwerk (nur Beispielfälle fest hinterlegt), nicht das echte.

**Empfehlung zur Reihenfolge:** Vor dem Deployment der öffentlichen App (Aufgabe „Netlify-Konto“) umsetzen, nicht danach. Es widerspricht nicht dem Grundsatz „erst verkaufen, dann bauen“ (Arbeitsregeln im Vault), weil es keine neue Funktion ist, sondern eine Voraussetzung für das Online-Stellen. Es **verschiebt** aber die Validierung nicht: Die 5 Gespräche und die 20 Schränke laufen weiter vor allem anderen.

## 3. Verträge und Zugang
| Maßnahme | Zweck | Aufwand / Kosten |
|---|---|---|
| **Geheimhaltungsvereinbarung (NDA)** für Tester und Kollegen, die mehr als Beispielergebnisse sehen | Nachweis „angemessener Geheimhaltungsmaßnahmen“ nach GeschGehG; ohne Vereinbarung ist die Weitergabe schwer zu belangen | Vorlage vom Anwalt oder von der Handwerkskammer; einseitig, kurz (1 Seite). ⚖️ Die Vorlage vom Anwalt prüfen lassen. Etwa 100–300 € einmalig (Schätzung) |
| **Nutzungsbedingungen / AGB** der App: nur eigene berufliche Nutzung, kein Kopieren, kein Auslesen/Scraping, kein Reverse Engineering, keine Weitergabe des Zugangs, Hinweis „Ergebnis ersetzt keine Prüfung“ | Vertragliche Grundlage, um Missbrauch zu untersagen und Konten zu sperren | AGB-Vorlage anpassen, vom Anwalt prüfen. ⚖️ Zusammen mit Impressum/Datenschutz erledigen → [[Rechtliches]] |
| **Zugang nur mit Login** statt gemeinsamem Zugangscode | Der `APP_CODE` ist ein einziges Passwort für alle. Es lässt sich weitergeben, nicht entziehen und nicht zuordnen. Ein Konto je Tester macht Sperren, Mengenbegrenzung und Nachweis möglich | Supabase Auth ist vorhanden. Schon als Aufgabe in „Irgendwann“: „Login statt Zugangscode“; durch dieses Konzept wird sie wichtiger |
| **Kennzeichnung** „vertraulich / © Zählerklar“ in der App und im Regelwerk-Export | Erkennbarkeit als Geheimnis, Beweisfunktion | trivial |
| **Zugriffsrechte im Vault und im Code-Repo prüfen**: Beide GitHub-Repos privat? Wer hat Zugriff? Das Regelwerk steht auch in [[Regelwerk R01–R26]] und in [[Entscheidungsbaum Excel]] | Ein öffentliches Repo oder geteilter Vault würde alles andere aushebeln | 5 Minuten, bitte selbst prüfen (die Nachtschicht kann das nicht sicher feststellen) |

## 4. Arbeitgeber-Frage (offen, ⚖️ für Anwalt und Steuerberater)
**Ausgangslage:** Entstanden ist die Idee im Elektrohandwerk, mit Fachwissen aus der beruflichen Praxis. Aus den Vault-Notizen geht nicht hervor, ob eine Anstellung besteht, wie der Arbeitsvertrag lautet und ob die Arbeit an Zählerklar in oder außerhalb der Arbeitszeit mit Betriebsmitteln (Fotos aus Kundenobjekten, Unterlagen vom Netzbetreiber, Schulungsunterlagen) stattfand. Das ist eine Annahme, bitte korrigieren, falls es nicht stimmt.

Fragen, die ich **nicht** beantworten kann und die ein Anwalt für Arbeitsrecht/IT-Recht klären sollte:
1. **Rechte am Programm (§ 69b UrhG):** Bei Programmen, die ein Arbeitnehmer *in Wahrnehmung seiner Aufgaben oder nach Anweisung* schafft, stehen die Nutzungsrechte grundsätzlich dem Arbeitgeber zu. Gilt das hier? Wohl eher nicht, wenn die App nicht zu den Aufgaben im Betrieb gehört, aber die Abgrenzung ist fallabhängig.
2. **Arbeitnehmererfindungsgesetz (ArbnErfG):** Betrifft patent- und gebrauchsmusterfähige Erfindungen und technische Verbesserungsvorschläge. Bei Software kaum einschlägig (siehe Abschnitt 1), aber nicht auszuschließen. Stehen im Arbeitsvertrag Klauseln zu Erfindungen?
3. **Nebentätigkeit:** Muss die Tätigkeit angezeigt oder genehmigt werden? Viele Arbeitsverträge verlangen das für selbständige Nebentätigkeit.
4. **Wettbewerb:** Während der Anstellung gilt eine Treuepflicht; ein Produkt für Elektrobetriebe könnte als Konkurrenz zum Arbeitgeber oder zu dessen Kunden/Netzwerk gewertet werden. Gibt es ein vertragliches oder nachvertragliches Wettbewerbsverbot?
5. **Betriebsgeheimnisse und Unterlagen des Arbeitgebers:** Stammen Fotos, Regeln, Schulungsunterlagen, Kundenkontakte aus der Arbeit? Darf das Fachwissen genutzt werden? Allgemeines Berufswissen darf man mitnehmen, konkrete Unterlagen des Arbeitgebers nicht.
6. **Kunden- und Kontaktdaten:** Die geplante Direktansprache von „Kollegen“ ([[Direktansprache]]) berührt eventuell Kundenschutz oder Abwerbeverbote.
7. **Steuer und Gewerbe (Steuerberater):** Anmeldung eines Gewerbes bei Einnahmen, Kleinunternehmerregelung, Pflicht zur Anzeige beim Arbeitgeber, Versicherungsfragen. Auch Haftpflicht für falsche Ergebnisse, wenn die App Entscheidungen beeinflusst.

**Empfehlung:** Arbeitsvertrag lesen (Nebentätigkeit, Erfindungen, Wettbewerb, Verschwiegenheit) und **vor dem ersten Euro Umsatz** eine Stunde Erstberatung beim Fachanwalt für Arbeitsrecht einplanen. Die Handwerkskammer bietet oft eine kostenlose Erstberatung zu Rechtsfragen für Mitglieder, ein Anruf klärt das. Das ist günstiger als ein späterer Streit über die Rechte. Keine Unterlagen des Arbeitgebers in Repo oder Vault ablegen.

## 5. Realistischer Schutz durch Tempo, Netzwerk und Daten
Weil Recht nur gegen Kopieren hilft, ist der belastbare Schutz ein anderer:
- **Vorsprung:** Ein Wettbewerber braucht Monate für Regelrecherche, Tests und Fotos. Jede Woche früher am Markt ist Abstand.
- **Netzwerk und Vertrauen:** Die Kollegen kennen mich persönlich ([[Mein Vorteil]]). Ein anonymer Nachbauer muss dieses Vertrauen erst aufbauen.
- **Daten aus echten Fällen:** Jeder erfasste Fall mit tatsächlicher Entscheidung verbessert Trefferquote und Fotoerkennung. Diese Falldaten sind der Teil, den niemand aus den TAB-PDFs ableiten kann. Sie sind der eigentliche Schatz und gehören geschützt (Zugriff, Backups), nicht das Regelwerk allein. Datenschutz beachten: Fotos echter Anlagen ohne Adresse/Namen/Zählernummer, siehe [[Rechtliches]].
- **Pflege:** Das Regelwerk ändert sich mit jeder neuen TAB (z. B. Westnetz nach Musterwortlaut 2026). Wer es laufend aktuell hält, ist besser als jede Kopie von gestern.
- **Marke:** Der Name wird mit der Zeit der Anker, auch wenn Funktionen kopiert werden.

## 6. Maßnahmen nach Priorität
| # | Maßnahme | Wirkung | Kosten | Aufwand | Wer |
|---|---|---|---|---|---|
| 1 | **Arbeitsvertrag lesen**, Fragen aus Abschnitt 4 notieren, Erstberatung beim Anwalt/HWK | klärt, wem die Idee gehört; größter denkbarer Schaden | 0–200 € (Erstberatung, grob) | 1–2 Std. + Termin | ich |
| 2 | **Repos und Vault auf „privat“ prüfen**, Zugriffe kontrollieren | verhindert das einfachste Leck | 0 € | 10 Min. | ich |
| 3 | **Regelwerk serverseitig** (`POST /bewerte`), Demo-Build ohne echtes Regelwerk | Regelwerk verlässt den Server nicht mehr | 0 € | ca. 1 Nachtschicht + Test | Nachtschicht |
| 4 | **Name prüfen** (DENIC, DPMA-Recherche), danach ggf. Marke anmelden | Namensschutz | Recherche kostenlos, Anmeldung ca. 290 € (prüfen) | 1–2 Std. | ich |
| 5 | **NDA für Tester** (Vorlage anwaltlich prüfen) | Nachweis der Geheimhaltung | ca. 100–300 € | 1 Std. + Anwalt | ich |
| 6 | **Nutzungsbedingungen** (kein Kopieren/Scraping/Reverse Engineering) | vertragliche Grundlage, Sperrmöglichkeit | mit Impressum/Datenschutz prüfen lassen | 2 Std. + Anwalt | ich / Nachtschicht für Entwurf |
| 7 | **Login statt Zugangscode** | Konten sperren und zuordnen, Abfragen begrenzen | 0 € | 1–2 Nachtschichten | Nachtschicht |
| 8 | Pro Konto **Mengenbegrenzung** und Protokoll auf `/bewerte` | erschwert das Abtasten des Regelwerks | 0 € | klein, nach 3 und 7 | Nachtschicht |
| 9 | Falldaten: Zugriff, Backups, Datenschutzhinweis in der App | schützt den eigentlichen Wert | 0 € | klein | ich |
| 10 | Patent | **nicht** empfohlen | – | – | – |

**Sofort-Regeln bis zur Umsetzung von 3:** Demo-Artifact und App-Link nicht an Unbekannte weitergeben; Tester nur persönlich bekannte Kollegen; keine öffentliche Netlify-Adresse für die App, bevor Punkt 3 erledigt ist.

## Quellen und Grenzen
- Paragrafen aus dem Gedächtnis genannt (UrhG §§ 69a ff., 87a ff.; PatG § 1 Abs. 3; GeschGehG § 2; MarkenG; ArbnErfG). ⚖️ Alle Zitate und Kosten vor Verwendung nachprüfen.
- Technischer Befund geprüft am Code-Stand `master` (Commit „Härtung, selbst gehostete Schriften und A5-Flyer“).
