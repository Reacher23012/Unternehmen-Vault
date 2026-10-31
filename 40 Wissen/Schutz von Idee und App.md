---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-10-31
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App

> **Analyse, keine Rechtsberatung.** Alles, was als „vom Anwalt prüfen lassen“ steht, ist unsicher oder hängt vom Einzelfall ab. Bezug: [[Zählerschrank-Check]] (Produktname Zählerklar, [[ADR-0006 Produktname Zählerklar]]), [[Rechtliches]], [[Mein Vorteil]].

## Kurzfassung
1. Die **Idee** ist nicht schützbar. Geschützt wird nur die konkrete Umsetzung.
2. Der wertvollste Teil ist das **Regelwerk R01–R26** ([[Regelwerk R01–R26]]). Es liegt aber heute komplett im Browser jedes Nutzers → **größte Lücke, technisch lösbar**.
3. Rechtlicher Schutz hilft nur, wenn man ihn durchsetzen kann (Kosten, Beweise). Realistisch schützt vor allem **Tempo, Netzwerk und Daten aus echten Fällen**.
4. **Offene Frage für Anwalt:** Gehört die Idee mir oder dem Arbeitgeber (Punkt 4)? Das sollte vor dem Verkauf geklärt sein.

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Wie / Kosten (grob, Stand ungeprüft) | Einschätzung |
|---|---|---|---|
| **Idee / Konzept** („Foto → KI → Regelwerk“) | kein Schutz | – | Jeder darf die Idee nachbauen. Nur Tempo hilft. |
| **Quellcode** | Urheberrecht (§ 69a UrhG), entsteht automatisch | 0 €; Beweis über Git-Historie, ggf. Hinterlegung | Schützt vor Kopieren, **nicht** vor Nachbau mit eigenem Code. |
| **Name / Logo „Zählerklar“** | Marke beim DPMA (Wort-/Bildmarke) | ca. 290 € für 3 Klassen online, Laufzeit 10 Jahre; vorher Recherche (Identität/Ähnlichkeit) | Sinnvoll, sobald der Name bleibt. Siehe Aufgabe DPMA-Recherche. Anwalt prüft Verwechslungsgefahr. |
| **Regelwerk R01–R26** (Auswahl, Struktur, Formulierung der Maßnahmen) | als **Geschäftsgeheimnis** (GeschGehG), evtl. Urheberrecht an den Texten, ggf. Datenbankrecht | 0 €, aber nur mit **„angemessenen Geheimhaltungsmaßnahmen“** (§ 2 Nr. 1 GeschGehG) | Schutz entfällt, wenn es offen ausgeliefert wird (siehe Punkt 2). |
| **Rohinhalte aus TAB / VDE / BDEW** | gehören nicht mir | – | Keine Normtexte übernehmen, nur Fundstellen (steht schon in [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]). Eigene Auswahl und Bewertung ist meine Leistung, die Quelle nicht. |
| **Patent** | bei Software „als solche“ nicht patentierbar; nur mit technischem Beitrag | 5-stellig mit Anwalt | Für diese App unrealistisch. |
| **Gebrauchsmuster** | Software als solche ebenfalls ausgeschlossen | ca. 40–90 € Amtsgebühr | Unrealistisch. |
| **Fotos / Falldaten** | Datenbank, Geschäftsgeheimnis, DSGVO-Pflichten | – | Mittelfristig der echte Graben (Punkt 5). |

## 2. Technischer Befund: Das Regelwerk liegt im Browser
**Befund (Code geprüft 31.10.2026):**
- `web/src/regeln.json` (ca. 14 KB: Name, Bedingung, Maßnahme, Stufe, Fundstelle, Geltung, Status je Regel) wird von `web/src/regelwerk.ts` importiert.
- `regelwerk.ts` enthält zusätzlich die **komplette Auswertelogik** (`ausgeloesteRegeln`, `bewerte`, `messkonzept`) und wird von `web/src/main.ts` im Browser ausgeführt.
- Folge: Jeder, der die App öffnet, bekommt das **gesamte Regelwerk als lesbares JavaScript** inkl. Texten und Fundstellen. Bundle-Dateien (auch minifiziert) lassen sich in Minuten extrahieren; die `regeln.json` steht sogar als Klartext darin.
- Der Zugangscode (`x-app-code`) schützt nur die **Edge Function** (Analyse, Fallspeicher), **nicht** das Auslieferen der App-Dateien. Die statischen Dateien liegen auf Netlify frei abrufbar. Und `demo.ts`/Demo-Build enthalten es ebenfalls.

**Risikobewertung:**
| Aspekt | Bewertung |
|---|---|
| Wahrscheinlichkeit | **gering bis mittel** – solange wenige Nutzer, kaum Aufmerksamkeit. Steigt mit Bekanntheit. Ein Kollege mit Browser-Entwicklertools genügt. |
| Schaden | **hoch** – es ist der Kern des Vorsprungs ([[Mein Vorteil]], Score „Vorsprung 5“). Danach kann jeder einen Klon mit eigener Fotoerkennung bauen. |
| Rechtlich | Wer das Regelwerk offen ausliefert, hat kaum „angemessene Geheimhaltungsmaßnahmen“ → Geschäftsgeheimnisschutz wird **schwach** bis fraglich (Anwalt). |
| Lösbar? | Ja, mit überschaubarem Aufwand, **ohne** die Nutzererfahrung zu ändern. |

