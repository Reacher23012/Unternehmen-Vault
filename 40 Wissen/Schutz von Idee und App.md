---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-10-20
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App

> **Keine Rechtsberatung.** Das ist eine Sortierung von Wissen und offenen Fragen für [[Zählerschrank-Check]] (Produktname Zählerklar, [[ADR-0006 Produktname Zählerklar]]). Alles mit **⚖ Anwalt** muss vor einer Entscheidung geprüft werden. Kostenangaben sind Größenordnungen aus dem Gedächtnis, vor Nutzung aktuell nachsehen.

## Kurzfassung
1. Die **Idee** („Foto → Maßnahmenliste nach TAB“) ist nicht schützbar. Das ist normal und kein Grund zur Panik.
2. Schützbar sind **Code und Texte** (Urheberrecht, automatisch), der **Name** (Marke, kostet Geld) und das **Regelwerk als Geschäftsgeheimnis** – aber nur, wenn man es auch wirklich geheim hält.
3. **Technischer Befund:** Das gesamte Regelwerk steckt heute im Browser-Bundle der App. Sobald die App öffentlich oder bei Testern läuft, kann es jeder auslesen. Das muss vor dem Online-Gehen gelöst oder bewusst in Kauf genommen werden (Abschnitt 2).
4. **Größtes offenes Risiko ist nicht der Dieb, sondern die Frage, ob die Idee dem Arbeitgeber gehört** (Abschnitt 4). Das kostet eine Stunde Vertrag lesen und ggf. eine Erstberatung.
5. Der wirksamste Schutz ist Tempo, Netzwerk und eigene Falldaten (Abschnitt 5). Schutzmaßnahmen dürfen die Validierung nicht verdrängen (siehe [[Ideen-System]]: erst verkaufen, dann bauen).

## 1. Was ist in Deutschland überhaupt schützbar?
| Gegenstand | Schutz | Was es kostet / bedeutet | Einschätzung |
|---|---|---|---|
| **Idee / Geschäftsmodell / Methode** | keiner. Urheberrecht schützt nur die konkrete Ausdrucksform, Ideen und Grundsätze ausdrücklich nicht (§ 69a Abs. 2 UrhG für Software) | – | Jeder darf „Foto → TAB-Check“ nachbauen. Der Vorsprung muss aus Umsetzung, Regelqualität und Kunden kommen. |
| **Quellcode, Oberfläche, Texte** | Urheberrecht, entsteht automatisch (§§ 69a ff. UrhG, bei Texten § 2 UrhG) | 0 € | Schützt vor 1:1-Kopie, nicht vor Neuschreiben. Beweis hilft: Git-Verlauf mit Zeitstempeln, privates Repository. |
| **Name „Zählerklar“, Logo** | Marke beim DPMA (online) | Anmeldegebühr grob 290 € für bis zu 3 Klassen, Schutz 10 Jahre; Recherche vorher, sonst Abmahnrisiko. Ohne Eintragung entsteht Schutz nur über Benutzung und Verkehrsgeltung, das ist schwach | Erst nach Namensprüfung (offene Aufgabe: DENIC, DPMA-Recherche, Handle). Anmelden, sobald echte Kunden da sind. ⚖ Klassenwahl, Kollisionsrisiko |
| **Regelwerk R01–R26 als Know-how** | Geschäftsgeheimnisgesetz (GeschGehG): nur geschützt, wenn es **geheim ist, wirtschaftlichen Wert hat und „angemessenen Geheimhaltungsmaßnahmen“ unterliegt** (§ 2 Nr. 1) | Kosten: NDA, Zugriffsbeschränkung | Schwächer als gedacht: Die Fundstellen (BDEW-Musterwortlaut, Westnetz-Schulung) sind öffentlich. Geheim ist allenfalls die **Auswahl, Verdichtung und Verknüpfung** der Regeln. Reverse Engineering eines rechtmäßig erworbenen Produkts ist nach § 3 GeschGehG grundsätzlich erlaubt, **wenn vertraglich nicht ausgeschlossen** (→ Nutzungsbedingungen, Abschnitt 3). ⚖ Anwalt |
| **Sammlung der Texte in `regeln.json`** | evtl. Schutz als Datenbank/Sammelwerk (§§ 87a ff. UrhG, § 4 UrhG) | 0 € | Unsichere Anwendung auf 26 Regeln. Nicht darauf verlassen. ⚖ Anwalt |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist nicht patentierbar (§ 1 Abs. 3 PatG), nur mit technischem Beitrag | Patent 4-stellig bis 5-stellig mit Anwalt, Gebrauchsmuster deutlich weniger, schließt Programme aber ebenfalls aus | **Nicht empfohlen.** Aufwand und Erfolgsaussicht passen nicht zu einer Validierungsphase. |
| **Fremde Inhalte** (Normen, TAB-Texte, Schulungsfolien) | gehören den Herausgebern | – | Gilt umgekehrt: nur Fundstellen nennen, keine Normtexte kopieren (steht schon in [[Rechtliches]] und [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]). |

