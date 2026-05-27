#!/usr/bin/env node
/**
 * Generate sample Image Magic UI mockups with OpenAI's image API (gpt-image-1).
 *
 * Usage:
 *   export OPENAI_API_KEY=sk-...
 *   node scripts/generate-ui-samples.mjs                  # all screens, both themes
 *   node scripts/generate-ui-samples.mjs home,paywall     # only some screens
 *   THEME=dark node scripts/generate-ui-samples.mjs        # only dark
 *   SIZE=1024x1536 MODEL=gpt-image-1 node scripts/generate-ui-samples.mjs
 *
 * Output: ./ui-samples/<screen>-<theme>.png
 */

import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) {
  console.error("Missing OPENAI_API_KEY environment variable.");
  process.exit(1);
}

const MODEL = process.env.MODEL || "gpt-image-1";
const SIZE = process.env.SIZE || "1024x1536"; // portrait phone aspect
const QUALITY = process.env.QUALITY || "high"; // low | medium | high
const OUT_DIR = process.env.OUT_DIR || "ui-samples";
const THEME_FILTER = (process.env.THEME || "").toLowerCase(); // "", "light", "dark"

// Shared art direction so every screen feels like the same product.
const STYLE = [
  "High-fidelity mobile app UI design mockup of a single iPhone screen, presented flat",
  "(no device frame, no hand, no background scene) filling the whole canvas, portrait.",
  "Product: 'Image Magic', an AI photo-editing app and creator marketplace where people",
  "browse AI 'looks'/templates, upload a photo, pick an AI model, and generate results.",
  "Modern, premium, clean visual design. Rounded 2xl cards, soft shadows, generous spacing,",
  "an 8pt grid, crisp legible UI typography, realistic placeholder photos and thumbnails,",
  "tasteful single vivid accent color, clear status bar, and a 4-tab bottom navigation bar",
  "labelled Home, Create, History, Profile with simple line icons. Pixel-perfect, realistic",
  "production app look (like Lensa, Remini, Canva, Apple Photos). No lorem ipsus gibberish",
  "text; use short real-sounding labels. No watermarks.",
].join(" ");

const themeText = (theme) =>
  theme === "dark"
    ? "Dark theme: near-black background, dark glassy surfaces, vivid gradient accents, high contrast white text."
    : "Light theme: clean white/very-light-gray background, lots of whitespace, one bold accent color, dark text.";

// Per-screen content prompts.
const SCREENS = {
  home:
    "HOME / MARKETPLACE screen. Top: a friendly greeting and a rounded search bar. Below it a " +
    "horizontal row of selectable category chips (Portrait, Anime, 3D, Retro, Cyberpunk). " +
    "A segmented sort control: Today / Week / Month / Newest. Then a 2-column scrolling grid " +
    "of template cards, each showing a before/after style thumbnail, a short title, a small " +
    "creator avatar+name, a 5-star rating, and a 'PRO' badge on some. Bottom tab bar with Home active.",
  detail:
    "TEMPLATE DETAIL screen. A large before/after image preview at top with a draggable divider. " +
    "Title, short description, a row of tags, a creator chip (avatar + name + follow button), " +
    "average star rating with usage count and a 'forked 12x' lineage label. A text area labelled " +
    "'Customize the look' showing an editable prompt. A sticky bottom primary button 'Use this look' " +
    "next to a secondary 'Fork' button.",
  generate:
    "UPLOAD & GENERATE screen. A large dashed 'tap to add a photo' dropzone showing a selected " +
    "sample portrait preview. Below it a horizontal model picker with three selectable cards: " +
    "'OpenAI' (selected), 'Google', 'FLUX', each with a small icon. A collapsible editable prompt. " +
    "A small pill showing remaining quota like '12 / 50 left' and a credits balance. A big sticky " +
    "bottom 'Generate' button. Clean and focused.",
  result:
    "RESULT screen. A large generated portrait image filling most of the screen with a small " +
    "before/after toggle. A horizontal action row of icon buttons: Save, Share, Regenerate, " +
    "Try another look. A subtle 5-star 'Rate this look' prompt near the bottom.",
  profile:
    "PROFILE / SETTINGS screen. Header with avatar, display name, a current plan badge ('Monthly') " +
    "and a quota + credits summary. Sectioned settings list: Subscription (Manage, Restore, Upgrade), " +
    "Appearance with a System / Light / Dark theme selector, Account, Legal, and an app version row. " +
    "Bottom tab bar with Profile active.",
  paywall:
    "PAYWALL modal screen. A bold headline and 3-4 short benefit bullets with check icons. Three " +
    "stacked plan option cards: Weekly, Monthly, and Yearly with a 'Best value' badge on Yearly, " +
    "each showing a price and the selected one highlighted. A large 'Continue' subscribe button, a " +
    "'Restore purchases' link, and small legal text. Premium, trustworthy feel.",
  history:
    "HISTORY screen. A filter row (All / Favorites). A scrolling list/grid of past generations, each " +
    "row showing a result thumbnail, the template title, the model used, a date, and a small status " +
    "badge (Done). Bottom tab bar with History active.",
  create:
    "CREATE tab hub screen. A prominent 'Pick a photo to start' call-to-action card at top, a row of " +
    "popular category shortcuts, and a horizontal carousel of trending 'looks' with before/after " +
    "thumbnails. Bottom tab bar with Create active (center, emphasized).",
};

async function generateOne(screen, prompt, theme) {
  const fullPrompt = `${STYLE} ${themeText(theme)} SCREEN TO DESIGN: ${prompt}`;
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      prompt: fullPrompt,
      size: SIZE,
      quality: QUALITY,
      n: 1,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI API ${res.status}: ${text}`);
  }

  const data = await res.json();
  const b64 = data?.data?.[0]?.b64_json;
  if (!b64) throw new Error(`No image returned for ${screen}-${theme}`);

  const file = join(OUT_DIR, `${screen}-${theme}.png`);
  await writeFile(file, Buffer.from(b64, "base64"));
  console.log(`  saved ${file}`);
}

async function main() {
  const requested = (process.argv[2] || "").split(",").map((s) => s.trim()).filter(Boolean);
  const screens = requested.length ? requested : Object.keys(SCREENS);
  const themes = THEME_FILTER ? [THEME_FILTER] : ["light", "dark"];

  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Generating ${screens.length} screen(s) x ${themes.length} theme(s) with ${MODEL} @ ${SIZE}...`);

  for (const screen of screens) {
    const prompt = SCREENS[screen];
    if (!prompt) {
      console.warn(`  ! unknown screen '${screen}', skipping. Known: ${Object.keys(SCREENS).join(", ")}`);
      continue;
    }
    for (const theme of themes) {
      console.log(`- ${screen} (${theme})`);
      try {
        await generateOne(screen, prompt, theme);
      } catch (err) {
        console.error(`  x failed ${screen}-${theme}: ${err.message}`);
      }
    }
  }
  console.log(`Done. See ./${OUT_DIR}/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
