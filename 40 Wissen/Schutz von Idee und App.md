---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
erstellt: 2026-11-20
status: entwurf – keine Rechtsberatung, juristische Punkte vom Anwalt prüfen lassen
---
# Schutz von Idee und App (Zählerklar)

> Analyse der Nachtschicht, **keine Rechtsberatung**. Alles mit ⚖️ ist unsicher und gehört vor eine Anwältin bzw. einen Anwalt (IT-/Gewerberecht). Die Kosten sind Größenordnungen aus dem Gedächtnis, vor jeder Ausgabe aktuell prüfen.

## Kurzfassung
1. **Die Idee** („Foto → Regelwerk → Maßnahmenliste“) ist nicht schützbar. Wer sie sieht, darf sie nachbauen.
2. **Geschützt werden können:** Code (automatisch, Urheberrecht), Name/Logo (Marke, DPMA), Regelwerk als Geschäftsgeheimnis (nur wenn wirklich geheim gehalten).
3. **Größte Lücke heute:** Das komplette Regelwerk (`regeln.json` + Logik in `regelwerk.ts`) steckt im Browser-Bundle. Jeder mit Zugang zur App kann es in 2 Minuten kopieren. Damit wäre die Geheimnis-Eigenschaft auch rechtlich gefährdet.
4. **Echter Schutz ist Tempo:** Vorsprung, Netzwerk, Daten aus echten Fällen. Das schwächste Glied ist ohnehin, dass noch niemand bezahlt hat → [[Validierung & Go-No-Go]]. Schutz darf die Gespräche nicht ausbremsen.

## 1. Was ist in Deutschland schützbar?
| Was | Schutz | Wie / Kosten | Einschätzung |
|---|---|---|---|
| **Idee / Konzept** | keiner | – | Nachbauen erlaubt. Nur Tempo und Umsetzung zählen. |
| **Quellcode** | Urheberrecht (§§ 69a ff. UrhG), entsteht automatisch | 0 €; Entwicklungsnachweis = Git-Verlauf (gut, Zeitstempel) | Schützt vor 1:1-Kopie, **nicht** vor Nachprogrammieren derselben Funktion. |
| **Texte, Grafiken, Flyer, Landingpage** | Urheberrecht, soweit „persönliche geistige Schöpfung“ | 0 € | Bei Canva-Vorlagen Lizenzbedingungen beachten → [[Bildrechte im Marketing]]. |
| **Name „Zählerklar“ / Logo** | Marke (DPMA), Klassen 9, 42 (ggf. 35, 41) | Online-Anmeldung grob 300 € für bis zu 3 Klassen, jede weitere Klasse extra; Schutz 10 Jahre | Sinnvoll, **sobald** Name und Domain gesichert sind → [[ADR-0006 Produktname Zählerklar]]. Vorher Recherche (Treffer im Register, Namensähnlichkeit). Marke verhindert Namens-Klau, nicht Funktions-Klau. Ohne Anmeldung gibt es nur schwachen Schutz durch Benutzung (Werktitel/Unternehmenskennzeichen) ⚖️. |
| **Regelwerk R01–R26 (Know-how)** | Geschäftsgeheimnisgesetz (GeschGehG) | 0 € – aber nur, wenn die Information **geheim ist, wirtschaftlichen Wert hat und „angemessenen Geheimhaltungsmaßnahmen“ unterliegt** (§ 2 Nr. 1) | Heute **nicht erfüllt** (Bundle, siehe Abschnitt 2). Selbst bei Schutz: Reverse Engineering ist laut GeschGehG ausdrücklich erlaubt, wenn das Produkt rechtmäßig erworben wurde und keine Beschränkung vereinbart ist (§ 3 Abs. 1 Nr. 2) ⚖️ → Nutzungsbedingungen nötig (Abschnitt 3). |
| **Datenbank/Regelsammlung** | Datenbankschutz (§§ 87a ff. UrhG) nur bei wesentlicher Investition in Beschaffung/Überprüfung | 0 € | Unsicher, ob 26 Regeln „Datenbank“ sind ⚖️. Nicht darauf bauen. |
| **Patent** | Software „als solche“ ist ausgeschlossen (§ 1 Abs. 3 PatG); nur bei technischem Beitrag | mehrere Tausend € mit Anwalt | Für diese Idee **nicht sinnvoll**: Regeln sind Fachwissen/Auslegung, keine technische Erfindung. Außerdem Veröffentlichung nach 18 Monaten. |
| **Gebrauchsmuster** | Verfahren und Software als solche ausgeschlossen | gering | Entfällt aus demselben Grund. |
| **Normtexte / TAB / Westnetz-Unterlagen** | gehören **anderen** (DIN, VDE, BDEW, Westnetz) | – | Wir übernehmen nur Fundstellen → [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]]. Prüfen, dass `bedingung`/`massnahme` in `regeln.json` eigene Formulierungen sind und keine abgeschriebenen Normabsätze ⚖️. |

