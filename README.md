# WTF.css

> Is this even a browser?

A living CSS sandbox / showcase of impossible-looking browser tricks by [@sfisnotdead](https://github.com/sfisnotdead).

## Live Demo

**[→ View on GitHub Pages](https://sfisnotdead.github.io/wtf-css/)**

---

## Experiments

| # | Name | Technique |
|---|------|-----------|
| 01 | **Eye Awakening** | Scroll-driven `clip-path` layering — face morphs from closed to open eyes as you scroll |
| 02 | **Liquid Text** | SVG `feTurbulence` + `feDisplacementMap` + Canvas metaballs with mouse physics |
| 03 | **False Depth** | 5-layer CSS parallax with blur depth cues — zero WebGL, pure CSS |
| 04 | **Signal Decay** | VHS glitch via `clip-path` slices on `::before`/`::after`, Canvas noise, CSS scanlines |
| 05 | **Matter → Ghost** | Canvas 2D text pixel-sampling → particle system that dissolves on scroll |

---

## Navigation

- **Arrow keys** `↑↓` to cycle demos
- **Click nav items** in the sidebar
- **Mobile:** hamburger menu

---

## Adding New Experiments

1. Create `demos/your-demo.html` — any valid HTML/CSS/JS, self-contained
2. Add entry to `DEMOS` object in `js/main.js`
3. Add `<button>` entry in the nav list in `index.html`

---

## Stack

Pure HTML · CSS · Vanilla JS · Canvas 2D · SVG Filters  
No frameworks. No bundlers. No build step.

---

## License

MIT — steal freely, credit optionally.
