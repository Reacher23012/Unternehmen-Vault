---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-11-06
status: analyse – keine Rechtsberatung, Rechtsfragen vom Anwalt prüfen lassen
---
# Schutz von Idee und App („Zählerklar“)

> Analyse der Nachtschicht vom 06.11.2026. **Keine Rechtsberatung.** Alles mit **⚖ Anwalt** ist unsicher und sollte vor dem Livegang geprüft werden. Gebühren sind Richtwerte aus dem Wissensstand der Nachtschicht und vor der Entscheidung auf der Seite der Behörde zu prüfen.

## 0. Wichtigster Befund zuerst
**Das Vault-Repo `Reacher23012/unternehmen-vault` ist auf GitHub öffentlich** (ohne Anmeldung abrufbar, geprüft am 06.11.2026). Es enthält:
- [[Regelwerk R01–R26]] – das komplette Regelwerk mit Bedingung, Maßnahme und Fundstelle,
- `Anhänge/Entscheidungsbaum_Zaehlerschrank.xlsx` – die Excel-Originaldatei mit den Formeln,
- Geschäftsplan, Score, Preisannahme, Go/No-Go, Gesprächsleitfaden, Marketingpläne.

Damit ist das Regelwerk **heute schon** für jeden lesbar, lange bevor ein Browser-Bundle eine Rolle spielt. Das Code-Repo `zaehlerschrank-check` ist dagegen nicht öffentlich (anonym 404).
Folgen: Für das Regelwerk gibt es in der Praxis keine „angemessenen Geheimhaltungsmaßnahmen“ mehr (siehe 1.4). Außerdem steht der Name des Inhabers, der Pilot-Netzbetreiber und die Strategie offen im Netz.
**Sofortmaßnahme (Nutzer, 2 Minuten):** auf GitHub unter Settings → Danger Zone → „Change visibility“ auf *Private* stellen. Die Nachtschicht arbeitet mit dem Zugang der GitHub-App weiter; ob sie nach dem Umstellen noch Zugriff hat, danach testen. Hinweis: Was einmal öffentlich war, kann schon kopiert oder archiviert sein (Forks, Archive). Die Umstellung stoppt weitere Verbreitung, löscht aber nichts rückwirkend. Auch die Git-Historie war öffentlich.

## 1. Was ist in Deutschland überhaupt schützbar?
| Gegenstand | Schutz | Wie / Kosten | Einschätzung für uns |
|---|---|---|---|
| **Die Idee** („Foto → Zählerschrank-Einschätzung“) | **keiner.** Ideen und Geschäftskonzepte sind frei | – | Nicht schützbar. Wer sie hört, darf sie nachbauen. Schutz nur über Tempo und Vertrag (NDA) |
| **Quellcode / App** | Urheberrecht für Computerprogramme (§§ 69a ff. UrhG), entsteht automatisch | kein Register, 0 €. Git-Historie dient als Entstehungsnachweis | Schützt gegen **Kopieren des Codes**, nicht gegen eine eigene, ähnliche Umsetzung der Funktion |
| **Regelwerk-Texte** (`regeln.json`) | evtl. Schutz als Sammlung/Datenbank (§ 4 UrhG, §§ 87a ff. UrhG); einzelne Sätze meist zu kurz | 0 € | ⚖ Unsicher. Die Inhalte stammen aus öffentlichen TAB/BDEW-Quellen; geschützt wäre allenfalls die Auswahl und Aufbereitung |
| **Normtexte** (DIN, VDE) | Urheberrecht der Normverlage | – | Wir übernehmen nur Fundstellen (Regel aus ADR-0001). Beibehalten, auch im Marketing |
| **Name „Zählerklar“** | **Marke** (DPMA), Schutz erst ab Eintragung; Wettbewerbsrecht bietet nur schwachen Schutz | DPMA-Online-Anmeldung etwa 290 € für bis zu 3 Klassen (hier Klasse 9 und 42), Schutz 10 Jahre; Recherche im DPMAregister kostet 0 € | ⚖ „Zählerklar“ ist ggf. **beschreibend** (Zähler + klar) und schwach schutzfähig; Kollisionsrisiko prüfen. Domain `zaehlerklar.de` sichern (Domain ist keine Marke) |
| **Regelwerk als Know-how** | **Geschäftsgeheimnisgesetz (GeschGehG)** | 0 €, aber nur mit *angemessenen Geheimhaltungsmaßnahmen* | Siehe 1.4 |
| **Patent** | Software „als solche“ ist nicht patentierbar (§ 1 Abs. 3 PatG); nur bei technischem Beitrag. Regelsysteme/Geschäftsmethoden praktisch nein | mehrere Tausend € | **Nicht verfolgen.** Kosten und Erfolgsaussicht passen nicht |
| **Gebrauchsmuster** | Programme als solche ausgeschlossen | ca. wenige hundert € Amtsgebühr plus Anwalt | **Nicht verfolgen** |

