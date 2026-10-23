---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-10-23
---
# Schutz von Idee und App (Zählerklar)

> **Analyse, keine Rechtsberatung.** Alles mit 🔶 ist unsicher und gehört vor einer Entscheidung zu einem Anwalt (Fachanwalt für IT-/Urheberrecht bzw. Arbeitsrecht) oder Steuerberater. Gebühren sind Richtwerte aus dem Gedächtnis und vor Nutzung auf den Seiten von DPMA/Anwalt zu prüfen.

**Kurzfazit:** Die *Idee* ist nicht schützbar. Schützbar sind Code (automatisch), Name (Marke, wenig Geld) und das Regelwerk – aber nur, wenn man es **wie ein Geheimnis behandelt**. Genau das tut die App heute nicht: Das komplette Regelwerk steckt im Browser-Bundle. Der echte Schutz ist ohnehin Tempo, Netzwerk und Daten aus echten Fällen (siehe 5). Der Schutz darf die Validierung nicht bremsen ([[ADR-0001 Zählerschrank-App als Validierungswerkzeug]], „Erst verkaufen, dann bauen“).

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Einordnung |
|---|---|---|
| **Idee / Konzept** („Foto → Maßnahmenliste nach TAB“) | **keiner.** Urheberrecht schützt nur die konkrete Ausdrucksform, nicht den Gedanken. | Jeder darf dieselbe Idee umsetzen. Nicht ändern, nur einkalkulieren. |
| **Code, Texte, Grafiken** | Urheberrecht entsteht automatisch (§ 69a UrhG für Software). Keine Anmeldung nötig. | Hilft gegen 1:1-Kopieren, nicht gegen Nachbau mit eigenem Code. Nachweis: Git-Historie mit Zeitstempeln aufbewahren. |
| **Name „Zählerklar“** | **Marke** beim DPMA (Wortmarke). Schutz erst mit Eintragung; Kollisionsprüfung vorher ([[ADR-0006 Produktname Zählerklar]]). | Richtwert ca. 290 € Anmeldegebühr online für bis zu 3 Klassen (Klasse 9 Software, 42 Software-as-a-Service, ggf. 41/35), ~3 Monate Widerspruchsfrist 🔶. Domain `zaehlerklar.de` und Handle sichern ist billiger und dringender. Recherche zuerst (offene Aufgabe), Anmeldung erst bei Go. |
| **Regelwerk R01–R26** (Zuordnung Bedingung → Maßnahme → Fundstelle) | **Geschäftsgeheimnis** nach GeschGehG – *nur* mit „angemessenen Geheimhaltungsmaßnahmen“ (§ 2 Nr. 1 b). Teile des Inhalts sind öffentlich (TAB, VDE), geschützt wäre die **Auswahl, Verknüpfung und Bewertung**. Als Datenbank/Sammlung eventuell zusätzlich Urheber-/Datenbankschutz 🔶. | Ohne Geheimhaltungsmaßnahmen kein Schutz – siehe Befund unter 2. |
| **Patent / Gebrauchsmuster** | Computerprogramme „als solche“ sind nicht patentfähig (§ 1 Abs. 3 PatG), Gebrauchsmuster schließt Verfahren aus. | **Nicht sinnvoll:** Kosten vierstellig und mehr, lange Dauer, Erfolg fraglich 🔶. Kein Thema für diese Phase. |

**Wichtig – Reverse Engineering:** Wer ein öffentlich erhältliches Produkt rechtmäßig erwirbt oder nutzt, darf es nach GeschGehG § 3 Abs. 1 Nr. 2 grundsätzlich untersuchen, *außer* ein Vertrag verbietet es. Deshalb braucht es **Nutzungsbedingungen mit Verbot** (Abschnitt 3) – und dass der Kern gar nicht erst ausgeliefert wird (Abschnitt 2). 🔶 Wirksamkeit der Klausel (AGB-Recht, B2B) anwaltlich prüfen lassen.

