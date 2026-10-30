---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-10-30
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App („Zählerklar“)

> **Ehrlicher Rahmen:** Das ist eine Recherche-Analyse der Nachtschicht, **keine Rechtsberatung**. Was unsicher ist, steht als **⚖ Anwalt** markiert. Beträge sind Größenordnungen aus dem Gedächtnis (Stand nicht live geprüft) und vor Nutzung bei DPMA/EUIPO nachzusehen.

**Kurzfazit:** Schützbar sind vor allem der **Name** (Marke) und der **konkrete Code und die Texte** (Urheberrecht, entsteht automatisch). Die **Idee** und das **Fachwissen** selbst sind nicht schützbar, und das Regelwerk ist heute **technisch kaum geheim**, weil es im App-Bundle beim Nutzer liegt. Der wirksamste Schutz ist deshalb nicht Recht, sondern **Tempo, Netzwerk und echte Falldaten** (Abschnitt 5). Die größte rechtliche Unsicherheit ist die **Arbeitgeber-Frage** (Abschnitt 4), sie sollte vor dem Livegang geklärt werden.

## 1. Was ist in Deutschland überhaupt schützbar?
| Gegenstand | Schutz | Wirkt hier? | Kosten / Aufwand |
|---|---|---|---|
| **Idee / Konzept** („Foto → Regelwerk → Maßnahmenliste“) | **Kein** Schutz. Ideen, Methoden und Funktionen sind frei (auch nach dem Urheberrecht für Software, § 69a Abs. 2 UrhG). | Jeder darf die Idee nachbauen. | – |
| **Quellcode** | Urheberrecht für Computerprogramme (§§ 69a ff. UrhG), entsteht automatisch mit der Erstellung, keine Anmeldung. Schützt den **konkreten Ausdruck**, nicht die Funktion. | Schützt vor 1:1-Kopie, nicht vor Nachbau mit eigenem Code. Hinweis: Der Code entsteht mit KI-Hilfe, rein maschinell erzeugte Teile genießen eventuell keinen Urheberrechtsschutz, die eigene Auswahl und Bearbeitung schon. **⚖ Anwalt** (Rechtslage zu KI-Code noch im Fluss). | 0 € |
| **Texte, Gestaltung** (Landingpage, Flyer, Posts, Regeltexte) | Urheberrecht bei ausreichender Schöpfungshöhe; kurze Standardsätze eher nicht. | Teilweise. | 0 € |
| **Regelwerk als Datensammlung** (26 Regeln mit Fundstellen) | Evtl. Datenbankherstellerrecht (§§ 87a ff. UrhG) bei wesentlicher Investition; die Inhalte selbst (Normen, TAB) sind fremd bzw. öffentlich. **⚖ Anwalt**, ob das trägt. | Unsicher, schwacher Hebel. | 0 € |
| **Name „Zählerklar“** | **Marke** beim DPMA (Wortmarke). Schutz erst mit Eintragung, Widerspruchsfrist Dritter 3 Monate. Klassen laut [[ADR-0006 Produktname Zählerklar]]: 9 und 42. | Ja, der klarste Hebel. Vorher **Recherche** (DPMAregister, kostenlos) auf ähnliche Marken und Domain `zaehlerklar.de`. | Online-Anmeldung grob **290 €** (bis 3 Klassen, Schätzung), 10 Jahre Schutz; EU-Marke (EUIPO) deutlich teurer, erst bei Bedarf. Anwaltliche Recherche zusätzlich optional. |
| **Geschäftsgeheimnis** (Know-how, Regelwerk) | Geschäftsgeheimnisgesetz (GeschGehG): nur geschützt, wenn die Information **geheim** ist und **angemessene Geheimhaltungsmaßnahmen** bestehen (§ 2 Nr. 1). **Reverse Engineering eines öffentlich vertriebenen Produkts ist erlaubt** (§ 3 Abs. 1 Nr. 2), außer es ist vertraglich ausgeschlossen. | Heute **nein**, siehe Abschnitt 2. Nach Umbau und mit Verträgen eingeschränkt ja. | 0 € bis Anwaltsprüfung der Verträge |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist ausgeschlossen (§ 1 Abs. 3 PatG, § 1 Abs. 3 GebrMG); nötig wäre ein technischer Beitrag. | **Nicht empfehlenswert:** Eine Regelauswertung ist ein Geschäftsverfahren/Programm als solches, dazu Kosten im vierstelligen Bereich und Veröffentlichung der Idee. | – |