### 1.4 Geschäftsgeheimnis genauer
Nach GeschGehG ist nur geschützt, was (1) nicht allgemein bekannt ist, (2) wirtschaftlichen Wert hat **und** (3) mit angemessenen Maßnahmen geheim gehalten wird. Zwei Schwächen bei uns:
1. **Öffentliche Quellen:** Das Regelwerk fasst TAB, BDEW und Westnetz-Unterlagen zusammen. Der Wert liegt in Auswahl, Zusammenführung und Prüfung. Ein Gericht könnte die Schutzwürdigkeit teilweise verneinen. ⚖
2. **Keine Maßnahmen bisher:** Öffentliches Vault-Repo (0) und Regelwerk im Browser-Bundle (2) sprechen gegen „angemessene Maßnahmen“. **Reverse Engineering eines öffentlich verfügbaren Produkts ist nach § 3 GeschGehG grundsätzlich erlaubt**, solange es nicht vertraglich ausgeschlossen ist (→ Abschnitt 3).

## 2. Technischer Befund: Regelwerk liegt im Browser
Geprüft im Code (Stand `master`, 06.11.2026):
- `web/src/regelwerk.ts` importiert `regeln.json` direkt (`import regelnJson from "./regeln.json"`). `main.ts` und `demo.ts` rufen `bewerte` im Browser auf. Vite bündelt beides in das ausgelieferte JavaScript.
- `regeln.json` hat etwa 14 KB: 26 Regeln mit Name, Bedingung, Maßnahme, Stufe, Fundstelle, Geltung, Status. Die Auswertungslogik (Schwellen wie 4,2 kW, Bauart-Listen) steht in `regelwerk.ts` im Klartext (minifiziert, aber lesbar).
- Der Zugangscode (`APP_CODE`) schützt **nur die Edge Function** (Fotoanalyse, Fälle). Die Auslieferung der statischen App bei Netlify wäre öffentlich: Wer die URL kennt, lädt das Bundle und damit das gesamte Regelwerk, auch ohne Code. Dasselbe gilt für den Demo-Build.
- Die Edge Function sendet heute **kein** Regelwerk, nur Feldvorschläge der KI. Die Auswertung läuft komplett im Client.
- Die Landingpage zeigt einzelne Regeln als Werbung (z. B. R04, R06 mit Fundstelle). Das ist freiwillig und unkritisch, zeigt aber nur Ausschnitte.

**Risikobewertung (ehrlich):**
- *Kopieraufwand:* gering (Datei abrufen, 5 Minuten). Das Regelwerk lässt sich aber auch aus den öffentlichen TAB neu bauen, mit KI in wenigen Tagen. **Der Burggraben ist nicht das Regelwerk.** Das stützt die Frage, ob „Vorsprung = 5“ im Score von [[Zählerschrank-Check]] nicht zu hoch ist (Vorschlag: nach den Gesprächen neu bewerten, eher 3–4; hier bewusst nicht geändert).
- *Schaden:* heute klein (keine Nutzer, kein Umsatz). Er wächst mit dem Livegang.
- *Priorität:* nach dem öffentlichen Vault-Repo (Abschnitt 0) der zweite Punkt, aber **kein Grund, die Gespräche zu verschieben**.