## 2. Technischer Befund: Regelwerk liegt im Browser
**Befund (geprüft im Code, 20.11.2026):**
- `web/src/regelwerk.ts` importiert `./regeln.json` und enthält die komplette Auswertung (`ausgeloesteRegeln` …). Vite bündelt beides in das JavaScript der App.
- `regeln.json` (ca. 14 KB) enthält je Regel `bedingung`, `massnahme`, `stufe`, `fundstelle`, `geltung`, `status`. Also **genau das Kapital**: welche Regel wann greift, mit Quelle.
- Die Edge Function (`supabase/functions/api`) macht nur Fotoanalyse und Fall-Speicher, **keine** Regelauswertung.
- Auch die Demo auf claude.ai (privat) und `dist-artifact` enthalten das Regelwerk.

**Risiko-Bewertung (ehrlich):**
| Aspekt | Einschätzung |
|---|---|
| Kopierbarkeit | **Hoch.** Seite öffnen → Dev-Tools → Datei herunterladen. Kein Fachwissen nötig. Ein „Zugangscode“ schützt nur die API, nicht das ausgelieferte Bundle (beim Kollegen-Test liegt die App ohnehin ohne Login auf einer URL). |
| Schaden bei Kopie | **Mittel.** Wert liegt im Zusammentragen und Belegen (R01–R26, Fundstellen, Excel-Logik). Aber: Wer dieselben Quellen (TAB, Westnetz-Schulung) liest, kann Ähnliches selbst erarbeiten; die Regeln sind Fachwissen von Kollegen. Das Regelwerk ist ein Vorsprung von Monaten, kein Jahrzehnt-Burggraben. |
| Rechtlich | Ohne Geheimhaltungsmaßnahmen kaum als Geschäftsgeheimnis haltbar ⚖️. |
| Dringlichkeit | **Mittel, nicht akut.** Solange nur wenige bekannte Tester die App nutzen, überschaubar. Wird dringend **vor** dem öffentlichen Livegang (Netlify, Landingpage, Instagram). |

**Lösungsskizze „Regelwerk serverseitig“:**
1. `regeln.json` und die Regelauswertung wandern in die Edge Function (`supabase/functions/api/`), idealerweise als gemeinsames Modul, damit Tests weiter laufen (Deno kann `.ts`/`.json` importieren).
2. Neue Route `POST /bewerten`: App schickt die **Eingaben** (Schrank-Felder, Vorhaben, Netzform …), bekommt **Ergebnis** zurück: Ampel, Maßnahmen mit Fundstelle, „Vor Ort klären“, Hinweise. Das Regelwerk selbst (alle 26 Bedingungen) verlässt den Server nie.
3. Die App enthält nur Anzeige-Code. Der Offline-/Funkloch-Modus (Fälle lokal, Nachsenden) bleibt für die Fall-Speicherung, die **Auswertung** braucht dann Netz. Auf der Baustelle ist das ein echter Nachteil → Zwischenspeichern der letzten Ergebnisse, Auswertung beim Senden nachholen.
4. Der Demo-Build bekommt eine **gekürzte** Beispielauswertung (2–3 fest hinterlegte Beispiele), nicht das volle Regelwerk.
5. Tests: bestehende 13 Regelwerk-Tests in die Funktion verlegen bzw. dort ausführen; zusätzlich Test „Bundle enthält keine Regeltexte“ (z. B. Suche nach `Westnetz-Schulung` im `dist/`).

**Grenzen dieser Lösung (nicht verschweigen):**
- Wer die App benutzen darf, kann durch **systematisches Probieren** viele Eingabekombinationen abfragen und das Regelwerk Stück für Stück rekonstruieren (Ausleseangriff). Gegenmittel: Login statt gemeinsamem Zugangscode, Rate-Limit pro Konto, Protokoll auffälliger Massenabfragen, Nutzungsbedingungen. Vollständig verhindern lässt es sich nicht.
- Serverseitig heißt: Die Funktion läuft bei Supabase (Frankfurt, [[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]]). Zeitlimit und Kaltstarts beachten; Auswertung ist rechnerisch trivial, kein Problem.
- Es gibt **keine** zusätzliche Entscheidung nötig, die ADR-0001 („Regelwerk deterministisch im Code, nicht von der KI“) bleibt gültig: nur der Ort des Codes ändert sich. Falls der Nutzer das für eine eigene ADR hält: Eintrag nach Umsetzung.

