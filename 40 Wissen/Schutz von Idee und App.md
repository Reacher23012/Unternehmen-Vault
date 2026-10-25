---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-10-08
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App („Zählerklar“)

> **Keine Rechtsberatung.** Alles, was mit *„→ Anwalt“* markiert ist, ist unsicher und muss geprüft werden. Zurück zu [[Zählerschrank-Check]], Rechtliches: [[Rechtliches]].

**Kurzfazit:** Die *Idee* ist nicht schützbar. Wert liegt im **Regelwerk (R01–R26, Know-how)**, in den **echten Falldaten**, im **Namen** und im **Tempo**. Das Regelwerk liegt aktuell aber **komplett im Browser des Nutzers** – das ist die größte technische Lücke und mit überschaubarem Aufwand schließbar. Die größte *rechtliche* Unsicherheit ist die **Arbeitgeber-Frage**.

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Praxis für uns |
|---|---|---|
| **Die Idee** („Foto → Maßnahmenliste“) | keiner. Ideen sind frei, auch Geschäftsideen | Nicht verhinderbar. Nur Tempo und Umsetzung zählen |
| **Quellcode, Texte, Grafiken** | Urheberrecht (UrhG, §§ 69a ff. für Software) entsteht automatisch, ohne Anmeldung. Schützt gegen Kopieren, **nicht** gegen Nachbauen mit eigenem Code | Git-Verlauf als Nachweis der Urheberschaft aufbewahren. Copyright-Hinweis im Footer |
| **Name „Zählerklar“** | Marke (MarkenG) nur durch Eintragung beim DPMA (Anmeldegebühr ab ca. 290 € für 3 Klassen, bei Online-Anmeldung; Schutz 10 Jahre; Stand: bitte aktuell prüfen). Ohne Eintragung nur schwacher Schutz durch Benutzung. Beschreibende Namen können abgelehnt werden („Zähler…klar“ ist vermutlich unterscheidungskräftig genug, **→ Anwalt/Recherche**) | Erst Recherche (DPMA, EUIPO, Domain), dann Anmeldung. Ist bereits als Aufgabe offen → [[ADR-0006 Produktname Zählerklar]] |
| **Regelwerk, Logik, Falldaten** | **Geschäftsgeheimnis** nach GeschGehG – aber nur, wenn es *geheim* ist **und** „angemessene Geheimhaltungsmaßnahmen“ bestehen (§ 2 Nr. 1). Ohne Maßnahmen: kein Schutz | Das ist der eigentliche Hebel. Heißt konkret: technisch nicht frei ausliefern, vertraglich binden (Abschnitt 2 und 3) |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist nicht patentierbar; technische Lösungen mit technischem Effekt manchmal. Regeln aus TAB/Normen sind Wissen, keine Erfindung. Kosten für Patent fünfstellig inkl. Anwalt | **Nicht lohnend.** Nicht weiterverfolgen, außer ein Anwalt sieht einen konkreten technischen Kern |
| **Normen/TAB-Texte** | Normen (DIN/VDE) sind urheberrechtlich geschützt | Wir übernehmen nur Fundstellen (ADR-0001) – das schützt *uns* vor Ärger |
| **Datenbank (Regeln, Fälle)** | Datenbankherstellerrecht (§§ 87a ff. UrhG) bei wesentlicher Investition – für 26 Regeln eher dünn | nicht darauf verlassen |

## 2. Technischer Befund: Regelwerk steckt im App-Bundle
**Befund (im Code geprüft, 08.10.2026):**
- `web/src/regeln.json` (26 Regeln, ca. 14 KB: Name, Bedingung, Maßnahme, Fundstelle, Geltung, Status) wird von `web/src/regelwerk.ts` per `import` eingebunden, und die Auswertung (`ausgeloesteRegeln`) läuft **im Browser**. Dasselbe gilt für `demo.ts`/`main.ts`.
- Folge: Wer die App-Adresse kennt, kann Bundle oder Quelltext im Browser lesen und hat **das komplette Regelwerk** inklusive Bedingungen und Fundstellen. Minifizierung ist kein Schutz.
- Heute begrenzt zwei Dinge das Risiko: die App ist noch **nicht öffentlich gehostet**, und der Zugang läuft nur über Zugangscode für die Fälle-Daten. Das **Bundle selbst** ist aber nach dem Hosting (Netlify) für jeden abrufbar, der die URL hat – der Zugangscode schützt nur die API, nicht die Auslieferung des Codes.
- Auch das private Demo-Artifact auf claude.ai enthält das Regelwerk (nur für freigeschaltete Nutzer sichtbar, aber nicht weitergeben).

