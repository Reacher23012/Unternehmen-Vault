---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-11-07
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App („Zählerklar“)

> **Wichtig:** Das ist eine Analyse zur Orientierung, **keine Rechtsberatung**. Alles mit 🔶 ist unsicher und gehört vor einer Entscheidung zu Anwalt oder Steuerberater. Beträge sind Größenordnungen nach meinem Kenntnisstand und vor Gebrauch zu prüfen.

**Kurzfazit (ehrlich):**
1. Die *Idee* ist nicht schützbar. Schützbar sind nur konkrete Ausprägungen: Code, Name, Geheimnisse.
2. Der wertvolle Kern ist das **Regelwerk R01–R26** → [[Regelwerk R01–R26]]. Es liegt heute komplett im App-Bundle beim Nutzer (siehe Abschnitt 2). Das ist die größte *technische* Lücke.
3. Der größte *tatsächliche* Schutz ist Tempo, Netzwerk und echte Falldaten (Abschnitt 5). Kein Vertrag hält einen Mitbewerber auf, der sich die Regeln aus der öffentlichen TAB selbst zusammenbaut.
4. **Nichts davon vor den Gesprächen vorziehen.** Erst validieren, dann bauen/absichern → Regel „erst verkaufen, dann bauen“ im [[Ideen-System]]. Billige Maßnahmen (Name, Login, Nutzungsbedingungen) ja, Umbau der Architektur erst nach Go.

## 1. Was ist in Deutschland überhaupt schützbar?
| Gegenstand | Schutz | Kosten / Aufwand | Wert für uns |
|---|---|---|---|
| **Idee / Konzept** („Foto → Regelwerk → Maßnahmenliste“) | **Kein** Schutz. Ideen sind frei. | – | Wer das Prinzip nachbaut, verletzt nichts. |
| **Quellcode** (App, Edge Function) | Urheberrecht für Computerprogramme (§ 69a ff. UrhG), entsteht automatisch, keine Anmeldung. Schützt vor *Kopieren des Codes*, nicht vor Nachbau mit eigenem Code. | 0 € | Gering bis mittel. Ein Nachbauer schreibt neuen Code. |
| **Name „Zählerklar“** | Marke beim DPMA (Wortmarke), Klassen 9 und 42 → [[ADR-0006 Produktname Zählerklar]]. Schutz ab Eintragung/Priorität der Anmeldung, 10 Jahre, verlängerbar. Daneben Domain (DENIC) und Handle. | 🔶 Größenordnung rund 290 € für bis zu 3 Klassen (Online-Anmeldung); zusätzlich ggf. Anwalt für Recherche | **Hoch, billig.** Schützt vor Namensklau und Verwechslung, sobald Marke und Domain gesichert sind. Erst nach Kollisionsprüfung anmelden. |
| **Texte, Fotos, Grafiken** (Flyer, Posts) | Urheberrecht automatisch, soweit eigene Schöpfung. Canva-/KI-Material: Lizenz und Schöpfungshöhe 🔶 → [[Bildrechte im Marketing]] | 0 € | Gering. |
| **Regelwerk / Know-how** (26 Regeln, Bedingungen, Auswahl und Zuordnung zu Fundstellen) | **Geschäftsgeheimnis** nach Geschäftsgeheimnisgesetz (GeschGehG) – aber nur, wenn es *angemessenen Geheimhaltungsmaßnahmen* unterliegt (§ 2 Nr. 1 b GeschGehG). Zusätzlich 🔶 Urheberrecht an Texten/Sammlung bzw. Datenbankherstellerrecht (§§ 87a ff. UrhG) – Reichweite unklar. **Reverse Engineering ist nach dem GeschGehG grundsätzlich erlaubt** (§ 3 Abs. 1 Nr. 2), wenn nicht vertraglich ausgeschlossen. | Maßnahmen (Technik + Verträge) kosten Zeit, wenig Geld | **Hoch, aber nur so stark wie die Geheimhaltung.** Heute liegt es offen im Browser → Abschnitt 2. |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist nicht patentierbar; Computerprogramme sind vom Gebrauchsmuster ausgeschlossen. Patent nur bei „technischem Beitrag“ möglich. 🔶 | Patentanwalt: vier- bis fünfstellig plus Jahresgebühren | **Praktisch nicht sinnvoll** – zu teuer, zu unsicher, vor Validierung absurd. |
| **Normen/TAB-Inhalte** | Gehören Dritten (DIN, VDE, BDEW, Westnetz). Wir dürfen nur Fundstellen nennen, keine Normtexte übernehmen. | – | Das ist auch eine Schranke für *uns*; und: Die Quellen des Regelwerks sind für jeden zugänglich. |

