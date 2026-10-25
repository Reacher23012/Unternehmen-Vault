---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-10-09
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App

> **Wichtig:** Das ist eine Analyse aus allgemeinem Wissen, **keine Rechtsberatung**. Alles mit 🔶 ist unsicher und gehört vor Livegang zu Anwalt oder Patentanwalt. Beträge sind Größenordnungen nach meinem Kenntnisstand und vor Anmeldung zu prüfen.

**Kurzfassung:** Die Idee selbst ist nicht schützbar. Schützbar sind Code, Name und – mit Einschränkungen – das Regelwerk. Der größte echte Hebel ist technisch (das Regelwerk liegt heute im Browser-Bundle) und zeitlich (Vorsprung). Die dringendste *offene Frage* ist rechtlich: **gehört die Idee mir oder meinem Arbeitgeber?** Das ist in einer Stunde geklärt (Arbeitsvertrag lesen), kostet nichts und sollte vor jedem weiteren Aufwand passieren.

Einordnung nach [[Ideen-System]] und [[Mein Vorteil]]: Der „Vorsprung“-Wert von 5 im Score beruht auf dem Regelwerk [[Regelwerk R01–R26]]. Wie sehr er trägt, hängt an diesem Dokument.

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Wie / Kosten | Bewertung |
|---|---|---|---|
| **Idee / Konzept** („Foto → Regelwerk → Maßnahmenliste“) | **keiner.** Ideen, Methoden und Funktionsprinzipien sind frei. | – | Jeder darf das nachbauen. Schutz nur über Tempo und Vorsprung. |
| **Quellcode** | Urheberrecht für Computerprogramme (§ 69a ff. UrhG), entsteht automatisch, kein Antrag. Schützt die konkrete Ausdrucksform, **nicht** die Idee oder Funktionsweise dahinter. | 0 € | Hilft gegen 1:1-Kopie, nicht gegen Nachbau mit eigenem Code. Entstehung/Autorenschaft belegen: Git-Verlauf aufheben. |
| **Name „Zählerklar“** | Marke (MarkenG) beim DPMA, Wortmarke, Klassen 9 und 42 laut [[ADR-0006 Produktname Zählerklar]]. 🔶 Anmeldegebühr ca. 290 € für bis zu 3 Klassen, Schutz 10 Jahre, verlängerbar. Recherche im DPMAregister ist kostenlos (steht schon in [[Aufgaben]]). | ca. 290 € + ggf. Anwalt | **Lohnt erst nach Go**, aber Recherche vorher (verhindert, dass *ich* abgemahnt werde). Wichtig: Domain `zaehlerklar.de` ist **keine** Marke. Wenn Name und Branding Wert haben, ist die Marke der günstigste echte Schutz. |
| **Regelwerk / Know-how** (26 Regeln, Zuordnung Fundstelle → Maßnahme) | **Geschäftsgeheimnis** (GeschGehG) – aber nur, wenn es (a) geheim ist, (b) wirtschaftlichen Wert wegen der Geheimheit hat und (c) durch **„angemessene Geheimhaltungsmaßnahmen“** geschützt wird (§ 2 Nr. 1). Ein Geheimnis, das ich nicht schütze, ist rechtlich keines. | 0 € plus Maßnahmen (Abschnitte 2 und 3) | Der wertvollste Teil, aber nur so stark wie meine Maßnahmen. Wichtig: Die **Einzelnormen sind öffentlich** (TAB, BDEW, VDE). Geheim ist höchstens die Auswahl, Verknüpfung und Gewichtung. 🔶 Ob das vor Gericht als schutzwürdig gilt, ist offen. |
| **Regelwerk als Sammlung** | Eventuell Datenbank-/Sammelwerkschutz (§§ 4, 87a UrhG). | 0 € | 🔶 Unsicher, braucht „wesentliche Investition“ bzw. eine eigene schöpferische Auswahl. Nicht darauf verlassen. |
| **Patent / Gebrauchsmuster** | Computerprogramme „als solche“ sind vom Patent ausgeschlossen (§ 1 Abs. 3 PatG), vom Gebrauchsmuster ebenfalls. Technischer Beitrag wäre nötig. | Patent: mehrere Tausend € mit Patentanwalt | **Praktisch nicht sinnvoll.** Nur ein Gespräch mit einem Patentanwalt könnte das 🔶 widerlegen; ich würde es nicht tun. |
| **Fotos / Falldaten** | Datenschutz (DSGVO) und Vertragsrecht, kein Eigentum an Daten. | – | Wert liegt in der Sammlung, siehe Abschnitt 5. |

