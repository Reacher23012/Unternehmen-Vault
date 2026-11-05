---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-11-05
status: entwurf – Analyse, keine Rechtsberatung
---
# Schutz von Idee und App

> **Hinweis:** Das ist eine Analyse zur Orientierung, **keine Rechtsberatung**. Alles mit „⚖ Anwalt“ muss vor einer Entscheidung geprüft werden. Kostenangaben sind Größenordnungen aus dem Gedächtnis, nicht frisch recherchiert – vor Ausgabe nachsehen.

**Kurzfassung:** Die Idee selbst ist nicht schützbar. Wert steckt im **Regelwerk R01–R26** ([[Regelwerk R01–R26]]), in den Fallfotos und im Tempo. Das Regelwerk liegt heute komplett im Browser jedes Nutzers (siehe 2). Das ist die größte vermeidbare Lücke. Vorher aber die Arbeitgeber-Frage (4) klären.

## 1. Was ist in Deutschland schützbar?
| Gegenstand | Schutz | Einordnung |
|---|---|---|
| **Idee** („Foto → Ampel für Zählerschrank“) | keiner | Ideen und Konzepte sind frei. Jeder darf ein ähnliches Produkt bauen. |
| **Quellcode** | Urheberrecht (§§ 69a ff. UrhG), entsteht automatisch | Schützt nur den konkreten Code, nicht die Funktion. Ein Nachbau mit eigenem Code ist erlaubt. |
| **Regelwerk / Texte** (`regeln.json`, Maßnahmen, Formulierungen) | Urheberrecht nur bei persönlicher geistiger Schöpfung; evtl. Datenbankschutz (§§ 87a ff. UrhG) bei wesentlicher Investition | Fakten und Normverweise sind nicht schützbar, Auswahl und Text teils schon. ⚖ Anwalt. Dazu gilt [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]: keine Normtexte, nur Fundstellen. |
| **Know-how** (Regeln, Schwellen, wie Fälle zu bewerten sind) | Geschäftsgeheimnisgesetz (GeschGehG) – **nur** bei „angemessenen Geheimhaltungsmaßnahmen“ (§ 2 Nr. 1) | Entscheidend: Was offen im Browser-Bundle liegt, ist praktisch kein Geheimnis mehr. |
| **Name „Zählerklar“** | Marke beim DPMA (Klassen 9 und 42, vgl. [[ADR-0006 Produktname Zählerklar]]) | Anmeldegebühr grob 290 € für bis zu 3 Klassen (nachsehen). Vorher Recherche (steht schon in [[Aufgaben]]). Ohne Marke nur schwacher Schutz über Benutzung. ⚖ Anwalt bei Kollisionen. |
| **Domain** | Registrierung (DENIC), kein Markenrecht | Steht bereits als Aufgabe an. |
| **Patent / Gebrauchsmuster** | Software „als solche“ ist ausgeschlossen (§ 1 Abs. 3 Nr. 3 PatG; Gebrauchsmuster schließt Programme ebenfalls aus) | Praktisch nicht sinnvoll: teuer, langsam, Veröffentlichung. **Nicht verfolgen.** |

Wichtig: **Reverse Engineering** eines öffentlich verfügbaren Produkts ist nach § 3 GeschGehG grundsätzlich erlaubt, **außer** es ist vertraglich ausgeschlossen. Darum sind Nutzungsbedingungen (3) wichtig.

