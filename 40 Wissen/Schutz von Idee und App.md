---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-10-11
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App

> **Hinweis:** Das ist eine Analyse der Nachtschicht, **keine Rechtsberatung**. Was unsicher ist, steht als **„vom Anwalt prüfen lassen“**. Kosten sind grobe Größenordnungen aus dem Gedächtnis, vor Entscheidung aktuell nachlesen.

**Kurzfassung:** Die *Idee* ist nicht schützbar. Schützbar sind Code (automatisch), Name (Marke, kostet) und das Regelwerk **nur als Geschäftsgeheimnis, solange es geheim gehalten wird**. Genau da liegt der größte Befund: Das Regelwerk steckt heute komplett im Browser-Bundle (siehe 2). Der eigentliche Schutz ist Tempo, Netzwerk und echte Falldaten (siehe 5).

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Voraussetzung / Haken | Kosten |
|---|---|---|---|
| **Idee** („Foto → Maßnahmenliste“) | **keiner** | Ideen sind frei. Nur die konkrete Ausformung wird geschützt. | 0 € |
| **Quellcode, UI, Texte** | Urheberrecht (UrhG, §§ 69a ff. für Software) | entsteht automatisch, braucht keine Anmeldung. Schützt gegen Kopieren, **nicht** gegen Nachbauen mit eigenem Code. Beweis: Git-Historie aufheben. | 0 € |
| **Name „Zählerklar“** | Marke (DPMA) oder Werktitel/Unternehmenskennzeichen | Erst Recherche (Identität/Ähnlichkeit, DENIC, DPMA-Register), dann Anmeldung. Wortmarke Klasse 9/42 (evtl. 35). Beschreibende Namen werden abgelehnt. | DPMA-Gebühr Größenordnung 290 € für bis zu 3 Klassen, plus ggf. Anwalt; Recherche selbst 0 € |
| **Regelwerk R01–R26 / Know-how** | **Geschäftsgeheimnisgesetz (GeschGehG)** | Nur geschützt, wenn es (a) nicht allgemein bekannt ist, (b) wirtschaftlichen Wert hat und (c) **angemessene Geheimhaltungsmaßnahmen** bestehen (§ 2 Nr. 1). Reverse Engineering ist nach § 3 GeschGehG grundsätzlich **erlaubt**, wenn das Produkt öffentlich verfügbar ist und keine vertragliche Beschränkung besteht. | 0 € plus Vertragsarbeit |
| **Regelinhalt als Fakten** | kein Schutz | Die Regeln leiten sich aus öffentlichen TAB/VDE/BDEW-Texten ab. Die *Fakten* sind frei, nur Auswahl, Struktur und Formulierung sind eigenes Werk. Dazu: Fremde Normtexte/Schulungsfolien dürfen nicht in die App (siehe [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]], nur Fundstellen). | – |
| **Patent / Gebrauchsmuster** | praktisch nein | Software „als solche“ ist nach § 1 Abs. 3 PatG vom Patent ausgeschlossen; technischer Beitrag nötig. Für diese Idee unrealistisch und teuer (Patent mit Anwalt schnell 4-stellig). Gebrauchsmuster: Verfahren sind ausgeschlossen. **Vom Anwalt prüfen lassen**, nur falls es etwas Technisches gibt. | n. v. |

**Ehrliche Einordnung:** Ein Wettbewerber kann das Prinzip jederzeit nachbauen, weil er dieselben öffentlichen TABs lesen kann. Der Wert liegt in Auswahl, Fehlerfreiheit, Fundstellen, Pflege und im Zugang zu den Kunden, nicht im Verbot.

