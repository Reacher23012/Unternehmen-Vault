---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-11-03
status: analyse – keine Rechtsberatung, Rechtliches vom Anwalt prüfen lassen
---
# Schutz von Idee und App („Zählerklar“)

> **Keine Rechtsberatung.** Das ist eine Sortierung für das Gespräch mit einem Anwalt/Steuerberater. Alles, was unsicher ist, steht unter „Vom Anwalt prüfen lassen“. Gesetzesangaben und Gebühren vor Verwendung prüfen (Stand der Recherche: Wissen der Nachtschicht, nicht live nachgeschlagen).

**Kurzfazit:** Die *Idee* ist nicht schützbar. Schützbar sind *Code*, *Name* und mit Einschränkung das *Regelwerk als Geschäftsgeheimnis*. Der größte reale Hebel ist **Tempo plus Daten aus echten Fällen**, nicht Recht. Technisch gibt es einen konkreten Befund: Das gesamte Regelwerk liegt im ausgelieferten App-Bundle (siehe 2).

## 1. Was ist in Deutschland überhaupt schützbar?
| Was | Schutz | Wie / Kosten | Einschätzung |
|---|---|---|---|
| **Idee** („Foto → Maßnahmenliste“) | **keiner** | – | Jeder darf dieselbe Idee umsetzen. Nur Geheimhaltung *vor* der Offenlegung hilft (NDA). |
| **Code** | Urheberrecht für Computerprogramme (§§ 69a ff. UrhG) | entsteht automatisch, keine Anmeldung, 0 € | Schützt den Quelltext gegen Kopieren, **nicht** die Funktion oder Idee. Nachweis: Git-Historie sichern. |
| **Name „Zählerklar“** | Marke (DPMA) | Recherche im DPMAregister kostenlos; Anmeldung online laut Erinnerung grob 290 € für bis zu 3 Klassen (Klassen 9, 42), Laufzeit 10 Jahre – **Gebühr aktuell prüfen** | Sinnvoll erst nach Namens-/Domainprüfung ([[ADR-0006 Produktname Zählerklar]]) und nach ersten Signalen. Beschreibende Namen können abgelehnt werden („klar“ ist eher unkritisch, „Zähler“ beschreibend). Widerspruchsfrist Dritter 3 Monate. |
| **Regelwerk R01–R26** (Logik + Texte) | (a) **Geschäftsgeheimnis** nach GeschGehG, (b) evtl. Urheberrecht an den eigenen Texten, (c) evtl. Datenbankschutz § 87a UrhG | (a) nur mit **„angemessenen Geheimhaltungsmaßnahmen“** (§ 2 Nr. 1 GeschGehG), kostet Organisation | Die zugrunde liegenden Normen/TAB sind öffentlich und nicht schützbar. Schutzfähig ist höchstens die **Auswahl, Verdichtung und Verknüpfung** (Bedingungen → Maßnahme → Fundstelle). Ob das Gerichte als Geheimnis mit wirtschaftlichem Wert tragen, ist offen. |
| **Patent / Gebrauchsmuster** | praktisch **nein** | Anwalt ab ca. vierstellig | Software „als solche“ ist ausgeschlossen (§ 1 Abs. 3 PatG); Gebrauchsmuster schließt Verfahren/Programme aus. Ein technischer Beitrag wäre nötig, den ein Regelwerk nicht liefert. **Nicht verfolgen.** |

Wichtig zu (a): Das GeschGehG erlaubt **Reverse Engineering** eines rechtmäßig erworbenen Produkts ausdrücklich (§ 3 Abs. 1 Nr. 2), *es sei denn* vertraglich ausgeschlossen. Deshalb braucht es Nutzungsbedingungen (siehe 3).

