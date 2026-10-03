---
typ: entscheidung
datum: 2026-09-29
projekt: "[[Zählerschrank-Check]]"
status: angenommen
---
# ADR-0001: Zählerschrank-App als Validierungswerkzeug

## Kontext
Laut Go/No-Go soll erst validiert werden (20 Fälle, Trefferquote ≥ 85 %), bevor ein MVP entsteht. Bisher ist kein einziger realer Fall erfasst. Die Excel-Mappe ist auf der Baustelle unhandlich, deshalb kommen keine Fälle zusammen.

## Entscheidung
Wir bauen jetzt eine schlanke App. Sie ist **gleichzeitig Produkt-Prototyp und Erfassungswerkzeug** für die Validierung:
1. **Foto** des Zählerschranks → KI (Claude Vision) erkennt, was sichtbar ist: Bauart, Zählerbefestigung, freie Plätze, APZ/RfZ, SPD, Hauptschalter/RCD, RJ45-Buchse, Klemmleiste, Zustand. Jedes Feld kommt mit einer Sicherheitsangabe und ist korrigierbar.
2. **Kurze Rückfragen** zu allem, was man auf dem Foto nicht sieht: geplante Geräte und kW, Netzform, HA-Sicherung, Erdung, Verdrahtungsquerschnitt, Netzbetreiber.
3. **Regelwerk R01–R26 deterministisch** im Code (1:1 aus der Excel), **nicht** von der KI entschieden. Das Ergebnis ist nachvollziehbar, mit Fundstelle je Maßnahme.
4. Jeder Check wird als Fall gespeichert, samt Feld „Deine tatsächliche Entscheidung“. Daraus ergibt sich die Trefferquote automatisch.

## Begründung
- Die KI sieht nur einen Teil der Kriterien. Die Rückfragen sind also Pflicht, sonst liefert die App falsche Sicherheit.
- Ein festes Regelwerk ist haftungs- und erklärbar. Die KI übernimmt nur die Erkennung.
- Die App beschleunigt die Validierung, statt sie zu überspringen. Die Go/No-Go-Kriterien bleiben gültig.

## Konsequenzen
- Die Trefferquote für die Fotoerkennung wird zusätzlich gemessen (KI-Feld vs. korrigiertes Feld).
- Keine Normtexte in die App übernehmen, nur Fundstellen (Urheberrecht).