**Einordnung:** Das Fachwissen steht größtenteils in öffentlichen Quellen (TAB, BDEW-Musterwortlaut, DIN-Fundstellen). Der eigene Wert ist die **Aufbereitung** (26 Regeln, Gewichtung, Praxisfälle, Fotoerkennung). Dieser Wert ist nur durch Vorsprung zu halten, nicht durch ein Schutzrecht.

## 2. Technischer Befund: Das Regelwerk liegt im Browser
**Befund (geprüft im Code, 30.10.2026):**
- `web/src/regelwerk.ts` importiert `web/src/regeln.json` und wird von Vite ins App-Bundle gebaut (`web/src/main.ts` und `demo.ts` rufen `bewerte(...)` direkt im Browser auf, Zeilen um 267 und 281).
- `regeln.json` (ca. 14 KB) enthält **alle 26 Regeln im Klartext**: Bedingung, Maßnahme, Stufe, **Fundstelle**, Geltung, Status. Die Auslösebedingungen stecken in `ausgeloesteRegeln()` in `regelwerk.ts`.
- Die Web-App wird (geplant über Netlify) als statische Dateien ausgeliefert. **Die Absicherung mit `APP_CODE` gilt nur für die Edge Function** (`/analyse`, `/faelle`), nicht für die Dateien selbst. Wer die App-Adresse kennt, kann das Bundle laden und das gesamte Regelwerk lesen, ohne Login. Ein Konkurrent braucht dafür keine Fähigkeiten, nur den Browser (Entwicklerwerkzeuge → Quellen).
- Es werden keine Source-Maps erzeugt (`vite.config.ts` hat sie nicht eingeschaltet), das Bundle ist aber nur minifiziert, nicht verschleiert. Verschleierung wäre ohnehin kein „angemessener“ Schutz.
- Dieselbe Lage gilt für das **Demo-Artifact** auf claude.ai (privat, solange es nicht geteilt wird) und für `dist-artifact/`.

**Bewertung des Risikos:**
- *Rechtlich:* Wer die Daten frei ausliefert, kann sich kaum auf das GeschGehG berufen (nicht „geheim“, keine angemessenen Maßnahmen). Urheberrechtlich bleibt der Code geschützt, die Regelinhalte nicht.
- *Geschäftlich:* **Mittel.** Die Inhalte sind größtenteils aus öffentlichen Quellen ableitbar, das Kopieren fertiger, belegter Regeln spart einem Nachbauer aber Wochen. Solange die App nur mit 4 Testern läuft, ist das Risiko klein. Es wächst mit Reichweite (Flyer, Instagram, öffentliche Adresse).
- Nebenbefund für die Arbeitgeber-Frage: Die Fundstellen verweisen auch auf eine **Westnetz-Schulung (09/2025)**. Ob dieses Material öffentlich ist oder nur Teilnehmern gegeben wurde, ist offen. Fundstellen zu nicht öffentlichen Unterlagen im ausgelieferten Bundle sind heikel. → **⚖ Anwalt / selbst klären** (siehe Abschnitt 4).

