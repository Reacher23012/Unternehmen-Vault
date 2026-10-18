---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-10-18
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App

Frage: Wie schütze ich [[Zählerschrank-Check]] (Zählerklar) davor, dass jemand Idee, Regelwerk oder App einfach übernimmt? Geschrieben von der Nachtschicht als Analyse. **Keine Rechtsberatung.** Alles mit 🔶 muss ein Anwalt prüfen.

**Kurzfassung:** Die *Idee* ist nicht schützbar. Schützbar sind Code, Name und – mit Aufwand – das Regelwerk als Geschäftsgeheimnis. Das Regelwerk liegt aber heute **komplett offen im Browser** (siehe Abschnitt 2). Das ist der einzige Punkt, den man billig und schnell beheben kann. Echter Schutz kommt ohnehin über Tempo, Kundennähe und Fall-Daten (Abschnitt 5). Ehrlich: Solange die Gespräche (0 von 5) und Fälle (0) fehlen, ist Schutz weniger dringend als Validierung → [[2026-10-02 Ideen-Check]].

## 1. Was ist in Deutschland schützbar?
| Was | Schutz | Praxis für uns |
|---|---|---|
| **Idee / Konzept** („Foto → Regelwerk → Maßnahmenliste“) | **keiner.** Ideen sind frei, auch die Methode. | Nicht schützbar, nicht versuchen. |
| **Code** (App, Edge Function, Landingpage) | Urheberrecht (§ 69a ff. UrhG), entsteht automatisch, kostet nichts. Schützt gegen 1:1-Kopieren, **nicht** gegen Nachbauen mit eigenem Code. | Git-Verlauf als Nachweis der Urheberschaft behalten (Commits mit Datum). Lizenzhinweis „Alle Rechte vorbehalten“ im Repo. |
| **Name / Logo** („Zählerklar“) | **Marke** beim DPMA. Nur eingetragen oder mit Benutzung+Verkehrsgeltung wirksam. Gebühr Anmeldung online ca. 290 € für bis zu 3 Klassen (Stand: nach meiner Kenntnis, bitte beim DPMA prüfen), Schutz 10 Jahre. Vorher Recherche, sonst Abmahnrisiko. | Recherche + Anmeldung stehen schon in [[Aufgaben]] (`zaehlerklar.de`, DPMA). Erst nach Go sinnvoll. Wortmarke reicht. |
| **Regelwerk / Know-how** (R01–R26, Schwellen, Zusammenstellung) | **Geschäftsgeheimnis** nach GeschGehG (§ 2): nur geschützt, wenn es (a) geheim ist, (b) wirtschaftlichen Wert hat **und** (c) der Inhaber **angemessene Geheimhaltungsmaßnahmen** getroffen hat. 🔶 Wer nichts tut, hat keinen Schutz. | Siehe Abschnitt 2 und 3 – die Maßnahmen sind genau das, was fehlt. |
| **Inhalte einzelner Regeln** | Die Grundlagen (TAB, DIN VDE, Westnetz-Schulung) sind **öffentlich bzw. fremd**. Daran hat niemand ein Geheimnis. Geschützt wäre allenfalls die *Auswahl, Verknüpfung und Aufbereitung*. | Realistisch einschätzen: Der Wert liegt in der Aufbereitung, nicht in den Quellen. Keine Normtexte übernehmen (steht schon in [[Rechtliches]]). |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist nicht patentierbar (§ 1 Abs. 3 PatG). Mit „technischem Effekt“ theoretisch möglich, hier unwahrscheinlich. Gebrauchsmuster schließt Verfahren aus. Kosten und Dauer stehen in keinem Verhältnis. 🔶 | **Nicht verfolgen.** |
| **Datenbank** (gesammelte Fälle) | Datenbankherstellerrecht (§ 87a UrhG) bei wesentlicher Investition. Später relevant, wenn viele Fälle da sind. 🔶 | Heute irrelevant, 0 Fälle. |

