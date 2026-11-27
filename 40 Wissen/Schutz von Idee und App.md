---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-11-27
status: analyse – keine Rechtsberatung, Rechtsfragen vom Anwalt prüfen lassen
---
# Schutz von Idee und App („Zählerklar“)

> Analyse der Nachtschicht vom 27.11.2026. **Keine Rechtsberatung.** Alles mit ⚖️ ist unsicher und gehört vor einer Entscheidung zu einem Anwalt (IT-/Urheberrecht, Arbeitsrecht) bzw. Steuerberater.

**Kurzfazit:** Die *Idee* ist nicht schützbar. Schützbar sind Name (Marke), Code (Urheberrecht, automatisch) und das Regelwerk als Geschäftsgeheimnis – aber nur, solange es wirklich geheim bleibt. Genau da ist der größte Befund: **Das komplette Regelwerk liegt aktuell im Browser jedes Nutzers.** Der echte Schutz kommt ohnehin durch Tempo, Netzwerk und echte Fallzahlen ([[Mein Vorteil]]), nicht durch Paragrafen.

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Kosten / Aufwand | Einschätzung |
|---|---|---|---|
| **Idee** („Foto → Zählerschrank-Einordnung“) | keiner. Ideen sind frei | – | Wer sie hört, darf sie nachbauen. Deshalb vor Gesprächen nur das Problem, nicht das Regelwerk zeigen. |
| **Code** | Urheberrecht (§ 69a ff. UrhG), entsteht automatisch, schützt nur die konkrete Umsetzung, nicht die Funktion | 0 € | Schutz gegen 1:1-Kopieren, nicht gegen Nachbauen. ⚖️ Wer ist Urheber, wenn KI wesentliche Teile geschrieben hat? Eigene Gestaltungsleistung dokumentieren (Git-Verlauf ist ein gutes Indiz). |
| **Name „Zählerklar“** | Marke beim DPMA (Wortmarke, Klassen 9/42) | ca. 290 € für 3 Klassen online (Stand ohne Gewähr, vor Antrag auf dpma.de prüfen) | Erst nach Recherche ([[ADR-0006 Produktname Zählerklar]]). Beschreibende Namen können abgelehnt werden („klar“ + Zähler ist nah dran) ⚖️. Ohne Eintragung entsteht Schutz nur durch Benutzung/Verkehrsgeltung, schwach. |
| **Regelwerk / Know-how** | Geschäftsgeheimnisgesetz (GeschGehG): nur geschützt, wenn es *geheim ist*, wirtschaftlichen Wert hat **und angemessene Geheimhaltungsmaßnahmen** bestehen | Aufwand statt Geld | Siehe Abschnitt 2 – Stand heute fehlen die Maßnahmen. ⚖️ Außerdem: Die zugrundeliegenden Fundstellen (TAB, VDE, Westnetz-Schulung) sind öffentlich bzw. fremd; schützbar ist höchstens die *Zusammenstellung und Bewertung*. Reverse Engineering ist nach GeschGehG ausdrücklich erlaubt, sofern nicht vertraglich ausgeschlossen. |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist nicht patentierbar; nur mit „technischem Beitrag“. Gebrauchsmuster für Verfahren ausgeschlossen | Patent mehrere tausend € | **Nicht sinnvoll** für diese Idee. Nicht weiterverfolgen. |
| **Normtexte** | gehören den Normgebern (DIN/VDE, BDEW) | – | Nur Fundstellen nennen, keine Texte übernehmen (steht schon in [[Rechtliches]]). |

## 2. Technischer Befund: Regelwerk liegt im Browser
**Befund (geprüft im Code am 27.11.2026):**
- `web/src/regelwerk.ts` importiert `./regeln.json`; Vite baut sie in das ausgelieferte JS-Bundle. Die Auswertung (`ausgeloesteRegeln`) läuft komplett im Browser.
- Die Datei enthält je Regel: Bedingung, Maßnahme, Stufe, **Fundstelle**, Geltung, Status – das ist im Kern das gesamte Alleinstellungsmerkmal (≈ 14 KB Text). Jeder, der die App öffnet, kann es über die Entwicklerwerkzeuge in Sekunden herunterladen, ohne Login-Hürde, sobald die App öffentlich liegt.
- Die Verschlüsselung/Minifizierung des Bundles ändert daran nichts (Verschleierung ist kein Schutz).
- Zusätzlich liegt das Regelwerk in: der Demo-Datei auf claude.ai (privat, aber extern gehostet), dem Excel `Anhänge/Entscheidungsbaum_Zaehlerschrank.xlsx` und den Vault-Notizen [[Regelwerk R01–R26]].

