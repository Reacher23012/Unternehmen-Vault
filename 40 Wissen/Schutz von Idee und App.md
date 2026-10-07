---
typ: wissen
thema: schutz
projekt: "[[Zählerschrank-Check]]"
erstellt: 2026-10-07
status: entwurf – Analyse, keine Rechtsberatung; mit „→ Anwalt“ markierte Punkte prüfen lassen
---
# Schutz von Idee und App („Zählerklar“)

> **Keine Rechtsberatung.** Das ist eine Sortierung der Fragen und eine technische Bewertung (Nachtschicht 07.10.2026, ohne Zugriff auf Verträge, Anwalt oder Rechtsdatenbanken). Alles, was als **→ Anwalt** markiert ist, ist unsicher oder hängt vom Einzelfall ab. Preise sind grobe Größenordnungen aus dem Gedächtnis und vor Entscheidung zu prüfen.

**Kurzfazit**
1. Die **Idee** ist nicht schützbar. Geschützt werden können Code (automatisch, Urheberrecht), der **Name** (Marke) und das **Regelwerk als Geschäftsgeheimnis** – aber nur, wenn man es wirklich geheim hält.
2. **Technischer Befund: Das Regelwerk liegt heute komplett im Browser jedes Nutzers.** Das ist der größte konkrete Schwachpunkt und ist lösbar (Abschnitt 2).
3. Das Regelwerk ist ehrlich betrachtet **kein Staatsgeheimnis**: Es stützt sich auf öffentliche Quellen (TAB, BDEW-Musterwortlaut) und jede Antwort der App zeigt dem Nutzer ja die greifenden Regeln samt Fundstelle. Der Vorsprung liegt in Aufbereitung, Fachurteil, Tempo und echten Falldaten (Abschnitt 5).
4. **Offene Frage vor allem anderen: Gehört die Idee (teilweise) dem Arbeitgeber?** (Abschnitt 4) – eine Anwaltsfrage, bevor Geld in Marke oder Marketing fließt.

## 1. Was ist in Deutschland überhaupt schützbar?
| Gegenstand | Schutz | Wie / Kosten (grob) | Einschätzung |
|---|---|---|---|
| **Die Idee** („Foto → Einordnung Zählerplatz“) | keiner. Ideen, Konzepte, Methoden sind frei; auch das Urheberrecht schützt bei Software Ideen und Grundsätze ausdrücklich nicht (§ 69a Abs. 2 UrhG) | – | Jeder darf dieselbe Idee bauen. Schutz kommt nur über Tempo und Daten. |
| **Quellcode** (App, Edge Function, Landingpage) | Urheberrecht (§§ 69a ff. UrhG), entsteht automatisch, keine Anmeldung | 0 €. Nachweis: Git-Historie mit Datum, privates Repo | Schützt vor Kopieren des Codes, **nicht** vor Nachbau mit eigenem Code. Texte, Grafiken, Flyer sind ebenfalls urheberrechtlich geschützt. |
| **Name „Zählerklar“ / Logo** | **Marke** (DPMA) oder Benutzungsmarke; ohne Anmeldung nur schwacher Schutz | DPMA-Anmeldung online ca. 290 € für bis zu 3 Klassen (Klassen 9 und 42 laut [[ADR-0006 Produktname Zählerklar]]), Schutz 10 Jahre, Verlängerung ca. 750 € (→ Gebührenstand beim DPMA prüfen). Recherche im DPMAregister kostenlos | Wichtig vor Druck/Livegang: erst **Recherche** (ähnliche Marken, auch Klang), sonst riskiert man eine Abmahnung gegen sich selbst. Rein beschreibende Namen werden abgelehnt – „Zählerklar“ ist eher unproblematisch, aber → Anwalt bei Zweifel. Domain `zaehlerklar.de` ist kein Markenschutz. |
| **Regelwerk R01–R26 / Know-how** | **Geschäftsgeheimnis** nach Geschäftsgeheimnisgesetz (GeschGehG). Voraussetzung (§ 2 Nr. 1): nicht allgemein bekannt, wirtschaftlicher Wert **und „angemessene Geheimhaltungsmaßnahmen“** | 0 € Gesetz, Aufwand = Maßnahmen (Abschnitte 2 und 3) | Nur schützbar, wenn man ihn auch behandelt wie ein Geheimnis. Ein Regelwerk, das ungeschützt im Browser-Bundle liegt, wird vor Gericht schwer als „angemessen geschützt“ zu verteidigen sein (→ Anwalt). Reverse Engineering eines **öffentlich verfügbaren Produkts** ist nach dem Gesetz erlaubt, **sofern kein vertragliches Verbot** besteht (§ 3 GeschGehG) – daher die Nutzungsbedingungen (Abschnitt 3). |
| **Patent / Gebrauchsmuster** | Computerprogramme „als solche“ und Geschäftsmethoden sind nicht patentfähig (§ 1 Abs. 3 PatG); Verfahren sind nicht gebrauchsmusterfähig | Patentanmeldung vierstellig bis fünfstellig mit Patentanwalt | **Praktisch kein Weg** für ein regelbasiertes Bewertungswerkzeug; Aufwand und Offenlegung stehen in keinem Verhältnis. Nur → Patentanwalt, falls ein echter technischer Beitrag (z. B. neuartige Bildverarbeitung) entsteht – derzeit nicht der Fall: Die Erkennung macht Claude, das Regelwerk ist Fachlogik. |
| **Fremde Quellen** (TAB, BDEW-Musterwortlaut, Westnetz-Schulung) | gehören den Herausgebern, urheberrechtlich geschützt | – | Bleibt bei der Regel aus [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]: **nur Fundstellen, keine Normtexte kopieren.** Das schützt auch uns. Schulungsunterlagen (Westnetz 09/2025): Nutzungsbedingungen der Teilnahme prüfen → Anwalt. |