**Wichtiger Realitätscheck:** Die Regeln fußen auf öffentlichen Quellen (BDEW-Musterwortlaut, TAB Westnetz, Schulungsunterlagen). Das Geheimnis ist nicht die einzelne Regel, sondern die **Auswahl, Verknüpfung und Praxiserfahrung** (Entscheidungslogik, Fälle, Randfälle). Ob ein Gericht das als schutzwürdiges Geschäftsgeheimnis sähe, ist offen 🔶 → Anwaltsfrage 1.

## 2. Technischer Befund: Das Regelwerk liegt im Browser
**Geprüft im Code (`zaehlerschrank-check`, Stand `master` am 07.11.2026):**
- `web/src/regeln.json` (261 Zeilen: ID, Name, Bedingung, Maßnahme, Stufe, Fundstelle, Geltung, Status je Regel) wird in `web/src/regelwerk.ts` per `import` eingebunden.
- `regelwerk.ts` enthält zusätzlich die **komplette Auswertungslogik** (`ausgeloesteRegeln`, `schlimmsterFall`, `bewerte`) – und wird von `main.ts` und `demo.ts` importiert.
- Beim Build (`vite build`) landet beides **im JavaScript-Bundle**, das jeder Besucher herunterlädt. `vite.config.ts` setzt nichts Besonderes; auch ohne Source Maps ist das Bundle lesbar (höchstens minifiziert, nicht verschlüsselt).
- Dazu kommt das **Demo-Artifact** (`npm run build:demo` → eine einzige HTML-Datei) mit demselben Regelwerk.
- Die Edge Function (`supabase/functions/api/index.ts`) enthält **keine** Regeln; sie macht nur Fotoanalyse und Fall-Speicher.

**Bewertung des Risikos**
| Aspekt | Einschätzung |
|---|---|
| Wer kommt heran? | Jeder, der die App-URL erreicht. Solange die App nicht gehostet ist (Netlify noch offen) und nur lokal/privat läuft: **niemand außer mir**. Sobald sie online ist, jeder Besucher – der Zugangscode (`APP_CODE`) schützt nur die Server-Aufrufe (Fotoanalyse, Fälle), **nicht** das Bundle mit den Regeln. |
| Aufwand für den Angreifer | Browser-Entwicklerwerkzeuge: wenige Minuten. Die JSON-Datei ist praktisch im Klartext lesbar. |
| Rechtliche Folge | Wer das Regelwerk ungehindert ausliest, hat es nicht „rechtswidrig“ erlangt; ein später behaupteter Geheimnisschutz hat es schwer, weil wir *keine angemessene Geheimhaltung* betrieben haben (§ 2 GeschGehG) 🔶. |
| Schaden | Mittel. Ein Nachbauer müsste die Auswertung zwar kennen, aber nicht die Fälle, die Fotoerkennung und das Netzwerk. Der Schaden wächst mit dem Wert des Regelwerks (belegte Regeln, Randfälle). |
| Bei heutigem Stand (0 Gespräche, 0 Kunden) | **Niedrig bis mittel** – kein Grund, vor der Validierung umzubauen, wohl aber, den Umbau vor öffentlichem Livegang einzuplanen. |