## 2. Technischer Befund: das Regelwerk liegt beim Nutzer im Browser
**Befund (geprüft im Code, 09.10.2026):**
- `web/src/regelwerk.ts` importiert `web/src/regeln.json` (261 Zeilen: alle 26 Regeln mit Name, Bedingung, Maßnahme, Stufe, Fundstelle, Geltung, Status).
- `web/src/main.ts` und `demo.ts` rufen `bewerte(...)` **im Browser** auf. Die Edge Function (`supabase/functions/api/index.ts`) kennt nur `/analyse` (Foto → KI-Vorschlag) und `/faelle`; die Regelauswertung läuft dort nicht.
- Damit steckt das **komplette Regelwerk samt Auswertungslogik im ausgelieferten JavaScript-Bundle**. Wer die App-URL öffnet, kann es in den Browser-Entwicklertools in Sekunden als lesbaren Text herunterladen. Ein `_headers`/CSP oder der `APP_CODE` ändern daran nichts, weil der Zugangscode nur das *Backend* schützt, nicht die statischen Dateien.
- Auch das Demo-Artifact auf claude.ai enthält die Regeln (laut Notiz „privat“, aber ein weitergegebener Link reicht).
- Zusätzlich im Quell-Repo: Ist `Reacher23012/zaehlerschrank-check` **privat**? Das muss ich *selbst* im GitHub-Konto prüfen (sehe ich von hier nicht belastbar). Falls öffentlich: Regelwerk, Code und Supabase-Ref sind schon heute für alle lesbar.

**Folge für das Geschäftsgeheimnis:** Was beim Nutzer im Browser liegt und ohne Hürde abrufbar ist, ist **nicht geheim**. Das „Reverse Engineering“ eines öffentlich zugänglichen Produkts ist nach § 3 GeschGehG ausdrücklich zulässig, wenn nichts anderes vertraglich vereinbart ist. Heißt: Mit einer öffentlich gehosteten App ohne Login verliere ich das Regelwerk **rechtlich und praktisch** als Geheimnis.

**Risiko-Einschätzung (ehrlich):**
- *Heute:* gering. Die App ist nicht online, nur ich (und ab dem Testabend vier Tester) haben sie.
- *Nach öffentlichem Livegang ohne Maßnahmen:* mittel bis hoch für das Regelwerk – aber **das Gewicht relativiert sich**: Ein Konkurrent mit Elektro-Fachwissen und TAB-PDFs könnte die 26 Regeln auch selbst erarbeiten. Der Kopierer spart sich Wochen Fachrecherche, nicht Jahre. Der Schaden ist „Vorsprung geht verloren“, nicht „Geschäft ist weg“.

**Lösungsskizze: Regelauswertung in die Edge Function verlegen**
1. Neue Route `POST /bewerten` in `supabase/functions/api/index.ts`: Eingaben (die 12 Felder + Vorhaben/Netzform usw.) rein, Ergebnis raus (Ampel, ausgelöste Regeln mit Maßnahme, **Fundstelle**, „Vor Ort klären“-Fälle, Hinweise). Die Regel*bedingungen* und die Logik (`ausgeloesteRegeln`) wandern nach `supabase/functions/` (oder ein gemeinsames Modul, das nur dort eingebunden wird); `regeln.json` fliegt aus dem Web-Bundle.
2. App ruft `/bewerten` statt lokaler `bewerte()`. Anzeige bleibt gleich; die App kennt nur noch das Ergebnis.
3. Zugriff nur mit Login (siehe [[Aufgaben]] „Login statt Zugangscode“) plus Rate-Limit pro Nutzer.
4. Tests: die bestehenden 13 Tests (`regelwerk.test.ts`) auf das neue Modul umziehen, damit das Ergebnis 1:1 gleich bleibt (Excel-Beispielzeile!).

