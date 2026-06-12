// Ottimizza le foto delle sedi: resize + compressione + WebP.
// Uso: node scripts/optimize-images.mjs
import { readdir, stat, unlink } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const DIR = fileURLToPath(new URL('../src/assets/locations/', import.meta.url));

// L'hero della Home è verticale (4:5) e più piccolo; le sedi sono orizzontali.
const isHero = (name) => name.startsWith('hero-home');

const run = async () => {
  const files = (await readdir(DIR)).filter((f) =>
    ['.jpg', '.jpeg', '.png'].includes(extname(f).toLowerCase()),
  );

  let before = 0;
  let after = 0;

  for (const file of files) {
    const src = join(DIR, file);
    const out = join(DIR, `${basename(file, extname(file))}.webp`);

    const original = (await stat(src)).size;
    before += original;

    const maxWidth = isHero(file) ? 1000 : 1200;

    await sharp(src)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(out);

    const optimized = (await stat(out)).size;
    after += optimized;

    // Rimuovo l'originale solo se l'output non lo sovrascrive (estensione diversa)
    if (out !== src) await unlink(src);

    const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
    console.log(`${file.padEnd(20)} ${kb(original)} -> ${kb(optimized)}`);
  }

  const mb = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`;
  console.log(`\nTotale: ${mb(before)} -> ${mb(after)} (-${(100 - (after / before) * 100).toFixed(0)}%)`);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
