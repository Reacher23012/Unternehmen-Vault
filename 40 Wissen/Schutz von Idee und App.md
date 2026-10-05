---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-10-05
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App („Zählerklar“)

> **Wichtig:** Das ist eine Analyse aus allgemeinem Wissen, **keine Rechtsberatung**. Was unsicher ist, steht als **⚖ Anwalt prüfen** da. Kosten sind Größenordnungen, vor Ausgabe aktuell nachsehen. Zugehörig: [[Rechtliches]], [[App & Technik]], [[Mein Vorteil]], [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]].

## Kurzfassung
1. **Die Idee selbst ist nicht schützbar.** „Foto vom Zählerschrank → Maßnahmenliste“ kann jeder nachbauen. Schützbar sind nur konkrete Ausdrucksformen (Code, Texte, Name) und **geheim gehaltenes Know-how**.
2. Der eigentliche Wert ist das **Regelwerk R01–R26 mit Fundstellen** (und später die Falldaten). Genau das liegt heute **vollständig im Browser jedes Nutzers** (Abschnitt 2). Das ist die größte, billig behebbare Lücke.
3. Der beste Schutz ist realistisch **Tempo, Netzwerk und echte Falldaten**, nicht Recht (Abschnitt 5).
4. **Offene Frage mit echtem Risiko: Arbeitgeber** (Abschnitt 4). Vor dem Livegang klären.

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz? | Wie / Kosten (grob) | Einschätzung |
|---|---|---|---|
| **Die Idee / das Konzept** | Nein | – | Freie Nachahmung erlaubt. Kein Aufwand wert. |
| **Quellcode, App-Texte, Grafiken** | Ja, **Urheberrecht** (§ 69a ff. UrhG für Software) | entsteht automatisch, 0 € | Schützt gegen 1:1-Kopie, **nicht** gegen Nachbau mit gleicher Funktion. Beweisbarkeit: Git-Historie, Datum der Commits sichern. |
| **Name „Zählerklar“ / Logo** | Ja, **Marke** (DPMA) | Anmeldung online ca. 290 € für bis zu 3 Klassen (Gebühr vor Anmeldung prüfen), Schutz 10 Jahre | Sinnvoll **nach** Namensprüfung ([[ADR-0006 Produktname Zählerklar]]) und erst wenn der Name bleibt. Klassen 9, 42 (ggf. 35, 41). Recherche vorher im DPMAregister, Domain `zaehlerklar.de` sichern. Beschreibende Namen werden abgelehnt. ⚖ Anwalt prüfen, falls ähnliche Marken auftauchen. |
| **Regelwerk, Fundstellen-Zusammenstellung, Erkennungs-Prompts, Falldaten** | Ja, als **Geschäftsgeheimnis** (GeschGehG) | 0 €, aber nur mit **„angemessenen Geheimhaltungsmaßnahmen“** (§ 2 Nr. 1 b GeschGehG) | Schutz entsteht nur, wenn ich es **wirklich geheim halte** (Zugriff beschränkt, NDA, Zugriffskontrolle). Liegt es offen im Browser, ist es kaum noch als Geheimnis haltbar. Hinweis: Die zugrunde liegenden TAB/BDEW-Texte sind öffentlich; geheimhaltbar ist nur **meine Auswahl, Verknüpfung, Stufung und Praxisbewertung**. |
| **Datenbank (Falldaten)** | evtl. Datenbankherstellerrecht (§ 87a UrhG) | automatisch | Erst relevant bei großer, investitionsintensiver Sammlung. Heute nichts. |
| **Patent / Gebrauchsmuster** | Praktisch nein | Patent ab ca. 4.000–10.000 € inkl. Anwalt, Jahre Dauer | „Computerprogramme als solche“ sind nicht patentfähig, nur mit technischem Beitrag. Ein Regelwerk plus Bilderkennung per API ist dafür sehr unwahrscheinlich. **Nicht empfohlen.** ⚖ falls jemand das Gegenteil behauptet. |
| **Wettbewerbsrecht (UWG)** | Teilweise | – | Nachahmung nur unlauter bei Herkunftstäuschung oder unredlicher Kenntniserlangung. Schwacher Schutz. |

