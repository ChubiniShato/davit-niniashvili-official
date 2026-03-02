/**
 * Typography Guard — prevents arbitrary typography utilities from creeping back.
 *
 * Scans frontend/src for:
 *   - text-[<digit>   (arbitrary font-size like text-[20px])
 *   - tracking-[      (arbitrary letter-spacing)
 *   - leading-[       (arbitrary line-height)
 *
 * Allowed:
 *   - text-[var(      (CSS variable color utilities)
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SRC_DIR = join(__dirname, '..', 'src');
const EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx', '.css']);

// Patterns that indicate arbitrary typography (not allowed)
const FORBIDDEN = [
    { regex: /text-\[\d/g, label: 'text-[<digit>  (arbitrary font-size)' },
    { regex: /tracking-\[/g, label: 'tracking-[     (arbitrary letter-spacing)' },
    { regex: /leading-\[/g, label: 'leading-[      (arbitrary line-height)' },
];

// Patterns that are explicitly allowed (checked before forbidden)
const ALLOWED = [
    /text-\[var\(/,  // e.g. text-[var(--brand-yellow)]
];

function collectFiles(dir) {
    const results = [];
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        const stat = statSync(full);
        if (stat.isDirectory()) {
            results.push(...collectFiles(full));
        } else if (EXTENSIONS.has(extname(entry))) {
            results.push(full);
        }
    }
    return results;
}

function isAllowedLine(line) {
    // If the only text-[ matches are text-[var(, allow the line
    // Remove all allowed patterns and re-check
    let cleaned = line;
    for (const allow of ALLOWED) {
        cleaned = cleaned.replace(allow, '');
    }
    return cleaned;
}

let violations = 0;

for (const file of collectFiles(SRC_DIR)) {
    const content = readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // Clean allowed patterns before checking forbidden ones
        const cleaned = isAllowedLine(line);

        for (const { regex, label } of FORBIDDEN) {
            regex.lastIndex = 0; // reset global regex
            if (regex.test(cleaned)) {
                const rel = relative(join(__dirname, '..'), file);
                console.error(`  ✗ ${rel}:${i + 1}  →  ${label}`);
                console.error(`    ${line.trim()}`);
                console.error('');
                violations++;
            }
        }
    }
}

if (violations > 0) {
    console.error(`\n✗ Typography guard failed: ${violations} violation(s) found.`);
    console.error('  Use Tailwind tokens (tracking-*, text-*) instead of arbitrary values.');
    process.exit(1);
} else {
    console.log('✓ Typography guard passed — no arbitrary typography found.');
    process.exit(0);
}