**Risikobewertung:**
| Aspekt | Einschätzung |
|---|---|
| Wahrscheinlichkeit des Abgreifens | gering bis mittel, solange nur Kollegen testen; **hoch, sobald die App öffentlich und ohne Login ist** (Zugangscode steckt heute nur in der Edge Function, das Regelwerk aber nicht dahinter) |
| Schaden | mittel: Ein Kopierer hätte die Regeln, aber (noch) keine Fotoerkennung, Fallzahlen, Kundennetzwerk. Rechtlich ist das Geschäftsgeheimnis ohne Maßnahmen kaum zu verteidigen ⚖️ |
| Gegenmaßnahme | Regelauswertung serverseitig |

**Lösungsskizze „Regelwerk serverseitig“:**
1. `regeln.json` und die Logik aus `regelwerk.ts` in die Edge Function (`supabase/functions/api/`) verlegen, bzw. als zweite Funktion `POST /bewerten`.
2. App sendet nur die **Eingaben** (Felder aus `Eingaben`), bekommt nur das **Ergebnis** zurück: Ampel, ausgelöste Regeln mit Maßnahme + Fundstelle, „Vor Ort klären“, Hinweise. Die Gesamtliste der Regeln und die Bedingungen verlassen den Server nie.
3. Zugriff nur mit Zugangscode/Login (heute `x-app-code`, später Login, siehe Aufgabe „Login statt Zugangscode“).
4. Tests: bestehende 13 Tests ziehen mit (Logik testbar in Deno oder als gemeinsames Modul), Ergebnis muss identisch zur Excel-Beispielzeile bleiben.
5. Demo-Build (`build:demo`) bleibt eine Ausnahme mit Beispieldaten; dort nur Teilmenge der Regeln oder Ergebnisse als feste Beispiele einbetten.
6. **Grenze:** Auch serverseitig sieht ein Nutzer Ergebnisse. Wer 1000 Eingabekombinationen abfragt, kann Regeln rekonstruieren. Gegenmittel: Rate-Limit pro Zugang (aktuell bewusst offen laut [[App & Technik]]), Protokoll auffälliger Abfragen, Nutzungsbedingungen (Abschnitt 3). Vollständig verhindern lässt es sich nicht.
7. Nebeneffekt: Regeländerungen (z. B. neue TAB) wirken sofort für alle, ohne App-Update.

**Aufwand:** ca. 0,5–1 Tag Code, kein Zusatzkosten (Supabase Free Tier). Wirkt erst, wenn die Edge Function eingespielt ist (braucht Zugangsdaten → nicht nachts machbar, Deployment macht der Nutzer).

## 3. Verträge und Zugang
- **Geheimhaltungsvereinbarung (NDA) für Tester/Kollegen:** einseitig, kurz (1 Seite), vor dem Mittesten: was vertraulich ist (Regelwerk, Funktionsweise, Zugang), Verbot der Weitergabe und des Nachbauens, Dauer (z. B. 3 Jahre), Rückgabe/Löschen. Für die 4 wartenden Tester jetzt sinnvoll, **für Gespräche ohne Zugang nicht nötig** (nur Problem besprechen, kein Regelwerk zeigen). Vorlage vom Anwalt prüfen lassen ⚖️ (AGB-Recht bei unangemessenen Klauseln, Vertragsstrafe nur mit Maß).
- **Nutzungsbedingungen / AGB** (vor Livegang): kein Kopieren, kein Auslesen/Scraping, kein Reverse Engineering **soweit gesetzlich zulässig** ⚖️ (§ 69e UrhG erlaubt Dekompilierung teils zwingend; GeschGehG erlaubt Reverse Engineering, wenn nicht vertraglich ausgeschlossen – vertraglicher Ausschluss ist gegenüber Verbrauchern/Unternehmen unterschiedlich wirksam).
- **Zugang nur mit Login:** gehört zu „angemessenen Geheimhaltungsmaßnahmen“. Persönliche Zugänge statt gemeinsamem Code, damit Weitergabe nachvollziehbar ist.
- **Dokumentation der Maßnahmen** (Notiz im Vault mit Datum): NDA unterschrieben, Zugriff beschränkt, Regelwerk nicht im Frontend. Das ist im Streitfall der Beleg.
- **Vault/GitHub:** Das Regelwerk steht auch in den GitHub-Repositories. **Prüfen, dass beide Repositories privat sind**, und die Zugriffsrechte knapp halten (keine Frage der Nachtschicht, Sichtprüfung durch den Nutzer).

