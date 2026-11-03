---
typ: session
datum: 2026-11-03
---
# Nachtschicht 2026-11-03

**Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ als Wissensnotiz für [[Zählerschrank-Check]] schreiben (nur Vault, kein Code geändert).

**Ergebnis:** Neue Notiz [[Schutz von Idee und App]] mit allen sechs geforderten Punkten. PR (Vault): PRLINK. Kein Code-PR, weil die Aufgabe ausdrücklich nur den Vault betraf.
- Kernbefund: `regeln.json` und die komplette Auswertung (`regelwerk.ts`) stecken im App-Bundle und werden bei Netlify-Livegang öffentlich ausgeliefert; der Zugangscode schützt nur die API. Lösungsskizze: Auswertung in die Edge Function (`POST /bewerte`), Grenzen (Abtasten über die API, Offline-Verhalten) benannt.
- Idee selbst ist nicht schützbar; Patent/Gebrauchsmuster nicht verfolgen; Marke erst nach Signalen; echter Schutz = Tempo, Netzwerk, Daten.
- Arbeitgeber-Frage als offene Frage für Anwalt markiert (§ 69b UrhG, Nebentätigkeit, Wettbewerb, Herkunft der Unterlagen).
- Neue Aufgaben unter „Als Nächstes“ in [[Aufgaben]] angelegt, darunter die Code-Zeile „Regelwerk serverseitig“ für eine spätere Nachtschicht.

**Annahmen:** Gesetzesverweise und Gebühren (z. B. DPMA ca. 290 €, Anwalt-Erstberatung) stammen aus dem Modellwissen, nicht aus Live-Recherche → vor Verwendung prüfen. Blockiert für die Nachtschicht, weil nur der Nutzer es kann: Gespräche mit Kollegen, API-Schlüssel/`APP_CODE`, WhatsApp, Domain, Netlify, Rechtstexte.

**Offen (für dich):**
1. PR mergen, dann `git pull`.
2. **Arbeitsvertrag lesen** (Abschnitt 4 der Notiz), das entscheidet über alles Weitere.
3. Vor dem Netlify-Livegang die Aufgabe „Regelwerk serverseitig“ umsetzen lassen (nächste Nachtschicht kann das, reine Code-Arbeit); Offline-Verhalten bewusst entscheiden.
4. Demo-Artifact nicht weitergeben.
5. Die 5 Gespräche mit Kollegen bleiben weiter der wichtigste Schritt ([[Validierung & Go-No-Go]]).