**Lösungsskizze „Regelwerk serverseitig“:**
1. `regelwerk.ts` und `regeln.json` in die Edge Function verlegen (`supabase/functions/api`), neue Route `POST /bewerten`: Eingaben rein, Ergebnis raus (Ampel, ausgelöste Regeln mit Maßnahme und Fundstelle, „Vor Ort klären“).
2. Die App enthält kein Regelwerk mehr, nur Formulare und Ergebnisanzeige. Dateien werden nicht mehr importiert; Tests laufen weiter gegen die serverseitige Funktion (Logik als reines TypeScript-Modul, das Deno und Vitest laden können).
3. Der Demo-Build bekommt feste Beispielergebnisse (`demo.ts` nutzt heute `bewerte`) und enthält dann ebenfalls kein Regelwerk.
4. Zugang nur mit Login/Code, **Rate-Limit** und Protokollierung der Abfragen. Sonst lässt sich das Regelwerk durch viele systematische Anfragen Stück für Stück „abfragen“ (Enumeration). Das erschwert Kopieren, verhindert es nicht.
5. Nachteile: Bewertung braucht Netz (Fotoanalyse braucht es ohnehin; Fälle bleiben bei Funkloch lokal und werden nachgesendet, die Bewertung erst später). Wartung auf Server und Client wird einfacher, weil das Regelwerk nur an einer Stelle liegt.
6. Aufwand grob (Schätzung): 1–2 Tage, 0 € Zusatzkosten, ohne Zugangsdaten umsetzbar → als Aufgabe für eine spätere Nachtschicht angelegt.
Eine Zwischenstufe „Regeldatei erst nach Login per API laden, Auswertung im Client“ bringt wenig: Jeder Tester hätte danach doch die ganze Datei. Nur sinnvoll, wenn Login steht.

## 3. Verträge und Zugang
- **Gespräche über das Problem** ([[Gesprächsleitfaden]]): kein NDA nötig und eher schädlich. Wer vor dem Gespräch unterschreiben soll, wird misstrauisch, und es geht nur um Problem, Häufigkeit und Preis, nicht um das Regelwerk.
- **Mittesten (Tester mit Zugang):** einfache **Testervereinbarung** mit Geheimhaltung und Weitergabeverbot (Zugang, Ergebnisse, Regelwerk-Inhalt), keine Vervielfältigung. Eine Vertragsstrafe darin ist heikel ⚖. Nur Gesprächspartner, die wirklich Zugang bekommen.
- **Nutzungsbedingungen** (Landingpage/App): kein Kopieren, kein systematisches Auslesen, kein Weiterverkauf von Ergebnissen, Haftungshinweis „ersetzt keine Prüfung vor Ort“ (steht bereits im Impressum-Entwurf). ⚖ Reverse-Engineering-Verbote sind nur eingeschränkt wirksam: Beobachten und Testen eines Programms darf vertraglich nicht ausgeschlossen werden (§ 69d Abs. 3 UrhG). Ein Verbot, Regelwerk-Inhalte auszulesen und weiterzuverwenden, ist eher möglich.
- **Zugang nur mit Login:** Heute gibt es einen Einzelcode. Pro-Tester-Konten (Supabase Auth) erlauben Sperren und Nachvollziehen (Leak-Verfolgung). Das ist die Aufgabe „Login statt Zugangscode“ ([[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]], dort als Folge notiert); sie wird hiermit wichtiger.
- Datenschutz bei Tester-Fotos (Adresse, Namen, Zählernummern): Einwilligung/Hinweis, siehe [[Rechtliches]].

## 4. Offene Frage: Wem gehört die Idee? (Arbeitgeber)
Ob [[Mein Vorteil|ich]] angestellt, selbstständig oder beides bin, geht aus dem Vault nicht hervor; Impressum nennt eine Privatadresse. **Das muss der Nutzer prüfen und ggf. einem Anwalt/Steuerberater zeigen:**
- **Arbeitsvertrag:** Nebentätigkeit genehmigungs- oder anzeigepflichtig? Wettbewerbsverbot (während des Arbeitsverhältnisses besteht ein Wettbewerbsverbot; eine Software für Elektrobetriebe könnte in die Nähe kommen)? Klausel zu Erfindungen, Software, Geschäftsgeheimnissen?
- **Software im Anstellungsverhältnis:** § 69b UrhG weist dem Arbeitgeber die Nutzungsrechte an Programmen zu, die in Wahrnehmung der **Aufgaben** oder nach **Anweisung** des Arbeitgebers entstehen. Wird die App in der Freizeit, mit eigenen Mitteln und außerhalb der Dienstaufgaben gebaut, spricht viel für den Entwickler, aber ⚖ im Einzelfall prüfen lassen.
- **Arbeitnehmererfindungsgesetz:** gilt für patent- oder gebrauchsmusterfähige Erfindungen. Bei Software praktisch selten relevant, ⚖ trotzdem erwähnen.
- **Betriebswissen:** Fachwissen darf man mitnehmen, **Betriebsgeheimnisse, Kundendaten und Fotos aus Aufträgen des Arbeitgebers** nicht. Fotos echter Schränke aus dem Betrieb für Tests/Marketing (ohne Adresse) vorher klären.
- Kosten: Eine Erstberatung beim Anwalt kostet für Verbraucher höchstens eine gesetzlich gedeckelte Pauschale (Richtwert bis etwa 190 € netto, ⚖ prüfen); Handwerkskammer/Innung bieten Mitgliedern teils kostenlose Rechtsberatung. Alternative: Beratung beim Gründer-/Existenzgründungsangebot der IHK/HWK.