## 4. Arbeitgeber-Frage (offen, ⚖️ Anwalt / Steuerberater)
Die Idee wurde im Umfeld des Elektrohandwerks entwickelt. Falls eine **Anstellung** besteht, ist offen:
- **Wem gehört das Werk?** Software, die ein Arbeitnehmer *in Erfüllung seiner Aufgaben* schafft, gehört nach § 69b UrhG dem Arbeitgeber. Eine Zählerschrank-App abends privat zu bauen ist meist nicht Teil der Aufgaben – ⚖️ aber Grenzfälle (Arbeitszeit, Betriebsmittel, Firmenwissen, Firmenfotos) sind riskant.
- **Arbeitnehmererfindungsgesetz:** gilt für patent-/gebrauchsmusterfähige Erfindungen (hier eher nicht relevant), aber nicht automatisch für Software ⚖️.
- **Nebentätigkeit:** meist anzeigepflichtig bzw. genehmigungspflichtig laut Arbeitsvertrag.
- **Wettbewerbsverbot:** Während des Arbeitsverhältnisses darf man dem Arbeitgeber keinen Wettbewerb machen. Eine App für Elektrobetriebe könnte als Konkurrenz zu Arbeitgeber-Leistungen (Zählerplatzprüfung, Angebote) gelten ⚖️. Dazu Kundenkontakte und Betriebsgeheimnisse des Arbeitgebers nicht verwenden.
- **Fotos echter Schränke** aus Aufträgen des Arbeitgebers: gehören ggf. dem Kunden/Arbeitgeber, Datenschutz beachten.
- **Zu klären (Fragenliste für den Termin):** (1) Arbeitsvertrag/Nebentätigkeit lesen: Anzeige- oder Genehmigungspflicht? (2) Entstand die Idee/Regelwerk teilweise aus Firmenunterlagen oder -schulungen? (3) Konkurriert die App mit Leistungen des Arbeitgebers? (4) Schriftliche Freigabe/Verzicht des Arbeitgebers einholen? (5) Steuer: Gewerbeanmeldung, Kleinunternehmer, Nebengewerbe (Steuerberater).
- Hinweis: Ob und wo eine Anstellung besteht, steht nicht im Vault. Die Nachtschicht nimmt nichts an; die Fragen gelten, falls zutreffend.

## 5. Realistischer Schutz: Tempo statt Paragrafen
Rechtlicher Schutz hilft nach dem Schaden und kostet Geld und Nerven. Für ein Ein-Mann-Projekt zählt:
- **Vorsprung:** Regelwerk R01–R26 + Westnetz-Praxis. Je früher in der Branche bekannt („der mit Zählerklar“), desto weniger lohnt ein Klon.
- **Netzwerk:** Kollegen, Innung, Handwerkskammer ([[Direktansprache]]). Vertrauen kopiert man nicht.
- **Daten aus echten Fällen:** Die gespeicherten Fälle samt Entscheidung (Trefferquote, Fotoerkennung) sind mit der Zeit wertvoller als das Regelwerk. Sie liegen serverseitig und sind der eigentliche Burggraben ([[Ideen-System]]).
- **Pflege:** Regeländerungen (neue TAB 2026, BDEW-Musterwortlaut) schneller einarbeiten als ein Nachbauer.
- **Erst validieren:** Solange nicht klar ist, ob jemand zahlt ([[Validierung & Go-No-Go]]), ist Schutzaufwand überzogen. Bis dahin reicht: nichts Unnötiges zeigen, Regelwerk serverseitig, NDA für die Tester.

## 6. Maßnahmenliste (priorisiert)
| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | Repositories auf **privat** prüfen; Regelwerk in Gesprächen nicht zeigen | 0 € | 5 Min. | sofort |
| 2 | **Regelwerk serverseitig** (Code, s. o.) | 0 € | 0,5–1 Tag | vor Öffentlichkeit/Mittesten durch Fremde |
| 3 | **NDA** für die 4 Tester (Vorlage prüfen lassen) | 0–150 € | 1–2 Std. | vor Zugang zur App |
| 4 | Namensprüfung DENIC/DPMA, danach **Wortmarke** anmelden (nur bei Go) | ca. 290 € | 1 Std. | nach Go |
| 5 | **Nutzungsbedingungen** + Login statt Zugangscode, Rate-Limit | 0–500 € (Anwalt) | 1–2 Tage | vor Livegang |
| 6 | **Arbeitgeber-/Nebentätigkeitsfrage** klären (Arbeitsvertrag lesen, ggf. Anwalt) | 0–300 € | 1–2 Std. | **vor** Gewerbeanmeldung / Verkauf |
| 7 | Schutzmaßnahmen dokumentieren (Datum, NDA, Zugriff) | 0 € | 30 Min. | laufend |
| – | Patent/Gebrauchsmuster | – | – | nicht verfolgen |

**Kritische Einordnung als Mitgründer:** Punkt 6 und der Test, ob überhaupt jemand zahlt, sind wichtiger als Marke und NDA. Der Schutz-Aufwand darf die 5 Gespräche nicht verdrängen ([[Aufgaben]], Vorrang laut [[2026-10-02 Ideen-Check]]).
