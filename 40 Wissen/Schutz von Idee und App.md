---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-11-24
status: analyse – keine Rechtsberatung, rechtliche Punkte vom Anwalt prüfen lassen
---
# Schutz von Idee und App („Zählerklar“)

> Analyse der Nachtschicht vom 24.11.2026, **keine Rechtsberatung**. Alles mit ⚖️ ist unsicher und gehört vor einer Entscheidung zu Anwalt oder Steuerberater. Kosten sind grobe Größenordnungen und nicht recherchiert/belegt.

**Kurzfazit:** Die *Idee* ist nicht schützbar. Geschützt werden können Code (automatisch), Name (Marke) und das Regelwerk als Geschäftsgeheimnis, **aber nur, wenn es auch wirklich geheim bleibt**. Genau das ist aktuell nicht der Fall (siehe Punkt 2). Realistischer Schutz kommt vor allem aus Tempo, Netzwerk und Daten (Punkt 5).

## 1. Was ist in Deutschland überhaupt schützbar?
| Gegenstand | Schutz | Was nötig ist | Einschätzung |
|---|---|---|---|
| **Idee / Konzept** („Foto → Ampel nach TAB“) | keiner | – | Ideen sind frei. Jeder darf dasselbe bauen. |
| **Quellcode, App, Texte, Grafiken** | Urheberrecht (UrhG), entsteht automatisch | persönliche geistige Schöpfung; nichts anmelden | Schützt nur vor Kopieren des konkreten Codes, nicht vor einer Neuentwicklung mit gleicher Funktion. Beleg zur Beweisführung: Git-Verlauf mit Datum. |
| **Name „Zählerklar“, Logo** | Marke (DPMA) oder Werktitel/Unternehmenskennzeichen durch Benutzung | Recherche, Anmeldung, Klassen 9 und 42 (laut [[ADR-0006 Produktname Zählerklar]]) | Anmeldung beim DPMA kostet nach meiner Kenntnis rund 290 € für bis zu 3 Klassen (⚖️ aktuell prüfen). Vorher Recherche, sonst droht Abmahnung durch Dritte. Name ist der günstigste und wirksamste Schutz. |
| **Regelwerk R01–R26, Entscheidungslogik** | Geschäftsgeheimnis nach GeschGehG | (a) nicht allgemein bekannt, (b) wirtschaftlicher Wert, (c) **angemessene Geheimhaltungsmaßnahmen** (§ 2 GeschGehG) | Ohne Maßnahmen kein Schutz. Reverse Engineering ist nach GeschGehG ausdrücklich erlaubt, wenn das Produkt rechtmäßig erworben/öffentlich zugänglich ist und keine Vertragspflicht dagegensteht. Deshalb braucht es Nutzungsbedingungen (Punkt 3). |
| **Normen, TAB-Texte** | fremdes Urheberrecht | – | Gehören uns nicht. Es stehen nur Fundstellen im Regelwerk (so schon in [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]). Das Regelwerk ist also eine **Auswahl und Auslegung** öffentlicher Vorgaben, kein Geheimnis im strengen Sinn. Der Wert liegt in Zusammenstellung, Bedingungslogik und Praxiserfahrung. ⚖️ |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist nicht patentfähig (§ 1 Abs. 3 PatG); Gebrauchsmuster gibt es für Verfahren nicht | – | Praktisch nicht relevant, teuer, unsicher. **Nicht verfolgen.** |
| **Datenbank (Fälle, Fotos)** | Datenbankschutzrecht (§§ 87a ff. UrhG) bei wesentlicher Investition | später relevant | Erst relevant, wenn viele Fälle vorliegen. |

## 2. Technischer Befund: Das Regelwerk liegt im Browser
**Befund (Code geprüft am 24.11.2026):**
- `web/src/regeln.json` (ca. 14 KB: alle 26 Regeln mit Bedingung, Maßnahme, Stufe, Fundstelle, Status) wird in `web/src/regelwerk.ts` per `import` eingebunden und ist damit **Teil des ausgelieferten JavaScript-Bundles**.
- Die Regelauswertung (`ausgeloesteRegeln`, `bewerte`) läuft vollständig im Browser (`web/src/main.ts` ruft `bewerte` lokal auf). Die Edge Function (`supabase/functions/api`) liefert nur die KI-Erkennung und speichert Fälle.
- Folge: Wer die App-URL öffnet, kann Bundle und Regelwerk in den Entwicklerwerkzeugen **vollständig und lesbar herunterladen**. Minifizierung ist keine Geheimhaltung.

