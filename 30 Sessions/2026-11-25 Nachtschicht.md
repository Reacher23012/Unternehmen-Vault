---
typ: session
datum: 2026-11-25
---
# 2026-11-25 Nachtschicht

**Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ als Wissensnotiz schreiben (nur Vault, kein Code geändert).

**Ergebnis:**
- Neue Notiz [[Schutz von Idee und App]]: Was ist schützbar (Idee nein, Code/Texte per Urheberrecht, Name per Marke, Regelwerk nur mit Geheimhaltungsmaßnahmen), Verträge, Arbeitgeber-Frage, Schutz durch Tempo, priorisierte Maßnahmenliste.
- **Technischer Befund:** Das komplette Regelwerk (`regeln.json` + Logik in `regelwerk.ts`) steckt im Browser-Bundle und ist von jedem lesbar, der die App öffnet. Der Zugangscode schützt nur die Foto-Analyse. Risiko klein, solange die App nicht öffentlich ist, hoch ab Netlify-Livegang.
- 4 neue Aufgaben unter „Als Nächstes“ in [[Aufgaben]], darunter die eigene Code-Aufgabe „Regelwerk serverseitig“ für eine spätere Nachtschicht.
- Code-Repo: nichts geändert, daher kein Code-PR. Vault-PR: siehe Pull-Request-Link in der Zusammenfassung. Die Aufgabe ist erst nach dem Merge abzuhaken.

**Annahmen:** Keine Internetrecherche (Kosten/Paragrafen aus allgemeinem Wissen, mit ⚖️ markiert). Repo als privat angenommen.

**Offen (für dich):**
1. PR prüfen und mergen, dann Aufgabe in [[Aufgaben]] abhaken.
2. Arbeitsvertrag lesen und Anwalt zur Arbeitgeber-Frage fragen.
3. Bis zur serverseitigen Auswertung die App nicht öffentlich auf Netlify stellen; Tester nur nach Absprache.
4. Weiter mit Priorität: die Gespräche ([[Validierung & Go-No-Go]]).