## 2. Technischer Befund: Das Regelwerk liegt beim Nutzer im Browser
**Geprüft im Code (Stand `master`, Commit `34e3b80`):**
- `web/src/regelwerk.ts` importiert `web/src/regeln.json` (ca. 14 KB: alle 26 Regeln mit Bedingung, Maßnahme, Stufe, **Fundstelle**, Geltung, Status).
- `web/src/main.ts` und `web/src/demo.ts` rufen `bewerte(...)` **im Browser** auf. Die Edge Function (`supabase/functions/api`) macht nur Fotoanalyse und Fall-Speicher, **keine** Regelauswertung.
- Folge: Wer die App-Adresse kennt, kann das fertige JavaScript-Bundle laden und hat die Regeln samt Auswertungslogik im Klartext, ohne Login. Der Zugangscode (`x-app-code`) schützt nur die *API*, nicht die statischen Dateien. Gleiches gilt für das **Demo-Artifact** (enthält Regelwerk im HTML, aber privat) und für alle, die den Quelltext im Vault sehen ([[Regelwerk R01–R26]]; Repo-Sichtbarkeit privat halten – bitte prüfen).

**Risiko bewerten**
- *Eintrittswahrscheinlichkeit heute:* niedrig. Die App ist noch nicht online, es gibt keine fremden Nutzer. Das steigt mit Netlify-Deployment und Kollegen-Test.
- *Schaden:* mittel. Ein Konkurrent könnte das Regelwerk kopieren. Aber: Er braucht trotzdem die Fotoerkennung (Prompt/Backend), Pflege bei Änderungen der TAB, und vor allem Vertrauen im Handwerk.
- *Rechtlich:* Ein offen ausgeliefertes Bundle ist kein „angemessen geheimes“ Know-how. 🔶 Mit hoher Wahrscheinlichkeit entfällt der GeschGehG-Schutz für den Inhalt, solange es so ausgeliefert wird. Reverse Engineering ist nach § 3 Abs. 1 Nr. 2 GeschGehG ausdrücklich erlaubt, wenn das Produkt frei am Markt ist und keine vertragliche Beschränkung besteht → deshalb Abschnitt 3 (Bedingungen).
- Auch Minifizierung/Obfuskation hilft nicht: Es bleibt lesbar genug. Nicht als „Schutz“ verkaufen.

**Lösung (Skizze): Regelauswertung in die Edge Function verlegen**
1. `regeln.json` und `regelwerk.ts` wandern nach `supabase/functions/api/` (serverseitig, nicht im Bundle). Gemeinsame Logik als Modul, damit die 13 Tests weiterlaufen (Tests gegen das Server-Modul, kein Duplikat).
2. Neue Route `POST /bewerte`: Eingaben (Schrankfelder, Vorhaben) rein, **nur Ergebnis** raus: Ampel, ausgelöste Maßnahmen (Text + Fundstelle), „Vor Ort klären“, Hinweise. Mit Header `x-app-code` bzw. später Login.
3. Die App zeigt nur an, was die Antwort liefert. Kein `import ... regeln.json` mehr in `web/`. Prüfung: Bundle nach „R01“ / Regeltexten durchsuchen (Test in CI).
4. Der Fall wird serverseitig mit der Regel-Liste gespeichert (Trefferquote bleibt messbar).
5. **Grenzen, ehrlich:** Wer genug Fälle durchspielt, kann die Regeln aus den Antworten erschließen (Orakel-Angriff). Der Server liefert pro Antwort die Maßnahmentexte und Fundstellen der ausgelösten Regeln. Das kostet Zeit und Konto, verhindert es aber nicht. Gegenmittel: Login pro Nutzer, Rate-Limit, Nutzungsbedingungen (Abschnitt 3). Das ist Abschreckung und Beweisgrundlage, kein Tresor.
6. **Offline/Funkloch:** Heute läuft die Bewertung auch ohne Netz (Review 29.09.). Serverseitig braucht jeder Check Netz. Für den Außeneinsatz ein echter Nachteil → Abwägung gegen den Schutzgewinn; „Offline-Modus“ steht ohnehin erst nach Go an.
7. **Aufwand:** ca. 0,5–1 Tag, keine neue Abhängigkeit. Der Fallback-Schritt ist reversibel.

