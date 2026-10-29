---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
erstellt: 2026-10-29
status: analyse – keine Rechtsberatung, Rechtsfragen vom Anwalt prüfen lassen
---
# Schutz von Idee und App („Zählerklar“)

> Analyse der Nachtschicht vom 29.10.2026, **keine Rechtsberatung**. Alles, was mit „⚖ Anwalt“ markiert ist, bitte vor einer Entscheidung prüfen lassen (Fachanwalt für IT-/Urheberrecht bzw. Patentanwalt; Erstberatung der Handwerkskammer oder IHK ist oft günstig/kostenlos). Zugehörige Notizen: [[Rechtliches]], [[App & Technik]], [[Mein Vorteil]], [[ADR-0001 Zählerschrank-App als Validierungswerkzeug]].

## 0. Sofortbefund (wichtiger als alles Folgende)
**Der GitHub-Repo des Vaults (`Reacher23012/Unternehmen-Vault`) ist öffentlich** (Stand 29.10.2026, per GitHub-Abfrage; der Code-Repo `zaehlerschrank-check` ist privat). Im Vault liegen:
- `Anhänge/Entscheidungsbaum_Zaehlerschrank.xlsx` – die **Excel-Grundlage mit dem kompletten Regelwerk R01–R26**, also genau der Teil, den dieses Konzept schützen soll,
- Name und Anschrift im Impressum-Entwurf ([[Rechtliches]]), Supabase-Projekt-Ref, Preisannahmen, Gesprächs- und Marketingnotizen.

Folgen: Jeder kann das Regelwerk lesen, kopieren und klonen. Es gilt: Wer ein Geschäftsgeheimnis selbst öffentlich ablegt, trifft keine „angemessenen Geheimhaltungsmaßnahmen“ (siehe 1.4). Auch nach dem Umstellen auf privat bleiben Kopien, Forks und Zwischenspeicher möglich; die **Git-Historie** enthält den Stand weiter. ⚖ Anwalt: ob bereits ein Verlust des Geheimnisschutzes eingetreten ist.

**Sofort (5 Minuten, Nutzer):** GitHub → Repo `Unternehmen-Vault` → Settings → General → Danger Zone → *Change visibility* → *Private*. Danach prüfen, ob es Forks/Klone gibt (Settings → Insights → Forks), und die Nachtschicht-Routine weiter funktionieren lässt (sie nutzt das Repo mit Zugriff; private Repos gehen). Die Nachtschicht ändert die Sichtbarkeit nicht selbst.