## 3. Verträge und Zugang
| Maßnahme | Zweck | Anmerkung |
|---|---|---|
| **Geheimhaltungsvereinbarung (NDA)** für Tester/Kollegen, die tiefe Einblicke bekommen | belegt „angemessene Geheimhaltungsmaßnahmen“, verbietet Weitergabe | Kurze, einseitige Fassung (1–2 Seiten) reicht für den Anfang, Muster vom Anwalt prüfen lassen ⚖️. **Nicht** vor den Gesprächen verlangen: ein NDA schon zum Erstgespräch schreckt Kollegen ab. Erst, wenn jemand die App/das Regelwerk in der Tiefe bekommt (Mittesten). |
| **Nutzungsbedingungen / AGB** | Verbot von Kopieren, Weitergeben des Zugangs, Auslesen, Reverse Engineering; Haftungsgrenzen („Ersteinschätzung, keine Prüfung durch Elektrofachkraft“) | Anwalt prüfen lassen ⚖️ (AGB-Recht ist streng, insbesondere Haftung). Gehört zu [[Rechtliches]]. |
| **Login mit Konto** statt gemeinsamem Zugangscode | Zugang nachvollziehbar, einzeln sperrbar, Rate-Limit je Konto | Bereits in „Irgendwann“ (Login statt Zugangscode). **Hängt jetzt am Schutz:** vor Kollegen-Test hochziehen. Supabase Auth reicht. |
| **Geheimhaltung im Alltag** | Regelwerk-Excel und `regeln.json` nicht öffentlich, kein öffentliches GitHub-Repo, keine Regeltexte in Instagram-Posts | Die Posts zeigen Rätsel und Einzelwissen, nie das vollständige Regelwerk. Repos sind aktuell privat (prüfen!). |
| **Mitarbeit Dritter** (Freelancer, Hilfskräfte) | Rechte am Code/Inhalt klar beim Projekt | Schriftlich Nutzungsrechte übertragen lassen ⚖️. |

## 4. Offene Frage: Arbeitgeber (Anwalt / Steuerberater) ⚖️
**Unklar und wichtig:** Wem gehört die Idee bzw. das Regelwerk, wenn sie im Rahmen einer Anstellung im Elektrohandwerk entstanden ist? Der Vault weiß nur, dass das Fachwissen aus der Berufspraxis kommt → [[Mein Vorteil]]. Offene Punkte:
- **Arbeitsvertrag:** Nebentätigkeitsklausel (Anzeige- oder Genehmigungspflicht)? Wettbewerbsverbot während des Arbeitsverhältnisses? Ein Produkt, das sich an Kollegen und Betriebe der eigenen Branche richtet, kann als Konkurrenz zum Arbeitgeber gelten, wenn dieser ähnliche Leistungen anbietet.
- **Software, die im Arbeitsverhältnis entsteht:** § 69b UrhG weist Rechte an Programmen, die ein Arbeitnehmer in Wahrnehmung seiner Aufgaben oder nach Weisung schafft, dem Arbeitgeber zu. Wer den Code nachweislich in der Freizeit und ohne Betriebsmittel schreibt und es nicht zu seinen Aufgaben gehört, steht besser da. Grenzfälle ⚖️.
- **Arbeitnehmererfindung (ArbnErfG):** gilt nur für patent-/gebrauchsmusterfähige Erfindungen. Bei Software/Regelwerk unwahrscheinlich, aber nicht ausgeschlossen.
- **Betriebsgeheimnisse:** Was an Fachwissen stammt aus Schulungen, Unterlagen oder Fällen des Arbeitgebers (nicht aus öffentlichen TAB/Normen)? Das darf nicht ins Regelwerk. Besonders bei Fundstellen aus **Westnetz-Schulungsunterlagen** (z. B. „Bewertung von Zählerplätzen in Bestandsanlagen“) klären: öffentlich zugänglich? Weitergabe erlaubt?
- **Kundendaten:** Keine Kundendaten oder Fotos von Kundenanlagen aus der Arbeit ohne Einwilligung in die App/Fälle (Datenschutz, Vertragspflichten).
- **Steuer/Gewerbe:** Gewerbeanmeldung, Einnahmen aus Nebentätigkeit → Steuerberater.

