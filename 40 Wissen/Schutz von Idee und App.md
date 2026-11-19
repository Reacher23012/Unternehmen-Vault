---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
thema: schutz
stand: 2026-11-19
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App („Zählerklar“)

> **Analyse, keine Rechtsberatung.** Alles, was mit **⚖ Anwalt** markiert ist, ist unsicher und muss vor einer Entscheidung geprüft werden. Kosten sind grobe Größenordnungen aus dem Gedächtnis und vor Ausgabe nachzuprüfen. Entstanden als Nachtschicht-Aufgabe, siehe [[2026-11-19 Nachtschicht]]. Bezug: [[Zählerschrank-Check]], [[App & Technik]], [[Rechtliches]], [[Mein Vorteil]].

**Kurzfazit:** Die *Idee* ist nicht schützbar, und der Code ist zwar urheberrechtlich geschützt, aber ein Konkurrent muss ihn gar nicht kopieren. Der eigentliche Wert ist das **Regelwerk R01–R26 samt Fundstellen** ([[Regelwerk R01–R26]]). Das liegt heute **vollständig lesbar im Browser jedes Nutzers** (Abschnitt 2). Das ist die wichtigste Lücke und mit überschaubarem Aufwand zu schließen. Den größten realistischen Schutz liefern Tempo und echte Falldaten (Abschnitt 5).

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz? | Wie / Einschränkung | Aufwand |
|---|---|---|---|
| **Die Idee** („Foto → Einordnung Zählerschrank“) | **Nein** | Ideen sind frei. Wer Ähnliches baut, verletzt nichts. | – |
| **Quellcode** (Web-App, Edge Function) | **Ja, automatisch** | Urheberrecht für Computerprogramme (§§ 69a ff. UrhG), keine Anmeldung. Schützt nur vor *Kopieren* des Codes, nicht vor Nachbau mit eigenem Code. Nachweis: Git-Historie (Zeitstempel) aufheben. | 0 € |
| **Name „Zählerklar“** | Nur mit **Marke** | Eintragung beim DPMA (Wortmarke, Klassen 9 und 42, vgl. [[ADR-0006 Produktname Zählerklar]]). Vorher Recherche auf Verwechslungsgefahr. Reiner Beschreibungsanteil („Zähler“) ist schwach, die Wortkombination kann reichen: ⚖ Anwalt. Ohne Eintragung kann Schutz als geschäftliche Bezeichnung durch Benutzung entstehen, ist aber schwer zu belegen. | DPMA-Gebühr für wenige Klassen im niedrigen dreistelligen Euro-Bereich (aktuell prüfen), Anwaltsrecherche optional extra |
| **Regelwerk, Fundstellen-Sammlung, Fotoauswertung** | **Teilweise** | (a) *Geschäftsgeheimnis* nach Geschäftsgeheimnisgesetz (GeschGehG): nur, wenn die Information **nicht allgemein bekannt** ist, einen wirtschaftlichen Wert hat **und angemessene Geheimhaltungsmaßnahmen** bestehen. Die Normen und TAB selbst sind öffentlich; schützbar ist am ehesten die **Auswahl, Verknüpfung und Auswertungslogik** (R01–R26). Ob das als Geheimnis trägt, ist offen: ⚖ Anwalt. (b) Urheberrecht an der *Textsammlung* (Datenbank-/Sammelwerk) möglich, aber nicht an den Normtexten selbst (Normtexte nicht übernehmen, nur Fundstellen, vgl. [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]). | Maßnahmen siehe 2 und 3 |
| **Patent / Gebrauchsmuster** | **Praktisch nein** | Computerprogramme „als solche“ sind nicht patentierbar; nur mit technischem Beitrag. Ein Regelwerk für Bauvorschriften ist eher Geschäftsmethode/Wissen. Kosten und Dauer stehen in keinem Verhältnis zum Stand der Idee. Gebrauchsmuster schließt Verfahren aus. Nicht verfolgen, außer ein Patentanwalt sieht einen technischen Kern: ⚖ Anwalt. | – |

