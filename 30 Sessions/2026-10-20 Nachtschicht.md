---
typ: session
datum: 2026-10-20
---
# Nachtschicht 20.10.2026

**Ziel:** Schutzkonzept „Idee und App vor Diebstahl schützen“ für [[Zählerschrank-Check]] erarbeiten (nur Vault, kein Code geändert, keine Rechtsberatung).

**Ergebnis:**
- Neue Notiz [[Schutz von Idee und App]]: schützbar ist nur Code/Text (Urheberrecht), Name (Marke) und Regelwerk als Geschäftsgeheimnis (nur mit Geheimhaltungsmaßnahmen); Idee, Patent/Gebrauchsmuster praktisch nicht.
- **Technischer Befund bestätigt:** `web/src/regeln.json` und die Auswertung in `regelwerk.ts` liegen im Browser-Bundle. Lösung skizziert: Regelwerk in die Edge Function, App bekommt nur Ergebnis + Fundstelle (Rate-Limit nötig, vollständiger Schutz unmöglich).
- Arbeitgeber-Frage (§ 69b UrhG, Nebentätigkeit, Wettbewerb) als offene Frage für Anwalt markiert.
- In [[Aufgaben]] vier neue Zeilen unter „Als Nächstes“: Arbeitsvertrag lesen, Regelwerk serverseitig (Code, später für eine Nachtschicht), NDA-Entwurf, Urheberrechtsvermerk/LICENSE.
- Kein Code-PR in dieser Nacht (Aufgabe war ausdrücklich nur Vault).

**Annahmen:** Gebühren und Paragrafen aus dem Gedächtnis, nicht live geprüft, deshalb in der Notiz als „nachprüfen“ bzw. „Anwalt“ gekennzeichnet. Die erste „Jetzt“-Aufgabe (5 Gespräche) und alle weiteren brauchen Menschen, Konten oder Zugangsdaten und waren für die Nachtschicht gesperrt.

**Offen (für dich):**
1. Arbeitsvertrag lesen, Fragen aus [[Schutz von Idee und App]] Abschnitt 4 notieren, ggf. Erstberatung buchen.
2. Gespräche mit Kollegen bleiben der Vorrang ([[2026-10-02 Ideen-Check]]); in Gesprächen Ergebnisse nennen, nicht die Regeltabelle zeigen.
3. Entscheiden, ob die Code-Aufgabe „Regelwerk serverseitig“ der nächsten Nachtschicht gegeben wird (sinnvoll vor dem öffentlichen Hosting, nicht vor den Gesprächen).