## 2. Technischer Befund: Regelwerk liegt im Browser (geprüft 20.10.2026)
**Befund** (Code `zaehlerschrank-check`, Stand `master`):
- `web/src/regelwerk.ts` importiert `./regeln.json` (26 Regeln, rund 14 KB: Bedingung, Maßnahme, Stufe, Fundstelle, Geltung, Status).
- `web/src/main.ts` ruft `bewerte(...)` direkt im Browser auf, die **Auswertungslogik** (`ausgeloesteRegeln`) steht ebenfalls im Client-Code.
- Beides landet im Vite-Bundle. Jeder, der die App öffnen darf, kann es in den Entwicklertools lesen. Das gilt auch für das **Demo-Artifact** (`build:demo`), solange es privat bleibt, ist das unkritisch.
- Die Edge Function (`supabase/functions/api`) kennt das Regelwerk bisher nicht, sie macht nur Foto-Analyse, Fälle und Warteliste.

**Risiko bewerten:**
| Szenario | Heute | Nach Veröffentlichung |
|---|---|---|
| App lokal / bei 4 Testern mit Zugangscode | gering (bekannte Personen, NDA möglich) | – |
| App öffentlich auf Netlify, nur mit gemeinsamem `APP_CODE` | – | **hoch:** Code teilen = Regelwerk teilen. Und selbst wer den Code nicht hat, bekommt das Bundle ausgeliefert, solange die Seite ohne Login lädt. |
| Konkurrent will die Logik | – | braucht ohnehin nur wenige Tage, weil TAB und Westnetz-Schulung öffentlich sind. Schaden ist **begrenzt**, aber es entfällt der Vorsprung „schwer zu kopieren“ aus dem Score (Vorsprung 5/5 in [[Zählerschrank-Check]]). |

**Lösungsskizze „Regelwerk serverseitig“:**
1. `regeln.json` und die Auswertung (`ausgeloesteRegeln`, `bewerte`) aus dem Client nehmen und in die Edge Function verlegen (neue Route `POST /bewerte`, Header `x-app-code`/später Login).
2. Die App schickt nur die Eingaben (Schrank-Felder + Vorhaben), bekommt zurück: Ampel, Maßnahmen (Text, Stufe, **Fundstelle**), „Vor Ort klären“, Hinweise. Die Regel-**Bedingungen** und nicht ausgelösten Regeln verlassen den Server nicht.
3. Gemeinsamen Code so legen, dass die vorhandenen Tests (`regelwerk.test.ts`, 13 Tests grün) gegen dieselbe Auswertung laufen (z. B. Modul unter `supabase/functions/_shared/`, Deno-kompatibel, ohne Browser-APIs; Tests laufen weiter in Node/Vitest).
4. Rate-Limit pro Zugang (sonst lässt sich das Regelwerk durch systematisches Abfragen nachbauen, der Eingaberaum ist klein) und Logging ungewöhnlicher Abfragemengen. **Vollständig verhindern lässt sich das nicht.** Wer genug Testfälle abfragt, rekonstruiert die Regeln. Ziel ist nur: Aufwand und Auffälligkeit erhöhen.
5. Folgen: Bewertung braucht Verbindung (aktuell reagiert die App live auf Eingaben, dann Wartezeit oder „Bewerten“-Knopf). Offline-Betrieb auf der Baustelle ist nach [[App & Technik]] ohnehin erst „nach Go“ geplant. Edge-Function-Aufruf zählt aufs Supabase-Kontingent (Free Tier, Zeitlimit 150 s ist hier unkritisch).
6. Aufwand: grob 0,5–1 Tag Code plus Tests. Abhängigkeit: Edge Function muss ohnehin neu eingespielt werden (Härtung vom 03.10.), das kann in einem Zug passieren (braucht Zugangsdaten, nicht für die Nachtschicht).

**Empfehlung:** Nicht vor den Gesprächen bauen. Aber **zur Pflicht machen, bevor die App ohne Netz-Zugangsbeschränkung online geht** (Netlify). Für die 4 Tester reicht NDA + Zugangscode.

