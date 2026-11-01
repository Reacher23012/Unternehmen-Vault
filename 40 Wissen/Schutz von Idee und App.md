---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-11-01
status: entwurf – keine Rechtsberatung, Punkte mit ⚖️ vom Anwalt prüfen lassen
---
# Schutz von Idee und App

> **Keine Rechtsberatung.** Das ist eine Analyse aus allgemeinem Wissen (Stand der Recherche: nur Vault und Code, kein Anwalt, keine aktuelle Gesetzesprüfung). Alles mit ⚖️ ist unsicher und gehört vor einer Entscheidung zu einem Anwalt (IT-/Gewerberecht) oder Steuerberater. Gebühren sind Größenordnungen und müssen vor Anmeldung beim DPMA nachgesehen werden.

## Kurzfassung
1. **Die Idee selbst ist nicht schützbar.** „Foto rein, Zählerschrank-Einordnung raus“ kann jeder nachbauen.
2. **Schützbar sind nur konkrete Ergebnisse:** Code und Texte (automatisch durch Urheberrecht), der Name (Marke, kostet Geld), das Regelwerk als Geschäftsgeheimnis (nur wenn es wirklich geheim gehalten wird).
3. **Aktuell ist das Regelwerk nicht geheim:** Es steckt im Browser-Bundle der App. Sobald die App online ist, kann jeder, der die Adresse kennt, alle 26 Regeln samt Texten und Fundstellen lesen. Das ist der wichtigste technische Befund (Abschnitt 2).
4. **Der realistische Schutz ist Tempo, Netzwerk und echte Fälle** (Abschnitt 6), nicht Paragrafen. Das Regelwerk ist aus der TAB ableitbar, der Vorsprung liegt in der Aufbereitung und in den Daten.

## 1. Was ist in Deutschland überhaupt schützbar?
| Gegenstand | Schutz | Kosten / Aufwand | Einschätzung |
|---|---|---|---|
| **Idee / Konzept** („App für Zählerschrank-Check“) | keiner. Ideen sind frei. | – | Nicht schützbar, nur durch Vorsprung zu halten. |
| **Code** (Web-App, Edge Function) | Urheberrecht, entsteht automatisch mit der Erstellung (§§ 69a ff. UrhG). Schützt den konkreten Code, nicht die Funktion. | 0 € | Verhindert Kopieren, nicht Nachbauen. ⚖️ Wer ist Urheber, wenn der Code mit KI-Hilfe entstand? Für KI-generierte Teile ist der Schutz unklar. |
| **Texte, Grafiken, Posts, Flyer** | Urheberrecht, wenn eine eigene schöpferische Leistung vorliegt | 0 € | Gilt auch für KI-Texte nur eingeschränkt, siehe [[Canva-KI-Texte immer gegenlesen]]. Bildrechte: [[Bildrechte im Marketing]]. |
| **Regelwerk als Datensammlung** | evtl. Datenbankwerk / Datenbankherstellerrecht (§§ 4, 87a UrhG) ⚖️ | 0 € | Unsicher bei 26 Regeln, die inhaltlich aus der TAB kommen. Nicht darauf verlassen. |
| **Regelwerk als Know-how** | Geschäftsgeheimnis nach GeschGehG, **aber nur mit „angemessenen Geheimhaltungsmaßnahmen“** (§ 2 Nr. 1 GeschGehG) und nur, solange es nicht allgemein bekannt oder zugänglich ist | 0 € plus Aufwand für Maßnahmen | Aktuell nicht erfüllt (siehe Abschnitt 2). Auch dann schützt es nicht vor eigenständiger Ableitung aus der TAB. |
| **Name „Zählerklar“** | Marke beim DPMA (Wortmarke, Klassen 9 und 42, vgl. [[ADR-0006 Produktname Zählerklar]]). Ohne Eintragung nur schwacher Schutz durch Benutzung. | grob 300 € für die Online-Anmeldung mit bis zu 3 Klassen, 10 Jahre Laufzeit (Gebühr vor Anmeldung nachsehen); Anwalt optional | Sinnvoll, **aber erst nach Recherche** und erst, wenn der Name bleiben soll. ⚖️ Prüfung auf ältere Marken, auch ähnliche („klar“-Marken, Zähler-Software). Die Prüfung des DPMA ersetzt keine Kollisionsrecherche; Inhaber älterer Marken können widersprechen. |
| **Patent / Gebrauchsmuster** | Software „als solche“ und Geschäftsmethoden sind nicht patentfähig (§ 1 Abs. 3 PatG); Programme sind vom Gebrauchsmuster ausgeschlossen | Patent: vier- bis fünfstellig mit Anwalt | **Unrealistisch.** Ein Regelwerk mit Foto-Erkennung ist kein technischer Effekt im Sinn des Patentrechts. ⚖️ Nur bei einer echten technischen Neuerung (z. B. Messverfahren) prüfen lassen. |
| **Domain** | durch Registrierung (DENIC), kein Schutz gegen Marken Dritter | ca. 1 bis 2 € pro Monat | Als Aufgabe bereits offen. |

