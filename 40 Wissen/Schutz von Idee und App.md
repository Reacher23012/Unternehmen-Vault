---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-11-23
status: Analyse, keine Rechtsberatung – mit ⚖️ markierte Punkte vom Anwalt prüfen lassen
---
# Schutz von Idee und App (Zählerklar)

> **Wichtig:** Das ist eine Recherche-Notiz der Nachtschicht, keine Rechtsberatung. Gesetzesverweise und Gebühren aus dem Gedächtnis, **Stand vor Verwendung prüfen**. Was unsicher ist, trägt ⚖️ = „vom Anwalt prüfen lassen“.

**Kurzfazit:** Die *Idee* ist nicht schützbar, der *Code* und die *Texte* sind es automatisch (aber nur gegen Kopieren, nicht gegen Nachbauen), der *Name* lässt sich per Marke sichern. Das Regelwerk ist nur dann „Geschäftsgeheimnis“, wenn es wirklich geheim gehalten wird – und das ist es technisch aktuell **nicht** (siehe Abschnitt 2). Der wirksamste Schutz ist ohnehin Tempo, Netzwerk und Daten (Abschnitt 5). Größtes offenes Risiko ist nicht der Diebstahl, sondern die **Arbeitgeber-Frage** (Abschnitt 4).

## 1. Was ist in Deutschland überhaupt schützbar?
| Was | Schutz | Wie / Kosten | Einschätzung für Zählerklar |
|---|---|---|---|
| **Die Idee** („Foto → Regeln → Maßnahmenliste“) | **keiner.** Ideen und Methoden sind frei. | – | Jeder darf die Idee nachbauen. Kein Hebel. |
| **Code** (App, Edge Function) | Urheberrecht für Computerprogramme (§§ 69a ff. UrhG), entsteht **automatisch** | 0 €. Nachweis: Git-Verlauf mit Zeitstempeln (schon vorhanden), Repo privat halten | Schützt vor Kopieren des Codes, nicht vor einem Nachbau mit eigenem Code. |
| **Texte, Grafiken, Flyer** | Urheberrecht, automatisch (bei genug Eigenart) | 0 € | Kurze Slogans meist nicht schützbar. |
| **Regelwerk R01–R26** als Sammlung | Teilweise: Texte als Sprachwerk; ggf. Datenbankschutz (§§ 87a ff. UrhG, nur bei „wesentlicher Investition“) ⚖️. Die **Inhalte** selbst (TAB-Vorgaben, Fundstellen) sind fremd/öffentlich. | – | Schwach. Der Wert liegt in der Auswahl und Übersetzung der TAB-Vorgaben in prüfbare Bedingungen, das lässt sich aber mit dem öffentlichen TAB in Tagen nachvollziehen. |
| **Normen** (DIN VDE …) | Fremdes Urheberrecht (DIN-Medien/VDE) | – | Weiter: **nur Fundstellen, keine Normtexte** (ADR-0001). Gilt auch für Westnetz-Schulungsunterlagen: nur zitieren/verweisen. ⚖️ |
| **Name „Zählerklar“** | **Marke** beim DPMA (MarkenG) | Online-Anmeldung grob **290 €** bis 3 Klassen (Klassen 9 + 42 → ja), jede weitere Klasse +100 €; Schutz 10 Jahre; ca. 3 Monate Widerspruchsfrist Dritter. **Gebühren aktuell prüfen.** | Erst **Recherche** (steht schon in Aufgaben), dann anmelden. Risiko: Name könnte als *beschreibend* gelten („Zähler“ + „klar“) → Eintragungshindernis ⚖️. Ohne Marke gilt nur schwacher Schutz durch Benutzung. |
| **Geschäftsgeheimnis** (Regelwerk-Logik, Fotodaten, Trefferquoten) | Geschäftsgeheimnisgesetz (GeschGehG): nur geschützt, wenn **„angemessene Geheimhaltungsmaßnahmen“** nachweisbar sind (§ 2 Nr. 1) | 0 €, aber Aufwand: NDA, Zugriffsbeschränkung, Dokumentation | Das Gesetz erlaubt ausdrücklich **Reverse Engineering** eines öffentlich verfügbaren Produkts, **außer** es ist vertraglich verboten (§ 3 Abs. 1 Nr. 2). Deshalb zählen Nutzungsbedingungen (Abschnitt 3). ⚖️ |
| **Patent / Gebrauchsmuster** | Software „als solche“ und Geschäftsmethoden sind **nicht patentierbar** (§ 1 Abs. 3 PatG); Gebrauchsmuster schützt keine Verfahren | Patent: 4-stellig bis 5-stellig mit Anwalt | **Nicht sinnvoll.** Ein Regelwerk für Zählerplätze hat keinen technischen Beitrag im patentrechtlichen Sinn. Nicht weiterverfolgen. ⚖️ falls doch Zweifel. |

