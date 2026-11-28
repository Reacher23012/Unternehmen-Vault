---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-11-28
status: entwurf – keine Rechtsberatung, juristische Punkte vom Anwalt prüfen lassen
---
# Schutz von Idee und App

Analyse der Nachtschicht vom 28.11.2026. **Keine Rechtsberatung.** Wo unsicher, steht „⚖️ Anwalt“. Bezug: [[Zählerschrank-Check]], [[Mein Vorteil]], [[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]].

**Kurzfassung:** Die *Idee* ist nicht schützbar. Schützbar sind Code, Name und – mit Aufwand – das Regelwerk als Geschäftsgeheimnis. Der größte konkrete Hebel ist technisch: Das Regelwerk liegt heute komplett im Browser. Der eigentliche Schutz ist aber **Tempo + Netzwerk + echte Falldaten**, nicht Paragrafen.

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Was es heißt | Kosten / Aufwand |
|---|---|---|---|
| **Idee** („Foto → Zählerschrank-Einschätzung“) | keiner | Ideen sind frei. Jeder darf dasselbe bauen. | – |
| **Quellcode** | Urheberrecht (§ 69a UrhG), entsteht automatisch | Schützt vor 1:1-Kopie des Codes, nicht vor Nachbau mit eigenem Code. | 0 €; Entstehung dokumentieren (Git-Verlauf reicht als Nachweis) |
| **Texte/Regelsammlung** (`regeln.json`) | Urheberrecht nur bei eigener schöpferischer Formulierung; ggf. Datenbankschutz (§ 87a UrhG) bei wesentlicher Investition | Die *Fundstellen* (BDEW-Musterwortlaut, Westnetz-Schulung) sind öffentlich; geschützt wäre allenfalls Auswahl, Anordnung, eigene Formulierung. ⚖️ Anwalt | 0 € |
| **Name „Zählerklar“** | Marke (DPMA), sonst nur schwacher Schutz durch Benutzung | Eintragung schützt Name/Logo vor Nachahmern; vorher Recherche nötig (bereits offen: [[ADR-0006 Produktname Zählerklar]]) | DPMA-Anmeldung ca. 290 € (bis 3 Klassen, Stand der Gebührenordnung – vor Anmeldung prüfen), Recherche selbst kostenlos, Anwalt optional |
| **Regelwerk / Know-how** | Geschäftsgeheimnis (GeschGehG) | Nur geschützt, wenn es **geheim** ist, **wirtschaftlichen Wert** hat und **angemessene Geheimhaltungsmaßnahmen** bestehen (§ 2 Nr. 1 GeschGehG). Liegt es offen im Browser und ohne Vertrag bei Testern, fehlt der dritte Punkt → Schutz kann entfallen. | Maßnahmen siehe 2 und 3 |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist nicht patentierbar; nur mit „technischem Beitrag“, hier unwahrscheinlich | Teuer, langsam, geringer Nutzen. **Nicht empfohlen.** ⚖️ Patentanwalt nur, falls doch Interesse | Patent ab ca. 5.000 €+ mit Anwalt |

Wichtig: Auch ein Gesetz verhindert Nachbau nicht; es gibt nur Ansprüche im Streitfall (Unterlassung, Schadensersatz), die Geld und Zeit kosten. Für ein Ein-Mann-Projekt ist **Vorbeugen durch Technik und Tempo** wirksamer.

## 2. Technischer Befund: Das Regelwerk liegt im Browser
**Geprüft im Code (Stand `master`):**
- `web/src/regelwerk.ts` importiert `regeln.json` (ca. 14 KB: Regel-ID, Name, Bedingung, Maßnahme, Fundstelle, Geltung) und enthält zusätzlich die **Auswertungslogik** (Formeln aus dem Excel). `main.ts` und `demo.ts` importieren beides → Vite bündelt alles ins Bundle.
- Folge: Jeder, der die App öffnet, kann im Browser (Entwicklerwerkzeuge → Quellen/Netzwerk) das **gesamte Regelwerk R01–R26 samt Logik lesen und kopieren**. Minifizierung ist kein Schutz. Das gilt auch für das Demo-Artifact auf claude.ai und jede veröffentlichte Version.
- Bisher kein Login, nur Zugangscode für das Backend; die statische App selbst wäre nach Netlify-Deployment **öffentlich abrufbar**.

