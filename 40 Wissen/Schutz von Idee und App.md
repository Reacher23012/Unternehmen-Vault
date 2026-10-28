---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-10-28
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App („Zählerklar“)

> **Wichtig:** Das ist eine Analyse zur Orientierung, **keine Rechtsberatung**. Alles mit 🔶 „vom Anwalt prüfen lassen“ ist unsicher oder hängt von deinem Einzelfall ab. Beträge sind Größenordnungen aus dem Gedächtnis, vor Anmeldung auf der DPMA-Seite gegenprüfen.

**Kurzfassung:** Die *Idee* ist nicht schützbar. Schützbar sind Code, Name und – mit Aufwand – das Regelwerk als Geschäftsgeheimnis. Das Regelwerk liegt aktuell **offen im Browser des Nutzers**; das ist der größte konkrete Schwachpunkt und lässt sich mit einer Code-Aufgabe beheben. Den echten Schutz liefert aber Tempo, nicht Recht (Abschnitt 5). Und vorab klären: **Wem gehört das Ganze überhaupt?** (Abschnitt 4).

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz? | Wie / Kosten | Einschätzung |
|---|---|---|---|
| **Die Idee** („Foto → Einordnung Zählerplatz“) | nein | – | Ideen sind frei. Jeder darf dasselbe bauen. |
| **Code** (App, Edge Function) | ja, automatisch | Urheberrecht für Computerprogramme (§§ 69a ff. UrhG), keine Anmeldung, 0 € | Schützt nur den konkreten Code, nicht die Funktionsweise. Ein Nachbau mit eigenem Code ist erlaubt. Beweis: Git-Historie (Zeitstempel) aufheben, privat halten. |
| **Name „Zählerklar“** | ja, als Marke | DPMA-Anmeldung, Klassen 9 und 42: Größenordnung **~290 €** (bis 3 Klassen, 10 Jahre); Recherche im DPMAregister kostenlos → [[ADR-0006 Produktname Zählerklar]] | Schützt den Namen, nicht das Produkt. Sinnvoll erst nach Recherche und Go. 🔶 Ähnlichkeitsprüfung (Verwechslungsgefahr) nicht selbst abschließend bewerten. |
| **Regelwerk R01–R26** (Inhalt: Bedingungen, Maßnahmen, Fundstellen) | nur als **Geschäftsgeheimnis** | Geschäftsgeheimnisgesetz (GeschGehG): schützt nur, wenn **angemessene Geheimhaltungsmaßnahmen** getroffen sind (§ 2 Nr. 1). Kosten: Organisation, keine Gebühr | Aktuell *nicht* erfüllt, siehe Abschnitt 2. Die Fundstellen selbst (BDEW-TAB, Westnetz-Schulung) sind öffentlich bzw. fremd und nicht dein Geheimnis. Dein Wert ist die **Auswahl, Verknüpfung und Aufbereitung**. |
| **Regelwerk als Sammlung** | evtl. | Sammelwerk/Datenbankschutz (§ 4 UrhG, §§ 87a ff. UrhG) | 🔶 Unsicher, ob Schöpfungshöhe bzw. „wesentliche Investition“ vorliegt. Nicht darauf verlassen. |
| **Patent / Gebrauchsmuster** | praktisch nein | Software „als solche“ und Geschäftsmethoden sind ausgeschlossen (§ 1 Abs. 3 PatG); Anmeldung kostet vierstellig mit Anwalt | Ein Regelwerk mit KI-Erkennung ist kein technischer Beitrag im Sinn des Patentrechts. **Nicht verfolgen.** 🔶 Nur auf Anwaltsrat, falls ein echtes technisches Verfahren entsteht. |

**Fremde Rechte beachten (Gegenrichtung):** Normtexte (DIN/VDE) und Schulungsunterlagen des Netzbetreibers gehören nicht dir. Es gilt weiter: nur Fundstellen, keine Texte kopieren → [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]], [[Rechtliches]]. Sonst wird der Schutz-Spieß umgedreht.