**Meine Empfehlung:** Umsetzen, **bevor** die App öffentlich oder bei Kollegen läuft (am besten zusammen mit „Login statt Zugangscode“ und dem Einspielen der Edge Function). Vor dem Test mit Kollegen, nicht davor: Für die 5 Gespräche braucht es weder App noch Schutz.

## 3. Verträge und Zugang
- **NDA für Tester/Kollegen:** Einfache Geheimhaltungsvereinbarung vor dem Mittesten (Gegenstand: Zugang, Regelwerk-Inhalte, Interna; Dauer 2–3 Jahre; keine Weitergabe des Zugangs). Für Gespräche über das *Problem* braucht es **keine** NDA und sie schreckt Kollegen ab – nur für den Zugang zur App. 🔶 Muster vom Anwalt oder von der Handwerkskammer prüfen lassen.
- **Nutzungsbedingungen / AGB:** kein Kopieren, kein Auslesen, kein Reverse Engineering, keine Weitergabe des Zugangs, Haftungs- und Hinweistext („ersetzt nicht die Prüfung des Errichters“). Das ist die Grundlage, um Reverse Engineering vertraglich zu untersagen. 🔶 Wirksamkeit gegenüber Unternehmern und Verbrauchern unterscheidet sich.
- **Zugang nur mit Login:** Zugangscode ist ein gemeinsames Passwort (siehe Einschränkung in [[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]]). Pro Nutzer ein Konto → Nachvollziehbarkeit, Sperren möglich. Als Aufgabe steht „Login statt Zugangscode“ bereits unter „Irgendwann“; **vorziehen auf „Als Nächstes“**, weil es Teil des Schutzes ist.
- **Dokumentieren:** Eine kurze Liste „Geheimhaltungsmaßnahmen“ (wer hat Zugang, wo liegt was, wer unterschrieben hat). Genau das verlangt § 2 Nr. 1b GeschGehG als Nachweis.
- **Keine Geheimnisse im Vault/Repo** bleibt Pflicht (Schlüssel, Kundendaten).

## 4. Offene Frage: Arbeitgeber 🔶
Die Idee ist als Elektriker entstanden, möglicherweise im Rahmen einer Anstellung. **Ungeklärt, bitte anwaltlich/bei Steuerberater klären:**
- Gehört etwas dem Arbeitgeber? Maßgeblich ist, ob die Entwicklung aus der *Arbeitspflicht* kommt oder maßgeblich auf Erfahrungen/Arbeiten im Betrieb beruht (**Arbeitnehmererfindungsgesetz** gilt für Erfindungen; für **Software** gilt **§ 69b UrhG**: Rechte an Programmen, die in Wahrnehmung der Aufgaben oder nach Weisung entstehen, hat der Arbeitgeber). Ein nebenher privat gebautes Tool ist der Normalfall – aber 🔶 die Grenze ist fließend.
- **Nebentätigkeit:** Muss sie dem Arbeitgeber angezeigt oder genehmigt werden? Prüfen: Arbeitsvertrag, Tarifvertrag.
- **Wettbewerbsverbot:** Während des Arbeitsverhältnisses darf man dem Arbeitgeber keine Konkurrenz machen. Zielgruppe sind **Elektrobetriebe** – evtl. auch der eigene Arbeitgeber oder dessen Wettbewerber. Klären, ob das kollidiert.
- **Betriebsgeheimnisse:** Westnetz-Schulungsunterlagen oder Betriebsinterna, die ins Regelwerk eingeflossen sind? Quellen im [[Regelwerk R01–R26]] auf Herkunft prüfen (öffentlich vs. nur über den Betrieb erhalten).
- **Selbstständigkeit/Gewerbe:** Anmeldung, Steuer, Kleinunternehmerregel. Das gehört zum Steuerberater-Termin.
- Die Gespräche mit Kollegen sind unproblematisch; geklärt sein sollte es aber, bevor Geld fließt oder Betriebe die App nutzen.