## 2. Technischer Befund: Regelwerk liegt beim Nutzer
Geprüft im Code (Stand `master`, 05.11.2026):
- `web/src/regelwerk.ts` importiert `web/src/regeln.json` und enthält die Auswertung aller Regeln (`ausgeloesteRegeln`, `bewerte`). Vite baut beides ins öffentliche Bundle.
- Die Edge Function `supabase/functions/api/index.ts` kennt **keine** Regeln; sie macht nur Fotoanalyse (Claude) und Fall-Speicher. Die Auswertung läuft komplett im Browser.
- Folge: Wer die App (oder auch nur die statischen Dateien bei Netlify, ohne Login) öffnet, kann Bundle und `regeln.json` herunterladen: alle 26 Regeln mit Bedingung, Maßnahme, Fundstelle. Der Zugangscode schützt nur die API (`x-app-code`), **nicht** die Regeln. Das Demo-Artifact enthält das Regelwerk ebenfalls.
- Zusätzlich: Wer die App nutzt, sieht die Ergebnisse ohnehin – das Regelwerk lässt sich auch durch Ausprobieren nachbauen, nur mühsamer.

**Risiko-Bewertung (ehrlich):**
- *Wert des Regelwerks:* hoch, aber nur teilweise einzigartig. Die Grundlagen (TAB, VDE-AR-N 4100, Westnetz-Schulung) sind öffentlich; der Wert liegt in der Auswahl, Verdichtung und der Prüfung durch Praxis.
- *Wahrscheinlichkeit eines Diebstahls heute:* gering, solange es keine Nutzer gibt. Sie steigt mit jedem Besucher der öffentlichen Seite.
- *Schaden:* Konkurrent könnte die Regeln übernehmen und mit eigener App (eigene Fotoerkennung) starten. Rechtlich schwer angreifbar, weil nach 1 wenig Schutz besteht und das Know-how offen lag.

**Lösung (Skizze):** Regelauswertung in die Edge Function verlegen.
1. `regeln.json` und `regelwerk.ts` (Auswertung) wandern nach `supabase/functions/` (z. B. `POST /bewerten`, Eingaben rein, Ergebnis raus).
2. Die App bekommt nur **Ergebnis + Fundstelle** je ausgelöster Regel (Ampel, Maßnahmentext, Fundstelle) – nie die Bedingungen oder nicht ausgelösten Regeln.
3. Zugriff nur mit Zugangscode, später Login (siehe 3). Rate-Limit pro Nutzer, damit niemand das Regelwerk per Massenabfrage „abtastet“.
4. Live-Anzeige im Eingabeformular (`#live` zeigt Ampel + „n offen“) braucht dann einen Serveraufruf pro Änderung; mit Zwischenspeicher/Debounce lösbar. Offline-Fähigkeit (Funkloch!) geht verloren oder braucht eine abgespeckte Variante – **Zielkonflikt** mit [[App & Technik]] („Fälle gehen bei Funkloch nicht verloren“): Fälle bleiben speicherbar, Bewertung erst bei Netz.
5. Tests: `regelwerk.test.ts` zieht mit um (läuft unter Deno oder als Modul, das beide Seiten nutzen).
- Aufwand: ca. 1–2 Tage. Einschränkung: Wer im Gespräch/Test viele Fälle durchspielt, kann auch dann Regeln erahnen; das ist nur durch Verträge zu begrenzen.

**Meine Empfehlung:** Nicht jetzt umsetzen, solange nur eine Handvoll Kollegen die App nutzt und die [[Validierung & Go-No-Go]] noch läuft. **Aber** vor der öffentlichen Veröffentlichung (Netlify live, Landingpage mit Link zur App) unbedingt erledigen – oder die App bis dahin nur hinter Login/Zugangscode ausliefern, statt als frei abrufbare Seite. Das widerspricht nicht „erst verkaufen, dann bauen“: Die Aufgabe kommt erst nach den Gesprächen.