## 2. Technischer Befund: Das Regelwerk liegt im Browser
**Geprüft im Code (`zaehlerschrank-check`, Stand 28.10.2026):**
- `web/src/regelwerk.ts` importiert `./regeln.json` statisch (`import regelnJson from "./regeln.json"`). Vite baut die Datei **vollständig in das JavaScript-Bundle** der App. `regeln.json` hat ca. 14 KB: alle 26 Regeln mit `bedingung`, `massnahme`, `fundstelle`, `geltung`, `status`.
- Die Logik (`ausgeloesteRegeln`, `bewerte`, `schlimmsterFall`) läuft komplett clientseitig; `main.ts` und `demo.ts` rufen `bewerte` direkt auf. Die Edge Function (`supabase/functions/api`) macht nur Fotoanalyse und Fall-Speicher, sie kennt das Regelwerk nicht.
- Die App-Seite hat keine Sperre: Wer die App-URL öffnet (sobald auf Netlify live), kann Bundle, Netzwerk-Tab und Quelltext lesen. Minifizierung ist **kein Schutz**; `regeln.json` bleibt als lesbarer Text im Bundle. Der Zugangscode (`x-app-code`) schützt aktuell nur die API, nicht die ausgelieferte App.
- Das Demo-Artifact (`build:demo`) enthält ebenfalls das ganze Regelwerk, ist aber privat auf claude.ai.
- Positiv: Das GitHub-Repo ist **privat** (geprüft). Kein Regelwerk im öffentlichen Repo.

**Risiko-Bewertung:**
| Szenario | Wahrscheinlichkeit | Schaden |
|---|---|---|
| Ein Kollege/Konkurrent kopiert das Regelwerk aus dem Bundle | heute niedrig (App nicht online, wenige Tester), steigt mit Reichweite | mittel: Er spart sich Monate Fachrecherche, nicht aber Marke, Netzwerk, Daten |
| Rechtliche Folge | – | Wer eine **öffentlich ausgelieferte** Datei ohne Vertrag liest, begeht kaum einen Rechtsbruch. Reverse Engineering eines rechtmäßig erlangten Produkts ist nach GeschGehG § 3 erlaubt, **wenn nicht vertraglich ausgeschlossen**. 🔶 Prüfen lassen. Ohne Geheimhaltungsmaßnahme ist auch der GeschGehG-Schutz für den Inhalt schwach. |

**Einordnung:** Ehrlich gesagt ist das Risiko *vor* der Validierung klein: Es gibt noch keinen zahlenden Kunden, und das Regelwerk ist nur bedingt „geheim“ (basiert auf öffentlicher TAB). Es wird relevant, sobald die App öffentlich läuft und Fremde Zugang haben. Der Fix ist aber klein, und die Architektur wird dadurch auch besser (siehe unten).

**Lösungsskizze „Regelwerk serverseitig“:**
1. `regeln.json` und die Auswertung (`ausgeloesteRegeln`, `schlimmsterFall`, `bewerte`) wandern in die Edge Function (neue Route `POST /bewerte`, gleicher `x-app-code`-Schutz bzw. später Login).
2. Die App schickt nur die **Eingaben** (`Eingaben`-Objekt) und bekommt zurück: Ampel/Stufe, Maßnahmenliste (Text + **Fundstelle**), „Vor Ort klären“, Hinweise, Messkonzept. Sie bekommt **nicht** die Bedingungs-Texte und nicht die Regeln, die nicht gegriffen haben.
3. Tests (`regelwerk.test.ts`, 13 Tests, u. a. Excel-Referenzzeile) bleiben erhalten; Logik als gemeinsames Modul, damit sie unverändert getestet wird.
4. Folgen: (a) Jede Auswertung braucht Netz → Offline-Modus (steht unter „Irgendwann“) wird später ein Problem; Zwischenlösung: Server-Antwort lokal zwischenspeichern. (b) Das Demo-Artifact braucht weiter eine eingebaute Mini-Version (nur Beispieldaten, nicht das echte Regelwerk). (c) Jeder Aufruf kostet Edge-Function-Zeit, aber nur Millisekunden, kein Claude-Aufruf.
5. **Grenze:** Auch serverseitig sieht ein Nutzer das Ergebnis; mit vielen Testeingaben ließe sich das Regelwerk **durch Ausprobieren** rekonstruieren (Orakel-Angriff). Das ist unvermeidlich; Gegenmittel: Login pro Nutzer, Mengenbegrenzung, Nutzungsbedingungen (Abschnitt 3). Es hebt die Hürde von „Strg+U“ auf „viele Stunden Arbeit“.

