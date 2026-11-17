# Portfolio Hub — The Digital Futurist

Live portfolio hub for **Thomas Cherickal** (`portfolio.thedigitalfuturist.com`) — working proof that a software company can run AI-first.

Static, zero-build, zero-dependency HTML, CSS, and vanilla JavaScript hosted on Cloudflare Pages.

## What Is Included

- **Systems & Scientific Demos** (with interactive in-page WebAssembly / WebGPU / static JSON demos and screenshot carousels):
  - **Ferrum SLM Studio (CPU & GPU)** — Rust + WebAssembly / wgpu / WGSL small language model studios
  - **Go AI Gateway** — TinyGo + Cloudflare Workers AI traffic control plane with per-team budgets and PII redaction
  - **Enterprise Data Guard** — C++17 / Emscripten WebAssembly secret & PII scanner with native GTK+ 3 Admin GUI and Chrome extension
  - **AI Adoption Business Case Simulator** — Julia 5-lens forecasting suite (Monte Carlo, Agent-Based, System Dynamics, Queueing, Bayesian)
- **Claude Automations** — Developer-focused Claude Code & GitHub Actions workflows
- **Knowledge** — [The Intelligence Repository](https://skills.thedigitalfuturist.com) (versioned agent skills and prompt-engineering frameworks)
- **Installable Web Apps (PWAs)** — 6 zero-backend PWAs on GitHub Pages with source code links

## Architecture

- `index.html`: Main entry point. Loads `assets/styles.css`, `assets/footer.css`, `data/projects.js`, and `assets/app.js`.
- `data/projects.js`: Single source of truth for `window.PORTFOLIO` (`site`, `lanes`, `projects`, and `pwas`).
- `assets/app.js`: Vanilla JS renderer for the hero, summary index, filterable project cards, screenshot carousels, live demo iframes, and PWAs.
- `assets/styles.css` & `assets/footer.css`: Single-column, mobile-first styling.
- `demos/`: Self-contained live demos (`ferrum-cpu-studio`, `ferrum-gpu-studio`, `go-ai-gateway`, `data-guard`, `data-guard-admin`, `julia-roi`).
- `tests/portfolio.test.js`: Zero-dependency `node:test` suite with V8 coverage (see `test-coverage.md`).

## Local Preview

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Running Tests

```bash
node --test --experimental-test-coverage tests/portfolio.test.js
```

## Deploy (Cloudflare Pages)

- **Framework preset**: None
- **Build command**: *(empty)*
- **Build output directory**: `/`
- **Custom domain**: `portfolio.thedigitalfuturist.com`
