---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
erstellt: 2026-11-25
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App

> **Hinweis:** Das ist eine Analyse zur Orientierung, **keine Rechtsberatung**. Alles, was unten mit ⚖️ markiert ist, bitte von einem Anwalt (bzw. Steuerberater) prüfen lassen. Die Nachtschicht hat keine Quellen im Internet geprüft; die Rechtslage ist aus allgemeinem Wissen zusammengefasst und kann sich geändert haben.

**Kurzfazit:** Die *Idee* ist nicht schützbar. Code und Texte sind automatisch urheberrechtlich geschützt, aber das hilft nur gegen Eins-zu-eins-Kopien. Wertvoll ist das **Regelwerk R01–R26** ([[Regelwerk R01–R26]]), und genau das liegt heute **ungeschützt im App-Bundle** (Abschnitt 2). Den größten echten Schutz bietet Tempo und der Zugang zu Kollegen, nicht ein Paragraf (Abschnitt 5).

## 1. Was ist in Deutschland überhaupt schützbar?
| Was | Schutz | Kosten / Aufwand | Einschätzung für Zählerklar |
|---|---|---|---|
| **Die bloße Idee** („Foto vom Zählerschrank → Maßnahmenliste“) | **keiner**. Ideen sind frei, jeder darf sie nachbauen | – | Nicht schützbar. Wer das Konzept kennt, darf es umsetzen. |
| **Code** | Urheberrecht (§ 69a ff. UrhG), entsteht automatisch, keine Anmeldung | 0 € | Schützt gegen Kopieren des Codes, nicht gegen eine eigene Neuimplementierung derselben Funktion. Beweisbar durch Git-Verlauf (Commits mit Datum). |
| **Texte, Bilder, Flyer, Landingpage** | Urheberrecht, sofern genug eigene Schöpfung | 0 € | Gilt für eigene Texte und Grafiken. **Nicht** für Fakten wie „Wallbox braucht X“. Keine Normtexte übernehmen (steht bereits in [[Rechtliches]]). |
| **Name „Zählerklar“** | Marke (DPMA, Klassen 9 und 42) oder Benutzungsmarke/Werktitelschutz | Anmeldung DPMA grob ab ca. 290 € für 3 Klassen (Stand: aus dem Gedächtnis, **vorher prüfen**), dazu optional Anwalt | Schützt den Namen, nicht die Funktion. Sinnvoll erst nach Recherche ([[ADR-0006 Produktname Zählerklar]]) und wenn es Kunden gibt. Eine Anmeldung kann Widersprüche auslösen. ⚖️ |
| **Regelwerk / Know-how** | Geschäftsgeheimnisgesetz (GeschGehG): nur geschützt, wenn es **geheim ist, wirtschaftlichen Wert hat und „angemessenen Geheimhaltungsmaßnahmen“** unterliegt (§ 2 Nr. 1 GeschGehG) | 0 € plus Aufwand | Das ist der wichtigste Hebel. Ohne Maßnahmen (NDA, Zugriffsschutz, nicht im Browser ausliefern) gibt es voraussichtlich **gar keinen** Schutz. ⚖️ |
| **Datensammlung** (echte Fälle, Trefferquoten) | als Geschäftsgeheimnis, ggf. Datenbankschutz (§ 87a UrhG, bei wesentlicher Investition) | 0 € | Entsteht erst mit den Fällen. Personenbezug (Adressen auf Fotos) beachten → [[Bildrechte im Marketing]]. |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist nicht patentierbar; nur mit „technischem Beitrag“. Gebrauchsmuster: Computerprogramme ausgeschlossen | Patent mehrere Tausend €, Jahre | **Nicht sinnvoll.** Regelwerk = Auswertung von Regeln, kein technischer Beitrag. Ein Patent würde die Idee außerdem offenlegen. |

Wichtig: Auch die **zugrunde liegenden Regeln sind keine Erfindung**. Sie stammen aus TAB, VDE und Westnetz-Vorgaben und sind öffentlich (nur die Zusammenstellung, Bewertung und Gewichtung ist eigene Leistung). Das begrenzt, was man schützen *kann*: geschützt ist am ehesten die **Auswahl, Struktur und Formulierung** des Regelwerks, nicht die Norminhalte. ⚖️