**Bewertung:**
| Risiko | Einschätzung |
|---|---|
| Kopie des Regelwerks durch Wettbewerber/Kollegen | **mittel bis hoch**, sobald App öffentlich ist; Aufwand für Angreifer: Minuten |
| Rechtliche Folge | ohne Geheimhaltungsmaßnahmen sehr wahrscheinlich **kein Geschäftsgeheimnis** mehr → schwacher Schutz; **→ Anwalt** |
| Wirtschaftliche Folge | das Regelwerk ist der „Vorsprung = 5“ im Score ([[Zählerschrank-Check#Score (vorläufig, 03.10.2026)]]). Aber: Die Regeln beruhen auf öffentlicher TAB/Norm, abschreibbar mit Fachwissen; der Wert liegt eher in Aufbereitung + Validierung als in Geheimnis |

**Lösungsskizze: Auswertung serverseitig**
1. `regeln.json` und die Logik aus `regelwerk.ts` wandern in die Edge Function (`supabase/functions/api`), neue Route z. B. `POST /auswerten` (Header `x-app-code` wie bisher).
2. App sendet nur die **Eingaben** (Schrank-Felder + Vorhaben). Antwort: Ampel, ausgelöste Regel-IDs, Maßnahmentext, **Fundstelle** und „Vor Ort klären“ samt Worst-Case-Ergebnis. Nicht ausgeliefert werden: Bedingungslogik, nicht ausgelöste Regeln, Gesamtliste.
3. Tests: die vorhandenen 13 Regelwerk-Tests laufen weiter gegen dieselbe Logik (gemeinsames Modul, das beide Seiten importieren können, oder Kopie in `supabase/functions/_shared/`, damit Deno sie lädt).
4. Offline/Funkloch: ohne Verbindung keine Auswertung (Fall wird gespeichert, Auswertung später) – bewusster Kompromiss, vorhandenes Nachsenden deckt das teilweise ab.
5. **Grenzen:** Wer viele Eingabekombinationen ausprobiert, kann Regeln durch Abfragen rekonstruieren („Black-Box-Abfrage“). Gegenmittel: Login pro Nutzer, Rate-Limit, Protokoll auffälliger Abfragen, Nutzungsbedingungen. Vollständig verhindern lässt es sich nicht – es hebt aber die Hürde von „Minuten“ auf „aufwendig + vertragswidrig + nachweisbar“.
6. Demo-Build (`build:demo`) enthält weiter Beispieldaten; dort nur einen **Ausschnitt** des Regelwerks verwenden oder nur ein festes Beispielergebnis zeigen.
7. Aufwand grob: **ein halber bis ein Tag** Code + Tests; keine neue Abhängigkeit.

**Wichtig:** Vor Veröffentlichung der App umsetzen oder die App nur mit Login bereitstellen – danach lässt sich Veröffentlichtes nicht zurückholen. Die Landingpage enthält kein Regelwerk (nur Beschreibung) und kann vorher online gehen.

## 3. Verträge und Zugang
| Maßnahme | Inhalt | Status |
|---|---|---|
| **NDA für Tester/Kollegen** | kurze Geheimhaltungsvereinbarung: Regelwerk, Funktionsweise, Ergebnisse vertraulich; keine Weitergabe; Rückgabe/Löschung; Vertragsstrafe nur mit Anwalt formulieren. Vorlage für Einzelpersonen reicht; **Wortlaut → Anwalt** (AGB-Recht, Vertragsstrafe) | offen. Wichtig: Nicht vor Gesprächen verlangen, die nur das Problem erkunden – ein NDA schreckt Gesprächspartner ab. Erst vor dem **Mittesten** |
| **Nutzungsbedingungen** | Nutzung nur für eigene Aufträge, kein Kopieren, kein Auslesen/Reverse Engineering, keine automatisierten Abfragen, keine Weitergabe des Zugangs; Haftungsklarstellung (Ersteinschätzung, Prüfung durch Errichter) | offen, **→ Anwalt/Generator prüfen lassen**, mit [[Rechtliches]] bündeln |
| **Zugang nur mit Login** | pro Person Konto statt geteiltem `APP_CODE`; Zugang widerrufbar, Nutzung protokolliert. Das macht Nachweise (wer hat abgerufen?) und Sperren möglich | steht schon als Aufgabe „Login statt Zugangscode“ unter Irgendwann – **durch den Schutz höher zu priorisieren, aber nach den Gesprächen** |
| **Geheimhaltungsmaßnahmen dokumentieren** | kurze Liste: wer hat Zugriff, was ist geheim, wie geschützt. Das braucht man als Nachweis für „angemessen“ | Teil dieser Notiz (Abschnitt 6) |

## 4. Arbeitgeber-Frage (offen → Anwalt/Steuerberater)
Wenn die Idee oder das Regelwerk **im Rahmen einer Anstellung im Elektrohandwerk** entstanden ist, könnte der Arbeitgeber Ansprüche haben. **Ich kann das nicht beurteilen; Annahmen unten sind nur Prüfpunkte.**
- **Arbeitnehmererfindung (ArbnErfG):** gilt für patent-/gebrauchsmusterfähige Erfindungen; bei Software und Regelwissen eher selten einschlägig, **aber** „Diensterfindung“ kann dem Arbeitgeber zustehen.
- **Urheberrecht an Software (§ 69b UrhG):** Programme, die ein Arbeitnehmer **in Wahrnehmung seiner Aufgaben oder nach Anweisung** schafft, nutzt grundsätzlich der Arbeitgeber. Frage: Wurde der Code in der Arbeitszeit, mit Firmenmitteln oder als Teil der Aufgaben erstellt? Hier privat in der Freizeit, auf eigenen Geräten → vermutlich unkritisch, **bestätigen lassen**.
- **Wettbewerbsverbot / Nebentätigkeit:** Während des Arbeitsverhältnisses besteht ein Wettbewerbsverbot (§ 60 HGB analog); Nebentätigkeit kann **anzeigepflichtig oder genehmigungspflichtig** sein (Arbeitsvertrag, Tarifvertrag). Zielgruppe sind Elektrobetriebe – möglicherweise der eigene Arbeitgeber oder dessen Wettbewerber. **Kritisch prüfen.**
- **Betriebsgeheimnisse/Wissen:** Regeln aus der Arbeit (Know-how, Kundenfälle, interne Unterlagen) dürfen nicht ohne Weiteres in ein Produkt fließen. Fotos von Kundenschränken aus dem Job sind **tabu** (Datenschutz + Betriebsgeheimnis).
- **Fragen an den Anwalt:** (1) Arbeitsvertrag/Tarifvertrag auf Nebentätigkeit, Wettbewerb, Erfindungen prüfen; (2) Muss ich den Arbeitgeber informieren, bevor ich Kollegen anspreche/verkaufe? (3) Wem gehört, was ich vor Beginn der Firmengründung erarbeitet habe? (4) Schriftliche Freigabe sinnvoll?
- **Passend zu offenen Punkten in** [[Mein Vorteil]] (Stunden, Budget, No-Gos): Rahmen dort ergänzen.

## 5. Realistischer Schutz: Tempo statt Mauer
Auch mit allen Maßnahmen lässt sich ein Nachbau durch jemanden mit Fachwissen nicht verhindern. Der tragfähige Vorsprung:
1. **Zeit bis zum Markt:** Validierung läuft, erste zahlende Kollegen vor Nachahmern gewinnen.
2. **Netzwerk:** Zugang zu Kollegen im Westnetz-Gebiet, Innung, HWK (→ [[Direktansprache]]).
3. **Daten aus echten Fällen:** jede erfasste Entscheidung („Deine tatsächliche Entscheidung“) verbessert Regelwerk und Erkennung und ist von außen nicht kopierbar. Deshalb ist der **Falldaten-Speicher** wertvoller als der Regeltext. (Datenschutz: keine Adressen/Namen/Zählernummern in Fotos und Bemerkungen.)
4. **Marke und Vertrauen:** wer „Zählerklar“ kennt und der Quelle traut, wechselt nicht wegen einer Kopie.
5. **Pflege:** Regelwerk aktuell halten (neue TAB 2026, Netzbetreiber-Vorgaben) – eine kopierte Version veraltet.

## 6. Priorisierte Maßnahmenliste
| Prio | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | **Arbeitgeber-/Vertragsfrage klären** (Anwalt, Erstberatung) | ca. 100–300 € (Schätzung) | 1–2 h | **vor** Verkauf/Mittesten |
| 2 | **Regelwerk serverseitig** (Edge Function, nur Ergebnis + Fundstelle) | 0 € | ½–1 Tag Code | **vor** öffentlichem Hosting der App |
| 3 | **NDA + Nutzungsbedingungen** (Tester, später Kunden), prüfen lassen | 0 € Entwurf, ca. 100–300 € Prüfung (Schätzung) | 2–3 h | vor Mittesten |
| 4 | **Login pro Person** statt gemeinsamer Zugangscode, Rate-Limit | 0 € | 1–2 Tage | vor Kollegen-Test (steht schon unter „Irgendwann“) |
| 5 | **Namensrecherche + DPMA-Anmeldung** „Zählerklar“ | ab ca. 290 € (bitte prüfen) | 2 h Recherche | nach Go/ bei ersten Zahlen; Recherche jetzt |
| 6 | Copyright-Hinweis, Git-Verlauf bewahren, Zugriffsliste führen | 0 € | 30 Min | sofort |
| 7 | Demo-Build auf Ausschnitt reduzieren | 0 € | 1 h | vor Weitergabe der Demo |
| – | Patent / Gebrauchsmuster | fünfstellig | – | **nicht** verfolgen |

**Nicht vergessen:** Vor allem Prio 1 und 2 decken das größte Risiko ab. Alles zum Gesprächsleitfaden und den Validierungs-Aufgaben behält Vorrang ([[2026-10-02 Ideen-Check]]) – diese Maßnahmen sind **kein Grund, die 5 Gespräche zu verschieben**.

## Offene Fragen (→ Anwalt/Steuerberater)
- [ ] Arbeitsvertrag/Tarif: Nebentätigkeit, Wettbewerb, Erfindungen, Software
- [ ] Reicht ein Login-geschütztes, serverseitig ausgewertetes Regelwerk als „angemessene Geheimhaltungsmaßnahme“ nach GeschGehG?
- [ ] Marke „Zählerklar“: Unterscheidungskraft, Verwechslungsgefahr, Klassen
- [ ] NDA/Nutzungsbedingungen: Wortlaut, Vertragsstrafe, AGB-Konformität
- [ ] Haftung für Ersteinschätzung (Errichterverantwortung)
