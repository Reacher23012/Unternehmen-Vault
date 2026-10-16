---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
erstellt: 2026-10-16
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App (Zählerklar)

> **Wichtig:** Das ist eine Analyse aus allgemeinem Wissen, **keine Rechtsberatung**. Alles mit ⚖️ ist unsicher und sollte ein Anwalt prüfen. Beträge sind Größenordnungen aus dem Gedächtnis, vor Bezahlung aktuell nachsehen.

**Kurzfassung:** Die bloße Idee ist nicht schützbar. Schützbar sind Code (automatisch), Name (Marke, ca. 300 €) und das Regelwerk **nur als Geschäftsgeheimnis und nur, wenn man es wirklich geheim hält**. Aktuell liegt das ganze Regelwerk im App-Bundle beim Nutzer – das ist der größte konkrete Hebel. Den größten *echten* Schutz bietet aber ohnehin Tempo, Netzwerk und Fallbestand (→ Abschnitt 5). Die wichtigste ungeklärte Frage ist der **Arbeitgeber** (Abschnitt 4).

## 1. Was ist in Deutschland schützbar?
| Was | Schutz | Kosten / Aufwand | Einschätzung |
|---|---|---|---|
| **Idee / Konzept** („Foto → Regelwerk → Maßnahmenliste“) | keiner. Ideen sind frei. | – | Nachbauen darf jeder, der sie selbst hat. |
| **Quellcode** | Urheberrecht (§§ 69a ff. UrhG), entsteht automatisch | 0 € | Schützt nur gegen *Kopieren* des Codes, nicht gegen Nachbau mit eigenem Code. Gehört das Programm dem Entwickler? → Abschnitt 4 (⚖️ § 69b UrhG). |
| **Name „Zählerklar“** | Marke beim DPMA, Klassen 9 und 42 | grob 290 € Anmeldung (bis 3 Klassen), 10 Jahre; Recherche vorher Pflicht ⚖️ | Lohnt erst nach Go. Vorher nur Recherche (Aufgabe steht schon, [[ADR-0006 Produktname Zählerklar]]). Domain `zaehlerklar.de` per DENIC sichern ist dringender und billiger. |
| **Regelwerk R01–R26 (Inhalt)** | Geschäftsgeheimnis nach GeschGehG, **nur mit „angemessenen Geheimhaltungsmaßnahmen“** (§ 2 Nr. 1 GeschGehG) | Aufwand für Maßnahmen, s. u. | Das Regelwerk ist aber *abgeleitet aus öffentlichen/halböffentlichen Quellen* (BDEW-TAB, Westnetz-TAB, DIN-/VDE-Fundstellen). Geheim ist höchstens die **Auswahl, Verknüpfung und Gewichtung** (Bedingungslogik, „Worst-Case“-Logik). ⚖️ Ob das als Geschäftsgeheimnis trägt, ist offen. |
| **Datenbank / Zusammenstellung** | evtl. Datenbankschutz (§ 87a UrhG) | 0 € | ⚖️ unsicher, bei 26 Regeln eher nicht „wesentliche Investition“. Nicht darauf bauen. |
| **Patent / Gebrauchsmuster** | Computerprogramme „als solche“ sind ausgeschlossen (§ 1 Abs. 3 PatG, § 1 Abs. 3 GebrMG) | Patent: mehrere tausend € mit Anwalt | Praktisch irrelevant für diese App. Nicht verfolgen. |
| **Fallbestand (Fotos + korrigierte Entscheidungen)** | Geschäftsgeheimnis (sofern geheim), faktischer Vorsprung | Login, Zugriffsbeschränkung | Das wertvollste Gut langfristig → Abschnitt 5. Datenschutz beachten ([[Rechtliches]]). |

**Gegenrichtung (auch wichtig):** Dem Regelwerk liegen Unterlagen zugrunde, die *Dritten* gehören (BDEW-Musterwortlaut, Westnetz-Schulung 09/2025). Nur Fundstellen und eigene Formulierungen verwenden, keine Normtexte oder Folien übernehmen (steht schon in [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]). ⚖️ Nutzungsbedingungen der Westnetz-Schulung prüfen lassen, bevor das Regelwerk kommerziell wird.

