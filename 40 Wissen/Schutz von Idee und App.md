---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-10-27
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App („Zählerklar“)

> Analyse der Nachtschicht vom 27.10.2026. **Keine Rechtsberatung.** Was unsicher ist, steht als **⚖ Anwalt prüfen** da. Rechtsstand und Gebühren nach meinem Wissen, vor einer Ausgabe aktuell prüfen.

**Kurzfassung:** Die *Idee* ist nicht schützbar. Schützbar sind Code, Name und mit Einschränkung das Regelwerk als Geschäftsgeheimnis. Wirklich teuer zu kopieren ist nur, was nicht im Browser liegt: geprüfte Regeln, Fundstellen, echte Fälle, Netzwerk. Der größte Hebel ist **Tempo und Kundennähe**, danach drei billige Maßnahmen (NDA, Regelwerk raus aus dem Bundle, Klärung mit dem Arbeitgeber).

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Was es bringt | Kosten / Aufwand |
|---|---|---|---|
| **Idee** („Foto → Ampel für Zählerschränke“) | keiner | Ideen sind frei, jeder darf sie nachbauen | – |
| **Code** | Urheberrecht (§§ 69a ff. UrhG), entsteht automatisch | Schutz gegen Kopieren des Quelltextes, nicht gegen eine eigene Neuimplementierung derselben Funktion | 0 € |
| **Name „Zählerklar“** | Marke beim DPMA (Wort-/Bildmarke), Klassen 9 und 42 | Verbietet ähnliche Namen im selben Feld; Voraussetzung ist eine Recherche, ob der Name frei ist ([[ADR-0006 Produktname Zählerklar]]) | grob 290 € Online-Anmeldung für bis zu 3 Klassen (Gebühr prüfen), Dauer 10 Jahre; Recherche kostenlos im DPMAregister |
| **Domain / Handle** | Wer zuerst registriert | Verhindert Namens-Squatting | wenige € pro Jahr |
| **Regelwerk R01–R26 und Fundstellen-Sammlung** | (a) **Geschäftsgeheimnis** nach GeschGehG; (b) evtl. Datenbankschutz (§§ 87a ff. UrhG) bei wesentlicher Investition; einzelne Normen/TAB-Inhalte sind selbst *nicht* meins | Schutz nur, solange es **geheim** ist *und* ich „angemessene Geheimhaltungsmaßnahmen“ treffe (§ 2 Nr. 1 GeschGehG) | siehe Abschnitte 2 und 3 |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist nicht patentfähig (§ 1 Abs. 3 PatG), Computerprogramme sind vom Gebrauchsmuster ausgeschlossen | in der Praxis **nicht sinnvoll**; ⚖ nur falls später ein technisches Verfahren dazukommt | teuer, Monate bis Jahre |

**Wichtig zum Geschäftsgeheimnis:** *Reverse Engineering* eines frei verkauften Produkts ist nach § 3 GeschGehG grundsätzlich erlaubt, **außer** es ist vertraglich ausgeschlossen. Wer meine App im Browser zerlegt, handelt ohne Vertrag legal. Ohne Nutzungsbedingungen und ohne Geheimhaltung gibt es hier faktisch keinen Schutz.

**Ehrliche Einordnung des Regelwerks:** Die Inhalte stammen aus öffentlichen oder halböffentlichen Quellen (BDEW-Musterwortlaut TAB, Westnetz-Schulung, DIN/VDE-Fundstellen). Mein eigener Wert ist die *Auswahl, Verdichtung und Verknüpfung* (26 Regeln mit Bedingung, Maßnahme, Stufe, Fundstelle). Das ist ein Vorsprung von Wochen bis wenigen Monaten, kein Burggraben. ⚖ Ob diese Zusammenstellung als Geschäftsgeheimnis trägt (öffentlich zugängliche Bestandteile), muss ein Anwalt bewerten.