**Grenze des Urheberrechts:** Die TAB, der BDEW-Musterwortlaut und die Westnetz-Schulung gehören anderen. Das Regelwerk nennt nur Fundstellen und keine Normtexte (Regel aus [[Rechtliches]]). Das bleibt Pflicht. Sonst verletzt das eigene Produkt fremde Rechte. ⚖️ Ob die Westnetz-Schulung (09/2025) als Quelle genannt werden darf, hängt von deren Nutzungsbedingungen ab.

## 2. Technischer Befund: Das Regelwerk liegt im Browser
**Befund (am Code geprüft, `zaehlerschrank-check`):**
- `web/src/regeln.json` (26 Regeln mit Name, Bedingung, Maßnahme, Fundstelle, Geltung, Status) wird von `web/src/regelwerk.ts` importiert. `regelwerk.ts` enthält zusätzlich die gesamte Auslöse-Logik (`ausgeloesteRegeln`, Schlimmstfall-Annahmen, Messkonzept-Zuordnung, Ergebnis-Stufen) und wird von `web/src/main.ts` direkt im Browser aufgerufen (`bewerte(fall.eingaben)`).
- `vite build` bündelt alles in die ausgelieferten JS-Dateien. Es gibt **keinen** Schutz außer dem Zugangscode, und der schützt nur die Backend-Routen (`/analyse`, `/faelle`), **nicht** die statischen Dateien. Wer die App-Adresse hat, kann das Bundle laden und Regeln samt Logik lesen, ohne Code.
- Dasselbe gilt für den Demo-Build (`build:demo`), der als privates Artifact auf claude.ai liegt. Dort sehen nur freigeschaltete Nutzer das Bundle. Das ist ein kleines Risiko, solange der Link privat bleibt.
- Auch ohne App: Die Excel-Datei `Anhänge/Entscheidungsbaum_Zaehlerschrank.xlsx` und die Vault-Notiz [[Regelwerk R01–R26]] enthalten das Regelwerk im Klartext. Das Vault-Repository auf GitHub muss **privat** bleiben (prüfen).

**Bewertung des Risikos (ehrlich):**
- *Eintrittswahrscheinlichkeit gering:* Die Konkurrenz müsste die App finden, das Bundle lesen und das Regelwerk übernehmen. Wer das kann, könnte die Regeln auch selbst aus der TAB ableiten. Aufwand dafür: ein paar Tage Facharbeit, nicht Monate.
- *Schaden mittel:* Der Vorsprung „eigenes Regelwerk“ (Score-Punkt 5 bei „Vorsprung“, siehe [[Zählerschrank-Check]]) hängt genau daran. Ein Nachbau nähme zudem das Geschäftsgeheimnis-Argument: Was jedem offen im Browser liegt, ist kaum „angemessen geheim gehalten“. ⚖️
- *Heute (vor Livegang):* kein akutes Risiko, weil die App nicht öffentlich erreichbar ist (Netlify fehlt noch). **Das ändert sich mit dem ersten Livegang** und mit jedem Tester, der die Adresse weitergibt.