## 2. Technischer Befund: Das Regelwerk liegt im Browser
**Befund (am Code geprüft, 05.10.2026):**
- `web/src/regeln.json` (ca. 14 KB: Regel-ID, Name, Bedingung, Maßnahme, Stufe, **Fundstelle**, Geltung, Status) wird von `web/src/regelwerk.ts` per `import` eingebunden. Vite bündelt sie ins JavaScript-Bundle.
- Die **Logik** (`ausgeloesteRegeln`: 26 Bedingungen, `ergebnisAus`, `messkonzept`, `schlimmsterFall`) steht ebenfalls im Bundle.
- Heißt: Wer die App öffnet (auch ohne Login, sobald sie bei Netlify öffentlich ist), kann in den Entwicklertools **das komplette Regelwerk samt Fundstellen** lesen und kopieren. Minifizierung ist kein Schutz. Der Zugangscode schützt nur die Edge Function (Fotoanalyse, Fälle), **nicht** die statischen Dateien.
- Der Fachwert (Fundstellen-Recherche, Stufung, offene Punkte) ist damit in Minuten kopierbar. Auch das Geschäftsgeheimnis-Argument fällt dann schwach aus (keine angemessene Geheimhaltung, wenn es öffentlich ausgeliefert wird).

**Risikobewertung:**
- Eintrittswahrscheinlichkeit: heute **niedrig** (kein öffentliches Hosting, 4 Tester), nach Livegang **mittel**: Zielgruppe ist klein und fachnah, ein Wettbewerber oder Softwarehaus braucht aber nur einen Browser.
- Schaden: **hoch** für den Vorsprung (Kriterium „Vorsprung 5“ im [[Zählerschrank-Check]]-Score beruht genau darauf). Die Regeln lassen sich zwar auch aus TAB und Schulungen ableiten, aber die Arbeit der Bündelung wäre geschenkt.
- Gegenargument ehrlich: Das Regelwerk ist ohnehin aus **öffentlichen** TAB-Quellen abgeleitet. Der Vorsprung ist Zeit und Bündelung, nicht ein echtes Geheimnis. Serverseitig machen hebt die Hürde vom „Kopieren in 5 Minuten“ auf „Nachbauen in Wochen“ – mehr nicht. Wer viele Fälle durch die API schickt, kann das Verhalten trotzdem abtasten (siehe Abschnitt 3, Rate-Limit).

**Lösungsskizze: Regelauswertung in die Edge Function** (siehe Aufgabe „Regelwerk serverseitig“ in [[Aufgaben]]):
1. `regelwerk.ts` + `regeln.json` wandern von `web/src/` nach `supabase/functions/api/` (oder gemeinsames Modul, das **nur** die Funktion importiert). Die App enthält sie nicht mehr.
2. Neue Route `POST /bewerten`: Body = `Eingaben`, Antwort = `Bewertung` (Ergebnis, ausgelöste Regeln mit Maßnahme + Fundstelle, offene Punkte, Messkonzept). Header `x-app-code` wie bisher.
3. App ruft `/bewerten` statt lokal `bewerte()`. Die App bekommt nur **Ergebnis + Fundstelle der ausgelösten Regeln**, nie die Bedingungen oder nicht ausgelöste Regeln.
4. Offline: Der Check braucht dann Netz (Funkloch auf der Baustelle). Mitigation: Eingaben lokal puffern und Bewertung nachholen, wie schon bei den Fällen. Bewusste Abwägung, im PR sichtbar machen.
5. Tests (`regelwerk.test.ts`, 13 Tests) laufen weiter gegen das Modul; zusätzlich ein Test der Route. Das Demo-Artifact (`build:demo`) braucht die Regeln lokal, **die Demo enthält sie also weiter**: nur gekürzte Beispieldaten zeigen, nicht das echte Regelwerk (Entscheidung nötig, siehe Aufgabe).
6. Restrisiko dokumentieren: Abtasten über die API bleibt möglich → Rate-Limit pro Zugangscode/IP (Supabase) und Login statt Einheitscode ([[Aufgaben]], „Login statt Zugangscode“).