**Lösungsskizze „Regelwerk serverseitig“:**
1. `ausgeloesteRegeln`, `ergebnisAus`, `messkonzept`, `bewerte` und `regeln.json` wandern in die Edge Function (`supabase/functions/api`), neue Route z. B. `POST /bewerte` (weiter mit `x-app-code`).
2. Die App sendet nur die **Eingaben** (Typ `Eingaben`), bekommt zurück: Ampel, ausgelöste Regeln mit **nur dem Text der ausgelösten Maßnahme + Fundstelle**, „Vor Ort klären“, Hinweise, Messkonzept. Nie die Regelliste als Ganzes, nie die Bedingungen.
3. Tests (`regelwerk.test.ts`) ziehen mit um (Deno oder gemeinsames Modul, das beim Deploy kopiert wird). Aufpassen: Der Code in `web/` und `supabase/` darf nicht doppelt auseinanderlaufen.
4. Offline: Heute funktioniert die App ohne Backend (nur lokal). Serverseitig geht das nicht mehr → Offline-Modus (Funkloch im Keller!) braucht dann einen **Nachsende-Mechanismus für Bewertungen**; Fälle werden schon nachgesendet (siehe Review 29.09. in [[App & Technik]]). Kompromiss prüfen: Ergebnis erst mit Verbindung, Eingaben bleiben lokal erhalten.
5. Demo-Build (`build:demo`): enthält Beispieldaten – darf nur eine **Handvoll** Regeln mit Dummy-Texten oder fertige Beispielergebnisse enthalten, nie das echte Regelwerk.
6. Zusätzlich: Rate-Limit auf `/bewerte` (heute fehlt es überall, siehe Qualität in [[App & Technik]]) und Login statt gemeinsamem Code, sonst kann ein Weitergegebener Code das Regelwerk **abfragen** (Black-Box-Extraktion: viele Eingaben durchprobieren). Das bremst nur, verhindert es nicht ganz.

**Grenze:** Auch serverseitig kann jemand mit Zugang das Regelwerk durch systematisches Abfragen rekonstruieren. Das ist aufwendig (26 Regeln, viele Kombinationen) und verlangt einen Zugang – also Nutzungsbedingungen (Punkt 3) und Protokollierung.

## 3. Verträge und Zugang
| Maßnahme | Zweck | Anmerkung |
|---|---|---|
| **NDA / Geheimhaltungsvereinbarung** für Tester und Kollegen, die tief in die App schauen | belegt „angemessene Geheimhaltungsmaßnahmen“ | Kurz halten (1 Seite). Für die 4 wartenden Tester ggf. vor dem Mittesten. **Vorlage vom Anwalt oder aus Kammer/Verband prüfen lassen.** Ein NDA ersetzt keine technische Lösung. |
| **Nutzungsbedingungen** (kein Kopieren, kein Reverse Engineering, kein Weitergeben des Zugangs, Haftungsausschluss „ersetzt keine Prüfung vor Ort“) | rechtliche Grundlage, um Missbrauch zu sperren | Passen zum Impressum-Hinweis in [[Rechtliches]]. Reverse-Engineering-Verbote sind bei Software nur begrenzt wirksam (§ 69e UrhG erlaubt Dekompilieren zur Interoperabilität) → Anwalt. |
| **Zugang nur mit Login** (personenbezogen, nicht ein geteilter `APP_CODE`) | Nachverfolgbarkeit, Sperrbarkeit | Steht schon als „Irgendwann“ in [[Aufgaben]] („Login statt Zugangscode, bevor Kollegen testen“) → mit dieser Notiz **hochstufen**. |
| **Landingpage öffentlich, App-Inhalte nicht** | die Wartelisten-Seite enthält kein Regelwerk | schon so; prüfen, dass die Landingpage keine Regeltexte zeigt. |
| **Marketing-Posts** ([[Instagram-Posts 1–10]]) | verraten nur Einzelfälle | Bewusst nie die ganze Regelliste veröffentlichen. |

## 4. Arbeitgeber-Frage (Offen – Anwalt/Steuerberater)
**Frage:** Wem gehört die Idee/App, wenn ich sie neben einer Anstellung im Elektrohandwerk entwickle und das Fachwissen, die Regeln und ggf. Unterlagen (Schulungen, Westnetz-Material) aus dieser Tätigkeit stammen?

