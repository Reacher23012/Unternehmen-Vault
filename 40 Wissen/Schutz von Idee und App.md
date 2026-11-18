---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
thema: schutz
stand: 2026-11-18
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App

> **Keine Rechtsberatung.** Das ist eine Analyse aus allgemeinem Wissen, nicht von einem Anwalt geprüft. Alles mit 🔶 gehört vor einer Entscheidung zum Anwalt. Beträge und Paragrafen vor Verwendung nachprüfen.

Kurzfassung: **Eine Idee ist nicht schützbar. Schützbar sind Code, Name und – mit Aufwand – das Regelwerk als Geschäftsgeheimnis.** Das größte reale Risiko ist technisch: Das ganze Regelwerk steckt heute im Browser-Bundle. Der wirksamste Schutz ist Tempo, Netzwerk und echte Falldaten (siehe 5).

## 1. Was ist in Deutschland schützbar?
| Was | Schutz | Kosten | Einschätzung für Zählerklar |
|---|---|---|---|
| **Idee** („Foto → Einordnung Zählerplatz“) | keiner. Ideen sind frei, jeder darf sie nachbauen | 0 € | Nicht schützbar. Nur Vorsprung hilft. |
| **Code** (App, Edge Function) | Urheberrecht, entsteht automatisch (§§ 2, 69a ff. UrhG). Schützt die konkrete Umsetzung, **nicht** die Funktionsweise | 0 € | Schützt gegen 1:1-Kopie, nicht gegen Nachbau mit eigenem Code. |
| **Name „Zählerklar“** | Marke beim DPMA (Klassen 9, 42; ggf. 35/41). Wirkt erst mit Eintragung; sonst nur Kennzeichen-/Namensschutz durch Benutzung, schwächer | Anmeldung grob **290 €** (bis 3 Klassen, online), jede weitere Klasse grob 100 €; Schutz 10 Jahre. 🔶 aktuelle Gebühren im DPMA-Gebührenverzeichnis prüfen | Sinnvoll **nach** Recherche ([[ADR-0006 Produktname Zählerklar]]) und vor Livegang/Druck. Konflikte vorher klären (Recherche, ggf. Anwalt). |
| **Regelwerk R01–R26** (Auswahl, Verknüpfung, Texte) | als **Geschäftsgeheimnis** (GeschGehG): nur geschützt, wenn es **geheim** ist, wirtschaftlichen Wert hat **und angemessene Geheimhaltungsmaßnahmen** bestehen (§ 2 Nr. 1). Ohne Maßnahmen: kein Schutz. Teile davon (ggf. als Sammlung/Datenbank, §§ 87a ff. UrhG) 🔶 | 0 € + Aufwand | Einziger Hebel für den eigentlichen Vorsprung, aber nur wirksam, wenn technisch und vertraglich abgesichert (2, 3). |
| **Die Inhalte der Regeln selbst** | Die Fachaussagen stammen aus öffentlichen Quellen (TAB, BDEW-Musterwortlaut, Westnetz-Schulung, DIN/VDE-Fundstellen). Die Fakten sind frei, geschützt wäre allenfalls deine Auswahl und Aufbereitung | – | Ehrlich: Ein Konkurrent kann die Regeln aus denselben Quellen neu ableiten. Der Aufwand (Wochen) ist der Schutz, nicht das Recht. |
| **Patent** | Software „als solche“ ist nicht patentierbar (§ 1 Abs. 3 PatG); nötig wäre ein technischer Beitrag. | 4-stellig + Anwalt | Unrealistisch. Nicht verfolgen. |
| **Gebrauchsmuster** | keine Verfahren, Software als solche ebenfalls ausgeschlossen | ~ 40–100 € Amtsgebühr + Anwalt | Unrealistisch. Nicht verfolgen. |
| **Reverse Engineering** | nach GeschGehG grundsätzlich **erlaubt**, wenn jemand ein rechtmäßig erlangtes Produkt untersucht, **außer** es ist vertraglich ausgeschlossen (§ 3 Abs. 1 Nr. 2) 🔶 | – | Deshalb Nutzungsbedingungen mit Ausschluss (3). |

