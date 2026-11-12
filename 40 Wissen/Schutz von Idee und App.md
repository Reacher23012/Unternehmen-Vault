---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-11-12
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App („Zählerklar“)

> **Keine Rechtsberatung.** Das ist eine Sortierung der Fragen und Optionen aus allgemeinem Wissen, ohne Recherche in Gesetzestexten und Rechtsprechung. Alles mit **⚖ Anwalt** muss vor einer Entscheidung geprüft werden. Zahlen (Gebühren) sind Größenordnungen, vor Nutzung beim DPMA nachsehen.

**Kurzfassung:** Die *Idee* ist nicht schützbar. Schützbar sind der Code, der Name und mit Einschränkung das Regelwerk. Der teuerste Fehler heute ist technisch: Das ganze Regelwerk steckt im App-Bundle und liegt bei jedem Nutzer im Browser. Der größte Schutz ist realistisch **Tempo + Netzwerk + echte Falldaten** (siehe 5). Vor Verträgen und Marke kommen aber weiterhin die Validierungsgespräche (Vorrang laut [[2026-10-02 Ideen-Check]]).

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Einschätzung für Zählerklar |
|---|---|---|
| **Idee / Geschäftskonzept** („Foto rein, Ampel raus“) | keiner | Nicht schützbar, kann jeder nachbauen. Wert liegt in Umsetzung und Fachinhalt. |
| **Quellcode / App** | Urheberrecht für Software (UrhG §§ 69a ff.), entsteht automatisch, keine Anmeldung | Schützt vor *Kopieren des Codes*, nicht vor Nachbau mit eigenem Code. Dokumentierter Entstehungsstand (Git-Historie, Datum) ist ein brauchbarer Nachweis. |
| **Name „Zählerklar“** | Marke (DPMA-Anmeldung, Klassen 9/42; Schutz 10 Jahre, verlängerbar) oder nur Benutzungsmarke/Unternehmenskennzeichen bei tatsächlicher Nutzung | Marke ist der einzige Schutz, der sich *günstig* kaufen lässt. Anmeldung grob im Bereich einiger hundert € für bis zu 3 Klassen (Gebühr prüfen). Recherche zuerst (offene Aufgabe, [[ADR-0006 Produktname Zählerklar]]). Beschreibende Anteile („Zähler…“) können die Schutzfähigkeit schwächen. ⚖ |
| **Regelwerk R01–R26 / Know-how** | Geschäftsgeheimnisgesetz (GeschGehG): Schutz nur, wenn die Information **geheim**, **wirtschaftlich wertvoll** ist und durch **angemessene Geheimhaltungsmaßnahmen** geschützt wird | Zwei Schwächen: (a) Inhalt basiert weitgehend auf öffentlichen Quellen (BDEW-Musterwortlaut, TAB, VDE-Fundstellen, Westnetz-Schulung) – geheim ist höchstens die *Zusammenstellung und Bewertung*. (b) Ohne Maßnahmen (heute: keine) gibt es gar keinen Geheimnisschutz. Außerdem erlaubt das GeschGehG grundsätzlich *Reverse Engineering* eines rechtmäßig erlangten Produkts, **sofern nicht vertraglich ausgeschlossen** → deshalb Nutzungsbedingungen (3). ⚖ |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist nicht patentierbar; nur technische Lösungen mit technischem Effekt, Gebrauchsmuster schließt Verfahren aus | Für eine Regelauswertung mit Foto-Erkennung praktisch **nicht sinnvoll**: teuer, langsam, geringe Erfolgsaussicht, Veröffentlichung verrät die Idee. Nicht verfolgen. ⚖ nur falls später eine technische Besonderheit entsteht. |
| **Datenbank / Zusammenstellung** | Urheberrecht an der Auswahl, Datenbankherstellerrecht bei wesentlicher Investition | Möglicher Zusatzschutz für gesammelte Fälle (Fotos + Entscheidungen). Nicht tragend. ⚖ |
| **Fremde Texte** | Urheberrecht der Normgeber | Wir übernehmen bewusst nur Fundstellen, keine Normtexte ([[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]). Das schützt uns, nicht das Regelwerk. |

## 2. Technischer Befund: Das Regelwerk liegt im Browser
**Geprüft im Code (Stand `master`):**
- `web/src/regelwerk.ts` importiert `./regeln.json` (14 KB: je Regel Bedingung, Maßnahme, Stufe, Fundstelle, Geltung, Status) und enthält die komplette Auslösungslogik (`ausgeloesteRegeln`, `bewerte`, `messkonzept`).
- `main.ts` ruft `bewerte(...)` **im Browser** auf. Die Edge Function (`supabase/functions/api`) macht nur Fotoanalyse und Fall-Speicher.
- Folge: Wer die App öffnet, bekommt das **gesamte Regelwerk** mit allen 26 Regeln, Bedingungen und Fundstellen als lesbare JavaScript-/JSON-Datei, auch ohne App-Code zu kennen, sobald die Seite öffentlich gehostet ist. Auch das minifizierte Bundle ist in Minuten lesbar.

**Risiko bewerten:**
| Aspekt | Einschätzung |
|---|---|
| Wert des Regelwerks | Mittel. Quellen sind öffentlich, aber die Aufbereitung (Bestandsbewertung, Fundstellen, Ampel) ist Arbeit und der eigentliche Vorsprung ([[Mein Vorteil]]). |
| Aufwand zum Kopieren heute | Praktisch null (Datei herunterladen). |
| Geheimnisschutz | Mit offenem Regelwerk im Bundle kaum zu begründen („angemessene Maßnahmen“ fehlen). |
| Schaden | Konkurrent oder Kollege baut dieselbe Regelprüfung ohne Entwicklung nach; Foto-Erkennung bleibt dann sein einziger Aufwand. |
| Dringlichkeit | Wird erst relevant, wenn die App **öffentlich** erreichbar ist (Netlify, offene Aufgabe) oder Dritte Zugang bekommen (Tester). Solange nur der Eigentümer sie lokal nutzt: kein Handlungsdruck. |

**Lösungsskizze „Regelwerk serverseitig“:**
1. `regeln.json` und die Auswertung wandern in die Edge Function (neue Route `POST /bewerte`, Eingabe = die Schrank- und Vorhabenfelder, Ausgabe = Ampel, Maßnahmen mit Fundstelle, „Vor Ort klären“, Hinweise, Messkonzept).
2. Die App rendert nur noch das Ergebnis. Das Ergebnis muss die Texte enthalten, die der Nutzer sehen soll – das ist beabsichtigt: er sieht das *Resultat für seinen Fall*, nicht die ganze Entscheidungstabelle.
3. Die Tests (`regelwerk.test.ts`, 13 Tests) laufen weiter gegen das Regelmodul; das Modul wird nur im Backend-Paket gebündelt und nicht mehr von `main.ts` importiert.
4. Zusätzliche Härtung nötig, sonst bleibt das Regelwerk durch systematisches Abfragen auslesbar: **Login statt gemeinsamer `APP_CODE`** (siehe „Irgendwann“ in [[Aufgaben]], dann vorziehen), Rate-Limit je Konto, Protokoll auffälliger Abfragemuster, ggf. Ausgabe nur für Fälle mit Foto-Analyse.
5. **Grenzen ehrlich:** Auch serverseitig ist ein *Black-Box-Nachbau* durch viele Testabfragen möglich, nur teurer und auffälliger. Es verhindert das triviale Herunterladen, nicht jeden entschlossenen Gegner. Außerdem wird der geplante Offline-Modus ([[App & Technik]], „Offen“) dadurch schwieriger (Regelwerk müsste dann doch lokal liegen → entweder Offline streichen oder nur das Ergebnis des letzten Checks zwischenspeichern). Der lokale Demo-/Offline-Betrieb ohne Backend (`demo.ts`, `npm run build:demo`) entfällt oder zeigt nur Beispieldaten.
6. Aufwand grob: 1 Nachtschicht (Route + Umstellung + Tests anpassen), Risiko gering. Deshalb als eigene Code-Aufgabe angelegt (siehe 6).

**Weitere Fundstellen im Repo bzw. Vault prüfen:**
- Vault enthält `Regelwerk R01–R26` und die Excel-Datei `Anhänge/Entscheidungsbaum_Zaehlerschrank.xlsx`; GitHub-Repos `unternehmen-vault` und `zaehlerschrank-check` sollten **privat** bleiben (Sichtbarkeit prüfen!). Öffentliche Repos würden alles Obige aushebeln.
- Das Demo-Artifact auf claude.ai enthält das Regelwerk ebenfalls; es ist privat, nicht weitergeben.
- Landingpage verrät nur Marketing-Aussagen, nicht das Regelwerk (keine Regeln auf der Seite, Instagram-Rätsel zeigen jeweils nur einzelne Regeln – bewusst dosieren).

## 3. Verträge und Zugang
| Baustein | Zweck | Hinweise |
|---|---|---|
| **NDA für Tester/Kollegen** | Macht „angemessene Geheimhaltungsmaßnahme“ nachweisbar; bindet Tester | Kurz (1 Seite), mit klarer Definition (Regelwerk, Bewertungslogik, Falldaten), Laufzeit, Rückgabe. Muster per Anwalt/Kammer prüfen ⚖. Realistisch: Kollegen unterschreiben ungern Papier – für unkritische Gespräche reicht mündlich, für **Mittester mit Zugang** schriftlich/elektronisch (Häkchen bei Login-Anlage). |
| **Nutzungsbedingungen / AGB** | kein Kopieren, kein Auslesen, kein Reverse Engineering, kein Weitergeben des Zugangs, persönliche Lizenz | Vertraglicher Ausschluss von Reverse Engineering ist wichtig, weil das GeschGehG es sonst erlaubt. Gegenüber Unternehmen (B2B) leichter zu gestalten als gegenüber Verbrauchern. ⚖ |
| **Zugang nur mit Login** | Wer nicht eingeloggt ist, bekommt weder Regelwerk noch Ergebnisse | Heute: ein gemeinsamer `APP_CODE`, kein Rate-Limit ([[App & Technik]]). Reicht für den Eigengebrauch, **nicht** für Tester. Login (Supabase Auth) ist die Voraussetzung für Konten, Sperren und Protokoll. |
| **Haftungs-/Hinweistext** | App ersetzt keine Prüfung vor Ort | steht schon in Impressum-Entwurf, siehe [[Rechtliches]]. |
| **Auftragsverarbeitung** | Supabase, Netlify, Anthropic | gehört nicht zum Ideenschutz, aber in dieselbe Rechts-Runde. |

## 4. Offene Frage: Wem gehört die Idee, wenn sie im Rahmen einer Anstellung im Elektrohandwerk entstand?
**Das ist der Punkt mit dem größten Risiko und gehört zuerst zu einem Anwalt (Arbeitsrecht/IP).** Mögliche Berührungspunkte, alles ⚖ **offen**:
- **Urheberrecht an Software (UrhG § 69b):** Entsteht Code in Wahrnehmung der Aufgaben aus dem Arbeitsverhältnis oder nach Anweisung, stehen die Nutzungsrechte grundsätzlich dem Arbeitgeber zu. Bei Programmierung in der Freizeit für ein eigenes Projekt ist es normalerweise nicht so – es kommt auf Aufgabenbereich und Arbeitsvertrag an. Ein Elektriker hat in der Regel keine Programmieraufgaben; trotzdem: Arbeitsvertrag lesen.
- **Arbeitnehmererfindungsgesetz:** betrifft nur patent-/gebrauchsmusterfähige Erfindungen (bei Software kaum relevant, siehe 1).
- **Know-how aus der Arbeit:** Das Regelwerk speist sich aus Fachwissen, Schulungen (z. B. Westnetz-Schulung) und evtl. Betriebsunterlagen. Wenn **Unterlagen, Fälle oder Kundendaten des Arbeitgebers** verwendet wurden, drohen Geheimhaltungs- und Treuepflichtverletzungen. Klären, woher jede Regel stammt (Spalte „Fundstelle“ in `regeln.json` ist dafür ein guter Anfang: öffentlich zugängliche Quelle ja/nein).
- **Nebentätigkeit / Wettbewerb:** Viele Arbeitsverträge verlangen Anzeige oder Genehmigung von Nebentätigkeiten; während des Arbeitsverhältnisses besteht ein Wettbewerbsverbot gegenüber dem Arbeitgeber (Zählerklar richtet sich an Elektrobetriebe – evtl. an Wettbewerber oder gar den Arbeitgeber selbst als Kunde). Fotos von Schränken in der Arbeitszeit/bei Kundenaufträgen: Datenschutz und Zustimmung des Arbeitgebers.
- **Branche/Kunden:** Vertrieb an Kollegen aus dem eigenen Umfeld kann Loyalitätsfragen berühren.

Vorbereitung für den Anwaltstermin (Checkliste): Arbeitsvertrag + Nebentätigkeitsklausel, Zeitpunkt der Entstehung (Git-Historie, Vault-Datum 29.09.2026), Liste aller Wissensquellen je Regel, Hardware/Zeit (privat vs. Arbeitszeit), Zielkunden. Ein Erstgespräch kostet im Allgemeinen wenig bis einen mittleren zweistelligen/niedrigen dreistelligen Betrag (nachfragen). Alternativ erste Orientierung über Handwerkskammer-Rechtsberatung oder Gründerberatung (Mitglieder oft kostenlos) – ersetzt aber keinen Anwalt für den Arbeitsvertrag. **Bis dahin: keine Arbeitgeber-Unterlagen, -Fotos oder -Kundendaten in Regelwerk, Tests oder Vault.**

## 5. Realistischer Schutz: Tempo statt Paragraphen
Ehrlich: Gegen einen entschlossenen Nachbauer schützt kein Papier zuverlässig. Was bei einer Nischen-App im Handwerk wirklich trägt:
1. **Vorsprung:** erster am Markt mit belegtem Regelwerk für Westnetz, Bekanntheit bei den Kollegen ([[Direktansprache]]), Name als Marke.
2. **Netzwerk und Vertrauen:** Persönliche Beziehungen zu Elektrobetrieben und Innung lassen sich nicht kopieren ([[Mein Vorteil]]).
3. **Daten aus echten Fällen:** Fälle + „tatsächliche Entscheidung“ + Foto-Korrekturen ergeben Trefferquote und mit der Zeit bessere Erkennung. Das Datenbestand-Argument wird erst mit Volumen stark – ein weiterer Grund, die 20 Fälle und Gespräche zuerst zu liefern.
4. **Pflege des Regelwerks:** Regeln ändern sich (neue Westnetz-TAB, BDEW 2026). Ein Nachbau von heute ist in einem Jahr veraltet, wenn er nicht gepflegt wird. Aktualität ist ein Abo-Argument ([[Geldmodelle für KI-Ideen]]).
5. **Breite statt Tiefe offenlegen:** Marketing-Rätsel zeigen einzelne Regeln, nie die Gesamttabelle ([[Instagram-Posts 1–10]]).

## 6. Maßnahmenliste (priorisiert)
Reihenfolge nach Nutzen vs. Kosten **und** nach der Regel „erst verkaufen, dann bauen“: Nichts hiervon geht vor den Gesprächen/Validierung, außer den Punkten, die ohnehin billig und vor Livegang Pflicht sind.

| # | Maßnahme | Wann | Kosten | Aufwand | Wer |
|---|---|---|---|---|---|
| 1 | Beide GitHub-Repos auf **privat** prüfen; keine Schlüssel im Verlauf | sofort | 0 € | 5 Min. | Nutzer |
| 2 | Arbeitsvertrag lesen (Nebentätigkeit, Geheimhaltung, Erfindungen), Erstgespräch Anwalt ⚖ (Frage 4) | **vor Livegang/Verkauf** | gering bis mittel | 1–2 Std. + Termin | Nutzer |
| 3 | Keine Arbeitgeber-/Kundendaten im Regelwerk; Quellenliste je Regel | laufend | 0 € | 1 Std. | Nutzer |
| 4 | **Regelwerk serverseitig** (Code, Edge Function, Tests) | **vor erstem Tester mit Zugang / vor öffentlichem Hosting** | 0 € | 1 Nachtschicht | Nachtschicht |
| 5 | **Login statt gemeinsamem Zugangscode**, Rate-Limit | zusammen mit 4, vor Kollegen-Test | 0 € | 1–2 Nachtschichten | Nachtschicht |
| 6 | NDA-Kurzfassung + Nutzungsbedingungen (kein Kopieren/Auslesen/RE) prüfen lassen ⚖ | vor Zugang für Tester | niedrig bis mittel | 2–3 Std. + Prüfung | Nutzer + Anwalt |
| 7 | Markenrecherche (DPMA), dann Markenanmeldung „Zählerklar“ (Klassen 9, 42), DENIC `zaehlerklar.de` | vor Druck der Flyer | Gebühr DPMA im niedrigen dreistelligen Bereich + ggf. Anwalt | 1–2 Std. | Nutzer |
| 8 | Nutzungsbedingungen-Zustimmung beim Login in der App (Häkchen, Protokoll) | mit 5 | 0 € | klein | Nachtschicht |
| 9 | Zeitstempel/Nachweis der Entstehung (Git-Verlauf bewahren, Release-Tags) | laufend | 0 € | – | – |
| 10 | Patent/Gebrauchsmuster | **nicht verfolgen** | hoch | – | – |

## Offene Fragen für Anwalt / Steuerberater
- ⚖ Arbeitsverhältnis: Rechte an Idee/Regelwerk/Code, Nebentätigkeit, Wettbewerbsverbot (Abschnitt 4).
- ⚖ Reichen NDA + Nutzungsbedingungen aus, damit das Regelwerk als Geschäftsgeheimnis gilt, obwohl es überwiegend aus öffentlichen Quellen besteht?
- ⚖ Marke: Schutzfähigkeit von „Zählerklar“ (beschreibende Anteile), Klassenwahl, Kollisionsrisiko.
- ⚖ Haftung bei Fehlbewertung der App (Haftungsausschluss, Versicherung) – gehört zu [[Rechtliches]].
- Steuerberater: Gewerbeanmeldung/Nebengewerbe, Kleinunternehmerregelung, wenn erste Einnahmen kommen.

Siehe auch [[Ideen-System]] (Regel „erst verkaufen, dann bauen“), [[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]] (Zugangscode als einfacher Schutz).