## 2. Technischer Befund: Das Regelwerk liegt im Browser
**Geprüft im Code** (`zaehlerschrank-check`, 16.10.2026):
- `web/src/regeln.json` (ca. 14 KB: ID, Name, Bedingung, Maßnahme, Stufe, Fundstelle, Geltung, Status je Regel) wird in `web/src/regelwerk.ts` importiert; dort steht auch die gesamte Auslöse-Logik (`ausgeloesteRegeln`, `schlimmsterFall`, `bewerte`).
- `main.ts` und `demo.ts` rufen `bewerte` **im Browser** auf. Die Edge Function (`supabase/functions/api/index.ts`) enthält kein Regelwerk, sie macht nur Fotoanalyse und Fall-Speicher.
- Folge: Wer die App (oder die Demo-HTML) öffnet, kann mit F12 / „Quelltext anzeigen“ **das komplette Regelwerk samt Logik lesen und kopieren**. Auch eine Minifizierung ändert daran nichts Wesentliches.
- Heute ist das **Risiko noch klein**, weil die App nirgends öffentlich liegt (Zugangscode, noch kein Netlify). Es wird real, sobald Kollegen testen oder die App online geht.
- Rechtlich verschärft sich das: Wer ein Geheimnis ungeschützt jedem Nutzer ausliefert, hat es kaum noch „angemessen geschützt“ (⚖️). Außerdem erlaubt das GeschGehG ausdrücklich **Reverse Engineering** eines öffentlich verfügbar gemachten Produkts (§ 3 Abs. 1 Nr. 2), *es sei denn*, ein Vertrag verbietet es. Ohne Nutzungsbedingungen ist das Regelwerk also praktisch ungeschützt.

**Risikobewertung (ehrlich):**
- Wer das Regelwerk klaut, bekommt 26 Regeln, die ein Fachmann aus TAB und Schulungsunterlagen auch selbst herleiten kann. Der Wert liegt eher in der **Zeitersparnis und Qualität**, nicht in einem unauffindbaren Geheimnis. Das Risiko ist **mittel**, nicht kritisch.
- Aber: Die Gegenmaßnahme ist billig, wenn sie *vor* dem Livegang kommt, und teuer, wenn später Nutzer eine Offline-Funktion gewohnt sind.

**Lösungsskizze „Regelwerk serverseitig“:**
1. Neue Route `POST /bewerten` in der Edge Function: Eingaben (Schrank-Felder + Vorhaben) → Ergebnis (Ampel, Maßnahmen mit Fundstelle, „Vor Ort klären“, Hinweise, Messkonzept).
2. `regelwerk.ts` + `regeln.json` wandern nach `supabase/functions/api/` (oder `_shared/`); aus `web/` werden sie entfernt. `web/` bekommt nur noch Typen für das Ergebnis.
3. Die App zeigt nur das Ergebnis; die Bedingungstexte aller *nicht* ausgelösten Regeln erscheinen nirgends im Client.
4. Tests wandern mit (deno test oder vitest über gemeinsamen Pfad); die 13 bestehenden Tests müssen identisch grün bleiben (Excel-Beispielzeile).
5. Zugriff nur mit Login (siehe 3.). Pro Konto Rate-Limit, damit niemand das Regelwerk durch Massenabfragen „abschöpft“ (Eingabekombinationen systematisch durchprobieren).
- **Preis:** Ohne Netz kein Ergebnis (heute läuft die App im Lokalmodus). Auf der Baustelle ohne Funk ist das ein Nachteil → Fälle lokal zwischenspeichern und später bewerten lassen (die App speichert schon lokal und sendet nach, siehe [[App & Technik]]). Das passt zu „Offline-Modus erst nach Go“.
- **Restrisiko bleibt:** Durch systematisches Abfragen lässt sich die Logik grob rekonstruieren. Das ist aufwendig und über Login + Rate-Limit + Nutzungsbedingungen angreifbar.
- **Demo:** Das claude.ai-Demo-Artifact enthält das Regelwerk ebenfalls (clientseitig, `build:demo`). Es ist privat; **nicht öffentlich teilen**, solange es das Regelwerk enthält, oder eine abgespeckte Demo mit festen Beispielergebnissen bauen.

