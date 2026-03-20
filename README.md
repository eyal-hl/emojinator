# Emojinator

A simple, static Slack emoji generator that supports Hebrew and English text.

Generate custom Slack-style emoji stickers — bold text on a colored square — and download them as PNG files ready to upload to your workspace.

## Features

- **Color picker** — 12 preset colors + custom color via native color picker
- **Top & bottom text** — auto-sized to fit, RTL/LTR handled automatically
- **Font picker** — 8 Google Fonts that support both Hebrew and English (default: Heebo Black)
- **Size selector** — 64×64, 128×128 (Slack default), 256×256, 512×512
- **Live preview** — large preview + actual-size preview, updates on every keystroke
- **Editable filename** — auto-generated from text (Hebrew transliterated to Latin), or type your own
- **PNG download** — one click export, Slack-ready

## Tech Stack

- React (Vite)
- CSS-in-JS (inline styles)
- HTML Canvas for rendering and PNG export
- Google Fonts API for Hebrew+English font loading
- Fully static — no backend, no auth, no database

## Getting Started

```bash
npm create vite@latest emojinator -- --template react
cd emojinator
# Replace src/App.jsx with the Emojinator component
npm install
npm run dev
```

## Deployment (GitHub Pages)

```bash
npm run build
# Deploy the dist/ folder to GitHub Pages
```

Add to `vite.config.js`:
```js
export default defineConfig({
  base: '/emojinator/',
  plugins: [react()],
})
```

## Usage

1. Pick a background color (or use the custom color picker)
2. Type top text and bottom text
3. Choose a font
4. Adjust size if needed
5. Optionally edit the filename
6. Click Download

The downloaded PNG is ready to upload as a custom emoji in Slack, Discord, or any platform that supports custom emoji.

## License

MIT
