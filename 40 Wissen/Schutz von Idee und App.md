---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-11-02
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App („Zählerklar“)

> **Wichtig:** Das ist eine Analyse aus allgemeinem Wissen, **keine Rechtsberatung**. Alles, was mit „⚖️ Anwalt“ markiert ist, ist unsicher oder hängt vom Einzelfall ab und sollte vor einer Entscheidung geprüft werden. Kosten sind grobe Größenordnungen, keine Angebote.

Kontext: [[Zählerschrank-Check]], [[App & Technik]], [[Regelwerk R01–R26]], [[Mein Vorteil]], [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]].

## Kurzfassung
1. **Eine Idee ist nicht schützbar.** Schützbar sind Code, Name, Texte und Geschäftsgeheimnisse – und Letztere nur, wenn man sie wirklich geheim hält.
2. **Größte echte Lücke: Das komplette Regelwerk liegt im App-Bundle im Browser** (siehe Abschnitt 2). Wer die App öffnet, kann es lesen. Jede Geheimhaltung wäre damit hinfällig.
3. **Offene Frage mit dem größten Risiko: Wem gehört das Regelwerk, wenn es im Rahmen einer Anstellung im Elektrohandwerk entstanden ist?** (Abschnitt 4, ⚖️ Anwalt). Das sollte vor dem ersten Geld oder öffentlichen Livegang geklärt sein.
4. **Realistischer Schutz ist Tempo, Netzwerk und Daten** – nicht Paragrafen (Abschnitt 5).
5. Ehrliche Einordnung nach dem [[Ideen-System]]: Schutz ist **Infrastruktur**, kein Validierungsschritt. Er darf die 5 Gespräche und das Mittesten nicht verdrängen. Nur die billigen Punkte (NDA-Satz, Nutzungsbedingungen, Arbeitgeber-Frage klären) vorziehen.

## 1. Was ist in Deutschland überhaupt schützbar?
| Gegenstand | Schutz | Wie / Kosten (grob) | Bewertung für Zählerklar |
|---|---|---|---|
| **Idee / Konzept** („Foto → Maßnahmenliste“) | **keiner** | – | Nachbauen ist legal. Nur Geheimhaltung vor der Weitergabe hilft. |
| **Quellcode** | Urheberrecht (§§ 69a ff. UrhG), entsteht automatisch | 0 €. Beweis: Git-Historie mit Zeitstempeln, privates Repository | Schützt vor 1:1-Kopie, **nicht** vor einem Nachbau mit eigenem Code. |
| **Texte, Grafiken, Landingpage, Flyer** | Urheberrecht (Schöpfungshöhe nötig), Bilder/Schriften: Lizenzen beachten → [[Bildrechte im Marketing]] | 0 € | Kurze Slogans meist nicht schutzfähig. |
| **Name „Zählerklar“ / Logo** | Marke (DPMA), Klassen 9 und 42 (ggf. 35, 37) | Online-Anmeldung ca. 290 € für 3 Klassen, 10 Jahre; Recherche vorher kostenlos im DPMAregister; Anwaltsrecherche ggf. extra | **Sinnvoll, sobald der Name feststeht und die Recherche sauber ist** → Aufgabe in [[ADR-0006 Produktname Zählerklar]] besteht schon. Erst Recherche, dann Anmeldung. Markeninhaber ist, wer anmeldet. |
| **Domain** `zaehlerklar.de` | Kein Schutzrecht, aber „wer zuerst kommt“ | ca. 1 €/Monat (DENIC-Registrar) | Sichern, sobald DENIC-Check frei ist. |
| **Regelwerk R01–R26** (Auswahl, Bedingungen, Logik) | Als **Geschäftsgeheimnis** (GeschGehG), wenn „angemessene Geheimhaltungsmaßnahmen“ getroffen sind (§ 2 Nr. 1 GeschGehG). Urheberrecht nur für die konkrete Textfassung / ggf. Datenbankwerk | 0 € – aber Aufwand: Zugriff beschränken, NDAs, Dokumentation | **Wichtigstes schützbares Gut, aber derzeit nicht geschützt** (Abschnitt 2). Die zugrunde liegenden Normen/TAB sind öffentlich; das Know-how liegt in der Auswahl und Verknüpfung. ⚖️ Anwalt: ob diese Verknüpfung als Geschäftsgeheimnis trägt, wenn die Fundstellen öffentlich sind. |
| **Daten aus echten Fällen** (Fotos, Entscheidungen, Trefferquote) | Faktisch: nur wer sie hat; rechtlich Geschäftsgeheimnis/ggf. Datenbankrecht (§§ 87a ff. UrhG) | 0 € | **Das eigentliche Wertvolle auf Dauer.** Datenschutz beachten (Kundenadressen nie speichern). |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist nicht patentfähig (§ 1 Abs. 3 PatG); nur bei „technischem Beitrag“ | Patent mehrere tausend € mit Anwalt; Gebrauchsmuster ca. 40–90 € Amt, Verfahren aber nicht schutzfähig | **Nicht empfohlen.** Ein Regelwerk, das Normen anwendet, ist kaum technisch erfinderisch. Zu teuer, zu unsicher, zu langsam. ⚖️ Anwalt nur, wenn jemand ernsthaft das Gegenteil behauptet. |
| **Normtexte** | Urheberrecht der Normgeber (DIN, VDE) | – | **Umgekehrtes Risiko:** keine Normtexte übernehmen, nur Fundstellen (steht schon in ADR-0001). Das schützt auch uns. |