**Lösungsskizze „Regelwerk serverseitig“:**
1. Neue Route `POST /bewerte` in der Edge Function (`supabase/functions/api/index.ts`): nimmt `Eingaben` entgegen und liefert `{ ergebnis, regeln: [{id, name, massnahme, stufe, fundstelle}], offen: [...], hinweise: [...] }`. Nur die **für diesen Fall zutreffenden** Regeln werden zurückgegeben, nie die ganze Liste.
2. `regelwerk.ts` und `regeln.json` ziehen aus `web/src/` in die Funktion (`supabase/functions/api/`), laufen dort und fallen aus dem Browser-Bundle. Die Tests laufen weiter (Deno bzw. gemeinsamer Test-Lauf).
3. Die App ruft `/bewerte` statt `bewerte()` auf. Offline gibt es nur noch „Ergebnis folgt, sobald Netz da ist“. Der Fall wird mit den Eingaben lokal gespeichert und nachgesendet (der Mechanismus existiert bereits für Funklöcher).
4. Der Demo-Build bekommt eine feste Beispielantwort ohne Regelwerk.
5. Wichtig: `/bewerte` bleibt hinter dem Zugangscode und braucht ein **Rate-Limit**. Ohne beides kann jeder die Regeln durch systematisches Abfragen herauslesen (26 Regeln lassen sich mit einigen hundert Anfragen rekonstruieren). Das hebt die Hürde deutlich, ist aber **kein absoluter Schutz**.
6. Nachteile: Offline-Betrieb entfällt (im Schaltschrank oft schlechter Empfang), etwas mehr Wartezeit, mehr Last auf der kostenlosen Supabase-Funktion, Tests müssen umgebaut werden. Der Offline-Modus steht ohnehin erst „nach Go“ auf der Liste, der Konflikt ist also gering.

**Empfehlung zur Reihenfolge:** Das Auslagern lohnt vor dem **öffentlichen** Livegang (Netlify, Flyer, Instagram), nicht vor den ersten Gesprächen. Für die 4 Tester mit Zugangscode reicht der jetzige Stand, wenn die App-Adresse nicht öffentlich beworben wird. Bis dahin: Adresse nicht in Flyer, Landingpage oder Instagram verlinken (die Landingpage verlinkt heute nur die Warteliste).

## 3. Verträge und Zugang
- **NDA für Tester/Kollegen** (⚖ Anwalt prüft oder Vorlage der Handwerkskammer/IHK nutzen): beidseitig oder einseitig, kurz (1–2 Seiten), mit Zweck „Test der App“, Verbot der Weitergabe des Zugangs, Verbot der Vervielfältigung der Regeltexte. Ohne NDA zählt eine mündliche Weitergabe nicht als „angemessene Geheimhaltungsmaßnahme“. Realistisch: ein NDA schreckt Gutwillige ab und hält Böswillige nicht auf, er hilft vor allem als Nachweis. Für den Gesprächs-Test genügt eine kurze schriftliche Nutzungsvereinbarung per WhatsApp/E-Mail.
- **Nutzungsbedingungen (AGB) für die App:** kein Kopieren, kein Auslesen/Scrapen, kein Reverse Engineering (soweit gesetzlich zulässig; § 69e UrhG erlaubt Dekompilieren in engen Grenzen zur Interoperabilität, weitere Verbote sind eingeschränkt wirksam), keine Weitergabe des Zugangs, Haftungshinweis „ersetzt keine Prüfung durch den Errichter“. ⚖ Anwalt (AGB-Recht, B2B).
- **Zugang nur mit Login:** Heute ein gemeinsamer `APP_CODE` für alle (Einzelnutzer-Modell, offen als „Login statt Zugangscode“ unter *Irgendwann*). Ein gemeinsamer Code lässt sich weitergeben und nicht einzelnen Personen zuordnen. **Vor Kollegen-Test mit mehr als 4 Personen:** je Tester eigener Code oder Login (Supabase Auth), damit Weitergabe zurückverfolgbar ist.
- **Impressum/Datenschutz** bleiben Voraussetzung für den Livegang → [[Rechtliches]].