## 3. Verträge
- **NDA / Geheimhaltung für Tester und Kollegen:** kurze Vereinbarung (1 Seite): Inhalte der App (Regeln, Ergebnisse) vertraulich, nur zum Testen, nicht weitergeben. Wichtig für die Geheimhaltungsmaßnahme nach GeschGehG. Vorlage vom Anwalt oder Handwerkskammer-Service prüfen lassen ⚖. Bei den bereits vereinbarten Testern vor Freigabe mündlich + schriftlich (WhatsApp-Bestätigung reicht besser als nichts, ist aber schwach).
- **Nutzungsbedingungen:** kein Kopieren, kein systematisches Auslesen, kein Reverse Engineering, kein Weitergeben des Zugangs; Hinweis, dass die App die Prüfung durch die Elektrofachkraft nicht ersetzt (deckt zugleich die Haftung ab, siehe [[Rechtliches]]). Entwurf per Generator, dann ⚖ prüfen.
- **Zugang nur mit Login:** ein einziger geteilter `APP_CODE` ist kein Zugangsschutz pro Person (weitergebbar, nicht widerrufbar). Vor dem Test mit Kollegen: persönlicher Zugang je Tester (Supabase Auth oder eigener Code je Person) – steht schon als „Irgendwann“-Aufgabe in [[Aufgaben]]; durch diese Analyse wird sie wichtiger.
- Hinweis: AGB/Nutzungsbedingungen gegenüber Unternehmern (B2B) sind einfacher als gegenüber Verbrauchern; trotzdem ⚖.

## 4. Arbeitgeber-Frage (offen, ⚖ Anwalt/Steuerberater)
Frage: Wem gehört die Idee/App, wenn sie im Rahmen einer Anstellung im Elektrohandwerk entstanden ist? **Ich kenne den Arbeitsvertrag nicht** und kann das nicht beantworten. Punkte, die zu klären sind:
- **Urheberrecht an Software (§ 69b UrhG):** Schafft ein Arbeitnehmer Software „in Wahrnehmung seiner Aufgaben oder nach Weisungen“ des Arbeitgebers, stehen die Nutzungsrechte dem Arbeitgeber zu. Gilt das für eine App in der Freizeit? Meist nein, aber bei engem Bezug zur Arbeit (Fachwissen, Betriebsdaten, Arbeitszeit, Arbeitsmittel, Fotos aus Kundenobjekten) wird es streitig.
- **Arbeitnehmererfindungsgesetz:** betrifft patent-/gebrauchsmusterfähige Erfindungen, bei reiner Software meist nicht einschlägig; der Fall „Regelwerk als Erfindung“ ist unwahrscheinlich.
- **Nebentätigkeit:** viele Arbeitsverträge verlangen Anzeige/Genehmigung. Verstoß kann arbeitsrechtliche Folgen haben.
- **Wettbewerbsverbot:** Während des Arbeitsverhältnisses darf man dem Arbeitgeber keine Konkurrenz machen. Eine App für Elektrobetriebe konkurriert nicht direkt mit einem Betrieb, könnte aber als Konkurrenz zu dessen Beratung gesehen werden. Gerade wenn der Arbeitgeber selbst Zählerschränke prüft und anbietet. Dazu nachvertragliche Wettbewerbsverbote prüfen.
- **Geheimnisse des Arbeitgebers:** Fotos, Kundenschränke und interne Abläufe aus dem Betrieb dürfen nicht ohne Zustimmung in die App/Fallsammlung. Beim Erfassen realer Schränke ([[Aufgaben]]: 20 Fälle) deshalb nur eigene oder ausdrücklich freigegebene Fälle, ohne Adresse und Namen.
- **Praktisch:** Arbeitsvertrag, Betriebsvereinbarung und Tarifvertrag lesen (Nebentätigkeit, Geheimhaltung, Erfindungen). Dann **einmal beim Fachanwalt für Arbeitsrecht** (Erstberatung) klären, bevor Geld in die Marke oder den Livegang fließt. Alternativ: Arbeitgeber vorab schriftlich fragen/Freigabe einholen – das ist die sauberste Lösung, aber eine strategische Entscheidung (Gespräch mit dem Chef zeigt auch die Idee).
- Ebenso für die Gründung: Gewerbeanmeldung/Steuer-Fragen (Kleinunternehmer, Umsatzsteuer) → Steuerberater.