**Lösungsskizze: Regelauswertung serverseitig**
1. Neue Route `POST /bewerte` in der Edge Function `api`. Eingabe: `Eingaben` (wie bisher). Ausgabe: nur die Bewertung: `ergebnis`, `ergebnisSchlimmstenfalls`, `messkonzept`, die **ausgelösten** Regeln mit Maßnahme und Fundstelle und die „offen“-Regeln. Die Regeln, die nicht greifen, verlassen den Server nie.
2. `regelwerk.ts` und `regeln.json` ziehen aus `web/` nach `supabase/functions/api/` (oder ein gemeinsames Modul, das nur der Server importiert). Die Tests laufen weiter (`npm test`), nur der Import-Pfad ändert sich.
3. Die App ruft `/bewerte` statt `bewerte()` auf, mit Zugangscode wie bei den anderen Routen. Der Demo-Build bekommt eine feste Beispielantwort (`demo.ts`) und enthält kein Regelwerk.
4. Der Fall wird mit dem Ergebnis gespeichert (wie bisher), die Trefferquote bleibt berechenbar.

**Kosten und Nachteile der Lösung:**
- **Kein Offline-Betrieb mehr für die Bewertung.** Zählerschränke stehen oft im Keller ohne Empfang. Heute geht das Ergebnis auch ohne Netz (nur die Fotoanalyse braucht Backend). Mitigation: Eingaben lokal speichern und das Ergebnis nachholen (vorhandenes Nachsenden von Fällen nutzen). Ob das für Elektriker vor Ort akzeptabel ist, zeigt nur ein Test mit Kollegen. Das ist eine Produktentscheidung, kein Detail → vor der Umsetzung ein ADR (z. B. „ADR-0007 Regelauswertung serverseitig“).
- **Server-Schutz ist nicht lückenlos:** Wer einen gültigen Zugangscode hat, kann `/bewerte` systematisch mit vielen Eingaben abfragen und das Regelwerk so rekonstruieren. Dagegen helfen Login pro Nutzer statt gemeinsamem Code, Rate-Limit und Protokoll. Beides ist heute bewusst offen (siehe [[App & Technik]]).
- Aufwand: grob 1 bis 2 Tage Code, wenig laufende Kosten (Edge-Function-Aufrufe sind klein gegenüber der Fotoanalyse).
- Der Gewinn ist begrenzt: Er verhindert das **bequeme** Abgreifen, nicht den Nachbau aus der TAB. Er lohnt sich vor allem, weil er die Voraussetzung für „angemessene Geheimhaltungsmaßnahmen“ schafft und weil er gegen unser eigenes „Zugangscode reicht“ nichts mehr verschenkt.

**Empfehlung:** Umsetzen **vor** dem ersten öffentlichen Livegang und vor der Weitergabe an Fremde, aber **nach** den Gesprächen und nicht vor Validierungs-Aufgaben (Regel „erst verkaufen, dann bauen“). Für die Test-Runde mit Kollegen reicht das Bundle plus NDA/Login (Abschnitt 3), wenn die Adresse nicht öffentlich verlinkt wird.

## 3. Verträge und Zugang
| Maßnahme | Zweck | Stand / Hinweis |
|---|---|---|
| **Geheimhaltungsvereinbarung (NDA)** für Tester und Kollegen, die die App sehen | Voraussetzung dafür, dass das Regelwerk als Geschäftsgeheimnis zählt (§ 2 GeschGehG) | ⚖️ Vorlage vom Anwalt prüfen lassen. Für Gespräche reicht oft eine mündliche Absprache plus Hinweis; für Tester mit App-Zugang schriftlich (E-Mail-Bestätigung genügt als Anfang). |
| **Nutzungsbedingungen** (kein Kopieren, kein Auslesen, kein Weitergeben des Zugangs, kein Reverse Engineering, Ergebnisse ersetzen keine Prüfung) | Ohne vertragliche Beschränkung ist das Untersuchen eines rechtmäßig erlangten Produkts (Reverse Engineering) nach dem GeschGehG erlaubt (§ 3 Abs. 1 Nr. 2). Das Verbot muss also **vertraglich** stehen. | ⚖️ Entwurf kann die Nachtschicht schreiben, die Endfassung nicht. AGB-Recht (§§ 305 ff. BGB) beachten, wenn mit Betrieben im B2B abgeschlossen wird. |
| **Zugang nur mit Login** statt gemeinsamem Zugangscode | Wer ist drin? Wer hat was gesehen? Einzelne Zugänge sperrbar. | Steht schon als „Login statt Zugangscode, bevor Kollegen testen“ unter „Irgendwann“. Gehört zusammen mit Punkt 2 vor jeden Livegang. |
| **Warteliste/Landingpage zeigt kein Regelwerk** | Öffentliche Seite bleibt Marketing | Heute so (Landingpage hat keine Regeln). So lassen. |
| **Vermerk „© [Name], alle Rechte vorbehalten“** im Footer/Impressum | schwacher Hinweis, kostet nichts | ⚖️ nach Impressums-Prüfung ergänzen. |

