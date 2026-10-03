---
typ: wissen
stand: 2026-09-29
---
# claude.ai-Artifacts eignen sich nicht für öffentliche Formulare

Artifacts (Seiten, die Claude auf claude.ai veröffentlicht) sind privat und eignen sich gut als **Vorschau** oder **Demo zum Vorzeigen** (z. B. die Zählerschrank-Demo auf dem Handy).

Für alles Öffentliche taugen sie nicht:
- Nur wer ein claude.ai-Konto hat und freigeschaltet ist, kann Daten eintragen. Kunden/Betriebe haben das nicht.
- Anfragen an eigene Server (z. B. Supabase) sind aus einem Artifact heraus blockiert.
- Downloads, Kamera und Mail-Links funktionieren nur eingeschränkt.

**Deshalb:** Öffentliche Seiten (Landingpage, Warteliste, später die App) als eigene Website hosten (Netlify) und Daten in Supabase speichern → [[ADR-0004 Backend Supabase Frankfurt, Hosting Netlify]].