**Was das *nicht* löst (ehrlich):**
- Wer Zugang hat, kann das Regelwerk durch systematisches Abfragen (viele Eingabekombinationen) teilweise **auslesen** („Orakel“). Bremsen: Login, Rate-Limit, Nutzungsbedingungen, Auffälligkeiten im Log. Vollständig verhindern lässt sich das nicht.
- **Offline/Funkloch:** Die App arbeitet heute bei Funkloch weiter (lokale Auswertung, Fälle werden nachgesendet, siehe [[App & Technik]]). Mit serverseitiger Bewertung ist für das *Ergebnis* eine Verbindung nötig. Auf der Baustelle im Keller ist das ein echter Nachteil. Mögliche Abmilderung: Fotos und Eingaben lokal puffern, Ergebnis erst bei Netz. Das Foto-Feature braucht ohnehin Netz (KI-Aufruf).
- Mehraufwand ca. 1–2 Tage; Hosting bleibt im Free Tier. Zeitlimit 150 s ist unkritisch, die Auswertung ist Millisekunden.

**Empfehlung:** *Nicht vor Go bauen.* Die Fundstellen sind ohnehin dazu da, geprüft zu werden, und die ersten vier bis fünf Tester kennen sich. Aber: **Die App nicht öffentlich ohne Login hosten**, solange das Regelwerk im Bundle liegt (konkret: Netlify-Livegang für die App erst *nach* Umbau oder mit Passwortschutz auf Seitenebene; die Landingpage ist davon nicht betroffen). So verhindert die Reihenfolge „erst verkaufen, dann bauen“ den Schaden schon günstig.

## 3. Verträge und Nutzungsbedingungen
Alles 🔶 *vom Anwalt prüfen lassen*, bevor es an Fremde geht. Entwürfe kann ich vorbereiten (siehe Maßnahmen).
- **NDA / Geheimhaltung für Tester und Kollegen:** kurze Vereinbarung (1 Seite): Zugang nur für den Test, Inhalt (Regeln, Bewertungen, Screens) nicht weitergeben, nicht kopieren oder nachbauen, Rückgabe/Löschung nach Test. Wichtig als „angemessene Geheimhaltungsmaßnahme“ für § 2 GeschGehG. Gegenüber *Kollegen im Handwerk* wirkt ein NDA schnell misstrauisch: Vorschlag, es als „Testbedingungen“ zu formulieren (Dank + Spielregeln) statt als juristisches Dokument. Für die ersten Gespräche ([[Gesprächsleitfaden]]) braucht es **keins**: dort zeige ich keine Regeln, nur Fragen.
- **Nutzungsbedingungen (AGB) der App:** Nutzungsrecht nur für eigene Zwecke, **kein Kopieren, Auslesen (Scraping/Orakel-Abfragen), Reverse Engineering oder Weitergeben von Zugangsdaten**, Haftungshinweis „ersetzt keine Prüfung vor Ort, maßgeblich ist die TAB des Netzbetreibers“ (steht schon im Impressum-Entwurf, siehe [[Rechtliches]]), Ergebnis als Entscheidungshilfe. 🔶 AGB-Recht (§§ 305 ff. BGB) ist für Haftungsklauseln streng; unbedingt prüfen lassen.
- **Zugang nur mit Login:** keine Bedingungen ohne Durchsetzung. Der `APP_CODE` ist ein geteiltes Passwort; Weitergabe ist unkontrollierbar. Pro Tester ein Konto = Nachvollziehbarkeit und sperrbar (→ „Login statt Zugangscode“ in [[Aufgaben]]).
- **Datenschutz-Seite:** Fotos gehen an Anthropic (USA); AV-Verträge mit Supabase/Anthropic dokumentieren (steht in [[Rechtliches]]).