## 2. Technischer Befund: Regelwerk liegt beim Nutzer im Browser
**Befund (im Code geprüft, `zaehlerschrank-check`):**
- `web/src/regelwerk.ts` importiert `./regeln.json` (14 KB: Name, Bedingung, Maßnahme, Stufe, Fundstelle, Geltung, Status je Regel) und enthält die komplette Auswertungslogik (`ausgeloesteRegeln`, `bewerte`, `messkonzept`).
- `main.ts` und `demo.ts` rufen `bewerte()` im Browser auf. Beide Dateien landen im Vite-Bundle.
- Wer die App nur einmal öffnet, hat sie komplett: Entwicklerwerkzeuge → Quellen/Netzwerk → JS-Datei. Minify ist keine Sicherheit, die Strings der `regeln.json` stehen im Klartext darin.
- Der Zugangscode (`x-app-code`) schützt nur die **Edge Function** (Analyse, Fälle), **nicht** das ausgelieferte Bundle: Die statische App wird öffentlich gehostet (geplant: Netlify). Zusätzlich liegt das Demo-Artifact mit Regelwerk (`build:demo`) in einer Datei.

**Risiko-Bewertung:**
| Aspekt | Bewertung |
|---|---|
| Kopierbarkeit | **hoch**: ein Klick, keine Fachkenntnis nötig |
| Rechtlich | Ohne Login/Vertrag ist das Regelwerk faktisch **öffentlich verfügbar**. Das schwächt „angemessene Geheimhaltungsmaßnahmen“ nach GeschGehG erheblich, und Reverse Engineering wäre nach § 3 Abs. 1 Nr. 2 GeschGehG ohne vertragliche Beschränkung zulässig. **Vom Anwalt prüfen lassen.** |
| Tatsächlicher Schaden | mittel: Die Regeln sind aus öffentlichen Quellen abgeleitet, aber 26 geprüfte Regeln samt Fundstellen sind Monate Arbeit. Für Konkurrenten ein Abkürzung. |
| Dringlichkeit | **niedrig bis mittel**: solange nur 4 Tester per Zugangscode mittesten und die App nicht öffentlich liegt, ist das Risiko klein. Wird es **vor dem öffentlichen Hosting** wichtig. |

**Lösungsskizze: Regelauswertung in die Edge Function verlegen**
1. `regeln.json` und die Logik aus `regelwerk.ts` wandern nach `supabase/functions/api/` (neue Route z. B. `POST /bewerte`, Eingaben rein, Ergebnis raus). Der Quelltext lebt nur serverseitig.
2. Die App schickt `Eingaben` (die sie ohnehin hat) und erhält nur das **Ergebnis**: Ampel, ausgelöste Maßnahmen mit Fundstelle, „Vor Ort klären“, Messkonzept. Die *Bedingungen* der Regeln und die nicht ausgelösten Regeln bleiben auf dem Server.
3. Offline/Funkloch: Heute rechnet die App lokal und speichert Fälle lokal zwischen. Das Rechnen muss dann mitgequeued oder bei Verbindungsverlust mit „Ergebnis folgt“ gelöst werden. **Das ist der Preis**: Verlust der Offline-Fähigkeit auf der Baustelle (Funkloch im Keller!). Alternative: Ergebnis des letzten Checks lokal halten, Neuberechnung nur online.
4. Zugriff nur mit Login/Zugangscode (siehe 3), Rate-Limit pro Code, damit niemand das Regelwerk durch massenhaftes Abfragen „abtastet“. **Wichtig:** Auch dann lässt sich ein Regelwerk durch viele Testfälle teilweise rekonstruieren; ganz verhindern kann man das nicht, nur teurer machen.
5. Tests (`regelwerk.test.ts`, 13 Tests) laufen weiter gegen dieselbe Logik. Idealerweise bleibt die Logik in einem gemeinsamen Modul, das Deno (Edge Function) und die Tests importieren.
6. Demo-Build (`build:demo`) enthält dann nur Beispieldaten, kein echtes Regelwerk.

**Aufwand:** ca. 1 Nachtschicht für Verschieben + Route + Tests, plus 1 für Offline-Verhalten. Der Aufwand ist sinnvoll **vor** dem öffentlichen Hosting, aber **nicht vor** den Gesprächen ([[Validierung & Go-No-Go]]), sonst wäre es genau der Infrastruktur-Vorzug, den [[Ideen-System]] ausschließt.

