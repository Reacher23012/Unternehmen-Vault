#!/usr/bin/env node
// SessionStart-Hook: gibt Claude den aktuellen Stand aus dem Obsidian-Vault mit.
// Ausgabe auf stdout landet im Kontext der Sitzung. Läuft unter Windows, macOS und Linux
// und darf den Start nie blockieren.
const fs = require('fs');
const path = require('path');

try {
    const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
    const v = fs.existsSync(path.join(root, 'vault', 'Aufgaben.md')) ? path.join(root, 'vault') : root;
    const lies = p => { try { return fs.readFileSync(p, 'utf8'); } catch { return ''; } };
    const abschnitt = (text, titel) => {
        const out = [];
        let an = false;
        for (const z of text.split(/\r?\n/)) {
            if (/^##\s/.test(z)) { an = z.replace(/^##\s+/, '').trim() === titel; continue; }
            if (an && z.trim() && !/^\s*[-*]\s+\[ \]\s*$/.test(z)) out.push(z);
        }
        return out;
    };

    const aufgaben = lies(path.join(v, 'Aufgaben.md'));
    if (!aufgaben) process.exit(0);
    const out = [`## Vault-Stand (${path.relative(root, v) || '.'}, Obsidian)`, '', '### Aufgaben – Jetzt', ...abschnitt(aufgaben, 'Jetzt')];

    const sdir = path.join(v, '30 Sessions');
    const letzte = (fs.existsSync(sdir) ? fs.readdirSync(sdir) : []).filter(n => n.endsWith('.md')).sort().pop();
    if (letzte) out.push('', `### Letzte Sitzung: ${letzte.replace(/\.md$/, '')}`, ...abschnitt(lies(path.join(sdir, letzte)), 'Offen'));

    const idir = path.join(v, '00 Inbox');
    const n = (fs.existsSync(idir) ? fs.readdirSync(idir) : []).filter(f => f !== 'README.md' && !f.startsWith('.')).length;
    out.push('', n ? `### Inbox: ${n} ungelesene Einträge → /inbox vorschlagen` : '### Inbox: leer');
    console.log(out.join('\n'));
} catch { }
