---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-10-17
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App („Zählerklar“)

> Analyse der Nachtschicht vom 17.10.2026. **Keine Rechtsberatung.** Alles mit ⚖️ ist unsicher und vom Anwalt zu prüfen. Kosten sind Größenordnungen, nicht recherchiert.

**Kurzfassung:** Die *Idee* ist nicht schützbar. Schützbar sind Code (automatisch), Name (Marke) und das Regelwerk – Letzteres nur, wenn es wirklich geheim gehalten wird. **Genau das ist heute nicht der Fall:** das ganze Regelwerk steckt im App-Bundle. Der größte Hebel ist aber ohnehin Tempo und Nähe zu den Kollegen, nicht Recht.

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Voraussetzung / Haken | Kosten |
|---|---|---|---|
| **Idee** („Foto → Zählerschrank-Einschätzung“) | **keiner** | Ideen sind frei. Nachbauen ist erlaubt. | 0 € |
| **Quellcode, Texte, Gestaltung** | Urheberrecht (§ 69a UrhG für Software) | entsteht automatisch; schützt nur vor *Kopieren*, nicht vor Nachbauen mit eigenem Code. Beweis über Git-Historie (Zeitstempel) | 0 € |
| **Name „Zählerklar“** | Marke (DPMA), Klassen 9/42 (ggf. 35) | Recherche zuerst (offen aus [[ADR-0006 Produktname Zählerklar]]); beschreibende Namen können abgelehnt werden. Ohne Anmeldung nur schwacher Schutz | DPMA-Gebühr ca. 290 € für 3 Klassen (Stand Wissen, vor Anmeldung prüfen) + ggf. Anwalt |
| **Regelwerk R01–R26** (Auswahl, Schwellen, Verknüpfung) | Geschäftsgeheimnis (GeschGehG) | nur wenn *wirtschaftlicher Wert durch Geheimhaltung* **und** „angemessene Geheimhaltungsmaßnahmen“ (§ 2 Nr. 1 GeschGehG). Öffentliche Norm-/TAB-Inhalte selbst sind nicht geheim; schützbar ist eher die **Zusammenstellung und Auslegung** ⚖️ | 0 € + Aufwand für Maßnahmen |
| **Regelwerk als Datenbank/Text** | ggf. Datenbankschutz / Urheberrecht | Schöpfungshöhe unsicher ⚖️; die Fundstellen stammen aus fremden Unterlagen (BDEW, Westnetz) | – |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist ausgeschlossen (§ 1 PatG); nur bei technischem Beitrag | für diese Art App unrealistisch, teuer, Veröffentlichung erforderlich | Patent mehrere Tsd. €, Gebrauchsmuster ca. 40 € + Anwalt |

Wichtig: Fremde Inhalte (TAB, Normtexte, Westnetz-Schulung) dürfen laut [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]] nicht übernommen werden, nur Fundstellen. Das gilt auch umgekehrt: Was ich nur *zusammenfasse*, ist schwer als eigenes Geheimnis zu verteidigen.

## 2. Technischer Befund: Regelwerk liegt im Browser
**Geprüft im Code (`zaehlerschrank-check`, Stand 17.10.2026):**
- `web/src/regelwerk.ts` importiert `./regeln.json` (14 KB, alle 26 Regeln mit Bedingung, Maßnahme, Stufe, **Fundstelle**, Geltung, Status) und enthält die komplette Auswertungslogik (`ausgeloesteRegeln`, Schwellen wie 4,2 kW / 4,6 kW / 12 kW, 50 A).
- Vite bündelt beides ins JavaScript der App. Jeder, der die App aufrufen kann, kann Bundle oder Netzwerk-Tab öffnen und das **gesamte Regelwerk lesen und kopieren** – ohne Reverse Engineering, nur „Quelltext anzeigen“.
- Der Zugangscode (`APP_CODE`) schützt nur die Backend-Funktionen (Analyse, Fälle), **nicht** die statischen App-Dateien. Die App-Auslieferung selbst ist öffentlich, sobald sie bei Netlify liegt. Auch das Demo-Build (`dist-artifact`) enthält alles.

**Risikobewertung:**
- *Wahrscheinlichkeit, dass es jemand kopiert:* heute gering (kein Livegang, kein Markt). Mit Erfolg steigt sie.
- *Schaden:* mittel. Das Regelwerk ist laut [[Zählerschrank-Check]] ein Teil des Vorsprungs (Score „Vorsprung 5“). Die Regeln selbst sind aber aus öffentlichen Unterlagen abgeleitet; ein Wettbewerber könnte sie mit Fachwissen ohnehin nachbauen. Der Aufwand ist Wochen, nicht Jahre.
- *Rechtlich:* ein offen ausgeliefertes Regelwerk ist kaum noch als Geschäftsgeheimnis zu halten („angemessene Maßnahmen“ fehlen) ⚖️. Vor dem Livegang bzw. vor dem Test mit Fremden sollte das geändert werden, sonst ist der Schutz faktisch aufgegeben.