Aufwand: ca. 0,5–1 Tag, rein Code, kein neues Konto. **Kosten 0 €.**

## 3. Verträge und Zugang
| Maßnahme | Zweck | Anmerkung |
|---|---|---|
| **NDA** für Tester/Kollegen | Beweis „angemessener Geheimhaltung“ nach GeschGehG; verbietet Weitergabe von Regelwerk, Ausgaben, Zugangscode | Einseitige Kurzfassung 1 Seite genügt zum Start. Vorlage vom Anwalt oder Verband prüfen lassen ⚖. Kollegen unterschreiben ungern, daher mündlich **und** per Nachricht bestätigen lassen. |
| **Nutzungsbedingungen (AGB) der App** | kein Kopieren, kein Reverse Engineering, kein Scraping, kein Weitergeben des Zugangs; Haftung begrenzen („ersetzt keine Prüfung durch Errichter“) | Reverse-Engineering-Verbot ist bei Software nur eingeschränkt wirksam (§ 69e UrhG, Dekompilierung zur Interoperabilität erlaubt), Vertrag nützt trotzdem für Kündigung/Abmahnung. ⚖ AGB-Recht ist heikel (B2B vs. Verbraucher), Texte prüfen lassen. |
| **Zugang nur mit Login** | Nutzer identifizierbar, einzeln sperrbar, Missbrauch nachweisbar | Heute ein gemeinsamer `APP_CODE`; für Kollegen-Test besser einzelne Codes oder Supabase Auth. Steht schon unter „Irgendwann“. |
| **Rate-Limit** | Abtasten des Regelwerks über die API erschweren | Auch Schutz vor Kostenmissbrauch beim Claude-Schlüssel. |
| **Keine Regeln/Prompts in öffentlichem Repo** | Geheimnis wahren | GitHub-Repo `zaehlerschrank-check` **privat lassen** (prüfen). Landingpage nennt keine Regeldetails. |

## 4. Arbeitgeber-Frage (offen, ⚖ Anwalt/Steuerberater)
**Frage:** Wem gehört die Idee/das Regelwerk, wenn sie während einer Anstellung im Elektrohandwerk entstanden ist? **Ich kenne die Anstellungs- und Vertragslage nicht**, deshalb nur Fragen und Prüfpunkte:
- **Arbeitsvertrag lesen:** Klauseln zu Nebentätigkeit (Anzeige-/Genehmigungspflicht), Wettbewerbsverbot, Verschwiegenheit, „Erfindungen/Ideen gehören dem Arbeitgeber“.
- **Wettbewerb:** Während des Arbeitsverhältnisses gilt ein Wettbewerbsverbot (§ 60 HGB analog für Arbeitnehmer allgemein anerkannt). Ist ein Werkzeug für Elektrobetriebe Wettbewerb zum Arbeitgeber, oder Zulieferung an Branche? ⚖
- **Arbeitnehmererfindung:** Das ArbnErfG gilt für patent-/gebrauchsmusterfähige Erfindungen (bei Software kaum). Für **Software/Urheberrecht** gilt § 69b UrhG: Wurde der Code **in Erfüllung der Arbeitspflichten** oder nach Weisung geschrieben, stehen die Nutzungsrechte dem Arbeitgeber zu. Privat in der Freizeit, mit eigenem Gerät, ohne Arbeitsbezug ist günstiger, aber nicht sicher, wenn **Wissen/Material aus dem Betrieb** (Schulungsunterlagen, Fotos von Kundenschränken, interne Checklisten) einfließt.
- **Betriebs-/Kundendaten:** Fotos echter Schränke aus dem Arbeitsverhältnis, Kundenadressen und Zählernummern dürfen weder in die App noch ins Marketing (auch Datenschutz).
- **Konkrete Schritte vor Livegang:** (1) Vertrag nachlesen, (2) Nebentätigkeit ggf. schriftlich anzeigen/genehmigen lassen, (3) Anwalt (Arbeits-/IT-Recht) eine Stunde, (4) Steuerberater: Gewerbeanmeldung, Einnahmen aus Nebentätigkeit, Kleinunternehmerregelung. Gespräche mit Kollegen/Arbeitgeber erst führen, wenn die Lage klar ist, falls der Arbeitgeber Konkurrent sein könnte.