## 2. Technischer Befund: Regelwerk liegt im Browser
**Geprüft im Code (18.11.2026):**
- `web/src/regelwerk.ts` importiert `regeln.json` und enthält die Auslöse-Logik aller 26 Regeln als TypeScript. `main.ts` und `demo.ts` importieren daraus (`bewerte`). Vite packt beides ins JavaScript-Bundle der App.
- `regeln.json` enthält je Regel: Name, **Bedingung (Klartext)**, Maßnahme, Stufe, **Fundstelle**, Geltung, Status.
- Wer die App öffnen kann (hosted bei Netlify), kann das Bundle herunterladen und in Minuten das **komplette Regelwerk** lesen, ohne Login. Die Edge Function ist hier nicht beteiligt: Nur `POST /analyse` (Foto → KI) und die Fall-Routen liegen serverseitig und sind mit `x-app-code` geschützt.
- Ebenso: das Demo-Artifact (`build:demo`) enthält das Regelwerk; es ist privat auf claude.ai, aber der Link/Build sollte nicht weitergegeben werden.

**Bewertung:** Sobald die App öffentlich ist, ist das Regelwerk **nicht geheim im Sinne des GeschGehG** und praktisch frei kopierbar. 🔶 Wenn man es doch als Geheimnis behandeln will, wäre „Regeln im öffentlichen Bundle ausliefern“ ein starkes Argument gegen „angemessene Maßnahmen“. Der Schaden ist begrenzt (Fakten sind aus öffentlichen Quellen), aber das ist genau der Teil, der Arbeit gekostet hat.

**Lösungsskizze: Regelauswertung serverseitig**
1. Neue Route `POST /bewerte` in der Edge Function: Eingabe = die Eingaben (wie `Eingaben` in `modell.ts`), Ausgabe = Ampel, ausgelöste Maßnahmen mit Fundstelle, „Vor Ort klären“, Hinweise. Zugang wie `/analyse` nur mit Login/Code.
2. `regelwerk.ts` + `regeln.json` ziehen nach `supabase/functions/` (Deno). Nur noch dort. Im Web-Bundle bleiben die Typen (`modell.ts`) und die Anzeige.
3. Für Tests bleibt das Regelwerk testbar (Tests wandern mit; die 13 bestehenden Tests dürfen nicht verloren gehen). Sinnvoll: Regel-Modul framework-neutral halten und von Funktion **und** Test importieren; Deno kann nicht aus `web/` importieren → entweder Modul nach `supabase/functions/_shared/` verschieben und `web/` testet es per Relativimport, oder per Skript kopieren.
4. Demo-Build (`build:demo`) behält nur Beispieldaten und fest hinterlegte Beispiel-Ergebnisse, **nicht** das echte Regelwerk.
5. Offline: Ergebnis braucht dann Netz. Das widerspricht dem offenen Punkt „Offline-Modus“ (erst nach Go). Das Nachsenden von Fällen im Funkloch bleibt, nur die Ergebnisanzeige wartet. Auf der Baustelle ein echter Nachteil → mit den Kollegen fragen („Wie oft ohne Netz?“).

**Restrisiko, das bleibt:** Wer Zugang hat, kann das Regelwerk durch viele Probeanfragen Stück für Stück nachbauen (Black-Box-Extraktion). Gegenmittel: persönlicher Login statt gemeinsamer Zugangscode, Limit je Nutzer und Tag, Protokoll auffälliger Abfragen, Vertrag (3). Vollständig verhindern lässt sich das nicht.
**Zusätzlich offen:** Der gemeinsame `APP_CODE` lässt sich nicht einzelnen Testern entziehen → Login ist hier Voraussetzung (steht schon in „Irgendwann“, gehört dann vor die Kollegen-Tests).