**Lösungsskizze: Regelauswertung serverseitig**
1. `regeln.json` und die Logik aus `regelwerk.ts` wandern in die Edge Function (oder in ein geteiltes Modul unter `supabase/functions/`, das nur dort gebündelt wird). Das Web-Bundle enthält sie nicht mehr.
2. Neue Route `POST /bewerten`: Eingabe = `Eingaben` (die Felder aus dem Formular), Ausgabe = nur das **Ergebnis**: Ampel, ausgelöste Maßnahmen mit Fundstelle, „Vor Ort klären“-Liste (inkl. Worst-Case-Ergebnis), Hinweise, Messkonzept. Nicht ausgeliefert werden: Regelbedingungen als Text, nicht ausgelöste Regeln, Regel-IDs im Klartext müssen nicht sein (stabile Kürzel genügen).
3. Die App zeigt das Ergebnis an und speichert den Fall wie bisher. `demo.ts` bekommt feste Beispiel-Ergebnisse statt Regelwerk (Demo-Artifact enthält dann keine Regeln).
4. Zugangsschutz verschärfen: Login statt Zugangscode (steht schon unter „Irgendwann“), Rate-Limit pro Nutzer (Supabase), damit man nicht per Massenabfrage alle Regeln „abtasten“ kann.

**Kosten/Nachteile ehrlich:**
- Die App läuft dann nicht mehr offline. Das berührt den Funkloch-Schutz (Fälle lokal + Nachsenden) und den späteren Offline-Modus aus [[App & Technik]]. Auf der Baustelle ist Funkloch ein echtes Problem. Möglicher Kompromiss: Eingaben lokal puffern und Ergebnis bei Verbindung nachladen, bis dahin „vorläufig“ anzeigen – oder bewusst Offline opfern.
- Tests in `web/src/regelwerk.test.ts` ziehen mit um (Deno-Test oder Node-Test gegen die geteilte Logik).
- Selbst dann lässt sich das Regelwerk **durch Abtasten** rekonstruieren (viele Eingaben → Ergebnisse). Serverseitig macht das nur aufwendiger, nicht unmöglich → Rate-Limit + Login + Nutzungsbedingungen (Abschnitt 3).
- Aufwand grob: 1–2 Abende für Verlagerung und Tests, plus Demo-Anpassung. Reine Code-Arbeit, geeignet für eine Nachtschicht.

**Bewertung:** Lohnt sich **vor dem öffentlichen Livegang bzw. vor dem Test mit fremden Kollegen**, nicht vor den ersten Gesprächen. Solange nur Tester mit Zugangscode die App sehen, hilft zunächst eine NDA (Abschnitt 3).

## 3. Verträge und Zugang
| Baustein | Zweck | Stand / Hinweis |
|---|---|---|
| **NDA für Tester/Kollegen** (Geheimhaltung, Zweckbindung, keine Weitergabe von Zugangscode und Inhalten) | Erfüllt das Merkmal „angemessene Geheimhaltungsmaßnahmen“ und gibt eine Handhabe. | Kurze, einseitige Vereinbarung (1 Seite) reicht für den Anfang. Entwurf lässt sich als Vorlage schreiben; 🔶 Wirksamkeit und Vertragsstrafe vom Anwalt prüfen lassen. Reibungsverlust beachten: Kollegen sollen mittesten, nicht Juristerei lesen – zum Start auch eine Bestätigung per WhatsApp („Vertraulich, nicht weitergeben“) plus Unterschrift auf Papier. |
| **Nutzungsbedingungen** der App (kein Kopieren, kein Auslesen/Scraping, kein Reverse Engineering, keine Weitergabe des Zugangs, Haftungshinweis „Ersteinschätzung, ersetzt nicht die Prüfung vor Ort“) | Vertragliches Verbot des Reverse Engineering (sonst erlaubt, siehe § 3 GeschGehG), Grundlage zum Sperren. | Bei Livegang zusammen mit [[Rechtliches]] (Impressum, Datenschutz). 🔶 AGB-Recht (§§ 305 ff. BGB) beachten – anwaltlich prüfen lassen. |
| **Zugang nur mit Login** | Beweisbar, wer was abgerufen hat; Sperren möglich; Rate-Limit pro Konto. | Bisher nur Zugangscode → [[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]], Aufgabe „Login statt Zugangscode“ steht unter „Irgendwann“. Für Kollegen-Test vorziehen, wenn mehr als wenige Tester. |
| **Auftragsverarbeitung** Supabase/Anthropic/Netlify | Datenschutz, kein Geheimnisschutz | siehe [[Rechtliches]]. |