## 3. Verträge und Zugang
| Maßnahme | Zweck | Kosten / Aufwand | Hinweis |
|---|---|---|---|
| **Geheimhaltungsvereinbarung (NDA)** für Tester/Kollegen, die tiefer ins Regelwerk sehen | belegt „angemessene Geheimhaltungsmaßnahme“ (GeschGehG) | 0 € mit Vorlage; besser 🔶 Anwalt prüft die Vorlage einmal | Einseitig, kurz: gilt für Regelwerk, Zugangsdaten, nicht öffentliche App-Inhalte. Bei bloßem Gespräch nicht nötig, **vor** der Weitergabe von Zugangscode/Regeldetails. |
| **Nutzungsbedingungen (AGB light)** | kein Kopieren, kein Reverse Engineering, keine Weitergabe des Zugangs, Haftungsrahmen (Ersteinschätzung, Prüfung durch Errichter) | Anwalt/Generator, einmalig | 🔶 AGB-Recht (§§ 305 ff. BGB) ist heikel; vom Anwalt prüfen lassen, passt zur Haftungsfrage in [[Rechtliches]]. |
| **Zugang nur mit Login** | verhindert anonymes Auslesen; macht Missbrauch einem Konto zuordenbar | Aufwand mittel (Supabase Auth) | Steht bereits als „Login statt Zugangscode“ unter „Irgendwann“; passt zur Regelwerk-Verlagerung. |
| **Kein Quelltext öffentlich** | Repo bleibt privat; keine Source Maps ins Netlify-Deploy | 0 € | Prüfpunkt beim Livegang (`build.sourcemap` ist aktuell nicht gesetzt, Standard = aus). |
| **Dokumentieren, wer was bekommen hat** | Nachweis bei Streit | 0 € | Einfache Liste in der Gesprächs-/Testerliste, ohne Kundendaten im Vault. |

## 4. Arbeitgeber-Frage – offen, 🔶 Anwalt/Steuerberater
**Hintergrund:** Idee und Fachwissen stammen aus der Arbeit im Elektrohandwerk. Ob du angestellt bist, steht im Vault nicht ([[Mein Vorteil]] nennt „Elektrohandwerk“, im Impressum steht nur ein Name). **Annahme: Anstellung mit Nebentätigkeit.** Zu klären:
1. **Arbeitsvertrag lesen:** Nebentätigkeitsklausel (Anzeige/Genehmigung), Wettbewerbsverbot, Verschwiegenheit über Betriebs- und Kundendaten, Klauseln zu „Erfindungen und Arbeitsergebnissen“.
2. **Software:** Hast du den Code **in der Arbeitszeit oder mit Arbeitsmitteln** (Firmenhandy, Fotos von Kundenschränken) geschaffen oder aufgrund einer Anweisung? Dann gehen die Nutzungsrechte nach § 69b UrhG im Zweifel an den Arbeitgeber. Privat, in der Freizeit, ohne Dienstmittel und außerhalb deiner Aufgaben: grundsätzlich bei dir. 🔶
3. **Arbeitnehmererfindungsgesetz:** Betrifft nur patent-/gebrauchsmusterfähige Erfindungen (siehe Abschnitt 1: unwahrscheinlich), nicht normale Software. 🔶 Nur zur Sicherheit mitprüfen.
4. **Wettbewerb:** Bedient das Produkt Kunden/Kollegen des Arbeitgebers oder berührt es dessen Geschäft (Elektrobetriebe als Zielgruppe)? Während der Anstellung gilt eine Treuepflicht; auch ohne Klausel kann ein Konkurrenzverbot greifen. 🔶
5. **Fachwissen vs. Betriebsgeheimnis:** Allgemeines Berufswissen darfst du nutzen. Interne Unterlagen, Kundendaten, Fotos echter Kundenschränke oder Netzbetreiber-Schulungen des Arbeitgebers nicht ohne Erlaubnis. Zur Westnetz-Schulung (09/2025): Woher stammt sie, darfst du daraus Fundstellen zitieren? 🔶
6. **Fotos von Kundenschränken** sind auch ein Datenschutz- und Vertrauensthema → keine Adresse/Name/Zählernummer ([[Bildrechte im Marketing]]).
7. **Steuer/Gewerbe:** Nebengewerbe anmelden, Einkünfte erklären (Steuerberater) – gehört nicht zum Schutz, aber in dieselbe Beratung. → [[Einschätzung Handwerks-Apps als Nebeneinkommen]]

**Fragen für den Anwalt (ein Termin, am besten Fachanwalt für Arbeitsrecht mit IT-/Urheberrecht-Kenntnis):** (1) Darf ich das neben dem Job so betreiben? (2) Wem gehören Code und Regelwerk, wenn ich sie privat gebaut habe? (3) Muss ich den Arbeitgeber informieren, bevor ich verkaufe? (4) Passen meine NDA- und Nutzungsbedingungs-Entwürfe? (5) Brauche ich die Marke jetzt oder erst nach Go?