## 3. Verträge und Zugang
- **NDA für Tester/Kollegen:** Kurzes, beidseitiges oder einseitiges Geheimhaltungsversprechen (1 Seite): was vertraulich ist (Regelwerk, App-Inhalte, Ergebnisse), Zweck (Testen), Dauer, Rückgabe/Löschung. Wirkt vor allem als **Geheimhaltungsmaßnahme** im Sinne GeschGehG und als Abschreckung. Vorlage vom Anwalt oder von der Handwerkskammer prüfen lassen. **Kein NDA vor den ersten Gesprächen**: Es bremst die Validierung und schreckt Kollegen ab. Erst, wenn Zugang zur App/zum Regelwerk gegeben wird.
- **Nutzungsbedingungen (AGB-Light):** kein Kopieren, kein Auslesen/Scrapen, kein Reverse Engineering (soweit nach § 69e UrhG und § 3 GeschGehG vertraglich überhaupt abdingbar; **vom Anwalt prüfen lassen**), Weitergabe des Zugangs verboten, Haftungshinweis „Ersteinschätzung, ersetzt keine Prüfung durch die Elektrofachkraft“ (passt zu [[Rechtliches]]).
- **Zugang nur mit Login:** Heute ein gemeinsamer `APP_CODE`. Für Tester ok, aber: ein Code für alle, kein Entziehen einzelner Tester, kein Rate-Limit. Besser: **je Tester ein eigener Code** (in der Tabelle, widerrufbar), später echter Login (steht bei „Irgendwann“: *Login statt Zugangscode*). Gehört zusammen mit Punkt 2: Erst Login + serverseitig, dann öffentlich hosten.
- **Landingpage** zeigt kein Regelwerk, nur Versprechen. So lassen.

## 4. Arbeitgeber-Frage (offen – Anwalt/Steuerberater)
**Die Frage:** Wem gehört das Regelwerk/die App, wenn das Fachwissen im Rahmen einer **Anstellung im Elektrohandwerk** entstanden ist?

Zu klären, **alles vom Anwalt prüfen lassen**:
1. **Arbeitsvertrag lesen:** Klauseln zu Nebentätigkeit (Genehmigungs- oder Anzeigepflicht), Wettbewerbsverbot (während des Arbeitsverhältnisses besteht ein Wettbewerbsverbot auch ohne Klausel, schon aus der Treuepflicht), Verschwiegenheit, Übertragung von Arbeitsergebnissen/Rechten.
2. **Software von Arbeitnehmern (§ 69b UrhG):** Programme, die ein Arbeitnehmer *in Wahrnehmung seiner Aufgaben oder nach Anweisung* schafft, gehören dem Arbeitgeber (Nutzungsrechte). Entstand der Code in der Freizeit, mit eigenen Mitteln, ohne Bezug zur Arbeitsaufgabe, spricht das für den Entwickler. Die Abgrenzung ist einzelfallabhängig.
3. **Arbeitnehmererfindungsgesetz:** Gilt für patent-/gebrauchsmusterfähige Erfindungen. Für diese Software voraussichtlich kaum relevant, aber „Diensterfindung vs. freie Erfindung“ nennen lassen.
4. **Betriebs- und Geschäftsgeheimnisse des Arbeitgebers:** Wurden Regeln, Preise, Kundendaten, interne Schulungsunterlagen oder Fotos aus Aufträgen des Arbeitgebers verwendet? Dann Risiko. **Fotos von Kundenanlagen** der Arbeit nur mit Einverständnis (Arbeitgeber *und* Kunde) und anonymisiert nutzen.
5. **Wettbewerbs-Konflikt:** Ein Produkt, das Elektrobetrieben Arbeit abnimmt oder den Arbeitgeber als Zielkunden anspricht, kann als Konkurrenz gesehen werden. Das Selbstständigkeits-Setup (Gewerbeanmeldung, Nebengewerbe) ist **auch eine Steuerberater-Frage** (Kleinunternehmer, Gewinnermittlung, Sozialversicherung).
6. **Praktisch jetzt (ohne Rechtsberatung):** Arbeitgeber *nicht* im Dunkeln lassen, wenn der Vertrag Anzeige verlangt; vorhandene Unterlagen des Arbeitgebers (Schulungen, TAB-Anhänge mit Firmenvermerk) nicht ins Repo/Vault; Entstehung (Zeit, Gerät, Konto) sauber trennen und dokumentieren.

