---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
thema: schutz
stand: 2026-11-16
status: analyse – keine Rechtsberatung, Rechtsfragen vom Anwalt prüfen lassen
---
# Schutz von Idee und App („Zählerklar“)

> **Keine Rechtsberatung.** Das ist eine Arbeitsanalyse nach allgemeinem Kenntnisstand (Deutschland). Was mit **⚖ Anwalt** markiert ist, ist unsicher oder hängt vom Einzelfall ab. Gebühren bitte vor Nutzung aktuell nachsehen.

**Kurzfazit (ehrlich):**
1. Die *Idee* ist nicht schützbar. Geschützt werden kann nur, was konkret da ist: Code, Texte, Name, Geheimnisse.
2. Der größte reale Schutz ist **Tempo, Netzwerk und Daten aus echten Fällen** – nicht Paragrafen.
3. Es gibt **einen echten technischen Befund**: Das komplette Regelwerk liegt öffentlich im App-Bundle. Das ist vor einem öffentlichen Livegang zu lösen (siehe Abschnitt 2).
4. Die Frage „**Wem gehört die Idee, wenn ich im Elektrohandwerk angestellt bin?**“ ist die einzige, die das Projekt ernsthaft gefährden kann. Sie gehört **vor** den Livegang zum Anwalt (Abschnitt 4).
5. Bevor irgendetwas davon teuer wird: Der größere Risikofaktor ist nicht Diebstahl, sondern dass noch niemand bezahlt (0 Gespräche ausgewertet, siehe [[Validierung & Go-No-Go]]). Schutzmaßnahmen dürfen die Gespräche nicht verdrängen ([[ADR-0001 Zählerschrank-App als Validierungswerkzeug]], [[ADR-0005 Direktansprache vor Instagram]]).

## 1. Was ist in Deutschland überhaupt schützbar?

| Gegenstand | Schutz | Wie | Kosten / Aufwand | Wert für uns |
|---|---|---|---|---|
| **Idee** („Foto → Zählerschrank-Einordnung“) | **keiner** | Gedanken und Konzepte sind frei; Urheberrecht schützt nur die Ausdrucksform | – | Jeder darf die Idee nachbauen. Das Risiko ist Realität, nicht abwendbar. |
| **Quellcode** der App | Urheberrecht (§§ 69a ff. UrhG) | entsteht automatisch, keine Anmeldung | 0 € | Schützt vor 1:1-Kopie, nicht vor Nachbau mit eigenem Code. Nachweis: Git-Historie, Datum der Commits. |
| **Texte, Grafiken, Landingpage, Posts** | Urheberrecht, wenn „persönliche geistige Schöpfung“ | automatisch | 0 € | Kurze Sätze und Listen oft zu wenig „Schöpfungshöhe“. Grafiken/Layout eher geschützt. |
| **Regelwerk R01–R26** (Auswahl, Bedingungen, Formulierung der Maßnahmen) | unklar | Möglich: Urheberrecht an den Formulierungen; evtl. Datenbankwerk/Datenbankherstellerrecht (§ 4, §§ 87a ff. UrhG) bei „wesentlicher Investition“ | 0 € | Die zugrunde liegenden Fakten und Normen (TAB, VDE) sind nicht schützbar. Geschützt wäre höchstens unsere Zusammenstellung. ⚖ **Anwalt** |
| **Produktname „Zählerklar“** | Marke (DPMA, MarkenG) | Anmeldung beim DPMA, Klassen 9 und 42 (laut [[ADR-0006 Produktname Zählerklar]]) | Online-Anmeldung ca. 290 € bis 3 Klassen (Stand nachsehen), Schutz 10 Jahre, verlängerbar; plus Anwalt, falls Recherche/Widerspruch | Schützt nur den **Namen**, nicht die Funktion. Wert wächst erst, wenn der Name bekannt ist. Vorher: Kollisionsrecherche (DPMAregister, EUIPO), sonst droht Abmahnung gegen uns. |
| **Domain** | Registrierung bei DENIC (Priorität „wer zuerst kommt“) | | wenige € / Jahr | Billig und sofort sinnvoll → [[Aufgaben]] |
| **Know-how / Geheimnisse** | Geschäftsgeheimnisgesetz (GeschGehG) | nur geschützt, wenn „**angemessene Geheimhaltungsmaßnahmen**“ nachweisbar sind (§ 2 Nr. 1 GeschGehG): Zugriff beschränken, NDA, Kennzeichnung | gering | Der Schutz greift **nicht**, wenn das Regelwerk offen im Browser liegt (siehe Abschnitt 2). Wichtig: **Reverse Engineering** eines rechtmäßig erworbenen/zugänglichen Produkts ist nach § 3 Abs. 1 Nr. 2 GeschGehG erlaubt, **sofern kein vertragliches Verbot** besteht → Nutzungsbedingungen. |
| **Patent / Gebrauchsmuster** | Software „als solche“ nicht patentierbar (§ 1 Abs. 3 PatG); Gebrauchsmuster schließt Programme ebenfalls aus | | Patent: 4-stellig bis 5-stellig mit Anwalt | **Nicht sinnvoll.** Ein Regelwerk mit Bildanalyse hat kaum „technischen Beitrag“; Aufwand und Kosten stehen in keinem Verhältnis. ⚖ nur falls später ein echtes technisches Verfahren entsteht. |
| **Wettbewerbsrecht** (UWG: Nachahmung, Ausbeutung) | ergänzender Schutz gegen sklavische Nachahmung und Geheimnisverrat | | – | Hilft nur bei besonderen Umständen, kein Ersatz für eigene Maßnahmen. |