## 5. Realistischer Schutz: Tempo, Netzwerk, Daten
Ein Recht schützt gegen Abschreiben, nicht gegen jemanden, der es eigenständig besser macht. Bei dieser Idee ist der verteidigbare Vorsprung (siehe Score „Vorsprung 5“ im Projekt):
- **Zeit:** Bei Westnetz und diesem Regelwerk bist du Monate voraus. Jede Woche ohne Gespräch/Test verschenkt davon etwas → die Gespräche haben Vorrang vor allen Schutzmaßnahmen.
- **Netzwerk:** Erste Kunden aus Direktansprache ([[Direktansprache]]); Innung, Großhändler. Das kopiert niemand per Download.
- **Daten aus echten Fällen:** Die Trefferquote und die korrigierten Fälle (Fotoerkennung vs. Entscheidung) sind mit der Zeit wertvoller als die 26 Regeln. Sie liegen serverseitig, nicht im Bundle. Speicherung sauber (DSGVO), keine Weitergabe.
- **Laufende Pflege:** TAB-Änderungen (Westnetz 2026) beobachten; ein starres, kopiertes Regelwerk veraltet. Wer Pflege und Fundstellen liefert, bleibt vorn.
- **Marke und Ruf:** Name, Qualität, Fachbeitrag auf Instagram; wer als „der Zählerklar-Typ“ bekannt ist, wird nicht durch einen Klon ersetzt.
- Ehrliche Gegenseite: Ein Großhändler, Netzbetreiber oder Software-Anbieter für Elektrobetriebe könnte das Thema selbst abdecken. Dagegen hilft kein Recht, nur Nutzen und Geschwindigkeit.

## 6. Maßnahmenliste (priorisiert)
| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | **Repo privat lassen, Source Maps aus, nur Stand ausliefern** | 0 € | 5 Min. | laufend, vor Livegang prüfen |
| 2 | **Arbeitsvertrag lesen**, Nebentätigkeit/Wettbewerb/Erfindungen notieren; Anwaltstermin mit Fragenliste (Abschnitt 4) | ~150–400 € Erstberatung (Größenordnung) | 2 Std. + Termin | **vor Livegang und vor erstem Euro** |
| 3 | **Code-Aufgabe „Regelwerk serverseitig“** (Abschnitt 2) | 0 € | mittel, 1 Nachtschicht-Aufgabe | vor Test mit Fremden / Livegang |
| 4 | **NDA-Vorlage** für Tester (kurz), vom Anwalt mit Punkt 2 prüfen lassen | 0 € + im Termin | 1 Std. | vor Weitergabe des Zugangscodes |
| 5 | **Nutzungsbedingungen** (kein Kopieren/Reverse Engineering, Haftung) | Generator/Anwalt, ca. 100–300 € | 2 Std. | vor Livegang, zusammen mit [[Rechtliches]] |
| 6 | **Login statt Zugangscode** | 0 € | mittel | vor Kollegen-Test (bereits in Aufgaben) |
| 7 | **Markenrecherche DPMA/DENIC, Domain sichern** | 0 € | 30 Min. | bereits in Aufgaben ([[ADR-0006 Produktname Zählerklar]]) |
| 8 | **Marke anmelden** (Klassen 9, 42) | ~290 € | 1 Std. | erst nach Go und Recherche |
| 9 | **Git-Historie als Entstehungsnachweis** sichern, Lieferdaten notieren | 0 € | – | laufend |
| – | Patent / Gebrauchsmuster | 1.000+ € | – | **nicht verfolgen** |

**Reihenfolge-Empfehlung:** Die Gespräche bleiben vorn ([[2026-10-02 Ideen-Check]]). Von den Schutzpunkten gehören nur 1 und 2 (Vertrag lesen) in die nächsten Tage, weil sie den Rest bestimmen; 3 bis 6 hängen am Livegang; 8 hängt am Go.

## Offene Fragen (Antwort nur vom Nutzer / Anwalt)
- Angestellt oder selbständig im Elektrohandwerk? Wortlaut Arbeitsvertrag? 🔶
- Woher stammt die Westnetz-Schulung (09/2025), und darf sie als Fundstelle genannt werden? 🔶
- Soll das Regelwerk Geschäftsgeheimnis bleiben oder bewusst als Marketing (Rätsel-Posts) teilweise öffentlich sein? Posts zeigen ohnehin Teile davon ([[Instagram-Posts 1–10]]) – das schwächt den Geheimnisschutz für diese Teile. Entscheidung nötig.