## 2. Technischer Befund: Das Regelwerk liegt beim Nutzer im Browser
**Befund (aus dem Code geprüft, 02.11.2026):**
- `web/src/regeln.json` enthält je Regel `bedingung`, `massnahme`, `stufe`, `fundstelle`, `geltung`, `status` im Klartext.
- `web/src/regelwerk.ts` importiert diese Datei und enthält zusätzlich die **ausführbare Logik** (`ausgeloesteRegeln`: alle 26 Bedingungen samt Schwellen wie 4,2 kW, 25 kWp, 30 kW, 50 A; `schlimmsterFall`; `messkonzept`).
- Vite bündelt beides in das JavaScript der App. Wer die App ausliefert bekommt, **liefert das gesamte Regelwerk mit aus**. Jeder mit Browser-Entwicklertools (F12) kann es in Minuten lesen und kopieren. Minifizierung ist kein Schutz.
- Dasselbe gilt für das Demo-Artifact (`build:demo`). Vor Weitergabe an Dritte prüfen, was darin steckt.
- Die Edge Function (`supabase/functions/api/index.ts`) kennt das Regelwerk **nicht**: Sie macht nur Fotoanalyse (`/analyse`) und Fall-Speicher (`/faelle`). Das Regelwerk läuft komplett clientseitig.
- Zusätzlich: Der Zugangscode (`APP_CODE`) schützt aktuell nur die Funktion, nicht die ausgelieferten Dateien. Die App-Dateien selbst sind bei Netlify öffentlich abrufbar, sobald sie online sind.

**Risiko-Bewertung (ehrlich):**
- *Wahrscheinlichkeit, dass es jemand tut:* heute gering (kein Livegang, keine Bekanntheit). Steigt mit Reichweite. Ein Kollege mit Entwickler-Kenntnissen oder ein Mitbewerber würde es sofort sehen.
- *Schaden:* hoch für das Alleinstellungsmerkmal (laut [[Ideen-System]]-Score Kriterium „Vorsprung“ = 5/5, begründet mit „eigenes Regelwerk“). Außerdem rechtlich: Wer das Regelwerk ungeschützt ausliefert, kann später schwer behaupten, es seien „angemessene Geheimhaltungsmaßnahmen“ getroffen worden → Geschäftsgeheimnisschutz entfiele.
- *Gegenargument:* Die Regeln sind aus öffentlichen Quellen (TAB, DIN) abgeleitet. Ein Fachkollege kann sie grundsätzlich selbst zusammenstellen – das kostet ihn nur Zeit. Der Schutz ist also eher „Zeitgewinn“ als „uneinnehmbar“. Trotzdem: Für den Vorsprung ist es der billigste Hebel.