## 2. Technischer Befund: Das Regelwerk liegt beim Nutzer im Browser
**Geprüft im Code (Stand `master`):**
- `web/src/regelwerk.ts` importiert `./regeln.json` (14 KB: Bedingung, Maßnahme, Stufe, **Fundstelle**, Geltung, Status je Regel) und enthält die Auswertungslogik (≈ 5 KB, 1:1 aus den Excel-Formeln).
- `main.ts` und `demo.ts` importieren `bewerte`/`REGELN`; Vite bündelt alles ins App-Bundle. `vite.config.ts` hat nur `base: "./"`, also Standard: minifiziert, keine Sourcemaps, aber `regeln.json` bleibt als lesbare Zeichenketten erhalten.
- Die Auswertung läuft **vollständig im Browser**. Die Edge Function (`supabase/functions/api`) macht nur `/analyse` (Foto → Felder), `/faelle`, `/warteliste`. Der `APP_CODE` schützt nur diese Routen – **nicht** die statischen Dateien.
- Folge: Wer die App-URL kennt (Netlify, öffentlich geplant), kann das Bundle laden und das **komplette Regelwerk** samt Fundstellen auslesen, ganz ohne Zugangscode. Das gilt auch für den Demo-Build (`dist-artifact/…html`, eine einzige HTML-Datei zum Weitergeben).

**Risiko-Bewertung (ehrlich):**
- *Wahrscheinlichkeit, dass jemand es tut:* gering, solange es keine Kunden gibt. Ein Konkurrent im Handwerk baut keine Regelwerk-App.
- *Schaden bei Kopie:* mittel bis gering. Die Fundstellen stammen aus öffentlichen Quellen (BDEW-Musterwortlaut, Westnetz-TAB); die Regeln wären mit TAB und Fachwissen in Tagen nachbaubar. Was kopierbar bliebe, ist die Verdichtung in 26 Bedingungen.
- *Rechtlich:* Ein Geschäftsgeheimnis-Anspruch wird schwierig, wenn das Regelwerk jedem frei im Browser liegt („angemessene Geheimhaltungsmaßnahmen“ fehlen) ⚖️.
- *Priorität:* mittel, **nach** der Validierung. Vor dem ersten zahlenden Kunden lohnt sich der Umbau nicht (siehe CLAUDE.md: erst verkaufen, dann bauen).

**Lösungsskizze „Regelwerk serverseitig“:**
1. `regelwerk.ts` + `regeln.json` wandern in die Edge Function (Deno). Neue Route `POST /bewerte`: Eingaben → Ergebnis (Ampel, Maßnahmen mit Fundstelle, „Vor Ort klären“, Hinweise, Messkonzept). Die App bekommt **nur das Ergebnis** für diesen einen Fall.
2. App: `bewerte()` ruft die Route auf; das Bundle enthält keine Regeltexte mehr. Tests (`regelwerk.test.ts`, 13 grün) laufen auf der gemeinsamen Logik weiter; ggf. Logik als geteiltes Modul, das nur die Function einbindet.
3. Eingaben validieren (Aufzählungswerte), Antworten nicht cachen, Zugang weiter per Zugangscode, später Login.
4. Demo-Build bleibt mit Beispielregeln oder Mini-Auszug (Demo nicht mit dem vollen Regelwerk weitergeben).

**Grenzen dieser Lösung (nicht schönreden):**
- Das Regelwerk lässt sich dann noch **abtasten**: Wer viele Eingabekombinationen schickt, rekonstruiert die Regeln aus den Antworten. Mit Login und Rate-Limit wird es mühsam, unmöglich wird es nicht. Es erhöht die Hürde, mehr nicht.
- Pro Check werden Fundstellen ohnehin ausgeliefert; ein zahlender Kunde sieht also immer Teile des Regelwerks.
- **Offline-Fähigkeit geht verloren:** Heute läuft die Bewertung ohne Netz, im Keller und bei Funkloch zählt das (Review 29.09.: lokale Speicherung und Nachsenden). Serverseitig braucht jede Bewertung Netz. Entweder akzeptieren oder die Offline-Variante bewusst weglassen („Offline-Modus erst nach Go“ steht schon in [[App & Technik]]). Das muss vor dem Umbau mit den Kollegen geklärt werden: Wie oft fehlt am Zählerschrank der Empfang?
- Mehr Latenz, Supabase-Free-Tier-Limits, ein Fehlerfall mehr.

