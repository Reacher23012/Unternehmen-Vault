---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-11-17
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App („Zählerklar“)

> **Keine Rechtsberatung.** Das ist eine Sortierung der Fragen aus Sicht eines Mitgründers. Alles mit **⚖ Anwalt** ist unsicher und muss vor einer Entscheidung geprüft werden. Kostenangaben sind grobe Größenordnungen, bitte vor Ausgabe aktuell nachsehen.

## Kurzfassung
1. Die **Idee** ist nicht schützbar. Schutzfähig sind nur Code, Texte, Name und – mit Vorbehalt – das Regelwerk als Geschäftsgeheimnis.
2. **Größte echte Lücke:** Das gesamte Regelwerk (`regeln.json` + `regelwerk.ts`) steckt im Browser-Bundle der App. Wer die App öffnet, kann es lesen und kopieren. Als „Geschäftsgeheimnis“ zählt es dann kaum noch. → serverseitig auslagern (siehe 2.).
3. **Offene Frage mit dem größten Risiko:** Wem gehört das Ganze, wenn es neben einer Anstellung im Elektrohandwerk entstanden ist? ⚖ Anwalt, **vor** dem Verkauf klären (siehe 4.).
4. Der beste Schutz ist realistisch **Tempo + Netzwerk + echte Falldaten** (siehe 5.), nicht Papier. Und: Es gibt noch keinen Beleg, dass jemand die Idee klauen *will*. Erst die 5 Gespräche ([[Validierung & Go-No-Go]]), dann Schutzmaßnahmen nach Aufwand.

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Was das bringt | Kosten / Aufwand (grob) |
|---|---|---|---|
| **Idee** („Foto → Einordnung nach TAB“) | **keiner**. Ideen sind frei. | – | – |
| **Quellcode, Texte, Grafiken** | Urheberrecht (§ 69a UrhG für Software), entsteht automatisch, keine Anmeldung | Verbietet 1:1-Kopieren, nicht das Nachbauen mit eigenem Code | 0 €; Beweis sichern: Git-Verlauf + Zeitstempel behalten |
| **Name „Zählerklar“** | Marke beim DPMA (Wortmarke); alternativ nur Geschäftsbezeichnung bei tatsächlicher Benutzung | Verbietet Verwechslungsnamen; **Prüfung zuerst** (Recherche, Namensähnlichkeit) | DPMA-Anmeldegebühr für Wortmarke grob 290 € (bis 3 Klassen, Online), plus ggf. Anwalt für Recherche; Dauer Monate. Siehe [[ADR-0006 Produktname Zählerklar]] |
| **Domain** `zaehlerklar.de` | Wer zuerst registriert (DENIC) | Verhindert Namens-Squatting | ~1–10 €/Jahr |
| **Regelwerk / Know-how** | **Geschäftsgeheimnisgesetz (GeschGehG)**: nur geschützt, wenn Information **geheim, wirtschaftlich wertvoll** ist **und** der Inhaber **angemessene Geheimhaltungsmaßnahmen** getroffen hat (§ 2 Nr. 1 GeschGehG) | Unterlassung/Schadenersatz bei rechtswidriger Beschaffung. **Ohne Maßnahmen: kein Schutz.** Der aktuelle Stand (alles im Browser) ist keine angemessene Maßnahme. | Maßnahmen siehe 2./3.; Aufwand Code + Verträge |
| **Patent** | Software „als solche“ ist nicht patentierbar; nur technische Erfindung mit technischem Effekt. Ein Regelwerk für Zählerschränke ist **sehr wahrscheinlich nicht** patentfähig | – | Patent: mehrere Tausend €; **nicht empfohlen** ⚖ Anwalt/Patentanwalt nur falls jemand das anders sieht |
| **Gebrauchsmuster** | Gilt für Software ebenfalls nicht (Programme als solche ausgeschlossen) | – | nicht empfohlen |
| **Datenbankrecht** (§ 87a UrhG) | Schutz für Datenbanken mit wesentlicher Investition | Betrifft eher die gesammelten Fälle/Fotos später | ⚖ Anwalt, nachrangig |

**Wichtig zu den Quellen des Regelwerks:** Die Regeln beruhen auf TAB, BDEW-Musterwortlaut, DIN/VDE und Westnetz-Schulung. Wir übernehmen nur Fundstellen, keine Normtexte (→ [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]). Heißt auch: **Die Rohquellen sind öffentlich/käuflich für jeden.** Schützenswert ist nur die **Auswahl, Verknüpfung und Aufbereitung** (Entscheidungslogik) – und die ist auch dann nicht „geheim“, wenn Kollegen selbst Normen lesen. Erwartung realistisch halten.

