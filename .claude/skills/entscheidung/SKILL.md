---
name: entscheidung
description: Hält eine Architektur- oder Produktentscheidung als ADR in 20 Entscheidungen fest. Nutzen bei /entscheidung oder wenn in einer Sitzung eine Grundsatzfrage geklärt wurde (Geld, Werkzeuge, Prioritäten, was bewusst NICHT gemacht wird).
---
# Entscheidung festhalten

Thema: `$ARGUMENTS`

1. Nächste freie Nummer in `20 Entscheidungen/` ermitteln (`ADR-0002`, `ADR-0003` …).
2. Datei `ADR-XXXX <Kurztitel>.md` nach `90 Vorlagen/Entscheidung.md` anlegen: Kontext (Fakten, Zwänge), Entscheidung (ein Absatz, eindeutig), Folgen (✅ Vorteile, ⚠️ Kosten/Risiken).
3. Status `angenommen` nur, wenn der Nutzer zugestimmt hat, sonst `vorgeschlagen`.
4. Ersetzt sie eine ältere ADR: dort `status: ersetzt durch [[ADR-XXXX …]]` setzen.
5. Betroffene Notizen (z. B. Projektnotizen) verlinken bzw. anpassen.
