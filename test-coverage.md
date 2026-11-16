# Test Coverage

This repository has zero external runtime or test dependencies. Tests use Node.js's built-in `node:test` runner and V8 coverage (`--experimental-test-coverage`).

## Running the Tests

```bash
node --test --experimental-test-coverage tests/portfolio.test.js
```

## Coverage Summary

Observed output from `node --test --experimental-test-coverage tests/portfolio.test.js` (4/4 passing across 2 suites):

| File | Line % | Branch % | Funcs % | Uncovered Lines |
| --- | ---: | ---: | ---: | --- |
| `assets/app.js` | 100.00% | 98.35% | 100.00% | — |
| `data/projects.js` | 100.00% | 100.00% | 100.00% | — |

## What Is Tested

1. **`data/projects.js`**:
   - Verifies `window.PORTFOLIO` exports `site`, `lanes`, `projects`, and `pwas`.
   - Verifies all 6 PWAs have non-empty names, one-line purposes, and live `https://thomascherickal.github.io/...` URLs.
2. **`assets/app.js`**:
   - Missing `window.PORTFOLIO` error banner and early return.
   - Site metadata, booking links, Intelligence Repository (`#brain-link`, `#brain-shot`, `#brain-lane`), and footer links rendering.
   - Claude automations rendering, YouTube `yt:` click-to-load facade (with and without poster), MP4 `<video>` rendering (with and without poster), and recording-in-progress fallback.
   - Screenshot carousels (`.car-zoom`, `.car-prev`, `.car-next`, `.car-dot`, and capture-phase `scroll` dot updates).
   - Project filtering across `All`, demo lanes, `Claude`, `Knowledge`, `Web Apps`, and empty lanes, plus hero `#lane-index` navigation clicks.
   - PWA card rendering with `Live` badges and fallback initial letter when `icon` is empty.
   - Dynamic `footer.html` fetch handling (valid `<footer>`, non-OK status, missing `<footer>`, and missing `#contact`).

