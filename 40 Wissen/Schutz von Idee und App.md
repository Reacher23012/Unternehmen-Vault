---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
erstellt: 2026-10-06
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App („Zählerklar“)

> **Hinweis:** Das ist eine Analyse der Nachtschicht, **keine Rechtsberatung**. Alles, was mit „⚖ Anwalt“ markiert ist, vor einer Entscheidung von Anwalt oder Steuerberater prüfen lassen. Zum Projekt: [[Zählerschrank-Check]] · Technik: [[App & Technik]] · Vorteil: [[Mein Vorteil]]

## Kurzfassung
1. Die **Idee** ist nicht schützbar. Geschützt ist nur, was man konkret ausgearbeitet hat (Code, Texte, Name) oder geheim hält (Regelwerk).
2. **Größte Lücke:** Das komplette Regelwerk (`regeln.json` + Logik in `regelwerk.ts`) steckt im ausgelieferten App-Bundle. Wer die App öffnen darf, kann es auslesen. Für das Geschäftsgeheimnis-Argument ist das ein Problem.
3. Wirksamster Schutz ist **Tempo, Netzwerk und eigene Falldaten**, nicht Recht. Der Aufwand für Schutzmaßnahmen darf die Validierung (5 Gespräche bis 09.10.) nicht verdrängen → siehe Priorisierung unten.

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Praxis für Zählerklar |
|---|---|---|
| **Idee / Konzept** („Foto → Regelwerk → Maßnahmenliste“) | **Kein** Schutz als bloße Idee | Nachbau jederzeit erlaubt, solange nichts Geschütztes kopiert wird |
| **Quellcode, Texte, Grafik** | **Urheberrecht**, entsteht automatisch, keine Anmeldung | schützt vor 1:1-Kopie, nicht vor Nachbau mit eigenem Code. Nachweis: Git-Historie, Datum der Commits |
| **Name / Logo „Zählerklar“** | **Marke** beim DPMA (Anmeldung, Prüfung auf ältere Rechte). Ohne Eintragung nur schwacher Schutz durch Benutzung/Unternehmenskennzeichen | Gebühr laut DPMA-Tarif grob ab ca. 290 € (3 Klassen, Online-Anmeldung) – **aktuellen Betrag auf dpma.de prüfen**. Vorher Recherche (steht schon in der Aufgabenliste, [[ADR-0006 Produktname Zählerklar]]) |
| **Regelwerk R01–R26 als Wissen** | **Geschäftsgeheimnis** nach GeschGehG, aber nur, wenn es (a) nicht allgemein bekannt/leicht zugänglich ist, (b) wirtschaftlichen Wert hat und (c) durch **angemessene Geheimhaltungsmaßnahmen** geschützt wird | (a) heikel: Die Regeln stützen sich auf öffentliche Quellen (TAB, BDEW-Musterwortlaut); geheim ist nur die **Auswahl, Verknüpfung und Auslegung**. (c) ist heute nicht erfüllt, siehe Abschnitt 2 |
| **Regelwerk als Datensammlung** | evtl. Datenbankrecht (§§ 87a ff. UrhG) bei wesentlicher Investition | ⚖ Anwalt: unsicher, ob 26 Regeln dafür reichen |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist nicht patentierbar; nur bei technischem Beitrag. Gebrauchsmuster gilt für Programme ebenfalls nicht | **Nicht empfehlenswert**: teuer, Erfolg unwahrscheinlich, Veröffentlichung nötig |
| **Trefferdaten / Fotos aus echten Fällen** | faktisch durch Zugriffskontrolle, rechtlich nur schwach | wird mit der Zeit der eigentliche Wert, siehe Abschnitt 5 |