**Risikobewertung:**
- **Wahrscheinlichkeit:** gering bis mittel, solange die App unbekannt ist. Hoch, sobald sie Kunden hat: Mitbewerber (auch Kollegen) können das Regelwerk in Minuten kopieren.
- **Schaden:** mittel. Das Regelwerk ist ein Kernstück des Vorsprungs (Score „Vorsprung 5“ in [[Zählerschrank-Check]]). Die Fundstellen selbst sind öffentlich, aber Auswahl, Bedingungslogik und Maßnahmentexte sind Arbeit.
- **Rechtlich:** Wer das Regelwerk offen ausliefert, ohne Zugangsbeschränkung und Nutzungsbedingungen, kann sich später schwer auf „angemessene Geheimhaltungsmaßnahmen“ berufen. ⚖️
- **Aktuell abgemildert:** Die App ist nicht online, der Zugriff läuft über Zugangscode (kein Login, aber auch nicht öffentlich), und `APP_CODE` schützt nur die API, **nicht das ausgelieferte Bundle**. Wird die App auf Netlify veröffentlicht, ist das Bundle öffentlich, außer die App liegt hinter einem Login (Netlify-Passwortschutz ist kostenpflichtig).

**Lösungsskizze: Regelauswertung in die Edge Function verlegen**
1. Neue Route `POST /bewerte` in `supabase/functions/api/index.ts`: Eingabe = `Eingaben` (wie heute), Ausgabe = `Ergebnis` (Ampel, Maßnahmen, „Vor Ort klären“, Hinweise) **mit Fundstelle je Maßnahme**.
2. `regelwerk.ts` + `regeln.json` wandern in die Function (Deno). Die Logik dort **eine** Quelle; gemeinsame Typen aus `modell.ts` bleiben in der App.
3. App `main.ts`: statt `bewerte(...)` lokal ein Aufruf an `/bewerte`. Die App bekommt nur das Ergebnis, nie das ganze Regelwerk. Die Regelliste auf einer „Regeln“-Seite (falls vorhanden) entfällt oder zeigt nur ausgelöste Regeln.
4. Tests (`regelwerk.test.ts`, 13 Tests) laufen weiter gegen die Function-Logik; Excel-Beispielzeile bleibt der Referenztest.
5. **Offline/Funkloch:** Heute funktioniert die Bewertung ohne Netz. Nach der Umstellung braucht die Bewertung Netz, nur die Erfassung kann lokal puffern. Das ist ein echter Nachteil auf der Baustelle (Keller!) und muss gegen den Schutzgewinn abgewogen werden. Alternative: Bewertung bleibt lokal, Zugang nur mit Login (dann sieht aber jeder eingeloggte Nutzer das Bundle).
6. **Grenze:** Auch serverseitig lässt sich das Regelwerk durch systematisches Abfragen mit vielen Eingaben nachbauen (Black-Box-Extraktion). Gegenmittel: Login pro Nutzer, Rate-Limit, Protokollierung, Nutzungsbedingungen. Vollständig verhindern lässt es sich nicht. ⚖️/Technik

**Empfehlung:** Umstellung **vor dem Livegang** der App, aber **nach** den Gesprächen (Validierung geht vor, siehe unten). Solange nur Tester mit Zugangscode arbeiten, reichen NDA und Zugang ohne öffentliches Hosting.