## 3. Verträge und Zugang
| Maßnahme | Zweck | Stand |
|---|---|---|
| **NDA / Testerhinweis** für Kollegen und Tester (1 Seite): Zugang persönlich, keine Weitergabe von Code und Ergebnissen, keine Screenshots der Regeln, keine Nutzung zum Aufbau eines eigenen Dienstes | Voraussetzung für „angemessene Geheimhaltungsmaßnahmen“ nach GeschGehG | fehlt. Entwurf kann die Nachtschicht schreiben, ⚖ Anwalt prüft |
| **Nutzungsbedingungen** (später, mit Bezahlmodell): kein Kopieren, **ausdrückliches Verbot von Reverse Engineering** und automatisiertem Abfragen/Scraping, Haftungsklausel „ersetzt keine Prüfung durch den Errichter“ | schließt die Ausnahme in § 3 GeschGehG, Basis für Sperrung | fehlt ⚖ Anwalt (AGB-Recht, B2B) |
| **Login statt gemeinsamer Zugangscode** | pro Person sperrbar, nachvollziehbar, Rate-Limit pro Konto | steht unter „Irgendwann“ in [[Aufgaben]], gehört vor öffentlichen Betrieb |
| **Urheberrechtsvermerk** im Footer der App/Landingpage („© 2026 …, alle Rechte vorbehalten“) und `LICENSE`-Datei im Repo (proprietär) | klare Rechtslage, spätere Beweisführung | fehlt, kleine Code-Aufgabe |
| **Repository privat lassen** | Code nicht öffentlich | prüfen (Sichtbarkeit von `zaehlerschrank-check` auf GitHub) |
| **Geheimhaltung in der Gesprächsführung** | im Gespräch Ergebnisse nennen („die App sagt: nachrüsten, Fundstelle…“), nicht die Regeltabelle zeigen | sofort anwendbar |

## 4. Arbeitgeber-Frage (⚖ Anwalt / Fachanwalt Arbeitsrecht, Steuerberater)
**Offene Frage: Wem gehört die Idee, wenn sie im Rahmen einer Anstellung im Elektrohandwerk entstanden ist?** Das ist aus dem Vault nicht entscheidbar. Zu klären:
- **Arbeitsvertrag lesen:** Klauseln zu Nebentätigkeit (Anzeige- oder Genehmigungspflicht), Wettbewerbsverbot, Verschwiegenheit, Überlassung von Arbeitsergebnissen.
- **Software:** Programme, die ein Arbeitnehmer *in Wahrnehmung seiner Aufgaben oder nach Anweisung* schafft, nutzt grundsätzlich der Arbeitgeber (§ 69b UrhG). Entwickelt wird hier privat und außerhalb der Arbeitsaufgaben, aber die Grenze ist fließend, wenn Fachwissen, Fälle, Fotos, Zeit oder Material aus dem Betrieb stammen.
- **Arbeitnehmererfindungsgesetz:** betrifft patent-/gebrauchsmusterfähige Erfindungen, bei Software kaum relevant. Trotzdem in den Fragenkatalog.
- **Regelwerk als Betriebswissen:** Fließen Betriebsinterna, Kundenfälle, Schulungsunterlagen des Arbeitgebers ein? Schulungsfolien des Netzbetreibers („Westnetz-Schulung 09/2025“) gehören nicht dem Nutzer, Nutzungsbedingungen der Schulung prüfen.
- **Wettbewerb:** Solange das Arbeitsverhältnis besteht, gilt für den Arbeitnehmer das Wettbewerbsverbot (Treuepflicht). Eine App, die Elektrobetrieben Angebote erleichtert, kann je nach Branche des Arbeitgebers (Elektrohandwerk) als Konkurrenz oder Zuliefererdienst gelten. Unklar, deshalb fragen.
- **Fotos echter Schränke:** Aufnahmen bei Kunden des Arbeitgebers sind Betriebs- und Kundendaten. Für Trainings- und Testdaten nur eigene oder freigegebene Fälle (siehe Aufgabe „Fotos ohne Adresse, Namen, Zählernummer“, [[Bildrechte im Marketing]]).
- **Steuerberater:** Gewerbeanmeldung, Nebengewerbe/Kleinunternehmer, Haftpflicht und Berufs-/Betriebshaftpflicht für Fehlberatung der App (Haftung bei falscher Einordnung). Das gehört in dasselbe Gespräch wie das Impressum ([[Rechtliches]]).

**Vorgehen:** (1) Vertrag selbst lesen und die Stellen markieren, (2) bei Unklarheit eine Erstberatung (Fachanwalt Arbeitsrecht/IT-Recht, Festpreis erfragen; Handwerkskammer/Innung bieten teils kostenlose Erstberatung) mit genau diesen Fragen, (3) bis zur Klärung **kein Geld nehmen und nichts öffentlich verkaufen**. Gespräche mit Kollegen sind weiter unproblematisch, solange kein Betriebsgeheimnis des Arbeitgebers erzählt wird. Das ist eine Vorsichtsempfehlung, kein Rechtsurteil.

