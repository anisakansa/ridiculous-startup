// Ridiculous at First Glance, Real by the Second
// Pitch: goat-rental landscaping. The turn is the whole joke: the reader
// laughs at "rent out trained goats", then nods at the second half —
// the goats mow, fertilise, and leave, and the booking model (by the
// hour) is how a real landscaping crew already charges. That is why the
// business logic survives a second look: goat grazing crews are a real
// service, and the sentence makes the market obvious without explaining
// it. The odd thing (trained goats), the buyer (homeowners), and the
// reason to pay (mow + fertilise in one visit, no petrol, no crew to
// manage) are all inside one sentence, 133 characters, no trailing
// newline — concrete, vivid, and nothing like the existing "Novel Relay"
// entry, which is a relay race, not a rental business.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const PITCH =
  "We rent out trained goats to mow your lawn, fertilize it, and leave — the oldest landscaping crew on earth, now bookable by the hour.";

// Gate guard: 1-200 characters, a single sentence, no trailing newline.
if (PITCH.length < 1 || PITCH.length > 200) {
  throw new Error(`pitch must be 1-200 characters, got ${PITCH.length}`);
}
if (!PITCH.endsWith(".") || PITCH.includes("\n")) {
  throw new Error("pitch must be one sentence on one line");
}

const out = process.argv[2] ?? "/output/entry.txt";
mkdirSync(out.slice(0, out.lastIndexOf("/")), { recursive: true });
writeFileSync(out, PITCH, "utf8");

// Round-trip check: what we wrote must be exactly the pitch, byte for byte.
const back = readFileSync(out, "utf8");
if (back !== PITCH || Buffer.byteLength(back, "utf8") !== Buffer.byteLength(PITCH, "utf8")) {
  throw new Error("round-trip mismatch");
}
