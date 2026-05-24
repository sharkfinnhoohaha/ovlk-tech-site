# OVLK / TECH — marketing site

Static site for **Overlook Tech**. Two pages, no build step.

- `/` &nbsp;→&nbsp; `index.html` — homepage (hero + sections + inline contact)
- `/start` &nbsp;→&nbsp; `start.html` — multi-step "Start a project" intake

All scripts are in-browser React + Babel (loaded from unpkg CDN). The `.jsx`
files are transpiled at runtime — no bundler, no Node toolchain, nothing to
build. Vercel just serves the files.

## Structure

```
deploy/
├── index.html           homepage
├── start.html           /start intake page
├── colors_and_type.css  design tokens + @font-face
├── styles.css           component styles
├── app.jsx              homepage root component
├── nav.jsx              top nav
├── hero.jsx             hero section
├── sections.jsx         studio / services / process / work
├── contact.jsx          ContactSection + ProjectForm
├── graph.jsx            Obsidian-style node graph
├── cursor.jsx           custom cursor
├── flow.js              scroll-snap controller (plain JS)
├── tweaks-panel.jsx     in-design tweaks panel (no-op when host absent)
├── assets/              logo SVGs
└── vercel.json          cleanUrls + cache headers
```

## Deploy

```bash
# from inside this folder
vercel --prod
```

…or push to a Git repo and import it in the Vercel dashboard. No framework
preset, no build command, no output directory — Vercel auto-detects static.

## Local preview

```bash
npx serve .
# → http://localhost:3000
```

Opening `index.html` from the filesystem (`file://`) will fail because the
`<script src="...jsx">` tags need an `http(s)` origin for Babel to fetch
them. Always serve over a local web server.

## Notes

- Runtime Babel transpile is slow on first paint (~200–400ms on a fast
  machine). Fine for a marketing site; revisit if traffic warrants a real
  build step.
- The contact form on `/start` does not yet post anywhere — wire it up to
  a form service (Formspree, Resend, Vercel Serverless Function, etc.)
  before launch.
- No analytics, no cookies, no third-party fonts beyond Google Fonts
  (Geist + Geist Mono). Add Vercel Analytics from the dashboard if you
  want page-view data — no code change needed.