## 2. Technischer Befund: Regelwerk liegt beim Nutzer im Browser
Geprüft im Code-Repo (`zaehlerschrank-check`, Stand `master`):

- `web/src/regeln.json` (ca. 14 KB) enthält **alle 26 Regeln im Klartext**: Bedingung, Maßnahme, Stufe, Fundstelle, Geltung, Status.
- `web/src/regelwerk.ts` (ca. 5 KB) importiert die JSON direkt (`import regelnJson from "./regeln.json"`) und enthält die Auslöse-Logik (`ausgeloesteRegeln`, `bewerte`).
- Die Vite-Konfiguration (`vite.config.ts`) bündelt beides in das öffentlich auslieferbare JavaScript. Wer die App öffnen darf, kann das gesamte Regelwerk mit zwei Klicks in den Entwicklertools lesen und kopieren. Das gilt auch für die Demo (`npm run build:demo`).
- Die Edge Function (`supabase/functions/api`) macht nur Fotoanalyse und Fall-Speicher; die **Entscheidung fällt komplett im Client**. Der Zugang hängt an einem einzigen gemeinsamen `APP_CODE` (siehe [[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]]).

**Bewertung:**
| Risiko | Einschätzung |
|---|---|
| Kopie des Regelwerks durch jeden mit Zugang | **hoch** (trivial) |
| Wirkung rechtlich | Ohne NDA/Nutzungsbedingungen kaum Handhabe, siehe oben |
| Geteilter `APP_CODE` | Ein Tester gibt den Code weiter, und jeder hat alles; kein Widerruf pro Person |
| Heute realer Schaden | **gering**: Kreis der Tester ist klein, das Regelwerk ist großenteils aus öffentlichen Quellen. Das Risiko wächst mit jedem weiteren Zugang und mit der Veröffentlichung der App |

**Lösungsskizze („Regelwerk serverseitig“):**
1. Neue Route `POST /bewerte` in der Edge Function: Eingaben (die 12 Schrank-Felder + Vorhaben) rein, **Ergebnis** raus (Ampel, ausgelöste Regeln mit Maßnahme und Fundstelle, „Vor Ort klären“, Messkonzept).
2. `regeln.json` und die Logik wandern nach `supabase/functions/api/` (Deno). Die Web-App behält nur Typen und Darstellung; `regelwerk.ts` im Bundle entfällt. Die vorhandenen Tests (`regelwerk.test.ts`, 13 Tests) ziehen mit um oder laufen gegen die Funktion.
3. Die App zeigt nur die **Ergebnis-Regeln** (Name, Maßnahme, Fundstelle) des Einzelfalls, nie die Bedingungen und nie die Liste aller 26.
4. **Zielkonflikt Funkloch:** Heute werden Fälle bei fehlendem Netz lokal gespeichert und nachgesendet. Bewertung geht dann nur online; offline bleibt Erfassen möglich, das Ergebnis kommt beim Nachsenden. Für die Baustelle meist vertretbar, mit Kollegen besprechen.
5. **Grenzen:** Wer viele Fälle durchprobiert, kann das Regelwerk Stück für Stück rekonstruieren (Black-Box-Abfrage). Serverseitig erhöht das nur den Aufwand und lässt sich mit Login, Mengenbegrenzung (Rate-Limit) und Protokoll begrenzen. Es ist kein absoluter Schutz.
6. Passt zu [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]] („Regelwerk deterministisch, nicht KI“): Die Entscheidung bleibt deterministisch, sie läuft nur woanders.

**Weitere Stellen prüfen:** Excel `Anhänge/Entscheidungsbaum_Zaehlerschrank.xlsx` und die Notiz [[Regelwerk R01–R26]] liegen im Vault. Der Vault liegt auf GitHub (`unternehmen-vault`): **Sichtbarkeit „privat“ prüfen** und privat lassen. Die Landingpage und die Instagram-Posts verraten bewusst nur *einzelne* Regeln als Rätsel; das ist als Marketing in Ordnung, aber nicht die ganze Liste posten.

