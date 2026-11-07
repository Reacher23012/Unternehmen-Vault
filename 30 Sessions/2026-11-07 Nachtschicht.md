---
typ: session
datum: 2026-11-07
---
# Nachtschicht 2026-11-07

**Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ als Wissensnotiz erarbeiten (nur Vault, kein Code geändert).

**Ergebnis:** [[Schutz von Idee und App]] geschrieben – PR: PR_VAULT
- Schützbar sind Code (Urheberrecht), Name (Marke) und Geheimnisse; die Idee selbst nicht.
- **Technischer Befund:** `web/src/regeln.json` und die Auswertung `regelwerk.ts` stecken im öffentlichen App-Bundle (und im Demo-Artifact). Die Edge Function enthält keine Regeln. Risiko heute niedrig bis mittel (App nicht online), wird mit dem Livegang relevant. Lösungsskizze: Auswertung in die Edge Function (`POST /bewerten`), Nachteil: kein Offline-Betrieb.
- Geheimnisschutz nach GeschGehG setzt „angemessene Geheimhaltungsmaßnahmen“ voraus; Reverse Engineering ist ohne Vertragsverbot erlaubt. Daher NDA + Nutzungsbedingungen + Login.
- Der härteste Schutz sind Tempo, Netzwerk und echte Falldaten.
- Neue Aufgaben in [[Aufgaben]] unter „Als Nächstes“ (Arbeitgeber-Frage, NDA/Nutzungsbedingungen-Entwurf, Code „Regelwerk serverseitig“).
- Annahmen: Die Anstellungssituation ist unbekannt, daher als offene Anwaltsfrage geführt. Gebühren sind Größenordnungen aus meinem Kenntnisstand (🔶 prüfen).
- Nicht gewählt: Aufgabe „5 Gespräche mit Kollegen“ (braucht echte Gespräche) und alle Aufgaben mit Konten, Schlüsseln oder Veröffentlichung.

**Offen (für dich):**
1. PR prüfen und mergen, dann Aufgabe in [[Aufgaben]] abhaken.
2. **Arbeitsvertrag lesen** (Nebentätigkeit, Rechte an Arbeitsergebnissen, Wettbewerb) und bei Unsicherheit Fachanwalt fragen – das ist die wichtigste offene Frage.
3. Vorrang haben weiter die Gespräche mit Kollegen → [[Gesprächsleitfaden]]; Schutz-Umbau erst vor dem Livegang.
4. Fragenliste am Ende der Notiz zum Anwalt mitnehmen.

Projekt: [[Zählerschrank-Check]]