**Konkret:** 1 Termin (Erstberatung Fachanwalt für Arbeitsrecht/IT-Recht, oft Festpreis 100–250 €; Kosten nach meiner Schätzung, nicht geprüft) mit der Fragenliste oben. Bei der Handwerkskammer Existenzgründungsberatung gibt es teils kostenlose Erstberatung.

## 5. Realistischer Schutz durch Tempo und Nähe
Bei Software ohne Patent ist das wahrscheinlich der wichtigste Schutz:
- **Vorsprung:** Regelwerk ist Wissen aus Berufspraxis. Wer kopiert, hinkt hinterher, sobald sich TAB/Netzbetreiber-Vorgaben ändern. Pflegen (siehe Aufgabe „Westnetz-TAB beobachten“) ist der Burggraben.
- **Netzwerk:** Zugang zu Kollegen im Kreis Soest → Vertrauen, Empfehlungen. Der Konkurrent aus der IT hat dieses Netz nicht ([[Mein Vorteil]]).
- **Daten aus echten Fällen:** Foto + tatsächliche Entscheidung = Messung der Trefferquote und Trainingsmaterial für bessere Prompts. Das ist **nicht** kopierbar, wächst mit jedem Fall und ist der eigentliche Wert nach dem Go. Datenschutz/Einwilligung dafür vorher klären → [[Rechtliches]].
- **Marke und Ruf:** „Zählerklar“ als bekannter Name im Handwerk.
- **Schwäche ehrlich:** Wenn die Idee gut ist, kann ein größerer Anbieter (Software-Hersteller für Handwerker, Netzbetreiber selbst, Großhändler) sie nachbauen. Schutz im Rechtssinne verhindert das nicht. Gegenmittel ist, **früh bezahlte Nutzer** zu haben ([[Validierung & Go-No-Go]]).

## 6. Maßnahmenliste (priorisiert)
| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | **Arbeitgeber-/Nebentätigkeitsfrage klären** (Vertrag lesen, Anwalt/Kammer) 🔶 | 0–250 € | 1–2 h + Termin | **vor** dem Go, am besten diese Woche |
| 2 | **Regelwerk serverseitig** (Edge Function `/bewerte`, nichts mehr im Bundle) | 0 € | 0,5–1 Tag | vor Netlify-Deployment und Kollegen-Test |
| 3 | **Login statt Zugangscode** (pro Nutzer, sperrbar) | 0 € | 1 Tag | vor Kollegen-Test |
| 4 | **Nutzungsbedingungen + NDA** für Tester, prüfen lassen 🔶 | 0–300 € | 2–3 h Entwurf + Prüfung | vor Kollegen-Test |
| 5 | Repo/Vault **privat** lassen, Zugriffsliste prüfen, keine Regelwerk-Inhalte in öffentlichen Posts im Detail (Instagram nur Beispiele) | 0 € | 15 Min. | sofort |
| 6 | Liste der **Geheimhaltungsmaßnahmen** führen (1 Notiz) | 0 € | 30 Min. | mit 4 |
| 7 | **Marke** „Zählerklar“ prüfen und anmelden (nach Recherche, nach Go) | ca. 290 € + ggf. Anwalt | 1–2 h | nach Go |
| 8 | Datenbank-/Fall-Daten-Einwilligung klären | im Datenschutz-Check enthalten | – | vor 20 Schränken von Dritten |
| – | Patent / Gebrauchsmuster | – | – | **nicht verfolgen** |

## Was ich nicht weiß
- Ob Arbeitsvertrag/Tarif etwas regelt (🔶).
- Ob das Repo auf GitHub tatsächlich privat ist.
- Woher jede Fundstelle in R01–R26 stammt und ob sie frei verwendbar ist.
- Genaue aktuelle Gebühren (DPMA, Anwalt): vor Entscheidung nachprüfen.

Siehe auch: [[Rechtliches]], [[App & Technik]], [[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]], [[Ideen-System]].
