---
name: log
description: Schreibt das Sitzungsprotokoll nach 30 Sessions und führt Aufgaben und Projektnotizen nach. Nutzen bei /log und am Ende jeder Sitzung mit Ergebnis.
---
# Sitzung protokollieren

1. Datei `30 Sessions/<YYYY-MM-DD> <Kurztitel>.md` nach `90 Vorlagen/Session.md` anlegen.
   - **Ziel**: ein Satz. **Ergebnis**: was entstanden ist, mit Links. **Erkenntnisse**: nur Dauerhaftes – zusätzlich nach `40 Wissen/`.
   - **Offen**: konkrete nächste Schritte. Diese liest der Start-Hook beim nächsten Mal.
2. `Aufgaben.md`: Erledigtes mit Datum nach **Erledigt**, Neues einsortieren.
3. Betroffene Projektnotiz in `10 Projekte/` aktualisieren (Stand, nächster Schritt).
4. Ist der Vault ein Git-Repository: Änderungen committen (`git add -A && git commit -m "Sitzung: <Kurztitel>"`), nicht pushen, wenn nicht erlaubt.