## 2. Technischer Befund: Regelwerk liegt im Browser
**Befund (am Code geprüft, 17.11.2026):**
- `web/src/regeln.json` (14 KB; alle 26 Regeln mit Bedingung, Maßnahme, Stufe, **Fundstelle**, Geltung, Status) wird von `web/src/regelwerk.ts` importiert und von `web/src/main.ts` aufgerufen (`bewerte`).
- Vite bündelt beides in die ausgelieferte JS-Datei. Die App läuft komplett im Browser (der Server liefert nur KI-Analyse und Fall-Speicher).
- **Folge:** Jeder, der die App-URL aufrufen kann, kann das gesamte Regelwerk mit „Quelltext anzeigen“/Entwicklerwerkzeugen auslesen. Der Zugangscode schützt nur die Edge-Function-Routen, **nicht** die ausgelieferte App und das darin enthaltene Regelwerk. Außerdem enthält der Demo-Build (`dist-artifact`) das Regelwerk ebenfalls.
- Auch ein Login würde nur helfen, wenn die **App-Dateien selbst** hinter dem Login liegen oder das Regelwerk gar nicht ausgeliefert wird.

**Risiko-Bewertung:**
| Aspekt | Einschätzung |
|---|---|
| Wahrscheinlichkeit, dass ein Konkurrent es abgreift | niedrig, solange die App nur für wenige Tester läuft und die URL nicht bekannt ist; steigt mit Reichweite (Instagram, Flyer, Warteliste) |
| Schaden | mittel: das Regelwerk ist der „Vorsprung“ im [[Zählerschrank-Check#Score (vorläufig, 03.10.2026)|Score]] (5/5). Wer es kopiert, hat Fachlogik + Fundstellen sofort. Die KI-Erkennung und die Falldaten bleiben aber serverseitig/bei uns |
| Juristisch | Ohne Geheimhaltungsmaßnahmen kaum Schutz nach GeschGehG (siehe 1.) |
| Reverse Engineering verbieten | per Nutzungsbedingungen möglich, aber nur gegenüber Vertragspartnern; ein Verbot hält Böswillige nicht auf |

**Lösungsskizze „Regelwerk serverseitig“:**
1. `bewerte(eingaben)` und `regeln.json` in die Edge Function `api` verlegen (neue Route, z. B. `POST /bewerte`, **mit** `x-app-code` bzw. später Login).
2. App sendet nur die Eingaben (die 12 Felder + Vorhaben/Netzform/HA-Sicherung/Erdung/Datenleitung), bekommt nur das **Ergebnis** zurück: Ampel, Maßnahmen (Text + **Fundstelle**), „Vor Ort klären“, Hinweise, Messkonzept. Kein Rückgabe der kompletten Regelliste.
3. `regeln.json` bleibt als Quelle im Repo, wird aber nur in die Function gebündelt, **nicht** ins Web-Bundle (Import aus `web/src` entfernen, ggf. Ordner `supabase/functions/api/` oder gemeinsames Paket außerhalb von `web/`). Die Tests (`regelwerk.test.ts`) laufen weiter gegen dieselbe Logik.
4. Offline: Der Funkloch-Schutz (Fälle lokal + Nachsenden) betrifft heute nur das Speichern. Mit serverseitiger Bewertung braucht das Ergebnis **Netz**; Kompromiss: letzte Bewertung lokal zwischenspeichern, neue Bewertung nur online. Bewusst entscheiden, ob das für den Baustelleneinsatz reicht (Funkloch im Keller!).
5. Kosten/Limits: Edge Function Free Tier, kurze Rechenzeit, 150-s-Limit gilt nicht kritisch. Rate-Limit auf Route ergänzen (Scraping der Regeln durch systematisches Abfragen von Eingabe-Kombinationen bleibt möglich → siehe Restrisiko).
6. **Restrisiko:** Ein Angreifer mit Zugang kann die Regeln durch viele Testeingaben ableiten (Black-Box). Das kostet Aufwand und ist ohne Zugang nicht möglich. Dagegen helfen Login, Rate-Limit und Nutzungsbedingungen, nicht Technik allein.
7. Demo-Build (`build:demo`) enthält Regelwerk und Beispieldaten: nur privat teilen, nicht öffentlich hosten.

## 3. Verträge und Zugang
| Baustein | Inhalt | Wann |
|---|---|---|
| **NDA für Tester/Kollegen** (einseitig, kurz) | Vertraulichkeit über Regelwerk-Ergebnisse, Logik, Zugangsdaten; Weitergabeverbot; Laufzeit; Vertragsstrafe nur wenn Anwalt rät. Wichtig: Klausel muss zum GeschGehG passen („angemessene Geheimhaltungsmaßnahmen“) | ⚖ Anwalt prüfen, **vor** den ersten Testern mit App-Zugang (die Gespräche selbst brauchen kein NDA, da kein Regelwerk offengelegt wird) |
| **Nutzungsbedingungen** (AGB light) | Nutzungsrecht nur für eigenen Betrieb, **kein Kopieren, Scrapen, Reverse Engineering**, kein Weitergeben des Zugangs, Haftungsbegrenzung („ersetzt keine Prüfung durch den Errichter“) | ⚖ Anwalt; AGB-Recht im B2B beachten (Haftungsausschluss nicht beliebig wirksam) |
| **Zugang nur mit Login** | Pro Tester eigener Zugang statt gemeinsamer `APP_CODE`; Login auch fürs Abrufen der App-Daten. Siehe [[Aufgaben]] „Login statt Zugangscode, bevor Kollegen testen“ | vor Kollegen-Test |
| **Auftragsverarbeitung** | Supabase, Anthropic, Netlify – gehört zu [[Rechtliches]], nicht zum Ideenschutz, aber gleiche Baustelle | vor Betrieb mit Kollegen |

## 4. Arbeitgeber-Frage (offen, ⚖ Anwalt/Steuerberater)
Sachverhalt aus dem Vault: Der Gründer arbeitet im Elektrohandwerk ([[Mein Vorteil]]); das Fachwissen, die Excel-Entscheidungsbaum-Idee und Regelwerk stammen aus dieser Tätigkeit. **Ob und wie das beim Arbeitgeber liegt, ist hier nicht bekannt.** Zu klären:
- **Arbeitsvertrag:** Nebentätigkeits-Klausel (Anzeige-/Genehmigungspflicht)? Wettbewerbsverbot (während des Arbeitsverhältnisses gilt ein Wettbewerbsverbot ohnehin, § 60 HGB analog / Treuepflicht)? Ist der Arbeitgeber selbst Kunde/Konkurrent der Zielgruppe (Elektrobetriebe)?
- **Urheberrecht an Software:** Bei Arbeitnehmern gehen Nutzungsrechte an Software, die **in Wahrnehmung der Aufgaben oder nach Weisung** des Arbeitgebers entsteht, auf diesen über (§ 69b UrhG). Entsteht der Code ausschließlich in der Freizeit, mit eigenen Mitteln und ohne Bezug zu Dienstaufgaben, spricht viel für eigene Rechte – **aber** Abgrenzung ist einzelfallabhängig. ⚖
- **Arbeitnehmererfindungsgesetz:** Gilt für patent-/gebrauchsmusterfähige Erfindungen; Software als solche meist nicht. Wenn doch: Meldepflicht an den Arbeitgeber. ⚖
- **Know-how aus dem Betrieb:** Betriebsinterne Unterlagen, Kundenfotos, interne Kalkulationen, Schulungen des Arbeitgebers nicht ohne Erlaubnis verwenden. **Fotos von Schränken** aus Kundenaufträgen: Rechte/Datenschutz beachten (→ [[Bildrechte im Marketing]]).
- **Nebentätigkeit/Gewerbe:** Gewerbeanmeldung, Steuer, Krankenkasse/Haftpflicht-Folgen (Steuerberater).
- **Praktischer Ablauf:** Vertrag lesen → mit Anwalt/Fachanwalt für Arbeitsrecht ein kurzes Erstgespräch (oft pauschal, grob 100–250 € bei Beratungsstelle/Anwalt, unverbindlich recherchieren) → schriftliche Freigabe des Arbeitgebers einholen, falls nötig. **Das hängt an der Entscheidung, ob man offen oder diskret vorgeht; das ist keine technische Frage.**
- Relevanz: Entscheidend für alles ab „Geld verlangen“ und für Investoren/Käufer. Bei Diskussionen unter Kollegen vor dem Gespräch beachten.

## 5. Realistischer Schutz: Tempo statt Papier
- **Vorsprung:** Die Fachlogik ist nicht geheim, aber **aufwendig** und braucht Fachwissen. Kopierer müssen sie erst verstehen und aktuell halten. Ein Netzbetreiberwechsel (z. B. neue Westnetz-TAB, BDEW-Wortlaut 2026) muss laufend eingearbeitet werden → **Pflege ist der Burggraben**, nicht der Stand von heute.
- **Netzwerk:** Direktansprache bei Kollegen, Innung, Handwerkskammer ([[Direktansprache]], [[Anschreiben Handwerkskammern]]). Vertrauen schlägt Kopie.
- **Echte Falldaten:** Je mehr bewertete Fälle (Foto + Entscheidung), desto besser Treffer- und Erkennungsquote. Daten liegen serverseitig, nicht im Browser. Das ist der längerfristig härteste Vorteil. Datenschutz/Einwilligung beachten ([[Rechtliches]]).
- **Name/Marke:** Wer zuerst bekannt ist unter „Zählerklar“, behält ihn faktisch. Marke sichert das ab (siehe 1.).
- **Nicht übertreiben:** Zu viel Geheimniskrämerei kostet Tester. Das Ziel ist, Schaden zu begrenzen, nicht Kopieren auszuschließen.

## 6. Priorisierte Maßnahmenliste
Reihenfolge nach Nutzen im Verhältnis zu Aufwand. Passend zu [[Ideen-System]]: **erst validieren, Schutz dann in Stufen.** Die Aufgaben stehen auch in [[Aufgaben]].

| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | Arbeitsvertrag lesen, Arbeitgeber-Frage (4.) klären, ggf. Erstberatung Arbeitsrecht ⚖ | ca. 0–250 € | 1–2 h + Termin | **vor dem ersten Euro / vor App-Zugang für Kollegen**; sofort lesen |
| 2 | Name prüfen (DENIC, DPMA-Recherche), `zaehlerklar.de` sichern | ~10 € Domain; Recherche selbst im DPMA-Register kostenlos | 1 h | steht schon in [[Aufgaben]] (Jetzt) |
| 3 | **Regelwerk serverseitig** (Code, 2.) | 0 € | 1–2 Tage | **vor öffentlichem Hosting** (Netlify) |
| 4 | Login statt Zugangscode, Rate-Limit | 0 € | 1–2 Tage | vor Kollegen-Test |
| 5 | NDA + Nutzungsbedingungen von Anwalt/Muster prüfen lassen ⚖ | grob 150–500 € je nach Umfang | 2–3 h | vor Kollegen-Test mit App-Zugang |
| 6 | Git-Verlauf sichern (Repo privat, Backup), keine Schlüssel im Code | 0 € | 30 Min | sofort |
| 7 | Demo-Build nicht öffentlich hosten; Weitergabe nur privat | 0 € | – | laufend |
| 8 | Wortmarke „Zählerklar“ beim DPMA anmelden | grob 290 € + ggf. Anwalt für Recherche | 1–2 h | **erst nach** Go/No-Go und bestandener Namensprüfung |
| 9 | Falldaten-/Einwilligungskonzept (Fotos, Auswertung) | – | 1 Tag | vor Betrieb mit Kollegen, zusammen mit [[Rechtliches]] |
| 10 | Patent/Gebrauchsmuster | mehrere Tsd. € | – | **nicht** verfolgen, außer Patentanwalt rät dazu |

## Offene Fragen für Anwalt / Steuerberater (Sammelliste)
1. Arbeitsvertrag: Nebentätigkeit, Wettbewerb, § 69b UrhG – was gilt für **meinen** Fall?
2. Sind die Regelwerks-Texte (Zusammenfassung von TAB/BDEW/Westnetz-Schulung inklusive Fundstellen) als eigene Leistung nutzbar, ohne Rechte der Verbände/Netzbetreiber zu verletzen?
3. Wortlaut NDA und Nutzungsbedingungen für B2B-Tester (GeschGehG-konform)?
4. Reicht „Zugang nur mit Login + Nutzungsbedingungen“ als „angemessene Geheimhaltungsmaßnahme“?
5. Haftung bei falscher Einordnung („ersetzt keine Prüfung vor Ort“): Haftpflichtversicherung nötig?
6. Gewerbeanmeldung/Steuer für Nebentätigkeit (Steuerberater).

## Verknüpft
[[Zählerschrank-Check]] · [[App & Technik]] · [[Rechtliches]] · [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]] · [[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]] · [[ADR-0006 Produktname Zählerklar]] · [[Mein Vorteil]]
