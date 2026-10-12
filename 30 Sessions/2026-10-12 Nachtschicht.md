---
typ: session
datum: 2026-10-12
---
# 2026-10-12 Nachtschicht

**Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ als Wissensnotiz erstellen (nur Vault, kein Code geändert).

**Ergebnis:**
- Neue Notiz [[Schutz von Idee und App]]: Was schützbar ist (Idee nein, Code ja, Name per Marke, Regelwerk nur als Geschäftsgeheimnis), Verträge, Arbeitgeber-Frage, Schutz durch Tempo, priorisierte Maßnahmenliste mit Kosten.
- **Technischer Befund bestätigt:** `web/src/regelwerk.ts` importiert `regeln.json`, `main.ts` wertet im Browser aus. Das ganze Regelwerk liegt also im Bundle. Lösung skizziert (Auswertung in die Edge Function).
- Neue Aufgaben unter „Als Nächstes“ in [[Aufgaben]], darunter „Regelwerk serverseitig“ als eigene Code-Zeile. [[Zählerschrank-Check]] ergänzt.
- Kein Code-PR (Auftrag war reine Analyse). Vault-PR: https://github.com/Reacher23012/Unternehmen-Vault/pull/10
- Annahmen: Kosten und Rechtsangaben aus dem Gedächtnis, deshalb mit ⚖️ markiert und nicht belegt. Keine Rechtsberatung.

**Offen (für dich):**
1. Vault-PR prüfen und mergen, erst danach die Schutz-Aufgabe in [[Aufgaben]] abhaken.
2. Arbeitsvertrag lesen (Nebentätigkeit, Wettbewerb, Rechte an Entwicklungen) und Erstberatung beim Anwalt einplanen.
3. Die Gespräche mit Kollegen haben weiter Vorrang vor Schutz-Infrastruktur ([[Validierung & Go-No-Go]]).
4. Entscheiden, wann „Regelwerk serverseitig“ drankommt (Empfehlung: nach den ersten Gesprächen, vor dem Mittesten durch Fremde).
