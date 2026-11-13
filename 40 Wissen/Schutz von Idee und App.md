---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
thema: schutz
stand: 2026-11-13
status: entwurf – keine Rechtsberatung, Rechtsfragen vom Anwalt prüfen lassen
---
# Schutz von Idee und App (Zählerklar)

> **Analyse, keine Rechtsberatung.** Alles mit 🔶 ist unsicher und gehört vor einer Entscheidung zu einem Anwalt (Erstberatung, Handwerkskammer-Rechtsberatung oder IHK/HWK-Gründungsberatung). Kostenangaben sind Größenordnungen aus dem Gedächtnis (Stand der Analyse), vor Ausgabe prüfen.

**Kurzfazit:** Die *Idee* ist nicht schützbar, der *Code* und der *Name* sind es. Das *Regelwerk* ist schützbar, aber nur, solange es nicht ungeschützt beim Nutzer liegt – und das tut es heute (siehe Abschnitt 2). Der realistischste Schutz ist Tempo, Netzwerk und Daten aus echten Fällen (Abschnitt 5). Schutzmaßnahmen sind Infrastruktur: Sie ersetzen keine Validierung und stehen hinter den Gesprächen (Abschnitt 6).

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Was es bringt | Kosten / Aufwand |
|---|---|---|---|
| **Idee** („Foto → Ampel nach TAB“) | **keiner.** Ideen, Konzepte und Methoden sind frei | Nachbauen ist erlaubt | – |
| **Quellcode, App** | Urheberrecht (§§ 69a ff. UrhG), entsteht automatisch, keine Anmeldung | schützt vor Kopieren des Codes, nicht vor einer eigenen, ähnlichen App | 0 € |
| **Name „Zählerklar“** | Marke (DPMA, Klassen 9 und 42 laut [[ADR-0006 Produktname Zählerklar]]); Schutz nur durch Eintragung (oder durch Benutzung mit Verkehrsgeltung, schwer zu belegen) | schützt den Namen, nicht die Funktion; verhindert Abmahnung gegen sich selbst nicht ohne Recherche | 🔶 online etwa 290 € für bis zu 3 Klassen, jede weitere ca. 100 €; Schutz 10 Jahre, verlängerbar; Anwalt optional |
| **Regelwerk R01–R26** (Zusammenstellung, Auslegung, Gewichtung) | (a) **Geschäftsgeheimnis** (GeschGehG), (b) evtl. Schutz als Datenbank/Sammlung (§§ 4, 87a ff. UrhG) 🔶 | nur so lange es wirklich geheim ist | 0 € plus Aufwand für Geheimhaltungsmaßnahmen |
| **Normtexte, TAB, Westnetz-Schulung** | gehören den Verfassern (DIN Media, BDEW, Westnetz) | nicht übernehmen; nur Fundstellen (bereits Regel, [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]) | – |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist nicht patentierbar; Gebrauchsmuster schließt Verfahren aus 🔶 | bei dieser Art Regelwerk-App praktisch **nicht realistisch** | Patentanwalt, mehrere tausend € – **nicht empfohlen** |

### Geschäftsgeheimnis im Detail
Nach § 2 Nr. 1 GeschGehG ist nur geschützt, was (1) nicht allgemein bekannt ist, (2) einen wirtschaftlichen Wert wegen der Geheimheit hat und (3) **durch angemessene Geheimhaltungsmaßnahmen** geschützt wird. Fehlt Punkt 3, gibt es keinen Schutz – auch nicht gegen Kopierer. Zusätzlich gilt: **Reverse Engineering eines öffentlich verfügbaren Produkts ist erlaubt** (§ 3 Abs. 1 Nr. 2 GeschGehG), sofern es nicht vertraglich ausgeschlossen wurde 🔶. Ein ausgeliefertes App-Bundle ist so ein Produkt.

Realistisch einschätzen: Die Regeln stützen sich überwiegend auf **öffentliche** Quellen (BDEW-Musterwortlaut TAB, Westnetz-TAB, Normen, deren Fundstellen im Regelwerk stehen). Geheim ist daher nicht der Inhalt, sondern die **Auswahl, Verknüpfung und Auslegung** (welche Bedingung löst welche Maßnahme aus). Das ist wertvoll, aber mit TAB und Fachwissen in einigen Wochen nachbaubar. Der Schutzwert des Regelwerks ist also begrenzt – ehrlicher Befund, auch für den Score (Abschnitt 5).

