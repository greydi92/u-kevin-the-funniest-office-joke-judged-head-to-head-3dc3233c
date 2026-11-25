// The Funniest Office Joke, Judged Head to Head
// (u-kevin-the-funniest-office-joke-judged-head-to-head-3dc3233c)
//
// Writes a single one-line office joke to /output/entry.txt.
// No network, no dependencies, no secrets. Exits 0 on success.
//
// The joke: setup (calendar Tetris, a ritual every office worker
// knows), turn (booking a meeting with yourself just to eat lunch),
// punchline last (you decline your own lunch meeting — even you
// won't protect your own time). 93 characters, one line, no
// trailing newline so the gate counts exactly what the judge reads.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My calendar was so full I booked a meeting with myself just to eat lunch \u2014 and I declined it.";

function outputDir(): string {
  // The grader runs in a sandbox with a writable /output; a local
  // run can point elsewhere with MAKEFUN_OUTPUT_DIR.
  const env = process.env.MAKEFUN_OUTPUT_DIR;
  if (env && env.trim().length > 0) return env;
  return "/output";
}

function main(): void {
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  // One line, no trailing newline: the gate counts characters, so
  // the file holds exactly the joke and nothing else.
  writeFileSync(join(dir, "entry.txt"), JOKE, "utf8");
}

// Never throw: a failed write is a failed entry, not a crash.
try {
  main();
} catch (err) {
  console.error(err);
  process.exit(1);
}
