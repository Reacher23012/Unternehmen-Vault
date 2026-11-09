---
typ: wissen
thema: schutz
projekt: "[[Zählerschrank-Check]]"
stand: 2026-11-09
status: analyse – keine Rechtsberatung, offene Punkte vom Anwalt prüfen lassen
---
# Schutz von Idee und App („Zählerklar“)

> Analyse der Nachtschicht vom 09.11.2026, **keine Rechtsberatung**. Alles mit ⚖️ ist unsicher und gehört zu einem Anwalt (IT-/Gewerberecht) oder Patentanwalt. Kosten sind grobe Richtwerte und vor Ort zu prüfen. Zugehörig: [[Zählerschrank-Check]], [[App & Technik]], [[Rechtliches]], [[Mein Vorteil]], [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]].

**Kurzfassung:** Die *Idee* ist nicht schützbar, der *Code* und der *Name* schon, das *Regelwerk* nur als Geschäftsgeheimnis – und das nur, wenn man es wirklich geheim hält. Heute liegt das ganze Regelwerk lesbar im Browser. Das ist der größte konkrete Schwachpunkt und mit einem überschaubaren Umbau behebbar. Den größten Schutz bietet ohnehin Tempo, Netzwerk und Fallhistorie (siehe Abschnitt 5). Die offene **Arbeitgeber-Frage** (Abschnitt 4) sollte vor jeder Investition geklärt werden.

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz? | Wie | Kosten / Aufwand (grob) |
|---|---|---|---|
| **Die Idee** („Foto → Regelwerk → Maßnahmenliste“) | **Nein.** Ideen und Konzepte sind frei. | – | – |
| **Quellcode, Texte, Gestaltung** | **Ja, automatisch** (Urheberrecht, §§ 69a ff. UrhG für Software). Schützt nur vor 1:1-Kopie, nicht vor Nachbau mit eigenem Code. | Entstehung durch Schaffen; Nachweis über Git-Historie, Datumsstempel. | 0 € |
| **Name „Zählerklar“ / Logo** | **Ja, als Marke** (DPMA, Eintragung). Ohne Eintragung nur schwacher Schutz durch Benutzung. Nur sinnvoll, wenn die Recherche frei ist. | Anmeldung beim DPMA, Klassen 9 und 42 (so schon in [[ADR-0006 Produktname Zählerklar]]). | Online-Anmeldung ca. 290 € für bis zu 3 Klassen (Stand mir bekannt, bitte aktuell prüfen); Widerspruchsfrist 3 Monate; ⚖️ Prüfung ähnlicher Marken am besten durch Anwalt. |
| **Domain** | Wer zuerst registriert, hat sie. Kein Markenschutz an sich. | DENIC-Registrierung `zaehlerklar.de` | wenige € pro Jahr |
| **Regelwerk R01–R26, Entscheidungslogik, Fallsammlung** | **Nur als Geschäftsgeheimnis** nach Geschäftsgeheimnisgesetz (GeschGehG). Voraussetzung: nicht allgemein bekannt, wirtschaftlicher Wert **und „angemessene Geheimhaltungsmaßnahmen“** (§ 2 Nr. 1 GeschGehG). Wer nichts tut, hat keinen Schutz. | technische und vertragliche Maßnahmen (Abschnitte 2 und 3), dokumentieren. | Aufwand statt Geld |
| **Patent / Gebrauchsmuster** | **Praktisch nein.** Software „als solche“ ist nicht patentierbar; nur technische Erfindungen. Ein Entscheidungsbaum aus Normwissen ist keine technische Lösung. Teuer, Veröffentlichung der Idee. | – | Patentanwalt ab mehreren tausend €; **nicht empfohlen**. ⚖️ |
| **Normtexte, TAB-Inhalte der Netzbetreiber** | Gehören nicht mir. Nur Fundstellen nennen, nicht abschreiben (so schon festgelegt). | – | – |

**Wichtig – das Regelwerk ist großenteils aus öffentlichen Quellen abgeleitet** (BDEW-Musterwortlaut, Westnetz-TAB, DIN/VDE-Fundstellen). Das Geheimnis liegt also nicht in den Inhalten einzelner Regeln, sondern in der **Auswahl, Verknüpfung und Aufbereitung** (Bedingungen, Stufen, Grenzwerte, Fälle). Ob das als Geschäftsgeheimnis trägt, ist ⚖️ eine Rechtsfrage. Realistisch: gegen Wort-für-Wort-Abschreiben hilft es, gegen Nachbau aus denselben öffentlichen Quellen nicht.

Zusätzlich beachten: Wer **fremde** Unterlagen (z. B. die Westnetz-Schulung 09/2025, DIN-Texte) verwendet, braucht dafür selbst die Rechte; die Fundstellen in `regeln.json` zitieren sie nur, das ist in Ordnung, solange keine Texte übernommen werden ⚖️.