## 2. Technischer Befund: Das Regelwerk liegt im Browser
**Befund (geprüft am Code, 13.11.2026):**
- `web/src/regeln.json` (ca. 14 KB: Name, Bedingung, Maßnahme, Stufe, **Fundstelle**, Geltung, Status je Regel) wird in `web/src/regelwerk.ts` per `import` eingebunden.
- `regelwerk.ts` enthält zusätzlich die gesamte Auswertungslogik (Tabelle `pruef` mit den Bedingungen R01–R26 in Code, Messkonzept, „schlimmster Fall“).
- `web/src/main.ts` importiert `bewerte` aus `regelwerk.ts`. Die Auswertung läuft **im Browser**. Beim Bauen (`vite build`) landet beides im JavaScript-Bundle der App; ebenso im Demo-Build (`build:demo`).
- Die Edge Function (`supabase/functions/api`) enthält dagegen nur Fotoanalyse, Fälle und Warteliste. Prompt und API-Schlüssel sind bereits serverseitig und damit geschützt. Das Regelwerk nicht.

**Risiko-Bewertung:**
| Aspekt | Einschätzung |
|---|---|
| Wer kann es holen? | Jeder, der die App-URL öffnet: Browser-Entwicklertools → Quellen/Netzwerk, ein paar Minuten, **kein Können nötig**. Minifizierung ist keine Sicherheit. |
| Hilft der Zugangscode (`APP_CODE`)? | **Nein.** Er schützt nur die Edge-Function-Routen. Die statischen Dateien bei Netlify sind für jeden abrufbar, sobald die App öffentlich gehostet wird. Gleiches gilt für jeden Tester, der die Seite öffnet. |
| Rechtliche Folge | Ein Regelwerk, das ungeschützt ausgeliefert wird, erfüllt kaum „angemessene Geheimhaltungsmaßnahmen“ → Geschäftsgeheimnisschutz wahrscheinlich nicht tragfähig 🔶. Urheberrechtlich bleibt der Code geschützt. |
| Aktuell betroffen? | Heute **noch nicht öffentlich** (kein Netlify, Landingpage nicht online). Das Risiko beginnt mit dem Livegang oder der Weitergabe des Links an Tester. |
| Wie schlimm? | Mittel. Der Inhalt ist zu großen Teilen aus öffentlichen Quellen ableitbar; verloren geht vor allem der Zeitvorsprung bei der Auslegung. Kein Datenschutzproblem (keine Kundendaten im Regelwerk). |

**Lösungsskizze: Regelwerk serverseitig**
1. Neue Route `POST /bewerten` in der Edge Function `api`: Eingabe = `Eingaben` (JSON), Ausgabe = `Bewertung` (Ampel, ausgelöste Maßnahmen mit Text und Fundstelle, „Vor Ort klären“, Hinweise, Messkonzept).
2. `regelwerk.ts` und `regeln.json` ziehen in die Edge Function (Deno). Ein Quell-Ort für die Logik, keine zwei Kopien: entweder gemeinsamer Ordner mit Build-Schritt, der die Dateien in `supabase/functions/api/` kopiert, oder die Funktion wird die einzige Heimat und die Tests ziehen mit um. 🔶 Prüfen, wie Supabase relative Imports außerhalb des Funktionsordners beim Deploy behandelt.
3. Die App (`main.ts`) ruft `/bewerten` auf und zeigt nur das Ergebnis. Die Typen (`Eingaben`, `Ergebnis`) bleiben in `modell.ts`; die Regeltabelle und `regeln.json` verschwinden aus dem App-Bundle. Prüfen per `grep` im `dist/`: dort darf kein „R07“ und keine Fundstelle mehr stehen.
4. Der Demo-Build bekommt eine feste Beispielantwort statt Regelwerk (die Demo hat ohnehin Beispieldaten).
5. Tests: `regelwerk.test.ts` läuft weiter gegen dieselbe Logik (Vitest importiert die Datei aus ihrem neuen Ort); zusätzlich ein Test für die Route (Antwortform, Fehlerfall, Zugangscode).
6. Nebenwirkungen:
   - **Offline-Betrieb entfällt** für die Bewertung (Foto-KI braucht sowieso Netz; Offline stand bereits „erst nach Go“ auf der Liste, [[App & Technik]]).
   - Latenz und Kosten: vernachlässigbar (reine Logik, keine KI).
   - **Restrisiko Black-Box:** Wer viele Eingaben durchprobiert, kann das Regelwerk Stück für Stück rekonstruieren. Gegenmittel: Login statt gemeinsamem Zugangscode, Rate-Limit je Konto, Ausgabe nur der ausgelösten Regeln (nicht der Gesamttabelle), Beobachtung auffälliger Konten. Vollständig verhindern lässt es sich nicht, nur verteuern.
   - Die Fundstelle in der Ausgabe verrät die Quelle; ein Nachbauer findet so die TAB-Stellen. Das ist Teil des Produktversprechens (Nachvollziehbarkeit) und nicht vermeidbar.