**Lösungsskizze „Regelwerk serverseitig“:**
1. `regelwerk.ts` (nur die Auswertung) + `regeln.json` in die Edge Function verlegen (oder zweite Funktion `POST /bewerte`).
2. App sendet nur die `Eingaben` (Felder aus `modell.ts`), bekommt zurück: `ergebnis`, `regeln[]` (nur die **ausgelösten**, mit Name, Maßnahme, Fundstelle), `offen[]`, `ergebnisSchlimmstenfalls`, `messkonzept`. Die Bedingungstexte und Schwellen bleiben auf dem Server.
3. App-Bundle enthält nur noch Anzeige und Eingabeformular. Auswertung braucht dann eine Verbindung → der Offline-Betrieb (Funkloch-Nachsenden) braucht eine Entscheidung: Eingaben lokal puffern, Bewertung nachholen. Alternativ bewusst bis zur Validierung so lassen.
4. Zugang: **Login statt Zugangscode** (steht schon unter „Irgendwann“), sonst ist ein geteilter Code ein Loch. Rate-Limit ergänzen (offene Punkte in [[App & Technik]]).
5. Tests: `regelwerk.test.ts` (13 Tests, Excel-Beispielzeile) läuft mit dem Server-Modul weiter; Tests nach `supabase/functions/` spiegeln oder Modul gemeinsam nutzen (Deno/Vite-Import beachten).
6. Das Demo-Artifact (`build:demo`) nutzt `demo.ts` mit Beispieldaten. Vor Weitergabe prüfen, ob das echte Regelwerk eingebaut wird; sonst nur Beispiel-Regeln zeigen.
7. Grenze: Wer viele Eingaben probiert, kann das Regelwerk aus den Antworten **rekonstruieren** („Orakel“). Gegenmittel: Login, Rate-Limit, nur ausgelöste Regeln zurückgeben, keine Massenabfragen. Perfekt wird es nie – es hebt die Hürde von „F12“ auf „gezielt Hunderte Fälle durchspielen“.
8. Aufwand: grob 1–2 Tage Code + Tests; Kosten 0 € (Free Tier, Rechenzeit minimal).

**Empfehlung:** Nicht jetzt bauen. Zuerst Gespräche. **Vor dem Livegang für Fremde** (Landingpage mit Link zur App, Kollegen-Test über Netlify) erledigen. Solange die App nur lokal beim Autor läuft oder in Tests mit bekannten Kollegen unter NDA, ist das Risiko tragbar.

## 3. Verträge und Zugang
| Maßnahme | Inhalt | Aufwand / Kosten |
|---|---|---|
| **NDA für Tester/Kollegen** | Kurz (1 Seite): Vertraulichkeit über Regelwerk, Funktionsweise, Zugang; Zweck: Mittesten; Laufzeit; keine Weitergabe des Zugangscodes. Auch Gespräche vorher: im [[Gesprächsleitfaden]] nur *Problem* abfragen, nicht die Regeln zeigen. | Vorlage selbst, ⚖️ Anwalt prüfen lassen (ca. 100–300 € für eine Vorlage). Bei netzwerkbasierten Gesprächen oft sozial unpassend: besser *technisch* schützen (kein Regelwerk im Browser) als Kollegen NDAs unterschreiben zu lassen. |
| **Nutzungsbedingungen (AGB)** | Kein Kopieren, kein Reverse Engineering, kein Scraping, kein Teilen des Zugangs; Haftungsbegrenzung („ersetzt keine Prüfung durch den Errichter“, vgl. [[Rechtliches]]); Datenschutz-Hinweis zu Fotos (Anthropic, USA). | Entwurf selbst, ⚖️ Anwalt prüfen lassen. Hinweis: Reverse Engineering ist nach § 69e UrhG für Interoperabilität teils erlaubt und nicht pauschal ausschließbar – auch das ⚖️ klären lassen. |
| **Zugang nur mit Login** | Pro Nutzer ein Konto (Supabase Auth), Sperren möglich, Nutzung nachvollziehbar. Beweis bei Missbrauch. | Code-Aufgabe, ca. 1 Tag. Steht unter „Irgendwann“ → zusammen mit Regelwerk serverseitig vorziehen. |
| **Auftragsverarbeitung (AVV)** | Mit Supabase und Netlify; Anthropic: Datenverarbeitung prüfen | siehe [[Rechtliches]] |
| **Zugriff aufs Repository** | Repository **privat** halten (auf GitHub prüfen!), nur eigene Konten, 2FA, keine Secrets im Code | 0 €, 10 Min. |