## 4. Die Arbeitgeber-Frage (⚖️ wichtigster offener Punkt)
**Frage:** Wem gehört die Idee, das Regelwerk und der Code, wenn sie im Rahmen einer Anstellung im Elektrohandwerk entstanden sind? Ich kann das nicht beurteilen, weil ich den Arbeitsvertrag nicht kenne. Diese Punkte sind zu klären:
1. **Arbeitsvertrag lesen:** Nebentätigkeitsklausel (Anzeige- oder Genehmigungspflicht?), Wettbewerbsverbot, Verschwiegenheitspflicht, Regelung zu Erfindungen und Arbeitsergebnissen. Diese Prüfung kostet nichts und lässt sich sofort machen.
2. **Wettbewerb:** Während des Arbeitsverhältnisses gilt eine Treuepflicht; bietet der Arbeitgeber selbst Prüfungen/Beratung zu Zählerplätzen an, kann eine Software für diesen Markt als Konkurrenz gelten. ⚖️
3. **Diensterfindungen:** Das Arbeitnehmererfindungsgesetz gilt nur für patent- oder gebrauchsmusterfähige Erfindungen. Bei Software und Regelwerk wohl kaum relevant. ⚖️
4. **Software-Urheberrecht:** Bei Programmen, die ein Arbeitnehmer **in Wahrnehmung seiner Aufgaben oder nach Anweisung** des Arbeitgebers schafft, stehen die Nutzungsrechte grundsätzlich dem Arbeitgeber zu (§ 69b UrhG). Wer das Regelwerk **privat, in der Freizeit, mit eigenen Mitteln** erarbeitet, steht besser da, aber Grenzfälle gibt es. ⚖️
5. **Wissensherkunft und Arbeitsmittel:** Stammt Wissen aus betrieblichen Unterlagen, Schulungen oder Kundenfällen des Arbeitgebers (z. B. die Westnetz-Schulung, interne Prüfprotokolle, Fotos von Kundenanlagen)? Wurde die Excel-Datei oder Code auf Firmenrechner, Firmenhandy oder in Arbeitszeit erstellt? Das gehört sauber getrennt und dokumentiert.
6. **Kundendaten/Fotos:** Fotos aus Kundenanlagen des Arbeitgebers dürfen nicht ohne Erlaubnis in die App. Für die 20 Test-Schränke Fotos nur aus eigenen/erlaubten Anlagen und ohne Adresse, Namen, Zählernummer (siehe Aufgabe „Eigene Fotos“).

**Vorschlag:** Einmalige Rechtsberatung bei einem Fachanwalt für Arbeitsrecht/IT-Recht (Erstberatung, Kosten vorab erfragen, oft im zweistelligen bis niedrigen dreistelligen Bereich; ⚖️ nachfragen). Dazu die Handwerkskammer-Rechtsberatung für Mitglieder fragen (oft kostenlos oder günstig; Anschreiben liegt schon vor: [[Anschreiben Handwerkskammern]]). Steuerberater für die Frage Nebengewerbe/Gewerbeanmeldung/Umsatzsteuer.

## 5. Was bewusst NICHT sinnvoll ist
- Patent anmelden (teuer, kaum Aussicht, siehe Abschnitt 1).
- Alles verschleiern oder verschlüsseln: Ein Bundle im Browser lässt sich nicht wirklich verstecken. Minify ist keine Sicherheit.
- Die Gespräche mit Kollegen aus Geheimhaltungsgründen bremsen. Ohne Gespräche gibt es keine Validierung ([[Validierung & Go-No-Go]]). Das Risiko, dass jemand die Idee klaut, ist kleiner als das Risiko, dass niemand zahlt.

