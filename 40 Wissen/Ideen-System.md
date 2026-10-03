---
typ: wissen
thema: methode
erstellt: 2026-10-03
---
# Ideen-System – mit KI-Ideen Geld verdienen

Das Ziel ist **nicht**, möglichst viele Ideen zu bauen. Es geht darum, schnell herauszufinden, **welche Idee Geld bringt**, und die übrigen früh zu stoppen.

## Der Ablauf
```
Einfall ──► Prüfen ──► Validierung ──► MVP ──► Betrieb
 (Inbox)    (Score)    (Experimente)   (1. Euro) (wiederkehrend)
                 └──────────► Verworfen (mit Grund, bleibt stehen)
```

| Phase | Frage | Fertig, wenn … | Werkzeug |
|---|---|---|---|
| **Einfall** | Ist das überhaupt eine Idee? | Notiz aus [[Idee]] existiert | `/idee` |
| **Prüfen** | Lohnt sich das Nachdenken? | Score ausgefüllt, ≥ 18 Punkte | `/idee`, [[Geldmodelle für KI-Ideen]] |
| **Validierung** | Zahlt jemand dafür? | Go/No-Go-Kriterien gemessen | [[Experiment]]-Notizen |
| **MVP** | Kann ich es liefern? | **erster zahlender Kunde** | Code-Ordner, ADRs |
| **Betrieb** | Trägt es sich? | wiederkehrender Umsatz | Wochenrückblick |

## Regeln
1. **Erst verkaufen, dann bauen.** Vor dem ersten Code muss es mindestens ein Signal geben, dass jemand zahlen würde: Gespräche, Vorbestellung, Warteliste.
2. **Höchstens 1 Idee in Validierung/MVP gleichzeitig.** Alle anderen bleiben in „Prüfen“ geparkt. Neue Einfälle gehen in die Inbox, nicht ins Bauen.
3. **Jede Woche ein Experiment.** Klein, mit Datum, mit Erfolgskriterium vorher. Ein Ergebnis zählt nur, wenn es in der Experiment-Notiz steht.
4. **KI ist Werkzeug, nicht Produkt.** Verkauft wird ein Ergebnis für eine Nische („Zählerschrank in 2 Minuten eingeordnet“), nicht „ein KI-Tool“. Sonst bist du ein austauschbarer ChatGPT-Aufsatz.
5. **KI-Kosten pro Kunde ausrechnen.** API-Kosten pro Nutzung × Nutzungen pro Monat müssen deutlich unter dem Preis liegen.
6. **Verwerfen ist ein Erfolg.** Verworfene Ideen bekommen `phase: verworfen` und einen Grund. Sie werden nicht gelöscht.
7. **Fallback mitdenken.** Fast jede Wissens-Idee lässt sich ohne App zu Geld machen, etwa als Checkliste, Schulung oder Dienstleistung. Das ist oft der schnellste erste Euro.

## Score (Prüfen)
Jedes Kriterium 1–5 Punkte, max. 25. **Ohne Beleg höchstens 3 Punkte**, und die Bewertung gilt dann als „vorläufig“.

| Kriterium | 1 Punkt | 5 Punkte |
|---|---|---|
| **Schmerz** | „wäre nett“ | kostet die Zielgruppe jede Woche Zeit oder Geld |
| **Zahlungsbereitschaft** | niemand zahlt heute dafür | sie zahlen schon für eine schlechtere Lösung |
| **Zugang** | ich kenne niemanden aus der Zielgruppe | ich erreiche 20 Leute diese Woche persönlich |
| **Vorsprung** | jeder mit ChatGPT kann das | eigenes Fachwissen, Regelwerk, Daten oder Netzwerk → [[Mein Vorteil]] |
| **Weg zum ersten Euro** | Monate, viel Code, rechtliche Hürden | unter 2 Wochen, ohne Code |

**≥ 18 → Validierung** (wenn der Platz frei ist, sonst Warteschlange) · **13–17 → parken** · **≤ 12 → verwerfen**

## Wochenrückblick (20 Minuten, z. B. sonntags)
`/wochenrueckblick` → Notiz in `50 Briefings/` nach [[Wochenrückblick]]:
Inbox leeren → Experiment der Woche auswerten → Pipeline-Zeilen aktualisieren → **ein** Experiment für nächste Woche festlegen.