**Lösungsskizze „Regelwerk serverseitig“:**
1. `regeln.json` und Auswertung (`ausgeloesteRegeln`, Ergebnis-/Maßnahmenbildung) wandern in die Edge Function `api` (neue Route, z. B. `POST /auswerten` mit `x-app-code`).
2. Die App schickt nur die **Eingaben** (Felder aus `modell.ts`) und bekommt **Ergebnis + Maßnahmentexte + Fundstelle** der *ausgelösten* Regeln zurück. Nicht ausgelöste Regeln, Schwellen und Bedingungstexte verlassen den Server nie.
3. Der Client zeigt nur das Ergebnis. Die Tests (`regelwerk.test.ts`) laufen weiter gegen dasselbe Modul, das auch die Function nutzt (gemeinsamer Code oder Kopie mit Test).
4. Demo-Build (`build:demo`) bekommt eine **gekürzte Beispielauswertung**, kein echtes Regelwerk.
5. Folgekosten/Grenzen: Funkloch-Fähigkeit sinkt (heute läuft die Auswertung offline, der Offline-Modus ist eh „nach Go“); jede Auswertung ist ein Request; Ergebnis bleibt trotzdem *einzeln* abfragbar – ein Angreifer mit gültigem Code kann durch viele Abfragen das Regelwerk **ausspähen**. Dagegen: Zugang nur mit Login/Code pro Nutzer, Rate-Limit, Protokoll auffälliger Abfragemuster. Vollständig verhindern lässt es sich nicht.
6. Aufwand: ca. 1 Nachtschicht (Code verschieben, Route, Client umstellen, Tests); kein Geld. Vorab-Entscheidung nötig, ob Auswertung offline wichtig ist (Baustelle ohne Netz!) – das kollidiert mit dem Schutz. Mein Vorschlag: online-Auswertung ist für den Test mit Kollegen akzeptabel, da die KI-Analyse ohnehin Netz braucht.

## 3. Verträge und Zugang
- **NDA für Tester/Kollegen (⚖️ Muster vom Anwalt/Kammer):** kurz, einseitig, Gegenstand = Regelwerk, Ergebnisse, Zugangsdaten; Vertragsstrafe nicht ohne Anwalt. Realistisch: Kollegen im Handwerk unterschreiben ungern NDAs; ein Hinweis in den Nutzungsbedingungen ist niedrigschwelliger. NDA nur für wenige, enge Tester.
- **Nutzungsbedingungen in der App:** kein Kopieren, Auslesen (Scraping), Weitergabe des Zugangs, kein Reverse Engineering; Ergebnisse nur zur eigenen Auftragsbearbeitung. Verknüpfen mit dem Haftungshinweis aus [[Rechtliches]]. Müssen vor Nutzung bestätigt werden (Checkbox), sonst wenig wert ⚖️ (AGB-Recht, B2B).
- **Zugang nur mit Login:** passt zu „Login statt Zugangscode, bevor Kollegen testen“ (Aufgabe „Irgendwann“). Ein gemeinsamer Zugangscode ist kein „angemessenes Geheimhaltungskonzept“, weil er weitergegeben wird. Pro Tester ein eigener Zugang (widerrufbar) ist besser und zeigt, wer ein Leck war.
- **Betrieb:** Zugriffe protokollieren, Code bei Verdacht ändern, Tester-Liste führen (wer wann welchen Stand).