## 4. Arbeitgeber-Frage – offen, **Anwalt/Steuerberater/Fachanwalt Arbeitsrecht**
Ich weiß nicht, ob die Idee im Rahmen einer Anstellung im Elektrohandwerk entstanden ist (mir liegen dazu keine Angaben vor; das Impressum-Entwurf nennt eine Privatperson). **Das ist die gefährlichste Unbekannte** – ein Streit mit dem Arbeitgeber wäre schlimmer als jeder Plagiator. Zu klären:
1. **Rechte am Programm:** Hat der Arbeitgeber Anspruch auf Software, die ein Arbeitnehmer *in Wahrnehmung seiner Aufgaben oder nach Weisung* schreibt (§ 69b UrhG)? Zählt die App dazu, wenn sie privat in der Freizeit entsteht, aber auf beruflichem Fachwissen und ggf. Arbeitsunterlagen (Schulungen, Excel „Entscheidungsbaum“) beruht? 🔶
2. **Arbeitnehmererfindung:** Computerprogramme sind meist nicht patentierbar, daher hier selten relevant; trotzdem klären, ob der Vertrag Erfindungs-/Rechteklauseln hat. 🔶
3. **Nebentätigkeit:** Gibt der Arbeitsvertrag eine Anzeige- oder Genehmigungspflicht für Nebentätigkeiten vor? Ist ein Wettbewerbsverbot einschlägig (Elektrobetriebe als Zielkunden des Arbeitgebers oder als Konkurrenz)? 🔶
4. **Quellen:** Stammt das Regelwerk aus Unterlagen des Arbeitgebers (interne Schulung, Westnetz-Schulung nur für Betriebe, Formulare)? Dann Vertraulichkeit und Weitergabe prüfen. Im Vault werden u. a. die „Westnetz-Schulung ‚Bewertung von Zählerplätzen in Bestandsanlagen‘ (09/2025)“ als Fundstelle genannt. 🔶 Woher habe ich die, und darf ich sie weitergeben/auswerten?
5. **Kundenkreis:** Wenn Zielkunden aus dem eigenen Arbeitsumfeld kommen: Kundenschutz, Abwerbeverbot. 🔶

→ **Auftrag an Nutzer:** Arbeitsvertrag lesen (Nebentätigkeit, Rechte an Arbeitsergebnissen, Wettbewerb, Geheimhaltung) und mit einem Fachanwalt für Arbeitsrecht klären, **bevor** Geld fließt oder die App öffentlich geht. Ein Erstgespräch kostet meist einen niedrigen bis mittleren dreistelligen Betrag 🔶; Handwerkskammer/Innung bietet teils kostenlose Erstberatung an.
Ob Kleinunternehmer/Gewerbeanmeldung/Steuer zu klären sind (Nebeneinkommen) → Steuerberater, siehe [[Einschätzung Handwerks-Apps als Nebeneinkommen]].

## 5. Realistischer Schutz: Tempo, Netzwerk, Daten
Rechtlicher Schutz bremst Kopierer, hält aber kein motiviertes Unternehmen auf. Die tragfähigen Vorteile sind:
- **Vorsprung:** Regelwerk R01–R26 mit Fundstellen, bereits gebaut. Wer das nachbaut, braucht Wochen und Fachwissen.
- **Netzwerk und Vertrauen:** Direkter Zugang zu Kollegen und Betrieben in der Region → [[Mein Vorteil]], [[Direktansprache]].
- **Falldaten:** Jeder echte Fall (Foto + Eingaben + tatsächliche Entscheidung) verbessert Trefferquote und Fotoerkennung und ist **nicht** aus dem Browser auslesbar. Das ist langfristig der härteste Burggraben. Deshalb zählt das Sammeln der 20 Fälle doppelt → [[Validierung & Go-No-Go]]. (Datenschutz der Fotos beachten: keine Adressen/Namen/Zählernummern.)
- **Marke und Domain** (Abschnitt 1) schützen den Ruf, auch wenn jemand die Technik kopiert.
- **Geschwindigkeit:** Lieber 3 Monate früher Kunden als 3 Monate früher perfekt abgesichert. Das passt zur Regel „erst verkaufen, dann bauen“ in [[Ideen-System]].