**Bewertung des Risikos:**
- *Inhaltlich begrenzt:* Die Fundstellen sind öffentlich (BDEW, Netzbetreiber). Der Wert liegt in der Auswahl, Zuordnung und der Prüflogik – die ist aber 14 KB lesbarer Text, in einer Stunde kopiert.
- *Rechtlich relevant:* Wer das Regelwerk ungeschützt ausliefert, kann sich später schwer auf „angemessene Geheimhaltungsmaßnahmen“ berufen (GeschGehG). ⚖️ Anwalt
- *Praktisch:* Ein Konkurrent braucht ohnehin Fotoerkennung, Backend und Zugang zu Kollegen. Das Risiko ist **mittel**, steigt aber mit jedem Tester/Kunden.

**Lösungsskizze „Regelwerk serverseitig“:**
1. `regelwerk.ts` + `regeln.json` in die Edge Function (`supabase/functions/api`) bzw. ein gemeinsames Modul unter `supabase/` verlagern.
2. Neue Route `POST /bewerte`: Eingaben (Schrankfelder, Vorhaben) → Ergebnis (Ampel, Maßnahmen, Fundstelle, „Vor Ort klären“) – **nur das Ergebnis des konkreten Falls** geht zurück, nie die Regelliste.
3. App ruft `/bewerte` statt lokal `bewerte()`; Regel-Texte kommen nur für getroffene Regeln.
4. Zugriff nur mit Login (siehe Abschnitt 3) und Rate-Limit je Konto, damit niemand das Regelwerk per Massenabfrage „abtastet“ (Abtasten bleibt mit endlosen Eingabekombinationen möglich, wird aber teuer).
5. Folgen: Offline-Betrieb (bisher „erst nach Go“) und Demo-Modus müssen angepasst werden; Tests müssen die Logik gegen das neue Modul laufen lassen; Latenz +1 Aufruf. Aufwand grob 1–2 Tage.
6. Ehrliche Grenze: Auch dann sieht ein zahlender Nutzer Ergebnisse. Wer systematisch viele Fälle abfragt, kann das Regelwerk rekonstruieren. Schutz = Aufwand erhöhen, nicht unmöglich machen.

## 3. Verträge und Zugang
- **NDA für Tester/Kollegen** (vor dem Mittesten): kurze Vereinbarung, dass Regelwerk, Ergebnisse und App-Interna vertraulich sind, nur für Test, keine Weitergabe. Vorlage vom Anwalt oder aus anerkannter Mustersammlung; ⚖️ Anwalt prüfen lassen. Kosten: 0 € (Muster) bis ca. 200–500 € (Prüfung/Anpassung). Wichtig: Zusage der Tester dokumentieren (E-Mail/WhatsApp reicht als Nachweis, besser unterschrieben).
- **Nutzungsbedingungen (AGB):** kein Kopieren, Auslesen, automatisiertes Abfragen, kein Reverse Engineering (soweit nach § 69e UrhG überhaupt abdingbar – ⚖️ Anwalt), keine Weitergabe von Zugangsdaten. Gehört zur Rechtsprüfung [[Rechtliches]].
- **Login statt gemeinsamem Zugangscode:** ein Code, der an 4 Tester geht, ist kein Zugang je Person; Weitergabe nicht nachvollziehbar. Siehe bestehende Aufgabe „Login statt Zugangscode“ (Irgendwann → wird für Regelwerk-Schutz relevanter).
- **Kennzeichnung:** Urheber- und Geheimhaltungsvermerk in App-Fuß und Ergebnis-Export („Vertraulich, © …“). Kostet nichts, hilft bei der Beweislage.

## 4. Offene Frage: Wem gehört die Idee? (Arbeitgeber)
Das ist **die wichtigste juristische Frage** und nicht per Notiz lösbar. ⚖️ **Anwalt (Arbeitsrecht) / Steuerberater klären lassen**, bevor Geld oder Kunden im Spiel sind:
- **Arbeitnehmererfindung / Urheberrecht im Arbeitsverhältnis:** Für Software, die ein Arbeitnehmer *in Erfüllung seiner Pflichten* schafft, gehen die Nutzungsrechte regelmäßig an den Arbeitgeber (§ 69b UrhG). Entsteht die App in der Freizeit, mit eigenen Mitteln, ohne Betriebsmittel/-geheimnisse, ist das meist anders – aber der Einzelfall (Arbeitsvertrag, Tätigkeit, genutztes Wissen aus dem Betrieb) entscheidet.
- **Betriebsgeheimnisse/Unterlagen:** Wurde Material des Arbeitgebers genutzt (interne Schulungen, Unterlagen, Kundendaten)? Das Regelwerk stützt sich auf öffentliche BDEW-Texte und die Westnetz-Schulung; **Herkunft der Schulung klären** (öffentlich/Teilnahmebedingungen/intern?).
- **Nebentätigkeit und Wettbewerbsverbot:** Viele Arbeitsverträge verlangen Anzeige/Genehmigung von Nebentätigkeiten; während des Arbeitsverhältnisses gilt ein Wettbewerbsverbot (§ 60 HGB analog). Ein Produkt, das Elektrobetrieben (ggf. Wettbewerbern des Arbeitgebers) verkauft wird, ist heikel.
- **Zu klären:** Arbeitsvertrag lesen (Nebentätigkeit, Erfindungen/Software, Verschwiegenheit, Wettbewerb), ggf. Arbeitgeber schriftlich fragen/Freigabe holen. Ich weiß nicht, wie der Vertrag lautet – deshalb nur Fragenliste, keine Aussage.
- Steuerberater: Gewerbeanmeldung/Kleinunternehmer/Nebengewerbe (nicht Schutzthema, aber gleicher Termin).