7. Bis das umgesetzt ist: **App nicht öffentlich hosten und den Link nicht an Fremde geben**; Tester nur nach NDA (Abschnitt 3). Lokale Nutzung und die private Demo (claude.ai-Artifact) sind davon nicht betroffen.

## 3. Verträge und Zugang
| Maßnahme | Zweck | Anmerkung |
|---|---|---|
| **Geheimhaltungsvereinbarung (NDA)** für Tester und Kollegen, bevor sie die App sehen | begründet vertraglich die „angemessene Geheimhaltung“ und schließt Reverse Engineering aus | einseitiges, kurzes Muster (1–2 Seiten); Mustervorlage von HWK/IHK oder Anwalt, 🔶 nicht selbst frei formulieren; ohne Gegenleistung wirkt eine Strafklausel oft schwach, deshalb Fokus auf Unterlassung |
| **Nutzungsbedingungen / AGB** der App | kein Kopieren, kein Reverse Engineering, kein Weitergeben des Zugangs, Haftungshinweis („ersetzt keine Prüfung durch die Elektrofachkraft“) | gehört zu [[Rechtliches]]; für B2B-Betriebe, Haftungsklauseln 🔶 prüfen lassen |
| **Zugang nur mit Login** | jeder Nutzer ist namentlich bekannt, Weitergabe und Auffälligkeiten sichtbar, Konto sperrbar | ersetzt den gemeinsamen Zugangscode; steht bereits unter „Irgendwann“, gehört dann vor den Test mit Fremden |
| **Repositories privat halten** | Code und `regeln.json` stehen bei GitHub | Sichtbarkeit beider Repos prüfen (privat?) |
| **Keine Regelwerk-Details in Marketing** | Flyer, Instagram-Rätsel, Gruppen-Texte | Rätsel dürfen die Fachfrage zeigen, nicht die vollständige Regel samt Auslegung |

## 4. Arbeitgeber-Frage 🔶 (für Anwalt / Steuerberater markiert)
Nach den Aufgabentexten im Vault arbeitet der Gründer im Elektrohandwerk (Kollegen, Betrieb). Wenn er **angestellt** ist, sind das offene Fragen, die ich **nicht beantworten kann**:
1. **Urheberrecht an Software:** Nach § 69b UrhG stehen die Nutzungsrechte an Programmen, die ein Arbeitnehmer **in Wahrnehmung seiner Aufgaben oder nach Weisung** schafft, dem Arbeitgeber zu. Eine App, die in der Freizeit und ohne betrieblichen Auftrag entsteht, ist grundsätzlich frei. Grenzfälle (Arbeitszeit, Firmen-Laptop, Firmenwissen) 🔶.
2. **Arbeitnehmererfindungsgesetz:** gilt nur für patent- oder gebrauchsmusterfähige Erfindungen. Bei Software „als solcher“ meist ohne Bedeutung 🔶.
3. **Herkunft des Wissens:** Das Regelwerk beruht auf dem eigenen Fachwissen, auf öffentlichen TAB und auf der **Westnetz-Schulung (09/2025)**. Wer hat diese Schulung bezahlt, unter welchen Bedingungen wurden die Unterlagen ausgegeben (Arbeitgeber, Netzbetreiber)? Interne Unterlagen oder Schulungsmaterial dürfen eventuell nicht weiterverwendet werden. Auch das Excel „Entscheidungsbaum“ → [[Entscheidungsbaum Excel]]: Wann, womit, aus welchem Wissen entstanden?
4. **Nebentätigkeit:** Arbeitsvertrag und Tarifvertrag auf Anzeige- oder Genehmigungspflicht prüfen (viele Verträge verlangen sie, wenn die Tätigkeit den Arbeitgeber berührt).
5. **Wettbewerb:** Während des Arbeitsverhältnisses gilt eine Treuepflicht; ein Produkt für **Kollegen und Elektrobetriebe der Region** kann als Konkurrenz zum Arbeitgeber oder als Interessenkonflikt gelten 🔶. Gespräche mit Kollegen am Arbeitsplatz, Aushänge beim Arbeitgeber oder Nutzung von Kundenkontakten des Arbeitgebers sind heikel.
6. **Wenn selbstständig/Inhaber:** Fragen 1–5 entfallen weitgehend; dann zählt stattdessen, ob Firmenvermögen und Firmenzeit sauber getrennt sind (Steuer, Gewerbeanmeldung → Steuerberater).

→ **Konkret:** Arbeitsvertrag (Nebentätigkeit, Erfindungen, Geheimhaltung, Wettbewerb) durchlesen, Fragen oben als Liste zur Erstberatung mitnehmen. Diese Klärung ist günstig und sollte **vor** dem ersten öffentlichen Auftritt stehen.

