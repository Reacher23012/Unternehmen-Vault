---
typ: entscheidung
status: angenommen
datum: 2026-10-03
projekt: "[[Zählerschrank-Check]]"
---
# ADR-0005: Direktansprache vor Instagram

## Kontext
- [[ADR-0002 Marketing zuerst über Instagram]] setzt allein auf Instagram, andere Kanäle sind nur Plan B.
- Neue Fakten seit dem 29.09.: Der [[2026-10-02 Ideen-Check]] zeigt, dass noch nichts gemessen wurde. Instagram hängt an fünf Infrastruktur-Aufgaben (Projekt-E-Mail, Rechtstexte, Netlify, Warteliste einspielen, Konto). Ein neues Konto ohne Follower bringt wenig Reichweite, deshalb sind 100 Einträge in 4 Wochen über Instagram allein unwahrscheinlich.
- Der eigene Vorteil ist der direkte Zugang zu Kollegen im Elektrohandwerk → [[Mein Vorteil]].

## Entscheidung
Das Marketing läuft in zwei Phasen:
1. **Ab sofort Direktansprache, ohne Infrastruktur:** Gespräche mit Kollegen ([[Gesprächsleitfaden]]), Flyer an der Theke beim Großhändler, Innung Kreis Soest, Elektriker-Gruppen in WhatsApp und Facebook. Die Kontaktaufnahme läuft vorerst über WhatsApp, weil die Landingpage noch nicht online ist und die Demo als claude.ai-Artifact für Fremde nicht erreichbar ist ([[Artifacts eignen sich nicht für öffentliche Formulare]]).
2. **Sobald die Landingpage live ist: Instagram nach ADR-0002.** Instagram verstärkt dann die Direktansprache.

Jeder Kanal bekommt eine eigene Quelle in der Warteliste (`?quelle=…`), damit sichtbar wird, was wirkt.

## Folgen
- ✅ Daten für Go/No-Go ab dieser Woche statt nach dem Infrastruktur-Aufbau.
- ✅ Die vorhandenen Canva-Posts lassen sich in Gruppen wiederverwenden.
- ⚠️ Kostet persönliche Zeit (Gespräche, Großhändler-Besuche).
- ⚠️ WhatsApp-Kontakte landen nicht automatisch in der Warteliste und müssen in [[Direktansprache]] von Hand erfasst werden.
- ADR-0002 bleibt gültig, gilt aber als Phase 2.