## 5. Realistischer Schutz: Tempo und Nähe
Rechtlich lässt sich wenig schützen. Was zählt:
- **Vorsprung bei echten Fällen:** Fotos, korrigierte Entscheidungen, Trefferquote. Das ist die Datenbasis, die niemand aus der TAB nachbauen kann (Einwilligung der Fotogeber vorausgesetzt).
- **Netzwerk:** 5 bis 15 Gespräche, erste zahlende Betriebe, Empfehlungen in WhatsApp-Gruppen und Innung → [[Direktansprache]].
- **Aktualität:** Pflege bei neuer TAB (BDEW 2026), schneller als ein Nachbauer.
- **Marke und Domain:** Name sichern, bevor Flyer in Umlauf gehen.
- **Ehrlich:** Wer die Idee gut findet, kann sie mit KI schnell nachbauen. Wichtiger als Geheimhaltung ist, dass die Validierung ([[Validierung & Go-No-Go]]) schnell Ergebnisse liefert.

## 6. Maßnahmen nach Priorität
| Prio | Maßnahme | Wer | Kosten | Aufwand | Wann |
|---|---|---|---|---|---|
| 1 | **Vault-Repo auf GitHub auf Private stellen**, Zugriff der Nachtschicht danach testen | Nutzer | 0 € | 2 Min. | sofort |
| 1 | Arbeitsvertrag lesen (Nebentätigkeit, Wettbewerb, Geheimhaltung, Erfindungen); Fragen für Anwalt sammeln | Nutzer | 0 € | 30 Min. | vor Livegang, am besten diese Woche |
| 1 | DPMA-Recherche „Zählerklar“ (Klassen 9, 42), `zaehlerklar.de` sichern | Nutzer | 0 € + Domain ca. 1 €/Monat (Richtwert) | 1 Std. | vor Flyer-Druck (bereits Aufgabe) |
| 2 | Testervereinbarung + Nutzungsbedingungen als Entwurf, vom Anwalt prüfen lassen | Nutzer + Entwurf | Anwalt: Erstberatung | 2–3 Std. | vor dem ersten Tester mit Zugang |
| 2 | **Regelwerk serverseitig** (`POST /bewerten`, Demo mit festen Beispielen) | Nachtschicht | 0 € | 1–2 Tage | vor öffentlichem Hosting der App bei Netlify |
| 2 | Login statt Zugangscode, Rate-Limit | Nutzer + Code | 0 € | 1 Tag | vor Kollegen-Test |
| 3 | Marke anmelden | Nutzer | etwa 290 € | 1 Std. | bei Go oder vor Massendruck; Budget in [[Mein Vorteil]] klären |
| 3 | Weitere Fotos/Regelwerk-Ausschnitte im Marketing bewusst dosieren (Ausschnitte statt Gesamtwerk) | Nutzer | 0 € | laufend | laufend |
| – | Patent/Gebrauchsmuster | – | hoch | – | **nicht verfolgen** |

Reihenfolge-Hinweis ([[Ideen-System]]: erst validieren, dann bauen): Die Schutzaufgaben sind Infrastruktur und ersetzen **nicht** die 5 Gespräche. Ausnahme ist Prio 1, weil sie Minuten kostet und weiteren Schaden stoppt.

Verknüpft: [[Zählerschrank-Check]], [[App & Technik]], [[Rechtliches]], [[Regelwerk R01–R26]], [[ADR-0006 Produktname Zählerklar]], [[Aufgaben]].