## 2. Technischer Befund: Das Regelwerk liegt im Browser
**Befund (Code geprüft, `zaehlerschrank-check`, Stand 09.11.2026):**
- `web/src/regelwerk.ts` importiert `./regeln.json` (261 Zeilen: Bedingung, Maßnahme, Stufe, Fundstelle, Geltung, Status je Regel) und enthält die Auswertungslogik (124 Zeilen).
- `main.ts` ruft `bewerte(...)` direkt im Browser auf. Vite bündelt beides ins Bundle (`web/dist`).
- Folge: **Jeder, der die App öffnet, bekommt das gesamte Regelwerk als JavaScript**, im Klartext nachlesbar über die Entwicklerwerkzeuge. Minifizierung ist kein Schutz. Dasselbe gilt für das Demo-Artifact (`build:demo`, eine einzelne HTML-Datei).
- Das ist für die Validierung mit wenigen Testern (4 Kollegen) vertretbar, aber **mit „Geheimhaltungsmaßnahmen“ nicht vereinbar, sobald die App öffentlich ist**. Wer einen Zugangscode weitergibt oder die Seite öffentlich hostet, gibt das Regelwerk ab.

**Risikobewertung:**
| Risiko | Einschätzung |
|---|---|
| Kollege/Tester kopiert das Regelwerk | **hoch**, sobald App für Dritte offen ist; jeder technisch Versierte kann es in Minuten auslesen. |
| Mitbewerber baut daraus ein eigenes Produkt | mittel. Die Daten sind größtenteils aus öffentlichen Quellen ableitbar, es spart aber Wochen Arbeit. Der Schutz greift rechtlich nur, wenn Geheimhaltung nachweisbar war. |
| Verlust der Rechtsposition nach GeschGehG | **hoch**: Wer das Geheimnis frei ausliefert, kann später kaum behaupten, es sei „angemessen geschützt“ gewesen. ⚖️ |

**Lösungsskizze: Regelauswertung in die Edge Function verlegen**
1. Neue Route `POST /bewerte` in `supabase/functions/api/index.ts`: nimmt die `Eingaben` (Schrankfelder, Vorhaben, Netzform …), wertet serverseitig aus und liefert nur das **Ergebnis**: Ampel, Maßnahmen (Text, Stufe, **Fundstelle**), „Vor Ort klären“, Hinweise. Der App-Client bekommt nie die Bedingungen oder nicht ausgelösten Regeln.
2. `regelwerk.ts` und `regeln.json` ziehen in die Function um (z. B. `supabase/functions/api/regelwerk/`) oder in ein gemeinsames Modul, das nur dort importiert wird. Das Web-Bundle importiert sie nicht mehr; `main.ts` ruft stattdessen `api.ts`.
3. Die 13 Tests (Excel-Beispielzeile, Grenzwerte …) laufen weiter, aber gegen das Server-Modul. Dafür muss das Modul ohne Browser-Abhängigkeiten sein (ist es: reine Funktionen). Vitest kann es direkt importieren, solange es auch unter Deno läuft (keine Node-Importe).
4. Dem Client nur ausliefern, was die Maßnahme ausmacht. **Achtung:** Wer viele Eingabekombinationen durchprobiert, kann das Regelwerk trotzdem *nach und nach auslesen* (Black-Box-Abfrage). Dagegen helfen Login, Rate-Limit und Protokollierung (Abschnitt 3), nicht Technik allein.
5. Demo-Build (`build:demo`) bleibt ein Spezialfall: dort steckt die Logik zwingend im Artifact. Nur mit Beispieldaten, keine echte Regeldatei, oder die Demo wird gekürzt.

**Nachteile / Abwägung:**
- Ohne Netz keine Auswertung. Bisher läuft die Auswertung offline. Auf Baustellen mit Funkloch ist das relevant (Fälle werden heute lokal gespeichert und nachgesendet). Mögliche Mittelwege: Auswertung beim Nachsenden nachholen, oder Offline-Modus erst nach Go und dann mit Verschleierung als „Notlösung“. Das ist ein echter Produktkonflikt, deshalb **Entscheidung nötig** (siehe Maßnahme M4).
- Zusätzliche Latenz (~100–300 ms), Funktionslaufzeit ist unkritisch.
- Mehr Aufwand in der Edge Function (Deno, anderes Testsetup).

