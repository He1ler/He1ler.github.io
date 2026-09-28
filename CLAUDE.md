# CLAUDE.md

Personal game-dev portfolio of Denys Korolchuk (Unity developer), served by GitHub Pages from
`main` of `He1ler/He1ler.github.io` → https://he1ler.github.io.

## Stack
- Single static page, no build step, no package manager, no tests. What is committed is what ships.
- `index.html` (~1.5k lines) holds all content. Styling is Tailwind via the **Play CDN**
  (`cdn.tailwindcss.com`, runtime JIT) plus `main.css`, `animations.css`, `modal.css`.
- CDN libs: Swiper 11 (`swiper-bundle`), particles.js 2.0.0, devicon/simpleicons for social icons.
- Local scripts, loaded at the end of `<body>` in this order: `modal.js`, `swiper-config.js`,
  `particles-config.js`, `main.js`. They communicate through `window.*` globals
  (`window.initializeSwiper`, `window.setAllMediaItems`) and inline `onclick="openModal(src, type)"`.

## Page structure (`index.html`)
Media modal (`#mediaModal`) → nav (+ `#mobile-menu`) → hero → `#about` → "Projects" separator →
`<main>` with category separators (Puzzles, …) each followed by one `<section class="fade-in ...
border-glow">` per project → `#contact` → footer. Sections are delimited by banner comments
(`<!-- PROJECT 1.1: Tram Puzzle -->` / `<!-- END PROJECT 1.1 -->`).

A project section = `h2.neon-red` title, `p` description, `.swiper.mySwiper` gallery whose slides wrap
an `<img loading="lazy">` or an autoplay/muted/loop `<video>` inside a div with
`onclick="openModal('<path>', 'image'|'video')"`, then a row of technology tag `<span>`s.
**To add a project, copy an existing section block and keep that exact markup** — `main.js`
(`initializeMediaCollections`) scrapes the `onclick` strings with a regex to build the modal's
prev/next list, so the `openModal('…', '…')` form is load-bearing.

## Media
- `Images/<Project>/<Project>N.jpg`, `Videos/<Project>/<Project>N.mp4` (H.264 MP4). Folder names are
  the asset keys; some are historical misspellings (`Coctails`) — don't rename without updating every
  reference.
- Working tree: ~14 MB images, ~450 MB videos (largest ~42 MB). `.git` is ~3 GB because every past
  re-encode of the videos is still in history.

## Constraints
- GitHub Pages: published site ≤ 1 GB, soft bandwidth limit 100 GB/month, pushes reject files
  > 100 MiB (warn > 50 MiB). Keep every video well under 50 MB; prefer ≤ 10–15 MB per clip.
- Audience is recruiters/clients, often on mobile — first-load weight and mobile layout matter more
  than effects.

## Known issues (as of 2026-09-28)
- 14 of 14 project descriptions are the same placeholder ("Cyber Raid is a high-speed sci-fi
  shooter…").
- Mobile menu never opens: `main.js` binds the toggle click twice (inline in `DOMContentLoaded` and
  again in `initMobileMenu`), so each click toggles `hidden` twice.
- Duplicate IDs: `id="modalVideoSource"` on 37 elements, `id="projects"` on 8; gallery `<video>` tags
  also have two `class` attributes.
- Gallery videos have no `preload`/`poster`, so all ~37 autoplay clips start loading on page open.
- Tailwind Play CDN is not meant for production; heavy `console.log` debugging in `main.js`/`modal.js`.

## Git
- Work directly on `main` (no `develop`). Commit messages: `P-<N> <what was done>`, continuing the
  existing counter (last used: P-49). Commit/push only when asked.
- Preview locally: `python -m http.server 8000` from this folder (see `.claude/launch.json`).