## 5. Realistischer Schutz durch Tempo
Rechtlich ist wenig zu holen; bleibende Vorteile entstehen anders:
- **Vorsprung:** Der erste, der das in der Region sauber und praxisnah macht, gewinnt Vertrauen. Regelwerk pflegen (neue TAB 2026 beobachten, R07/R09/R11/R19 belegen) → es ist ein lebendes Produkt, kein Dokument, das man einmal kopiert.
- **Netzwerk:** Innung, Kollegen, Großhändler → [[Mein Vorteil]], [[Direktansprache]]. Schwer zu kopieren.
- **Daten aus echten Fällen:** Trefferquote, korrigierte Fotofelder, die tatsächlichen Entscheidungen. Damit wird die Erkennung besser als bei jedem Nachbau. Fallsammlung deshalb sauber speichern (Datenschutz, Einwilligung in [[Rechtliches]]).
- **Marke und Name:** früh sichern, bevor Reichweite entsteht.
- Kritisch: Tempo nützt nur, wenn die Validierung zeigt, dass jemand zahlt. Schutzmaßnahmen vor dem ersten Gespräch sind **Wunschdenken-Infrastruktur** (vgl. [[2026-10-02 Ideen-Check]]). Es gibt aktuell nichts, was jemand stehlen würde, solange 0 Gespräche und 0 Zahler vorliegen.

## 6. Priorisierte Maßnahmenliste
| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | **Arbeitsvertrag lesen**, Nebentätigkeit/Geheimhaltung/Erfindungen notieren; ggf. Erstberatung Fachanwalt Arbeitsrecht | 0 € / Erstberatung grob 100–250 € (nachsehen) | 1–2 Std. | **vor** Livegang und Markenanmeldung |
| 2 | Tester-Vereinbarung (NDA light, 1 Seite) | 0 € (Vorlage) bis kleiner Anwaltsbetrag | 1 Std. | vor dem ersten Test durch Kollegen |
| 3 | Nutzungsbedingungen + Hinweis „ersetzt keine Prüfung“ | 0 € (Generator) + Prüfung | 2 Std. | vor Livegang |
| 4 | Persönlicher Zugang je Tester statt gemeinsamem `APP_CODE` | 0 € | ca. 1 Tag Code | vor Kollegen-Test |
| 5 | **Regelwerk serverseitig** (Edge Function liefert nur Ergebnis + Fundstelle) | 0 € | 1–2 Tage Code | vor öffentlichem Livegang |
| 6 | Domain sichern + DPMA-Recherche, dann Marke anmelden (nur bei Go) | Domain ca. 10 €/Jahr, Marke grob 290 € | 2 Std. | Recherche jetzt, Anmeldung nach Go |
| 7 | Regelwerk-Texte als eigenes Werk formulieren, keine Normtexte kopieren, Quellen nur als Fundstelle | 0 € | laufend | laufend |
| 8 | Patent/Gebrauchsmuster | – | – | **nicht verfolgen** |

Daraus entstehen die Aufgaben in [[Aufgaben]] unter „Als Nächstes“.

## Offene Fragen für Anwalt / Steuerberater
- ⚖ Arbeitsvertrag: Nebentätigkeit, Wettbewerb, § 69b UrhG – gehört mir die App?
- ⚖ Ist das Regelwerk als Datenbank/Werk schützbar, wenn es aus öffentlichen Normen und Schulungsunterlagen verdichtet ist?
- ⚖ Genügt ein einfaches NDA per Mail/WhatsApp als „angemessene Geheimhaltungsmaßnahme“?
- ⚖ Marke: Kollisionsrisiko „Zählerklar“ in Klassen 9/42.
- ⚖ Haftung bei falscher Einordnung (Haftungsausschluss im B2B).
- Steuerberater: Gewerbeanmeldung, Einkünfte aus Nebentätigkeit.
