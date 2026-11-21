---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
erstellt: 2026-11-21
status: entwurf – Analyse, keine Rechtsberatung; Punkte mit ⚖️ vom Anwalt prüfen lassen
---
# Schutz von Idee und App (Zählerklar)

> **Wichtig:** Das ist eine Recherche- und Denkhilfe aus dem Wissen der Nachtschicht, **keine Rechtsberatung**. Alles mit ⚖️ ist unsicher oder hängt vom Einzelfall ab und gehört vor einer Entscheidung zu einem Anwalt (IT-/Gewerberecht) bzw. Steuerberater. Rechtsstand nicht gegen aktuelle Quellen geprüft (kein Webzugriff in der Nachtschicht).

**Kurzfazit:** Die Idee „Foto → Zählerschrank-Einordnung“ ist nicht schützbar. Schützbar sind Code, Name und – mit Aufwand – das Regelwerk als Geschäftsgeheimnis. Der größte *technische* Hebel: Das Regelwerk liegt heute komplett im Browser jedes Nutzers. Der größte *praktische* Schutz ist Tempo, Netzwerk und echte Falldaten (→ [[Mein Vorteil]]). Zur Einordnung: Erst validieren ([[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]) – Schutzmaßnahmen dürfen die Gespräche nicht verdrängen.

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Kosten / Aufwand (grobe Annahme, nachprüfen) | Einschätzung |
|---|---|---|---|
| **Die Idee** (Foto-Check für Zählerschränke) | Kein Schutz. Ideen sind frei. | – | Jeder darf dasselbe bauen. Schutz nur über Vorsprung. |
| **Code** (App, Edge Function, Landingpage) | Urheberrecht (Software, §§ 69a ff. UrhG) entsteht automatisch mit Schaffung, keine Anmeldung. Schützt den konkreten Code, nicht die Idee oder Funktionsweise. | 0 € | Hilft gegen 1:1-Kopie, nicht gegen Nachbau mit eigenem Code. Git-Historie mit Datum ist ein brauchbarer Nachweis. |
| **Name „Zählerklar“** | Marke beim DPMA; ohne Eintragung evtl. Schutz durch Benutzung/Verkehrsgeltung (schwach). | DPMA-Anmeldung ca. 290 € für bis zu 3 Klassen (Online-Gebühr, **aktuell prüfen**), plus Recherche. Schutzdauer 10 Jahre. | Sinnvoll **nach** Recherche und erster Nutzung; vorher `zaehlerklar.de` sichern, siehe [[ADR-0006 Produktname Zählerklar]]. Beschreibende Namen können abgelehnt werden ⚖️. |
| **Regelwerk R01–R26 / Know-how** | **Geschäftsgeheimnis** nach Geschäftsgeheimnisgesetz (GeschGehG): nur geschützt, wenn es (a) nicht allgemein bekannt ist, (b) wirtschaftlichen Wert hat und (c) **angemessene Geheimhaltungsmaßnahmen** getroffen wurden. | Organisatorisch, wenig Geld | Punkt (c) ist der Haken: Heute liegt die komplette `regeln.json` im ausgelieferten App-Bundle (siehe 2.). Wer es offen ausliefert, kann sich kaum auf „angemessene Maßnahmen“ berufen ⚖️. Außerdem: Die Regeln sind abgeleitet aus **öffentlichen** Quellen (TAB, DIN-/VDE-Fundstellen, Westnetz-Schulung) – geschützt wäre allenfalls die *Auswahl, Verknüpfung und Gewichtung*, nicht der Inhalt der Normen. |
| **Datenbank** (Falldaten, Fotos, Trefferquoten) | Datenbankschutz (§§ 87a ff. UrhG) bei wesentlicher Investition; praktisch eher Geschäftsgeheimnis. | – | Wird mit der Zeit der wertvollste Teil (siehe 5.). Datenschutz beachten (keine Kundendaten/Adressen in Fotos, [[Rechtliches]]). |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist nicht patentierbar; nur technische Lösungen mit technischem Beitrag (Gebrauchsmuster: Programme als solche ausgeschlossen). | Patent: mehrere tausend € inkl. Anwalt | **Nicht empfohlen.** Foto-Klassifikation + Regelprüfung ist kaum patentfähig, Aufwand/Nutzen schlecht ⚖️. |
| **Design/Layout** | Geschmacksmuster/Design, Urheberrecht für Texte & Grafiken | – | Zweitrangig. Eigene Texte/Flyer sind urheberrechtlich geschützt; Bildrechte beachten ([[Bildrechte im Marketing]]). |

**Ehrlich:** Gegen einen Konkurrenten, der Erfahrung hat und das Problem selbst baut, schützt das Recht kaum. Es schützt gegen **Kopieren** und **Vertrauensbruch**.

## 2. Technischer Befund: Regelwerk liegt im Browser
**Geprüft im Code (21.11.2026):**
- `web/src/regeln.json` (Texte, Bedingungen, Maßnahmen, Fundstellen aller 26 Regeln) wird in `web/src/regelwerk.ts` per `import` eingebunden und von Vite in das ausgelieferte JavaScript-Bundle kompiliert.
- Die Logik in `ausgeloesteRegeln()` / `ergebnisAus()` / `messkonzept()` ist ebenfalls im Bundle und läuft im Browser (`web/src/main.ts` ruft `bewerte()` direkt auf).
- Folge: Wer die App öffnen darf, kann per Entwicklertools das **gesamte Regelwerk samt Logik** auslesen. Minifizierung (Vite) ist keine Sicherheit. Auch das Demo-Artifact enthält es.
- Aktueller Zugangsschutz: nur `APP_CODE` für die Backend-Routen; die statische App selbst ist, sobald auf Netlify, **öffentlich abrufbar** (Auslieferung der Dateien ist nicht geschützt, nur die API).

**Risikobewertung:**
| Aspekt | Bewertung |
|---|---|
| Wahrscheinlichkeit, dass es jemand tut | Heute **niedrig** (kein Publikum, kein Wert bewiesen); steigt mit Bekanntheit. |
| Schaden | **Mittel**: Die Regeln sind aus öffentlichen Normen abgeleitet, aber Auswahl und Verknüpfung sind Fleißarbeit; ein Nachbauer spart Monate. Wichtiger noch: ein offenes Regelwerk schwächt den Geschäftsgeheimnis-Schutz (1.). |
| Zeitpunkt | Vor der **öffentlichen** Auslieferung (Netlify) lösen oder bewusst entscheiden. Für den Test mit 4 bekannten Kollegen: Risiko vertretbar, solange NDA (3.) und nicht öffentlich verlinkt. |

**Lösungsskizze „Regelwerk serverseitig“:**
1. `regeln.json` + Logik aus dem Web-Bundle entfernen; in die Supabase Edge Function (`supabase/functions/api`, neue Route z. B. `POST /bewerten`) verlagern. Eingaben rein, **Ergebnis + Fundstelle** raus (Ampel, Maßnahmen, „Vor Ort klären“, Messkonzept) – nicht die Regelbedingungen.
2. Zugriff nur nach Login (siehe 3.), mit Rate-Limit, damit niemand das Regelwerk durch Abfragen vieler Kombinationen „absaugen“ kann (Restrisiko bleibt: 26 Regeln lassen sich mit genug Abfragen rekonstruieren – es erschwert, verhindert nicht).
3. Regelwerk-Quelle (Excel/JSON) bleibt privat im Code-Repo; Repo privat halten (**prüfen, ob `zaehlerschrank-check` auf GitHub privat ist**).
4. Tests laufen weiter gegen die Logik (Modul bleibt als reine Funktion testbar, nur nicht im Web-Bundle).

**Nachteile/Abwägungen (offen ansprechen):**
- Die App ist bisher **offline-/funklochfähig** (Fälle lokal, Nachsenden; Review 29.09.) und läuft ohne Backend. Serverseitige Auswertung heißt: ohne Netz kein Ergebnis auf der Baustelle (Keller, Funkloch) – ein echtes Produktproblem für die Zielgruppe. Kompromiss: Eingaben offline speichern, Ergebnis bei Verbindung; oder nur das Vollergebnis serverseitig, offline ein grober Hinweis.
- Mehr Latenz, mehr Last auf Supabase (Free Tier), Edge-Function-Zeitlimit.
- Aufwand grob 1–2 Nachtschichten + Tests; **keine** Validierung, deshalb nach den Gesprächen priorisieren.
- Das Demo-Artifact und `build:demo` enthalten das Regelwerk ebenfalls; nur privat teilen.

## 3. Verträge und Zugang
| Maßnahme | Wofür | Anmerkung |
|---|---|---|
| **NDA / Geheimhaltungsvereinbarung** für Tester und Kollegen | Bedingung (c) „angemessene Geheimhaltungsmaßnahmen“, Vertrauensschutz | Kurze schriftliche Vereinbarung oder Kenntnisnahme-Text vor Zugang. Muster vom Anwalt prüfen lassen ⚖️. Realistisch: Bei Handwerkskollegen im Gespräch reicht oft ein Handschlag – dann aber **kein** Rechtsschutz. Mit Maß einsetzen, sonst wirkt es abschreckend. |
| **Nutzungsbedingungen / AGB** | Kein Kopieren, kein Reverse Engineering, kein automatisches Auslesen, keine Weitergabe des Zugangs; Haftungsbegrenzung („Ersteinschätzung, Prüfung durch Elektrofachkraft“) | Ohnehin nötig bei Bezahl-App ([[Rechtliches]]). Reverse-Engineering-Verbote sind bei Software nur eingeschränkt wirksam (§ 69e UrhG erlaubt Dekompilierung unter engen Bedingungen) ⚖️. |
| **Zugang nur mit Login** | Wer nutzt es, Sperre bei Missbrauch, Nachweisbarkeit | Ersetzt den gemeinsamen `APP_CODE` (steht schon unter „Irgendwann“: Login statt Zugangscode). Pro Nutzer ein Konto, sonst Weitergabe nicht erkennbar. |
| **Repo privat, Zugangsdaten getrennt** | Code/Regelwerk nicht öffentlich | Keine Geheimnisse in Vault/Repo. |
| **Eigene Texte kennzeichnen** | Herkunftsnachweis | „© Zählerklar“ in der App, kein Wert an sich, aber Hinweis. |

## 4. Arbeitgeber-Frage ⚖️ (offene Frage für Anwalt/Steuerberater)
Sind die Idee, das Regelwerk und die App im Zusammenhang mit einer **Anstellung im Elektrohandwerk** entstanden (Annahme aus [[Mein Vorteil]] und [[Geldmodelle für KI-Ideen]], im Vault nicht bestätigt: Es ist nicht festgehalten, ob und wo der Nutzer angestellt ist)? Dann sind folgende Punkte zu klären:
- **Arbeitsvertrag lesen:** Nebentätigkeits-Klausel (Anzeige-/Genehmigungspflicht), Wettbewerbsverbot, Klauseln zu Erfindungen/Software/Know-how.
- **Wettbewerb:** Bietet der Arbeitgeber Zählerschrank-Prüfungen/Elektroarbeiten an, kann ein Produkt für genau diese Betriebe als Konkurrenz oder Interessenkonflikt gewertet werden. Während des Arbeitsverhältnisses gilt eine Treuepflicht (kein Wettbewerb).
- **Wem gehört das Ergebnis?**
  - Code von Arbeitnehmern: § 69b UrhG – Rechte an Software, die in Wahrnehmung der Aufgaben oder nach Anweisung des Arbeitgebers geschaffen wird, gehören grundsätzlich dem Arbeitgeber. Bei Freizeitarbeit ohne Bezug zu den Dienstaufgaben ist es anders; Grenzfälle sind streitanfällig.
  - Erfindungen: Arbeitnehmererfindungsgesetz (Diensterfindung/freie Erfindung, Meldepflicht) – für Software meist wenig relevant, weil nicht patentierbar.
  - Know-how aus dem Betrieb: **Betriebs- und Geschäftsgeheimnisse des Arbeitgebers** (Schaltpläne, Kundenfälle, interne Unterlagen, Fotos von Kundenanlagen) dürfen nicht ins Produkt; selbst erworbenes Berufswissen und öffentliche Normen sind in der Regel frei nutzbar. Die Grenze ist im Einzelfall zu ziehen.
  - Arbeitszeit/Arbeitsmittel: nichts davon für das Projekt nutzen.
- **Fotos echter Schränke:** nur eigene oder mit Erlaubnis des Kunden/Arbeitgebers, ohne Adresse/Namen/Zählernummer (siehe Aufgabe „Eigene Fotos“).
- **Steuer/Gewerbe:** Gewerbeanmeldung bei Start, Einkünfte aus Nebentätigkeit → Steuerberater.

**Empfehlung:** Arbeitsvertrag selbst durchlesen und dem Anwalt vorlegen (einmal, kurz, idealerweise zusammen mit der Prüfung von Impressum/Datenschutz). Bis zur Klärung keine Fälle aus dem Betrieb verwenden.

## 5. Realistischer Schutz: Tempo, Netzwerk, Daten
- **Vorsprung:** Fachwissen + Regelwerk + Zugang zu den Kollegen im Kreis Soest/Westnetz-Gebiet. Ein Nachbauer braucht beides: Elektro-Know-how und Vertrieb in die Branche. Das ist der echte Schutz.
- **Netzwerk:** Erste zahlende Betriebe, Innung, Handwerkskammern ([[Direktansprache]], [[Anschreiben Handwerkskammern]]). Vertrauen und Empfehlungen lassen sich nicht herunterladen.
- **Daten aus echten Fällen:** Jeder erfasste Fall mit tatsächlicher Entscheidung verbessert Trefferquote und Regeln. Das ist der Burggraben, der über Zeit wächst, und gehört geschützt (privat, Login, kein Export an Dritte). Datenschutz und Einwilligung klären.
- **Pflege des Regelwerks:** Neue TAB-Fassungen (z. B. Westnetz 2026) schneller einarbeiten als jeder Nachzügler.
- **Marke + Domain** früh sichern, damit Nachahmer nicht unter ähnlichem Namen auftreten.

## 6. Priorisierte Maßnahmen
| Prio | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | Repo-Sichtbarkeit prüfen (privat?), keine Regel-Dateien in öffentlichen Orten (Demo-Artifact nur privat teilen) | 0 € | 10 Min. | sofort |
| 2 | Arbeitsvertrag lesen, Fragen aus Punkt 4 notieren, Anwalt-/Steuerberater-Termin (mit Impressum-Prüfung kombinieren) | Beratungskosten ⚖️ | 1–2 Std. + Termin | vor öffentlichem Start |
| 3 | `zaehlerklar.de` per DENIC prüfen/sichern, DPMA-Markenrecherche (bereits offen) | Domain ~ wenige €/Jahr | 30 Min. | diese Woche |
| 4 | Kurze Geheimhaltungs-/Testbedingungen für Tester (Muster prüfen lassen) | evtl. Anwalt | 1 Std. | vor Mittesten mit mehr als den 4 Bekannten |
| 5 | Nutzungsbedingungen mit Anti-Kopier-Klausel in AGB/Impressum-Paket | in Anwaltsprüfung | 1–2 Std. | vor Bezahlstart |
| 6 | Login statt Zugangscode (Supabase Auth) | 0 € | 1–2 Nachtschichten | vor Kollegen-Test (steht schon offen) |
| 7 | **Regelwerk serverseitig** (Edge Function, Rate-Limit), mit Offline-Kompromiss | 0 € | 1–2 Nachtschichten | **vor öffentlicher App**, nach den Gesprächen |
| 8 | Marke Zählerklar beim DPMA anmelden | ca. 290 € + ggf. Anwalt | 1 Std. | nach Recherche und **nach** Go |
| 9 | Patent/Gebrauchsmuster | hoch | – | **nicht** verfolgen |

**Reihenfolge-Hinweis (Mitgründer-Blick):** Maßnahmen 1–3 sind billig und fast ohne Aufwand. 6–7 sind Infrastruktur und dürfen die Validierung nicht verdrängen ([[Validierung & Go-No-Go]]). Nicht die Idee vor Gesprächen „absichern“, sondern erst zeigen, dass jemand zahlt.

Zurück: [[Zählerschrank-Check]], [[App & Technik]], [[Rechtliches]]