## 3. Verträge und organisatorische Maßnahmen
| Maßnahme | Zweck | Anmerkung |
|---|---|---|
| **NDA / Geheimhaltungsvereinbarung** für Tester und Kollegen, die Zugang bekommen | belegt „angemessene Maßnahmen“, Weitergabeverbot | einfaches Muster 1–2 Seiten; ⚖️ Anwalt prüft Vertragsstrafe, Dauer, Ausnahmen für öffentliche Informationen. Realistisch: Kollegen im Handwerk unterschreiben ungern – bei Tests kurze, freundliche Fassung („Ich zeige dir was Unfertiges, bitte nicht weitergeben“) plus Dokumentation, wem Zugang gegeben wurde. |
| **Nutzungsbedingungen / AGB** | Kein Kopieren, kein Auslesen, kein Reverse Engineering, keine Weitergabe des Zugangs, Nutzung nur für eigenen Betrieb | Pflicht ohnehin für ein Abo; ⚖️ AGB-Recht (B2B) von Anwalt prüfen. Gehört zu [[Rechtliches]]. |
| **Zugang nur mit Login** (statt gemeinsamem Zugangscode) | Zuordnung, Sperren, Rate-Limit je Nutzer. Heute: ein `APP_CODE` für alle → wer ihn weitergibt, hat nicht nachweisbar etwas verletzt. | Steht schon als „Login statt Zugangscode, bevor Kollegen testen“ unter *Irgendwann*; **diese Aufgabe sollte dafür vorgezogen werden** (siehe M2). |
| **Rate-Limit + Protokoll** je Nutzer | bremst Auslesen per Black-Box | in der Edge Function oder über Supabase-Auth |
| **Zugang dokumentieren** | Liste: wer, wann, mit welcher Vereinbarung | einfache Tabelle im Vault ohne Klarnamen-Details, die Unterlagen selbst nicht im Vault |
| **Kennzeichnung** „vertraulich“ in Unterlagen, Impressum/Footer „© …“ | Hinweis, schwacher Effekt | 0 € |

Keine Geheimnisse (Schlüssel, Passwörter, Kundendaten) in den Vault – auch keine unterschriebenen Verträge mit personenbezogenen Daten.

## 4. Arbeitgeber-Frage (offen – Anwalt/Steuerberater)
**Frage:** Wem gehört die Idee bzw. das Regelwerk, wenn sie im Rahmen einer Anstellung im Elektrohandwerk entstanden ist?

Ich kenne die Vertragslage nicht (Vertrag, Tätigkeit, Arbeitszeit, Betriebsmittel). Die Punkte, die ein Anwalt klären muss ⚖️:
1. **Arbeitnehmererfindung (ArbnErfG):** Gilt nur für patent-/gebrauchsmusterfähige Erfindungen. Bei Software/Regelwissen meist nicht einschlägig – aber bei Diensterfindungen hat der Arbeitgeber Ansprüche. Eher nachrangig.
2. **Urheberrecht an Software** (§ 69b UrhG): Programme, die ein Arbeitnehmer **in Wahrnehmung seiner Aufgaben oder nach Anweisung** schreibt, stehen dem Arbeitgeber zu. Hier entscheidend: Gehört Softwareentwicklung zu meinen arbeitsvertraglichen Aufgaben? Vermutlich nein, aber ⚖️ prüfen lassen.
3. **Wissen aus dem Betrieb:** Betriebs- und Geschäftsgeheimnisse des Arbeitgebers (Kundenfälle, interne Kalkulationen, Fotos von Kundenanlagen) dürfen nicht ohne Weiteres in Regelwerk oder Trainingsdaten fließen. Fotos echter Schränke: **nur eigene Fälle oder mit Erlaubnis, ohne Adresse/Namen/Zählernummer** (so auch in den Aufgaben vermerkt).
4. **Nebentätigkeit:** Muss sie angezeigt/genehmigt werden? Viele Verträge verlangen Anzeige oder Zustimmung, besonders bei Selbstständigkeit.
5. **Wettbewerbsverbot:** Während des Arbeitsverhältnisses darf ich dem Arbeitgeber keine Konkurrenz machen. Ein Produkt, das sich an Elektrobetriebe richtet, ist kein Wettbewerb zum Betrieb als Installateur, kann aber ⚖️ anders gesehen werden, wenn der Arbeitgeber selbst Bewertung/Beratung für Zählerplätze anbietet.
6. **Arbeitszeit/Arbeitsmittel:** Entsteht etwas in der Arbeitszeit oder mit Geräten des Arbeitgebers, steigt das Risiko, dass er Ansprüche stellt. **Trennung herstellen** (privates Gerät, Freizeit, Entstehungsnachweis über Git-Zeitstempel).
7. **Steuerberater:** Gewerbeanmeldung, Einkünfte aus Nebentätigkeit, Kleinunternehmer – gehört nicht in dieses Dokument, aber in denselben Termin.

