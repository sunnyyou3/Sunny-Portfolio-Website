/* eslint-disable */
// Build-time script: extract EXIF camera data from the local gallery JPGs
// and write public/gallery-exif.json.
// Run: node scripts/extract-gallery-exif.js (or npm run extract-exif)
// Re-run whenever gallery images are added or changed.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const GALLERY_DIR = path.join(ROOT, 'src', 'assets', 'Portfolio', 'Images', 'Gallery');
const OUT_PATH = path.join(ROOT, 'src', 'features', 'portfolio', 'data', 'gallery-exif.json');

// Type sizes in bytes (EXIF baseline)
const TYPE_SIZE = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 7: 1, 9: 4, 10: 8 };

function readValue(buf, offset, type, count, le) {
  const size = TYPE_SIZE[type] || 1;
  const total = size * count;
  const base = total <= 4 ? offset + 8 : offset; // inline value or absolute offset
  const end = base + total;
  if (end > buf.length) return null;

  switch (type) {
    case 1: // BYTE / UNDEFINED
    case 7: {
      const bytes = buf.slice(base, end);
      return bytes;
    }
    case 2: // ASCII
      return buf.toString('ascii', base, end - 1).replace(/\u0000+$/, '').trim();
    case 3: // SHORT
      if (count === 1) return le ? buf.readUInt16LE(base) : buf.readUInt16BE(base);
      return [];
    case 4: // LONG
      if (count === 1) return le ? buf.readUInt32LE(base) : buf.readUInt32BE(base);
      return [];
    case 5: { // RATIONAL
      if (count !== 1) return [];
      const num = le ? buf.readUInt32LE(base) : buf.readUInt32BE(base);
      const den = le ? buf.readUInt32LE(base + 4) : buf.readUInt32BE(base + 4);
      return { num, den };
    }
    case 9: // SLONG
      return le ? buf.readInt32LE(base) : buf.readInt32BE(base);
    case 10: { // SRATIONAL
      const num = le ? buf.readInt32LE(base) : buf.readInt32BE(base);
      const den = le ? buf.readInt32LE(base + 4) : buf.readInt32BE(base + 4);
      return { num, den };
    }
    default:
      return null;
  }
}

function readIfd(buf, ifdOffset, le) {
  const numEntries = le ? buf.readUInt16LE(ifdOffset) : buf.readUInt16BE(ifdOffset);
  const entries = {};
  let cursor = ifdOffset + 2;
  for (let i = 0; i < numEntries; i++) {
    const tag = le ? buf.readUInt16LE(cursor) : buf.readUInt16BE(cursor);
    const type = le ? buf.readUInt16LE(cursor + 2) : buf.readUInt16BE(cursor + 2);
    const count = le ? buf.readUInt32LE(cursor + 4) : buf.readUInt32BE(cursor + 4);
    const valOrOff = le ? buf.readUInt32LE(cursor + 8) : buf.readUInt32BE(cursor + 8);
    const value = readValue(buf, cursor + 8, type, count, le, valOrOff);
    // NOTE: readValue uses valOrOff only for inline detection via cursor+8;
    // for non-inline values the offset is valOrOff itself, already absolute.
    entries[tag] = { type, count, value: value === null ? valOrOff : value };
    cursor += 12;
  }
  const nextIfd = le ? buf.readUInt32LE(cursor) : buf.readUInt32BE(cursor);
  return { entries, nextIfd };
}

// Patch: readValue needs valOrOff for non-inline case. Redefine properly.
function readValue2(buf, cursor, type, count, le) {
  const tagOff = cursor + 8;
  const valOrOff = le ? buf.readUInt32LE(tagOff) : buf.readUInt32BE(tagOff);
  const size = TYPE_SIZE[type] || 1;
  const total = size * count;
  const base = total <= 4 ? tagOff : valOrOff;
  const end = base + total;
  if (end > buf.length) return null;

  switch (type) {
    case 1:
    case 7:
      return buf.slice(base, end);
    case 2:
      return buf.toString('ascii', base, end - 1).replace(/\u0000+$/, '').trim();
    case 3:
      if (count === 1) return le ? buf.readUInt16LE(base) : buf.readUInt16BE(base);
      return [];
    case 4:
      if (count === 1) return le ? buf.readUInt32LE(base) : buf.readUInt32BE(base);
      return [];
    case 5: {
      const num = le ? buf.readUInt32LE(base) : buf.readUInt32BE(base);
      const den = le ? buf.readUInt32LE(base + 4) : buf.readUInt32BE(base + 4);
      return { num, den };
    }
    case 9:
      return le ? buf.readInt32LE(base) : buf.readInt32BE(base);
    case 10: {
      const num = le ? buf.readInt32LE(base) : buf.readInt32BE(base);
      const den = le ? buf.readInt32LE(base + 4) : buf.readInt32BE(base + 4);
      return { num, den };
    }
    default:
      return null;
  }
}