## 3. Verträge und Zugang
| Maßnahme | Zweck | Aufwand |
|---|---|---|
| **Login statt Zugangscode** (steht schon unter „Irgendwann“) | wer rein darf, ist nachvollziehbar; Konto kann gesperrt werden | mittel (Supabase Auth) – wird durch Schutz *und* durch Datenschutz wichtiger |
| **Nutzungsbedingungen / AGB-Light** (kein Kopieren, kein Reverse Engineering, kein Scraping, Nutzung nur für eigene Aufträge, keine Weitergabe des Zugangs) | macht Reverse Engineering vertraglich verboten (sonst nach § 3 GeschGehG erlaubt) | Entwurf Generator/Anwalt; ⚖️ AGB-Recht (B2B) prüfen lassen |
| **Geheimhaltungsvereinbarung (NDA) für Tester/Kollegen** | Mitteltester sehen die App; ein NDA erfüllt „angemessene Maßnahme“ | Einseitige Kurz-NDA, 1 Seite. ⚖️ Anwalt einmal Vorlage prüfen lassen (ca. 150–300 €) |
| **Nicht zeigen, was nicht sein muss** | Beim Gespräch nur Ergebnis-Screenshots, nicht das Regelwerk-Dokument | 0 € |
| **Regelwerk-Doku im Vault** | Vault-Repo ist privat (prüfen!), enthält [[Regelwerk R01–R26]] und die Excel-Datei | 5 Min: GitHub-Sichtbarkeit beider Repos kontrollieren |

**Realistisch:** Ein NDA mit Kollegen bringt rechtlich etwas, aber in der Praxis kaum Durchsetzbarkeit gegen einen Kollegen im selben Gebiet. Er signalisiert vor allem „das ist mir ernst“. Nicht überbewerten.

## 4. Arbeitgeber-Frage (offen – Anwalt / Steuerberater)
Vorab: Ich weiß aus dem Vault **nicht**, ob du angestellt bist ([[Mein Vorteil]] ist unbestätigt). [[Geldmodelle für KI-Ideen]] und [[Einschätzung Handwerks-Apps als Nebeneinkommen]] erwähnen die Frage nur. Folgendes gilt *falls* ja:
- **Programm (Code):** Schafft ein Arbeitnehmer ein Programm *in Wahrnehmung seiner Aufgaben oder nach Anweisung* des Arbeitgebers, stehen die wirtschaftlichen Nutzungsrechte dem Arbeitgeber zu (§ 69b UrhG). Ein Elektriker, dessen Aufgabe nicht die Softwareentwicklung ist und der privat in der Freizeit codiert, ist normalerweise **nicht** betroffen. ⚖️ Grenzfälle: Arbeitsmittel, Arbeitszeit, Betriebsdaten oder Fotos von Kundenschränken des Arbeitgebers nutzen.
- **Arbeitnehmererfindung:** Das ArbnErfG betrifft patent-/gebrauchsmusterfähige Erfindungen, bei Software kaum relevant. Ebenfalls ⚖️.
- **Wettbewerbsverbot:** Während eines bestehenden Arbeitsverhältnisses darf man dem Arbeitgeber grundsätzlich keine Konkurrenz machen (Treuepflicht, bei kaufmännischen Angestellten § 60 HGB). Eine App für **Konkurrenzbetriebe** des Arbeitgebers im selben Gebiet kann Streit auslösen. ⚖️
- **Nebentätigkeit:** Viele Arbeitsverträge verlangen Anzeige oder Genehmigung, auch bei Selbstständigkeit nebenbei. Prüfen: Arbeitsvertrag, Tarifvertrag.
- **Betriebsgeheimnisse des Arbeitgebers:** Kundendaten, interne Preislisten, Fotos von Kundenschränken *nicht* ungefragt verwenden. Für die 20 Echt-Schränke: nur eigene/freigegebene Fälle, ohne Adresse und Namen.
- **Praktischer Schutz:** Ein kurzes, schriftliches „Ich entwickle privat eine App, die deinen Betrieb nicht konkurrenziert“ vom Arbeitgeber kann viel Streit sparen – oder auch erst einen auslösen. Das ist eine strategische Entscheidung.
- **Offene Fragen für Anwalt/Steuerberater:** (1) Gehört mir die App, auch wenn das Fachwissen aus dem Beruf stammt? (2) Brauche ich eine Genehmigung? (3) Gewerbeanmeldung und Steuern für die Nebentätigkeit. (4) Habe ich Konkurrenzschutzpflichten?