**Empfehlung:** Ein Termin (Erstberatung Fachanwalt für Arbeitsrecht, ca. 190 € netto Erstberatungsgrenze bei Verbrauchern, ⚖️ Gebühr bitte erfragen) **vor** dem ersten Verkauf. Mitbringen: Arbeitsvertrag, Beschreibung der Idee, Entstehungsdaten (erste Commits 29.09.2026, Excel-Entscheidungsbaum als Vorläufer – **wann und wo war die Excel entstanden?** Das ist für die Frage der Entstehung entscheidend).

## 5. Realistischer Schutz durch Tempo
Rechtlicher Schutz ist hier dünn. Was Nachbauer wirklich aufhält:
- **Vorsprung:** Bis jemand das Regelwerk nachgebaut hat, ist man mit dem nächsten Release (weitere Netzbetreiber) weiter. Ein Netzbetreiber-Regelwerk muss laufend gepflegt werden (neue TAB-Fassungen).
- **Netzwerk:** Die ersten 15 Kollegen, Innung, Großhändler: Vertrauen kann kein Konkurrent kopieren. → [[Direktansprache]], [[Mein Vorteil]].
- **Daten aus echten Fällen:** Trefferquote, Korrekturen („Deine tatsächliche Entscheidung“), Fotos und Fehlerquoten der Erkennung. Daraus entsteht ein Datensatz, den niemand von außen hat. Das ist der eigentliche Graben – vorausgesetzt Datenschutz und Einwilligungen stimmen (⚖️, Fotos von Kundenanlagen).
- **Marke und Domain** früh sichern, bevor Reichweite entsteht.
- **Nicht zu viel Angst:** Solange nicht validiert ist, dass jemand zahlt ([[Validierung & Go-No-Go]]), ist Schutz nachrangig. Die meisten Ideen scheitern nicht am Diebstahl, sondern daran, dass niemand zahlt.

## 6. Priorisierte Maßnahmenliste
| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| M1 | **Arbeitgeber-/Nebentätigkeitsfrage klären** (Erstberatung Arbeitsrecht, Vertrag mitbringen) | ca. 100–250 € ⚖️ | 1 Termin | **vor erstem Verkauf**, besser vor Livegang |
| M2 | **Login statt gemeinsamem Zugangscode** (Supabase Auth, nutzerbezogene Sperre/Rate-Limit) | 0 € | mittel (Code) | **vor Kollegen-Test**, siehe *Irgendwann* |
| M3 | **Regelwerk serverseitig** (Route `/bewerte`, App bekommt nur Ergebnis + Fundstelle) | 0 € | mittel (Code, 1–2 Nachtschichten) | vor öffentlichem Livegang |
| M4 | **Entscheidung Offline vs. Schutz** als ADR festhalten | 0 € | klein | vor M3 |
| M5 | Kurz-NDA + Hinweis in der Tester-Ansprache für die 4 Tester | 0 € (Muster) | klein | **vor Weitergabe des Zugangs** |
| M6 | Nutzungsbedingungen (kein Auslesen/Kopieren/Weitergabe) mit der Rechtsprüfung der Seiten verbinden → [[Rechtliches]] | Anwalt ⚖️ | klein | vor Abo-Verkauf |
| M7 | `zaehlerklar.de` sichern, DPMA-Recherche, danach Markenanmeldung (Kl. 9, 42) | Domain ~10 €/Jahr, Marke ca. 290 € | klein | nach Namensprüfung, vor Reichweite |
| M8 | Zugangsliste führen (wer, wann, welche Vereinbarung) | 0 € | klein | laufend |
| M9 | Demo-Build entschärfen (nur Beispieldaten, kein echtes `regeln.json`) | 0 € | klein | vor Weitergabe der Demo |
| M10 | Patent/Gebrauchsmuster | mehrere tausend € | hoch | **nicht verfolgen** |

## Offene Fragen für Anwalt / Steuerberater (⚖️)
1. Arbeitsvertrag: Nebentätigkeitsanzeige, Wettbewerbsklausel, Pflichten zur Übertragung von Arbeitsergebnissen?
2. Reicht ein Auszug aus öffentlichen Quellen abgeleitetes Regelwerk als Geschäftsgeheimnis nach GeschGehG?
3. Tragfähige Mindest-NDA für Tester (Vertragsstrafe, Dauer)?
4. AGB/Nutzungsbedingungen B2B für Abo; Haftungsausschluss „Ersteinschätzung, Prüfung durch Elektrofachkraft nötig“.
5. Rechte an Fotos von Kundenanlagen; Einwilligungen/Datenschutz (DSGVO) für die Fallsammlung.
6. Nutzung von Fundstellen aus Westnetz-Schulung/BDEW/DIN – zulässig als Zitat?