## 2. Technischer Befund: Regelwerk liegt im Browser
**Befund (am Code geprüft, 07.10.2026):**
- `web/src/regelwerk.ts` enthält die komplette Auswertungslogik (alle 26 Bedingungen als Code, inkl. Schwellen wie 4,2 kW, 4,6 kW, 25 kW, 30 kW, 50 A).
- Dieselbe Datei importiert `web/src/regeln.json` (Name, Bedingung, Maßnahme, Fundstelle, Geltung, Status je Regel; ca. 14 KB).
- `main.ts` und `demo.ts` rufen `bewerte()` **im Browser** auf; `vite build` bündelt beides ins ausgelieferte JavaScript. Es gibt keinen Serveraufruf für die Auswertung (die Edge Function macht nur Fotoanalyse und Fall-Speicher).
- **Folge:** Wer die App-Adresse kennt, kann Logik und Texte komplett herunterladen (Entwicklertools → Quellen). **Auch ohne Zugangscode:** Der `APP_CODE` schützt nur die Edge Function, nicht die statischen Dateien. Sobald die App öffentlich auf Netlify liegt ([[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]]), ist das Regelwerk öffentlich. Dasselbe gilt für die privaten claude.ai-Demos (Link-Inhaber sehen alles) und jeden lokalen Build, den man weitergibt.
- Minimierung/Obfuscation hilft kaum: Die Regel-Texte stehen lesbar in der JSON, die Logik ist knapp.

**Risiko-Bewertung (ehrlich):**
- *Wahrscheinlichkeit, dass jemand es sich holt:* heute gering (kein Publikum, 4 Tester). Steigt mit jedem öffentlichen Livegang und mit jedem Kollegen, der einen Konkurrenzbetrieb oder Software-Anbieter kennt.
- *Schaden:* mittel. Der Wert ist die Aufbereitung (26 geprüfte Regeln, Fundstellen), nicht ein unauffindbares Wissen. Ein Nachbau wäre mit Zeit auch aus TAB/BDEW-Texten möglich. Aber: Man schenkt dem Nachbauer Monate Arbeit **und** verliert die Möglichkeit, sich auf das Geschäftsgeheimnis zu berufen.
- *Auch serverseitig bleibt ein Rest:* Wer die App benutzt, sieht pro Fall die greifenden Regeln samt Fundstelle. Mit vielen systematischen Eingaben lässt sich das Regelwerk **durch Ausprobieren rekonstruieren** („Black-Box-Abfrage“). Das ist aufwendig, wird aber durch Login, Limit je Konto und Nutzungsbedingungen (kein systematisches Auslesen) deutlich unattraktiver.