## 4. Arbeitgeber-Frage (offen, wichtig) 🔶
**Frage:** Wem gehört die Idee bzw. das Regelwerk, wenn es *im Rahmen einer Anstellung im Elektrohandwerk* entstanden ist? Annahme aus dem Vault: Ich bin angestellt im Elektrohandwerk ([[Mein Vorteil]]); das ist nicht bestätigt.

Punkte, die ein Anwalt klären muss (Reihenfolge nach Dringlichkeit):
1. **Arbeitsvertrag lesen** (kostenlos, sofort): Klauseln zu **Nebentätigkeit** (Anzeige/Genehmigung), **Wettbewerbsverbot**, **Geheimhaltung/Betriebsgeheimnisse**, **Übertragung von Arbeitsergebnissen/Erfindungen**. Auch Tarif-/Betriebsvereinbarung.
2. **Software:** Nach § 69b UrhG stehen die Rechte an Programmen, die ein Arbeitnehmer „in Wahrnehmung seiner Aufgaben oder nach den Anweisungen des Arbeitgebers“ schafft, dem Arbeitgeber. Programmieren gehört vermutlich nicht zu den Aufgaben eines Elektrikers, die App wäre also eher *meine* – 🔶 das hängt aber an Tätigkeit, Arbeitsmitteln und Anweisungen. **Nicht** Firmenlaptop, Firmenzeit, Firmenfotos oder Firmenunterlagen nutzen.
3. **Arbeitnehmererfindung (ArbnErfG):** gilt nur für patent-/gebrauchsmusterfähige Erfindungen. Bei Software kaum relevant (siehe Abschnitt 1), aber der Vollständigkeit halber erwähnen.
4. **Das Know-how (Regelwerk):** Das Fachwissen kommt aus der Berufspraxis und Schulungen (z. B. Westnetz-Schulung, siehe Fundstellen in `regeln.json`). Offene Fragen: Sind Schulungsunterlagen oder interne Betriebsunterlagen des Arbeitgebers Quelle? Dann gibt es Geheimhaltungs- und Nutzungsgrenzen. 🔶 Fundstellen aus **öffentlichen** Quellen (TAB, BDEW, VDE-Titel) sind unkritisch; interne Unterlagen und Schulungsfolien nicht ungeprüft übernehmen. (Es gilt weiter: keine Normtexte übernehmen, nur Fundstellen.)
5. **Wettbewerb:** Während des Arbeitsverhältnisses gilt ein Wettbewerbsverbot (§ 60 HGB analog). Eine App, die Elektrobetriebe als Kunden hat, könnte den Arbeitgeber berühren (Kunden, Netz, Marktauftritt). Ein Gespräch mit dem Chef oder eine **schriftliche Freigabe** kann helfen; Vor- und Nachteile abwägen, nicht überstürzen.
6. **Steuer/Gewerbe:** Gewerbeanmeldung als Nebengewerbe, Kleinunternehmerregelung – das ist Steuerberater-Thema, nicht Teil dieser Notiz.

**Mein Rat:** Zuerst Vertrag lesen, dann 1 Stunde Erstberatung (Fachanwalt Arbeitsrecht/IT-Recht; Kosten 🔶 grob 150–300 € je Stunde, bei der Erstberatung von Privatpersonen oft gedeckelt) *vor* dem ersten bezahlten Kunden. Nicht vor den Gesprächen.