## 6. Realistischer Schutz durch Tempo
Hier liegt der tatsächliche Schutz, weil das Regelwerk allein kopierbar ist:
1. **Vorsprung:** Gespräche, Pilot mit Kollegen, erste zahlende Kunden vor jedem Nachbau. Ein Nachbauer fängt bei null an und kennt die Westnetz-Praxis nicht.
2. **Netzwerk:** Direktansprache über Kollegen, Innung, Großhändler ([[Direktansprache]]). Vertrauen im Handwerk ist schwer zu kopieren ([[Mein Vorteil]]).
3. **Daten aus echten Fällen:** Jeder erfasste Fall mit tatsächlicher Entscheidung verbessert Trefferquote und Foto-Erkennung. Dieser Datensatz ist der härteste Vorteil und liegt (mit RLS ohne Policies) nur serverseitig. DSGVO: Fotos ohne Personenbezug, Einwilligung/Hinweis in der App ([[Rechtliches]]).
4. **Aktualität:** Das Regelwerk bleibt nur wertvoll, wenn es mit den neuen TAB der Netzbetreiber Schritt hält (Aufgabe „Neue Westnetz-TAB beobachten“). Das ist laufende Arbeit, die ein Kopierer pflegen müsste.
5. **Marke und Domain:** früh sichern, damit niemand den Namen besetzt.

## 7. Priorisierte Maßnahmen
| Prio | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | **Arbeitsvertrag lesen** (Nebentätigkeit, Wettbewerb, Verschwiegenheit, Arbeitsergebnisse); Entstehung von Excel/Regelwerk dokumentieren (wann, wo, womit) | 0 € | 1 Stunde | diese Woche, vor weiterer Außenwirkung |
| 2 | **Erstberatung Anwalt** (Arbeitgeber-Frage, Nutzungsbedingungen, NDA, Impressum) – siehe [[Rechtliches]] | ca. zweistellig bis dreistellig, vorab erfragen | 1 bis 2 Stunden | vor dem Livegang |
| 3 | **Vault-Repository und Code-Repository privat halten**, 2-Faktor-Login bei GitHub/Supabase/Netlify | 0 € | 30 Minuten | sofort |
| 4 | **NDA-Kurzfassung für Tester** (E-Mail-Text oder Einseiter) | 0 € bis Anwaltspreis | 1 Stunde | vor dem ersten Test-Zugang (04.10. war nur mit eigenem Handy gezeigt) |
| 5 | **Name prüfen:** DENIC-Abfrage, DPMA-Recherche; bei Go Wortmarke anmelden | Recherche 0 €, Anmeldung grob 300 € | 1 bis 2 Stunden | vor Druck/Livegang (steht schon in „Jetzt“) |
| 6 | **Login statt Zugangscode** (Supabase Auth, ein Konto je Tester) | 0 € | 1 bis 2 Tage | vor dem Test mit Kollegen / vor Livegang |
| 7 | **Regelauswertung serverseitig** (`POST /bewerte`) inkl. ADR | 0 € | 1 bis 2 Tage | vor öffentlichem Livegang, nach den Gesprächen |
| 8 | **Nutzungsbedingungen** (Entwurf) und Footer-Vermerk | 0 € Entwurf, Anwaltsprüfung | 2 Stunden | zusammen mit Impressum-Prüfung |
| 9 | Marke anmelden (nur bei Go) | grob 300 € | 1 Stunde | nach Go/No-Go |
| 10 | Patent / Gebrauchsmuster | – | – | nicht verfolgen |

## Quellen und Grenzen
Allgemeines Wissen zu UrhG, GeschGehG, MarkenG, PatG und ArbnErfG, ohne Abruf aktueller Gesetzestexte und ohne Kenntnis des Arbeitsvertrags. Details (Paragrafen, Gebühren) vor einer Entscheidung nachprüfen. Zusammenhang: [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]], [[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]], [[App & Technik]].