**Einordnung:** Der Punkt kann den ganzen Plan kippen. Er kostet einen Termin, nicht Monate. Deshalb **vor** Veröffentlichung klären, am besten gemeinsam mit [[Rechtliches]].

## 5. Realistischer Schutz: Tempo, Netzwerk, Daten
Rechtlicher Schutz ist hier dünn. Was wirklich schwer zu kopieren ist:
- **Vorsprung:** Wer zuerst bei den Kollegen im Westnetz-Gebiet ist und Gewohnheit schafft, gewinnt. Das ist das Argument für Priorität bei den Gesprächen vor Infrastruktur.
- **Netzwerk:** Innung, Handwerkskammer, Großhändler, Kollegen (vgl. [[Mein Vorteil]], Zugang 5/5). Ein Nachbauer hat keine 15 Gespräche.
- **Daten aus echten Fällen:** „Deine tatsächliche Entscheidung“ je Fall → Trefferquote, Fotoerkennung, Regellücken. Ein Datenbestand aus 20+ geprüften Fällen ist besser als jedes kopierte Regelwerk. Gehört dem Betrieb; Datenschutz für Fotos beachten (ohne Adresse/Namen/Zählernummer).
- **Pflege:** Neue TAB-Fassungen (z. B. Westnetz-TAB 2026) schnell einarbeiten. Ein kopiertes Regelwerk veraltet.
- **Marke/Name** als Wiedererkennung, sobald es Umsatz gibt.
- **Offene Frage Wettbewerb:** Wettbewerbsrecherche steht noch aus (siehe Projektnotiz). Gibt es bereits Zählerplatz-Prüftools von Herstellern/Netzbetreibern? Ergebnis beeinflusst, wie viel Schutz sich lohnt.

## 6. Priorisierte Maßnahmen
| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | **Arbeitsvertrag lesen, Arbeitgeber-Frage beim Anwalt/Steuerberater klären** | Erstberatung oft ca. 0–250 € (Größenordnung, nachfragen) | 1–2 h + Termin | **vor Veröffentlichung**, am besten diese Woche vorbereiten |
| 2 | Namens-Recherche: DENIC `zaehlerklar.de`, DPMA-Register (bereits offen) | 0 € | 1 h | vor Druck der Flyer |
| 3 | Git-Historie, Notizen und Entwurfsstände aufheben (Beweis der Urheberschaft); nichts mit Arbeitgeber-Unterlagen vermischen | 0 € | laufend | jetzt |
| 4 | Pro Tester eigener Zugangscode statt eines gemeinsamen | 0 € | klein (Code-Aufgabe, nach Gesprächen) | bevor Tester ins Regelwerk gucken |
| 5 | NDA-Kurzfassung für Tester + Nutzungsbedingungen (Entwurf, vom Anwalt prüfen lassen) | 0 € Entwurf, Prüfung ggf. 100–300 € | 2 h + Prüfung | bevor die App an Dritte geht |
| 6 | **Regelauswertung serverseitig** (Edge Function, siehe 2) | 0 € (Supabase Free) | 1–2 Nachtschichten | **vor öffentlichem Hosting**, nicht vor den Gesprächen |
| 7 | Marke anmelden (DPMA-Wortmarke), erst nach Recherche und erstem Interesse | Größenordnung 290–500 € | 2 h | nach Go oder erstem Umsatz |
| 8 | Patent/Gebrauchsmuster | 4-stellig | hoch | **nicht** machen, außer Anwalt sieht technischen Kern |
| 9 | Rate-Limit auf Zugangscode/Analyse | 0 € | klein | zusammen mit 6 |

## Offen („vom Anwalt prüfen lassen“)
- Arbeitgeber-Frage (4), insbesondere § 69b UrhG im konkreten Fall.
- Reichweite vertraglicher Verbote gegen Reverse Engineering/Auslesen.
- Ob ein öffentlich ausgeliefertes, aber nur per Code nutzbares Regelwerk noch als „angemessen geschützt“ gilt.
- Marken-Ähnlichkeit zu „Zählerklar“ und Klassenauswahl.

Verknüpft: [[Zählerschrank-Check]], [[Rechtliches]], [[App & Technik]], [[Ideen-System]], [[ADR-0006 Produktname Zählerklar]]