## 2. Technischer Befund: Regelwerk liegt im Browser
**Befund (Code geprüft, Stand 06.10.2026):**
- `web/src/regelwerk.ts` importiert `regeln.json` und enthält die gesamte Auswertung (`ausgeloesteRegeln`, `bewerte`). Vite bündelt beides ins JavaScript der App.
- Die Edge Function (`supabase/functions/api`) macht nur Fotoanalyse, Fälle und Warteliste. Das Regelwerk läuft **vollständig im Gerät** des Nutzers.
- Der Zugangscode (`x-app-code`) schützt nur die API-Routen. Die ausgelieferte App selbst (HTML/JS) ist laut Plan auf Netlify öffentlich abrufbar, der Code steckt also **nicht hinter dem Login**. Wer die URL kennt, kann das Bundle laden und `regeln.json` lesen (Browser-Entwicklertools genügen, 14 KB).
- Selbst mit Login: Jeder Tester sähe das Bundle. Minifizierung/Obfuskierung hält niemanden ab, der will.
- Auch das private claude.ai-Demo-Artifact enthält das Regelwerk komplett (Demo-Build); das ist nur für freigegebene Konten sichtbar, aber nicht „geheim“.

**Risiko-Bewertung:**
| Aspekt | Einschätzung |
|---|---|
| Wahrscheinlichkeit eines gezielten Abgriffs jetzt | gering (kein Nutzer, keine öffentliche URL) |
| Schaden bei Abgriff | mittel: Konkurrent spart die Regelarbeit. Er könnte das fertige Regelwerk mit eigener Foto-KI koppeln |
| Rechtliche Folge | **Ein Geschäftsgeheimnis fällt eher weg**, wenn es ungeschützt an jeden Besucher ausgeliefert wird („angemessene Maßnahmen“ fehlen). ⚖ Anwalt |
| Dringlichkeit | **mittel**: vor dem öffentlichen Livegang und vor der Weitergabe an Tester beheben, nicht vorher |

**Lösung (Skizze „Regelwerk serverseitig“):**
1. `regelwerk.ts` + `regeln.json` wandern in die Edge Function (Deno kann TypeScript; `modell.ts` mit den Typen teilen oder kopieren).
2. Neue Route `POST /bewerte`: nimmt `Eingaben`, antwortet mit **Ergebnis, Maßnahmen (Text + Fundstelle), offene Punkte, Messkonzept**. Die App bekommt nur das Ergebnis des konkreten Falls, nie die Gesamtliste der Regeln und nie die Bedingungen.
3. Aus dem Web-Bundle entfernen: `regeln.json`, `ausgeloesteRegeln`, `schlimmsterFall`. `main.ts` und `demo.ts` rufen die Route auf.
4. Route nur mit gültigem Login/Zugangscode, **Rate-Limit** pro Nutzer (sonst lässt sich das Regelwerk durch systematisches Abfragen von Eingabekombinationen auslesen; die Eingaben sind endlich, ~10⁶ Kombinationen, ein Limit und Protokoll erschweren das).
5. Tests: `regelwerk.test.ts` bleibt als Test der Funktion (läuft gegen den serverseitigen Code); App-Test mit gemockter Route.

**Preis der Lösung (ehrlich):**
- Ohne Netz keine Bewertung mehr. Heute funktionieren Erfassung und Ergebnis auch im Funkloch (Zwischenspeicher). Kellerräume ohne Empfang sind der Normalfall → Ergebnis erst beim Senden. Das widerspricht dem bisherigen Nachsenden-Konzept ([[App & Technik]]).
- Pro Check eine Server-Anfrage mehr (Kosten vernachlässigbar, Supabase-Free-Tier reicht).
- Demo-Build (`build:demo`) braucht eine Sonderlösung (Beispieldaten fest hinterlegen).
- Aufwand grob 0,5–1 Tag.

**Empfehlung:** Erst **nach den ersten Gesprächen** umsetzen, aber **vor** Netlify-Livegang und vor der Weitergabe an Kollegen-Tester. Bis dahin Tester nur mit NDA und persönlicher Übergabe (Abschnitt 3). Alternative bis dahin: App nicht öffentlich hosten, sondern nur privat/lokal vorführen.