## 3. Verträge
- **Geheimhaltung (NDA) für Tester/Kollegen:** ein kurzer Zweiseiter: Gegenstand (App, Regelwerk, Ergebnisse), Nutzung nur zum Testen, keine Weitergabe, keine Screenshots der Regeln, Rückgabe/Löschung, Dauer (z. B. 2–5 Jahre). Wichtig: Für das GeschGehG zählt, dass die Weitergabe **schriftlich/dokumentiert** auf Geheimhaltung verpflichtet ist. 🔶 Mustertext vom Anwalt prüfen; ein einseitiges „bitte nicht weitergeben“ per WhatsApp ist besser als nichts, aber schwach.
- **Testerliste führen:** Wer hat wann Zugang bekommen? (ohne Kundendaten im Vault, nur Name/Datum, Datenschutz beachten).
- **Nutzungsbedingungen (AGB light):** Nutzung nur für eigenen Betrieb, kein Kopieren, kein Scraping/automatisiertes Abfragen, **kein Reverse Engineering**, Zugangsdaten nicht teilen, Haftungs-/Hinweisklausel („ersetzt nicht die Prüfung durch die Fachkraft“). 🔶 AGB-Recht (Haftungsausschlüsse sind in Deutschland eng begrenzt) → Anwalt.
- **Zugang nur mit Login:** Bedingung dafür, dass Verträge und Limits überhaupt greifen.
- **Datenschutz:** Fotos gehen an Anthropic (USA) → in Hinweise, AV-Verträge dokumentieren ([[Rechtliches]]).

## 4. Arbeitgeber-Frage 🔶 (offen für Anwalt / Steuerberater)
Ich weiß nicht, ob und wo du angestellt bist (der Vault enthält dazu nichts Belegtes), und ob die Idee im Rahmen einer Anstellung entstanden ist. Die Fragen, die zu klären sind:
1. **Arbeitsvertrag/Tarifvertrag lesen:** Nebentätigkeit anzeigepflichtig oder genehmigungspflichtig? Wettbewerbsverbot, Verschwiegenheitsklausel, Klauseln zu Diensterfindungen/Rechten an Arbeitsergebnissen?
2. **Wettbewerb:** Während des Arbeitsverhältnisses darf man dem Arbeitgeber grundsätzlich keine Konkurrenz machen. Wäre ein Elektrobetrieb Kunde der App, ist das nicht automatisch Wettbewerb. Fällt die App nahe an das Geschäft des Arbeitgebers (Zählerschrank-Beurteilung für Netzbetreiber-Anträge), ist es heikler.
3. **Wem gehört der Code?** Für Software gilt § 69b UrhG: Was ein Arbeitnehmer **in Wahrnehmung seiner Aufgaben oder nach Weisung** schafft, gehört dem Arbeitgeber (Nutzungsrechte). In der Freizeit, ohne Arbeitsmittel und außerhalb der Aufgaben: grundsätzlich bei dir. 🔶 Grenzfälle (Wissen aus dem Beruf, Fotos von Kundenschränken, Firmen-Schulungen) klären.
4. **Wissen aus der Arbeit:** Das Regelwerk basiert auf Fachwissen, Westnetz-Schulung (09/2025) und Excel. Wurde die Schulung vom Arbeitgeber bezahlt und gibt es Unterlagen mit Vertraulichkeitsvermerk? Dann besteht ein Risiko bei der Nutzung. Fundstellen aus öffentlichen TAB sind unkritisch.
5. **Arbeitnehmererfindungsgesetz:** gilt nur für patent-/gebrauchsmusterfähige Erfindungen, bei Software kaum relevant. Trotzdem im Gespräch ansprechen.
6. **Kundendaten/Fotos:** Fotos von Schränken mit Kundenbezug dürfen nicht ohne Weiteres verwendet werden (Adresse, Name, Zählernummer; schon in den Aufgaben so festgehalten).
**Vorschlag:** Vertragsunterlagen heraussuchen, Frage 1 selbst beantworten, den Rest in **einer** anwaltlichen Erstberatung (Verbraucher-Erstberatung ist gesetzlich gedeckelt, grob 190 € netto, 🔶 prüfen) mit Arbeitsrecht-/IT-Recht-Schwerpunkt. Steuerberater: Nebengewerbe, Anmeldung, Kleinunternehmerregelung.