## 4. Arbeitgeber-Frage (offen, wichtig) – ⚖ Anwalt/Steuerberater
*Annahme der Nachtschicht:* Der Gründer arbeitet im Elektrohandwerk, möglicherweise angestellt, und hat das Fachwissen im Beruf erworben. Ob und wo ein Anstellungsverhältnis besteht, steht nicht im Vault.

Offene Fragen, die **nur mit dem Arbeitsvertrag** und einer Fachperson zu beantworten sind:
1. **Nebentätigkeit:** Verlangt der Vertrag Anzeige oder Genehmigung? Gilt das auch für unentgeltliche Vorarbeit (Entwicklung) und für den Verkauf an Dritte? Ein Verstoß kann abmahnbar sein.
2. **Wettbewerbsverbot:** Während des Arbeitsverhältnisses gilt ein Wettbewerbsverbot (Treuepflicht, analog § 60 HGB). Die Zielgruppe der App sind **Elektrobetriebe**. Ist der Arbeitgeber selbst Zielgruppe, Mitbewerber oder Kunde? Dann besonders sauber vorab klären.
3. **Rechte am Code:** Programme, die ein Arbeitnehmer **in Wahrnehmung seiner Aufgaben oder nach Anweisung** schafft, gehören dem Arbeitgeber (§ 69b UrhG). Wird in Freizeit, mit eigenen Mitteln und ohne Bezug zur Arbeitsaufgabe entwickelt, bleibt das Recht grundsätzlich beim Gründer. Das Risiko steigt, wenn Arbeitszeit, Firmenrechner, Firmenunterlagen oder Firmenkontakte im Spiel sind.
4. **Arbeitnehmererfindung:** Das Arbeitnehmererfindungsgesetz betrifft patent- oder gebrauchsmusterfähige Erfindungen. Bei reiner Software ist es nach der Einschätzung dieser Analyse eher **nicht** einschlägig (Abschnitt 1: kaum patentierbar), das ist aber genau die Art Frage für den Anwalt.
5. **Betriebsgeheimnisse des Arbeitgebers:** Stammen Regeln, Preise, Kundendaten, Kalkulationen oder Schulungsunterlagen (z. B. die Westnetz-Schulung 09/2025) vom Arbeitgeber oder aus Kursen, die er bezahlt hat? Dann dürfen sie nicht ohne Weiteres in ein Produkt fließen. Abgrenzung: **allgemeines, öffentlich zugängliches Fachwissen** darf jeder nutzen, **vertrauliche Betriebsinterna** nicht.
6. **Fotos echter Zählerschränke:** Fotos aus Kundenanlagen des Arbeitgebers (Adresse, Namen, Zählernummer) sind Kundendaten und gehören nicht in Tests, Marketing oder Trainingsdaten. Eigene Anlagen oder ausdrückliche Einwilligung. Der Vault-Grundsatz „keine Kundendaten“ gilt hier doppelt.

**Konkreter Vorschlag:** Arbeitsvertrag und Betriebsvereinbarungen/Handbuch lesen (Nebentätigkeit, Wettbewerb, Geheimhaltung, Erfindungen), dann **ein Beratungsgespräch** (Fachanwalt für Arbeitsrecht oder IP, oft als Erstberatung zum Festpreis; Größenordnung 150–300 €, Schätzung) vor dem öffentlichen Livegang. Ist der Arbeitgeber freundlich gesinnt, kann eine **schriftliche Freigabe** („keine Einwände gegen die Nebentätigkeit, keine Ansprüche an der App“) die sauberste Lösung sein. Ob man das anspricht, ist eine taktische Entscheidung für den Gründer.