## 5. Realistischer Schutz durch Tempo
Die ehrliche Antwort: Wirklich verhindern, dass jemand die Idee nachbaut, kann ich nicht. Verteidigen kann ich einen Vorsprung:
- **Zugang und Vertrauen:** Ich kenne die Zielgruppe (Elektrobetriebe im Westnetz-Gebiet), bin Teil des Netzwerks, Innung und Handwerkskammer sind angedacht. Ein Fremder startet bei null. Das ist der stärkste Schutz und genau der, der in [[Mein Vorteil]] steht.
- **Daten aus echten Fällen:** Jeder Fall speichert Foto, KI-Vorschlag *und* meine tatsächliche Entscheidung → Trefferquote, Fehlermuster, Fotodaten, die ein Nachbauer nicht hat (Kern von [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]). Fotos nur mit Einwilligung und nur ohne Adresse/Namen/Zählernummer.
- **Pflege:** Regeln ändern sich mit jeder TAB-Fassung (siehe „Neue Westnetz-TAB beobachten“). Wer das Regelwerk laufend aktuell hält, ist dem Kopierer immer eine Version voraus. Ein einmal kopierter Stand veraltet.
- **Marke und Marketing-Präsenz:** wer zuerst als „Zählerklar“ bekannt ist, ist das Original.
- **Weitere Netzbetreiber:** Das Regelwerk ist heute Westnetz-spezifisch; Ausbau auf weitere Netzbetreiber ist Arbeit, die ein Nachahmer erst machen müsste.
- **Nicht überschätzen:** Wer Zugang hat, kann abschreiben. Ein größerer Anbieter (Netzbetreiber-Portale, Großhändler, Software für Elektrobetriebe) könnte das Thema ohnehin selbst besetzen. Das ist das eigentliche Geschäftsrisiko – und ein Argument *für* Tempo bei den Gesprächen, nicht für Geheimhaltungsaufwand.

## 6. Priorisierte Maßnahmen
| Prio | Maßnahme | Kosten | Aufwand | Wer | Wann |
|---|---|---|---|---|---|
| 1 | **Arbeitsvertrag lesen** (Nebentätigkeit, Wettbewerb, Geheimhaltung, Arbeitsergebnisse); keine Firmen-Hardware/-Unterlagen nutzen | 0 € | 1 h | ich | sofort |
| 2 | **GitHub-Repos auf „privat“ prüfen** (`zaehlerschrank-check`, `unternehmen-vault`) | 0 € | 5 Min | ich | sofort |
| 3 | **App nicht öffentlich ohne Login/Passwortschutz hosten**; Landingpage darf online (enthält kein Regelwerk) | 0 € | – | ich | Regel bis Umbau |
| 4 | DPMA-Markenrecherche „Zählerklar“ (steht schon in [[Aufgaben]]) | 0 € | 30 Min | ich | vor Druck/Livegang |
| 5 | Kurz-Testbedingungen/NDA + Nutzungsbedingungen **entwerfen** (Nachtschicht kann), dann prüfen lassen | 0 € Entwurf, Anwalt 🔶 ca. 200–500 € | 2–4 h | Nachtschicht + Anwalt | vor Testern mit App |
| 6 | **Login statt `APP_CODE`** (pro Tester ein Konto) | 0 € | 1–2 Tage | Code | vor breiterem Test |
| 7 | **Regelwerk serverseitig** (`/bewerten`, Regeln raus aus Bundle) | 0 € | 1–2 Tage | Code | nach Go, vor öffentlichem Livegang |
| 8 | Anwalt-Erstberatung (Arbeitgeber-Frage, Nutzungsbedingungen, Haftung) | 🔶 ca. 150–400 € | 1–2 h | ich + Anwalt | vor dem ersten bezahlten Kunden |
| 9 | Markenanmeldung Wortmarke „Zählerklar“ | ca. 290 € (🔶 prüfen) | 1 h | ich | nach Go |
| 10 | Falldaten sammeln und Einwilligung für Fotos klären | 0 € | laufend | ich | ab Testphase |

**Einordnung gegen die Regel „erst verkaufen, dann bauen“:** Punkte 1–4 sind kostenlos und nehmen kaum Zeit – sie dürfen nicht die 5 Gespräche verdrängen. Punkte 5–9 sind Schutz-Infrastruktur und kommen *nach* der Validierung bzw. direkt vor dem Livegang. Wer zuerst Anwalt und Code für den Schutz bezahlt, ohne dass ein Elektriker 30 €/Monat zugesagt hat, schützt noch nichts Wertvolles.