## 2. Technischer Befund: Das Regelwerk liegt im Browser
**Befund (am Code geprüft, 19.11.2026):**
- `web/src/regeln.json` (ca. 14 KB: je Regel Bedingung, Maßnahme, Stufe, **Fundstelle**, Geltung, Status) wird in `web/src/regelwerk.ts` per `import` eingebunden.
- `regelwerk.ts` enthält zusätzlich die **komplette Auswertungslogik** (`ausgeloesteRegeln`, `bewerte`, `messkonzept`) und wird von `web/src/main.ts` direkt aufgerufen. Die Auswertung läuft also **ausschließlich im Browser**.
- Vite bündelt beides in das öffentliche App-Bundle. Das Bundle ist per Browser-Entwicklerwerkzeuge für jeden lesbar, der die App-URL erreicht. Dasselbe gilt für das Demo-Build (`npm run build:demo`).

**Bewertung des Risikos:**
- **Heute gering**, weil die App nicht öffentlich liegt und es noch keine Nutzer gibt. Sobald sie bei Netlify online ist, ist es **hoch**: Wer die Seite öffnet, kann Logik und alle Fundstellen in Minuten kopieren. Der Zugangscode (`APP_CODE`) schützt nur die Edge-Function-Aufrufe, **nicht** das Bundle, das vor dem Login ausgeliefert wird.
- Rechtlich verschärft sich das Problem: Ein Geschäftsgeheimnis setzt „angemessene Geheimhaltungsmaßnahmen“ voraus. Ein Regelwerk, das jedem Besucher offen ausgeliefert wird, erfüllt das mit hoher Wahrscheinlichkeit nicht (⚖ Anwalt bestätigen). Urheberrecht am Code bliebe, aber das Wissen wäre frei verwertbar.
- Minifizierung/Obfuskation ändert daran praktisch nichts (kein echter Schutz).

**Skizze der Lösung (serverseitige Regelauswertung):**
1. `regeln.json` und die Logik aus `regelwerk.ts` wandern in die Edge Function (`supabase/functions/api/`), z. B. neue Route `POST /bewerte`.
2. Die App schickt nur die **Eingaben** (Felder, Vorhaben, Netzform …) und bekommt **Ergebnis + Maßnahmen + Fundstelle der ausgelösten Regeln** zurück. Die nicht ausgelösten Regeln und die Bedingungen bleiben serverseitig.
3. Dieselbe Zugangskontrolle wie `/analyse` (Header `x-app-code`, später Login, vgl. Aufgabe „Login statt Zugangscode“).
4. **Restrisiko bleibt:** Wer die App rechtmäßig nutzt, kann durch viele Testeingaben das Regelwerk Stück für Stück „aushorchen“. Gegenmittel: Login pro Nutzer, Rate-Limit, Nutzungsbedingungen (Abschnitt 3). Vollständig verhindern lässt sich das nicht.
5. **Nebenwirkungen:** Ohne Verbindung keine Bewertung mehr (bisher läuft die App auch lokal ohne Backend und im Funkloch; Offline-Modus ist ohnehin „erst nach Go“). Die 13 Tests in `regelwerk.test.ts` ziehen mit in das Function-Verzeichnis oder bleiben als Tests gegen das geteilte Modul. Das Demo-Artifact kann weiter die lokale Version nutzen, wenn es **nur Beispieldaten und einen Ausschnitt** enthält.
6. Reihenfolge: **vor** dem öffentlichen Livegang (Netlify) und **vor** dem Mittesten durch Fremde. Für das Mittesten durch vertraute Kollegen ist ein Interim denkbar (NDA, Abschnitt 3), siehe Priorisierung.