## 5. Realistischer Schutz: Tempo und Nähe
Rechtlicher Schutz ist hier schwach; wirksam ist, was ein Nachahmer nicht schnell kopieren kann:
- **Vorsprung:** Erster mit funktionierendem Produkt im Westnetz-Gebiet. Regelwerk pflegen (Westnetz-TAB nach BDEW-Musterwortlaut 2026 beobachten, [[Aufgaben]]).
- **Netzwerk:** Kollegen, Innung, Großhändler ([[Direktansprache]]). Vertrauen im Handwerk ist schwer zu kopieren.
- **Daten aus echten Fällen:** 20+ Fälle mit tatsächlicher Entscheidung verbessern Regeln und Erkennung. Das ist der eigentliche Burggraben, nicht der Code.
- **Marke und Domain** früh sichern, damit niemand den Namen besetzt.
- **Laufende Aktualisierung** der Regeln als Abo-Argument: Eine einmal kopierte Regelliste veraltet.

## 6. Priorisierte Maßnahmenliste
| # | Maßnahme | Kosten | Aufwand | Wann | Nutzen |
|---|---|---|---|---|---|
| 1 | **Arbeitsvertrag lesen**, Nebentätigkeit/Wettbewerb klären, Anwalt-Termin | ca. 150–300 € Erstberatung | 1–2 Std. + Termin | **vor Livegang und vor dem Mittesten durch Fremde** | Schließt das größte Rechtsrisiko |
| 2 | **Regelwerk serverseitig** (Edge Function) | 0 € | 0,5–1 Tag Code | vor Netlify-Livegang | Hebt größte technische Lücke |
| 3 | GitHub-Repo `zaehlerschrank-check` auf **privat** prüfen, keine Regeln in der Landingpage | 0 € | 10 Min. | sofort | Verhindert unbeabsichtigte Veröffentlichung |
| 4 | **Kurz-NDA** für Tester, mündlich + schriftlich bestätigen | 0 € (Vorlage prüfen lassen ca. 100–300 €) | 1 Std. | vor dem Mittesten | Beleg „angemessene Geheimhaltung“ |
| 5 | **Nutzungsbedingungen** (kein Kopieren/Scraping, Haftungshinweis) | 0 € Entwurf, Prüfung ca. 200–500 € | 2–3 Std. | vor Livegang, gemeinsam mit [[Rechtliches]] | Vertragsgrundlage |
| 6 | **Login/einzelne Zugangscodes + Rate-Limit** | 0 € | 1–2 Tage Code | vor Kollegen-Test im Großen | Nutzer sperrbar, Abtasten erschwert |
| 7 | **Domain `zaehlerklar.de` sichern**, Marken-Recherche DPMA | ca. 10 €/Jahr, Recherche 0 € | 1 Std. | diese Woche | Name besetzen |
| 8 | **Wortmarke anmelden** (Klassen 9, 42) | ca. 290 € | 1–2 Std. | sobald Name nach den Gesprächen bleibt | Namensschutz |
| 9 | Git-Historie/Datumsnachweis sichern | 0 € | – | laufend | Beweis Urheberschaft |
| 10 | Patent | – | – | **nicht tun** | unwahrscheinlich erteilbar |

**Reihenfolge-Hinweis (Vault-Regel „erst verkaufen, dann bauen“):** Die 5 Gespräche bis 09.10. gehen vor. Punkt 1 ist günstig und kein Bauen, Punkt 2 erst vor dem Livegang. Maßnahmen 5, 6, 8 erst nach positivem Gesprächsergebnis.

## Offene Fragen (⚖ vom Anwalt prüfen lassen)
- Arbeitgeber: Nebentätigkeit, Wettbewerb, § 69b UrhG, Nutzung von Betriebswissen.
- Reichen die geplanten Maßnahmen für „angemessene Geheimhaltung“ nach GeschGehG?
- Wirksame NDA-/AGB-Texte (B2B), Haftung bei falscher Einschätzung.
- Marken-Ähnlichkeit zu bestehenden „Zähler…“-Marken.