## 3. Verträge und Zugang
| Maßnahme | Wofür | Hinweis |
|---|---|---|
| **Nutzungsbedingungen** (AGB light): kein Kopieren, kein Auslesen/Reverse Engineering, kein Weitergeben des Zugangs, nur eigene gewerbliche Nutzung, Hinweis „ersetzt keine Prüfung vor Ort“ | schließt die Lücke aus GeschGehG § 3 (Reverse Engineering nur erlaubt, wenn nicht vertraglich verboten); stützt „angemessene Maßnahmen“; deckt auch Haftungshinweis ab | Beim Freischalten per Klick bestätigen lassen. Entwurf kann die Nachtschicht schreiben, **Endfassung ⚖️ prüfen lassen** (AGB-Recht, B2B). |
| **NDA** für wenige enge Tester | Gespräche, in denen Regelwerk-Details gezeigt werden | Unter Kollegen kann eine NDA Vertrauen kosten. Empfehlung: **keine NDA für Gesprächsrunden** (dort zeigst du Nutzen, nicht das Regelwerk), eine **schlanke Vereinbarung** nur für die 3–4 Mittester, die die App mit echtem Zugang nutzen. Besser: Nutzungsbedingungen statt Einzel-NDA. ⚖️ |
| **Zugang nur mit Login** | Wer das Regelwerk sehen darf, ist namentlich bekannt; Sperren möglich | Heute nur ein gemeinsamer `APP_CODE` (steht in [[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]] und Aufgabe „Login statt Zugangscode“). Ein gemeinsamer Code lässt sich weitergeben und nicht einer Person zuordnen. |
| **Impressum/Datenschutz** | getrennt zu sehen | → [[Rechtliches]] |

## 4. Arbeitgeber-Frage (offen, wichtigster Punkt) ⚖️
**Frage:** Wem „gehört“ Zählerklar, wenn Fachwissen, Regelwerk (Excel „Entscheidungsbaum“) oder der Code im Rahmen einer Anstellung im Elektrohandwerk entstanden sind oder entstehen? Ob eine Anstellung besteht, steht nicht im Vault; diese Notiz geht davon aus, dass man es klären muss, und fragt nur offen. Nichts davon ist hier entschieden.

Zu klären (vom Anwalt, Fachanwalt Arbeitsrecht/IT-Recht, oder Beratung der Handwerkskammer/Innung):
1. **Arbeitsvertrag lesen:** Nebentätigkeitsklausel (Anzeige, Genehmigung), Wettbewerbsverbot, Geheimhaltung, Klausel zu „Arbeitsergebnissen/Erfindungen“, Verwendung von Betriebsmitteln. Das kostet nichts und gehört **zuerst** erledigt.
2. **Urheberrecht an Software** (§ 69b UrhG): Programme, die ein Arbeitnehmer *in Wahrnehmung seiner Aufgaben oder nach Weisung* schafft, nutzt grundsätzlich der Arbeitgeber. Ein Programm in der Freizeit, außerhalb der Aufgaben und ohne Betriebsmittel liegt normalerweise beim Arbeitnehmer. Die Grenze ist im Einzelfall fließend ⚖️.
3. **Arbeitnehmererfindungsgesetz** gilt nur für patent-/gebrauchsmusterfähige Erfindungen. Bei Software und Regelwerk meist nicht einschlägig, aber nicht auszuschließen, wenn etwas Technisches dabei ist ⚖️.
4. **Wettbewerb:** Solange das Arbeitsverhältnis läuft, gilt Treuepflicht (bei Handlungsgehilfen § 60 HGB). Ist Zählerklar ein Konkurrenzprodukt zum Geschäft des Arbeitgebers (z. B. Angebotserstellung im Zählerbereich)? Kunden/Betriebe des Arbeitgebers ansprechen ist heikel ⚖️.
5. **Herkunft des Wissens:** Wurden Unterlagen, Schulungen (z. B. Westnetz-Schulung 09/2025), Kundenfälle oder Fotos **vom Arbeitgeber** verwendet? Dann Verwendungsrecht klären; keine Kundenfotos ohne Einwilligung und ohne Adresse/Namen/Zählernummer.
6. **Steuer:** Nebeneinkunft/Gewerbeanmeldung vor dem ersten Euro → **Steuerberater** ⚖️ (Kleinunternehmer, Gewerbe, Anzeige beim Finanzamt).

