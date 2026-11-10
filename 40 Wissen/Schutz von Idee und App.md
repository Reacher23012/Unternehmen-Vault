---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-11-10
status: analyse – keine Rechtsberatung
---
# Schutz von Idee und App („Zählerklar“)

> **Keine Rechtsberatung.** Das ist eine Sortierung des Themas aus allgemeinem Wissen, nicht aus Quellen im Vault. Alles mit 🔶 ist unsicher und sollte ein Anwalt oder Steuerberater prüfen. Gesetzesangaben und Gebühren bitte vor Gebrauch gegenchecken.

## Kurzfazit
1. **Die Idee ist nicht schützbar.** Auch der Code ist nur gegen 1:1-Kopieren geschützt, nicht gegen „jemand baut dasselbe nach“.
2. **Der größte reale Schwachpunkt ist technisch:** Das komplette Regelwerk liegt im App-Bundle und ist für jeden Tester in Minuten auslesbar (Abschnitt 2). Das lässt sich beheben: Auswertung auf den Server.
3. **Wichtigster offener Punkt ist die Arbeitgeber-Frage** (Abschnitt 4). Sie entscheidet, ob dir das Ganze überhaupt allein gehört. Das vor dem ersten Euro klären.
4. **Echter Schutz ist Tempo, Daten aus echten Fällen und Vertrauen im Netzwerk** (Abschnitt 5), nicht Paragrafen.
5. Der Schutz-Aufwand sollte zur Phase passen: Vor einem Beleg, dass jemand zahlt, lohnt keine teure Absicherung. Billige Maßnahmen (0 €) sofort, teure erst nach Go → [[Validierung & Go-No-Go]].

## 1. Was ist in Deutschland schützbar?
| Was | Schutz | Was es wirklich bringt |
|---|---|---|
| **Idee / Konzept** („Foto → KI → Regelwerk → Maßnahmen“) | **keiner.** Ideen sind frei. | Jeder darf dasselbe bauen. Nur NDA (Abschnitt 3) bindet bestimmte Personen. |
| **Quellcode, Oberfläche, Texte** | Urheberrecht (UrhG, bei Programmen §§ 69a ff.), entsteht automatisch, kostenlos | Schützt vor Kopieren/Abschreiben des Codes und der Texte. Nicht vor einer eigenen Neuimplementierung. Beweis über Git-Verlauf (privates Repo, Commits mit Datum). |
| **Name „Zählerklar“** | Marke beim DPMA (Klassen 9 und 42, → [[ADR-0006 Produktname Zählerklar]]) | Schützt den Namen, nicht die Funktion. Anmeldung online, Gebühr 🔶 grob 290 € für bis zu 3 Klassen (aktuelle Gebührentabelle prüfen), Schutz 10 Jahre, verlängerbar. Vorher Recherche (Verwechslungsgefahr), sonst droht Widerspruch/Abmahnung durch ältere Marken. Eine Anmeldung ist erst sinnvoll, wenn der Name nach Gesprächen bleibt; Priorität gilt ab Anmeldetag. Die Aufgabe „DPMA-Markenrecherche“ steht schon in [[Aufgaben]]. |
| **Regelwerk R01–R26** als Wissen | **Geschäftsgeheimnis** (GeschGehG) – nur, wenn es nicht allgemein bekannt/zugänglich ist **und** angemessene Geheimhaltungsmaßnahmen bestehen (§ 2 Nr. 1 GeschGehG). 🔶 | Schwach: Die Regeln stützen sich auf öffentliche Quellen (TAB, BDEW-Musterwortlaut, Normen, Westnetz-Anweisung), siehe [[Regelwerk R01–R26]]. Geschützt ist allenfalls die **Auswahl, Verdichtung und Verknüpfung** – und auch das nur, solange es nicht für jeden Nutzer offen im Browser liegt. |
| **Regelwerk als Sammlung** (`regeln.json`, Excel) | Datenbankherstellerrecht (§§ 87a ff. UrhG) bei wesentlicher Investition 🔶; Texte evtl. Urheberrecht | Schützt vor wesentlichem Übernehmen der Sammlung. Aufwand/Investition müsste man belegen können. Keine Normtexte übernehmen (gilt schon, → [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]), sonst verletzt man selbst fremde Rechte. |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist nicht patentfähig (§ 1 Abs. 3 PatG); Gebrauchsmuster schließt Programme ebenfalls aus. Ein technischer Beitrag wäre nötig. 🔶 | **Praktisch keine Option:** Eine Regelauswertung ist Datenverarbeitung/Geschäftsmethode, die Anmeldung kostet vierstellig und dauert Jahre. Nicht verfolgen. |
| **Fälle / Fotos / Trefferquote** | Geschäftsgeheimnis + faktische Exklusivität; bei Kundenfotos Datenschutz (DSGVO) | Das ist der wertvollste Teil im Lauf der Zeit (Abschnitt 5). Er entsteht erst mit echten Fällen. |

