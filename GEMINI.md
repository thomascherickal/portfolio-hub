# GEMINI.md — Portfolio Hub (`thedigitalfuturist.com` / `portfolio.thedigitalfuturist.com`)

This repository is a static, zero-build, zero-dependency portfolio hub hosted on Cloudflare Pages.

## Architecture & Key Files

- `index.html`: Main entry point. Loads `assets/styles.css`, `assets/footer.css`, `data/projects.js`, and `assets/app.js`.
- `data/projects.js`: Single source of truth for site metadata (`window.PORTFOLIO.site`), lanes (`window.PORTFOLIO.lanes`), projects (`window.PORTFOLIO.projects`), and installable PWAs.
- `assets/app.js`: Vanilla JS renderer that populates the page from `window.PORTFOLIO` and dynamically loads `footer.html` into the page footer.
- `footer.html`: Standalone footer fragment loaded dynamically via `fetch('footer.html')` in `assets/app.js`.
- `assets/styles.css` & `assets/footer.css`: Styling for the main page and the dynamically injected footer.
- `media/`: Local MP4 recordings (must be <= 25 MiB; use `yt:VIDEO_ID` in `data/projects.js` for longer videos).

## Conventions

- **No build step or framework**: Keep everything in plain HTML, CSS, and vanilla ES5/ES6 JavaScript.
- **No external runtime dependencies**: All rendering and filtering happen client-side in `assets/app.js`.
- **Cloudflare Pages free tier**: Keep the repository public and avoid paid Cloudflare features.

## Local Preview

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