**Wichtig – Quellenlage des Regelwerks:** Die Regeln stützen sich auf BDEW-Musterwortlaut TAB, Westnetz-Schulungsunterlagen u. a. (Fundstellen in `regeln.json`). Wir übernehmen **keine Normtexte** (siehe [[Rechtliches]]). Heißt auch: Der Kern des Wissens ist **öffentlich zugänglich**. Unser Vorteil liegt in der Verdichtung, der Fundstellen-Arbeit und der Verknüpfung mit der Fotoerkennung, nicht in einem Geheimnis. Das relativiert den Schaden bei Kopie – und die Relevanz des GeschGehG.

## 2. Technischer Befund: Regelwerk liegt im Bundle

**Befund (geprüft am Code, 16.11.2026):**
- `web/src/regeln.json` (ca. 14 KB, 26 Regeln mit Bedingung, Maßnahme, Fundstelle, Geltung, Status) wird in `web/src/regelwerk.ts` per `import` eingebunden.
- `bewerte()` und `ausgeloesteRegeln()` laufen **komplett im Browser**. Vite packt die JSON in das JavaScript-Bundle der statisch gehosteten App.
- Der `APP_CODE` schützt nur die **Edge Function** (`/analyse`, `/faelle`), **nicht** das ausgelieferte Bundle. Wer die App-URL kennt, kann `regeln.json` und die Logik in den Entwicklertools lesen, ohne Code, ohne Konto.
- Gleiches gilt für den Demo-Build (`npm run build:demo`) und die Quelltext-Fundstellen.
- Offen/ungeprüft: Ob das GitHub-Repository privat ist. Falls öffentlich, liegt alles ohnehin offen. **→ selbst prüfen** (Einstellungen → Sichtbarkeit).