## 2. Technischer Befund: Regelwerk liegt im Browser
**Befund (Code geprüft, Stand `master`):**
- `web/src/regelwerk.ts` importiert `./regeln.json` (14 KB: alle 26 Regeln mit Bedingung, Maßnahme, Fundstelle, Geltung, Status). Vite bündelt das in das ausgelieferte JavaScript.
- Dieselbe Datei enthält die **gesamte Auswertungslogik** (`ausgeloesteRegeln`: Bedingungen R01–R26, Grenzwerte, `schlimmsterFall`, `messkonzept`). `main.ts` ruft `bewerte()` im Browser auf.
- `vite.config.ts` hat keine Sonderoptionen. Minifizieren schützt nicht: Wer die Seite öffnet, kann `regeln.json` und die Bedingungen in DevTools lesen. Das Regelwerk lässt sich in Minuten komplett kopieren.
- Auch der Demo-Build (`dist-artifact`) enthält alles. Was die Edge Function (`supabase/functions/api/index.ts`) liefert, ist nur die Fotoanalyse und der Fall-Speicher, keine Regeln.
- Der Datensatz in den Fällen (Eingaben + tatsächliche Entscheidung) liegt dagegen bereits serverseitig.

**Risiko-Bewertung (ehrlich):**
- **Heute gering, solange die App nicht öffentlich ist.** Es gibt nur einen Zugangscode und eine Handvoll Tester.
- **Mittel, sobald Kollegen testen.** Das sind per Definition Fachleute und mögliche Wettbewerber (Betriebe, die Zählerschrank-Wissen verkaufen, andere App-Bauer). Wer das Regelwerk will, braucht dafür keinen Reverse-Engineering-Aufwand.
- **Wichtig für den Rechtsschutz:** Wird das Regelwerk ohne Geheimhaltung an jeden Nutzer ausgeliefert, fehlt die „angemessene Geheimhaltungsmaßnahme“. Dann ist der Geheimnisschutz nach GeschGehG kaum noch zu begründen 🔶. Reverse Engineering eines rechtmäßig erhaltenen Produkts ist nach § 3 GeschGehG grundsätzlich erlaubt, **außer** es ist vertraglich ausgeschlossen (Abschnitt 3).
- Gegengewicht: Die Regeln sind aus öffentlichen Quellen ableitbar, und ein Nachbauer braucht trotzdem Fotoerkennung, Pflege (z. B. neue TAB 2026) und Vertrieb. Das Regelwerk allein ist kein uneinnehmbarer Graben, aber eine Zusammenstellung, die man nicht kostenlos verschenken muss.