## 1. Was ist in Deutschland überhaupt schützbar?
| Gegenstand | Schutz? | Wie | Kosten / Aufwand | Einschätzung |
|---|---|---|---|---|
| **Idee** („Foto → Einordnung Zählerschrank“) | Nein | Ideen als solche sind frei. Kein Urheberrecht, kein Patent auf bloße Idee. | – | Kopierbar, sobald jemand sie kennt. Schutz nur über Tempo, Daten, Netzwerk. |
| **Quellcode, Oberfläche, Texte, Grafiken** | Ja, automatisch | Urheberrecht (§ 69a ff. UrhG für Software). Kein Antrag nötig, entsteht mit dem Werk. Schützt den **konkreten Code/Text**, nicht die Funktionsidee. | 0 € | Hilft gegen 1:1-Kopie, nicht gegen Nachbau mit eigenem Code. Nachweis: Git-Historie mit Datum sichern. |
| **Name „Zählerklar“ / Logo** | Ja, nach Anmeldung | Marke beim DPMA (Klassen 9 und 42, ggf. 35/41). Prüfung vorab: DPMAregister, EUIPO, Domain `zaehlerklar.de`, Handle. | Anmeldung DPMA online ca. 290 € (Gebühr für bis zu 3 Klassen, Stand zuletzt bekannt; vor Anmeldung auf dpma.de nachsehen); Anwalt optional | Sinnvoll **erst nach Namensprüfung und ersten Signalen** (siehe [[ADR-0006 Produktname Zählerklar]]). Eine Marke verhindert nur Namens-, nicht Funktionskopie. Vorher kostenlose Recherche, ⚖ Anwalt bei Kollisionsrisiko. |
| **Regelwerk R01–R26 (Know-how)** | Ja, unter Bedingung | **Geschäftsgeheimnisgesetz (GeschGehG)**: geschützt ist nur, was (a) nicht allgemein bekannt, (b) wirtschaftlich wertvoll **und** (c) durch **angemessene Geheimhaltungsmaßnahmen** geschützt ist (§ 2 Nr. 1). Ohne (c) kein Schutz. | 0 € plus Aufwand für Maßnahmen | **Der eigentliche Hebel.** Heute nicht erfüllt: Vault öffentlich (siehe 0), Regeln im Browser-Bundle (siehe 2). Fachlich-rechtlicher Hinweis: Die zugrunde liegenden **TAB/Normen sind öffentlich**; geschützt wäre nur die eigene Aufbereitung/Verknüpfung. ⚖ Anwalt: wie weit diese Aufbereitung als Geheimnis trägt. |
| **Datenbank der Fälle** (Fotos, Entscheidungen) | Teilweise | Datenbankherstellerrecht (§§ 87a ff. UrhG) bei wesentlicher Investition; praktisch Geschäftsgeheimnis + Zugriffskontrolle. | 0 € | Wird erst mit echten Fällen wertvoll (siehe 5). Datenschutz beachten (Fotos von Kundenanlagen). |
| **Patent / Gebrauchsmuster** | Praktisch nein | Software „als solche“ ist nicht patentierbar (§ 1 Abs. 3 PatG); nur technische Lösung mit technischem Beitrag. Gebrauchsmuster: Verfahren ausgeschlossen. | Patent mehrere tausend € plus Jahresgebühren | Für diese App unrealistisch (Regelauswertung = Geschäftsmethode/Logik). ⚖ Patentanwalt nur, wenn ein technisches Novum (z. B. neues Messverfahren) entstünde. Nicht empfohlen. |

## 2. Technischer Befund: Regelwerk liegt im Browser
Geprüft im Code (`zaehlerschrank-check`, Stand 29.10.2026):
- `web/src/regeln.json` (ca. 14 KB: Name, Bedingung, Maßnahme, Stufe, Fundstelle, Geltung, Status je Regel) wird in `web/src/regelwerk.ts` importiert; zusätzlich steht dort die **gesamte Auswertungslogik** (Bedingungen, Schwellen wie 4,2 kW, 4,6 kW, 12 kW, 25 kW, 30 kW, 32 A, Messkonzept-Zuordnung, „schlimmster Fall“).
- `bewerte(e)` läuft **vollständig im Browser**. Das Vite-Bundle enthält damit Regeln und Logik; auch minifiziert ist beides für jeden Nutzer mit Entwicklerwerkzeugen oder einem Blick in die ausgelieferte JS-Datei lesbar. Das gilt auch für die Demo-Fassung.
- Der Server (`supabase/functions/api/index.ts`) macht nur Fotoanalyse (Claude), Fall-Speicher und Warteliste. Der System-Prompt der KI liegt dort serverseitig, ist also nicht im Browser. (Er enthält die Merkmale/Hinweise, aber nicht die Entscheidungsregeln.)
- Zugang heute: ein gemeinsamer `APP_CODE` im Header, kein Login, kein Rate-Limit (bewusst offen laut [[App & Technik]]). Die **statischen App-Dateien** (und damit das Regelwerk) sind nach dem Netlify-Livegang für **jeden** abrufbar, auch ohne Code, weil nur die API den Code prüft.

**Risikobewertung:** Hoch, sobald die App öffentlich gehostet ist (Netlify-Livegang steht in „Jetzt“). Wer die URL kennt, kann das Regelwerk komplett herauslesen; das ist kein „Hack“, sondern normales Ausliefern. Rechtlich schwächt es zusätzlich das Geschäftsgeheimnis (keine angemessene Maßnahme). Sachlich ist der Schaden begrenzt, solange die Regeln im Kern aus öffentlichen TAB/Normen abgeleitet sind – der Wert liegt in der Aufbereitung, den Fundstellen und der Pflege (siehe 5).

