---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
thema: schutz
erstellt: 2026-11-15
status: analyse – keine Rechtsberatung, offene Punkte vom Anwalt prüfen lassen
---
# Schutz von Idee und App („Zählerklar“)

> **Analyse, keine Rechtsberatung.** Alles mit **⚖ Anwalt** ist unsicher oder hängt vom Einzelfall ab und sollte vor einer Entscheidung geprüft werden (z. B. Fachanwalt für IT-/Urheberrecht, Erstberatung). Kostenangaben sind grobe Schätzungen, keine Angebote. Erstellt von der Nachtschicht am 15.11.2026, ohne Zugriff auf Verträge oder externe Quellen.

**Kurzfazit:** Die *Idee* ist nicht schützbar, der *Code* und der *Name* teilweise, das *Regelwerk* nur mit Geheimhaltungsmaßnahmen. Die App liefert das Regelwerk heute komplett an jeden Browser aus (siehe Abschnitt 2). Der wirksamste Schutz ist trotzdem Tempo, Netzwerk und echte Falldaten (Abschnitt 5). Und: **Schutz darf die Gespräche nicht überholen** ([[Ideen-System]]: erst verkaufen, dann bauen) – nur die Null-Euro-Maßnahmen sofort, der Rest nach den Go/No-Go-Signalen.

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Wie / Kosten | Einschätzung |
|---|---|---|---|
| **Idee / Geschäftskonzept** („Foto → KI → Regelwerk → Maßnahmen“) | Kein Schutz. Ideen, Methoden und Grundsätze sind frei (für Software ausdrücklich § 69a Abs. 2 UrhG). | – | Nicht schützbar. Wer die Idee kennt, darf sie nachbauen. |
| **Code** (Web-App, Edge Function) | Urheberrecht, entsteht automatisch mit der Schöpfung (§§ 69a ff. UrhG). Schützt gegen Kopieren des Codes, nicht gegen eine eigene Neuimplementierung. | 0 €. Nachweis helfen: Git-Historie mit Datum, Urheberhinweis im Quelltext. | Gut gegen 1:1-Kopie, schwach gegen Nachbau. |
| **Name „Zählerklar“** | Marke (DPMA), Klassen 9 und 42 laut [[ADR-0006 Produktname Zählerklar]]. Ohne Eintragung nur schwacher Schutz als Werktitel/geschäftliche Bezeichnung bei Benutzung. | DPMA-Anmeldung ca. 290 € für bis zu 3 Klassen (online), 10 Jahre Schutz; Stand bitte beim DPMA prüfen. Anwalt für Recherche optional (ca. 150–400 €). | Sinnvoll **nach** Recherche und erst, wenn der Name bleibt (nach Go). Beschreibende Namen (z. B. „klar“ im Zusammenhang mit Zählern) können als schwach gelten → **⚖ Anwalt**: Eintragungsfähigkeit. |
| **Regelwerk R01–R26** (Auswahl, Verknüpfung, Fundstellen) | (a) **Geschäftsgeheimnis** nach GeschGehG, aber nur bei „angemessenen Geheimhaltungsmaßnahmen“ (§ 2 Nr. 1). (b) Als Sammlung evtl. Datenbankschutz (§§ 87a ff. UrhG) – **⚖ Anwalt**, ob die Voraussetzungen („wesentliche Investition“) erfüllt sind. | 0 € für (a), aber nur wenn die Geheimhaltung tatsächlich stattfindet. | Die Rohinhalte stammen aus öffentlichen Quellen (TAB, BDEW-Musterwortlaut, Westnetz-Schulung). Geschützt wäre allenfalls die **Zusammenstellung und Bewertung**, nicht die Normen. Solange das Regelwerk offen im Browser liegt, ist (a) kaum haltbar. |
| **Fremdinhalte im Regelwerk** | Urheberrecht Dritter (BDEW, Netzbetreiber, Normen) | – | Bereits geregelt: nur Fundstellen, keine Normtexte ([[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]). Das gilt auch für `regeln.json` (Spalte „bedingung“/„massnahme“ nur eigene Formulierungen). Bei Zweifeln **⚖ Anwalt**. |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist ausgeschlossen (§ 1 Abs. 3 Nr. 3 PatG). Möglich nur mit technischem Beitrag, hier eher unrealistisch (Regelauswertung + KI-Bilderkennung mit Standardmitteln). Gebrauchsmuster: Programme ebenfalls ausgeschlossen. | Patent mehrere tausend € mit Anwalt, Jahre Dauer | **Nicht empfohlen.** Kosten und Aufwand stehen in keinem Verhältnis zum Nutzen; Offenlegung der Erfindung wäre sogar kontraproduktiv. |

**Wichtig zu Reverse Engineering:** Nach GeschGehG (§ 3) ist das Nachbauen aus einem rechtmäßig erhaltenen Produkt grundsätzlich erlaubt – **außer es ist vertraglich ausgeschlossen**. Deshalb gehören Nutzungsbedingungen mit Verbot dazu (Abschnitt 3). **⚖ Anwalt**: Wirksamkeit der Klausel in AGB gegenüber Unternehmern.

## 2. Technischer Befund: Das Regelwerk liegt im Browser
**Befund (am Code geprüft, 15.11.2026):**
- `web/src/regeln.json` (26 Regeln, ca. 14 KB: Bedingung, Maßnahme, Stufe, Fundstelle, Geltung) wird in `web/src/regelwerk.ts` importiert; die **Auslöselogik** (`ausgeloesteRegeln`, `bewerte`) steht ebenfalls dort und läuft im Browser.
- `web/src/main.ts` und `web/src/demo.ts` rufen `bewerte` direkt auf. `vite build` bündelt alles in die ausgelieferte JavaScript-Datei. Minifizierung ist keine Verschlüsselung.
- Der Zugangscode (`x-app-code`) schützt nur die API-Routen (Analyse, Fälle). **Die App selbst samt Regelwerk ist ohne Login abrufbar**, sobald sie bei Netlify liegt. Die Demo-Variante (`npm run build:demo`) enthält es ebenfalls.

**Risiko-Bewertung:**
| Aspekt | Einschätzung |
|---|---|
| Wie leicht auslesbar? | Sehr leicht: Seite aufrufen, Entwicklerwerkzeuge öffnen, Datei lesen. Keine Fachkenntnis über Zählerschränke nötig. |
| Wie wertvoll ist der Inhalt? | Mittel. Die Fundstellen sind öffentlich nachprüfbar; ein Fachmann mit TAB und Zeit könnte vieles selbst herleiten. Der Wert liegt in der geprüften Auswahl und den Schwellen (z. B. Excel-Formeln als Grundlage), die Zeit sparen. |
| Rechtliche Folge | Wer das Regelwerk selbst frei ausliefert, kann es kaum noch als Geschäftsgeheimnis schützen („angemessene Geheimhaltungsmaßnahmen“ fehlen). Das Urheberrecht am Code bleibt. |
| Dringlichkeit | **Niedrig, solange die App nicht öffentlich liegt** (heute: nur lokal bzw. privat). **Hoch ab dem Moment, in dem die App öffentlich oder für Tester ohne Login erreichbar ist.** Das stimmt mit „Login statt Zugangscode, bevor Kollegen testen“ in [[Aufgaben]] überein. |

**Lösungsskizze: Regelauswertung in die Edge Function**
1. Neue Route `POST /bewerte` in `supabase/functions/api/index.ts` (mit `x-app-code` bzw. später Login): nimmt die Eingaben, führt `bewerte` aus, liefert **nur** Ergebnis (Ampel, ausgelöste Maßnahmen mit Text und Fundstelle, „Vor Ort klären“, Hinweise). Die Regelmenge und Schwellen bleiben serverseitig.
2. `regelwerk.ts`/`regeln.json` ziehen aus `web/src` in ein serverseitig genutztes Modul um (z. B. `supabase/functions/_shared/`), die Tests (`regelwerk.test.ts`, 13 Stück inkl. Excel-Beispielzeile) laufen weiter gegen dieses Modul.
3. Die App ruft `/bewerte` statt `bewerte` lokal auf. Die Demo behält eine abgespeckte Mock-Bewertung mit Beispieldaten (das Demo-Artifact ist privat).
4. **Kompromiss:** Der Funkloch-Schutz („Fälle gehen nicht verloren“) bleibt, aber die Bewertung selbst braucht dann Netz. Lösung: Eingaben lokal speichern, Ergebnis nachladen, sobald Verbindung da ist. Offline-Modus ist ohnehin „erst nach Go“.
5. Einschränkungen, ehrlich: Das Ergebnis jedes einzelnen Falls bleibt sichtbar, ein Angreifer kann das Regelwerk durch viele Testanfragen **teilweise rekonstruieren** (Black-Box). Dagegen helfen Login, Rate-Limit (derzeit bewusst offen, siehe [[App & Technik]]) und Nutzungsbedingungen – ein vollständiger Schutz ist technisch nicht möglich.
6. Aufwand grob 1–2 Tage inkl. Tests. Supabase-Deployment nur durch den Nutzer.

## 3. Verträge und Zugang
| Maßnahme | Zweck | Kosten / Aufwand |
|---|---|---|
| **NDA (Geheimhaltung)** für Tester und Kollegen, die mit der App arbeiten | Begründet „angemessene Geheimhaltungsmaßnahmen“ (GeschGehG); regelt Weitergabe, Zugangsdaten, Rückgabe | Kurze Vorlage selbst entwerfen und anwaltlich prüfen lassen (ca. 200–500 €). **Nicht** für Gespräche nötig, in denen nur über das Problem gesprochen wird; nur für Tester mit Zugriff. |
| **Nutzungsbedingungen / AGB** | Kein Kopieren, kein Reverse Engineering/Scraping, keine Weitergabe des Zugangs, Haftungsrahmen („ersetzt keine Prüfung durch die Elektrofachkraft“) | Entwurf selbst, Prüfung **⚖ Anwalt**, gemeinsam mit [[Rechtliches]] (Impressum/Datenschutz) |
| **Zugang nur mit Login** | Verhindert, dass die App samt Regelwerk für Fremde offen liegt; macht Nutzer identifizierbar | Aufwand: Supabase-Auth statt Zugangscode, ca. 1–2 Tage. Hosting-Alternative ohne Code: Netlify-Passwortschutz (kostenpflichtiger Tarif, Preis prüfen). |
| **Repository privat halten** | Quelltext inkl. Regelwerk nicht öffentlich | 0 €. **Bitte prüfen**, ob `zaehlerschrank-check` und der Vault privat sind (Nachtschicht kann das nicht sicher feststellen). |
| **Urheberhinweis im Code** („© 2026 …, alle Rechte vorbehalten“) | Klarstellung, erleichtert Nachweis | 0 €, 5 Minuten |
| **Beweis sichern** | Git-Historie zeigt, wann was entstanden ist; Vault-Commits ebenfalls | 0 €, läuft bereits |

## 4. Offene Frage: Wem gehört die Idee, wenn sie im Rahmen einer Anstellung im Elektrohandwerk entstanden ist?
Ausgangslage laut Vault: Fachwissen aus dem Elektrohandwerk ([[Mein Vorteil]]); **ob und wie der Nutzer angestellt ist und was im Arbeitsvertrag steht, ist der Nachtschicht nicht bekannt.** Folgende Punkte sind zu klären – **alle ⚖ Anwalt/Steuerberater**:
1. **Software, die in Wahrnehmung dienstlicher Aufgaben entsteht** (§ 69b UrhG): Rechte gehen dann auf den Arbeitgeber über. Bei einem Elektriker ist Software normalerweise nicht Dienstaufgabe – aber wenn Arbeitgeber Material, Arbeitszeit, Kundenfälle oder Fotos aus Aufträgen genutzt hat, wird es heikel.
2. **Arbeitnehmererfindung** (ArbnErfG): gilt für patent-/gebrauchsmusterfähige Erfindungen; wegen Abschnitt 1 hier wohl kaum relevant, aber „Meldepflicht“ bei Diensterfindung prüfen.
3. **Nebentätigkeit und Wettbewerb:** Arbeitsvertrag auf Anzeige-/Genehmigungspflicht für Nebentätigkeiten prüfen. Während des Arbeitsverhältnisses gilt ein Wettbewerbsverbot (im Kern § 60 HGB bzw. Treuepflicht): Verkauf an die Kunden oder Kollegen des Arbeitgebers könnte als Konkurrenz gelten. Das betrifft **auch die Direktansprache im Westnetz-Gebiet**.
4. **Betriebsgeheimnisse und Kundendaten:** Keine Fotos, Kundendaten oder interne Unterlagen des Arbeitgebers für Regelwerk, Tests oder Marketing nutzen. Fachwissen im Kopf ist eine andere Sache als interne Dokumente.
5. **Steuer/Gewerbe:** Nebenberufliche Selbstständigkeit anmelden, Gewerbeanmeldung, Kleinunternehmerregel, Steuerberater für Haftung und Rechtsform (z. B. UG) – **⚖ Steuerberater**.

**Empfehlung:** Arbeitsvertrag und Tarifvertrag selbst einmal auf „Nebentätigkeit“, „Wettbewerb“, „Erfindungen/Urheberrechte“ durchlesen und die Fragen oben **vor dem Livegang** in einer Erstberatung stellen. Nicht vor den Gesprächen blockieren, aber **vor dem ersten Euro Umsatz** klären.

## 5. Realistischer Schutz durch Tempo
Rechtlicher Schutz bleibt lückenhaft, die Idee ist nicht schützbar. Was wirklich trägt:
- **Vorsprung:** Wer als Erster mit 15 Betrieben gesprochen und 20 echte Fälle erfasst hat, hat Wissen, das ein Nachbauer nicht hat. → [[Validierung & Go-No-Go]]
- **Netzwerk:** Der direkte Zugang zu Kollegen und Innung ([[Direktansprache]]) ist nicht kopierbar.
- **Falldaten:** Jeder erfasste Fall mit der tatsächlichen Entscheidung verbessert Trefferquote und Regelwerk. Diese Daten liegen nur auf dem Server und sind der eigentliche Schutzwall.
- **Pflege:** Das Regelwerk veraltet (neue TAB, [[Regelwerk R01–R26]] R07, R09, R11, R19 offen). Wer es aktuell hält, bleibt vorn.
- **Marke und Ruf:** „Zählerklar“ wird erst durch Nutzung und Empfehlungen wertvoll.

## 6. Priorisierte Maßnahmenliste
Sortiert nach Wirkung pro Aufwand und passend zu „erst verkaufen, dann bauen“. Die ersten drei kosten nichts und stören die Gespräche nicht.
| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | Repos privat prüfen, App **nicht** öffentlich ohne Login hosten | 0 € | 10 Min. | sofort |
| 2 | Arbeitsvertrag lesen (Nebentätigkeit, Wettbewerb, Erfindungen), Fragen aus Abschnitt 4 notieren | 0 € | 1 Std. | vor Livegang |
| 3 | Urheberhinweis im Code | 0 € | 5 Min. | sofort |
| 4 | NDA-Vorlage für Tester + Nutzungsbedingungen entwerfen | 0 € Entwurf | 2–3 Std. | vor Mittesten durch Kollegen |
| 5 | Erstberatung Anwalt (Arbeitgeber-Frage, NDA/AGB, Marke) | ca. 150–500 € | 1–2 Std. | nach den ersten Signalen, vor Livegang |
| 6 | Login statt Zugangscode | 0 € (Supabase Free) | 1–2 Tage | vor Kollegen-Test (bereits geplant) |
| 7 | **Regelwerk serverseitig** (Edge Function `/bewerte`) | 0 € | 1–2 Tage | vor öffentlichem Livegang, nach Go-Signalen |
| 8 | Markenrecherche DPMA, dann Anmeldung (Klassen 9, 42) | ca. 290 € | 1–2 Std. + Wartezeit | nach Go, wenn der Name bleibt |
| 9 | Patent / Gebrauchsmuster | mehrere tausend € | – | **nicht empfohlen** |

Aus dieser Liste sind Aufgaben in [[Aufgaben]] („Als Nächstes“) entstanden (siehe Sitzung [[2026-11-15 Nachtschicht]]).