## 2. Technischer Befund: Das Regelwerk liegt beim Nutzer im Browser
**Geprüft im Code-Repo (nur gelesen, nichts geändert):**
- `web/src/regeln.json` (ca. 14 KB, alle 26 Regeln mit Bedingung, Maßnahme, Stufe, **Fundstelle**, Geltung) wird in `web/src/regelwerk.ts` importiert.
- `regelwerk.ts` enthält die **komplette Auswertungslogik** (`ausgeloesteRegeln`, `bewerte`, `schlimmsterFall`, `messkonzept`).
- `web/src/main.ts` ruft `bewerte` im Browser auf. Die Edge Function `supabase/functions/api` macht nur Fotoanalyse und Fall-Speicher, **keine Regelauswertung**.
- `vite.config.ts` hat keine Source-Maps eingeschaltet (gut), aber das Bundle ist trotzdem lesbar: JSON-Texte stehen im Klartext darin, die Logik ist nur minifiziert.

**Risiko-Bewertung**
| Frage | Bewertung |
|---|---|
| Kann jeder, der die App-URL kennt, das Regelwerk herunterladen? | **Ja.** Die statischen Dateien auf Netlify sind öffentlich; der Zugangscode schützt nur die API (`x-app-code`), nicht die ausgelieferten Dateien. Sobald die App online ist, reicht „Seite speichern“. |
| Zählt das noch als „angemessen geheim gehalten“? | **Vermutlich nein**, solange der Inhalt frei abrufbar ausgeliefert wird. Damit wäre der Geheimnisschutz (1a) praktisch weg. → vom Anwalt prüfen lassen. |
| Wie schlimm ist es wirklich? | Mittel. Die *Fundstellen* kann jeder Fachmann selbst nachlesen (TAB, BDEW). Der Wert liegt in der Verdichtung und in der Pflege (neue TAB 2026!). Ein Konkurrent spart sich Wochen, nicht Jahre. |
| Weitere Fundorte | `landing/seite.html` zeigt Regelnamen R01–R26 (nur Überschriften, unkritisch). Das **claude.ai-Demo-Artifact** enthält nach `build:demo` das gesamte Regelwerk in einer HTML-Datei; es ist privat, aber jeder mit Link/Datei hat alles → nicht weitergeben. `marketing/flyer-a5.html` prüfen, ob dort mehr als Überschriften stehen. |

**Lösungsskizze: „Regelwerk serverseitig“**
1. `regeln.json` + Auswertung aus `web/` nach `supabase/functions/api/` verlegen (z. B. `supabase/functions/api/regelwerk.ts`, Daten nicht im Web-Bundle).
2. Neue Route `POST /bewerte`: Eingaben (Typ `Eingaben`) rein → `Bewertung` raus (Ergebnis, ausgelöste Regeln **nur** mit Name, Maßnahme, Stufe, Fundstelle; `bedingung` und Regeln, die nicht greifen, bleiben auf dem Server).
3. App zeigt nur das Ergebnis. Die Tests (`regelwerk.test.ts`) laufen weiter gegen dieselbe Logik (gemeinsames Modul oder Test in der Funktion).
4. Netlify-Seite liefert danach nur UI, kein Regelwerk.

**Grenzen, ehrlich:**
- **Abtasten über die API** bleibt möglich: Wer viele Eingabekombinationen schickt, kann die Regeln nachbauen. Gegenmittel: Login statt gemeinsamer Zugangscode, Rate-Limit, Protokoll auffälliger Nutzung. Das macht es teurer, nicht unmöglich.
- **Offline/Funkloch:** Der aktuelle Stand speichert Fälle lokal und sendet nach (`api.ts`). Eine serverseitige Auswertung braucht Netz. Auf der Baustelle ist das nicht immer da → Konsequenz: Ergebnis erst bei Verbindung, Eingaben bleiben lokal erhalten. Das ist eine Produktentscheidung, die bewusst getroffen werden sollte (ggf. ADR).
- **Zeitlimit/Kosten:** Zusätzlicher Aufruf je Check; Auswertung selbst ist trivial schnell, Kosten ≈ 0.
- **Vor dem Online-Gang** (Netlify) umsetzen, nicht danach: Was einmal ausgeliefert wurde, ist nicht zurückholbar.