## 6. Priorisierte Maßnahmenliste
| Prio | Maßnahme | Kosten | Aufwand | Wann | Wer |
|---|---|---|---|---|---|
| 1 | **Arbeitgeber-Frage** klären (Arbeitsvertrag lesen, ggf. Fachanwalt) | 🔶 Erstgespräch niedriger–mittlerer dreistelliger Betrag | 1–2 Stunden Vertrag, 1 Termin | **Vor Geld und vor Livegang**; sinnvoll schon vor den Kollegen-Tests | Nutzer |
| 2 | **Name sichern:** DENIC-Prüfung `zaehlerklar.de`, DPMA-Recherche, Handle; danach Marke anmelden | Domain wenige €/Jahr; Marke 🔶 rund 290 € | 1 Abend | vor Druck/Livegang (steht schon in „Jetzt“) | Nutzer |
| 3 | **Vertraulichkeit für Tester:** kurze NDA + Hinweis „Zugangscode nicht weitergeben“ | 0 € (🔶 anwaltliche Prüfung ggf. einmalig) | Entwurf ca. 1 Stunde | vor dem ersten Mittesten | Nachtschicht (Entwurf) + Anwaltsprüfung durch Nutzer |
| 4 | **Nutzungsbedingungen** (Kopier-/Reverse-Engineering-Verbot, Haftungshinweis) | 0 € (🔶 Prüfung) | Entwurf ca. 1 Stunde | vor Livegang, zusammen mit Impressum/Datenschutz | Nachtschicht (Entwurf) |
| 5 | **Login statt Zugangscode** + Rate-Limit | 0 € (Supabase Free Tier, Auth) | 1–2 Abende | vor Livegang oder wenn mehr als wenige Tester | Nachtschicht (Code) |
| 6 | **Regelwerk serverseitig** (Abschnitt 2) | 0 € | 1–2 Abende | vor öffentlichem Livegang, **nicht** vor den Gesprächen | Nachtschicht (Code) |
| 7 | Kein Patent, kein Gebrauchsmuster | – | – | bewusst nicht | – |
| 8 | Falldaten systematisch sammeln (20 Fälle, später mehr) | 0 € | läuft in der Validierung | laufend | Nutzer |

**Reihenfolge-Warnung nach CLAUDE.md:** Maßnahmen 5 und 6 sind Infrastruktur und dürfen die Gespräche nicht verdrängen. Priorität 1 und 2 sind Voraussetzung für Livegang; 3 und 4 sind billig und gehören ins Setup vor dem Mittesten.

## Offene Fragen für Anwalt / Steuerberater (zum Mitnehmen)
1. Gehört mir das Programm bzw. die Idee, wenn ich im Elektrohandwerk angestellt bin? Gibt es Genehmigungs- oder Anzeigepflichten für die Nebentätigkeit (§ 69b UrhG, Arbeitsvertrag)?
2. Darf ich Schulungsunterlagen des Netzbetreibers/Arbeitgebers als *Fundstelle* nennen und die Logik daraus ableiten?
3. Ist das Regelwerk ein schutzfähiges Geschäftsgeheimnis, und genügen NDA + Login + serverseitige Auswertung als „angemessene Maßnahmen“?
4. Taugt eine einseitige Kurz-NDA für Kollegen, oder braucht es mehr (Vertragsstrafe)? Wirksamkeit der Nutzungsbedingungen (AGB-Recht)?
5. Marke: Verwechslungsgefahr bei „Zählerklar“ in Klassen 9/42?
6. Haftung bei fehlerhafter Ersteinschätzung (Haftungsausschluss, Versicherung)?

Siehe auch [[Rechtliches]], [[App & Technik]], [[Zählerschrank-Check]].