## 5. Realistischer Schutz: Tempo, Netzwerk, Daten
Rechtlich bleibt nur wenig Hartes. Der echte Burggraben, falls es ihn gibt:
- **Vorsprung in Monaten:** Erster mit funktionierender App im Westnetz-Gebiet. Jede Woche ohne Gespräche kostet Vorsprung → Vorrang bleibt die Validierung ([[2026-10-02 Ideen-Check]]).
- **Netzwerk:** Direktansprache, Innung, Handwerkskammer ([[ADR-0005 Direktansprache vor Instagram]]). Kollegen wechseln nicht wegen einer Kopie, wenn sie dir vertrauen.
- **Daten aus echten Fällen:** Foto + Korrektur + tatsächliche Entscheidung (Trefferquote). Das lässt sich nicht aus öffentlichen Quellen abschreiben und verbessert Erkennung und Regeln. Kundendaten- und Datenschutzfragen vorher sauber klären.
- **Fachliche Pflege:** TAB ändern sich (BDEW-Musterwortlaut 2026): wer das Regelwerk pflegt, ist vorn. Das ist ein Argument für Abo statt Einmalkauf.
- **Marke/Name** erst wenn die Idee Zug hat, nicht vorher Geld ausgeben.
- **Was bewusst öffentlich ist:** Instagram-Rätsel und Flyer zeigen Teile des Fachwissens. Das ist gewollt (Reichweite). Regel: **Teaser ja, vollständige Regeltabelle nie.** In Posts nur einzelne Fälle, keine Gesamtlogik.

**Ehrlich:** Wer die App kopieren will, kann es mit genug Aufwand. Schutz heißt hier: Kopieren teuer und riskant machen (Vertrag, Technik) und schneller sein. Wer Zählerschränke und TAB-Details nicht kennt, kopiert auch nicht fehlerfrei.

## 6. Priorisierte Maßnahmenliste
| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | Arbeitsvertrag lesen, Nebentätigkeit/Wettbewerb/Rechte klären (4); bei Unklarheit Erstberatung | 0 bis grob 190 € netto + USt | 1–2 h | **vor** Kollegen-Tests |
| 2 | Tester-Regeln: schriftliche Geheimhaltung (kurzer Zweiseiter) + Testerliste | 0 € (Anwaltsprüfung optional) | 2 h | vor dem Mittesten |
| 3 | Kein Regelwerk in öffentliche Dokumente/Posts (Teaser-Regel, Demo prüfen) | 0 € | 30 Min | sofort |
| 4 | **Regelwerk serverseitig** (Code-Aufgabe, siehe `Aufgaben.md`) | 0 € (Nachtschicht möglich) | ~ 1 Nacht | vor öffentlichem Hosting |
| 5 | Login statt Zugangscode, Limit je Nutzer | 0 € Supabase Auth | 1–2 Nächte | vor Kollegen-Tests |
| 6 | Nutzungsbedingungen (Kopier-/Reverse-Engineering-Verbot) | Anwaltsprüfung grob 100–300 € 🔶 | 2–3 h | vor Livegang |
| 7 | Name sichern: DENIC, DPMA-Recherche, dann Markenanmeldung | grob 290 € + Recherche | 2 h | nach Recherche, vor Druck |
| 8 | Entstehung dokumentieren (Git-Historie, Excel-Original, Datum) – Beleg für Urheberschaft/Besitz | 0 € | 30 Min | laufend |
| 9 | Geheimhaltungsmaßnahmen dokumentieren (wer hat Zugang, was ist geheim) | 0 € | 1 h | mit 2 |

Offen für Anwalt 🔶: Arbeitgeber-Frage, NDA-Mustertext, Nutzungsbedingungen, ob das Regelwerk als Geschäftsgeheimnis/Datenbank tragfähig ist, Markenrisiko „Zählerklar“.

Siehe [[Zählerschrank-Check]], [[Rechtliches]], [[App & Technik]], [[Mein Vorteil]], [[Validierung & Go-No-Go]].