## 3. Verträge und Zugang
- **NDA für Tester/Kollegen:** Kurze Geheimhaltungsvereinbarung vor dem Mittesten (Zugang zur App/Demo, Regelwerk, Gesprächsinhalte). Muss *konkret* benennen, was geheim ist (Regelwerk-Logik, Texte, Fallergebnisse), Zweck, Dauer (z. B. 2–3 Jahre), Rückgabe/Löschung. Pauschale „alles ist vertraulich“-Klauseln sind angreifbar. → Mustertext vom Anwalt, nicht selbst basteln.
- **Nutzungsbedingungen (AGB) für die App:** Verbot von Kopieren, Weitergabe der Zugangsdaten, automatisiertem Abruf (Scraping) und **Reverse Engineering/Dekompilieren** (damit der Ausschluss nach § 3 GeschGehG greift, soweit AGB-rechtlich zulässig – unsicher, prüfen lassen). Gehört zu [[Rechtliches]].
- **Zugang nur mit Login:** Heute ein gemeinsamer `APP_CODE`; der steht in den Einstellungen jedes Testers und lässt sich weitergeben. Vor dem Kollegen-Test Login pro Person (Supabase Auth) – das steht schon unter „Irgendwann“ in [[Aufgaben]] und ist hier **Schutzmaßnahme**, nicht nur Komfort.
- **Datenschutz bleibt Pflicht:** Fotos von Zählerschränken sind teils personenbezogen (Adresse, Namen, Zählernummer). Kein Widerspruch zum Schutzziel, aber eigenes Thema → [[Rechtliches]].

## 4. Arbeitgeber-Frage (offen – Anwalt/Steuerberater)
Wenn die Idee im Rahmen einer Anstellung im Elektrohandwerk entstanden ist, könnte der Arbeitgeber Ansprüche haben. **Das ist die größte Unsicherheit und kann alle anderen Maßnahmen entwerten.** Was zu klären ist (nichts davon hier entschieden):
1. **Arbeitsvertrag lesen:** Nebentätigkeitsklausel (Anzeige-/Genehmigungspflicht), Wettbewerbsverbot, Verschwiegenheit, Regelung zu Erfindungen/Arbeitsergebnissen.
2. **Software/Code:** Nach § 69b UrhG stehen Rechte an Programmen, die ein Arbeitnehmer *in Wahrnehmung seiner Aufgaben oder nach Anweisung* schafft, dem Arbeitgeber zu. Bei privater Freizeit-Entwicklung ohne Dienstauftrag spricht vieles dagegen, aber die Abgrenzung ist einzelfallabhängig.
3. **Arbeitnehmererfindungsgesetz:** gilt für patent-/gebrauchsmusterfähige Erfindungen; bei Software als solcher kaum relevant, aber „technische Verbesserungsvorschläge“ aus dem Betrieb gibt es als Randfall.
4. **Wettbewerb:** Während des Arbeitsverhältnisses gilt Treuepflicht/Wettbewerbsverbot. Verkauft die App an Elektrobetriebe, die Kunden oder Konkurrenten des Arbeitgebers sind, ist das heikel. Kollegen als Zielgruppe verschärft das.
5. **Know-how-Herkunft:** Woher stammen die Regeln? Unterlagen aus der Arbeit (z. B. interne Schulungen, Kundenfälle, Netzbetreiber-Unterlagen wie die „Westnetz-Schulung Bestandsanlagen“ als Fundstelle) können vertraulich oder urheberrechtlich geschützt sein. **Sicherstellen, dass nur öffentliche oder rechtmäßig erhaltene Quellen im Regelwerk stehen** und keine Normtexte kopiert werden (siehe [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]).
6. **Steuer/Gewerbe:** Gewerbeanmeldung, Kleinunternehmerregelung, ggf. Anzeige beim Arbeitgeber – Steuerberater.

→ **Wichtigste Handlung:** Vor Livegang und vor bezahlten Kunden einen Termin mit einem Fachanwalt für Arbeitsrecht bzw. IT-/Urheberrecht (Erstberatung, grob 100–250 €, Betrag prüfen) mit genau dieser Liste.