## 2. Technischer Befund: Das Regelwerk liegt beim Nutzer
**Geprüft im Code (Stand `master`):**
- `web/src/regeln.json` (alle 26 Regeln mit Bedingung, Maßnahme, Stufe, Fundstelle, Geltung, Status) wird in `web/src/regelwerk.ts` per `import` eingebunden. `main.ts` ruft `bewerte(...)` **im Browser** auf.
- Vite bündelt das JSON ins JavaScript-Bundle. Jeder, der die App-URL öffnet, kann es über „Quelltext anzeigen“ / Netzwerk-Tab herunterladen. Auch `regelwerk.ts` (die Logik der Auslösung, also die Formeln aus dem Excel) ist im Bundle – minifiziert, aber lesbar.
- Der **Zugangscode (`APP_CODE`) schützt nur das Backend** (`/analyse`, `/faelle`). Das statische Bundle liegt – sobald bei Netlify gehostet – **öffentlich**, ohne Code.
- Das gilt auch für das Demo-Artifact (privat auf claude.ai, aber ein Link weitergegeben = alles weitergegeben).

**Bewertung des Risikos:**
| Aspekt | Einschätzung |
|---|---|
| Wahrscheinlichkeit, dass es jemand tut | heute **gering** (kein Markt bekannt, kein Konkurrent, App nicht online) – steigt mit Reichweite. |
| Schaden | **mittel bis hoch**: Das Regelwerk ist der eigentliche Vorsprung ([[Mein Vorteil]], Score „Vorsprung 5“). Kopiert werden kann es in Minuten. |
| Rechtlich | Wer das Bundle öffentlich ausliefert, hat das Regelwerk **nicht** angemessen geheim gehalten. Ein Geschäftsgeheimnisschutz wäre damit sehr schwach 🔶. |
| Gegenargument | Die Inhalte beruhen auf öffentlichen Normen/TAB. Ein Nachbauer müsste die *Auswahl* selbst erarbeiten – das Regelwerk ist aber genau diese Arbeit und mit Fundstellen praktisch fertig lesbar. |

**Lösungsskizze „Regelwerk serverseitig“:**
1. Neue Route `POST /bewerten` in der Edge Function (`supabase/functions/api/index.ts`): Body = `Eingaben`, Antwort = nur das **Ergebnis** (Ampel, ausgelöste Maßnahmen mit Text und Fundstelle, „Vor Ort klären“, Messkonzept). Das ganze Regelwerk bleibt auf dem Server.
2. `regeln.json` und die Auslöse-Logik wandern in `supabase/functions/api/` (z. B. `regelwerk.ts` geteilt oder dorthin verschoben). Die Excel-Vergleichstests (13 Tests) laufen weiter gegen dieselbe Logik, ggf. per gemeinsamem Modul.
3. App (`web/`): `bewerte()` ersetzt durch Aufruf an `/bewerten`; Bundle enthält **kein** `regeln.json` mehr. Prüfen, dass nach `npm run build` keine Regelnamen/Fundstellen mehr in `dist/` stehen (`grep`-Test als Teil der Abnahme).
4. Zugang nur mit Login/Code (bereits für das Backend vorgesehen, Aufgabe „Login statt Zugangscode“).
5. Folgen: ohne Netz keine Bewertung (der Offline-Modus ist ohnehin „erst nach Go“); jede Bewertung ist ein Serveraufruf (Supabase Free-Tier reicht); Latenz klein, da keine KI beteiligt.
6. **Restrisiko:** Wer einen Zugang hat, kann das Regelwerk durch systematisches Durchprobieren von Eingaben nachbauen (Black-Box). Gegenmittel: Rate-Limit pro Zugang, Zugang nur für bekannte Tester, Protokoll auffälliger Abfragen, Nutzungsbedingungen. Vollständig verhindern lässt sich das nicht.

**Übergangsregel bis zur Umsetzung:** Die App **nicht öffentlich hosten** und den Bundle-Link nicht an Unbekannte geben. Die Landingpage (nur Texte, keine Regeln) kann vorab online gehen. Mit den bekannten Testern (siehe 3) die App erst laufen lassen, wenn NDA steht oder „Regelwerk serverseitig“ erledigt ist. Das kollidiert mit dem Plan „Netlify → App online“ – siehe Aufgabenliste, bewusst offen angesprochen.

