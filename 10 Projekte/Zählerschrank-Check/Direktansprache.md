---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-10-03
---
# Direktansprache (Marketing Phase 1)

Ab sofort, ohne Landingpage → [[ADR-0005 Direktansprache vor Instagram]]. Ziel: Gespräche und Pilotbetriebe für [[Validierung & Go-No-Go]].

## Kanäle
| Kanal | Was | Stand |
|---|---|---|
| Eigene Kollegen | Gespräche nach [[Gesprächsleitfaden]], am Ende „Kennst du noch jemanden?“ | 0 / 5 bis 09.10. |
| Großhändler-Theke | Flyer A5 auslegen, Mitarbeiter an der Theke kurz einweihen | Flyer fertig (mit Nummer + QR), QR vor dem Druck testen |
| Innung Kreis Soest | 5 Minuten in der Versammlung oder Hinweis im Rundschreiben | noch anfragen |
| Handwerkskammern Dortmund + Südwestfalen | E-Mail mit Flyer → [[Anschreiben Handwerkskammern]] | Entwurf fertig, Platzhalter offen |
| WhatsApp-/Facebook-Gruppen | Text unten, gern zusammen mit dem Rätsel-Post aus [[Instagram]] | — |

## Flyer A5
- PDF: `Anhänge/Zaehlerklar-Flyer-A5.pdf` · Quelle: `zaehlerschrank-check/marketing/flyer-a5.html`
- Texte 1:1 aus der Vorgabe, nichts dazuerfunden. Canva-KI hat in zwei Entwürfen u. a. „Maßgeblich ist immer das feste Regelwerk“ (falsch, maßgeblich ist die TAB), Unsinnstext und einen **echt aussehenden QR-Code mit Fantasienummer** eingebaut. Deshalb ist der Flyer als eigene Druckvorlage gebaut → [[Canva-KI-Texte immer gegenlesen]].
- **Vor dem Druck:** QR-Code mit dem Handy testen, Name prüfen ([[ADR-0006 Produktname Zählerklar]]).

## Texte

### Persönlich an einen Kollegen
> Moin [Name], kurze Frage: Wie oft musst du gerade Zählerschränke wegen Wallbox, Wärmepumpe oder PV beurteilen – und wie lange dauert das bei dir?
> Ich bastle an einem kleinen Werkzeug dafür und will erst mal verstehen, wie andere das machen. Hast du diese Woche 10 Minuten zum Telefonieren?

### In eine Elektriker-Gruppe
> Moin zusammen, Frage an die Kollegen im Westnetz-Gebiet: Wie beurteilt ihr bei Wallbox/WP/PV, ob der Zählerschrank bleiben darf? Erfahrung, TAB-PDF, Anruf beim Netzbetreiber?
> Ich baue gerade **Zählerklar**: Foto vom Zählerschrank → du bestätigst die Angaben → ein festes Regelwerk nach TAB sagt weiterverwendbar, nachrüsten oder austauschen, mit Fundstelle. Die Entscheidung trifft das Regelwerk, nicht die KI.
> Ich suche ein paar Betriebe, die 4 Wochen kostenlos mittesten und mir sagen, ob das Ergebnis stimmt. Bei Interesse kurz per PN melden.

### Zum Rätsel-Post (Bild aus [[Instagram]], Post 1)
> Wallbox 11 kW geplant, Westnetz. Darf dieser Zählerschrank bleiben – oder muss er raus? Tipp in die Kommentare, Auflösung kommt heute Abend. 👇

## WhatsApp Business
Nummer 0151 68837070 (Flyer-QR: wa.me mit Text „…Flyer gesehen…“). Anfragen hier in den Chat kopieren oder Chat exportieren → Claude trägt sie in die Kontaktliste ein und entwirft Antworten. Cloud API erst, wenn das nicht mehr reicht.

### Profil
- **Name:** Zählerklar
- **Kategorie:** Software / IT-Dienstleistungen
- **Beschreibung:** Zählerschrank fotografieren, Maßnahmen nach TAB sehen: weiterverwendbar, nachrüsten oder austauschen – mit Fundstelle. Für Elektrobetriebe, Pilot im Westnetz-Gebiet. Die Entscheidung trifft ein festes Regelwerk, nicht die KI.

### Begrüßungsnachricht (bei erster Nachricht)
> Moin und danke fürs Melden! 👋 Hier ist Zählerklar – ein Werkzeug für Elektrobetriebe, das bei Wallbox, Wärmepumpe und PV sagt, ob der Zählerschrank bleiben darf.
> Ich melde mich persönlich, meist am selben Tag. Damit ich dir gleich passend antworten kann: Von welchem Betrieb bist du, und mit welchem Netzbetreiber hast du meistens zu tun?

### Abwesenheitsnachricht (außerhalb der Geschäftszeiten)
> Danke für deine Nachricht! Ich bin gerade auf der Baustelle und melde mich so schnell wie möglich – spätestens am nächsten Werktag.

### Schnellantworten
| Kürzel | Text |
|---|---|
| `/info` | Kurz erklärt: Du machst bis zu 4 Fotos vom Zählerschrank. Die KI schlägt die Merkmale vor (Bauart, RfZ, SPD usw.), du bestätigst oder korrigierst. Dann sagt ein festes Regelwerk mit 26 Regeln nach TAB: weiterverwendbar, nachrüsten oder austauschen – jeweils mit Fundstelle. Die Entscheidung trifft das Regelwerk, nicht die KI. |
| `/fragen` | Damit ich einschätzen kann, ob Zählerklar zu euch passt, drei kurze Fragen: 1) Wie viele Zählerschränke beurteilt ihr im Monat wegen Wallbox, WP oder PV? 2) Wie macht ihr das heute, und wie lange dauert es? 3) Welcher Netzbetreiber? |
| `/telefon` | Hast du diese Woche 10 Minuten zum Telefonieren? Mir geht es vor allem darum, wie ihr das heute macht. Schlag gern eine Zeit vor, dann rufe ich an. |
| `/mittesten` | Mittesten heißt: Du bekommst die App kostenlos für 4 Wochen, prüfst damit 2–3 echte Schränke und sagst mir, ob das Ergebnis zu deiner Entscheidung passt. Keine Kosten, kein Abo. Hast du Lust? |
| `/preis` | Für die Pilotbetriebe ist es kostenlos. Später sind etwa 30 € im Monat geplant – genau dazu frage ich gerade: Wäre dir das die Zeitersparnis wert? |
| `/netzbetreiber` | Das Regelwerk ist im Moment auf die TAB von Westnetz ausgelegt. Andere Netzbetreiber kommen, wenn der Pilot klappt. Ein Gespräch hilft mir trotzdem sehr – wie läuft es bei euch? |
| `/danke` | Danke dir, das hilft mir sehr! Ich melde mich, sobald es weitergeht. Kennst du noch jemanden, für den das interessant sein könnte? |

### Labels
Neu · Gespräch vereinbart · Pilot · Kein Interesse · Nicht Westnetz

## Kontakte (ohne Telefonnummern/Adressen)
| Datum | Kanal | Betrieb | Ergebnis (Gespräch / mittesten / kein Interesse) |
|---|---|---|---|
| | | | |