## 5. Realistischer Schutz: Tempo, Netzwerk, Daten
Ehrlich betrachtet schützt Recht hier wenig; ein Konkurrent kann die Idee jederzeit nachbauen. Was wirklich trägt (vgl. „Vorsprung“ im [[Ideen-System]] und [[Mein Vorteil]]):
- **Vorsprung durch Tempo:** erster mit gepflegtem Regelwerk für Westnetz sein; neue TAB 2026 früh einarbeiten. Das Regelwerk veraltet – Pflege ist der Burggraben, nicht der Text.
- **Netzwerk:** persönliche Beziehung zu Kollegen/Innung/Großhändler → [[Direktansprache]]. Ein Nachbauer hat diesen Zugang nicht.
- **Daten aus echten Fällen:** Trefferquote, korrigierte KI-Felder, Fotos. Jeder Fall verbessert Erkennung und Regeln; das ist nicht kopierbar. (Datenschutz beachten.)
- **Marke/Vertrauen:** „Zählerklar“ als bekannter Name unter Elektrikern.
- **Wer zuerst validiert, gewinnt:** Der Schutzaufwand sollte klein bleiben, bis das Go/No-Go ([[Validierung & Go-No-Go]]) steht. Sonst ist es Infrastruktur vor Validierung (siehe Regel in [[Ideen-System]]).

## 6. Maßnahmenliste (priorisiert)
| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | **Arbeitsvertrag lesen**, Fragen aus 4 notieren | 0 € | 1 h | **vor allem anderen**, diese Woche |
| 2 | **Regelwerk serverseitig** (Edge Function `/bewerte`, nichts mehr im Web-Bundle) | 0 € | ca. 1–2 Tage | **vor Netlify-Livegang und vor dem Mittesten durch Fremde** |
| 3 | Demo-Artifact und Regelwerk-Dateien **nicht weitergeben**; Flyer/Landing auf Regelumfang prüfen | 0 € | 30 Min. | sofort |
| 4 | NDA-Muster für Tester (Anwalt/Vorlage), vor dem Mittesten unterschreiben lassen | 0–150 € | 1–2 h | vor Mittesten |
| 5 | Nutzungsbedingungen (kein Kopieren, Scraping, Reverse Engineering) in App + [[Rechtliches]] | 0–300 € | 2 h | vor Livegang |
| 6 | Login pro Person statt `APP_CODE`, Rate-Limit | 0 € | 1–2 Tage | vor breitem Test |
| 7 | Erstberatung Anwalt (Arbeitsrecht/IT/Urheber) | ca. 100–250 € | 1 Termin | vor Livegang / erstem zahlenden Kunden |
| 8 | Domain `zaehlerklar.de`, DPMA-Recherche | 0–15 €/Jahr | 1 h | läuft schon als Aufgabe |
| 9 | Markenanmeldung DPMA | grob 290 € (prüfen) | 1 h | erst nach ersten Signalen/Go |
| 10 | Git-Historie sichern (Remote-Repo privat, regelmäßig pushen) als Entstehungsnachweis | 0 € | – | läuft |
| 11 | Patent/Gebrauchsmuster | – | – | **nicht verfolgen** |

## Vom Anwalt prüfen lassen
- Wem gehören Idee, Code und Regelwerk bei Entstehung neben einer Anstellung (§ 69b UrhG, Nebentätigkeit, Wettbewerb)?
- Reicht „Zugangscode/Login + NDA + AGB“ als „angemessene Geheimhaltungsmaßnahme“ für das Regelwerk?
- Ist ein Verbot von Reverse Engineering in AGB gegenüber Gewerbetreibenden wirksam?
- Schutzfähigkeit der Regelwerk-Texte/Auswahl (Urheberrecht, Datenbankschutz).
- Haftung bei falscher Maßnahmenliste (siehe [[Rechtliches]]).
- Markenrecht: Kollisionsrisiko mit ähnlichen Marken (Klasse 9/42).

Siehe auch [[App & Technik]], [[Regelwerk R01–R26]], [[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]].
