---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-11-22
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App („Zählerklar“)

> **Keine Rechtsberatung.** Alles, was mit **[Anwalt]** markiert ist, ist unsicher oder hängt vom Einzelfall ab und muss vor einer Entscheidung geprüft werden. Kostenangaben sind Größenordnungen aus dem Gedächtnis (Stand nicht tagesaktuell) und vor Nutzung bei DPMA/Anbieter zu prüfen.

**Kurzfassung:** Die *Idee* ist nicht schützbar. Schützbar sind Code, Name und – mit Aufwand – das Regelwerk als Geschäftsgeheimnis. Der größte Hebel ist nicht ein Papier, sondern (1) das Regelwerk nicht mehr komplett an jeden Browser auszuliefern, (2) Tester nur mit Login und Bedingungen zuzulassen, (3) die Arbeitgeber-Frage zu klären und (4) Tempo + Daten aus echten Fällen. Nichts davon darf die Validierung ([[Validierung & Go-No-Go]]) verdrängen.

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Praxis für Zählerklar |
|---|---|---|
| **Idee** („Foto → Zählerschrank-Einordnung“) | **Kein Schutz.** Ideen sind frei. | Nicht zu verhindern. Wert liegt in Umsetzung, Regelwerk, Netzwerk. |
| **Code** (Web-App, Edge Function) | Urheberrecht (§ 69a ff. UrhG), entsteht automatisch, keine Anmeldung. Schützt gegen **Kopieren**, nicht gegen eine eigene Neuprogrammierung derselben Funktion. | Repo privat halten, Commits belegen Urheberschaft (Datum, Autor). |
| **Name / Logo** | Marke (DPMA). Wortmarke online grob **~300 €** für 3 Klassen, 10 Jahre, Klassen 9 und 42 laut [[ADR-0006 Produktname Zählerklar]]. Ohne Marke nur schwacher Schutz (Unternehmenskennzeichen/Werktitel, entsteht durch Benutzung). | Erst nach Namensprüfung (DENIC, DPMA-Recherche). **Nicht vor Go anmelden**; Recherche (kostenlos) jetzt. Ähnliche Marken können Anmeldung scheitern lassen **[Anwalt, wenn Treffer]**. |
| **Regelwerk R01–R26** (Auswahl, Bedingungen, Formulierungen) | (a) **Geschäftsgeheimnis** nach GeschGehG – nur wenn *geheim*, *wirtschaftlich wertvoll* und durch **angemessene Geheimhaltungsmaßnahmen** geschützt (§ 2 Nr. 1). (b) Texte ggf. Urheberrecht (Sprachwerk) – die zugrundeliegenden **Fakten/Normwerte nicht**. (c) Als Sammlung evtl. Datenbankschutz (§ 87a UrhG, nur bei wesentlicher Investition). | Ist heute **faktisch nicht geheim** (siehe 2). Ohne Maßnahmen kein GeschGehG-Schutz. Fundstellen auf fremde Normen/TAB bleiben nur Verweise ([[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]). |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist ausgeschlossen (§ 1 Abs. 3 PatG, § 1 Abs. 3 GebrMG). Nur bei **technischem Beitrag** möglich, hier (Regelauswertung + Bilderkennung per Standard-API) **unwahrscheinlich**. Patent kostet fünfstellig inkl. Anwalt und dauert Jahre. | **Nicht empfohlen.** **[Anwalt/Patentanwalt]** nur falls doch ein technisches Alleinstellungsmerkmal auftaucht. |
| **Fotos/Falldaten** | Gehören dem, der fotografiert (Urheberrecht am Foto; dazu Kundendaten/DSGVO). | Nutzungsbedingungen: Nutzungsrecht für Auswertung/Verbesserung einholen. Siehe [[Bildrechte im Marketing]], [[Rechtliches]]. |

## 2. Technischer Befund: Regelwerk liegt im Browser
**Befund (Code geprüft, 22.11.2026):**
- `web/src/regelwerk.ts` (124 Zeilen) enthält die **komplette Auswertung** als lesbare Bedingungen („R06: Trennstelle = Nein und Vorhaben und (Westnetz oder 3-Punkt)“ …).
- `web/src/regeln.json` (26 Regeln, 261 Zeilen) enthält Name, **Bedingung als Klartext**, Maßnahme, Stufe, **Fundstelle** und Geltung – also genau das, was den Wert ausmacht.
- `main.ts` importiert `bewerte` aus `regelwerk.ts`; Vite bündelt beides ins Bundle. Jeder, der die App-URL kennt, kann das JS laden (Browser-Entwicklertools), **unabhängig vom Zugangscode** – der Code schützt nur die Edge Function (`/analyse`, `/faelle`), nicht die Regeln. Dazu kommt `demo.ts` (nutzt ebenfalls `bewerte`) und der private Demo-Build als Artifact auf claude.ai (`build:demo`, gleiche Logik enthalten – nur Freigabelink-Inhaber sehen es).
- Die Excel-Vorlage (`Anhänge/Entscheidungsbaum_Zaehlerschrank.xlsx`) im Vault enthält dasselbe Wissen; der Vault muss **privat** bleiben **[prüfen: Sichtbarkeit beider GitHub-Repos]**.

**Risiko-Bewertung (ehrlich):**
| Aspekt | Einschätzung |
|---|---|
| Wie leicht abgreifbar? | Sehr leicht: eine Person mit Browser-Tools in Minuten, ohne Zugangscode. Minifizierung hilft kaum, die Texte in `regeln.json` stehen im Klartext. |
| Wie wertvoll ist das Abgegriffene? | Mittel. 26 Regeln mit Fundstellen sind in einem Nachmittag aus öffentlichen TAB/VDE-Dokumenten **nachbaubar**, wenn man sie kennt – der Vorsprung ist Zeit und Auswahl, kein Zauber. Wertvoller werden die **Praxis-Korrekturen** (welche Regel in der Realität greift), die erst mit echten Fällen entstehen. |
| Folge für GeschGehG | Wer das Regelwerk frei ausliefert, kann später schwer behaupten, es sei „angemessen geschützt“ gewesen **[Anwalt]**. Außerdem ist **Reverse Engineering** eines öffentlich vertriebenen Produkts nach § 3 Abs. 1 Nr. 2 GeschGehG grundsätzlich erlaubt, **es sei denn, es ist vertraglich ausgeschlossen** – deshalb die Nutzungsbedingungen (Punkt 3). |
| Heute akut? | Gering: App ist nicht online, kein Netlify, keine Tester außer dir. **Wird akut**, sobald die App ins Netz geht oder Kollegen testen. Vor diesem Zeitpunkt lösen, nicht danach. |

**Lösungsskizze „Regelwerk serverseitig“** (Details als Aufgabe unten):
1. Neue Route `POST /bewerte` in `supabase/functions/api/index.ts` (hinter `x-app-code`/Login): nimmt `Eingaben`, gibt `Bewertung` zurück – **Ergebnis (Ampel), nur die ausgelösten Regeln mit Maßnahme + Fundstelle, offene Punkte, Messkonzept**. Die App bekommt nicht das Regelwerk, nur die Antwort.
2. `regelwerk.ts` + `regeln.json` wandern in die Function (oder ein gemeinsames Modul, das nur die Function einbindet). Die Tests laufen weiter gegen dieselbe Datei (kein Doppelpflegen von zwei Regelwerken).
3. Das Web-Bundle enthält danach nur Typen (`modell.ts`) und Eingabefelder, keine Bedingungen, keine `regeln.json`.
4. **Grenzen, ehrlich:**
   - Wer mit Login beliebig oft abfragt, kann das Regelwerk **Stück für Stück „ausmessen“** (Orakel). Gegenmaßnahmen: Login je Nutzer statt gemeinsamer Code, **Rate-Limit** pro Nutzer, Protokoll auffälliger Abfragemuster. Vollständig verhindern lässt es sich nicht, nur teurer machen.
   - Kein Offline-Betrieb mehr (Funkloch auf der Baustelle). Die App speichert Fälle bereits lokal und sendet nach ([[App & Technik]]); die **Bewertung** bräuchte dann Netz. Der geplante Offline-Modus (Service Worker, „erst nach Go“) widerspricht dem; ein Kompromiss wäre, nur grobe Regeln lokal zu halten, wäre aber wieder Abfluss. **Entscheidung** nach Rückmeldung aus den Gesprächen („wie oft habt ihr kein Netz im Keller?“).
   - Das **Demo-Artifact** kann keinen Server aufrufen. Es bleibt mit **Beispieldaten** und nur den in der Demo gezeigten Regeln; nicht weitergeben.
   - Mehr Latenz und Last auf der Edge Function (Free Tier, Limit 150 s pro Aufruf gilt nur für Fotoanalyse; `/bewerte` ist ms-schnell).
5. Zusätzlich billig: Source Maps in Produktion aus (`build.sourcemap: false`, Standard bei Vite, aber ausdrücklich prüfen), kein `regeln.json` mehr in `public/`.

## 3. Verträge und Zugang
| Baustein | Zweck | Stand/Empfehlung |
|---|---|---|
| **NDA / Geheimhaltung** für Tester und Kollegen | Voraussetzung für „angemessene Geheimhaltungsmaßnahmen“ (GeschGehG); schützt Regelwerk-Details und Zugangsdaten. | Eine Seite, einfach, **nur für Personen, die mehr als das Marketing sehen** (Tester mit Login). Für Gespräche über das *Problem* braucht es kein NDA – das wäre abschreckend und schützt nichts, weil die Idee frei ist. Muster **vom Anwalt prüfen lassen** (Vertragsstrafen, Laufzeit, AGB-Recht!). |
| **Nutzungsbedingungen** (Testphase) | Kopier-, Weitergabe- und Reverse-Engineering-Verbot, Haftungsausschluss („Ersteinschätzung, ersetzt Prüfung durch Elektrofachkraft“), Nutzungsrecht an hochgeladenen Fotos/Falldaten, Verbot, Zugang weiterzugeben. | Als Entwurf vorbereiten, vor dem ersten fremden Tester einblenden (Häkchen beim ersten Login). **[Anwalt]**: Wirksamkeit gegenüber Gewerbetreibenden (B2B) und Reverse-Engineering-Klausel. |
| **Zugang nur mit Login** | Wer nicht eingeloggt ist, sieht nichts außer Landingpage. Je Tester eigenes Konto → Missbrauch zuordenbar, Zugang entziehbar. | Heute **ein gemeinsamer `APP_CODE`** ([[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]], Aufgabe „Login statt Zugangscode“ steht unter „Irgendwann“). **Vor dem Kollegen-Test vorziehen** (siehe Aufgabenliste). |
| **Datenschutz/AV** | Fotos gehen an Anthropic (USA), Speicherung Frankfurt, Netlify US. | siehe [[Rechtliches]]. |

## 4. Arbeitgeber-Frage – **offene Frage für Anwalt/Steuerberater**
Ausgangslage laut [[Mein Vorteil]]: Fachwissen aus dem Elektrohandwerk; ob angestellt oder selbständig, ist im Vault nicht festgehalten (Impressum-Entwurf nennt Name/Anschrift in Anröchte; „Handwerksbetrieb“-Angaben sind offen). **Annahme dieser Notiz: Du bist (auch) angestellt im Elektrohandwerk. Bitte korrigieren.**

Fragen, die geklärt werden müssen (alle **[Anwalt]**, nichts davon ist hier entschieden):
1. **Arbeitsvertrag/Tarifvertrag lesen:** Klauseln zu **Nebentätigkeit** (Anzeige-/Genehmigungspflicht), **Wettbewerbsverbot** (während des Arbeitsverhältnisses gilt ein Wettbewerbsverbot auch ohne Klausel; Zählerklar richtet sich an Elektrobetriebe, evtl. auch an den Arbeitgeber als Kunden oder Konkurrenten), **Erfindungen/Diensterfindungen/Urheberrechte**, **Verschwiegenheit**.
2. **Software (Urheberrecht):** Programme, die ein Arbeitnehmer *in Wahrnehmung seiner Aufgaben oder nach Weisung* schafft, stehen dem Arbeitgeber zu (§ 69b UrhG). Eine App, die privat in der Freizeit gebaut wird, ist eher nicht erfasst – aber die Grenze ist fließend (Nähe zum Aufgabenbereich, Nutzung von Arbeitszeit/Geräten/Material). **Nichts auf Firmengeräten oder in Arbeitszeit bauen oder recherchieren.**
3. **Arbeitnehmererfindungsgesetz:** gilt nur für patent-/gebrauchsmusterfähige Erfindungen. Bei Software ohne technischen Beitrag eher nicht relevant; ob eine Meldepflicht besteht, gehört in die Anwaltsprüfung.
4. **Herkunft des Wissens:** Das Regelwerk zitiert u. a. „Westnetz-Schulung ‚Bewertung von Zählerplätzen in Bestandsanlagen‘ (09/2025)“. **Woher stammt dieses Material?** Wurde es dienstlich/intern ausgegeben oder gilt es als vertraulich, kann seine Verwendung problematisch sein. Außerdem: Fundstellen nennen ist etwas anderes als Inhalte übernehmen (Urheberrecht des Netzbetreibers/BDEW). → [[Regelwerk R01–R26]]
5. **Steuer/Gewerbe** (Steuerberater): Gewerbeanmeldung, Einkommensquelle neben der Anstellung, Umsatzsteuer (Kleinunternehmerregelung) – gehört in dieselbe Beratung, ist aber ein eigenes Thema.

**Günstigster Weg:** zuerst selbst Arbeitsvertrag prüfen (kostenlos). Danach Erstberatung: Rechtsberatung der Handwerkskammer (für Mitgliedsbetriebe oft kostenfrei; nur wenn du/dein Betrieb Mitglied ist **[prüfen]**), Fachanwalt für Arbeitsrecht/IT-Recht (Erstberatung grob 100–250 €, vorher Preis erfragen) oder Beratungshilfe der Gewerkschaft, falls Mitglied. Bis zur Klärung **keine Kollegen des Arbeitgebers als Tester**, **keine Kundendaten des Arbeitgebers**, **keine Weitergabe von Betriebsunterlagen**.

## 5. Realistischer Schutz: Tempo, Netzwerk, Daten
Ehrlich: Gegen eine entschlossene Kopie schützt Recht wenig, weil Idee und Normwissen frei sind. Was wirklich trägt (passt zu [[Mein Vorteil]] und [[Ideen-System]]):
- **Vorsprung:** erste Version mit echten Betrieben in Betrieb, bevor jemand nachbaut. Das spricht für Validierung zuerst, nicht für Schutzaufwand zuerst.
- **Netzwerk:** persönliche Beziehungen zu Kollegen, Großhändler, Innung ([[Direktansprache]]). Lässt sich nicht kopieren.
- **Daten aus echten Fällen:** Fälle + „deine tatsächliche Entscheidung“ + Korrektur der KI-Erkennung ergeben die Trefferquote und ein **Praxis-Regelwerk** (welche Regel in der Realität anders entschieden wird). Das ist der eigentliche Burggraben und liegt auf dem Server, nicht im Browser. Passt zu Server-Auswertung.
- **Marke/Vertrauen:** Name „Zählerklar“ mit Fachgesicht in der Region.
- **Haftungsvorsprung:** wer das Thema Haftung sauber löst („Ersteinschätzung“), hat Vertrauen, das Kopierer erst aufbauen müssen.

## 6. Maßnahmenliste (nach Priorität)
Reihenfolge nach der Regel „erst verkaufen, dann bauen“: Alles, was **kostenlos und sofort** geht, jetzt; Aufwand erst, wenn ein Außenstehender die App sieht.

| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | **Arbeitsvertrag prüfen** (Nebentätigkeit, Wettbewerb, Erfindungen, Verschwiegenheit); Herkunft der Westnetz-Schulung klären | 0 € | 1–2 h | **sofort**, vor Tester-Zugang |
| 2 | **GitHub-Repos beider Projekte auf „privat“ prüfen**, Demo-Artifact nicht weitergeben, `Anhänge/…xlsx` nicht öffentlich teilen | 0 € | 15 min | sofort |
| 3 | **Kein Regelwerk im Marketing:** Posts/Flyer zeigen Rätsel und Ergebnis, nicht die Bedingungslogik ([[Instagram-Posts 1–10]] gegenlesen) | 0 € | 30 min | vor Livegang |
| 4 | DPMA-Markenrecherche + DENIC-Prüfung (steht schon in „Jetzt“) | 0 € | 1 h | vor Druck/Livegang |
| 5 | **Regelwerk serverseitig** (`POST /bewerte`, Bundle ohne Regeln) | 0 € (Free Tier) | ca. 0,5–1 Tag Code + Tests | **vor** Netlify-Livegang/Kollegen-Test |
| 6 | **Login je Tester statt `APP_CODE`** + Rate-Limit pro Nutzer | 0 € (Supabase Auth, Free Tier) | ca. 1 Tag | vor Kollegen-Test |
| 7 | **Nutzungsbedingungen (Test)** + **Kurz-NDA**: Entwurf, dann vom Anwalt prüfen | Entwurf 0 €; Prüfung ca. 150–400 € **[Preis erfragen]** | Entwurf 2 h | vor dem ersten fremden Tester |
| 8 | **Anwalts-Erstgespräch** (Arbeitgeber-Frage, NDA, Nutzungsbedingungen, Rechtstexte [[Rechtliches]] in einem Termin bündeln) | ca. 100–400 € **[erfragen]** | 1–2 h | nach Go/vor Tester; Punkt 1 nicht warten lassen |
| 9 | **Wortmarke „Zählerklar“** anmelden | ~300 € | 1 h | erst **nach Go** und sauberer Recherche |
| 10 | Patent/Gebrauchsmuster | fünfstellig / niedrig vierstellig | hoch | **nicht** verfolgen |
| 11 | Praxis-Regelwerk aus Falldaten aufbauen (Auswertung der Abweichungen) | 0 € | laufend | nach 20 Fällen |

## Verwandt
[[Zählerschrank-Check]] · [[App & Technik]] · [[Rechtliches]] · [[Mein Vorteil]] · [[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]] · [[ADR-0006 Produktname Zählerklar]]
