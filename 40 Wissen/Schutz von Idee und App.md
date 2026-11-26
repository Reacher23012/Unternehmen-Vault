---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-11-26
status: analyse – keine Rechtsberatung, offene Punkte vom Anwalt prüfen lassen
---
# Schutz von Idee und App (Zählerklar)

> **Keine Rechtsberatung.** Das ist eine Analyse zur Orientierung. Alles, was mit „⚖ Anwalt“ markiert ist, ist unsicher und sollte vor einer Entscheidung geprüft werden. Bezug: [[Zählerschrank-Check]], [[App & Technik]], [[ADR-0006 Produktname Zählerklar]].

## Kurzfassung
1. **Die Idee selbst ist nicht schützbar.** Wer abschaut, darf nachbauen. Schützbar sind nur konkrete Ausdrucksformen (Code, Texte, Name) und Geheimnisse, die man tatsächlich geheim hält.
2. **Größtes echtes Risiko:** Das komplette Regelwerk (`regeln.json`, R01–R26 mit Bedingungen, Maßnahmen, Fundstellen) wird mit der App in den Browser des Nutzers ausgeliefert. Wer die App öffnet, kann es in zwei Minuten kopieren. Das ist zugleich das Kernstück des Vorsprungs (siehe [[Mein Vorteil]]).
3. **Realistischer Schutz ist Tempo, Netzwerk und Daten aus echten Fällen**, nicht Paragrafen. Rechtliche Mittel sind Beiwerk.
4. Es gibt eine **offene Arbeitgeber-Frage**, die vor jeder Investition geklärt werden sollte (Abschnitt 4).

## 1. Was ist in Deutschland überhaupt schützbar?
| Gegenstand | Schutz | Einschätzung für Zählerklar |
|---|---|---|
| **Idee / Geschäftskonzept** („Foto → KI → Regelwerk → Maßnahmenliste“) | kein Schutz | Nicht schützbar. Jeder darf dieselbe Idee umsetzen. |
| **Quellcode, Texte, Grafiken** | Urheberrecht (§§ 2, 69a UrhG), entsteht automatisch, keine Anmeldung | Schützt nur vor Kopieren des Codes, nicht vor Nachbau mit eigenem Code. Nützlich als Grundlage für Nutzungsbedingungen. |
| **Regelwerk als Sammlung** | ggf. Datenbank-/Sammlungsschutz (§§ 87a ff. UrhG), Schöpfungshöhe unklar; die zugrunde liegenden Normen und TAB sind fremd | ⚖ Anwalt: Reichweite unklar. Die einzelnen Regeln (Fachwissen) sind kaum schützbar, die konkrete Auswahl/Struktur eher. |
| **Fundstellen, Normtexte** | fremdes Urheberrecht (DIN, VDE, BDEW, Westnetz) | Bleibt wie in [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]: nur Fundstellen, keine Normtexte kopieren. Das schützt auch uns. |
| **Name „Zählerklar“ / Logo** | Marke beim DPMA, Kosten Online-Anmeldung ca. 290 € für bis zu 3 Klassen (Stand: Wissen, bitte aktuell prüfen), Schutz ab Eintragung, Prüfung auf ältere Rechte ist Sache des Anmelders | Sinnvoll **erst nach** Namensrecherche und nach Go (siehe [[Aufgaben]]: DENIC/DPMA-Recherche). Bis dahin schützt eine Benutzung im geschäftlichen Verkehr nur eingeschränkt (Benutzungsmarke / Werktitel, ⚖ Anwalt). |
| **Geschäftsgeheimnis** (z. B. das Regelwerk, solange nicht öffentlich) | Geschäftsgeheimnisgesetz (GeschGehG): nur geschützt, wenn **angemessene Geheimhaltungsmaßnahmen** getroffen sind (§ 2 Nr. 1 b) | Zentral. Ein Regelwerk, das jeder im Browser lesen kann, erfüllt diese Voraussetzung nicht. Rechtmäßiges Reverse Engineering ist nach § 3 GeschGehG ausdrücklich erlaubt, wenn nichts anderes vertraglich vereinbart ist. |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist nicht patentierbar, technische Erfindungen schon; Gebrauchsmuster für Programme ausgeschlossen | Für diese Art Regelwerk-App praktisch aussichtslos und teuer. Nicht verfolgen. ⚖ Anwalt nur, falls später ein technisch neuartiger Teil entsteht (z. B. Bilderkennungsverfahren). |