**Bewertung des Risikos:**
- Schadenshöhe **mittel bis niedrig**: Die Inhalte sind aus öffentlichen Quellen verdichtet. Ein Wettbewerber braucht aber nur Stunden statt Wochen für ein Regelwerk, wenn er unseres lesen kann. Außerdem: Das Regelwerk ist unser „Vorsprung“ im Score (5/5, [[Zählerschrank-Check#Score (vorläufig, 03.10.2026)]]), solange es nicht für jeden kopierbar ist.
- Eintrittswahrscheinlichkeit **heute niedrig** (App nicht öffentlich, kaum Nutzer), **steigt stark mit öffentlichem Hosting** (Netlify) und mit Bekanntheit.
- Rechtlich: Wer offen ausliefert, hat es **schwer, Geheimnisschutz zu behaupten** (kein „angemessenes“ Geheimhaltungsmaßnahmen-Konzept). Urheberrecht am Code bleibt bestehen, hilft aber nicht gegen Abschreiben der Regeln. ⚖ Anwalt

**Lösungsskizze: Regelauswertung in die Edge Function verlegen**
1. `regeln.json` und die Logik aus `regelwerk.ts` (nur den Auswertungsteil) in `supabase/functions/api/` ablegen. Neue Route `POST /bewerte` (mit `x-app-code`/Login).
2. Die App schickt nur die **Eingaben** (Schrankfelder, Vorhaben) und bekommt **Ergebnis zurück**: Ampel, ausgelöste Regeln mit `name`, `massnahme`, `fundstelle`, `stufe`, die „Vor Ort klären“-Liste. **Nicht** die Bedingungstexte, nicht die nicht ausgelösten Regeln.
3. Die Bedingungen selbst stehen nur im Code der Funktion, nicht in der Antwort.
4. Tests (`regelwerk.test.ts`, 13 Tests) laufen weiter gegen das Modul; die Funktion bindet dasselbe Modul ein (ein Quellmodul für App-Tests und Funktion, ggf. per Build-Schritt kopieren), damit die Excel-Beispielzeile weiter identisch bleibt.
5. Rate-Limit und Login (Abschnitt 3), sonst kann ein Angreifer das Regelwerk durch systematisches Abfragen **rekonstruieren** („Black-Box-Extraktion“, bei 26 Regeln mit überschaubaren Eingaben realistisch, nur teurer). Schutz: Kontingent je Konto, Auffälligkeiten loggen, keine Massenabfragen.

**Nachteile ehrlich:**
- **Offline/Funkloch:** Die Auswertung braucht Verbindung. Heute funktioniert die Ergebnisanzeige auch ohne Netz (Fälle werden nachgesendet). Auf Baustellen mit schlechtem Empfang ist das ein Rückschritt. Mögliche Abmilderung: Eingaben puffern, Ergebnis nachladen; oder Ergebnis nur nach erfolgreicher Anfrage speichern.
- **Mehr Latenz und Last** auf Supabase Free Tier (kleine Rechenlast, Foto-Analyse dominiert ohnehin).
- **Kein vollständiger Schutz:** Nutzer sehen am Ende pro Fall die ausgelösten Regeln samt Fundstelle. Das ist gewollt (Nachvollziehbarkeit, [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]).

**Einordnung:** Nicht jetzt, solange die App nur auf dem eigenen Handy und bei 3–4 Testern läuft (kein öffentlicher Link, NDA, siehe 3). **Pflicht vor öffentlichem Hosting** und vor dem Wartelisten-/Instagram-Livegang der **App** (die Landingpage selbst enthält kein Regelwerk).

## 3. Verträge und Zugang

- **Geheimhaltung (NDA) für Tester und Kollegen:** Einseitige, kurze Vereinbarung („Testvereinbarung“): Zugang nur zum Testen, keine Weitergabe, keine Screenshots/Exporte an Dritte, kein Nachbau, Rückgabe/Löschung. Das ist auch die **Geheimhaltungsmaßnahme**, die das GeschGehG verlangt. Vorlage vom Anwalt oder einer Handwerkskammer prüfen lassen ⚖. Für die 4 Tester vom 04.10. reicht pragmatisch eine WhatsApp-Bestätigung („Ich teste und gebe nichts weiter“) – schlechter Beweiswert, aber besser als nichts.
- **Nutzungsbedingungen (AGB der App):** u. a. Lizenz nur zur eigenen Nutzung, **ausdrückliches Verbot von Reverse Engineering, Scraping, systematischen Massenabfragen und Weitergabe der Ergebnisse als eigenes Produkt**, Haftungsbegrenzung (Ergebnis ersetzt keine Prüfung durch die Elektrofachkraft, vgl. [[Rechtliches]]), Zugang nur mit Konto. AGB-Recht (§§ 305 ff. BGB) und Haftungsklauseln sind heikel → ⚖ **Anwalt/Generator prüfen lassen**.
- **Zugang nur mit Login:** Der Zugangscode ist ein Einzelnutzer-Schutz ([[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]], „vor Kollegen-Test Login nachrüsten“). Für Schutz heißt das: personenbezogene Konten (Supabase Auth), pro Konto Kontingent und Sperrmöglichkeit, Einladung nur per Link. Das passt zur offenen Aufgabe „Login statt Zugangscode“ ([[Aufgaben]], Irgendwann).
- **Kein Zugangscode im Flyer/Post:** Der Link zur Warteliste ist öffentlich, der Zugang zur App nicht.
- **Datenschutz** (Fotos, Auftragsverarbeitung) gehört nicht hierher, siehe [[Rechtliches]].

## 4. Arbeitgeber-Frage (offen, ⚖ Anwalt/Steuerberater)

**Frage:** Wem gehört die Idee, das Regelwerk und der Code, wenn das im Rahmen einer Anstellung im Elektrohandwerk entstanden ist?

Was ich sicher weiß (allgemein, nicht auf den Einzelfall bezogen):
- **Idee und Fachwissen** sind frei. Allgemeines Berufswissen darf man mitnehmen und nutzen.
- **Software, die ein Arbeitnehmer in Wahrnehmung seiner Aufgaben oder nach Anweisung schafft** (§ 69b UrhG): Die vermögenswerten Rechte stehen dem Arbeitgeber zu. Hier ist die Frage, ob die App „in Erfüllung der Aufgaben“ entstanden ist. Bei privater Entwicklung in der Freizeit ohne Betriebsmittel eher nein, aber **nicht automatisch**.
- **Arbeitnehmererfindungsgesetz** betrifft patent-/gebrauchsmusterfähige Erfindungen. Bei Software ohne Patent praktisch kaum relevant, aber der Arbeitsvertrag kann eigene Klauseln enthalten.
- **Nebentätigkeit / Wettbewerbsverbot:** Viele Arbeitsverträge verlangen Anzeige oder Genehmigung; ein Konkurrenzprodukt zum Arbeitgeber kann untersagt sein (Treuepflicht, bei Handlungsgehilfen § 60 HGB entsprechend). Hier ist das Produkt kein Elektrohandwerksbetrieb, sondern Software für Elektrobetriebe – aber die **Kunden** sind u. U. die Wettbewerber/Geschäftspartner des Arbeitgebers.
- **Betriebsgeheimnisse und Betriebsmittel:** Wurden Arbeitszeit, Firmen-Rechner, Firmenfotos, Kundendaten oder interne Unterlagen (z. B. Schulungsunterlagen, interne Checklisten) genutzt? Dann steigt das Risiko erheblich. **Echte Kundenfotos aus dem Betrieb** dürfen ohne Erlaubnis nicht in die App.

**Zu klären (Checkliste für den Anwalt-Termin):**
1. Arbeitsvertrag und ggf. Tarifvertrag: Nebentätigkeit, Wettbewerb, Verwertung von Arbeitsergebnissen, Geheimhaltung.
2. Wo und womit ist das Regelwerk entstanden (Freizeit, eigene Geräte, Fachwissen vs. betriebsinterne Unterlagen)? Die Quellen in `regeln.json` stehen öffentlich (BDEW, Westnetz-Schulung) – woher stammt die Schulung, war sie betrieblich bezahlt?
3. Wer erfasst künftig Fälle: darf ich Fotos von Kundenanlagen nutzen, die im Dienst entstanden sind? (→ Besser: nur eigene Fotos/Fotos mit Einwilligung.)
4. Schriftliche **Freigabe/Bestätigung des Arbeitgebers** für die Nebentätigkeit, solange Kollegen aus dem Betrieb Zielgruppe sind – ggf. Offenlegung, bevor es jemand anderes erfährt.
5. Steuerberater: Gewerbeanmeldung, Kleinunternehmerregelung, Gewinn aus Nebentätigkeit; siehe [[Einschätzung Handwerks-Apps als Nebeneinkommen]].

**Einordnung:** Ich kann das nicht entscheiden. Fachlich: Wenn niemand aus dem Betrieb davon weiß und die Kollegen Kunden werden sollen, ist ein **offenes Gespräch** die robustere Strategie als ein späterer Streit. Das ist eine persönliche Entscheidung. **Zeitpunkt:** vor Livegang und vor dem ersten bezahlten Kunden, möglichst vor dem Posten in Gruppen (Direktansprache läuft schon, siehe [[Direktansprache]]).

## 5. Realistischer Schutz: Tempo, Netzwerk, Daten

Gegen jemanden, der einen Nachbau wirklich will, hilft rechtlich wenig. Was bleibt, ist der Vorsprung:
- **Tempo:** Die ersten 15 Gespräche und die ersten 20 echten Fälle liefern, was kein Wettbewerber hat. Jede Woche ohne Gespräche verschenkt Vorsprung.
- **Netzwerk:** Direkter Draht zu Betrieben, Innung, Großhändler ([[Mein Vorteil]], [[ADR-0005 Direktansprache vor Instagram]]). Das lässt sich nicht kopieren.
- **Daten aus echten Fällen:** Gespeicherte Entscheidungen („Deine tatsächliche Entscheidung“) ergeben Trefferquoten und eine Fehlerkorpus. Das ist mit der Zeit der wertvollste Teil und kein Bundle-Inhalt. Fotos/Fälle liegen nicht im Browser, sondern in Supabase.
- **Pflege:** Ein aktuelles Regelwerk (neue TAB, neue Westnetz-Vorgaben) ist laufende Arbeit. Ein einmal kopierter Stand veraltet. → [[Zählerschrank-Check]] Aufgabe „Neue Westnetz-TAB beobachten“.
- **Marke und Vertrauen:** Der Name „Zählerklar“ gewinnt Wert, wenn Kollegen ihn kennen; deshalb Name sichern, aber erst nach der Recherche (ADR-0006).
- **Nicht tun:** Ängstlich werden und den Start verschieben. Niemand klaut eine Idee, die keiner kennt.

## 6. Priorisierte Maßnahmenliste

| # | Maßnahme | Kosten | Aufwand | Wann | Wer |
|---|---|---|---|---|---|
| 1 | **Arbeitgeber-Frage klären** (Arbeitsvertrag lesen; Anwalt-Termin, 1 Std. Erstberatung) | ca. 100–300 € (Erstberatung, schätzen) | 1–2 Std. + Termin | **vor Livegang / vor erstem Kunden** | Nutzer ⚖ |
| 2 | Repo-Sichtbarkeit prüfen (privat?) | 0 € | 5 Min. | sofort | Nutzer |
| 3 | `zaehlerklar.de` per DENIC prüfen/sichern, DPMA-Recherche | Domain wenige €; Recherche 0 € | 30 Min. | schon als Aufgabe offen | Nutzer |
| 4 | **Testvereinbarung/NDA-Kurzfassung** für Tester und Kollegen (Entwurf, vom Anwalt prüfen) | 0 € Entwurf, ggf. Prüfung | 1 Std. | vor dem Mittesten durch Kollegen | Nachtschicht (Entwurf), Anwalt |
| 5 | **Nutzungsbedingungen** der App (Reverse-Engineering-Verbot, Haftung) | Generator/Anwalt ca. 0–300 € | 2 Std. | vor öffentlichem Livegang | Nutzer ⚖ |
| 6 | **Regelwerk serverseitig** (Abschnitt 2) | 0 € (nur Zeit) | ca. 0,5–1 Tag Code | **Pflicht vor öffentlichem Hosting der App** | Nachtschicht möglich (kein Zugang nötig) |
| 7 | Login statt Zugangscode, Konto-Kontingent, Rate-Limit | 0 € | 1–2 Tage | vor Livegang | Code, später |
| 8 | Marke „Zählerklar“ beim DPMA (Klassen 9, 42) | ca. 290 € + ggf. Recherche | 1 Std. | erst nach Name bestätigt und erste Resonanz | Nutzer ⚖ |
| 9 | Git-Historie und Entstehungsdaten als Nachweis aufbewahren, keine Geheimnisse in Repo/Vault | 0 € | laufend | laufend | beide |
| 10 | Patent/Gebrauchsmuster | hoch | – | **nicht verfolgen** | – |

**Reihenfolge:** 1 und 2 sofort (billig, lösen das größte Risiko), dann 3. Alles Übrige hängt am Livegang. Bis zur Entscheidung nach den Gesprächen bleibt die App **nicht öffentlich**, damit 6 und 7 nicht vorgezogen werden müssen ([[Ideen-System]]: erst verkaufen, dann bauen).

## Offene Fragen für Anwalt/Steuerberater (Sammelliste)
- Arbeitgeber: § 69b UrhG, Nebentätigkeit, Wettbewerb, Betriebsunterlagen (Abschnitt 4)
- Ist das Regelwerk als Datenbankwerk / Geschäftsgeheimnis schützbar, solange Quellen öffentlich sind?
- Reicht eine kurze Testvereinbarung (WhatsApp/PDF) als „angemessene Geheimhaltungsmaßnahme“?
- Haftungsklausel in den Nutzungsbedingungen: wie weit darf sie bei sicherheitsrelevanten Einordnungen gehen?
- Marke: Kollisionsrisiko „Zählerklar“ (Klassen 9, 42), Widerspruchsrisiko

Siehe auch: [[Rechtliches]], [[App & Technik]], [[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]], [[Zählerschrank-Check]].