**Lösungsskizze „Regelauswertung serverseitig“:**
1. Neue Route `POST /bewerten` in der Edge Function: nimmt `Eingaben`, ruft `bewerte()` (Regelwerk liegt nur im Server-Code), liefert **nur das Ergebnis**: Ampel, ausgelöste Regeln mit Name, Maßnahme, Fundstelle, offene Punkte, Messkonzept. Nicht: Bedingungen, Schwellen, nicht ausgelöste Regeln.
2. `regelwerk.ts` und `regeln.json` aus `web/` entfernen (Server-Code unter `supabase/functions/`), die Typen bleiben im Client. Das Frontend zeigt das Ergebnis, ruft für jede Änderung der Eingaben neu auf (oder erst beim Button „Auswerten“).
3. Ehrliche Grenzen: (a) **Black-Box-Abfrage**: Wer Zugang hat, kann viele Eingabekombinationen durchprobieren und das Regelwerk so nachbauen. Das ist nur mit Aufwand möglich, kostet aber nichts mehr als Zeit. Gegenmittel: Login pro Person, Rate-Limit, Protokoll auffälliger Abfragen, Nutzungsbedingungen (siehe 3). (b) **Offline-Betrieb**: Der Client rechnet heute auch ohne Netz (Funkloch, siehe Review 29.09.). Serverseitig braucht die Bewertung Netz; Fälle lassen sich weiter lokal erfassen und später bewerten. Das ist ein echter Funktionsverlust auf Baustellen mit schlechtem Empfang. (c) Die Tests (`regelwerk.test.ts`, 13 Tests) müssen auf die Serverfunktion umziehen. (d) Die Demo (claude.ai-Artifact) braucht das Regelwerk im Bundle; die Demo-Fassung dürfte daher **nur gekürzte Beispieldaten** enthalten, nie das volle Regelwerk.
4. Aufwand grob: 0,5–1 Tag für Code und Tests, ohne neue Abhängigkeiten. Vorher erst entscheiden, ob Offline-Betrieb wichtiger ist (Entscheidung als ADR festhalten).

**Nicht überschätzen:** Obfuskation/Minifizierung im Browser ist kein Schutz. Zugangscode allein schützt die API, nicht die statischen Dateien.

## 3. Verträge und Zugang
- **NDA für Tester/Kollegen** (⚖ Anwalt nur für die Endfassung; Muster der Handwerkskammer/IHK oder Verbandsmuster nutzen): einseitige Geheimhaltung für den Testzeitraum – was ist vertraulich (Regelwerk, Ergebnisse, nicht öffentliche Funktionen), Zweck (Testen), Laufzeit (z. B. 2–3 Jahre), keine Weitergabe, Rückgabe/Löschung, Vertragsstrafe nur mit Anwalt formulieren. Realismus: Bei Kollegen im Handwerk ist ein NDA schwierig durchzusetzen und wirkt schnell misstrauisch; für die ersten Gespräche eher **gar nichts zeigen, was das Regelwerk offenlegt** (nur Beispiele und Ergebnisse), NDA erst, wenn jemand Zugang zur App bekommt.
- **Nutzungsbedingungen (AGB)** für die App: kein Kopieren, kein Auslesen, kein Reverse Engineering, keine Weitergabe des Zugangs, keine automatisierten Abfragen, Haftungsausschluss/Hinweis „ersetzt keine Prüfung durch die Elektrofachkraft“ (siehe [[Rechtliches]]). Vertragsschluss beim Login (Checkbox + Speicherung der Zustimmung). ⚖ Anwalt: Wirksamkeit der Klauseln gegenüber Unternehmern (B2B), Reverse-Engineering-Verbot in Verhältnis zu § 69e UrhG (Dekompilierung ist gesetzlich eingeschränkt erlaubt; ein Verbot ist nicht in jedem Umfang wirksam).
- **Zugang nur mit Login:** Heute ein gemeinsamer Zugangscode. Vor dem Mittesten durch Kollegen: Login pro Person (Supabase Auth), Konto im Kopf der Fälle, Möglichkeit, einzelne Zugänge zu sperren. Steht schon als „Irgendwann“ in [[Aufgaben]]; durch dieses Konzept wird die Aufgabe wichtiger.
- **Interne Geheimhaltung:** Vault und Repos nur privat; wer Zugriff hat, dokumentieren; Passwörter/Schlüssel nie im Vault (Regel aus der CLAUDE.md gilt weiter).