## 2. Technischer Befund: Regelwerk liegt im Browser
**Befund (am Code geprüft, Zweig `master`, Stand 26.11.2026):**
- `web/src/regelwerk.ts` importiert `./regeln.json` direkt (`import regelnJson from "./regeln.json"`), und `bewerte()` / `ausgeloesteRegeln()` laufen komplett im Client (`main.ts`, `demo.ts`).
- Beim Build landet das Regelwerk samt **Bedingungen, Maßnahmen, Fundstellen und der Auswertungslogik** im JavaScript-Bundle (ca. 14 KB Regeltexte plus die Formeln in `regelwerk.ts`).
- Die Edge Function (`supabase/functions/api/index.ts`) kennt nur `/analyse` (Foto → Vorschlag), `/faelle`, `/warteliste`. Sie wertet **keine** Regeln aus.

**Bewertung des Risikos**
- Jeder, der die App-URL kennt, kann das Regelwerk lesen (Browser-Entwicklerwerkzeuge) und 1:1 kopieren. Mit KI-Werkzeugen geht das heute in Minuten.
- Heute ist das Risiko **klein**: Die App ist nicht online, ist durch Zugangscode nur für Einzelnutzer gedacht, und die Konkurrenz ist nicht bekannt. Sobald Landingpage + App öffentlich laufen und Tester dazukommen, steigt es.
- Rechtlich ist es doppelt schlecht: Ohne technische Hürde fehlt der „angemessene Geheimhaltungsschutz“ nach GeschGehG. Ein Kopierer könnte sich auf offen zugängliche Informationen berufen.
- Gegengewicht: Der **Wert** liegt weniger im Text der 26 Regeln als im Pflegen, Belegen, Aktualisieren (neue TAB, Westnetz-Vorgaben) und in der Datenbasis echter Fälle. Das kann nicht per Browser-Kopie mitgenommen werden.

**Lösungsskizze: Regelauswertung serverseitig**
1. `regeln.json` und die Auswertung (`ausgeloesteRegeln`, `schlimmsterFall`, `bewerte`) in die Edge Function verlegen (oder in ein eigenes Modul, das in Funktion und Test geteilt wird, ohne es ins Client-Bundle zu ziehen).
2. Neue Route `POST /bewerte`: Eingaben rein (Schrankfelder + Vorhaben), Antwort enthält nur das **Ergebnis**: Ampel, ausgelöste Maßnahmen mit Fundstelle, „Vor Ort klären“, Hinweise. Nicht die gesamte Regelliste, keine Bedingungstexte, keine Gewichtung.
3. Client behält nur Typen und Anzeige. Tests laufen weiter gegen die ausgelagerte Logik (die 13 Tests, u. a. Excel-Beispielzeile).
4. Zugang nur mit Login (siehe Abschnitt 3) und Rate-Limit pro Konto, damit niemand durch Massenabfrage das Regelwerk „abtastet“.
5. Offline-Fähigkeit geht dabei verloren (ist ohnehin „erst nach Go“, siehe [[App & Technik]]). Auf der Baustelle ohne Netz bleibt die vorhandene Nachsende-Logik für Fälle, aber die Bewertung braucht Netz. **Das ist ein echter Produkt-Kompromiss**, kein reiner Gewinn.
6. Grenze ehrlich benennen: Auch serverseitig kann jemand mit vielen Testfällen das Regelverhalten nachbilden. Es macht das Kopieren **aufwendiger und vertragswidrig nachweisbar**, nicht unmöglich.

**Einordnung nach [[Ideen-System]]:** Das ist Infrastruktur und gehört nicht vor die Validierung (5 Gespräche, 20 Fälle). Sie wird fällig, **bevor die App öffentlich gehostet oder an Fremde gegeben wird**. Für den privaten Test mit 4 vertrauten Kollegen reicht Abschnitt 3 (NDA/Bedingungen).