## 3. Verträge und Zugang
| Baustein | Inhalt | Wann |
|---|---|---|
| **NDA für Tester/Kollegen** | Kurze beidseitige oder einseitige Geheimhaltung: App, Regelwerk, Ergebnisse nicht weitergeben, nicht kopieren; Rückgabe/Löschung nach Testende; Vertragsstrafe nur mit Anwalt (⚖) | **bevor** Tester Zugang bekommen |
| **Nutzungsbedingungen (AGB)** | Persönliche, nicht übertragbare Lizenz; kein Kopieren, kein Auslesen des Regelwerks, kein Reverse Engineering, kein Weitergeben von Zugangsdaten; Haftungshinweis „ersetzt keine Prüfung durch die Elektrofachkraft“ | vor Livegang; Entwurf jetzt, ⚖ Prüfung |
| **Login statt `APP_CODE`** | Je Nutzer ein Konto (z. B. Supabase Auth), widerrufbar; ermöglicht auch Mengenbegrenzung | vor dem Test durch Fremde; steht schon unter „Irgendwann“ |
| **Datenschutz/AV-Verträge** | Siehe [[Rechtliches]] | unverändert |

Gespräche ohne App (Leitfaden, [[Gesprächsleitfaden]]) brauchen **kein** NDA; dort wird nur das Problem besprochen, nicht das Regelwerk gezeigt.

## 4. Arbeitgeber-Frage (offen – Anwalt/Steuerberater)
**⚖ Wem gehört die Idee, wenn sie im Rahmen einer Anstellung im Elektrohandwerk entstanden ist?** Ich bin kein Anwalt; folgende Punkte sind die Fragen, nicht die Antworten:
1. **Arbeitsvertrag lesen:** Nebentätigkeitsklausel (Anzeige/Genehmigung?), Wettbewerbsverbot während des Arbeitsverhältnisses, Geheimhaltungsklausel, Klausel zu Arbeitsergebnissen.
2. **Software:** § 69b UrhG weist Arbeitgebern die Rechte an Programmen zu, die ein Arbeitnehmer *in Wahrnehmung seiner Aufgaben oder nach Anweisung* schafft. Mein Code entsteht privat und in der Freizeit, aber die Abgrenzung hängt vom Aufgabenbereich ab.
3. **Know-how aus der Arbeit:** Fachwissen darf ich nutzen, **betriebsinterne** Unterlagen (Preislisten, Kundendaten, interne Prüfberichte, Fotos aus Kundenaufträgen) nicht. Fotos echter Schränke: vom Kunden/Betrieb nicht ohne Zustimmung verwenden; siehe auch Eigene-Fotos-Aufgabe.
4. **Arbeitnehmererfindungsgesetz:** gilt nur für patent-/gebrauchsmusterfähige Erfindungen. Bei Software praktisch kaum relevant, aber die Frage mit abhaken.
5. **Wettbewerb:** Verkauft die App an Konkurrenten oder Kunden des Arbeitgebers? Das Produkt richtet sich an Elektrobetriebe, also potenziell auch an den eigenen Arbeitgeber und Kollegen. Das sollte offen mit ihm geklärt werden, bevor es öffentlich wird.
6. **Wichtig:** Ob das Vorhaben so zulässig ist, hängt am **konkreten Arbeitsvertrag**. Erstberatung (Fachanwalt Arbeitsrecht / IT-Recht, ggf. Rechtsberatung der Handwerkskammer oder Innung) ist die billigste Absicherung gegen den teuersten Fall (Streit über das Eigentum am Produkt, nachdem Kunden da sind). Mit dem Arbeitsvertrag zum Termin gehen.