## 3. Verträge und Zugang
| Maßnahme | Zweck | Stand / Kosten |
|---|---|---|
| **NDA für Tester/Kollegen** | Weitergabe- und Nachbauverbot für Regelwerk, Screens, Zugang; zählt als „angemessene Maßnahme“ | Vorlage vom Anwalt oder aus einer seriösen Quelle; ⚖ Anwalt. Bei Gesprächen ohne App-Zugriff nicht nötig, nur bei Mittesten. Kosten: Vorlage kostenlos bis wenige Hundert € geprüft |
| **Nutzungsbedingungen / AGB** | Verbot von Kopieren, Reverse Engineering, Scraping, Weitergabe des Zugangs; Haftungsausschluss („Ersteinschätzung, Prüfung durch Elektrofachkraft nötig“) | gehört mit zu [[Rechtliches]]; ⚖ Anwalt. **Wichtig:** Reverse-Engineering-Verbote sind gegenüber Verbrauchern/gegen gesetzliche Ausnahmen (§§ 69d, 69e UrhG) nur begrenzt wirksam; hier B2B, trotzdem prüfen lassen |
| **Zugang nur mit Login** | jeder Nutzer einzeln sperrbar, protokollierbar; ein gemeinsamer `APP_CODE` lässt sich nicht zuordnen | steht schon als „Irgendwann: Login statt Zugangscode“ in [[Aufgaben]] – **vor dem Kollegen-Test vorziehen**, wenn Tester das Regelwerk-Ergebnis sehen. Supabase Auth: 0 € |
| **Quellenhinweis im Regelwerk** | Fundstellen statt Normtexte (Urheberrecht Dritter, schon so geregelt in [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]) | umgesetzt |
| **Repository privat halten** | Code liegt auf GitHub; nie öffentlich stellen, Zugriff prüfen | prüfen: ist `zaehlerschrank-check` privat? |

## 4. Arbeitgeber-Frage (offen, ⚖ Anwalt/Steuerberater)
Falls ich im **Elektrohandwerk angestellt** bin, kann die Frage „Wem gehört das?“ entscheidend sein. Die Nachtschicht kann das **nicht entscheiden**, nur Fragen sammeln:
1. **Arbeitsvertrag lesen:** Nebentätigkeitsklausel (Anzeige/Genehmigung?), Wettbewerbsverbot, Geheimhaltung, Klauseln zu „Arbeitsergebnissen“.
2. **Wettbewerb:** Wenn mein Arbeitgeber selbst Elektroarbeiten an Zählerplätzen anbietet und meine App Elektrobetrieben dient, kann das als Konkurrenz/Interessenkonflikt gelten (während des Arbeitsverhältnisses gilt ein Wettbewerbsverbot auch ohne Klausel, § 60 HGB bei Handlungsgehilfen, sinngemäß).
3. **Urheberrecht an Software:** Programme, die ein Arbeitnehmer **in Erfüllung seiner Aufgaben oder nach Anweisung** schafft, gehören dem Arbeitgeber (§ 69b UrhG). Bei einem Hobby-/Nebenprojekt in der Freizeit ohne Auftrag eher nicht. Grauzone: Wissen aus dem Betrieb, Firmenrechner, Arbeitszeit, Kundenfotos.
4. **Arbeitnehmererfindung:** Nur relevant, wenn etwas patentfähig wäre (siehe Abschnitt 1, eher nicht).
5. **Betriebs-/Kundengeheimnisse:** Fotos von Zählerschränken aus Kundenaufträgen des Arbeitgebers, interne Preise, Kundenwissen nicht für die App verwenden.
6. **Fachwissen:** Allgemeines Berufswissen darf ich nutzen; interne Unterlagen nicht.

**Frage an Anwalt/Steuerberater (konkret):** „Ich bin angestellt als Elektro-[Beruf]. Ich entwickle in meiner Freizeit eine App für Elektrobetriebe. Brauche ich die Zustimmung meines Arbeitgebers? Wem gehören Code und Regelwerk? Was muss ich beim Gewerbe/Einkommen (Nebentätigkeit) beachten?“ → Termin vor dem Livegang, nicht vor den Gesprächen.