## 3. Verträge und Zugang
- **NDA / Geheimhaltung für Tester und Kollegen:** kurze Vereinbarung (1 Seite), die benennt, was vertraulich ist (Regelwerk, Fälle, interne Auswertungen), Dauer (z. B. 2 Jahre) und Rückgabe/Löschung. Vorlage vom Anwalt oder aus Handwerkskammer-Material prüfen lassen. ⚖️ Kollegen im Gespräch nicht mit einem NDA abschrecken: Im **Gespräch** (Problem, Preis) braucht es keins, erst beim **Mittesten** mit Zugang zur App.
- **Nutzungsbedingungen / AGB für die App:** kein Kopieren, Ausleiten, Scraping, keine Vervielfältigung des Regelwerks, **Reverse Engineering ausdrücklich untersagt** (wichtig, weil GeschGehG es sonst erlaubt), Haftungsklausel „ersetzt keine Prüfung vor Ort“ (steht schon im Impressumsentwurf, siehe [[Rechtliches]]). ⚖️ AGB-Recht ist streng, selbstgeschriebene Klauseln können unwirksam sein.
- **Zugang nur mit Login:** der heutige Einzel-`APP_CODE` ist für mehrere Tester ungeeignet (ein weitergegebener Code = ganzer Zugang, kein Rate-Limit; schon vermerkt in [[App & Technik]]). Login pro Nutzer (Supabase Auth) ermöglicht Sperren einzelner Nutzer und Nachvollziehbarkeit. Passt zu „Login statt Zugangscode“ in [[Aufgaben]].
- **Kennzeichnung:** Urhebervermerk „© Jahr Name“ und Hinweis „vertraulich“ in App und Regelwerk-Ansicht, kostet nichts, hilft bei Beweis und beim Argument „angemessene Maßnahmen“.
- **Datenschutz** (eigenes Thema, siehe [[Rechtliches]]): Fotos von Kundenanlagen enthalten ggf. personenbezogene Daten; Auftragsverarbeitung mit Supabase/Anthropic dokumentieren.

## 4. Offene Frage: Wem gehört die Idee, wenn sie im Elektrohandwerk entstanden ist?
**Das ist die wichtigste rechtliche Unsicherheit und vor dem Livegang mit Anwalt zu klären.** ⚖️ Ich weiß nicht, ob und wie der Nutzer angestellt ist (Arbeitgeber, Vertrag, Wettbewerbsverbot); das steht nicht im Vault. Zu klären:
1. **Arbeitsvertrag lesen:** Nebentätigkeitsklausel (Anzeige-/Genehmigungspflicht), Wettbewerbsverbot während des Arbeitsverhältnisses (gilt auch ohne Klausel als Nebenpflicht), Verschwiegenheit über Betriebs- und Geschäftsgeheimnisse, Klauseln zu Erfindungen/Rechten.
2. **Arbeitnehmererfindungsgesetz (ArbnErfG):** gilt für patent-/gebrauchsmusterfähige Erfindungen. Software als solche ist meist nicht patentfähig, die Relevanz ist daher vermutlich gering. ⚖️
3. **Urheberrecht an Software (§ 69b UrhG):** Programme, die ein Arbeitnehmer **in Wahrnehmung seiner Aufgaben oder nach Anweisung** schafft, gehören dem Arbeitgeber. Wird die App in der Freizeit und ohne Arbeitsmittel des Betriebs gebaut und ist Softwareentwicklung nicht Teil der Stelle, spricht das für den Nutzer. Risiko steigt, wenn Betriebszeit, Betriebsfotos, Kundenschränke des Arbeitgebers oder dessen Unterlagen verwendet wurden.
4. **Wissen aus dem Betrieb:** Das Regelwerk beruht u. a. auf einer Westnetz-Schulung (09/2025) und öffentlichen TAB. Falls Schulungsunterlagen oder interne Arbeitsanweisungen des Arbeitgebers eingeflossen sind, kann das Geschäftsgeheimnis des Arbeitgebers sein. ⚖️
5. **Wettbewerb:** Wenn der Arbeitgeber selbst Zählerschrank-Prüfungen/Angebote macht und die App seine Kunden anspricht, ist das heikel. Auch das Ansprechen von Kollegen/Kunden des Arbeitgebers als Käufer prüfen.
6. **Fotos aus der Arbeit:** Fotos echter Zählerschränke (Aufgabe „Eigene Fotos sammeln“, „20 reale Schränke erfassen“) sind Kundendaten des Arbeitgebers, wenn sie bei dessen Aufträgen entstehen. **Nur mit Erlaubnis** und ohne Adresse/Name/Zählernummer (so schon vermerkt in [[Aufgaben]]).
7. **Steuerberater:** Gewerbeanmeldung, Kleinunternehmerregelung, Einkünfte neben dem Angestelltenverhältnis.