**Nächster Schritt:** Arbeitsvertrag lesen (Nebentätigkeit, Verschwiegenheit, Wettbewerb). Dann eine Erstberatung (Fachanwalt für IT-Recht oder Arbeitsrecht, oft 100–250 € Pauschale ⚖️ vorher erfragen) mit genau diesen Fragen.

## 5. Realistischer Schutz: Tempo statt Paragrafen
- **Vorsprung:** Regelwerk R01–R26 mit Fundstellen, Trefferquote aus echten Fällen (Ziel 85 % bei 20 Fällen), Excel-Grundlage. Alles davon ist nachbaubar, aber mit Monaten Arbeit.
- **Netzwerk:** Kollegen, Großhändler, Innung Kreis Soest, HWK → [[Direktansprache]]. Vertrauen und Nutzung lassen sich nicht kopieren. Erste zahlende Betriebe binden: Jahresvertrag, Mitsprache bei neuen Regeln.
- **Daten:** Jeder Fall mit „tatsächlicher Entscheidung“ (Trefferquote, Fotoerkennung) ist ein wachsender, nicht öffentlicher Datenschatz; das ist langfristig der härteste Burggraben (Datenschutz beachten!).
- **Aktualität:** Das Regelwerk lebt von Pflege (neue TAB nach BDEW-Musterwortlaut 2026, andere Netzbetreiber). Ein Kopierer hat die Version von heute, nicht die von nächstem Jahr.
- **Marke und Domain:** Wer zuerst „Zählerklar“ besetzt (Domain, Instagram, DPMA), nimmt dem Nachahmer das Etikett.
- **Gegenprobe:** Ein Konkurrent mit gleicher Idee ist ein Signal für einen echten Markt. Das größere Risiko ist, dass **niemand** zahlt, nicht dass jemand kopiert → vor Schutzkosten erst [[Validierung & Go-No-Go]].

## 6. Priorisierte Maßnahmen
Reihenfolge nach Nutzen pro Aufwand und passend zu „erst verkaufen, dann bauen“ → [[Ideen-System]]. Aufwand für Code: Schätzung.

| # | Maßnahme | Kosten | Aufwand | Wann |
|---|---|---|---|---|
| 1 | **Arbeitsvertrag lesen**, Arbeitgeber-Frage klären (Abschnitt 4), Erstberatung buchen | ca. 0 € (lesen) + ⚖️ Beratung | 1–2 h + Termin | **vor** dem Kollegen-Test und vor jedem Marketing, weil es das Projekt selbst betrifft |
| 2 | Repos und Vault **privat** halten; keine Regeltexte in Posts/Flyer; Demo ohne volles Regelwerk | 0 € | 30 Min. | sofort |
| 3 | **Regelwerk serverseitig** (Code-Aufgabe, Abschnitt 2) | 0 € | ca. 1 Tag | **vor** öffentlichem Livegang / Netlify |
| 4 | **Login statt Zugangscode** + Rate-Limit je Konto | 0 € (Supabase Auth) | ca. 1 Tag | vor Kollegen-Test mit mehr als 4 Testern |
| 5 | **Nutzungsbedingungen** + NDA-Muster erstellen lassen | ⚖️ ca. 300–1.000 € je nach Umfang | Anwalt 1–2 Wochen | vor Livegang |
| 6 | **Namensprüfung + DENIC + DPMA-Recherche**, dann Marke anmelden | ca. 300 € + Recherche | 1–2 h + Anmeldung | nach Go-Signal aus den Gesprächen |
| 7 | Eigene Formulierungen in `regeln.json` gegen Normtexte prüfen | 0 € | 1–2 h | vor Livegang |
| 8 | Patent/Gebrauchsmuster | – | – | **nicht verfolgen** |

## Offen / Annahmen der Nachtschicht
- Geprüft wurde nur der Code-Stand `master` (34e3b80); ein gebautes Bundle wurde nicht untersucht, das Ergebnis folgt aber aus dem Aufbau (statischer Import von `regeln.json`).
- Rechtsstand, Gebühren und Paragrafen sind aus dem Gedächtnis; vor Nutzung prüfen.
- Ob die Repos auf GitHub privat sind, konnte ich hier nicht beurteilen.

Siehe [[Zählerschrank-Check]], [[App & Technik]], [[Rechtliches]], [[Mein Vorteil]].