## 5. Realistischer Schutz: Tempo, Netzwerk, Daten
Der Burggraben der Idee ist nicht das Recht, sondern:
- **Vorsprung:** Ein Wettbewerber braucht Wochen für die Regelbasis, aber vor allem *Vertrauen* in einer Nische, in der Fachfehler sofort auffallen.
- **Netzwerk:** Direktzugang zu Kollegen, Innung, Großhändler ([[Direktansprache]], [[Mein Vorteil]]). Das lässt sich nicht kopieren.
- **Daten aus echten Fällen:** Fälle mit „tatsächlicher Entscheidung“ ergeben Trefferquote und Fotoerkennung; wer 500 geprüfte Schränke hat, hat etwas, das die Regeln selbst nicht hergeben. Deshalb Fälle sauber erfassen und Fotodaten schützen (privater Bucket, keine Adressen).
- **Pflege:** Aktualität gegenüber neuen TAB-Fassungen (Westnetz beobachten) ist ein laufender Service, den Kopierer selten halten.
- **Beweissicherung:** Das Git-Protokoll der Repos (Commit-Daten) belegt, wann was entstanden ist. Zusätzlich vor dem Livegang einen Stand mit Datum sichern (Tag, Archiv); kostet nichts.

## 6. Maßnahmenliste (priorisiert)
| # | Maßnahme | Kosten | Aufwand | Wann | Wirkung |
|---|---|---|---|---|---|
| 1 | Gespräche mit Kollegen führen (Validierung bleibt Vorrang!) | 0 € | – | jetzt | Ohne Kunden ist jeder Schutz wertlos |
| 2 | **NDA-Vorlage** für Tester | 0 €, Anwaltsprüfung ca. 100–300 € (Schätzung) | 1–2 h | vor Testzugang | hoch, billig |
| 3 | **Arbeitgeber-Frage** klären (Vertrag lesen, Erstberatung) | Erstberatung grob 100–250 € (Schätzung) | 2–3 h | vor Livegang, besser vorher | verhindert den teuersten Fall |
| 4 | **Regelwerk serverseitig** (Code-Aufgabe) | 0 € | 1 Nachtschicht + Test | vor Test durch Fremde | hoch; macht Kopie schwer |
| 5 | **Nutzungsbedingungen** (kein Reverse Engineering, kein Teilen) | 0 €, Prüfung 100–300 € (Schätzung) | 2 h | vor Livegang | schließt die Lücke aus § 3 GeschGehG |
| 6 | **Login pro Nutzer** statt `APP_CODE` | 0 € | 1–2 Nachtschichten | vor Livegang | Widerruf, Mengenbegrenzung |
| 7 | Domain `zaehlerklar.de` sichern, DPMA-Recherche, Handle | wenige € | 1 h | schon in „Jetzt“ | Namensschutz-Grundlage |
| 8 | **Markenanmeldung** DPMA (nach Recherche und Go) | grob 290 € | 1 h | erst nach positivem Go/No-Go | Namen sichern, bevor er bekannt wird |
| 9 | Stand mit Datum archivieren (Git-Tag) | 0 € | 5 Min. | vor Livegang | Beweis |
| 10 | Patent/Gebrauchsmuster | – | – | **nicht** verfolgen | Software kaum schützbar |

**Reihenfolge laut [[Ideen-System]]:** Schutz-Infrastruktur geht nicht vor Validierung. Nur 2 und 3 (billig, kein Code) sollten *vor* dem ersten Testzugang stehen; 4–6 vor Livegang oder spätestens, wenn Fremde ins System kommen. Das steht im Widerspruch zu nichts in [[Validierung & Go-No-Go]].

## Offene Fragen für den Anwalt
- Trägt das Regelwerk als Geschäftsgeheimnis, wenn die Quellen öffentlich sind?
- Reicht eine NDA per Messenger/E-Mail oder braucht es Schriftform/Unterschrift?
- Rechte am Produkt bei Anstellung im Elektrohandwerk (Abschnitt 4).
- Haftungsbegrenzung in den Nutzungsbedingungen für eine Ersteinschätzung gegenüber Fachbetrieben (B2B).
- Reichen Nutzungsbedingungen mit Zustimmung bei der Registrierung, oder braucht es individuelle Verträge?