## 3. Verträge und Regeln
- **NDA für Tester/Kollegen** (Einwilligung vor Zugang zum Test): Gegenstand (Regelwerk, Logik, Ergebnisse), Zweck (nur Testen), Dauer, keine Weitergabe, Rückgabe/Löschung. Ohne Vertrag keine Geheimhaltungspflicht und kein „angemessener“ Schutz. Muster von Anwalt/Handwerkskammer prüfen lassen: ⚖ Anwalt. Kurzfassung genügt am Anfang, aber **schriftlich oder per Text bestätigt**, nicht nur mündlich.
- **Nutzungsbedingungen (AGB)** in der App: kein Kopieren, kein automatisiertes Abfragen, kein Reverse Engineering (soweit nach § 69e UrhG zulässig, einzelne Rechte sind zwingend und nicht ausschließbar: ⚖ Anwalt), Nutzung nur für eigene Aufträge. Ergänzt [[Rechtliches]] (Haftungsausschluss „ersetzt keine Prüfung vor Ort“ steht dort schon).
- **Zugang nur mit Login:** Pro Nutzer ein Konto (statt gemeinsamem `APP_CODE`), damit Weitergabe nachvollziehbar und sperrbar ist. Bei Supabase Auth machbar, Aufgabe steht schon unter „Irgendwann“ und gehört vor das Mittesten durch Dritte.
- **Weitere Geheimhaltungsmaßnahmen** (für „angemessen“): Regelwerk-Excel und Quellen nicht offen in Cloud-Ordnern teilen, Zugriffe begrenzen, Vermerk „vertraulich“ auf Unterlagen, Dokumentation, wer was erhalten hat.
- **Datenschutz-Nebenthema:** Tester-Fotos von Kundenanlagen können Personenbezug haben, das ist in [[Rechtliches]] unter „Später für die App“ schon vorgemerkt.

## 4. Arbeitgeber-Frage (⚖ offen, Anwalt/Steuerberater)
**Frage:** Wem gehört die Idee, wenn sie im Rahmen einer Anstellung im Elektrohandwerk entstanden ist? Das ist hier **nicht beantwortbar**, weil der Vault nichts über Arbeitsvertrag, Zeitpunkt der Entstehung und Arbeitsmittel sagt ([[Mein Vorteil]]: Stunden und Rahmen sind offen). Zu klären:
1. **Arbeitsvertrag lesen:** Nebentätigkeitsklausel (Anzeige/Genehmigung), Wettbewerbsverbot (während des Arbeitsverhältnisses gilt grundsätzlich ein Wettbewerbsverbot; bei Handwerkskollegen als Zielgruppe ist ein Branchenbezug zum Arbeitgeber denkbar), Verschwiegenheit zu Betriebsinterna, Klausel zu Rechten an Arbeitsergebnissen.
2. **Arbeitnehmererfindungsgesetz:** gilt für *erfinderisch* patent-/gebrauchsmusterfähige Diensterfindungen. Für Software ohne Patentfähigkeit meist nicht einschlägig, aber **§ 69b UrhG**: Programme, die ein Arbeitnehmer **in Wahrnehmung seiner Aufgaben oder nach Anweisung** schafft, gehören dem Arbeitgeber (Nutzungsrechte). Programmiert wird hier privat, die Aufgabe liegt nicht im Arbeitsbereich: Risiko wahrscheinlich gering, aber ⚖ prüfen.
3. **Wissen aus dem Betrieb:** Fachwissen und Erfahrung gehören dem Arbeitnehmer. **Betriebsgeheimnisse, Kundendaten, interne Unterlagen, Fotos aus Aufträgen** des Arbeitgebers nicht in das Produkt einbringen und nicht dafür nutzen. Das ist das eigentliche Risiko bei der Falldaten-Erfassung („20 reale Schränke“): Fotos nur von eigenen Anlagen oder mit Einwilligung des Kunden **und** des Arbeitgebers.
4. **Arbeitszeit und -mittel:** Nichts in der Arbeitszeit oder mit Firmen-Handy/-Laptop/-Fahrzeug. Gespräche mit Kollegen (Zielgruppe) möglichst außerhalb der Arbeitszeit.
5. **Transparenz:** Je nach Vertrag ist eine Anzeige der Nebentätigkeit nötig. Das lässt sich später einfacher klären als nach einem Streit. Frage an Fachanwalt für Arbeitsrecht (Erstberatung, grob zwei- bis dreistelliger Betrag, prüfen) oder die Rechtsberatung der Gewerkschaft/Innung, falls Mitglied.