## 2. Technischer Befund: Das Regelwerk liegt im Browser
**Geprüft im Code (Stand `master`, 25.11.2026):**
- `web/src/regeln.json` (ca. 14 KB: Name, Bedingung, Maßnahme, Stufe, **Fundstelle**, Geltung, Status für R01–R26) wird in `web/src/regelwerk.ts` per `import` eingebunden.
- Die Logik (`ausgeloesteRegeln`, `bewerte`, Schlimmster-Fall-Analyse, Messkonzept) steht ebenfalls in `regelwerk.ts` und läuft **vollständig im Browser** (`main.ts` ruft `bewerte(...)` direkt auf).
- Vite bündelt beides in die ausgelieferte JavaScript-Datei. Sourcemaps sind nicht eingeschaltet (`vite.config.ts` hat nur `base`), aber das ist kaum eine Hürde: Das JSON steht im Klartext im Bundle, die Logik ist lesbar (minifiziert, nicht verschleiert).
- Die Edge Function (`supabase/functions/api/index.ts`) macht nur die Fotoanalyse und den Fall-Speicher. **Das Regelwerk liegt nicht auf dem Server.**
- Ebenso liegt es im Demo-Artifact auf claude.ai (privat, aber es wird gezeigt) und im Git-Repo (privat, solange es privat bleibt).

**Risiko-Bewertung:**
| Szenario | Wahrscheinlichkeit | Schaden |
|---|---|---|
| Jeder, der die App-URL kennt, öffnet die Entwicklertools und liest `regeln.json` samt Logik in Minuten | **hoch** sobald die App öffentlich ist | **Das ganze Regelwerk R01–R26 ist kopiert.** Der Zugangscode schützt die Foto-Analyse, **nicht** das Regelwerk (die Bewertung läuft auch ohne Backend, laut README „ohne Backend läuft die App lokal“). |
| Ein Konkurrent baut mit dem kopierten Regelwerk selbst eine Foto-App | mittel (niedrig, solange es keine Kunden gibt) | Vorsprung 5/5 im [[Ideen-System]]-Score wäre nicht mehr haltbar. |
| Verlust des GeschGehG-Schutzes, weil keine „angemessenen Maßnahmen“ | hoch, wenn so ausgeliefert | Rechtlich schwer, gegen Kopierer vorzugehen. ⚖️ |

**Einordnung, ehrlich:** Solange die App nicht öffentlich ist und nur 4 Tester mit eigenem Handy sie sehen, ist das Risiko klein. Es steigt mit dem Livegang auf Netlify (Aufgabe „Netlify-Konto anlegen“) stark. Dazu kommt: Die Fundstellen im Regelwerk sind öffentlich auffindbar, ein fachkundiger Konkurrent könnte es in Wochen nachbauen. Der Schutz verschafft also *Zeit*, nicht Unangreifbarkeit.

**Lösungsskizze: Regelauswertung in die Edge Function verlegen**
1. `regeln.json` und `regelwerk.ts` wandern nach `supabase/functions/api/` (nicht in `web/`). `web/` bekommt nur noch die Typen (`modell.ts`).
2. Neue Route `POST /bewerte` (mit `x-app-code` bzw. später Login): Body = `Eingaben`, Antwort = `Bewertung` – aber nur mit dem, was der Nutzer sehen muss: ausgelöste Regeln (Name, Maßnahme, Fundstelle), „Vor Ort klären“-Liste, Ergebnis, Messkonzept. **Nicht** die Bedingungen/Formeln und nicht alle 26 Regeln auf einmal.
3. Die App zeigt das Ergebnis an und speichert es im Fall. Die Trefferquoten-Berechnung (Startseite) arbeitet mit gespeicherten Ergebnissen, nicht mit lokaler Regelauswertung.
4. Tests (`regelwerk.test.ts`, 13 Tests) ziehen mit um (z. B. nach `supabase/functions/api/` und per Deno oder Vitest weiter ausführbar).
5. **Preis dafür:** Ohne Netz keine Bewertung (der Offline-Modus ist laut [[App & Technik]] ohnehin „erst nach Go“); die Demo-Version (`build:demo`, Beispieldaten) braucht eine eigene, entschärfte Mini-Fassung, damit nicht doch alles im Artifact steckt.
6. **Restrisiko, auch danach:** Wer viele Eingaben durchprobiert (Scraping über 26 Regeln, systematisch), kann die Logik aus den Antworten nachbauen. Gegenmittel: Login, Rate-Limit, Nutzungsbedingungen. Vollständig verhindern lässt sich das nicht, nur verteuern.

