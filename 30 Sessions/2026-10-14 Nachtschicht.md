---
typ: session
datum: 2026-10-14
---
# Nachtschicht 14.10.2026

**Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ für [[Zählerschrank-Check]] als Wissensnotiz erarbeiten (nur Vault, kein Code geändert).

**Ergebnis:**
- Neue Notiz [[Schutz von Idee und App]] mit den Abschnitten schützbare Güter, technischer Befund, Verträge, Arbeitgeber-Frage, Tempo-Schutz und priorisierter Maßnahmenliste.
- **Befund im Code:** `web/src/regeln.json` und die komplette Prüflogik in `regelwerk.ts` gehören zum Browser-Bundle; die Edge Function nutzt sie nicht. Wer die App öffnen kann, kann das Regelwerk kopieren.
- [[Aufgaben]]: 3 neue Zeilen unter „Als Nächstes“ (Regelwerk serverseitig als Code-Aufgabe, Arbeitsvertrag/Anwalt, Tester-Vereinbarung); Login-Aufgabe präzisiert; Schutzkonzept-Aufgabe mit „PR offen“ markiert, nicht abgehakt.
- Vault-PR: VAULT_PR_LINK. Ein Code-PR gab es bewusst nicht.

**Annahmen:** Keine Rechtsberatung; Gebührenangaben (DPMA, Anwalt) sind grobe Schätzungen aus dem Gedächtnis und vor Nutzung zu prüfen. Dass der Nutzer angestellt ist, ist aus [[Mein Vorteil]] abgeleitet, nicht bestätigt.

**Offen:**
1. PR mergen, danach „Schutzkonzept“ in [[Aufgaben]] abhaken.
2. Entscheiden, ob die Code-Aufgabe „Regelwerk serverseitig“ die nächste Nachtschicht bekommt (Vorrang bleiben die Gespräche, siehe [[Validierung & Go-No-Go]]).
3. Arbeitsvertrag lesen, Anwaltstermin für Arbeitgeber-Frage, Tester-Vereinbarung prüfen lassen.
4. Bis dahin: App nicht öffentlich ohne Zugang schalten.