## 5. Realistischer Schutz: Tempo, Netzwerk, Daten
Gegen einen gleich fähigen Nachahmer schützen Paragrafen wenig. Was wirklich trägt:
1. **Vorsprung:** Das Regelwerk steht, ein Wettbewerber braucht Wochen bis Monate, um Fachwissen und Belege aufzubauen. Dieser Vorsprung zählt nur, wenn schnell validiert wird – das ist Aufgabe Nummer 1 ([[Validierung & Go-No-Go]]).
2. **Netzwerk:** Kollegen, Innung, Großhändler ([[Direktansprache]]). Wer als Erster in der Region bekannt ist, wird empfohlen.
3. **Fallbestand:** Jeder echte Fall mit „tatsächlicher Entscheidung“ verbessert die Trefferquote. Das lässt sich nicht kopieren – es liegt nur auf dem eigenen Server.
4. **Pflege:** Regeln ändern sich (neue Westnetz-TAB 2026). Wer aktuell bleibt, ist besser als eine Kopie von gestern.
5. **Marke / Vertrauen:** Der Name „Zählerklar“ und ein Ruf für Verlässlichkeit.

**Empfehlung:** Nicht zu viel Zeit in Abschirmung stecken, bevor ein Kunde zahlt. Tun, was billig ist (Serverseite, Login, Nutzungsbedingungen, NDA), alles andere nach Go.

## 6. Priorisierte Maßnahmen
| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | **Arbeitsvertrag lesen** (Nebentätigkeit, Wettbewerb, Erfindungen) und Anwalt/Steuerberater die Fragen aus Abschnitt 4 stellen (Erstberatung) | ca. 100–250 € ⚖️ | 1–2 h + Termin | **vor dem ersten externen Test**, wenn angestellt |
| 2 | GitHub-Sichtbarkeit von `zaehlerschrank-check` und `unternehmen-vault` auf *privat* prüfen | 0 € | 5 Min | sofort |
| 3 | Demo-Artifact nicht öffentlich teilen; Gespräche ohne Regelwerk-Dokument | 0 € | – | laufend |
| 4 | Kurz-NDA (1 Seite) für Mittester, Vorlage einmal prüfen lassen | 0–300 € | 1 h | vor Mittesten |
| 5 | **Code: Regelwerk serverseitig** (Abschnitt 2) | 0 € | ca. 1–2 Tage | vor Livegang / Kollegen-Test |
| 6 | **Login statt Zugangscode** (+ Rate-Limit) | 0 € | ca. 1–2 Tage | vor Kollegen-Test |
| 7 | Nutzungsbedingungen (B2B), Datenschutzhinweis in der App | 0–400 € ⚖️ | 2–3 h + Prüfung | vor Livegang |
| 8 | Domain `zaehlerklar.de` sichern | ca. 1 €/Monat | 10 Min | sofort (Aufgabe steht) |
| 9 | DPMA-Markenrecherche (Klassen 9, 42) | 0 € | 30 Min | vor Druck |
| 10 | Markenanmeldung | ca. 290 € ⚖️ | 1 h | erst nach Go |
| – | Patent / Gebrauchsmuster | – | – | **nicht verfolgen** |

## Offen / Annahmen
- Annahmen: Du bist Elektriker (angestellt oder selbstständig – unbekannt), das Regelwerk ist deine eigene Arbeit aus öffentlichen Quellen.
- Kosten sind grobe Schätzungen ohne Gewähr.
- Alles ⚖️ ist ungeprüft.