## 4. Arbeitgeber-Frage (offen, ⚖️ Anwalt/Steuerberater)
Wem gehört die Idee, wenn sie im Rahmen einer Anstellung im Elektrohandwerk entstanden ist? Ich kann das nicht entscheiden, nur die Fragen sortieren:
- **Arbeitsvertrag lesen:** Klauseln zu Nebentätigkeit (Anzeige-/Genehmigungspflicht), Wettbewerbsverbot, Verschwiegenheit, Rechteübertragung.
- **Nebentätigkeit:** Auch ohne Klausel gilt während des Arbeitsverhältnisses ein Wettbewerbsverbot (§ 60 HGB analog bei Handelsgehilfen; im Handwerk über Treuepflicht). Ob eine *Software für Kollegen* „Wettbewerb“ zum Arbeitgeber ist, hängt davon ab, ob der Arbeitgeber Zählerplatz-Beratung/Prüfung anbietet ⚖️.
- **Arbeitnehmererfindung / Diensterfindung:** ArbnErfG gilt für patent-/gebrauchsmusterfähige Erfindungen; reine Software-Ideen meist nicht. Für **Urheberrecht an Software** gilt § 69b UrhG: Was ein Arbeitnehmer *in Erfüllung seiner Pflichten oder nach Weisung* schreibt, gehört dem Arbeitgeber. Bei eigener Freizeit-Entwicklung ist es meist beim Entwickler, aber **Fachwissen und Fälle aus der Arbeit** (Kundenschränke, interne Unterlagen, Schulungsmaterial des Arbeitgebers) sind heikel ⚖️.
- **Konkret vermeiden, bis geklärt:** Fotos/Fälle von Kundenschränken des Arbeitgebers ohne Erlaubnis in die App laden; Unterlagen des Arbeitgebers (interne Schulungen, Preislisten) als Quelle nutzen; Arbeitszeit/-geräte für das Projekt.
- **Frage an den Anwalt:** „Ich entwickle in der Freizeit eine Software, die Elektrikern Zählerschränke einschätzt. Mein Arbeitgeber ist ein Elektrobetrieb. Brauche ich eine Genehmigung/Freigabe, und wie sichere ich mir die Rechte schriftlich ab?“ Eine schriftliche Freigabe/Verzichtserklärung des Arbeitgebers wäre die sauberste Lösung. Auch Steuerberater: Gewerbeanmeldung, Nebengewerbe.
*Offen in [[Mein Vorteil]]: Anstellung/Selbstständigkeit ist dort nicht eingetragen; bitte ergänzen.*

## 5. Realistischer Schutz: Tempo und Nähe
Rechtlich ist hier wenig sicher. Dauerhaft tragen andere Dinge:
- **Vorsprung:** Regelwerk steht, Name steht, Gespräche laufen. Ein Nachbauer braucht Fachwissen *und* Zugang zu den Kollegen.
- **Netzwerk:** Innung, Großhändler, WhatsApp-Gruppen → [[Direktansprache]]. Das kopiert niemand per Download.
- **Daten aus echten Fällen:** Trefferquote, korrigierte Erkennung, Entscheidungen der Elektriker ([[App & Technik]]). Das wird mit jedem Fall besser und ist der eigentliche Burggraben – **nicht** die 26 Regeln.
- **Pflege:** Netzbetreiber-TABs ändern sich (Westnetz 2026). Wer sie laufend nachzieht, ist vorn.
- **Kritisch gesehen:** Zu viel Geheimniskrämerei kostet bei der Validierung Tempo. Ohne Zahlungsbereitschaft nützt auch der perfekte Schutz nichts ([[Validierung & Go-No-Go]]).

## 6. Maßnahmenliste (priorisiert)
| # | Maßnahme | Wann | Kosten | Aufwand |
|---|---|---|---|---|
| 1 | **Arbeitsvertrag lesen, Anwalt-/Kammerfrage Arbeitgeber** (Abschnitt 4) | **vor** Livegang/Fremden-Test | Erstberatung ca. 0–250 € ⚖️ | 1–2 Std. |
| 2 | **Regelwerk serverseitig** (Abschnitt 2) | vor dem Mittesten mit Kollegen | 0 € | ca. 1 Nachtschicht |
| 3 | **Pro-Tester-Zugang statt gemeinsamem Code** + Nutzungsbedingungen mit Bestätigung | vor Mittesten | 0 € (Supabase Auth) | 1–2 Nachtschichten |
| 4 | **Name prüfen**: DENIC, DPMA-Recherche, ggf. Marke anmelden | vor Druck/Livegang | Recherche 0 €, Anmeldung ca. 290 € | 1 Std. + Anmeldung |
| 5 | **NDA-Muster** für wenige enge Tester besorgen (Kammer/Anwalt) | optional, bei Bedarf | 0–150 € | 1 Std. |
| 6 | Git-Historie bewahren (Zeitstempel als Urheberbeweis), Repo privat lassen | läuft | 0 € | – |
| 7 | Fotos/Fälle nur eigene bzw. mit Erlaubnis, keine Arbeitgeber-Unterlagen als Quelle | sofort | 0 € | – |
| 8 | Patent/Gebrauchsmuster | **nicht empfohlen** | hoch | – |

Reihenfolge-Hinweis nach [[Ideen-System]]: Das ist Infrastruktur. **Die Gespräche (Validierung) haben weiter Vorrang**; Punkt 1 und 7 kosten aber kaum Zeit und sollten trotzdem zuerst passieren.

## Offen / vom Anwalt zu prüfen ⚖️
- Reicht die Zusammenstellung der Regeln für „Geschäftsgeheimnis“, wenn Einzelregeln aus öffentlichen TABs stammen?
- Arbeitgeber-Frage (Abschnitt 4).
- Wirksamkeit der Nutzungsbedingungen / eines NDAs im B2B-Test.
- Markenanmeldung: Klassen und Unterscheidungskraft von „Zählerklar“.