## 3. Verträge
- **NDA für Tester/Kollegen** (Geheimhaltung): kurz, einseitig, 1 Seite: keine Weitergabe von Zugang, Screenshots oder Regelwerk; Zweck = Mittesten; Laufzeit; Rückgabe/Löschung. Das ist die „angemessene Geheimhaltungsmaßnahme“ für Menschen. Für die ersten 4 Tester vorab, bevor sie die App sehen. Vorlage anwaltlich prüfen lassen. ⚖️ Hinweis: Mit Kollegen im Handwerk ist ein NDA sozial heikel („Misstrauen“) – kurz begründen („das Regelwerk ist mein Kapital“) und niedrigschwellig halten.
- **Nutzungsbedingungen/AGB**: kein Kopieren, kein Auslesen, kein Reverse Engineering, keine Weitergabe des Zugangs, Haftungsausschluss „ersetzt keine Prüfung vor Ort“ (steht bereits im Impressum-Entwurf, gehört auch in die App). Vor dem bezahlten Betrieb Pflicht, dann inklusive Widerrufs- und Verbraucherfragen (B2B: weniger streng). ⚖️
- **Zugang nur mit Login**: heute gibt es einen gemeinsamen `APP_CODE` für alle (Einzelnutzer). Ein Code, den vier Tester kennen, lässt sich nicht einem Menschen zuordnen und nicht sperren. Besser: Login pro Nutzer (Supabase Auth) – bereits als Aufgabe „Login statt Zugangscode“ in [[Aufgaben]] („Irgendwann“); aus Schutzsicht vor dem Livegang hochziehen.
- **Datenschutz/Auftragsverarbeitung** (Supabase, Anthropic, Netlify): hat nichts mit Ideenschutz zu tun, ist aber in [[Rechtliches]] offen.

## 4. Offene Frage: Wem gehört die Idee, wenn ich angestellt bin? ⚖️
**Nicht von der Nachtschicht zu beantworten – bitte Anwalt (Arbeitsrecht) und ggf. Steuerberater fragen.** Zu klären:
- **Arbeitsvertrag lesen:** Nebentätigkeitsklausel (Anzeige- oder Genehmigungspflicht), Wettbewerbsverbot, Verschwiegenheit, Klauseln zu „Erfindungen/Ergebnissen“.
- **Wettbewerb:** Wenn der Arbeitgeber im Elektrohandwerk tätig ist und Zählerklar Elektrobetrieben Aufträge/Zeit spart, kann das als Konkurrenztätigkeit oder zumindest als Interessenkonflikt gelten, solange das Arbeitsverhältnis läuft (Treuepflicht).
- **Arbeitnehmererfindungsgesetz:** gilt für patent-/gebrauchsmusterfähige Erfindungen; bei Software meist nicht einschlägig, dann zählt das Urheberrecht: Für Programme, die ein Arbeitnehmer *in Erfüllung seiner Pflichten* schreibt, stehen die Nutzungsrechte dem Arbeitgeber zu (§ 69b UrhG). Entscheidend ist, ob die Arbeit im Rahmen der Aufgaben geschah. Hier: Freizeit, eigene Geräte? Aber das Fachwissen kommt aus dem Betrieb.
- **Betriebsgeheimnisse:** Kommen Teile des Regelwerks aus Unterlagen, Schulungen oder Kundenfällen des Arbeitgebers (z. B. die Westnetz-Schulung „Bewertung von Zählerplätzen in Bestandsanlagen“ 09/2025)? Dann Eigentum/Nutzungserlaubnis klären. Gleiches gilt für **Kundenfotos aus dem Arbeitsalltag**.
- **Dokumentieren:** Wann, wo, womit wurde das Regelwerk erarbeitet? Der Git-Verlauf und die Vault-Daten (29.09.2026) belegen die Entstehung in der Freizeit. Schriftliche Freigabe des Arbeitgebers einholen, falls nötig.
- **Steuerberater:** Gewerbeanmeldung, Kleinunternehmerregelung, Umgang mit Nebeneinkünften – siehe auch [[Einschätzung Handwerks-Apps als Nebeneinkommen]].
- Mit offenen Karten spielen (Arbeitgeber informieren) ist oft sicherer als verschweigen. Aber erst nach anwaltlicher Beratung entscheiden, wie. 