**Lösungsskizze: Regelauswertung in die Edge Function**
1. Neue Route `POST /bewerte` in `supabase/functions/api`: Eingaben rein, Ergebnis raus. Der Server enthält `regeln.json` + Logik (z. B. unter `supabase/functions/_shared/`, damit die Tests sie weiter laden).
2. Antwort: Ampel/Ergebnis, **nur die ausgelösten** Regeln (ID, Name, Maßnahme, Fundstelle), „offene Punkte“ mit Ergebnis im schlimmsten Fall, Messkonzept. Nie die Bedingungen oder nicht ausgelöste Regeln.
3. App: `regelwerk.ts` und `regeln.json` aus dem Bundle entfernen, `main.ts` ruft `/bewerte` auf (`api.ts`); das Typ-Modell (`modell.ts`) bleibt.
4. Offline: Die App speichert Fälle schon lokal und sendet nach (Review 29.09.). Die Bewertung braucht dann Netz. Ohne Netz: „Bewertung folgt, sobald Verbindung besteht“. Auf der Baustelle ohne Empfang ist das ein echter Nachteil – gegen Schutz abwägen, das ist eine Produktentscheidung.
5. Demo: Beispielergebnisse fest einbauen (vorberechnet), kein Regelwerk im Demo-Build.
6. Tests: die Regeltests laufen weiter gegen das Server-Modul (Vitest importiert dieselbe Logik).
7. **Restrisiko bleibt:** Wer viele Eingabekombinationen abfragt, kann Regeln nachbauen. Dagegen helfen Login pro Person (statt gemeinsamem `APP_CODE`), Mengenlimit pro Konto und Nutzungsbedingungen. Vollständig verhindern lässt es sich nicht, nur verteuern.
8. Aufwand grob 1–2 Tage; keine neuen Kosten (Edge Function läuft ohnehin). Edge Function muss danach neu eingespielt werden (zusammen mit der Härtung vom 03.10., siehe [[App & Technik]]).

Zusatz: Das Regelwerk liegt auch **im Vault** ([[Regelwerk R01–R26]], Volltext) und im Code-Repo (`regeln.json`). Beide Repositories müssen **privat** sein 🔶 *(Sichtbarkeit nicht von hier prüfbar → Aufgabe)*. In der Direktansprache und den Rätsel-Posts ([[Instagram-Posts 1–10]]) steht außerdem bewusst einzelnes Regelwissen öffentlich. Das ist als Marketing richtig, heißt aber: Einzelregeln sind nicht geheim, nur die vollständige, geprüfte Sammlung.

## 3. Verträge
| Instrument | Wofür | Hinweis |
|---|---|---|
| **Testvereinbarung / NDA** für Tester und Kollegen | Zusagt Vertraulichkeit über Regelwerk, Ergebnisse, Zugang; schließt Reverse Engineering aus (sonst nach § 3 GeschGehG erlaubt); keine Weitergabe des Zugangs | Als **einseitige Kurzfassung** (1 Seite, Annahme per Häkchen beim ersten Login) wirkt weniger abschreckend als ein Papier-NDA unter Kollegen. Inhalt: Zweck, Definition „vertraulich“, Ausnahmen (öffentlich bekannt), Dauer (2–3 Jahre), Rückgabe/Löschung. Vertragsstrafe nur mit anwaltlicher Formulierung (Angemessenheit). 🔶 |
| **Nutzungsbedingungen** für den Betrieb | Nutzungsrecht nur für eigene Prüfungen, kein Kopieren, Scrapen, automatisiertes Abfragen, kein Reverse Engineering, keine Weitergabe des Zugangs; Haftungshinweis (Ersteinschätzung, Prüfung durch Elektrofachkraft nötig, maßgeblich ist die TAB des Netzbetreibers) | B2B-Bedingungen (AGB-Recht, §§ 305 ff. BGB) sind fehleranfällig → vom Anwalt prüfen lassen. Passt zu [[Rechtliches]] (Haftungshinweis steht bereits im Impressum-Entwurf). |
| **Zugang nur mit Login** | Wer kopiert, ist identifizierbar; Zugang entziehbar; Mengenlimit pro Person | Der gemeinsame `APP_CODE` ist dafür zu grob (steht auch in [[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]] als Warnung). Aufgabe „Login statt Zugangscode“ steht unter „Irgendwann“ und gehört **vor** den Test mit Kollegen. |
| **Auftragsverarbeitung** (Supabase, Anthropic, Netlify) | Fotos von Kundenanlagen: DSGVO | Gehört in [[Rechtliches]], nicht zum Diebstahlschutz, aber ebenfalls vor dem Betrieb nötig. |