Punkte, die zu klären sind (**keine Antworten, nur Fragen**):
- **Arbeitsvertrag:** Nebentätigkeitsklausel (Anzeige-/Genehmigungspflicht)? Wettbewerbsverbot während des Arbeitsverhältnisses (gilt allgemein, auch ohne Klausel)? Die App richtet sich an Elektrobetriebe – evtl. auch an den Arbeitgeber als Wettbewerber oder Kunden.
- **Arbeitnehmererfindung:** Das ArbnErfG betrifft patent-/gebrauchsmusterfähige Diensterfindungen. Software als solche ist es meist nicht, aber **Urheberrecht an Programmen, die im Rahmen der Arbeitspflicht entstehen, steht dem Arbeitgeber zu (§ 69b UrhG)**. Hier sind Code und Regelwerk freizeitlich entstanden → Abgrenzung „im Rahmen der Arbeitspflichten oder nach Weisung“ prüfen lassen.
- **Betriebsinterne Unterlagen:** Wurden Checklisten, Fotos, Kundendaten oder Schulungsunterlagen des Arbeitgebers verwendet? Das [[Regelwerk R01–R26]] nennt Westnetz-Schulung (09/2025) als Fundstelle – prüfen, ob diese Quelle frei verwendbar ist oder an Schulungsbedingungen hängt. **Keine Fotos aus Kundenobjekten ohne Einwilligung** (siehe auch [[Bildrechte im Marketing]]).
- **Selbstständig/Gewerbe:** Anmeldung, Steuer (Kleinunternehmer?), Krankenversicherung – gehört zum **Steuerberater**, sobald es Einnahmen gibt.
- **Empfehlung:** Arbeitsvertrag mitnehmen und die Fragen **einmalig** bei einem Fachanwalt für Arbeitsrecht (Erstberatung, oft Festpreis) klären, **bevor** der erste Euro fließt oder öffentlich geworben wird. Offen, ob der Arbeitgeber informiert werden muss.

## 5. Realistischer Schutz: Tempo, Netzwerk, Daten
Rechtlicher Schutz greift selten schnell und kostet Geld. Der echte Graben ([[Ideen-System]], Kriterium „Vorsprung“):
- **Vorsprung in der Zeit:** erste Gespräche, erste zahlende Kunden vor dem Nachbau.
- **Netzwerk:** direkter Draht zu Kollegen, Innung, Kammern ([[Direktansprache]]) – das kopiert kein Klon.
- **Fachwissen laufend pflegen:** Regelwerk aktuell halten (neue Westnetz-TAB 2026), mehrere Netzbetreiber → Klon veraltet.
- **Daten aus echten Fällen:** Foto + tatsächliche Entscheidung → Trefferquote ([[Validierung & Go-No-Go]]). Das ist über Zeit einzigartig und wächst mit Nutzung (DSGVO beachten).
- **Marke/Name** als Wiedererkennung (Zählerklar).

## 6. Priorisierte Maßnahmen
Reihenfolge nach Wirkung gegen Aufwand. **Validierung (Gespräche) bleibt Vorrang** – nichts hiervon vor die 5 Gespräche ziehen, außer was ohnehin vor dem Mittesten nötig ist.

| Prio | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | **Regelwerk serverseitig** (Punkt 2), App-Auslieferung ohne `regeln.json` | 0 € | mittel (1–2 Tage Code + Tests) | **vor** Mittesten durch Fremde / vor öffentlichem Hosting |
| 2 | **Kein öffentlicher Netlify-Deploy der App**, solange Regelwerk im Bundle liegt (Landingpage darf raus) | 0 € | gering | sofort beachten |
| 3 | **Arbeitgeber-Frage** mit Fachanwalt klären | ca. 100–250 € Erstberatung (Schätzung) | gering (Termin + Vertrag mitbringen) | vor erstem Euro / öffentlicher Werbung |
| 4 | **NDA + Nutzungsbedingungen** (Vorlage prüfen lassen) | 0–300 € (Schätzung) | gering–mittel | vor Mittesten der 4 Tester |
| 5 | **Login statt Gemeinschaftscode**, Rate-Limit | 0 € | mittel | vor Mittesten durch Fremde |
| 6 | **DPMA-Markenrecherche + Anmeldung „Zählerklar“** | ca. 290 € + ggf. Anwalt | gering | nach Domain-/Namensprüfung |
| 7 | Git-Historie als Urhebernachweis behalten; Entwürfe datieren | 0 € | gering | laufend |
| 8 | Datenschutz/Auftragsverarbeitung (Supabase, Anthropic) | 0 € | mittel | vor echtem Betrieb ([[Rechtliches]]) |

Kostenangaben sind grobe Schätzungen aus dem Gedächtnis und **nicht geprüft**.

## Offene Fragen
- [ ] Arbeitgeber-/Arbeitsvertrag-Frage (Punkt 4) → Fachanwalt Arbeitsrecht
- [ ] Reichen NDA und Nutzungsbedingungen als „angemessene Maßnahmen“ im Sinne GeschGehG? → Anwalt
- [ ] Ist die Verwendung der Westnetz-Schulung als Fundstelle unkritisch? → prüfen
- [ ] Verbot von Reverse Engineering in den Nutzungsbedingungen: wie weit wirksam? → Anwalt