## 5. Realistischer Schutz: Tempo, Netzwerk, Daten
Schutz durch Recht hält Nachahmer nicht auf, er gibt höchstens Handhabe danach. Was bei dieser Idee wirklich zählt:
- **Vorsprung:** Wer zuerst bei den Betrieben im Westnetz-Gebiet ist, besetzt den Namen und die Gewohnheit (siehe [[Mein Vorteil]]).
- **Netzwerk:** Direktansprache, Innung, Großhändler ([[Direktansprache]]). Ein Konkurrent muss dieses Vertrauen erst aufbauen.
- **Daten aus echten Fällen:** Jeder erfasste Fall (Foto, KI-Vorschlag, Korrektur, tatsächliche Entscheidung) ist ein Datensatz, den keiner kopieren kann. Er verbessert Erkennung und Regelwerk und belegt die Trefferquote. **Das ist der eigentliche Burggraben.** Klären: Einwilligung der Betriebe zur Nutzung der Fälle (gehört in Nutzungsbedingungen/Datenschutz, [[Rechtliches]]), Fotos ohne Adresse/Name/Zählernummer.
- **Pflege:** Regelwerk aktuell halten (neue TAB, [[Regelwerk R01–R26]]). Ein veraltetes Kopie-Regelwerk verliert rasch Wert.
- **Bewertungsfolge:** Im Score steht „Vorsprung 5 – schwer zu kopieren“. Das gilt für Fachwissen und Netzwerk, **nicht** für das Regelwerk als Geheimnis. Beim nächsten Score-Lauf begründen, woher der Vorsprung kommt (Tempo und Daten statt Geheimnis). Punktzahl hier nicht geändert, weil das ein Beleg- und Gesprächsthema ist.

## 6. Maßnahmenliste (priorisiert)
Priorität gilt **nach** den Gesprächen: Die Validierung hat Vorrang ([[Ideen-System]], Regel „erst verkaufen, dann bauen“). Die Schutzmaßnahmen sind Infrastruktur und sollen nicht vorgezogen werden; die billigen und zeitkritischen (Arbeitgeberfrage, NDA vor Testern) stehen ganz oben, weil sie vor dem Mitteln mit Fremden nötig sind.

| Nr. | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | **Arbeitgeber-Frage klären** (Arbeitsvertrag lesen, Fragen aus Abschnitt 4 zur Erstberatung) | 🔶 0–200 € Erstberatung | 1–2 Std. + Termin | vor erstem öffentlichen Auftritt und vor dem Test mit Fremden |
| 2 | **NDA-Muster** für Tester besorgen/prüfen lassen | 🔶 0–150 € | 1 Std. | vor dem ersten Tester, der nicht im engsten Kreis ist |
| 3 | **Repos auf „privat“ prüfen**, keine Regelwerk-Details im Marketing | 0 € | 15 Min. | sofort, billig |
| 4 | **Regelwerk serverseitig** (Code, Abschnitt 2) | 0 € (nur Entwicklungszeit) | mittel, 1 Nachtschicht für Route + Umbau, Test | vor öffentlichem Hosting oder Link an Fremde |
| 5 | **Login statt Zugangscode** (Supabase Auth) + Rate-Limit | 0 € | mittel | gemeinsam mit 4, vor Kollegen-Test |
| 6 | **Nutzungsbedingungen** (Reverse-Engineering-Verbot, Haftung, Fallnutzung) in die Rechtstexte | 🔶 Prüfung 0–300 € | 2 Std. Entwurf | vor Livegang, zusammen mit [[Rechtliches]] |
| 7 | **Marke „Zählerklar“ anmelden** (nach Namensrecherche und DENIC-Prüfung) | 🔶 ca. 290 € | 1 Std. | erst wenn Name nach Gesprächen bleibt; nicht vor Validierung |
| 8 | Patent / Gebrauchsmuster | mehrere tausend € | hoch | **nicht empfohlen** |

## Offen / vom Anwalt prüfen lassen
- Arbeitsrechtliche Fragen aus Abschnitt 4 (insbesondere Wettbewerb, Nebentätigkeit, § 69b UrhG).
- Reicht ein NDA mit Testern aus, damit das Regelwerk als Geschäftsgeheimnis gilt, wenn die App technisch ausgeliefert wird? (Auch nach serverseitiger Lösung bleibt das Restrisiko der Black-Box-Abfrage.)
- Datenbankschutz für das Regelwerk (§§ 87a ff. UrhG): lohnt sich die Berufung darauf?
- Markenrecherche: Ähnlichkeiten in Klassen 9/42 (nicht nur identischer Name).
- Wirksamkeit von Reverse-Engineering-Verboten in B2B-Nutzungsbedingungen.