## 3. Verträge und Zugang
- **Geheimhaltung (NDA) für Tester/Kollegen:** kurze, einseitige Vereinbarung („Regelwerk, Bewertungslogik und Zugangsdaten vertraulich, keine Weitergabe, keine Vervielfältigung“). Wichtig: Sie hilft auch beim Merkmal „angemessene Geheimhaltungsmaßnahmen“. Vorlage vom Anwalt prüfen lassen (⚖), nicht aus dem Netz übernehmen.
- **Nutzungsbedingungen / AGB für die App:** Nutzungsrecht nur für eigene geschäftliche Zwecke, kein Kopieren, kein systematisches Auslesen, kein Reverse Engineering (soweit zulässig; § 69e UrhG erlaubt Dekompilierung nur eng begrenzt, ⚖), Haftungsrahmen: „Ersteinschätzung, Prüfung durch Elektrofachkraft erforderlich“ (passt zu den Hinweisen unter [[Zählerschrank-Check#Weitere Zielgruppen (Hypothesen, 04.10.2026)]]). Gehört zu [[Rechtliches]].
- **Zugang nur mit Login:** Heute gibt es einen gemeinsamen `APP_CODE` (Einzelnutzer) und kein Rate-Limit (bekannt, siehe [[App & Technik]]). Ein gemeinsamer Code lässt sich weitergeben, ohne dass man es merkt. Bessere Lösung: Supabase Auth (E-Mail-Login), ein Konto je Tester, Widerruf möglich, Zugriffe nachvollziehbar. Steht bereits als „Irgendwann: Login statt Zugangscode“ in [[Aufgaben]] und wird durch dieses Thema vorgezogen, sobald Fremde testen.
- **Datenschutz-Nebenthema:** Je Konto werden E-Mail und Fotos verarbeitet. Das geht in die Datenschutzerklärung (⚖ prüfen lassen).

## 4. Arbeitgeber-Frage (offen, ⚖ Anwalt / Steuerberater)
Die Idee entstand im Umfeld der Tätigkeit im Elektrohandwerk. Daraus folgen Fragen, die ich **nicht** beantworten kann:
- **Gehört dem Arbeitgeber etwas?** Das **Arbeitnehmererfindungsgesetz** betrifft Erfindungen (patent-/gebrauchsmusterfähig), bei reiner Software/Regelwerk meist nicht. Urheberrecht an Software, die im Rahmen der Arbeitspflichten entsteht, geht nach § 69b UrhG auf den Arbeitgeber über. Wichtig ist daher: **Wurde die App in der Freizeit, mit eigenem Gerät und ohne Arbeitsmittel entwickelt, und gehört sie nicht zu den Aufgaben?** Das Regelwerk speist sich aus Fachwissen, aber auch aus Schulungen/Unterlagen (z. B. Westnetz-Schulung 09/2025). Wurden diese vom Arbeitgeber bezahlt oder gestellt, ist unklar, ob sie so verwertet werden dürfen.
- **Nebentätigkeit:** Gewerbliche Nebentätigkeit kann im Arbeitsvertrag genehmigungs- oder anzeigepflichtig sein.
- **Wettbewerbsverbot:** Während des Arbeitsverhältnisses darf man dem Arbeitgeber keine Konkurrenz machen (auch ohne ausdrückliche Klausel). Eine App für Elektrobetriebe kann je nach Geschäft des Arbeitgebers ein Konkurrenzprodukt oder ein Kundenkonflikt sein (z. B. Kunden des Arbeitgebers als Zielgruppe der Direktansprache).
- **Verschwiegenheit / Betriebsgeheimnisse:** Keine Kundendaten, Preise oder interne Unterlagen des Arbeitgebers in Regelwerk, Fotos oder Beispielen.
- **Zu klären:** Arbeitsvertrag und Tarif lesen (Nebentätigkeit, Erfindungen, Verschwiegenheit, Wettbewerb), dann ein einmaliges Beratungsgespräch beim Fachanwalt für Arbeitsrecht oder IHK/Handwerkskammer-Rechtsberatung (die HWK bietet oft kostenlose Erstberatung für Mitglieder, ⚖ bitte erfragen). **Ich kann das nicht beurteilen, es ist die wichtigste Unsicherheit dieser Notiz.** Vorschlag: vor der öffentlichen Veröffentlichung klären, nicht erst danach.
- Dazu gehört eine Steuerfrage für den Steuerberater: Gewerbeanmeldung, Einkünfte aus Nebentätigkeit, Kleinunternehmerregelung.

## 5. Realistischer Schutz: Tempo, Netzwerk, Daten
Ehrlich: Schutz gegen Nachahmer entsteht hier hauptsächlich so:
- **Vorsprung:** Wer zuerst bei den ersten 15 Kollegen und bei Westnetz-Gebieten bekannt ist, wird als Referenz gesehen. Das Regelwerk ist nur dann ein Vorteil, wenn es **aktuell und belegt** bleibt (offen: R07, R09, R11, R19; neue TAB beobachten).
- **Netzwerk:** Direktansprache, Innung, Handwerkskammer ([[Direktansprache]]). Vertrauen im Handwerk lässt sich nicht kopieren.
- **Daten aus echten Fällen:** Je mehr verifizierte Fälle (KI-Vorschlag vs. tatsächliche Entscheidung), desto besser Trefferquote und Fotoerkennung. Das ist der eigentliche Burggraben, im Gegensatz zu 26 Regeln im Klartext.
- **Pflege statt Besitz:** Ein Kopierer hat den Stand von heute. Abo-Wert entsteht durch Aktualisierung, Netzbetreiber-Varianten und Qualitätsanspruch.
- Konsequenz fürs Geldmodell: Nicht auf „geheimes Wissen“ setzen, sondern auf Service, Aktualität, Bequemlichkeit (siehe [[Geldmodelle für KI-Ideen]]).

## 6. Maßnahmenliste (priorisiert)
| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | **Arbeitsvertrag lesen** (Nebentätigkeit, Erfindungen, Wettbewerb, Verschwiegenheit); Fragen für Beratung notieren | 0 € | 1 Std. | **sofort**, vor Veröffentlichung |
| 2 | **Beratung** Fachanwalt Arbeitsrecht / IHK-HWK-Rechtsberatung zu Abschnitt 4 (⚖) | je nach Angebot 0–250 € (grobe Schätzung) | 1 Termin | vor Go/öffentlichem Start |
| 3 | **Kurz-NDA** für die 4 Tester und weitere Kollegen vom Anwalt erstellen/prüfen lassen, bis dahin mündlich + schriftlich per WhatsApp: „vertraulich, nicht weitergeben“ | 0–150 € | 1 Std. | vor dem Mittesten |
| 4 | **Nutzungsbedingungen** in [[Rechtliches]] aufnehmen (zusammen mit Impressum/Datenschutz prüfen lassen) | im bestehenden Prüfauftrag | gering | vor öffentlicher App |
| 5 | **Regelwerk serverseitig** (Code, Abschnitt 2), Route `/bewerte` | 0 € (Edge Function) | ca. 1–2 Tage | vor öffentlichem Hosting |
| 6 | **Login statt Zugangscode** (Supabase Auth, Konto je Tester, Rate-Limit) | 0 € (Free Tier) | ca. 1–2 Tage | vor Fremdnutzern |
| 7 | **Namensrecherche, dann Markenanmeldung „Zählerklar“** (DPMA, Wortmarke) | ca. 290 € (Wortmarke, 3 Klassen, bitte aktuell prüfen) | 1 Std. + Recherche | nach Go (Go/No-Go erfüllt) |
| 8 | **Urheberrechtsvermerk** in App/Landingpage („© 2026 …“) und Quellcode privat halten (Repository bleibt privat) | 0 € | gering | jetzt |
| 9 | **Belegführung**: Quelle jeder Regel dokumentiert halten (auch als Nachweis eigener Leistung) | 0 € | laufend | laufend |
| 10 | Patent / Gebrauchsmuster | – | – | **nicht verfolgen** |

## Daraus entstandene Aufgaben
Die Aufgaben stehen in [[Aufgaben]] unter „Als Nächstes“: Arbeitsvertrag prüfen + Beratung, NDA für Tester, Nutzungsbedingungen, **Code-Aufgabe „Regelwerk serverseitig“**, Login statt Zugangscode vorziehen, Marke nach Go.

## Offene Fragen für Anwalt / Steuerberater (Sammelliste)
- ⚖ Arbeitgeber: Eigentum an Code und Regelwerk, Nebentätigkeit, Wettbewerb, Verwendung von Schulungsunterlagen
- ⚖ Reichweite von Sammlungs-/Datenbankschutz für das Regelwerk
- ⚖ Wirksamkeit des Reverse-Engineering-Verbots in Nutzungsbedingungen (§ 69e UrhG, § 3 GeschGehG)
- ⚖ Schutz des Namens vor Eintragung; Risiko älterer Marken
- Steuer: Gewerbeanmeldung, Nebeneinkünfte, Kleinunternehmerregelung
