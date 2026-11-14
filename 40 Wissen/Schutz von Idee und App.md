---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-11-14
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App

> **Wichtig:** Das ist eine fachliche Einordnung aus allgemeinem Wissen, **keine Rechtsberatung**. Alles, was mit „→ Anwalt“ markiert ist, ist unsicher oder hängt vom Einzelfall ab und sollte vor dem Livegang geprüft werden. Gebühren und Paragrafen nach meinem Wissensstand, vor Nutzung auf den Seiten von DPMA/EUIPO und im Gesetzestext nachsehen.

**Kurzfassung:**
1. Die **Idee** ist nicht schützbar. Geschützt werden nur **Code, Texte, Name** (und mit Aufwand das **Know-how**).
2. **Technischer Befund:** Das gesamte Regelwerk liegt in der ausgelieferten Web-App offen im Browser. Das ist die größte vermeidbare Lücke → Lösung: Regelauswertung auf den Server.
3. Der eigentliche Vorsprung ist nicht Geheimhaltung, sondern **Tempo, Netzwerk und Daten aus echten Fällen** ([[Mein Vorteil]]).
4. **Ehrliche Priorität:** Solange 0 von 5 Gesprächen ausgewertet sind ([[Validierung & Go-No-Go]]), ist Nachahmung ein kleineres Risiko als „niemand will es haben“. Die Maßnahmen unten sind nach Zeitpunkt sortiert: nur das Billige und Schnelle vor dem Mittesten, der Rest vor dem Livegang.

## 1. Was ist in Deutschland schützbar?

| Gegenstand | Schutz | Wie | Kosten | Wert für uns |
|---|---|---|---|---|
| **Idee / Konzept** („Foto → Regelwerk → Maßnahmenliste“) | **keiner** | – | – | Jeder darf die Idee nachbauen. Geschützt wird nur die konkrete Umsetzung. |
| **Quellcode, App-Texte, Oberfläche** | Urheberrecht (§§ 2, 69a ff. UrhG) | entsteht automatisch mit dem Schreiben, keine Anmeldung | 0 € | Verhindert 1:1-Kopieren, nicht das Nachbauen mit eigenem Code. Nachweis: Git-Historie mit Zeitstempeln, Vault-Commits. |
| **Regelwerk als Sammlung** (26 Regeln, Auswahl, Formulierung) | evtl. Urheberrecht an den Texten; evtl. Datenbankschutz (§§ 87a ff. UrhG, nur bei „wesentlicher Investition“) | automatisch | 0 € | Unsicher, ob die Schwelle erreicht wird → Anwalt. Die Regeln selbst sind aus öffentlichen Quellen abgeleitet (BDEW-TAB, Westnetz-Schulung), nur die **Auswahl und Verdichtung** ist eigene Leistung. |
| **Name „Zählerklar“** | Marke (DPMA, Wortmarke) | Anmeldung + Recherche; Klassen 9, 42 (ggf. 35) | DPMA online bis 3 Klassen ca. 290 €; EU-Marke (EUIPO) ca. 850 € | Sinnvoll, **sobald** der Name nach [[ADR-0006 Produktname Zählerklar]] nicht kollidiert. Ohne Eintragung entsteht Schutz nur über Benutzung und Bekanntheit (schwach). Recherche im DPMAregister ist kostenlos. |
| **Domain, Social-Handle** | Wer zuerst registriert | DENIC, Instagram | ca. 1 €/Monat | Billig, schnell, steht schon in den Aufgaben. |
| **Know-how / Regelwerk als Geschäftsgeheimnis** | GeschGehG (§ 2 Nr. 1) | nur wenn **angemessene Geheimhaltungsmaßnahmen** getroffen sind | Aufwand, kein Geld | Siehe Abschnitt 3. Wer sein Regelwerk offen ausliefert, hat kein Geheimnis mehr. |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist nicht patentfähig (§ 1 Abs. 3 PatG); Programme sind vom Gebrauchsmuster ausgeschlossen | – | Patent: ca. 40 € Anmeldung + ca. 350 € Prüfung, dazu Patentanwalt (vierstellig) | **Nicht sinnvoll.** Nur bei einem echten technischen Beitrag denkbar, den sehe ich hier nicht → Patentanwalt, falls je nötig. |

