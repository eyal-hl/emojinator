# AGENTS.md — Emojinator Project Context

## What This Project Is

Emojinator is a **static, single-page React app** that generates Slack-style custom emoji images. The user picks a color, types two lines of text (top + bottom), selects a font, and downloads a PNG.

The design reference is the standard Hebrew Slack emoji sticker format: bold black text centered on a solid color square (typically yellow). See the WhatsApp screenshots in the project history for the exact look — "תודה אורן" style stickers.

## Core Design Decisions

- **Static site only.** No backend, no database, no auth. Must be deployable to GitHub Pages via `npm run build`.
- **React + Vite.** Standard template, no extra frameworks.
- **HTML Canvas for rendering.** This is the right tool because we need pixel-perfect text layout and PNG export. Do not replace with SVG or DOM-to-image — canvas gives us direct control over `measureText`, font sizing, and `toDataURL`.
- **Google Fonts loaded at runtime** via the Fonts API. All selected fonts must support both **Hebrew and English** character sets.
- **Inline styles (CSS-in-JS).** The project is intentionally simple — a single component file. CSS Modules were discussed early but inline styles keep it to one file. If the project grows, migrate to CSS Modules.
- **Auto text sizing** via `canvas.measureText()` — each line independently shrinks to fit the square. This is the trickiest part of the project; handle edge cases like very long text or single-line-only input.
- **Hebrew transliteration** for auto-generated filenames. The mapping is basic (e.g. ש→sh, צ→ts) — it doesn't need to be linguistically perfect, just produce readable Slack emoji names.

## Key Behaviors to Preserve

1. **Live preview** — canvas redraws on every input change. No "generate" button needed.
2. **Two previews** — a large ~280px preview for visual feedback + an actual-size preview showing the real output.
3. **RTL support** — text inputs use `dir="auto"`. Canvas centering handles both directions naturally.
4. **Filename field** — auto-populated from transliterated text, but user can override. The `.png` extension is appended automatically and shown as a static suffix.
5. **Default state** — the app loads with "תודה / אורן" in Slack yellow (#E8A230) using Heebo Black, so the user immediately sees a working example.

## Font Selection Criteria

When adding or changing fonts, they **must**:
- Be available on Google Fonts
- Support Hebrew (`hebrew` subset) and Latin character sets
- Look good at small sizes (128×128) in bold/black weights
- The default font (currently Heebo Black 900) was chosen to match the reference Slack emoji screenshots

## Things to Watch Out For

- **Font loading race condition:** Fonts load asynchronously. The canvas must redraw after fonts are ready, not just on mount. We use `document.fonts.ready` with a timeout fallback.
- **Canvas resolution:** The export canvas must render at the exact requested pixel size (e.g. 128×128), not scaled by devicePixelRatio. Slack expects exact pixel dimensions.
- **Text measurement accuracy:** `measureText` depends on the font being fully loaded. If text appears too large/small, it's likely a font loading issue.
- **Custom color picker UX:** The native `<input type="color">` behaves differently across browsers. It's positioned absolutely below the custom color swatch button.

## What NOT to Do

- Don't add a backend or API calls (except Google Fonts CDN)
- Don't add user accounts, history, or persistence
- Don't use heavy libraries (no Material UI, no styled-components)
- Don't change the canvas-based rendering to DOM screenshots or SVG — canvas is intentional
- Don't remove the Hebrew transliteration from the filename generator — it's a core feature for the Israeli Slack community this was built for