## 4. Arbeitgeber-Frage (offen – Anwalt/Steuerberater)
Ob und wie das Projekt neben einer Anstellung im Elektrohandwerk entsteht, ist im Vault nicht dokumentiert. Das sind die Fragen, die zu klären sind. **Ich beantworte sie hier nicht,** weil sie vom Arbeitsvertrag und vom Einzelfall abhängen.
1. 🔶 **Wem gehört der Code?** Für Programme, die ein Arbeitnehmer „in Wahrnehmung seiner Aufgaben oder nach Anweisung“ schafft, gehen die Verwertungsrechte nach § 69b UrhG auf den Arbeitgeber über. Programmieren gehört vermutlich nicht zu den Aufgaben eines Elektrikers, aber Formulierungen im Vertrag, Arbeitszeit/-mittel und der Bezug zur Arbeit sind entscheidend.
2. 🔶 **Arbeitnehmererfindung (ArbNErfG)?** Das Gesetz greift bei patent- oder gebrauchsmusterfähigen Erfindungen. Weil Software nicht patentierbar ist (Abschnitt 1), eher unwahrscheinlich – aber klären lassen.
3. 🔶 **Nebentätigkeit:** Muss sie angezeigt oder genehmigt werden? Viele Verträge verlangen das, besonders bei Tätigkeit im selben Gewerbe.
4. 🔶 **Wettbewerb:** Während des Arbeitsverhältnisses gilt eine Treuepflicht (Konkurrenzverbot). Die Zielgruppe sind Elektrobetriebe – darunter evtl. Konkurrenten des Arbeitgebers oder der Arbeitgeber selbst als Kunde. Ein nachvertragliches Wettbewerbsverbot ist nur mit Karenzentschädigung wirksam.
5. 🔶 **Herkunft des Wissens und der Daten:** Stammen Fotos, Fälle oder Zählerplatz-Beispiele aus Aufträgen des Arbeitgebers? Das wären dessen Betriebsgeheimnisse bzw. Kundendaten (und DSGVO). Wichtig: für die Tests nur eigene oder ausdrücklich freigegebene Schränke, ohne Adresse/Name/Zählernummer (→ [[Aufgaben]], „Eigene Fotos echter Zählerschränke“).
6. 🔶 **Quellen:** Die „Westnetz-Schulung Bewertung von Zählerplätzen in Bestandsanlagen (09/2025)“ ist Quelle für mehrere Regeln. Gab es Teilnahmebedingungen oder Hinweise zur Weitergabe/Verwendung? Fundstellen zitieren ist üblich; wörtliche Übernahmen vermeiden.
7. 🔶 **Steuer/Gewerbe:** Gewerbeanmeldung, Kleinunternehmer, Umsatzsteuer, Anzeige beim Finanzamt, sobald Einnahmen entstehen (Steuerberater). Impressum-Zeile „Berufsbezeichnung/Kammer/Handwerksrolle“ hängt davon ab, ob die Seite zum Handwerksbetrieb gehört ([[Rechtliches]]).

**Praktisch:** Arbeitsvertrag und Betriebsvereinbarungen selbst auf „Nebentätigkeit“, „Erfindungen“, „Wettbewerb“, „Geheimhaltung“ durchlesen, die Stellen markieren, dann eine Erstberatung nehmen (Fachanwalt Arbeitsrecht oder Rechtsberatung der Gewerkschaft bzw. der Arbeitnehmerkammer, falls Mitglied; Kosten 🔶 je nach Anbieter 0–ca. 250 €).