**Praktischer Weg (günstig):** Schriftlich beim Arbeitgeber um Zustimmung zur Nebentätigkeit bzw. eine **Freigabeerklärung** bitten („Das Projekt hat keinen Bezug zu Ihrem Betrieb, ich nutze keine Betriebsmittel“), vorher Vertrag und ggf. Erstberatung beim Anwalt für Arbeitsrecht (⚖️ Kosten erfragen; Gewerkschaft oder Innung bieten teils Erstberatung an).

## 5. Realistischer Schutz: Tempo, Netzwerk, Daten
Rechtlicher Schutz bleibt dünn. Der echte Graben ist:
- **Vorsprung:** Das Regelwerk ist belegt, Mitbewerber müssten es erst erarbeiten. Wer zuerst bei den Kollegen ist und Vertrauen hat, gewinnt. → [[Mein Vorteil]], [[Direktansprache]].
- **Netzwerk:** Direktzugang zu Betrieben im Westnetz-Gebiet; Empfehlungen sind nicht kopierbar.
- **Daten aus echten Fällen:** Trefferquote, Korrekturen („Deine tatsächliche Entscheidung“) und Fotos sind der eigentliche Schatz. Sie verbessern Erkennung und Regelwerk, und ein später gebauter Konkurrent hat sie nicht.
- **Aktualität:** Regelwerk pflegen (neue TAB nach BDEW 2026 beobachten, siehe [[Aufgaben]]). Eine Kopie wird veralten; ein gepflegtes Produkt nicht.
- **Marke und Gesicht:** Vertrauen in „Zählerklar“ als bekannte Quelle.

**Ehrliche Einschätzung:** Zu viel Schutzaufwand vor der ersten Validierung ist Verschwendung. Kein Kunde, kein Preis, kein Gespräch bisher belegt (siehe [[Validierung & Go-No-Go]]). Die Gefahr, kopiert zu werden, ist heute kleiner als die Gefahr, dass niemand zahlt. Deshalb: wenige billige Schritte jetzt, die teuren erst nach Go.

## 6. Priorisierte Maßnahmenliste
| # | Maßnahme | Wann | Kosten (grob, ⚖️ prüfen) | Aufwand |
|---|---|---|---|---|
| 1 | **Arbeitsvertrag lesen**, Arbeitgeber-Frage klären (Abschnitt 4), ggf. schriftliche Zustimmung | **vor** Livegang und vor Fotos aus Arbeitsaufträgen | 0 € (lesen); Erstberatung Anwalt ca. 100–250 € | 1–3 h |
| 2 | Namensprüfung `zaehlerklar.de` (DENIC) + DPMA-Recherche | vor Druck/Livegang (steht schon in [[Aufgaben]]) | 0 € | 1 h |
| 3 | Kein öffentliches Hosting des Bundles, solange das Regelwerk lokal läuft; Tester nur mit Einladung | bis Maßnahme 5 erledigt | 0 € | – |
| 4 | Einseitiges NDA für Mittester + einfache Nutzungsbedingungen (Anwalt gegenlesen) | vor dem Mittesten | 0–300 € | 2–4 h |
| 5 | **Regelauswertung serverseitig** (Code-Aufgabe, Abschnitt 2) | vor öffentlichem Livegang | 0 € | 1 Nachtschicht |
| 6 | Login pro Nutzer statt `APP_CODE` + Rate-Limit | vor dem Mittesten mit Kollegen | 0 € (Supabase Auth) | 1–2 Nachtschichten |
| 7 | Marke „Zählerklar“ beim DPMA anmelden | nach Go und Namensprüfung | ca. 290 € (bis 3 Klassen) | 1 h |
| 8 | Urhebervermerk und „vertraulich“-Hinweis in App und Regelwerk | beim Livegang | 0 € | 0,5 h |
| 9 | Fotos/Fälle regelmäßig sichern, Git-Verlauf bewahren (Beweis Urheberschaft) | laufend | 0 € | – |
| 10 | Patent/Gebrauchsmuster | **nicht verfolgen** | – | – |

## Quellen und Grenzen
Aus Gesetzeskenntnis (UrhG, GeschGehG, PatG, MarkenG, ArbnErfG) und dem Code-/Vault-Stand vom 24.11.2026. **Keine Recherche von Webquellen in dieser Nacht** (kein Internetzugriff vorgesehen); Gebühren und Paragraphen vor Entscheidung prüfen. Rechtsfragen: ⚖️ Anwalt.