## 4. Offene Frage für Anwalt/Steuerberater: Wem gehört die Idee? (Arbeitgeber)
Das ist **die wichtigste Rechtsfrage**, wenn das Regelwerk neben einer Anstellung im Elektrohandwerk entsteht. Ich bewerte hier nichts abschließend, sondern sammle, was zu klären ist:
1. **Arbeitsvertrag lesen:** Nebentätigkeitsklausel (Anzeige-/Genehmigungspflicht), Wettbewerbsverbot, Verschwiegenheit, Regelungen zu Arbeitsergebnissen und Erfindungen.
2. **Urheberrecht an Software (§ 69b UrhG):** Programme, die ein Arbeitnehmer **in Wahrnehmung seiner Aufgaben oder nach Weisung** des Arbeitgebers schafft, liegen beim Arbeitgeber. Entsteht der Code in der Freizeit ohne Auftrag, ist er meist nicht betroffen. Strittig sind Grenzfälle (Arbeitszeit, Arbeitsmittel, Kundendaten, Nutzung von Betriebswissen).
3. **Arbeitnehmererfindungsgesetz:** gilt für patent-/gebrauchsmusterfähige Erfindungen; bei dieser App wegen 1. praktisch kaum relevant, aber für Diensterfindung/freie Erfindung kurz mitklären.
4. **Betriebsgeheimnisse:** Kundenfotos, Auftragsdaten, interne Preislisten oder Checklisten des Arbeitgebers dürfen **nicht** in Regelwerk, Testdaten oder Fotos einfließen. Das Regelwerk speist sich laut Projekt aus TAB/Normen und eigenem Fachwissen; Herkunft jeder Regel nachvollziehbar dokumentieren (Fundstelle ist da, siehe `regeln.json`).
5. **Wettbewerb:** Könnte die App den Arbeitgeber (oder seine Kunden) konkurrenzieren? Dann sind Nebentätigkeit und Wettbewerbsverbot kritisch.
6. **Selbstständigkeit starten:** Gewerbeanmeldung, Steuern, Kleinunternehmerregelung, Krankenversicherung: ⚖ Steuerberater (Erstberatung), nicht Teil dieser Notiz.

→ Für Anwalt/Steuerberater vorbereiten: Arbeitsvertrag, Zeitpunkt und Ort der Entstehung (Git-Historie, Excel-Datum), eingesetzte Arbeitsmittel, Frage „darf ich das vermarkten, brauche ich eine schriftliche Freigabe des Arbeitgebers?“. Im Zweifel **vor dem Livegang** eine schriftliche Freigabe/Verzicht des Arbeitgebers einholen.

## 5. Realistischer Schutz: Tempo und Vorsprung
Das Recht schützt hier wenig. Wirklich trägt, was nicht kopierbar ist:
- **Vorsprung:** Ein Nachbau des Regelwerks aus öffentlichen TAB ist machbar, aber Arbeit. Je früher Kollegen mit der App arbeiten, desto schwerer ist der Einholschritt.
- **Netzwerk:** Direktzugang zu Betrieben im Westnetz-Gebiet ([[Mein Vorteil]], [[ADR-0005 Direktansprache vor Instagram]]), Innung, Großhändler.
- **Daten aus echten Fällen:** Fotos plus korrigierte Entscheidungen verbessern Erkennung und Regeln; das ist der wertvollste, schwer kopierbare Bestand (Datenschutz klären, Fotos ohne Adresse/Namen).
- **Pflege:** Die Regeln ändern sich (neue TAB, BDEW-Musterwortlaut 2026, siehe [[Aufgaben]]); wer aktuell bleibt, ist der Anbieter.
- **Ehrlicher Abgleich:** Die erste Frage bleibt Zahlungsbereitschaft, nicht Schutz. Ein perfekt geschütztes Produkt, das niemand kauft, bringt nichts → [[Validierung & Go-No-Go]]. Schutzmaßnahmen deshalb nach Aufwand sortieren und nicht vor die Gespräche ziehen (Regel „Erst verkaufen, dann bauen“).