## 5. Realistischer Schutz: Tempo und Vorsprung
Nachbauen lässt sich vieles. Schwer zu kopieren ist:
- **Echte Fälle samt tatsächlicher Entscheidung.** Daraus entstehen Trefferquote und Fehlerbilder ([[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]). Ein Nachbauer startet bei null. → 20 Fälle sind der erste Meilenstein.
- **Pflege des Regelwerks.** Neue TAB, neue Netzbetreiber (Westnetz-TAB nach BDEW-Musterwortlaut 2026 beobachten). Ein veraltetes Regelwerk ist wertlos; wer aktuell bleibt, hat den Vorsprung.
- **Netzwerk und Vertrauen** im Handwerk ([[Mein Vorteil]]): Kollegen kennen dich, Innung/Kammern ([[Direktansprache]]). Das kopiert niemand per Download.
- **Name und Wiedererkennung** („Zählerklar“, Marke).
- **Weitere Zielgruppen/Funktionen** (SHK, Fotos vom Kunden) vor dem Nachbauer besetzen.
- **Unschärfe:** Eine Konkurrenzrecherche (wer bietet Ähnliches?) fehlt noch (→ Projektnotiz, Wettbewerb „noch nicht recherchiert“). Ohne sie ist unklar, wie groß die Kopier-Gefahr überhaupt ist. Kleine Aufgabe, ohne Zugangsdaten.

Heißt: Der beste Schutz ist, in den nächsten Wochen Daten und Kunden zu sammeln, statt hinter einer Mauer zu bauen, hinter der noch nichts liegt. Das Schutzkonzept soll die Validierung nicht verdrängen ([[Ideen-System]], Regel „erst verkaufen, dann bauen“).

## 6. Maßnahmen nach Priorität
| # | Maßnahme | Wer | Kosten | Aufwand | Wann |
|---|---|---|---|---|---|
| 1 | Beide Repos (Code + Vault) auf **privat** prüfen; Suche nach Geheimnissen im Verlauf | du | 0 € | 15 Min | sofort |
| 2 | Arbeitsvertrag lesen (Nebentätigkeit, Erfindungen, Wettbewerb, Geheimhaltung) und Erstberatung zur Arbeitgeber-Frage | du + Anwalt | 🔶 0–250 € | 1–2 Std + Termin | **vor dem ersten Euro / vor Kollegen-Test** |
| 3 | Nur eigene oder freigegebene Schränke ohne Personenbezug für Tests nutzen | du | 0 € | laufend | sofort |
| 4 | Zugang für Tester nur persönlich und einzeln, Zugangscode ≥ 20 Zeichen (steht schon in [[App & Technik]]) | du | 0 € | 10 Min | vor Test |
| 5 | **Regelwerk serverseitig** (Code-Aufgabe, Abschnitt 2) | Nachtschicht (Code) | 0 € | 1–2 Tage | nach den 5 Gesprächen, **vor** der Weitergabe der App an Kollegen |
| 6 | **Login statt Zugangscode** (Konto je Tester, Mengenlimit) | Nachtschicht/du (Supabase-Auth braucht Konfiguration im Dashboard) | 0 € | 1–3 Tage | vor Test mit Kollegen |
| 7 | Entwurf Testvereinbarung (1 Seite) + Nutzungsbedingungen als Text | Nachtschicht (Text) | 0 € | 2 Std | vor Test |
| 8 | Anwaltlich prüfen: Testvereinbarung, Nutzungsbedingungen, Impressum/Datenschutz zusammen mit [[Rechtliches]] | Anwalt | 🔶 ca. 300–800 € (Schätzung) | 1 Termin | vor Livegang |
| 9 | Markenrecherche DPMA, dann Anmeldung „Zählerklar“ (Kl. 9, 42) | du | 🔶 Recherche 0 €, Anmeldung ca. 290 € | 2 Std | nach Go; Name vor Druck prüfen (steht in [[Aufgaben]]) |
| 10 | Konkurrenzrecherche (was gibt es schon, wie nah?) | Nachtschicht (Web, ohne Zugangsdaten) | 0 € | 2 Std | Als Nächstes |
| 11 | Patent/Gebrauchsmuster | – | – | – | **nicht verfolgen** |
| 12 | Regelwerk-Nutzungsrechte der Westnetz-Schulung klären (Teilnahmebedingungen) | du | 0 € | 30 Min | vor Livegang |

**Reihenfolge-Hinweis:** Die Maßnahmen 5–7 sind Infrastruktur und stehen deshalb bewusst **hinter** den Gesprächen ([[Gesprächsleitfaden]]). Sie sind Voraussetzung dafür, dass die App an Kollegen geht, nicht dafür, dass Gespräche stattfinden.