## 5. Realistischer Schutz: Vorsprung durch Tempo
Rechtlich lässt sich wenig absichern, was nicht ohnehin offen im Netz steht. Was einen Nachbauer wirklich bremst:
- **Echte Falldaten:** Jeder erfasste Fall mit „Deine tatsächliche Entscheidung“ verbessert Trefferquote und Regeln. Das kann niemand von außen kopieren. Mindestziel 20 Fälle ([[Validierung & Go-No-Go]]).
- **Netzwerk und Vertrauen:** erste zahlende Kollegen, Innung, Handwerkskammer ([[Direktansprache]], [[Anschreiben Handwerkskammern]]). Wer zuerst bei den Betrieben ist, gewinnt.
- **Laufende Pflege:** TAB ändern sich (Westnetz, BDEW-Musterwortlaut 2026). Ein Abo lebt von Aktualität, nicht vom Geheimnis.
- **Marke und Name** früh, sobald erste Kunden da sind.
- **Ehrlichkeit:** Ein Wettbewerber mit Budget und Fachwissen könnte aufholen. Der Schutz besteht darin, schneller und näher am Handwerk zu sein, nicht in Verboten.

## 6. Priorisierte Maßnahmen
| Prio | Maßnahme | Wer | Kosten | Aufwand | Wann |
|---|---|---|---|---|---|
| 1 | Arbeitsvertrag lesen (Nebentätigkeit, Wettbewerb, Verschwiegenheit), Fragenkatalog aus Abschnitt 4 | Nutzer | 0 € | 1–2 h | **vor erstem Euro**, möglichst diese Woche |
| 2 | Im Gespräch Ergebnisse zeigen, nicht die Regeltabelle; Tester nur persönlich, mit NDA-Hinweis | Nutzer | 0 € | – | sofort |
| 3 | NDA-/Testerhinweis-Entwurf (1 Seite) | Nachtschicht schreibt, Anwalt prüft | 0 € bis ca. 100–300 € Prüfung | 1 h | vor Mittesten durch Fremde |
| 4 | © Vermerk + `LICENSE` (proprietär) in App/Landingpage/Repo, GitHub-Sichtbarkeit privat prüfen | Nachtschicht / Nutzer | 0 € | 0,5 h | bald |
| 5 | **Regelwerk serverseitig** (Abschnitt 2) | Nachtschicht (Code) | 0 € | 0,5–1 Tag | **vor öffentlichem Hosting** |
| 6 | Login statt Zugangscode + Rate-Limit | Nutzer + Code | 0 € | 1–2 Tage | vor öffentlichem Betrieb |
| 7 | Namensprüfung DENIC/DPMA, dann Marke anmelden | Nutzer | ca. 290 € (nachprüfen) | 1–2 h | nach Namensprüfung, bei ersten Kunden |
| 8 | Erstberatung Anwalt: Arbeitgeber-Frage, Nutzungsbedingungen, Impressum/Datenschutz bündeln | Nutzer | grob 150–400 € (Festpreis erfragen) | 1 Termin | bevor Zahlungen fließen |
| 9 | Nutzungsbedingungen mit Reverse-Engineering-Verbot, Haftungsausschluss | Anwalt/Generator | 200–800 € | – | mit Bezahlmodell |

## Nicht empfohlen
- Patent/Gebrauchsmuster (Aufwand/Erfolgsaussicht).
- Regelwerk „verschleiern“ (Minifizierung allein): bringt nichts, nur Serverlogik schützt.
- Schutzmaßnahmen vor den Gesprächen priorisieren (Regel: Validierung zuerst, siehe [[2026-10-02 Ideen-Check]]).

## Offene Fragen für den Anwalt (Sammelliste)
1. Gehört mir die Idee/der Code, bzw. muss ich dem Arbeitgeber etwas anzeigen oder anbieten (Arbeitsvertrag, § 69b UrhG)?
2. Ist Nebentätigkeit mit Wettbewerbsbezug zulässig, was muss ich anzeigen?
3. Genügt eine einseitige NDA und Nutzungsbedingungen als „angemessene Geheimhaltungsmaßnahmen“ für das Regelwerk?
4. Marke: Klassen, Kollisionsrisiko „Zählerklar“?
5. Haftung bei falscher Einordnung durch die App und passende Versicherung?
6. Nutzung der Westnetz-Schulung und der TAB-Fundstellen im Regelwerk (Urheberrecht Dritter)?