function readIfd2(buf, ifdOffset, le) {
  const numEntries = le ? buf.readUInt16LE(ifdOffset) : buf.readUInt16BE(ifdOffset);
  const entries = {};
  let cursor = ifdOffset + 2;
  for (let i = 0; i < numEntries; i++) {
    const tag = le ? buf.readUInt16LE(cursor) : buf.readUInt16BE(cursor);
    const type = le ? buf.readUInt16LE(cursor + 2) : buf.readUInt16BE(cursor + 2);
    const count = le ? buf.readUInt32LE(cursor + 4) : buf.readUInt32BE(cursor + 4);
    entries[tag] = readValue2(buf, cursor, type, count, le);
    cursor += 12;
  }
  const nextIfd = le ? buf.readUInt32LE(cursor) : buf.readUInt32BE(cursor);
  return { entries, nextIfd };
}

function rationalToNumber(rat) {
  if (!rat || typeof rat !== 'object') return null;
  const { num, den } = rat;
  if (den === 0) return null;
  return num / den;
}

function formatShutter(rat) {
  const v = rationalToNumber(rat);
  if (v == null) return null;
  if (v >= 1) return `${v === Math.floor(v) ? v : v.toFixed(2)}s`;
  const denom = Math.round(1 / v);
  return `1/${denom}s`;
}

function formatAperture(rat) {
  const v = rationalToNumber(rat);
  if (v == null) return null;
  const clean = v === Math.floor(v) ? v : Math.round(v * 10) / 10;
  return `f/${clean}`;
}

function formatFocal(rat) {
  const v = rationalToNumber(rat);
  if (v == null) return null;
  const clean = v === Math.floor(v) ? v : Math.round(v * 10) / 10;
  return `${clean}mm`;
}

function extractExif(filePath) {
  const buf = fs.readFileSync(filePath);
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return null;

  let offset = 2;
  let exifTiff = null;
  while (offset < buf.length - 4) {
    if (buf[offset] !== 0xff) break;
    const marker = buf[offset + 1];
    if (marker === 0xd9) break; // EOI
    if (marker === 0xe1) { // APP1
      const len = buf.readUInt16BE(offset + 2);
      const app1 = buf.slice(offset + 4, offset + 2 + len);
      if (app1.length >= 6 && app1.toString('ascii', 0, 6) === 'Exif\0\0') {
        exifTiff = app1.slice(6);
      }
      break;
    }
    // markers 0xD8/D9 have no length; everything else does
    if (marker === 0xd8 || marker === 0xd9) {
      offset += 2;
      continue;
    }
    const segLen = buf.readUInt16BE(offset + 2);
    offset += 2 + segLen;
  }
  if (!exifTiff || exifTiff.length < 10) return null;

  const bo = exifTiff.toString('ascii', 0, 2);
  if (bo !== 'II' && bo !== 'MM') return null;
  const le = bo === 'II';
  const magic = le ? exifTiff.readUInt16LE(2) : exifTiff.readUInt16BE(2);
  if (magic !== 42) return null;
  const ifd0Off = le ? exifTiff.readUInt32LE(4) : exifTiff.readUInt32BE(4);

  const ifd0 = readIfd2(exifTiff, ifd0Off, le);
  const exifOffVal = ifd0.entries[0x8769];
  const exifOffset = exifOffVal != null && typeof exifOffVal === 'number' ? exifOffVal : null;
  const exifIfd = exifOffset != null ? readIfd2(exifTiff, exifOffset, le) : { entries: {} };

  const get = (map, tag) => map[tag];

  const make = get(ifd0.entries, 0x010f) || '';
  const model = get(ifd0.entries, 0x0110) || '';
  const exposureTime = get(exifIfd.entries, 0x829a);
  const fNumber = get(exifIfd.entries, 0x829d);
  const iso = get(exifIfd.entries, 0x8827);
  const focalLength = get(exifIfd.entries, 0x920a);
  const lensMake = get(exifIfd.entries, 0xa433) || '';
  const lensModel = get(exifIfd.entries, 0xa434) || '';
  const artist = get(ifd0.entries, 0x013b) || '';
  const copyright = get(ifd0.entries, 0x8298) || '';

  const camera = [make, model].filter(Boolean).join(' ') || null;
  const lens = [lensMake, lensModel].filter(Boolean).join(' ') || lensModel || null;

  return {
    camera,
    lens,
    shutterSpeed: formatShutter(exposureTime),
    aperture: formatAperture(fNumber),
    iso: iso != null ? `ISO ${iso}` : null,
    focalLength: formatFocal(focalLength),
    artist: artist || null,
    copyright: copyright || null
  };
}

function main() {
  const files = fs
    .readdirSync(GALLERY_DIR)
    .filter((f) => f.toLowerCase().endsWith('.jpg'))
    .sort();

  const data = {};
  for (const file of files) {
    const full = path.join(GALLERY_DIR, file);
    const exif = extractExif(full);
    data[file] = exif || null;
    console.log(`${file}: ${exif ? JSON.stringify(exif) : 'NO EXIF'}`);
  }

  const outDir = path.dirname(OUT_PATH);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(data, null, 2) + '\n');
  console.log(`\nWrote ${OUT_PATH} (${files.length} images)`);
}

main();