## 4. Offene Frage: Arbeitgeber (⚖️ Anwalt / Steuerberater)
**Frage:** Wem gehören Idee und Regelwerk, wenn sie im Rahmen einer Anstellung im Elektrohandwerk entstanden sind oder dort erworbenes Wissen enthalten?

Was ich **nicht** beurteilen kann (und was vom Arbeitsvertrag abhängt):
- **Arbeitnehmererfindung (ArbnErfG):** Gilt für patent-/gebrauchsmusterfähige Erfindungen. Bei Software „als solche“ eher nicht relevant, aber die Diensterfindungs-Meldepflicht kann trotzdem Fragen aufwerfen. ⚖️
- **Urheberrecht an Software von Arbeitnehmern (§ 69b UrhG):** Programme, die ein Arbeitnehmer **in Wahrnehmung seiner Aufgaben** oder nach Anweisung des Arbeitgebers schreibt, stehen dem Arbeitgeber zu. Entscheidend: War das Entwickeln der App Teil der Arbeit? Hier vermutlich nein (Freizeit, eigene Mittel) – aber auf Basis des Vertrags prüfen. ⚖️
- **Erlernte Kenntnisse vs. Betriebsgeheimnisse:** Allgemeines Fachwissen darf mitgenommen werden. Konkrete interne Unterlagen, Kundendaten, interne Kalkulationen, Westnetz-Schulungsunterlagen aus dem Betrieb **nicht**. Die Fundstellen im Regelwerk (u. a. „Westnetz-Schulung 09/2025“) – woher kommt dieses Dokument? Wenn es nur über den Arbeitgeber zugänglich war: prüfen, ob Weitergabe/Verwertung erlaubt ist. ⚖️
- **Nebentätigkeit:** Viele Arbeitsverträge verlangen Anzeige oder Genehmigung einer Nebentätigkeit. Besonders wichtig bei **Wettbewerb** (Wettbewerbsverbot während des Arbeitsverhältnisses): Verkauft Zählerklar an Elektrobetriebe, die Kunden oder Konkurrenten des Arbeitgebers sind? ⚖️
- **Vertragsklauseln:** Vertraulichkeit, Nebentätigkeitsklausel, „alle Ideen gehören dem Arbeitgeber“-Klauseln (oft unwirksam, aber nicht immer). Arbeitsvertrag **einmal selbst auf diese vier Begriffe durchlesen**: Nebentätigkeit, Wettbewerb, Verschwiegenheit, Erfindungen/Schutzrechte.
- **Steuer:** Gewerbeanmeldung, Einkommensteuer, ggf. Kleinunternehmerregelung → Steuerberater (Frage laut Aufgabe).

**Konkreter Vorschlag:** Vor Livegang **eine Stunde Erstberatung** (Fachanwalt für Arbeitsrecht / IT-Recht; Erstberatung für Verbraucher ist gesetzlich auf max. 190 € netto begrenzt, § 34 RVG) mit dem Arbeitsvertrag in der Hand. Fragenkatalog siehe oben. Das ist der Punkt, an dem Geld wirklich sinnvoll ausgegeben wäre.