**Lösungsskizze: Regelauswertung in die Edge Function** (Aufgabe unten):
1. Neue Route `POST /bewerten` in `supabase/functions/api`: Body = `Eingaben` (wie heute in `modell.ts`), Antwort = nur `{ ergebnis, ergebnisSchlimmstenfalls, messkonzept, regeln: [{id, name, massnahme, stufe, fundstelle}], offen: [...] }` – also nur das, was für **diesen Fall** greift. Die Bedingungs-Texte (`bedingung`) und die nicht greifenden Regeln verlassen den Server nie.
2. Regelwerk (`regelwerk.ts`, `regeln.json`) zieht in den Serverbereich um (z. B. `supabase/functions/_shared/`), aus `web/src/` verschwinden Logik und JSON. Die Tests (`regelwerk.test.ts`, Excel-Beispielzeile) laufen weiter und importieren aus dem neuen Ort (Import-Pfad und Deno-Kompatibilität der `.ts`-Datei prüfen).
3. App ruft `/bewerten` mit `x-app-code`; `demo.ts` (Demo-Artifact) bekommt **feste Beispielergebnisse** statt der echten Logik, damit auch die Demo nichts verrät.
4. Der gleiche Zugangscode/Login schützt Auswertung und Fall-Speicher; ein Limit je Konto (Aufrufe pro Stunde) gegen Black-Box-Abfragen, am besten zusammen mit „Login statt Zugangscode“.
5. **Kosten/Nachteile:** Die App funktioniert nicht mehr komplett offline (Auswertung braucht Netz; Fotoanalyse brauchte es schon). Zusätzliche Funktionsaufrufe im kostenlosen Supabase-Tarif sind bei Einzelnutzung vernachlässigbar. Aufwand grob 0,5–1 Tag.
6. **Reihenfolge-Warnung:** Das ist Infrastruktur. Nach Regel „Erst verkaufen, dann bauen“ ([[Ideen-System]]) nicht vor die Gespräche ziehen. Sinnvoller Zeitpunkt: **bevor die App öffentlich oder für fremde Nutzer erreichbar ist**, nicht früher. Bis dahin Tester nur über den persönlichen Kontakt, kein öffentlicher Link, keine Weitergabe von Build-Dateien.

Außerdem prüfen: Das **GitHub-Repo `zaehlerschrank-check` muss privat sein** (sonst liegt das Regelwerk ohnehin offen im Quelltext) – Sichtbarkeit in den Repo-Einstellungen kontrollieren. Der Excel-Entscheidungsbaum ([[Entscheidungsbaum Excel]]) enthält denselben Inhalt und gehört nicht in öffentliche Ordner.

## 3. Verträge und Zugang
| Baustein | Zweck | Umsetzung |
|---|---|---|
| **NDA/Geheimhaltung** für Tester und Kollegen mit App-Zugang | belegt „angemessene Geheimhaltungsmaßnahmen“ und verbietet Weitergabe | Einseitige, kurze Vereinbarung (1 Seite: Gegenstand, kein Teilen von Zugang/Screenshots der Regelliste, Laufzeit, Rückgabe). Vorlage vom Anwalt/Kammer, **nicht selbst formulieren** → Anwalt. Für ein lockeres Kollegen-Gespräch genügt zunächst eine **schriftliche Nachricht mit ausdrücklichem Einverständnis** (WhatsApp), kein Ersatz für ein NDA, aber besser als nichts. Nicht jeden Kollegen mit NDA abschrecken: Für reine Gespräche ohne App-Zugang ist keines nötig – dort einfach nichts Internes zeigen. |
| **Nutzungsbedingungen (AGB light)** | vertragliches Verbot von Kopieren, systematischem Auslesen, Reverse Engineering, Weitergabe des Zugangs | Pflicht vor jedem Betrieb mit Fremden; bei Verbrauchern/Unternehmern AGB-Recht beachten → Anwalt. Beim ersten Login bestätigen lassen (Häkchen, Version und Zeitpunkt speichern). |
| **Zugang nur mit Login** | nur identifizierte Nutzer sehen Ergebnisse; Konto sperrbar, Missbrauch zuordenbar | „Login statt Zugangscode“ ist schon als Aufgabe vorhanden ([[Aufgaben]] → Irgendwann). Ein gemeinsamer `APP_CODE` taugt nur für einen Nutzer: Jeder, der ihn weitergibt, ist anonym. Supabase Auth reicht (E-Mail-Link). |
| **Datenschutz-/AV-Verträge** | gehören zum Betrieb, nicht zum Diebstahlschutz | siehe [[Rechtliches]] |
| **Haftungs-/Hinweistext** | „Ersteinschätzung, ersetzt keine Prüfung durch die Elektrofachkraft“ | steht teils in Impressum/FAQ, in App-Nutzungsbedingungen aufnehmen |