## 5. Realistischer Schutz: Tempo, Netzwerk, Daten
Rechtlicher Schutz ist hier schwach. Was wirklich schützt:
1. **Vorsprung:** Wer zuerst 20 echte Fälle, 5 zahlende Betriebe und eine Trefferquote hat, ist nicht in zwei Wochen einholbar. Deshalb gilt weiter: erst die Gespräche ([[Validierung & Go-No-Go]]), dann bauen.
2. **Netzwerk:** Kollegen, Innung, Handwerkskammer ([[Direktansprache]]) – Vertrauen lässt sich nicht herunterladen.
3. **Daten:** Echte Fälle mit tatsächlicher Entscheidung (Trefferquote, häufige Fehlerbilder) sind der wertvollste Teil und entstehen nur im Betrieb. Dafür die Fotos/Entscheidungen sauber (und DSGVO-konform) sammeln.
4. **Pflege:** Das Regelwerk veralten zu lassen ist der sichere Tod (z. B. neue Westnetz-TAB nach BDEW-Musterwortlaut 2026, siehe [[Aufgaben]]). Wer aktuell bleibt, gewinnt gegen jede alte Kopie.
5. **Nicht überinvestieren:** Solange es null Kunden gibt, ist Schutz teurer als Nutzen. Kosten-Nutzen im Auge behalten.

## 6. Priorisierte Maßnahmenliste
| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | **Regelwerk nicht öffentlich ausliefern:** vor jedem Livegang keine öffentliche Bereitstellung der App mit eingebautem Regelwerk. Wenn Mittesten schon vorher: nur auf eigenem Handy zeigen (wie im Gesprächsleitfaden) oder Zugang nur an 4 bekannte Tester | 0 € | gering | **sofort** |
| 2 | **Regelwerk serverseitig** (Abschnitt 2) | 0 € (Supabase Free Tier) | mittel: ca. 1–2 Nachtschichten | **vor Netlify-Livegang** |
| 3 | **NDA/Testvereinbarung** für die 4 Tester | 0–150 € (Vorlage anwaltlich prüfen) | gering | vor dem Mittesten |
| 4 | **Arbeitgeber-Frage** klären (Abschnitt 4) | Erstberatung Anwalt ca. 100–250 € (Schätzung) | gering | **vor dem ersten Euro**, besser vorher |
| 5 | **Login statt gemeinsamem Zugangscode** | 0 € | mittel | vor dem Livegang |
| 6 | **Nutzungsbedingungen** (kein Scraping/Reverse Engineering, Haftung) | 0–300 € (Generator/Anwalt) | gering | vor dem bezahlten Betrieb |
| 7 | **Namensrecherche, dann DPMA-Marke** (Klassen 9, 42) | Recherche 0 €, Anmeldung ab ca. 290 € | gering | nach den Gesprächen, bei Go |
| 8 | **Repo privat lassen**, kein öffentliches Veröffentlichen des Regelwerks (auch nicht in Instagram-Posts: Posts zeigen Einzelregeln, nicht die Gesamtliste) | 0 € | gering | laufend |
| 9 | Beweissicherung: Git-Verlauf behalten, Vault-Stand sichern | 0 € | gering | laufend |
| 10 | Patent/Gebrauchsmuster | – | – | **nicht verfolgen** |

*Daraus abgeleitete Aufgaben stehen in [[Aufgaben]] unter „Als Nächstes“.*

## Offene Annahmen der Nachtschicht
- Keine Internetrecherche, Kosten und Paragrafen aus allgemeinem Wissen. Vor Entscheidungen prüfen.
- Repo `zaehlerschrank-check` ist angenommen privat. Vor einer Änderung der Sichtbarkeit bewusst prüfen.
- Ob und wie der Arbeitsvertrag Nebentätigkeiten regelt, ist nicht bekannt.