## 3. Verträge und Zugang
- **NDA / Geheimhaltung für Tester und Kollegen:** kurzes, einseitiges Dokument (1–2 Seiten): was vertraulich ist (Regelwerk, Testversion, Ergebnisse), Zweck (Testen), Dauer, Rückgabe/Löschung, Vertragsstrafe nur wenn anwaltlich vorgeschlagen 🔶. Vorlage eines Anwalts oder der Handwerkskammer/Innung nutzen, nicht frei erfundene Klauseln. Zweiter Effekt: gehört zu den „angemessenen Geheimhaltungsmaßnahmen“.
- **Nutzungsbedingungen / AGB der App:** Nutzungsrecht nur zum eigenen Gebrauch, kein Kopieren, Scrapen, Reverse Engineering, keine Weitergabe des Zugangs, Haftungshinweis („ersetzt nicht die Prüfung durch die Elektrofachkraft“). Passt zu [[Rechtliches]]. 🔶 anwaltlich prüfen.
- **Zugang nur mit Login:** persönlicher Zugang je Tester statt gemeinsamem `APP_CODE` – dann ist nachvollziehbar, wer was abgerufen hat (und abschaltbar). Bereits unter „Irgendwann“ eingetragen; durch diese Analyse eher **vor** „Kollegen testen“ als danach.
- **Kennzeichnung:** Hinweis „vertraulich“ in der App und im Regelwerk-Export; kein CSV-Export des Regelwerks, nur der Fälle.
- **Auftragsverarbeitung** (Supabase, Anthropic) bleibt eigenes Thema in [[Rechtliches]].

## 4. 🔶 Arbeitgeber-Frage (offen für Anwalt / Steuerberater)
Der Gründer arbeitet im Elektrohandwerk (Angestellter?). Offene Fragen, nicht beantwortet:
1. **Wem gehört das Ergebnis?** Bei Programmen, die ein Arbeitnehmer in Wahrnehmung seiner Aufgaben oder nach Weisung schafft, stehen die Nutzungsrechte nach § 69b UrhG dem Arbeitgeber zu. Gilt das hier, wenn Fachwissen und Fälle aus der Arbeit stammen, der Code aber in der Freizeit entsteht? Ist das Regelwerk (Wissenssammlung) überhaupt „Programm“?
2. **Betriebs- und Geschäftsgeheimnisse des Arbeitgebers:** Stammen Fälle, Fotos, Kundendaten, interne Vorlagen oder Schulungsunterlagen vom Arbeitgeber? Dann nicht ohne Erlaubnis verwenden. Fotos von Kundenanlagen enthalten zudem personenbezogene Daten (vgl. Aufgabe „Fotos ohne Adresse, Namen, Zählernummer“).
3. **Nebentätigkeit / Wettbewerbsverbot:** Im bestehenden Arbeitsverhältnis gilt Treuepflicht; ein Produkt für Elektrobetriebe könnte als Konkurrenz zum Arbeitgeber gelten. Ist eine Anzeige oder Genehmigung der Nebentätigkeit im Arbeitsvertrag vorgeschrieben? Steht eine Klausel zu Erfindungen/Ideen im Arbeitsvertrag?
4. **Arbeitnehmererfindungsgesetz:** Für patentfähige Erfindungen relevant (Diensterfindung/freie Erfindung); bei dieser Software-Idee voraussichtlich kaum, aber im selben Gespräch mit klären.
5. **Arbeitszeit/-mittel:** Nichts auf Firmen-Laptop/-Handy, nicht in der Arbeitszeit entwickeln oder Tester im Betrieb ansprechen, solange nicht geklärt.
6. **Steuerlich:** Gewerbeanmeldung, Kleinunternehmer, Einkünfte aus Nebentätigkeit – Steuerberater (nur genannt, weil es zum selben Termin passt).

**Nächster Schritt:** Arbeitsvertrag selbst lesen (Nebentätigkeit, Erfindungen/Urheberrechte, Verschwiegenheit, Wettbewerb), Fragen oben notieren und in **einem** Erstgespräch (Anwalt oder Beratungsstelle der Handwerkskammer/IHK, oft günstig) klären. Das gehört **vor** Gründung und vor Verkauf.