## 5. Realistischer Schutz: Tempo, Netzwerk, Daten
Ehrlich: Gegen einen entschlossenen Nachbauer schützt kein Papier. Was wirklich trägt:
- **Vorsprung:** Der Wert liegt weniger im Regelwerk als in dessen **Pflege** (neue TAB, Netzbetreiber-Abweichungen). Wer es einmal kopiert, hat es morgen veraltet. → Laufend aktualisieren, Aktualisierungsdatum sichtbar machen.
- **Netzwerk:** Zugang zu Kollegen und Betrieben im Westnetz-Gebiet ([[Mein Vorteil]]) ist der Kernvorteil – Direktansprache ([[ADR-0005 Direktansprache vor Instagram]]) ausbauen, Innung/HWK.
- **Daten aus echten Fällen:** Jeder gespeicherte Fall mit tatsächlicher Entscheidung ([[App & Technik]]) verbessert Trefferquote und Fotoerkennung; **das** ist nicht kopierbar. Deshalb auch für Validierung wichtiger als Schutz (20 reale Schränke!).
- **Marke/Vertrauen:** Wer als „der Zählerklar-Elektriker-Kollege“ bekannt ist, wird kaum durch einen anonymen Klon ersetzt.
- **Reihenfolge:** Schutzmaßnahmen dürfen die Validierung nicht verdrängen ([[Ideen-System]]: erst verkaufen, dann bauen). Pflicht vor dem Mittesten durch fremde Tester: NDA + Arbeitgeber-Frage. Der Rest erst nach Go.

## 6. Maßnahmenliste (priorisiert)
| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | **Arbeitgeber-Frage klären** (Arbeitsvertrag lesen, Anwalt/Freigabe) | 0 € bis ca. 150–300 € Erstberatung | 1–2 h + Termin | **vor** Mittesten/Verkauf |
| 2 | **NDA für Tester** (Muster, 1 Seite) unterschreiben lassen | 0–500 € | 1 h | vor dem Mittesten |
| 3 | Vertraulichkeits-/Urheberhinweis in App und Export | 0 € | 0,5 h | mit Namensumstellung |
| 4 | **Name prüfen** (DENIC, DPMA-Recherche), danach Markenanmeldung | Recherche 0 €, Anmeldung ca. 290 € | 2 h | bereits offen; Anmeldung erst nach Go |
| 5 | **Regelwerk serverseitig** (`/bewerte`), App bekommt nur Ergebnis | 0 € | 1–2 Tage | vor öffentlichem Hosting (Netlify) bzw. spätestens mit Login |
| 6 | **Login pro Nutzer** statt Gruppen-Zugangscode + Rate-Limit | 0 € (Supabase Auth) | 1–2 Tage | vor Mittesten mit mehreren Testern |
| 7 | Nutzungsbedingungen (kein Auslesen/Kopieren) im Zug der Rechtsprüfung | in [[Rechtliches]] enthalten | – | vor öffentlichem Start |
| 8 | Regelwerk-Pflege-Rhythmus + Änderungsdatum sichtbar | 0 € | laufend | nach Go |
| – | Patent | ab 5.000 € | – | **nicht empfohlen** |

Daraus entstandene Aufgaben: siehe [[Aufgaben]] unter „Als Nächstes“.

## Ehrlich offen
- Ich habe keine Kenntnis vom Arbeitsvertrag und von der Herkunft der Westnetz-Schulung.
- Gebühren und Rechtslage sind Stand meiner Kenntnis; vor Entscheidung prüfen.
- Ob das Regelwerk überhaupt als Geschäftsgeheimnis trägt, ist wegen öffentlicher Fundstellen fraglich. ⚖️ Anwalt