## 4. Arbeitgeber-Frage (offen → Anwalt/Steuerberater)
**Ausgangslage (aus dem Vault):** Das Regelwerk speist sich aus Fachwissen und Unterlagen aus dem Elektrohandwerk (u. a. Westnetz-Schulung 09/2025, TAB-Praxis). Ob und wie die Tätigkeit als Angestellter oder im eigenen Betrieb stattfindet, steht im Vault **nicht** eindeutig (das Impressum nennt eine Person in Anröchte; der Satz „nur falls Seite zum Handwerksbetrieb gehört“ in [[Rechtliches]] ist offen). Die folgenden Fragen sind deshalb **Fragen, keine Antworten:**
1. **Wem gehört der Code?** Programme, die ein Arbeitnehmer in Wahrnehmung seiner Aufgaben oder nach Anweisung des Arbeitgebers schafft, stehen dem Arbeitgeber zu (§ 69b UrhG). Außerhalb der Arbeitszeit und ohne Bezug zur Aufgabe ist es grundsätzlich anders – aber die Abgrenzung (Nutzung von Firmenwissen, Firmenzeit, Firmenrechner, Aufgabenbezug) ist Einzelfall → Anwalt.
2. **Wem gehört das Wissen/Regelwerk?** Allgemeines Berufswissen darf jeder mitnehmen; **betriebsinterne Unterlagen, Kundenfälle, Preise, Schulungsunterlagen des Arbeitgebers** nicht ohne Weiteres. Die Fälle in der App dürfen keine Kundendaten des Arbeitgebers sein. → Quellen im Regelwerk auf „öffentlich/selbst erarbeitet“ prüfen.
3. **Arbeitnehmererfindungsgesetz:** gilt für patent-/gebrauchsmusterfähige Erfindungen (Abschnitt 1: hier unwahrscheinlich), und für „technische Verbesserungsvorschläge“ eingeschränkt → Anwalt, falls doch relevant.
4. **Nebentätigkeit:** Arbeitsvertrag/Tarifvertrag prüfen: Anzeige- oder Genehmigungspflicht für Nebentätigkeiten? Oft nur genehmigungspflichtig, wenn sie den Arbeitgeber beeinträchtigt.
5. **Wettbewerb:** Während des Arbeitsverhältnisses gilt eine Treuepflicht; ein Produkt, das **die Kunden des Arbeitgebers** (Elektrobetriebe, Wettbewerber des Arbeitgebers) anspricht, kann als Konkurrenztätigkeit gelten. Das ist **der heikelste Punkt**, wenn die Zielgruppe „Kollegen/Elektrobetriebe“ ist, und hängt vom Vertrag ab → Anwalt vor dem Livegang.
6. **Nachvertragliches Wettbewerbsverbot / Verschwiegenheitsklauseln** im Arbeitsvertrag prüfen.
7. **Steuer:** Gewerbeanmeldung/Kleinunternehmer, Einkünfte aus Nebentätigkeit → Steuerberater (Erstgespräch).
**Praktisch:** Arbeitsvertrag + Tarifvertrag + Schulungsunterlagen heraussuchen und **vor dem öffentlichen Livegang** einen Termin machen (Erstberatung für Verbraucher ist gesetzlich gedeckelt, ca. 190 € netto – Stand prüfen; manche Kammern/Verbände beraten Mitglieder kostenlos). Bis dahin: **keine** Firmenunterlagen, Kundendaten oder Firmen-Fotos in Regelwerk, Tests oder Marketing; die Gespräche mit Kollegen laufen weiter (reine Marktforschung).