## 6. Priorisierte Maßnahmenliste
| # | Maßnahme | Kosten | Aufwand | Wann | Wer |
|---|---|---|---|---|---|
| 1 | **Vault-Repo auf privat stellen**, Forks/Klone prüfen, Excel mit Regelwerk nur privat | 0 € | 5 Min. | **sofort** | Nutzer |
| 2 | Prüfen, ob `zaehlerschrank-check` und alle Branches privat bleiben (ist privat), keine Regelwerk-Kopien in öffentlichen Repos/Artifacts/Canva | 0 € | 15 Min. | sofort | Nutzer |
| 3 | Demo-Artifact/Landingpage: kein volles Regelwerk zeigen (Demo enthält Beispieldaten; trotzdem prüfen) | 0 € | 15 Min. | vor Livegang | Nutzer / Nachtschicht |
| 4 | Arbeitsvertrag lesen, Fragen aus 4 an Anwalt/Steuerberater, ggf. schriftliche Freigabe des Arbeitgebers | Erstberatung ca. 0–250 € (⚖ vorher erfragen) | 1–2 Std. + Termin | **vor Livegang und vor dem Mittesten** | Nutzer |
| 5 | **Regelwerk serverseitig** (Edge Function `/bewerten`), Client ohne Regeln | 0 € | 0,5–1 Tag | vor Netlify-Livegang | Nachtschicht (eigene Aufgabe) |
| 6 | Nutzungsbedingungen + Einwilligung beim Login (Entwurf, dann Anwalt) | Entwurf 0 €, Prüfung ca. 200–600 € (⚖ erfragen) | 0,5 Tag + Anwalt | vor Testzugang für Kollegen | Nachtschicht (Entwurf) / Anwalt |
| 7 | Login pro Person statt Zugangscode + Rate-Limit | 0 € (Supabase Free) | 1–2 Tage | vor Testzugang für Kollegen | Nachtschicht (eigene Aufgabe) |
| 8 | NDA-Muster für Tester bereithalten, nur bei Zugang zur App einsetzen | Muster 0 €, Prüfung ⚖ | 1 Std. | bei Bedarf | Nutzer |
| 9 | Marke: kostenlose Recherche (DPMAregister, EUIPO, Domain), danach Anmeldung | Recherche 0 €, Anmeldung ca. 290 € (Stand prüfen) | 1 Std. + Antrag | nach Namensprüfung und ersten Zahlern | Nutzer |
| 10 | Git-Historie als Nachweis sichern (Commits nie umschreiben), Entstehungszeitpunkt dokumentieren | 0 € | – | laufend | – |
| 11 | Patent/Gebrauchsmuster | mehrere tausend € | hoch | **nicht** verfolgen | – |
| 12 | Fotos/Daten aus echten Fällen: Datenschutz-Konzept, Löschfristen | 0 € | 0,5 Tag | vor den ersten 20 Schränken | Nutzer + [[Rechtliches]] |

## Offene Annahmen dieser Notiz
- Sichtbarkeit der Repos laut GitHub-Abfrage 29.10.2026; das Regelwerk-Excel liegt laut Dateiliste im Vault (`Anhänge/`). Ob die Datei im öffentlichen Zweig schon länger liegt, nicht geprüft (Git-Historie / Cache ⚖).
- Gebührenangaben (DPMA, Anwalt) sind Größenordnungen aus dem Gedächtnis, nicht aktuell geprüft.
- Rechtsnormen nur kurz zitiert; ob das Regelwerk im Sinne des GeschGehG ein Geheimnis ist, hängt von Details ab, die ein Anwalt klären muss.
