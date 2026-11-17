# Enterprise Data Guard

**Client-side C++ / WebAssembly secret and personal-data scanner that prevents API keys, credentials, and customer PII from leaking into AI prompts.**

## Overview

Developers and employees routinely paste stack traces, configuration files, database URIs, and customer records into AI assistants. **Enterprise Data Guard** solves this before a single byte leaves the browser:

1. **Core C++17 Scanner Engine (`src/core/`)**: Detects secrets (AWS, GitHub, OpenAI, Anthropic, Google, Stripe, Slack, PEM private keys, JWTs, database URIs, high-entropy Bearer tokens) and personal data (Luhn-validated credit cards, US SSNs, mod-97 validated IBANs, emails, phone numbers, optional IPv4).
2. **WebAssembly Browser Module (`src/wasm/`)**: Compiled with Emscripten (`em++`) to `data_guard.wasm` so scanning and redaction execute 100% locally in the user's browser.
3. **C++ Admin Control Centre (`src/admin_gui/`)**: Native GTK+ 3 desktop application (with headless CLI mode) sharing the exact same C++ core engine to configure policies, manage allowlists/custom rules, test scans, and export `policy.json`.
4. **Web Dashboard for Every User (`web/`)**: Zero-trust browser dashboard and `interceptor.js` prompt guard powered by `data_guard.wasm`.
5. **Chrome Extension (`extension/`)**: A Manifest V3 extension that runs the same WebAssembly scanner inside your AI chat tabs and stops secrets and personal data before a prompt is sent. See [Chrome Extension](#chrome-extension).
6. **Automated Deployment Scripts (`scripts/`)**:
   - **Enterprise** (`scripts/deploy-enterprise.sh`): Docker + Nginx static bundle + enterprise `policy.json`.
   - **Local** (`scripts/deploy-local.sh`): Native Admin GUI + local Python WASM server.
   - **Demo** (`scripts/deploy-demo.sh`): Pre-loaded scenarios + live CLI/web demo.

## Quick Start

```bash
# Build native C++ core, GTK3 Admin GUI, and WebAssembly bundle
./scripts/build-all.sh

# Run C++ unit tests, 100% gcov coverage check, WASM tests, and deploy smoke tests
./scripts/run-tests.sh

# Launch the C++ GTK3 Admin Control Centre
./build/native/dataguard-admin

# Start Local or Demo web dashboard
./scripts/deploy-local.sh
./scripts/deploy-demo.sh
```

## Chrome Extension

The extension brings the scanner to the AI tools people already use. Every scan runs locally, in the extension's service worker, using the same `data_guard.wasm` as the web dashboard and the Admin GUI. No text is uploaded and no network request is made.

### What it does

- **Works on:** ChatGPT (`chatgpt.com`, `chat.openai.com`), Claude (`claude.ai`), Gemini (`gemini.google.com`), Microsoft Copilot (`copilot.microsoft.com`), Perplexity (`www.perplexity.ai`) and Poe (`poe.com`).
- **Scans when you press Enter** in the prompt box. If it finds nothing, the prompt is sent as normal. Shift+Enter still adds a new line.
- **Scans what you paste.** Pasting text that contains secrets or personal data shows a warning toast straight away.
- **Asks before it blocks.** If a prompt has findings, a dialog gives three choices: **Cancel**, **Send Anyway**, or **Replace with Safe Redacted Prompt**, which swaps your text for a copy with every finding masked.
- **Detects** the same things as the core engine: cloud and vendor API keys, JWTs, PEM private keys, database URIs, Luhn-valid credit cards, SSNs, IBANs, emails, phone numbers, and optionally high-entropy bearer tokens and IPv4 addresses.
- **Asks for one permission only:** `storage`, used to remember the on/off switch, your policy and your counters on this browser.

### Install (unpacked, for development and internal rollout)

You need Google Chrome (or another Chromium browser such as Edge or Brave) and either the packaged zip or a build of this repo.

**Option 1: from the packaged zip**

1. Download `enterprise-data-guard-extension.zip` and unzip it into a folder you will keep, for example `~/enterprise-data-guard-extension`.
2. Open `chrome://extensions` in the address bar.
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and choose the unzipped folder (the one that contains `manifest.json`).
5. Click the puzzle-piece icon in the toolbar and **pin** Enterprise Data Guard.

**Option 2: build it yourself**

```bash
# Needs the Emscripten SDK (em++) on your PATH, or set EMXX=/path/to/em++
./scripts/build-extension.sh
# Writes dist/enterprise-data-guard-extension.zip and puts data_guard.{js,wasm} in extension/wasm/
```

Then follow steps 2 to 5 above, choosing the `extension/` folder (or the unzipped build) in step 4.

The `extension/wasm/` folder must hold `data_guard.js` and `data_guard.wasm`. If the popup says **WASM Error**, run `./scripts/build-all.sh` and click the reload arrow on the extension card in `chrome://extensions`.

### Use it

1. Open any supported AI chat site.
2. Type or paste a prompt. Try: `my key is sk-ant-api03-abcdefghijklmnopqrstuvwxyz0123 and ssn 123-45-6789`.
3. Press **Enter**. The Enterprise Data Guard dialog lists what it found.
4. Choose **Replace with Safe Redacted Prompt** to insert the masked version, then press Enter again to send it. Choose **Cancel** to go back and edit, or **Send Anyway** to send the original once.

**Toolbar popup**

| Control | What it does |
|---|---|
| **Active** switch | Turns scanning on or off for all supported sites. |
| Counters | Scans, blocked prompts, secrets and personal-data items found on this browser. |
| **Quick Pre-Flight Scan** | Paste any text, click **Scan & Redact**, then **Copy Safe** to copy the masked version. |
| **Policy Controls** | Toggle Secrets and Keys, Personal Data, High-Entropy Bearer tokens and IPv4 addresses. |
| **Import policy.json** | Load a policy exported from the C++ Admin Control Centre, so the whole team shares one rule set. |
| **Reset** | Return to the default policy. |

### Roll it out to a team

Export `policy.json` from the Admin Control Centre and have each person import it from the popup. For managed Chrome fleets, distribute the same unzipped folder through your usual browser-management tooling, or publish it to the Chrome Web Store as a private listing.

### Limits

- The extension guards the sites listed above. Add other AI tools by adding their address to `content_scripts.matches` in `extension/manifest.json`, then reload the extension.
- It checks text in the prompt box. It does not read file attachments.
- Any user can switch it off with the **Active** switch, so treat it as a safety net for honest mistakes and not as a data-loss-prevention control on its own.

## Documentation

- [Architecture](docs/architecture.md)
- [API Reference](docs/api-reference.md)
- [Admin GUI Guide](docs/admin-gui-guide.md)
- [Web Dashboard Guide](docs/web-dashboard-guide.md)
- [Chrome Extension](#chrome-extension)
- [Deployment Guide](docs/deployment-guide.md)
- [Security Model](docs/security-model.md)
- [Testing and Coverage](docs/testing-and-coverage.md)