**Empfehlung:** Vor dem Livegang mit externen Kollegen: Arbeitsvertrag lesen, dann eine **kurze Erstberatung** (oft 1 Stunde, grob 100–250 €, Preis prüfen) mit konkreter Frageliste. Das ist die teuerste mögliche Fehlstelle, weil ein Streit um die Rechte jede spätere Finanzierung oder jeden Verkauf blockiert.

## 5. Realistischer Schutz = Tempo
Jede Idee, die funktioniert, wird irgendwann kopiert. Was bleibt, sind Dinge, die ein Nachbauer nicht in einem Wochenende bekommt:
- **Vorsprung:** erste 20 reale Fälle, erste zahlende Kunden. Bis ein Konkurrent das Regelwerk neu aufgebaut hat, ist die Validierung gelaufen.
- **Netzwerk:** Direktansprache bei Kollegen, Innung, Großhändler ([[Direktansprache]]). Vertrauen lässt sich nicht kopieren.
- **Daten aus echten Fällen:** Fotos + „tatsächliche Entscheidung“ ergeben die Trefferquote und ein eigenes Erkennungs-Benchmark. Nur sinnvoll, wenn die Datenrechte sauber sind (Einwilligung, Datenschutz).
- **Pflege:** Regelwerk aktuell halten (neue Westnetz-TAB nach BDEW-Musterwortlaut 2026). Ein Kopierer hinkt hinterher.
- **Marke/Name** als Wiedererkennung.
- Und ehrlich: Noch gibt es kein Produkt, das jemand klauen wollte. **Das größte Risiko ist nicht Diebstahl, sondern dass nie validiert wird.** Die Gesprächs-Aufgabe geht vor jeder Schutzmaßnahme (→ [[2026-10-02 Ideen-Check]]).

## 6. Maßnahmenliste (priorisiert)
| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | **Arbeitsvertrag lesen** (Nebentätigkeit, Wettbewerb, Erfindungen), Fragen notieren | 0 € | 30 Min. | **jetzt**, vor weiterem Aufbau |
| 2 | **Weitergabe stoppen:** Excel `Entscheidungsbaum`, Demo-HTML und Landingpage-Vorschau nicht an Dritte schicken; Repos privat lassen; keine Schlüssel/Kundendaten ins Repo | 0 € | 0 | sofort |
| 3 | **Erstberatung Anwalt** mit Frageliste (Abschnitt 4 + AGB + Marke) | ca. 100–250 € (prüfen) | 1–2 Std. | vor Livegang/erstem Kollegen-Zugang |
| 4 | **DPMA-Markenrecherche** + Domain `zaehlerklar.de` sichern (steht schon in „Jetzt“); danach Marke anmelden (Kl. 9, 42) | Recherche 0 €, Anmeldung ca. 290 € | 1–2 Std. | nach Gesprächs-Ergebnis, vor Druck des Flyers |
| 5 | **Nutzungsbedingungen** (Entwurf durch Nachtschicht, Prüfung durch Anwalt) + Klick-Zustimmung beim Freischalten | Entwurf 0 €, Prüfung im Beratungstermin | 2 Std. | vor dem ersten externen Tester |
| 6 | **Login statt Zugangscode** (pro Person sperrbar) | 0 € Code | mittel | vor Kollegen-Test (steht in „Irgendwann“) |
| 7 | **Regelwerk serverseitig** (Abschnitt 2) | 0 € | mittel–hoch (1–2 Nachtschichten), Offline-Einbuße | **nach Go**, spätestens vor öffentlichem Livegang |
| 8 | **Schlanke Mittester-Vereinbarung** (statt NDA für alle) | im Beratungstermin | 1 Std. | vor Mittest mit Fremden |
| 9 | Patent/Gebrauchsmuster | – | – | **nicht verfolgen** |

## Verknüpfungen
[[Zählerschrank-Check]] · [[App & Technik]] · [[Rechtliches]] · [[Mein Vorteil]] · [[Ideen-System]] · [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]] · [[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]] · [[ADR-0006 Produktname Zählerklar]]
