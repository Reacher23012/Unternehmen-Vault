---
typ: aufgaben
---
# Aufgaben

## Jetzt
- [ ] [[Zählerschrank-Check]]: **Bis 09.10. 5 Gespräche mit Kollegen** – *3 Gespräche am 04.10. vereinbart* (Problem, Häufigkeit, Preis, Mittesten) → [[Gesprächsleitfaden]], Vorlage `90 Vorlagen/Gespräch` *(Vorrang laut [[2026-10-02 Ideen-Check]])*
- [ ] [[Zählerschrank-Check]]: **Nachtschicht – Schutzkonzept „Idee und App vor Diebstahl schützen“** (nur Vault, kein Code ändern; Analyse, keine Rechtsberatung): Notiz `40 Wissen/Schutz von Idee und App.md` schreiben. Inhalt: (1) Was ist in Deutschland überhaupt schützbar – Idee, Code (Urheberrecht), Name (Marke DPMA, Kosten), Regelwerk/Know-how (Geschäftsgeheimnisgesetz: nur mit „angemessenen Geheimhaltungsmaßnahmen“), Patent/Gebrauchsmuster bei Software. (2) **Technischer Befund prüfen:** `web/src/regeln.json` wird über `web/src/regelwerk.ts` ins App-Bundle gebaut, das ganze Regelwerk liegt also beim Nutzer im Browser – Risiko bewerten und Lösung skizzieren (Regelauswertung in die Edge Function verlegen, App bekommt nur Ergebnis + Fundstelle). (3) Verträge: Geheimhaltung (NDA) für Tester/Kollegen, Nutzungsbedingungen (kein Kopieren/Reverse Engineering), Zugang nur mit Login. (4) **Arbeitgeber-Frage**: Wem gehört die Idee, wenn sie im Rahmen einer Anstellung im Elektrohandwerk entstanden ist (Arbeitnehmererfindung, Nebentätigkeit, Wettbewerb) – als offene Frage für Anwalt/Steuerberater markieren. (5) Realistischer Schutz durch Tempo: Vorsprung, Netzwerk, Daten aus echten Fällen. (6) Priorisierte Maßnahmenliste mit Kosten und Aufwand; daraus konkrete Aufgaben in dieser Datei unter „Als Nächstes“ anlegen (Code-Aufgabe „Regelwerk serverseitig“ als eigene Zeile, damit eine spätere Nachtschicht sie umsetzen kann). Ehrlich bleiben: Was unsicher ist, als „vom Anwalt prüfen lassen“ kennzeichnen.
- [ ] [[Zählerschrank-Check]]: **04.10., 19 Uhr** – App fertig fürs Mittesten (4 Tester warten): Anthropic-API-Schlüssel (Guthaben, Ausgabenlimit) + `APP_CODE` in Supabase eintragen, dann Verbindungstest mit Claude
- [ ] [[Zählerschrank-Check]]: WhatsApp Business einrichten (Profil, Begrüßung, Schnellantworten, Labels), Flyer-QR testen, drucken, beim Großhändler auslegen → [[Direktansprache]]
- [ ] [[Zählerschrank-Check]]: Gruppen-Text in 1–2 Elektriker-Gruppen posten → [[Direktansprache]]
- [ ] [[Zählerschrank-Check]]: `zaehlerklar.de` per DENIC prüfen und sichern, DPMA-Markenrecherche, Handle @zaehlerklar → [[ADR-0006 Produktname Zählerklar]]
- [ ] [[Zählerschrank-Check]]: Edge Function neu einspielen (Härtung vom 03.10., zusammen mit den Secrets) → [[App & Technik]]
- [ ] [[Zählerschrank-Check]]: Projekt-E-Mail-Adresse anlegen (Vorschlag: eigene Domain) → in Impressum/Datenschutz eintragen
- [ ] [[Zählerschrank-Check]]: Impressum + Datenschutzerklärung prüfen lassen → [[Rechtliches]]
- [ ] [[Zählerschrank-Check]]: Netlify-Konto anlegen → Landingpage + App online, Warteliste einspielen *(Landingpage zuerst; App erst öffentlich, wenn „Regelwerk serverseitig“ erledigt ist → [[Schutz von Idee und App]])*
- [ ] [[Zählerschrank-Check]]: 20 reale Schränke mit der App erfassen