## 5. Realistischer Schutz: Tempo statt Paragrafen
Gegen jemanden, der die Idee sieht und nachbaut, hilft kaum ein Recht. Was wirklich schützt:
- **Vorsprung:** Regelwerk R01–R26 mit Fundstellen und Westnetz-Praxis hat Arbeit gekostet. Nachbauen kann man das, aber nicht über Nacht.
- **Netzwerk:** direkter Zugang zu Kollegen und zum Großhändler ([[Direktansprache]]). Das kopiert niemand per Download.
- **Daten aus echten Fällen:** Jeder erfasste Fall mit „tatsächlicher Entscheidung“ verbessert Regeln und Fotoerkennung. Nach 100 Fällen ist das mehr wert als der Code. Datenschutz beachten (keine Adressen/Namen auf Fotos).
- **Aktualität:** Regeln pflegen (neue TAB, Westnetz) – ein Konkurrent muss die Pflege dauerhaft leisten.
- **Vertrauen und Marke:** Name, Auftritt, Empfehlungen im Handwerk.
- **Der Markt ist klein und regional:** Ein großer Anbieter wird erst relevant, wenn sich das lohnt. Das Risiko „Diebstahl“ ist heute kleiner als das Risiko „niemand will es“ (→ [[Validierung & Go-No-Go]]).

**Kritischer Blick:** Zu viel Schutzaufwand vor dem ersten zahlenden Kunden ist Wunschdenken in Verkleidung. Schutz lohnt, wenn das Produkt bewiesen ist.

## 6. Priorisierte Maßnahmenliste
| # | Maßnahme | Wann | Aufwand | Kosten |
|---|---|---|---|---|
| 1 | **Gespräche weiter vorn lassen** (kein Schutzprojekt vor 09.10.) | jetzt | – | 0 € |
| 2 | Bei Gesprächen **nichts Technisches herzeigen, was das Regelwerk offenlegt**; Mittesten nur persönlich, mündliche Zusage zur Vertraulichkeit, schriftlich per Nachricht festhalten | ab sofort | minimal | 0 € |
| 3 | Repository `zaehlerschrank-check` und Vault auf **privat** prüfen | diese Woche | 5 Min. | 0 € |
| 4 | **Arbeitsvertrag lesen** (Nebentätigkeit, Wettbewerb, Geheimhaltung), Fragen aus Abschnitt 4 notieren | vor dem Mittesten | 1 Std. | 0 € |
| 5 | **Anwaltstermin bündeln:** NDA, Nutzungsbedingungen, Arbeitgeber-Frage, Impressum/Datenschutz ([[Rechtliches]]) in einer Beratung | vor Livegang | 1 Termin | grob 300–800 € (Schätzung, Angebot einholen) |
| 6 | **Name:** DENIC-Prüfung, DPMA-Recherche (läuft in Aufgaben); Anmeldung der Marke erst nach Go | vor Druck/Livegang bzw. nach Go | 1–2 Std. | Anmeldung ab ca. 290 € (prüfen) |
| 7 | **Login statt Zugangscode** (Supabase Auth, Einzelkonten) | vor Kollegen-Test | 0,5–1 Tag | 0 € |
| 8 | **Regelwerk serverseitig** (Abschnitt 2) | vor Netlify-Livegang | 0,5–1 Tag | 0 € |
| 9 | Rate-Limit auf API, Protokoll der Abrufe | mit 8 | 2–4 Std. | 0 € |
| 10 | Patent/Gebrauchsmuster | **nicht empfohlen** | – | – |
| 11 | Trefferdaten sammeln (20 Fälle, dann mehr) | laufend | – | 0 € |

Reihenfolge-Logik laut Vault-Regel „erst verkaufen, dann bauen“: Die Code-Maßnahmen (7–9) stehen **vor dem Livegang**, aber **nach** den Gesprächen. Das wird hier offen so angesprochen, weil es Infrastruktur ist.

## Offene Fragen (⚖ Anwalt)
- Reicht die jetzige Praxis (Regelwerk aus öffentlichen Quellen, eigene Auswahl) für „Geschäftsgeheimnis“?
- Wirksamkeit der NDA/AGB-Klauseln gegenüber Betrieben.
- Arbeitgeber-Frage (Abschnitt 4).
- Marken-Risiko „Zählerklar“ (ähnliche ältere Marken).
- Haftung bei falscher Einschätzung („Ersteinschätzung“-Formulierung).