## 5. Realistischer Schutz: Tempo, Netzwerk, Daten
Rechtlicher Schutz ist hier schwach bis mittel; der echte Burggraben ist:
- **Vorsprung in der Zeit:** Wer zuerst bei 20 realen Schränken die Trefferquote belegt und die ersten zahlenden Betriebe hat, ist schwer einzuholen. Deshalb ist die Reihenfolge der Gespräche richtig ([[Validierung & Go-No-Go]]).
- **Netzwerk und Vertrauen:** Direktzugang zu Kollegen, Innung, Großhändler ([[Direktansprache]], [[Mein Vorteil]]). Das kann ein Software-Anbieter nicht kopieren.
- **Falldaten:** Jeder erfasste Fall (Foto + Entscheidung des Elektrikers) ist ein Datensatz, den ein Nachbauer nicht hat. Das ist der eigentliche Schatz – und verlangt Einwilligung der Nutzer (Datenschutz), saubere Auswahl und Schutz der Datenbank (Zugriff nur über die Funktion, bereits so umgesetzt).
- **Pflege des Regelwerks:** Netzbetreiber/TAB ändern sich (z. B. Westnetz-TAB nach BDEW 2026 → [[Aufgaben]]). Ein gepflegtes Regelwerk mit Aktualisierungs-Rhythmus ist ein Abo-Argument, das ein einmaliger Nachbau nicht liefert.
- **Marke und Domain** als Kennzeichen („Zählerklar“ steht für das Original).
- **Ehrlicher Gegenpol:** Wenn das Regelwerk irgendwann als Schulung/Checkliste verkauft wird (Fallback), ist es ohnehin Inhalt, der geteilt wird – dort schützt das Urheberrecht am Text, nicht das Geheimnis.

## 6. Priorisierte Maßnahmenliste
| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | **Repo-Sichtbarkeit prüfen** (privat) und Zugang zu Excel, Demo-Artifact, Builds begrenzen; keine Dateien an Dritte geben | 0 € | 10 Min. | jetzt |
| 2 | **Arbeitgeber-Frage klären:** Verträge sichten, Anwalt/Kammer-Termin (Abschnitt 4) | 0–ca. 200 € (Erstberatung) | 1–2 h | **vor** öffentlichem Livegang; sinnvoll nach den ersten Gesprächen, aber vor Instagram/Netlify |
| 3 | Schriftliches Einverständnis/Geheimhaltung (kurz) für die 4 Tester | 0 € (Nachricht) bis NDA vom Anwalt | 30 Min. | vor Aushändigen des Zugangs |
| 4 | **Marken-Recherche DPMAregister**, dann Entscheidung zur Anmeldung (Klassen 9, 42) | Recherche 0 €; Anmeldung ca. 290 € | 1 h + Anmeldung 30 Min. | vor Druck des Flyers/Livegang (hängt an [[ADR-0006 Produktname Zählerklar]]) |
| 5 | **Regelwerk serverseitig** (`/bewerten`, Demo mit festen Beispielen) | 0 € (Zeit) | 0,5–1 Tag Code | vor öffentlichem Hosting der App |
| 6 | **Login statt Zugangscode** + Limit je Konto | 0 € | 1–2 Tage | vor Tests mit Fremden (bereits in „Irgendwann“) |
| 7 | **Nutzungsbedingungen** (Reverse-Engineering-Verbot, Zugang nicht teilen, Ersteinschätzung) inkl. Häkchen beim ersten Login | ca. 0–500 € je nach Anwalt | 0,5 Tag + Anwaltsprüfung | mit Punkt 6 |
| 8 | Git-Historie als Entstehungsnachweis aufbewahren (Backups, Datum) | 0 € | – | laufend |
| 9 | Patent/Gebrauchsmuster | – | – | **nicht verfolgen** (Abschnitt 1) |

## Abgeleitete Aufgaben
Siehe [[Aufgaben]] („Als Nächstes“): Code-Aufgabe „Regelwerk serverseitig“ (für eine spätere Nachtschicht), Arbeitgeber-Frage, Marken-Recherche, Nutzungsbedingungen, Einverständnis der Tester.

Verwandt: [[Ideen-System]], [[Mein Vorteil]], [[Rechtliches]], [[App & Technik]], [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]
