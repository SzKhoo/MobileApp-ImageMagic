# Image Magic — Project Context & Handoff

> Read this first. It captures the product strategy, what's built, and what's
> next, so a fresh session (local or cloud) has full context.

## Working agreement
- **Branch:** all work goes on `claude/image-magic-app-plan-NXLpL`.
- **Commits:** one commit per completed phase (a "version"), used as the backup point.
- **Verification each phase:** `npm run typecheck`, `npm run lint`, and an
  `npx expo export --platform ios` bundle check must pass before committing.
- **Device rendering** (the before/after reveal feel, theming, native
  picker/share) can only be verified by running `npx expo start` on a
  simulator/device — do this locally.

## Strategy (decided)
Originally designed as a full **AI creator-economy marketplace** (prompt
scripts, credits/cashback, duplicate detection, fraud, ranking, fork/remix,
multi-model picker, Supabase + pgvector + job queue). A product-strategy review
concluded that's **premature complexity**: the marketplace is the more valuable
end-state but can't be built first without a loved single-player loop.

**Decision: build feed-first only for v1; cut the marketplace.** Re-introduce
marketplace/creator features only if v1 proves the loop retains and spreads.
The emotional core is the **before→after reveal of the user's own photo**; the
**share** is the growth engine. Optimize those two moments above all.

### Product decisions
- Single-player photo-transformation app. No marketplace/creators/credits/
  dedup/fraud/ranking/fork/ratings/model-picker in v1.
- **Any photo** (pets, rooms, products, scenery, selfies). Feed is mixed looks.
- One provider, **hidden** from the user (no picker).
- **Mock generation first** (full walkable app, zero backend), then wire real
  generation, then monetize.
- Light + dark themes (system default), Poppins font, pastel/kawaii design
  (pink→purple gradient accent), NativeWind + custom components.

## Core loop
Feed of curated looks → tap a look → pick your photo → animated before/after
reveal → save / share / redo / more looks → free-limit → paywall.

## Status

### Phase 1 — Walkable app on MOCK generation ✅ DONE
- Scaffold: app.json, babel/metro, NativeWind + Tailwind tokens, Poppins,
  expo-router, root providers, toast host.
- Design system: light/dark token palette (`theme/tokens.ts`, `global.css`),
  primitives in `components/ui/` (Screen, Text, Button, Card, Chip, IconButton,
  SearchBar, Segmented, Skeleton, EmptyState, Toast).
- Theme store (system/light/dark, persisted) + `useTheme()`.
- 3-tab shell: Home · History · Profile.
- Feed: mock looks (`lib/mock/`), `LookCard` grid, `CategoryChips`, search,
  skeletons, pull-to-refresh, empty state.
- Magic moment: look detail (`BeforeAfter` draggable), `ImageDropzone` photo
  pick, mock `generate()`, `GenerationProgress`, auto-reveal result.
- Result: Save (media library), Share, Redo, More looks.
- Local history (persisted), quota tracking + paywall (mock), theme toggle.
- Data flows through `api/` hooks so the mock generator can be swapped for a
  real provider with a one-file change (`api/generate.ts`).

### Phase 2 — Real generation (NOT STARTED)
Minimal backend: one Supabase Edge Function holding the provider key + quota,
Storage for outputs, `profiles` for entitlement. Swap mock→real behind the
existing `api/` interface. **Needs from you:** a provider API key (server-side)
and ideally your ~30–50 curated looks (reference images + hidden prompts) to
replace placeholders in `lib/mock/looks.ts`.

### Phase 3 — Monetize (NOT STARTED)
RevenueCat SDK + products + entitlement webhook; free-limit → paywall.

### Parked until the loop is validated (Phase 4+)
Marketplace/catalog, creators/follow, credits & cashback ledger, duplicate
detection (pgvector/LLM), fraud/trust scoring, ranking/recommendations,
fork/remix lineage, ratings, multi-model picker, job queue/worker tier.

## Run locally
```
git pull origin claude/image-magic-app-plan-NXLpL
npm install --legacy-peer-deps
npx expo start
```
Note: `--legacy-peer-deps` is required (Expo SDK 56 + extra libs peer conflict).

## Superpowers skills
The `obra/superpowers` skill collection (v5.1.0, MIT) is vendored into
`.claude/skills/` so it's available in every session. See
`.claude/skills/SUPERPOWERS-SOURCE.md`.
