---
typ: entscheidung
status: angenommen
datum: 2026-09-29
projekt: "[[Zählerschrank-Check]]"
---
# ADR-0004: Backend Supabase Frankfurt, Hosting Netlify

## Kontext
- Die App braucht ein Backend, das den Claude-API-Schlüssel geheim hält und Fälle, Fotos und die Warteliste speichert.
- Erste Version nur für einen Nutzer; kein eigenes Server-Wissen/-Budget nötig.
- claude.ai-Artifacts taugen nur als private Vorschau: dort können sich nur freigeschaltete claude.ai-Nutzer eintragen, und Anfragen an eigene Server sind blockiert ([[Artifacts eignen sich nicht für öffentliche Formulare]]).
- Supabase-Konto war schon verbunden; Region „Kreis Soest“ gibt es nicht, Frankfurt ist das nächste Rechenzentrum.

## Entscheidung
Backend auf Supabase (Projekt `zaehlerschrank-check`, Frankfurt, kostenloser Tarif): eine Edge Function `api` für Fotoanalyse, Fälle und Warteliste; Zugriff auf Daten nur über die Funktion (RLS ohne Policies), Zugangscode statt Login. Web-App und Landingpage werden als statische Seiten bei Netlify gehostet (Konto legt der Nutzer selbst an). Die Warteliste liegt in Supabase, nicht in einem Artifact.

## Folgen
- ✅ 0 € Grundkosten, Daten in Deutschland, kein eigener Server.
- ✅ Schlüssel bleiben serverseitig; Fotos als Grundlage, um die Erkennung zu messen.
- ⚠️ Zugangscode ist ein einfacher Schutz – reicht für einen Nutzer, vor Kollegen-Test Login nachrüsten.
- ⚠️ Netlify ist ein US-Anbieter → in der Datenschutzerklärung benennen, AV-Vertrag abschließen.
- ⚠️ Free Tier pausiert Projekte nach längerer Inaktivität – bei Pausen im Dashboard wieder starten.

Siehe [[App & Technik]], [[Landingpage & Warteliste]].