## Als Nächstes
- [ ] [[Zählerschrank-Check]]: **Arbeitgeber-Frage klären** – Arbeits-/Tarifvertrag (Nebentätigkeit, Wettbewerb, Verschwiegenheit) und Schulungsunterlagen sichten, Termin Anwalt/Kammer, vor dem öffentlichen Livegang → [[Schutz von Idee und App]] (Abschnitt 4)
- [ ] [[Zählerschrank-Check]]: GitHub-Repo `zaehlerschrank-check` auf **privat** prüfen; schriftliches Einverständnis/Geheimhaltung für die 4 Tester vor Zugangsvergabe → [[Schutz von Idee und App]]
- [ ] [[Zählerschrank-Check]]: **Code: Regelwerk serverseitig** – neue Route `POST /bewerten` in `supabase/functions/api`; `regelwerk.ts` + `regeln.json` aus `web/src/` in den Serverbereich verlegen, App ruft die Route, Antwort nur mit greifenden Regeln (id, name, Maßnahme, Stufe, Fundstelle), Demo mit festen Beispielergebnissen, Tests weiter grün; kein Deployment → [[Schutz von Idee und App]] (Abschnitt 2) *(vor öffentlichem Hosting der App, nicht vor den Gesprächen)*
- [ ] [[Zählerschrank-Check]]: Nutzungsbedingungen (kein Auslesen/Reverse Engineering, Zugang nicht teilen, „Ersteinschätzung“) schreiben und vom Anwalt prüfen lassen, Bestätigung beim ersten Login → [[Schutz von Idee und App]]
- [ ] [[Zählerschrank-Check]]: Marken-Recherche „Zählerklar“ im DPMAregister (Klassen 9, 42), danach über Anmeldung (ca. 290 €) entscheiden → [[Schutz von Idee und App]], [[ADR-0006 Produktname Zählerklar]]
- [ ] [[Zählerschrank-Check]]: QR-Codes der 3 Druckvorlagen mit dem Handy testen, dann drucken → [[Direktansprache]]
- [ ] [[Zählerschrank-Check]]: Instagram vorbereiten: Impressum-Link (hängt an [[Rechtliches]]), Canva-Posts 1–3 auf „Zählerklar“ umstellen, Posts 1–10 fachlich gegenlesen → [[Instagram-Posts 1–10]]
- [ ] [[Zählerschrank-Check]]: Eigene Fotos echter Zählerschränke für Rätsel-Posts sammeln (ohne Adresse, Namen, Zählernummer)
- [ ] [[Zählerschrank-Check]]: Anschreiben an HWK Dortmund + Südwestfalen ausfüllen und senden (nach Namensprüfung) → [[Anschreiben Handwerkskammern]]
- [ ] [[Zählerschrank-Check]]: Innung Kreis Soest anfragen (5 Min. Versammlung oder Rundschreiben) → [[Direktansprache]]
- [ ] [[Zählerschrank-Check]]: Instagram-Konto @zaehlerklar anlegen, Posts auf „Zählerklar“ umstellen → [[Instagram]] (Phase 2, nach Landingpage)
- [ ] [[Zählerschrank-Check]]: Name „Zählerklar“ in App, Landingpage, Impressum übernehmen; Warteliste-Quelle per `?quelle=` statt fest „instagram“
- [ ] [[Zählerschrank-Check]]: 2 Gespräche mit SHK-Betrieben (Wärmepumpe): Wie oft bremst der Zählerschrank den Auftrag, wer klärt das heute, was wäre es wert? → [[Zählerschrank-Check#Weitere Zielgruppen (Hypothesen, 04.10.2026)]]
- [ ] [[Zählerschrank-Check]]: Restliche 10 Gespräche mit Kollegen (insgesamt 15) → [[Validierung & Go-No-Go]]
- [ ] [[Zählerschrank-Check]]: Offene Regeln R07, R09, R11, R19 mit Unterlagen belegen
- [ ] [[Zählerschrank-Check]]: Neue Westnetz-TAB nach BDEW-Musterwortlaut 2026 beobachten
- [ ] [[Zählerschrank-Check]]: Dritten Instagram-Post in Canva fertigstellen und gegenlesen
- [ ] [[Mein Vorteil]] prüfen: Stunden pro Woche, Budget und No-Gos ergänzen

## Irgendwann
- [ ] [[Zählerschrank-Check]]: Reel mit Bildschirmaufnahme der App
- [ ] [[Zählerschrank-Check]]: Double-Opt-in für die Warteliste
- [ ] [[Zählerschrank-Check]]: Login statt Zugangscode, bevor Kollegen testen

## Erledigt
- [x] Inbox „Online-Business aufbauen“ geklärt: keine eigene Idee, sondern das Oberziel des Vaults. Es wird über [[Zählerschrank-Check]] verfolgt, siehe [[Ideen-Pipeline]] (04.10.2026)
- [x] [[Zählerschrank-Check]]: Checkliste A5, Aushang A4, Instagram-Posts 4–10 gebaut, Bildtexte 1–10, Anschreiben HWK Dortmund + Südwestfalen, WhatsApp-Business-Texte (03.10.2026)
- [x] [[Zählerschrank-Check]]: Name „Zählerklar“ festgelegt, Marketing auf Direktansprache umgestellt (ADR-0005/0006), Flyer-Entwurf A5 + WhatsApp-Texte (03.10.2026)
- [x] [[Ideen-System]] aufgebaut: Phasen, Score, [[Geldmodelle für KI-Ideen]], Vorlagen, `/idee` + `/wochenrueckblick`; Zählerschrank-Check mit 18/25 bewertet (03.10.2026)
- [x] [[Zählerschrank-Check]]: Sicherheits-Check (best-practices): Schriften selbst gehostet, Netlify-Header/CSP, Edge Function gehärtet; Gesprächsleitfaden erstellt (03.10.2026)
- [x] [[Zählerschrank-Check]]: App-Prototyp gebaut (29.09.2026)
- [x] [[Zählerschrank-Check]]: Supabase-Projekt Frankfurt + Edge Function (29.09.2026)
- [x] [[Zählerschrank-Check]]: Code-Review, 2 Fehler behoben (29.09.2026)
- [x] [[Zählerschrank-Check]]: Demo zum Vorzeigen auf dem Handy (29.09.2026)
- [x] [[Zählerschrank-Check]]: Landingpage mit Warteliste gebaut, Impressum/Datenschutz als Entwurf (29.09.2026)
- [x] [[Zählerschrank-Check]]: 2 Instagram-Karussells in Canva erstellt und fachlich korrigiert (29.09.2026)