**Nicht schützbar und auch nicht nötig:** Normen und TAB-Wortlaute gehören den Herausgebern (DIN, BDEW). Es werden nur Fundstellen genannt, keine Normtexte kopiert ([[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]). Diese Regel schützt uns vor Urheberrechtsärger, sie ist also auch Schutzmaßnahme.

## 2. Technischer Befund: Regelwerk liegt im Browser

**Befund (Code-Stand 14.11.2026, `zaehlerschrank-check`, Zweig `master`):**
- `web/src/regeln.json` (ca. 14 KB: Name, Bedingung, Maßnahme, **Fundstelle**, Geltung, Status je Regel) wird in `web/src/regelwerk.ts` per `import` eingebunden.
- `regelwerk.ts` enthält zusätzlich die **komplette Entscheidungslogik** (`ausgeloesteRegeln`, Schwellen wie 4,2 kW, 4,6 kW, 12 kW, 50 A, Sonderfall Westnetz).
- `web/src/main.ts` ruft `bewerte` direkt im Browser auf. Beides landet im Vite-Bundle, das jeder Besucher herunterlädt. Dasselbe gilt für das claude.ai-Demo (`build:demo`).
- Die Edge Function (`supabase/functions/api`) wertet **keine** Regeln aus, sie macht nur Fotoanalyse und Fall-Speicher. Der Zugangscode schützt also nur diese Routen, nicht das Regelwerk.

**Risiko-Bewertung:**
| Aspekt | Einschätzung |
|---|---|
| Wer kann es lesen? | Jeder, der die App-Adresse kennt: Netlify liefert statische Dateien ohne Login aus. Auch die vier Tester bekommen alles. |
| Aufwand für Angreifer | Minuten (Browser-Entwicklerwerkzeuge, `.js`-Datei öffnen). Minifizieren oder Verschleiern verzögert nur. |
| Folge | Das Regelwerk (der „Vorsprung“ im [[Zählerschrank-Check#Score (vorläufig, 03.10.2026)]]) ist offen kopierbar. Gleichzeitig **kein „Geschäftsgeheimnis“ mehr** im Sinne des GeschGehG, weil keine angemessene Geheimhaltung vorliegt. |
| Relativierung | Die Inhalte stammen größtenteils aus **öffentlichen** Quellen (Fundstellen stehen ja drin). Wert ist die Verdichtung und die geprüfte Auswahl. Ein Konkurrent könnte sie mit Fachwissen und den Quellen ebenfalls erarbeiten, nur langsamer. |
| Dringlichkeit | Mittel. Kritisch wird es mit dem ersten **öffentlichen** Hosting (Netlify) oder dem Verteilen an Fremde. Vor reinem Eigengebrauch und vor den 4 bekannten Testern ist es vertretbar, wenn eine Testvereinbarung (Abschnitt 3) da ist. |

**Lösungsskizze: Regelauswertung in die Edge Function**
1. `regeln.json` und die Logik aus `regelwerk.ts` wandern nach `supabase/functions/api/` (neue Datei, z. B. `regelwerk.ts` plus JSON). Aus dem Web-Bundle verschwinden beide.
2. Neue Route `POST /bewerte` (Header `x-app-code`, später Login): Eingabe = `Eingaben` (Schrank-Felder + Vorhaben), Ausgabe = fertige Maßnahmenliste: Ampel, ausgelöste Regeln mit Text, Fundstelle und Stufe, „Vor Ort klären“-Liste, Hinweise, Messkonzept. **Nie** die komplette Regelliste und nie Bedingungen in der Antwort.
3. Die App zeigt nur an, was die Antwort liefert. `web/src/regelwerk.ts` schrumpft auf Typen und Anzeige. Die 13 Tests ziehen mit der Logik um (Deno-Test in `supabase/` oder ein Test, der dieselbe Datei importiert).
4. **Preis dafür:**
   - Die App braucht für die Auswertung Netz. Das beißt sich mit „Fälle gehen bei Funkloch nicht verloren“ (Review 29.09.). Lösung: Eingaben lokal puffern, Auswertung beim Senden nachholen; im Keller ohne Netz gibt es dann keine Ergebnis-Anzeige vor Ort. **Das ist eine Produktentscheidung** → bei Gelegenheit als ADR festhalten.
   - Das Demo-Artifact braucht Beispielergebnisse fest eingebaut (nur für die Demo-Beispielfälle, keine Regeln).
   - Rate-Limit nötig, siehe unten.
5. **Restrisiko auch dann:** Wer systematisch Eingaben durchprobiert, kann das Regelwerk aus den Antworten nachbilden (Orakel-Angriff). Dagegen helfen: Login pro Person statt gemeinsamem Zugangscode ([[Aufgaben]], „Irgendwann“: Login statt Zugangscode), Mengenbegrenzung je Konto und Tag, Protokoll auffälliger Muster, Nutzungsbedingungen mit Verbot. Absolute Sicherheit gibt es nicht; das Ziel ist, das Nachbauen **teurer als Selbstschreiben** zu machen.
6. Aufwand grob: ca. 1 Arbeitstag Code plus Tests, kein neuer Dienst, keine Zusatzkosten. Wegen Edge-Function-Änderung muss danach neu eingespielt werden (Nutzer-Aufgabe, liegt schon bei den Secrets).

**Weitere Stellen prüfen (Checkliste, 0 €):**
- [ ] Sind die GitHub-Repos `zaehlerschrank-check` und `unternehmen-vault` **privat**? (Konnte ich von hier nicht verlässlich feststellen. Öffentlich = Code und Regeln für alle lesbar.)
- [ ] Demo-Artifact auf claude.ai privat lassen (ist es laut [[App & Technik]]). Kein öffentlicher Link.
- [ ] `Anhänge/Entscheidungsbaum_Zaehlerschrank.xlsx` ([[Entscheidungsbaum Excel]]) nicht verschicken; die Excel enthält das Regelwerk im Klartext samt Formeln.
- [ ] Keine Screenshots der Ergebnisseite mit allen Fundstellen in Instagram-Posts: Rätsel-Posts verraten jeweils nur **eine** Regel ([[Instagram-Posts 1–10]]). Das ist gewollt als Werbung, summiert sich aber.
- [ ] Wartelisten- und Falldaten (Fotos echter Schränke) nicht in Vault oder Repo legen (Vault-Regel: keine Kundendaten).

## 3. Verträge: Geheimhaltung, Nutzungsbedingungen, Login

**Geheimhaltung nach GeschGehG:** Ein Geheimnis ist nur geschützt, wenn es (a) nicht allgemein bekannt ist, (b) wirtschaftlichen Wert hat **und** (c) durch **angemessene Geheimhaltungsmaßnahmen** geschützt wird (§ 2 Nr. 1). Maßnahmen zeigen: Zugang nur mit Login, Regelwerk nicht im Client, Vereinbarungen mit Testern, Zugriffsprotokoll. Reverse Engineering eines **öffentlich verfügbaren** Produkts ist grundsätzlich erlaubt (§ 3 Abs. 1 Nr. 2), **es sei denn, vertraglich ausgeschlossen**. Deshalb sind Nutzungsbedingungen mit Verbot hier das wichtigste Vertragsstück.

| Vertragsstück | Zweck | Umfang | Wann | Kosten |
|---|---|---|---|---|
| **Testvereinbarung / NDA für Tester** (1 Seite) | Tester dürfen die App nutzen, aber: Zugang nicht weitergeben, keine Weitergabe von Screenshots der Ergebnisliste, kein Nachbauen, Rückmeldungen dürfen verwertet werden, Dauer begrenzt | Mit Kollegen unter Handwerkern ist ein schweres NDA unpassend. Besser: kurze „Spielregeln“ per Chat oder Text beim Mittesten bestätigen lassen (Textform). Vertragsstrafe → Anwalt | **vor** dem Mittesten (4 Tester warten) | 0 € Entwurf, ca. 150–400 € für eine anwaltliche Prüfung (Schätzung, beim Anwalt erfragen) |
| **Nutzungsbedingungen (AGB light)** | Nutzungsrecht nur zum eigenen Gebrauch, Verbot von Kopieren, automatisiertem Abfragen, Reverse Engineering, Weitergabe des Zugangs; Haftungsrahmen („ersetzt keine Prüfung vor Ort“) | Eine Seite, in der App vor der ersten Nutzung bestätigen | vor dem öffentlichen Livegang | Entwurf 0 €, Prüfung anwaltlich oder per Generator (eRecht24 o. Ä.) |
| **Login statt Zugangscode** | jeder Nutzer ein eigenes Konto, widerrufbar, Nutzung protokolliert | Supabase Auth ist im Projekt vorhanden | vor dem Livegang; **schon vor Kollegen-Test** laut Aufgabe „Irgendwann“ | 0 € (Free Tier) + 1–2 Tage Code |
| **Auftragsverarbeitung** (Supabase, Anthropic, Netlify) | Datenschutz, nicht Schutz der Idee | → [[Rechtliches]] | vor Livegang | 0 € |

**Wichtig für die Haftung nebenbei:** Die Nutzungsbedingungen sollten klarstellen, dass das Ergebnis eine **Ersteinschätzung** ist und die Errichterverantwortung beim Elektrofachbetrieb bleibt. Das schützt weniger die Idee als dich.

## 4. Arbeitgeber-Frage (→ Anwalt / Steuerberater)

> **Offene Frage, die ich nicht beantworten kann:** Falls das Regelwerk **im Rahmen einer Anstellung** im Elektrohandwerk entstanden ist oder sich daraus speist: **Wem gehört es, und darf ich es kommerziell nutzen?**

Ich weiß nicht, ob du angestellt, selbstständig oder beides bist (steht nirgends im Vault; [[Rechtliches]] lässt es offen). Ich nehme deshalb den ungünstigeren Fall an und markiere die Punkte:

| Punkt | Worum es geht | Einschätzung |
|---|---|---|
| **Software im Arbeitsverhältnis** (§ 69b UrhG) | Programme, die ein Arbeitnehmer **in Wahrnehmung seiner Aufgaben oder nach Anweisung** schreibt, darf der Arbeitgeber nutzen. Privat in der Freizeit ohne Auftrag entstandener Code ist grundsätzlich unproblematisch. | Wahrscheinlich unkritisch, wenn App privat und nicht auftragsbezogen entstanden → **Anwalt prüfen**, wenn der Chef Ideen, Unterlagen oder Zeit beigesteuert hat. |
| **Arbeitnehmererfindung** (ArbnErfG) | Gilt für patent- oder gebrauchsmusterfähige Erfindungen. Software als solche ist das meist nicht. | Voraussichtlich kaum relevant; **Anwalt** kann das in einem Satz klären. |
| **Nebentätigkeit** | Viele Arbeitsverträge verlangen Anzeige oder Genehmigung einer gewerblichen Nebentätigkeit. | **Arbeitsvertrag lesen!** Kostet nichts, kann entscheidend sein. |
| **Wettbewerbsverbot** | Während des Arbeitsverhältnisses darf man dem Arbeitgeber keine Konkurrenz machen (vgl. § 60 HGB, Treuepflicht). Eine App, die Elektrobetrieben Zählerschrank-Checks verkauft, könnte als Wettbewerb gelten, wenn der Arbeitgeber genau solche Betriebe sind oder ähnliche Leistungen anbietet. Ob das hier zutrifft, hängt von Vertrag und Branchennähe ab. | **Unsicher.** → Anwalt, bevor Geld fließt. |
| **Betriebsgeheimnisse** | Kundenlisten, Preise, interne Unterlagen, Fotos von Kundenanlagen und Netzbetreiber-Schulungen mit Nutzungsbeschränkung dürfen nicht ungefragt verwendet werden. | Prüfen: Wie kam die Westnetz-Schulung (09/2025) ins Regelwerk, und gelten dafür Nutzungsbedingungen? Fotos nur von **eigenen** Schränken oder mit Einwilligung, ohne Adresse und Zählernummer. |
| **Steuern / Gewerbe** | Nebenberuflich Umsatz erzielen heißt Gewerbeanmeldung, Einkommensteuer, ggf. Kleinunternehmerregelung. | → **Steuerberater**, kein Hexenwerk, aber vor dem ersten Euro klären. Verbindung zu [[Einschätzung Handwerks-Apps als Nebeneinkommen]]. |

**Nächster Schritt (kostenlos):** Arbeitsvertrag auf Nebentätigkeit, Wettbewerb und Erfindungen lesen und die Stellen herausschreiben. **Dann einmal 30–60 Minuten Anwalt** (Fachanwalt für Arbeitsrecht oder IT-Recht) mit genau dieser Frageliste. Kosten: grob 200–400 €, beim Anwalt vorab erfragen.

## 5. Realistischer Schutz: Tempo, Netzwerk, Daten

Rechtlicher Schutz hält Kopierer nicht auf, er gibt höchstens Handhabe danach. Realistisch zählt:
- **Vorsprung:** Wer zuerst bei den Betrieben ist und das Problem für die Region (Westnetz) löst, wird als Referenz wahrgenommen. Das ist der Grund für [[ADR-0005 Direktansprache vor Instagram]] und für die Gespräche vor dem Perfektionieren.
- **Netzwerk:** Kollegen, Innung, Großhändler. Die persönliche Beziehung kopiert niemand per Download. Das sind genau die Kanäle von [[Direktansprache]].
- **Daten aus echten Fällen:** Jeder erfasste Fall mit „tatsächlicher Entscheidung“ verbessert Trefferquote und Fotoerkennung. Mit 200 geprüften Fällen steht ein Datensatz da, den Nachahmer nicht haben. Das ist der eigentliche langfristige Burggraben. → Einwilligung der Nutzer für die Auswertung einholen (Datenschutz, [[Rechtliches]]).
- **Pflege:** TAB und Netzbetreiber-Vorgaben ändern sich ([[Aufgaben]]: neue Westnetz-TAB beobachten). Ein aktuell gehaltenes, mit Quellen belegtes Regelwerk schlägt eine einmal kopierte Fassung.
- **Marke und Vertrauen:** Wer „Zählerklar“ kennt, sucht nicht beim Nachahmer.

**Kritischer Blick:** Gerade weil die Regeln auf öffentlichen Quellen beruhen, ist das Regelwerk kein Geheimnis im engen Sinn. Der Versuch, es hermetisch abzuriegeln, kostet Zeit, die in den Gesprächen fehlt. Deshalb: die **billigen** Maßnahmen sofort, die **Server-Auswertung** vor dem öffentlichen Livegang, alles Juristische gebündelt in **einem** Anwaltstermin.

## 6. Priorisierte Maßnahmenliste

| # | Maßnahme | Kosten | Aufwand | Zeitpunkt | Wer |
|---|---|---|---|---|---|
| 1 | Repos privat? Demo privat? Excel nicht teilen (Checkliste Abschnitt 2) | 0 € | 10 Min. | **sofort** | du |
| 2 | Spielregeln für die 4 Tester (Textbaustein, Bestätigung per Chat) | 0 € | 30 Min. | **vor Mittesten** | Entwurf: Nachtschicht möglich; Prüfung: du |
| 3 | Arbeitsvertrag lesen: Nebentätigkeit, Wettbewerb, Erfindungen | 0 € | 30 Min. | **diese Woche** | du |
| 4 | DENIC, DPMA-Recherche, Handle `@zaehlerklar` | 0 € | 30 Min. | **vor Druck** (steht schon in [[Aufgaben]]) | du |
| 5 | **Regelwerk serverseitig** (Edge Function `/bewerte`, Bundle ohne Regeln) | 0 € | ca. 1 Tag Code + Neu-Einspielen | **vor erstem öffentlichen Hosting** | Nachtschicht |
| 6 | Login pro Person + Mengenbegrenzung | 0 € | 1–2 Tage | **vor Livegang** (Aufgabe „Irgendwann“ vorziehen) | Nachtschicht / du |
| 7 | Nutzungsbedingungen (AGB light) mit Verbot Kopieren/Reverse Engineering, in der App bestätigen | 0 € Entwurf | 2 Std. | **vor Livegang** | Entwurf: Nachtschicht; Prüfung: Anwalt |
| 8 | Anwaltstermin bündeln: Arbeitgeberfrage, Testvereinbarung, Nutzungsbedingungen, Impressum/Datenschutz ([[Rechtliches]]) | ca. 200–400 € je Stunde | 1 Termin | **vor dem ersten Euro** | du |
| 9 | Wortmarke „Zählerklar“ beim DPMA | ca. 290 € (bis 3 Klassen) | 1 Std. + 3 Monate Widerspruchsfrist | **nach Go** und erfolgreicher Recherche | du |
| 10 | EU-Marke / Patentanwalt | ab ca. 850 € bzw. vierstellig | – | **nicht jetzt**, nur bei echtem Wachstum | – |

## Offene Fragen (→ Anwalt / Steuerberater)
- Arbeitgeber-Fragen aus Abschnitt 4 (Wettbewerb, Nebentätigkeit, Herkunft der Unterlagen).
- Reicht die Auswahl und Verdichtung der Regeln für Datenbank- oder Werkschutz? (Eher nein, aber unklar.)
- Wie viel Vertragsstrafe in Tester-Vereinbarungen ist zulässig und sinnvoll?
- Nutzungsbedingungen: Haftungsbegrenzung gegenüber Unternehmern (B2B) wirksam formulieren.
- Darf die Westnetz-Schulung (09/2025) für das Regelwerk ausgewertet und die Fundstelle genannt werden?

Zurück zu [[Zählerschrank-Check]], Technik in [[App & Technik]], Methode [[Ideen-System]].