## 5. Realistischer Schutz: Tempo, Netzwerk, Daten
Da Recht und Technik die Idee nur begrenzt schützen, kommen die Hebel aus [[Mein Vorteil]]:
- **Vorsprung:** Ein Nachbauer braucht Fachwissen (Regeln, Westnetz-Praxis) **und** Zugang zu Elektrobetrieben. Beides hat der Gründer, ein reiner Softwareanbieter nicht. Dieser Vorsprung hält nur, solange er genutzt wird: **erst Gespräche, dann Kunden**, nicht noch mehr Absicherung.
- **Netzwerk:** Die ersten 15 Kollegen, Innung, Handwerkskammer ([[Direktansprache]]) sind schwer zu kopieren und der eigentliche Burggraben.
- **Echte Falldaten:** Trefferquote, Entscheidungen, Fotos aus 20+ realen Schränken (korrekt anonymisiert) sind ein Datensatz, den kein Nachbauer hat. Er verbessert Regeln und Fotoerkennung. Damit wird das offene Regelwerk weniger wichtig.
- **Marke und Domain** früh sichern, damit niemand anders den Namen besetzt.
- **Laufende Pflege:** Neue TAB-Fassungen (z. B. Westnetz nach BDEW-Muster 2026) schnell einarbeiten, ein statischer Klon veraltet.
- **Nicht übertreiben:** Ein Produkt, das niemand kauft, braucht keinen Schutz. Schutz-Aufgaben stehen **nach** der Validierung ([[ADR-0001 Zählerschrank-App als Validierungswerkzeug]], [[Ideen-System]] Regel 1), außer den billigen und den rechtlich zwingenden Punkten unten.

## 6. Priorisierte Maßnahmen
| Prio | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | **Arbeitsvertrag prüfen**, Nebentätigkeit/Wettbewerb/Geheimhaltung klären, Erstberatung ⚖ | ~150–300 € (Schätzung) | 1–2 Std. + Termin | **vor öffentlichem Livegang**, am besten vor Flyer-Druck |
| 2 | Keine Kunden-/Arbeitgeber-Fotos und -Unterlagen verwenden; Quelle „Westnetz-Schulung“ auf Öffentlichkeit prüfen | 0 € | 30 Min. | sofort |
| 3 | App-Adresse **nicht** öffentlich bewerben, solange das Regelwerk im Bundle liegt; Tester bekommen Adresse und Code persönlich | 0 € | 0 | sofort |
| 4 | Kurze **Tester-Vereinbarung/NDA** (Vorlage, ggf. anwaltlich gegengelesen) | 0 € (+ ggf. Anwalt) | 1 Std. | vor den ersten 4 Testern |
| 5 | **Domain** `zaehlerklar.de` per DENIC prüfen und sichern; DPMA-**Recherche** und danach Wortmarke anmelden | Domain wenige €/Jahr; Marke grob 290 € | 1–2 Std. | Domain jetzt; Marke nach positiver Recherche und Go |
| 6 | **Regelwerk serverseitig** (`/bewerte`), Rate-Limit | 0 € (Entwicklungszeit) | mittel (1–2 Nächte) | vor öffentlichem Livegang |
| 7 | **Je Tester eigener Zugangscode/Login**, Zugriff widerrufbar | 0 € | klein bis mittel | vor Test mit > 4 Personen |
| 8 | **Nutzungsbedingungen** (kein Kopieren/Scrapen/Weitergabe) ⚖ | Generator oder Anwalt | 2–4 Std. | mit Impressum/Datenschutz |
| 9 | Urheberrechtsvermerk „© 2026 …“ in App/Landingpage; Quellcode privat halten (Repo nicht öffentlich) | 0 € | 15 Min. | sofort |
| 10 | Patent/Gebrauchsmuster | – | – | **nicht verfolgen** |

## Offen / Annahmen
- Ob das GitHub-Repo `zaehlerschrank-check` privat ist, wurde hier nicht geprüft und sollte kontrolliert werden: ein öffentliches Repo würde Regelwerk und Code veröffentlichen.
- Das Anstellungsverhältnis ist **Annahme**, siehe Abschnitt 4.
- Alle Rechtsaussagen sind nicht anwaltlich geprüft.

Zurück zu [[Zählerschrank-Check]] · [[Rechtliches]] · [[App & Technik]]