## 5. Realistischer Schutz durch Tempo
Nachbauen kann man vieles – ein Konkurrent braucht aber: Fachwissen (R01–R26 mit Fundstellen), Zugang zu Elektrobetrieben, Vertrauen und echte Fälle. Mein Vorsprung ([[Mein Vorteil]]):
- **Tempo:** Wer zuerst bei den Betrieben ist, wird der Standard. Das passt zu [[ADR-0005 Direktansprache vor Instagram]].
- **Netzwerk:** Direkte Kontakte zu Kollegen, Großhändler, Innung (kopiert niemand per Download).
- **Daten aus echten Fällen:** Jeder erfasste Fall (Foto + tatsächliche Entscheidung) verbessert Erkennung und Regeln. Die ersten 20 Fälle sind Pflicht für die Validierung und gleichzeitig der Wall um das Produkt. Fotos nur ohne Adresse/Namen speichern.
- **Pflege des Regelwerks:** TAB und Netzbetreiber ändern sich (siehe Aufgabe „Neue Westnetz-TAB beobachten“). Wer dauerhaft aktuell hält, ist besser als ein einmal kopierter Stand.
- **Marke und Domain** früh sichern (billig).
- Ehrliche Einordnung: Gegen einen entschlossenen Nachahmer mit Fachwissen hilft kein Schutzrecht. Das beste Schutzkonzept ist, **früh Kunden zu haben**.

## 6. Priorisierte Maßnahmenliste
Sortiert nach Nutzen pro Aufwand; alles ohne Zugangsdaten hier im Vault bzw. im Code lösbar ist markiert mit 🔧.

| Prio | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | **Arbeitsvertrag lesen** (Nebentätigkeit, Wettbewerb, Verschwiegenheit, Erfindungen) und Fragen für Anwalt notieren | 0 € | 30 Min. | sofort |
| 2 | **Erstberatung Anwalt** (Arbeits-/IT-Recht): Eigentum am Regelwerk, Nebentätigkeit, Quelle Westnetz-Schulung | bis ca. 190 € netto | 1 Std. | vor Livegang / vor erstem Geld |
| 3 | GitHub-Repositories **privat** und 2FA prüfen | 0 € | 10 Min. | sofort |
| 4 | Domain `zaehlerklar.de` per DENIC prüfen und sichern; Handle @zaehlerklar | ca. 12 €/Jahr | 15 Min. | steht schon in Aufgaben |
| 5 | DPMA-Markenrecherche, dann Anmeldung Klassen 9 + 42 | ca. 290 € | 1–2 Std. | nach sauberer Recherche, vor Druck/Livegang |
| 6 | 🔧 **Regelwerk serverseitig** (Edge Function) | 0 € | 1–2 Tage | **vor Livegang für Fremde** |
| 7 | 🔧 **Login statt Zugangscode** + Rate-Limit | 0 € | 1 Tag | zusammen mit 6, vor Kollegen-Test über das Netz |
| 8 | 🔧 Nutzungsbedingungen + Kurz-NDA entwerfen, prüfen lassen | ca. 100–300 € | 2 Std. + Anwalt | vor Kollegen-Test |
| 9 | Demo-Artifact und Build prüfen: Welche Regeln stecken drin? Nur Beispiel nach außen geben | 0 € | 30 Min. | vor Weitergabe der Demo |
| 10 | Geheimhaltungs-Dokumentation anlegen (Wer hat Zugriff? Was ist geheim?) – Beleg für „angemessene Maßnahmen“ | 0 € | 30 Min. | mit Punkt 6 |
| – | Patent / Gebrauchsmuster | – | – | **nicht** verfolgen |

## Unsicher / vom Anwalt prüfen lassen (Sammelliste)
- Eigentum an Idee und Regelwerk bei Anstellung im Elektrohandwerk (§ 69b UrhG, Nebentätigkeit, Wettbewerb).
- Herkunft und Verwertungserlaubnis der Westnetz-Schulung (09/2025) und anderer Unterlagen im Regelwerk.
- Tragen Geschäftsgeheimnisse, wenn die Fundstellen öffentlich sind und Teile des Regelwerks im Browser lagen (vor dem Umbau)?
- Wirksamkeit eines Reverse-Engineering-Verbots (§ 69e UrhG).
- Haftung bei falschem Ergebnis (Haftungsausschluss in Nutzungsbedingungen).
- Marke: Verwechslungsgefahr „Zählerklar“ (Klassen 9/42) – professionelle Recherche?
