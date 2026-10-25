---
typ: wissen
thema: schutz
projekt: "[[Zählerschrank-Check]]"
stand: 2026-10-15
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App („Zählerklar“)

> **Keine Rechtsberatung.** Alles Rechtliche unten ist eine Orientierung aus allgemeinem Wissen, nicht gegen aktuelle Quellen geprüft. Was unsicher ist, steht als **⚖ Anwalt prüfen**.

**Kurzfazit:** Die Idee selbst ist nicht schützbar. Schützbar sind Code (automatisch), Name (Marke) und das Regelwerk – Letzteres nur, wenn man es wirklich geheim hält, und genau das tut die App heute **nicht**. Der echte Schutz ist Tempo, Netzwerk und eigene Falldaten. Dazu eine klare Reihenfolge: erst Gespräche ([[Validierung & Go-No-Go]]), dann billige Maßnahmen, Technik-Umbau erst nach Go.

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Kosten / Aufwand | Einschätzung |
|---|---|---|---|
| **Idee** („Foto → Zählerschrank-Einordnung“) | keiner. Ideen sind frei, Wettbewerb darf sie nachbauen | – | Niemand muss die Idee „stehlen“; sie ist schon im Markt denkbar |
| **Quellcode** | Urheberrecht (§ 69a ff. UrhG) entsteht automatisch, schützt die konkrete Programmierung, nicht die Funktion | 0 € | Nachbauen mit eigenem Code bleibt erlaubt. Hilft gegen 1:1-Kopie |
| **Name / Logo** | Marke beim DPMA (Wort-/Bildmarke). Alternativ nur Schutz durch Benutzung, schwächer | Anmeldegebühr grob einige hundert € je Marke (aktuelle Gebühr beim DPMA nachsehen) + Recherche | Sinnvoll erst nach Namensprüfung ([[ADR-0006 Produktname Zählerklar]]) und wenn es Umsatz-Aussicht gibt |
| **Regelwerk / Know-how** (R01–R26, Auslegung der TAB) | Geschäftsgeheimnisgesetz (GeschGehG): nur geschützt, wenn es **geheim ist, wirtschaftlichen Wert hat und „angemessene Geheimhaltungsmaßnahmen“ getroffen wurden** | Organisation, ggf. NDA, Technik | Der wunde Punkt, siehe 2. ⚖ Anwalt: was gilt als „angemessen“? |
| **Rohinhalte** (TAB, Normen, BDEW-Wortlaut) | gehören anderen (Urheberrecht der Herausgeber) | – | Bewusst nur Fundstellen, keine Normtexte ([[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]). Die *Auswahl und Verknüpfung* ist unsere Leistung, die Fakten selbst sind nicht schützbar |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist nicht patentierbar; nur mit technischem Beitrag, und das ist hier unwahrscheinlich. Kosten fünfstellig, Veröffentlichung der Details | hoch | **Nicht verfolgen.** ⚖ nur falls Patentanwalt gegenteilig rät |
| **Datenbank** (Fälle, Fotos) | Datenbankherstellerrecht möglich bei wesentlicher Investition | – | Später relevant, wenn echte Falldaten wachsen |

## 2. Technischer Befund: Regelwerk liegt im Browser
Geprüft im Code (`zaehlerschrank-check`, Stand 15.10.2026):
- `web/src/regelwerk.ts` importiert `./regeln.json` (14 KB, 26 Regeln mit **Bedingung, Maßnahme, Stufe, Fundstelle, Geltung, Status**) und enthält die Auswertung (`ausgeloesteRegeln`, `bewerte`, `messkonzept`).
- `web/src/main.ts` ruft `bewerte(...)` **im Browser** auf. Die Edge Function `supabase/functions/api/index.ts` macht nur Fotoanalyse und Fall-Speicher, den `x-app-code` verlangt sie nur für diese Routen.
- Folge: Wird die App bei Netlify gehostet, wird das **gesamte Regelwerk als JavaScript an jeden Besucher ausgeliefert**, auch ohne Zugangscode. Quelltext ansehen oder `regeln.json` aus dem Bundle ziehen dauert Minuten. Selbst Minifizierung ändert daran nichts.

**Bewertung:**
- **Risiko heute: gering bis mittel.** Es gibt noch keine Nutzer, die App ist nicht online. Das Regelwerk besteht überwiegend aus öffentlich zugänglichen Quellen (TAB, BDEW, Westnetz-Schulung), der Wert liegt in der Zusammenstellung und Auslegung.
- **Rechtlich schwächt es die Position:** Wer das Regelwerk jedem Besucher frei ausliefert, kann sich schwer auf „angemessene Geheimhaltungsmaßnahmen“ nach GeschGehG berufen. ⚖ Anwalt prüfen.
- **Wettbewerbs-Realität:** Ein Kopierer bräuchte trotzdem Fotoerkennung, Backend, Vertrauen der Betriebe. Das Regelwerk allein ist nicht das Produkt.

**Lösungsskizze (nach Go, nicht vorher):**
1. Auswertung in die Edge Function verlegen: neue Route `POST /bewerte` mit `x-app-code` bzw. später Login, Eingaben rein, **Ergebnis + Fundstelle** raus.
2. `regeln.json` und `regelwerk.ts` aus dem Web-Bundle entfernen; im Backend als Modul oder Tabelle halten. Die App zeigt nur die ausgelösten Regeln.
3. Tests (`regelwerk.test.ts`) bleiben, laufen gegen das gemeinsame Modul.
4. Preis: Ein Netz-Roundtrip pro Bewertung, Offline-Betrieb entfällt (ist ohnehin „erst nach Go“, siehe [[App & Technik]]). Der Demo-Build braucht eine Variante mit Beispieldaten.
5. Restrisiko bleibt: Wer Konto hat, kann Ergebnisse systematisch abfragen und das Regelwerk **rekonstruieren**. Gegenmittel: Login pro Betrieb, Rate-Limit, Nutzungsbedingungen (Abschnitt 3), Auffälligkeiten beobachten. Vollständig verhindern lässt es sich nicht.

## 3. Verträge und Zugang
- **NDA für Tester/Kollegen:** kurz (1–2 Seiten): was vertraulich ist (Regelwerk, Testversion, Ergebnisse), Zweck, Dauer, Rückgabe/Löschung, keine Weitergabe. Die vier Tester sollten sie *vor* dem Zugang unterschreiben. Gespräche ohne Zugang zur App brauchen keine. ⚖ Anwalt: Vorlage prüfen, Vertragsstrafe-Klausel nur mit Rat.
- **Nutzungsbedingungen/AGB:** kein Kopieren, kein Auslesen, kein Reverse Engineering (soweit gesetzlich zulässig), Nutzung nur für eigenen Betrieb, keine Weitergabe des Zugangs. Gehört zusammen mit [[Rechtliches]] geprüft.
- **Zugang nur mit Login:** heutiger Zugangscode ist ein einziger gemeinsamer Schlüssel ([[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]]). Vor dem Kollegen-Test: Login je Nutzer (steht schon unter „Irgendwann“), damit Weitergabe nachvollziehbar und sperrbar ist.
- **Keine Geheimnisse in Public-Bereichen:** Landingpage und Instagram zeigen das Prinzip (Rätsel), nie das vollständige Regelwerk.

## 4. Arbeitgeber-Frage (offen, ⚖ Anwalt/Steuerberater)
Wem gehört die Idee, wenn sie während einer Anstellung im Elektrohandwerk entstanden ist? Zu klären, **bevor Geld fließt**:
- **Arbeitsvertrag lesen:** Nebentätigkeitsklausel, Genehmigungspflicht, Wettbewerbsverbot, Verschwiegenheit, Regelung zu Arbeitsergebnissen.
- **Wettbewerb:** Verkauft ein Arbeitgeber selbst Prüfungen/Zählerschrank-Leistungen, kann eine Konkurrenztätigkeit während des Arbeitsverhältnisses verboten sein.
- **Arbeitnehmererfindungsgesetz:** gilt für patent-/gebrauchsmusterfähige Erfindungen. Bei Software eher selten, wahrscheinlich nicht einschlägig, aber nicht ausschließen. Reines Urheberrecht an Software, die in Erfüllung von Arbeitspflichten entsteht, liegt nach § 69b UrhG beim Arbeitgeber.
- **Wissen aus dem Betrieb:** Auf Arbeitszeit, mit Arbeitsmitteln, internen Unterlagen oder Westnetz-Schulung des Arbeitgebers erarbeitetes Wissen ist heikel. Die Regelwerk-Fundstellen zeigen, dass die Schulungsunterlage (09/2025) eingeflossen ist. Woher stammt sie, darf sie genutzt werden?
- **Praktisch:** Entwicklung ausschließlich in der Freizeit, mit privaten Geräten, Nachweis führen (Git-Verlauf zeigt Zeitpunkte); Arbeitgeber ggf. schriftlich um Freigabe bitten, wenn der Vertrag es verlangt.
- **Steuerlich:** Gewerbeanmeldung, Kleinunternehmerregelung, Nebengewerbe – Steuerberater. Siehe auch [[Mein Vorteil]] (Zeit und Rahmen sind noch offen).

## 5. Realistischer Schutz durch Tempo
Rechtlich bleibt bei Software wenig. Der echte Graben ist:
- **Vorsprung:** erste Version vor Konkurrenz, laufend gepflegtes Regelwerk (neue TAB, Westnetz-Änderungen). Pflege schlägt Kopie.
- **Netzwerk:** direkte Beziehungen zu Betrieben, Innung, Großhändler ([[Direktansprache]]). Das kopiert niemand per Download.
- **Falldaten:** echte Fälle samt Entscheidung und Trefferquote (Go/No-Go-Kennzahl). Wer sie hat, verbessert Erkennung und Regeln; das ist der wachsende Wert.
- **Vertrauen / Marke:** der Name in der Branche.
- **Netzbetreiber-Ausweitung:** Pilot Westnetz, weitere Betreiber als Arbeit, die ein Kopierer erst leisten müsste.

Ehrlich: Ein großer Anbieter (Netzbetreiber, Software-Haus) könnte das nachbauen. Schutz heißt hier, schneller und näher am Kunden zu sein, nicht unangreifbar.

## 6. Maßnahmenliste (priorisiert)
| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | Arbeitsvertrag lesen, Arbeitgeber-Frage klären (Abschnitt 4) | ggf. 0–300 € Erstberatung | 2 h + Termin | **vor dem ersten Euro**, jetzt anstoßen |
| 2 | Entwicklung nur privat/in Freizeit, Git-Verlauf behalten | 0 € | laufend | sofort |
| 3 | NDA-Vorlage für Tester | 0–200 € Prüfung | 1–2 h | vor Zugang für die 4 Tester |
| 4 | Namensprüfung + DPMA-Recherche (Marke noch nicht anmelden) | 0 € | 1 h | schon als Aufgabe offen |
| 5 | App erst online, wenn nötig: Regelwerk-Auslieferung begrenzen (Zugang nur mit Code, Hosting nicht öffentlich verlinken) | 0 € | gering | bis Umbau |
| 6 | Nutzungsbedingungen zusammen mit Impressum/Datenschutz prüfen lassen | in [[Rechtliches]] enthalten | gering | vor Livegang |
| 7 | **Regelwerk serverseitig** (Edge Function) | 0 € + Entwicklerzeit | ca. 1 Tag | nach Go oder spätestens vor öffentlichem Livegang |
| 8 | Login je Nutzer + Rate-Limit | 0 € Supabase Auth | ca. 1–2 Tage | vor Kollegen-Test |
| 9 | Marke Wort-/Bildmarke anmelden | ca. 290 €+ (nachsehen) | 1–2 h | erst nach Go und Namensprüfung |
| 10 | Patent / Gebrauchsmuster | hoch | – | **nicht** |

**Nicht vorziehen:** Maßnahmen 7–9 sind Infrastruktur. Laut Regel „erst verkaufen, dann bauen“ kommen die Gespräche zuerst. Ausnahme: 1–3, denn sie sind billig und schützen vor dem teuersten Fehler (Streit mit dem Arbeitgeber).

## Offene Fragen
- ⚖ Reicht „Zugang nur mit Code“ als angemessene Geheimhaltungsmaßnahme nach GeschGehG?
- ⚖ Arbeitsvertrag: Nebentätigkeit, Wettbewerb, Rechte an Arbeitsergebnissen.
- ⚖ Herkunft der Westnetz-Schulung (09/2025): Nutzung zulässig?
- ⚖ Haftung bei falscher Einschätzung gehört zu [[Rechtliches]].

Siehe auch [[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]], [[Ideen-System]], [[Aufgaben]].
