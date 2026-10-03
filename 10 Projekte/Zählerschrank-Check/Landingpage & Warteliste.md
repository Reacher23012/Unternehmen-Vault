---
typ: wissen
projekt: "[[Zählerschrank-Check]]"
stand: 2026-09-29
---
# Landingpage & Warteliste

**Zweck:** „Link in Bio“ für [[Instagram]] und Messung des Go/No-Go-Kriteriums „100 Wartelisten-Einträge in 4 Wochen“ → [[Validierung & Go-No-Go]].

- **Vorschau (privat, Formular speichert nichts):** https://claude.ai/artifact/4mLRzhuYq5q6RTHSmMRPKu
- **Code:** `C:/Users/Jarvis/zaehlerschrank-check/landing/` – `seite.html` (Inhalt), `impressum.html`, `datenschutz.html`, `bauen.mjs` → `npm run build` → `dist/` (öffentlich) + `dist/vorschau.html` (Artifact)
- **Status:** gebaut, **noch nicht öffentlich**

## Inhalt
- Hero: „Foto vom Zählerschrank. Maßnahmen nach TAB.“ + Handy mit echtem Ergebnis (Nachrüsten, R04/R06/R15/R22 mit Fundstellen)
- Warum: §14a EnWG · TAB je Netzbetreiber · Bestand vor Ort
- So funktioniert es: Fotografieren → Angaben prüfen → Maßnahmen sehen
- Was geprüft wird: 26 Regeln, belegt mit TAB/BDEW; „Die Entscheidung trifft ein festes Regelwerk, nicht die KI.“
- Warteliste, FAQ (ersetzt keine Prüfung vor Ort; nur Westnetz?; Kosten; Fotos gehen zur Auswertung an Anthropic)
- Gestaltung: Gehäusegrau RAL 7035, Aderfarben-Streifen (L1 braun, L2 schwarz, L3 grau, N blau, PE grün-gelb), Signalgelb nur für die Anmeldung; Schriften Barlow Condensed + IBM Plex, **selbst gehostet**

## Warteliste – abgefragte Felder
Betrieb, Name, E-Mail, PLZ (optional), Netzbetreiber (Westnetz / Stadtwerke-anderer / weiß nicht), Zählerschrank-Prüfungen pro Monat (0–2 / 3–10 / über 10), „würde als Pilotbetrieb mittesten“, „~30 €/Monat wären okay“, Einwilligung (Pflicht), Quelle = instagram.
Speicherung: Supabase-Tabelle `warteliste` (Frankfurt), Doppel-Anmeldung aktualisiert statt Fehler, Honeypot gegen Bots.

## Bis zum Livegang
- [ ] Projekt-E-Mail-Adresse anlegen (Vorschlag: eigene Domain, z. B. zaehlerschrank-check.de, falls frei) → in Impressum/Datenschutz eintragen
- [ ] Rechtstexte prüfen lassen → [[Rechtliches]]
- [ ] Netlify-Konto (selbst anlegen), dann Deploy von `landing/dist/`
- [ ] Migration `warteliste` einspielen + Edge Function mit Warteliste-Route deployen
- [ ] Testeintrag, dann Link in die Instagram-Bio
- Später: Double-Opt-in-Mail (empfohlen, sobald Mailversand steht)

## Warum keine Warteliste als claude.ai-Artifact
In ein Artifact kann sich nur eintragen, wer ein claude.ai-Konto hat und freigeschaltet ist – Elektrobetriebe haben das nicht. Siehe [[Artifacts eignen sich nicht für öffentliche Formulare]].
