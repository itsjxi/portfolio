# Jugal Rajput: portfolio

Live: [jugalrajputportfolio.netlify.app](https://jugalrajputportfolio.netlify.app/)

A single-page portfolio in React and Vite. The hero is a small canvas of working pieces from four
projects (data grid, habit tracker, music player and block editor), and the Gap and Radius
controls restyle that canvas live.

## Stack

- React 18 and Vite, plain CSS with design tokens in `src/styles/global.css`
- `lucide-react` for icons; no animation or carousel libraries
- All content lives in `src/data/content.js`

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Updating project screenshots

Screenshots are in `public/work/` as 2400×1500 WebP (1440×900 viewport at 2×, resized).
Keep the same size so the browser frames line up.