## 5. Realistischer Schutz: Tempo, Netzwerk, Daten
Rechtlicher Schutz schützt kaum vor einem schnellen Nachbau; er schützt vor 1:1-Kopie und vor Streit um den Namen. Was bei kleinen Produkten wirklich trägt:
- **Vorsprung:** Fachwissen, Regelwerk-Tiefe, Pilot Westnetz. Ein Nachbauer braucht Monate, um 26 belegte Regeln zu reproduzieren (siehe offene Belege R07, R09, R11, R19 – hier liegt der Wert, nicht im Code).
- **Netzwerk:** Direktansprache, Innung, Handwerkskammer, Kollegen ([[Direktansprache]], [[ADR-0005 Direktansprache vor Instagram]]) – Vertrauen lässt sich nicht kopieren.
- **Daten aus echten Fällen:** Jeder erfasste Fall mit tatsächlicher Entscheidung verbessert Trefferquote und Regeln. Die gesammelten Fälle sind (wenn sauber erfasst) das wertvollste, nicht kopierbare Gut – deshalb Fotos/Fälle ohne Personenbezug sammeln und sauber speichern.
- **Aktualität:** Neue TAB-Fassungen zügig einarbeiten (Aufgabe „Westnetz-TAB nach BDEW-Musterwortlaut 2026 beobachten“). Ein Regelwerk, das aktuell bleibt, veraltet nicht beim Kopierer.
- **Marke und Domain:** früh sichern, damit Suche und Empfehlung beim Original landen.
- **Öffentlichkeit steuern:** Auf Instagram/Landingpage Nutzen zeigen, nicht Regeln im Detail. Beispiele ja, vollständige Regelliste nein.

## 6. Maßnahmenliste (priorisiert)
| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | **Arbeitsvertrag lesen**, Fragen aus Abschnitt 4 sammeln | 0 € | 1 h | sofort, vor dem Hosting |
| 2 | App nicht öffentlich hosten; Landingpage zuerst; Bundle-Link nicht streuen | 0 € | 0 | sofort |
| 3 | `zaehlerklar.de` + Handle sichern, DPMA-Recherche (liegt schon in „Jetzt“) | ca. 10 €/Jahr Domain; Recherche kostenlos | 1–2 h | diese Woche |
| 4 | **Erstgespräch Anwalt/Beratung** (Arbeitgeber-Frage, NDA, Nutzungsbedingungen) | grob 100–300 € 🔶 | 2 h + Termin | vor Betrieb mit Kollegen |
| 5 | **NDA** für Tester/Kollegen (Vorlage vom Anwalt) | im Termin enthalten / 0 € | 1 h | vor dem Mittesten mit Regelwerk-Zugriff |
| 6 | **Regelwerk serverseitig** (Code-Aufgabe, `/bewerten`, kein `regeln.json` im Bundle) | 0 € | ca. 1 Abend | vor dem öffentlichen Hosting der App |
| 7 | Nutzungsbedingungen der App (kein Kopieren/Reverse Engineering) | ca. 200–500 € bei Anwalt, sonst Generator 🔶 | 2–3 h | vor Go / vor zahlenden Kunden |
| 8 | Login je Tester statt gemeinsamem Code, Rate-Limit | 0 € | 1–2 Abende | vor Testphase mit Kollegen außerhalb des engen Kreises |
| 9 | Marke „Zählerklar“ beim DPMA anmelden | ca. 290 € 🔶 | 1 h | erst bei Go (Validierung zuerst) |
| 10 | Patent/Gebrauchsmuster | – | – | **nicht** verfolgen |

**Priorität im Vergleich zur Validierung:** Nur 1, 2, 3 sind kostenlos und kommen sofort. Die Gespräche mit Kollegen ([[Gesprächsleitfaden]]) laufen weiter vor allem anderen – sie brauchen keinen Code und kein Regelwerk. Punkt 6 ist die einzige Code-Maßnahme und wird *vor* dem öffentlichen Hosting nötig, nicht vor den Gesprächen.

## Offene Fragen
- 🔶 Arbeitsvertrag und Rechte (Abschnitt 4)
- 🔶 Wirksamkeit der Reverse-Engineering-Klausel und Reichweite des Geschäftsgeheimnisschutzes bei bereits öffentlich einsehbarem Regelwerk
- 🔶 Marken-Kosten und -Klassen aktuell beim DPMA prüfen
