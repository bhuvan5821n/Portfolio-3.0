/** Derive delivery images without changing or deleting any source frame. */
const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const sharp = require("sharp");
const manifest = require("../data/hero-sequence.json");

async function main() {
  const source = path.resolve(__dirname, "../public/media/hero-sequence");
  const output = path.resolve(__dirname, "../public/media/hero-delivery");
  const names = Array.from({ length: manifest.end - manifest.start + 1 }, (_, i) => i + manifest.start)
    .filter((i) => !manifest.missing.includes(i))
    .map((i) => `frame_${String(i).padStart(manifest.padding, "0")}`);
  const records = [];
  for (const size of ["compact", "large"]) await fs.mkdir(path.join(output, size), { recursive: true });
  for (const name of names) {
    const master = await fs.readFile(path.join(source, `${name}.jpg`));
    const sourceHash = crypto.createHash("sha256").update(master).digest("hex");
    const sizes = {};
    for (const [size, width, quality] of [["compact", 768, 76], ["large", 1280, 82]]) {
      const target = path.join(output, size, `${name}.webp`);
      await sharp(master).resize({ width, withoutEnlargement: true }).webp({ quality, effort: 5 }).toFile(target);
      sizes[size] = (await fs.stat(target)).size;
    }
    records.push({ name, sourceHash, sourceBytes: master.length, ...sizes });
  }
  await fs.writeFile(path.join(output, "integrity.json"), `${JSON.stringify({ count: names.length, records }, null, 2)}\n`);
  console.log(JSON.stringify({ count: names.length, bytes: records.reduce((sum, r) => ({ source: sum.source + r.sourceBytes, compact: sum.compact + r.compact, large: sum.large + r.large }), { source: 0, compact: 0, large: 0 }) }, null, 2));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