## 5. Realistischer Schutz: Tempo und Daten
Rechtlich ist wenig sicher zu schützen. Was ein Nachbauer **nicht** schnell kopieren kann:
- **Vorsprung:** Regelwerk steht, Pilot Westnetz, Fachwissen ([[Mein Vorteil]]). Vorsprung hält nur, solange er genutzt wird: Gespräche und Validierung vor Infrastruktur ([[Validierung & Go-No-Go]]).
- **Netzwerk und Vertrauen:** Direktzugang zu Kollegen und Innung ([[Direktansprache]]). Ein Konkurrent ohne Handwerksbezug braucht Jahre dafür.
- **Daten aus echten Fällen:** Fälle samt „tatsächlicher Entscheidung“ ergeben Trefferquote, Fehlerbilder und Foto-Erkennungsrate. Das ist ein Datensatz, den es nirgends zu kaufen gibt, und die Grundlage für laufende Verbesserung der Regeln. Falldaten liegen serverseitig (Supabase) und sind kein Teil des Bundles.
- **Pflege des Regelwerks:** Neue TAB-Fassungen (BDEW-Musterwortlaut 2026, Westnetz) schnell einarbeiten. Eine kopierte Momentaufnahme veraltet.
- **Marke und Domain** sichern (Aufgabe offen), damit Kunden *dich* finden und nicht Nachahmer.

**Ehrliche Einordnung:** Mit hoher Wahrscheinlichkeit ist nicht der Diebstahl der größte Risikofaktor, sondern dass **niemand zahlt**. Schutzmaßnahmen dürfen die Validierung nicht verdrängen (Regel „erst verkaufen, dann bauen“ in [[Ideen-System]]). Deshalb stehen unten nur Maßnahmen, die billig sind oder ohnehin vor dem Livegang anfallen.

## 6. Priorisierte Maßnahmenliste
| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | **Kein öffentlicher Livegang mit Regelwerk im Bundle:** Regelauswertung serverseitig (Code-Aufgabe, Abschnitt 2) | 0 € (Supabase Free) | mittel (1 Nacht/Sitzung, Tests anpassen) | **vor Netlify-Livegang** und vor Fremd-Testern |
| 2 | **Kurz-NDA + Nutzungshinweis** für die 4 Tester (Text per WhatsApp/E-Mail bestätigen lassen) | 0 € (Entwurf), Prüfung ⚖ ca. Beratungsstunde | klein | **vor dem Mittesten** |
| 3 | **Arbeitsvertrag lesen**, offene Fragen aus Abschnitt 4 sammeln | 0 € | klein (1 Stunde) | **diese Woche**, kein Code nötig |
| 4 | Erstberatung Fachanwalt Arbeitsrecht/IT-Recht (Abschnitt 4, Geheimnisschutz, NDA, AGB) | grob 100–300 € (prüfen) | klein | vor dem ersten Euro Umsatz, gern zusammen mit Impressum/Datenschutz ([[Rechtliches]]) |
| 5 | Login pro Nutzer statt `APP_CODE` | 0 € | mittel | vor dem Mittesten durch Dritte (steht schon in Aufgaben) |
| 6 | Nutzungsbedingungen in der App | 0 €, Prüfung ⚖ | klein–mittel | mit Login |
| 7 | **DENIC-Prüfung `zaehlerklar.de`, DPMA-Recherche**, dann Wortmarke anmelden | Domain wenige €/Jahr, Marke niedrig dreistellig | klein | steht schon in Aufgaben, Anmeldung erst nach Go |
| 8 | Git-Historie sichern (Remote besteht bei GitHub), Entstehungsdatum dokumentieren | 0 € | klein | laufend |
| 9 | Rate-Limit auf Zugangscode/Edge Function (gegen Aushorchen und Brute-Force, bisher bewusst offen) | 0 € | mittel | mit Serverlogik |
| – | Patent/Gebrauchsmuster | hoch | hoch | **nicht verfolgen** |

## Offene Fragen für Anwalt/Steuerberater (Sammlung)
- [ ] ⚖ Arbeitsvertrag: Nebentätigkeit, Wettbewerbsverbot, § 69b UrhG, Verschwiegenheit (Abschnitt 4)
- [ ] ⚖ Trägt das Regelwerk als Geschäftsgeheimnis, wenn die Normen/TAB selbst öffentlich sind?
- [ ] ⚖ Marke „Zählerklar“: Schutzfähigkeit und Verwechslungsgefahr
- [ ] ⚖ NDA-Muster und AGB-Klauseln gegen Kopieren und Reverse Engineering
- [ ] Steuerberater: Gewerbeanmeldung/Kleinunternehmer, Verhältnis zur Hauptbeschäftigung (außerhalb dieser Notiz)
