---
typ: session
datum: 2026-11-11
---
# Nachtschicht 2026-11-11

**Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ für [[Zählerschrank-Check]] schreiben (nur Vault, kein Code geändert).

**Ergebnis:** https://github.com/Reacher23012/Unternehmen-Vault/pull/38
- Neue Notiz [[Schutz von Idee und App]]: Schutzmöglichkeiten in Deutschland, technischer Befund, Verträge, Arbeitgeber-Frage, Tempo-Schutz, priorisierte Maßnahmenliste.
- **Befund:** Das gesamte Regelwerk (`regeln.json`, `bewerte()` in `regelwerk.ts`, aufgerufen aus `main.ts`) wird ins App-Bundle gebaut und läuft im Browser. Nach Livegang wäre es für jeden lesbar. Lösung: Auswertung serverseitig in der Edge Function.
- [[Aufgaben]]: 4 neue Zeilen unter „Als Nächstes“ (u. a. Code-Aufgabe „Regelwerk serverseitig“), Aufgabe selbst mit „PR offen“ markiert, nicht abgehakt.
- Projektnotiz [[Zählerschrank-Check]] ergänzt.

**Annahmen:** Rechtliche Aussagen aus dem Gedächtnis, nicht recherchiert; alles Unsichere ist mit 🔶 „Anwalt prüfen lassen“ markiert. Gebührenhöhen bewusst nicht beziffert. Das Regelwerk-Verlegen wurde nicht vorgezogen, weil es vor der Validierung Infrastruktur wäre (Regel „erst verkaufen, dann bauen“).

**Offen (für dich):**
1. PR prüfen, mergen, dann `git pull` und Aufgabe abhaken.
2. Weiter der Engpass: die 5 Gespräche mit Kollegen (Frist 09.10. ist abgelaufen, im Vault ist kein Ergebnis eingetragen) → [[Gesprächsleitfaden]], [[Validierung & Go-No-Go]].
3. Entscheiden, wann „Regelwerk serverseitig“ + Login kommen (Vorschlag: vor dem Kollegen-Test mit Fremdzugriff).
4. Vor dem Kollegen-Test Arbeitsvertrag prüfen und Erstberatung Arbeitsrecht planen.
