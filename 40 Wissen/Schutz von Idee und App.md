---
typ: wissen
thema: schutz
projekt: "[[Zählerschrank-Check]]"
erstellt: 2026-11-08
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App („Zählerklar“)

> **Keine Rechtsberatung.** Das ist eine Sortierung des Themas für das Gespräch mit Anwalt/Steuerberater. Alles mit **⚖️** muss geprüft werden, bevor man sich darauf verlässt. Stand der Rechtslage: Wissen der Nachtschicht, nicht online nachgeprüft.

**Kurzfassung:** Die bloße *Idee* ist nicht schützbar. Schützbar sind Code (automatisch), Name (Marke, gegen Gebühr) und das Regelwerk als *Geschäftsgeheimnis* – aber nur, wenn man es tatsächlich geheim hält. Genau das tut die App heute nicht (siehe Abschnitt 2). Der stärkste Schutz ist realistisch Tempo, Netzwerk und Daten (Abschnitt 5).

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Wie / Kosten | Einschätzung |
|---|---|---|---|
| **Idee** („Foto → Zählerschrank-Einordnung“) | **keiner** | – | Ideen sind frei. Jeder darf dieselbe Idee bauen. |
| **Code** (App, Edge Function, Landingpage) | Urheberrecht (§ 69a ff. UrhG) | entsteht automatisch, keine Anmeldung | Schützt die konkrete Umsetzung, nicht die Funktion. Nachbauen mit eigenem Code bleibt erlaubt. Beweis: Git-Historie sichern. |
| **Name „Zählerklar“** | Marke (DPMA) | Anmeldung ca. 290 € (bis 3 Klassen, Online), ⚖️ Gebühr aktuell prüfen; Recherche vorher, Klassen 9 und 42 laut [[ADR-0006 Produktname Zählerklar]] | Lohnt, sobald Name gesetzt und Domain gesichert ist. Schützt nur den Namen, nicht das Produkt. Ältere Rechte Dritter vorher recherchieren (sonst Abmahnrisiko). |
| **Regelwerk R01–R26** (Auswahl, Formulierung, Verknüpfung) | als **Geschäftsgeheimnis** (GeschGehG), evtl. Datenbankwerk-/Sammlungsschutz | kostenlos, aber **nur mit „angemessenen Geheimhaltungsmaßnahmen“** (§ 2 Nr. 1 GeschGehG) | Hier liegt der Kern des Vorsprungs (siehe [[Mein Vorteil]]). Schutz entfällt, wenn es offen im Browser liegt. ⚖️ |
| **Normen / TAB-Inhalte** | gehören Dritten (BDEW, DIN, Westnetz) | – | Nicht übernehmen, nur Fundstellen – gilt bereits ([[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]). Das Regelwerk selbst ist damit eine *eigene Auswertung* öffentlicher Quellen; die Quellen schützt es nicht. |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist nicht patentierbar (§ 1 Abs. 3 PatG); nur bei technischem Beitrag | Anwalt + vierstellig | Praktisch nicht sinnvoll: teuer, langsam, geringe Erfolgsaussicht, Veröffentlichung nach 18 Monaten. Nicht verfolgen. ⚖️ |

**Wichtig zur Ehrlichkeit:** Das Regelwerk beruht auf *öffentlichen* Quellen (TAB, DIN, Schulungsfolien). Ein Wettbewerber mit Fachwissen kann Ähnliches in Wochen selbst aufbauen. Geschützt ist nur die *konkrete Zusammenstellung*, und nur, solange sie nicht offenliegt.

## 2. Technischer Befund: Das Regelwerk liegt beim Nutzer im Browser
**Befund (am Code geprüft, 08.11.2026):**
- `web/src/regeln.json` (Name, Bedingung, Maßnahme, Stufe, Fundstelle, Geltung, Status je Regel) wird in `web/src/regelwerk.ts` per `import` eingebunden und von Vite ins App-Bundle gebaut.
- `regelwerk.ts` enthält außerdem die komplette Auslöse-Logik (`ausgeloesteRegeln`, Schwellen wie 4,2 kW, 4,6 kW, 12 A, 50 A, Westnetz-Sonderfälle).
- Die Edge Function (`supabase/functions/api`) macht nur Fotoanalyse und Fall-Speicher; **die Regelauswertung läuft komplett im Browser**.
- Folge: Wer die App-Adresse kennt, kann das JavaScript-Bundle laden und **das gesamte Regelwerk samt Logik auslesen** – ohne Login (der Zugangscode schützt nur die API, nicht das statisch ausgelieferte Bundle). Dasselbe gilt für den Demo-Build (`build:demo`, eine einzelne HTML-Datei) und jede Weitergabe an Tester.

**Risiko-Bewertung:**
| Aspekt | Bewertung |
|---|---|
| Wahrscheinlichkeit, dass es jemand tut | heute niedrig (kein Nutzer, keine Bekanntheit), steigt mit Reichweite |
| Schaden | mittel bis hoch: der Kern des Produkts wäre in Minuten kopierbar |
| Rechtlich | Wer das Bundle öffentlich ausliefert, kann sich später schwer auf „angemessene Geheimhaltung“ berufen. ⚖️ |
| Hinweis | Verschleierung (Minify/Obfuscation) hilft kaum: JSON-Texte bleiben lesbar. |

**Lösungsskizze „Regelwerk serverseitig“:**
1. `regeln.json` und die Logik aus `regelwerk.ts` wandern in die Edge Function (neue Route, z. B. `POST /auswerten`: Eingaben rein → Ergebnis raus).
2. Die App schickt nur die Eingaben und bekommt **Ergebnis + Fundstelle je Maßnahme** zurück (Ampel, Maßnahmen, „Vor Ort klären“, Messkonzept) – nicht die Regeln selbst, keine Bedingungstexte, keine Schwellen.
3. Das Bundle enthält danach nur Anzeigecode. Die Tests (`regelwerk.test.ts`) laufen weiter gegen dieselbe Logik (Modul gemeinsam nutzbar oder Tests in die Function ziehen).
4. Bewusste Grenzen: Ein Nutzer sieht pro Fall weiterhin Maßnahmen und Fundstellen und könnte durch viele Testfälle Regeln *rekonstruieren* (Black-Box-Abfrage). Das erschwert Kopieren stark, verhindert es nicht. Dagegen: Login statt Zugangscode, Rate-Limit, Nutzungsbedingungen (Abschnitt 3).
5. Nebeneffekt: Regeländerungen (z. B. neue Westnetz-TAB) wirken sofort für alle, ohne App-Update. Offline-Betrieb entfällt (Funkloch-Nachsenden gilt dann nur für Fälle; Auswertung braucht Netz) – **Abwägung**: Offline war nur „nach Go“ geplant.
6. Aufwand grob: 1 Nachtschicht für Route + App-Umstellung + Tests; Risiko gering. **Kein Deployment durch die Nachtschicht** – Einspielen macht der Nutzer zusammen mit den Secrets.

## 3. Verträge und Zugang
- **NDA für Tester/Kollegen:** Kurze Geheimhaltungsvereinbarung (1 Seite) vor Zugang zur App: Zweck „Mittesten“, keine Weitergabe von Zugangsdaten/Ergebnissen/Regeln, Rückgabe/Löschung, Laufzeit. Muster vom Anwalt oder aus seriöser Vorlage, nicht frei erfinden. ⚖️ Zweck: erfüllt zugleich das Merkmal „angemessene Geheimhaltungsmaßnahme“. Bei Gesprächen *ohne* App-Zugang ist ein NDA nicht nötig – dort nichts Geheimes zeigen (Regeln nicht herzeigen, nur Nutzen).
- **Nutzungsbedingungen (AGB):** Kein Kopieren, kein Auslesen/Scrapen, kein Reverse Engineering, keine Weitergabe des Zugangs, Ergebnis ersetzt keine Prüfung vor Ort (deckt sich mit Impressumshinweis in [[Rechtliches]]). Gegenüber Unternehmern (B2B) einfacher als gegenüber Verbrauchern. ⚖️ Wirksamkeit der Klauseln prüfen lassen, vor allem Haftungsausschluss.
- **Zugang nur mit Login:** Heute gilt ein gemeinsamer `APP_CODE` (laut [[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]] nur für einen Nutzer gedacht, „Login vor Kollegen-Test“). Ein geteilter Code ist weder widerrufbar pro Person noch nachvollziehbar. Für Schutz: persönlicher Zugang je Tester, jederzeit sperrbar, Zugriffe im Log. Passt zur offenen Aufgabe „Login statt Zugangscode“.
- **Grenzen von Verträgen:** Sie wirken nur gegen Leute, die unterschrieben haben, und nur durchsetzbar, wenn ein Verstoß beweisbar ist.

## 4. Offene Frage: Wem gehört die Idee, wenn sie im Rahmen einer Anstellung entstanden ist? ⚖️
Das Fachwissen und das Regelwerk stammen aus der Arbeit im Elektrohandwerk (laut [[Mein Vorteil]]). **Ich weiß nicht, wie der Arbeitsvertrag aussieht – deshalb nur Fragen, keine Antworten:**
1. **Arbeitnehmererfindungsgesetz:** Gilt nur für patent-/gebrauchsmusterfähige Erfindungen, bei Software meist nicht – aber ⚖️ prüfen lassen, ob Diensterfindung angenommen werden könnte.
2. **Urheberrecht an Software (§ 69b UrhG):** Programme, die ein Arbeitnehmer *in Wahrnehmung seiner Aufgaben* oder nach Anweisung schafft, stehen dem Arbeitgeber zu. Hier wird der Code in der Freizeit geschrieben, aber ⚖️: Ist es Teil der Aufgaben? Wurden Arbeitszeit, Firmenrechner, Firmen-Unterlagen (z. B. TAB-Schulungsunterlagen, interne Checklisten) genutzt?
3. **Nebentätigkeit:** Muss sie angezeigt oder genehmigt werden? Steht im Arbeitsvertrag/Tarifvertrag etwas?
4. **Wettbewerbsverbot:** Während des Arbeitsverhältnisses gilt ein gesetzliches Wettbewerbsverbot. ⚖️ Ist eine App für Elektrobetriebe „Wettbewerb“ zum Arbeitgeber? Und: Zielgruppe sind eventuell Kollegen und Konkurrenten des Arbeitgebers.
5. **Verschwiegenheit/Betriebsgeheimnisse:** Stammen Regeln, Fälle oder Fotos aus Aufträgen des Arbeitgebers? Kundendaten und Fotos aus Kundenanlagen nur mit Rechtsgrundlage nutzen.
6. **Herkunft der Unterlagen:** Die Westnetz-Schulung (09/2025) wird als Fundstelle genannt. Wurde sie öffentlich/frei bezogen oder intern/lizenziert? Urheberrecht/Nutzungsbedingungen prüfen.

**Empfehlung:** Vor dem ersten Euro Umsatz *einen* Termin bei einem Anwalt für IT-/Arbeitsrecht (Erstberatung oft pauschal, ⚖️ Kosten erfragen) und Steuerberater (Gewerbeanmeldung, Nebentätigkeit, Umsatzsteuer). Arbeitsvertrag mitbringen. Bis dahin: **keine Arbeitgeber-Unterlagen im Vault oder Repository.**

## 5. Realistischer Schutz: Tempo, Netzwerk, Daten
Rechtlicher Schutz ist hier dünn. Was tatsächlich schwer zu kopieren ist:
- **Vorsprung in Monaten:** Wer zuerst bei den Betrieben ist (Direktansprache, [[ADR-0005 Direktansprache vor Instagram]]), wird die Referenz. Das ist der Grund, warum die Gespräche wichtiger sind als jeder Schutz.
- **Netzwerk und Vertrauen:** Persönlicher Zugang zu Kollegen und Innung → [[Mein Vorteil]]. Ein Konkurrent ohne Fachhintergrund braucht länger, um Glaubwürdigkeit aufzubauen.
- **Daten aus echten Fällen:** Die Sammlung „KI-Erkennung vs. tatsächliche Entscheidung“ (Trefferquote) wächst mit jedem Fall und ist nirgends öffentlich. Sie belegt Qualität und verbessert Erkennung und Regeln (Fallbibliothek). Datenschutz beachten (Fotos ohne Adressen/Namen), ⚖️ Einwilligung der Nutzer zur Auswertung einholen.
- **Aktualität:** Regeln laufend an neue TAB/Netzbetreiber anpassen (z. B. Westnetz-TAB nach BDEW-Musterwortlaut 2026). Ein statischer Klon veraltet.
- **Marke und Domain:** Der Name verhindert Trittbrettfahrer auf „Zählerklar“.

## 6. Priorisierte Maßnahmenliste
| # | Maßnahme | Kosten | Aufwand | Wirkung | Wann |
|---|---|---|---|---|---|
| 1 | **Regelwerk serverseitig** (Edge Function, App nur Ergebnis) | 0 € | 1 Nachtschicht + Einspielen | hoch – ohne das ist alles andere Kosmetik | **vor** dem ersten Test durch Fremde |
| 2 | **Nichts aus dem Regelwerk öffentlich machen**: Demo-Artifact/`dist-artifact`-HTML und Marketing zeigen nur Beispiel-Ergebnisse, keine Regel-Tabelle; im Gespräch Nutzen zeigen, nicht die Regeln | 0 € | klein | mittel | sofort |
| 3 | **Persönlicher Login** statt gemeinsamem `APP_CODE` (sperrbar, protokolliert) | 0 € (Supabase Auth) | mittel | hoch für Kontrolle | vor Kollegen-Test |
| 4 | **Kurz-NDA + Nutzungsbedingungen** für Tester (Vorlage prüfen lassen) | ⚖️ ca. 0–300 € je nach Weg | klein | mittel (Abschreckung, Geheimhaltungsnachweis) | vor dem ersten Mitteste-Zugang |
| 5 | **Arbeitgeber-/Nebentätigkeits-Frage klären** (Anwalt, Arbeitsvertrag) | ⚖️ Erstberatung, Kosten erfragen | 1 Termin | hoch (Bestandsrisiko für das ganze Projekt) | **vor dem ersten Euro Umsatz**, besser früher |
| 6 | **Name sichern:** `zaehlerklar.de` (DENIC), DPMA-Recherche, danach Marke anmelden | Domain ~1 €/Monat, Marke ca. 290 € ⚖️ | klein | mittel | bereits offen; Anmeldung erst nach Go |
| 7 | **Git-Historie als Nachweis** sichern (Repo bleibt privat, regelmäßig pushen) | 0 € | – | klein | laufend |
| 8 | **Rate-Limit + Auswertungs-Log** (Black-Box-Abfragen erkennen) | 0 € | klein | klein bis mittel | nach #1 |
| 9 | Patent/Gebrauchsmuster | vierstellig | hoch | gering | **nicht verfolgen** |

**Reihenfolge laut Methode:** Dieses Papier ändert nichts an der Priorität „erst verkaufen, dann bauen“ ([[Ideen-System]]). Die Gespräche und der Test mit Kollegen bleiben vorn. Nur #1–#3 und #5 sind vor einer Weitergabe der App an Fremde Pflicht, das übrige kann warten.

## Zugehörige Aufgaben
Die Folgeaufgaben stehen in [[Aufgaben]] unter „Als Nächstes“ (Code-Aufgabe „Regelwerk serverseitig“, Login, NDA/AGB, Anwaltstermin).

Siehe auch: [[Rechtliches]], [[App & Technik]], [[Mein Vorteil]], [[Regelwerk R01–R26]].
