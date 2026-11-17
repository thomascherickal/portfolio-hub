/*
  PORTFOLIO DATA - the only file you edit to update the hub.

  To add a project:  copy one object in `projects`, change the fields, commit, push.
  Cloudflare Pages rebuilds automatically (one build per push; 500 builds/month free).

  Field guide
  - id          unique, lowercase, hyphens only (used for links like #rag-incident-memory)
  - lane        one of: "claude", "genai", "rag", "systems", "science", "knowledge"
  - status      "live"  = working demo link
                "video" = recorded walkthrough only
                "building" = shown as in progress
  - problem     the enterprise problem it solves, one sentence, plain words
  - summary     what it does, one or two sentences
  - stack       short list of technologies
  - links.demo  live URL (leave "" if none)
  - links.video either a file in /media (e.g. "media/pr-review.mp4", max 25 MiB)
                or a YouTube video id (e.g. "yt:dQw4w9WgXcQ"); leave "" if none
  - links.poster optional still image for the video (e.g. "media/pr-review.jpg")
  - links.source GitHub repo URL
  - links.writeup optional article URL
  - run         optional live GUI: { src: "demos/x/index.html", note: "one-line limitation", height: 640 }
                shows a Run Project button that loads src in an iframe on click
  - extension   optional info block: { title, text, points: [], download, source }
  - license     SPDX id shown as a badge linking to /LICENSE (all projects are MIT)
  - icon        optional small image shown on the card next to its area name (e.g. "assets/ferrum/ferrum-icon.png")
  - images      optional screenshot carousel shown on the card, in order:
                [{ src: "assets/x/1.jpg", alt: "what the image shows", caption: "short label" }]
  - updated     YYYY-MM-DD, shown on the card
*/

window.PORTFOLIO = {
  site: {
    name: "Thomas Cherickal",
    role: "Generative AI Consultant",
    brand: "The Digital Futurist",
    headline: "The Future is Now.",
    intro:
      "Live demos and recorded runs of the systems I build for engineering teams moving to AI-first delivery: Claude agent automations, RAG, local LLMs and the Rust, Go, C++ and Julia underneath them.",
    links: {
      site: "https://thomascherickal.com",
      consulting: "https://thedigitalfuturist.com",
      linkedin: "https://www.linkedin.com/in/thomascherickal",
      x: "https://x.com/thomazcherickal",
      patreon: "https://www.patreon.com/thomascherickal",
      newsletter: "https://thomascherickal.kit.com",
      github: "https://github.com/thomascherickal",
      skills: "https://skills.thedigitalfuturist.com"
    }
  },

  lanes: {
    claude: { label: "Automations", tone: "gold" },
    genai: { label: "Gen AI", tone: "gold" },
    rag: { label: "Gateways", tone: "gold" },
    systems: { label: "Systems", tone: "gold" },
    science: { label: "Scientific", tone: "gold" },
    knowledge: { label: "Knowledge", tone: "gold" }
  },

  projects: [
    /* ---------- Live demos ---------- */
    {
      id: "ferrum-cpu",
      lane: "systems",
      status: "complete",
      license: "MIT",
      title: "Ferrum SLM Studio (CPU)",
      icon: "assets/ferrum/ferrum-icon.png",
      problem: "Teams need fast, private inference for small models without a GPU bill.",
      summary: "A Rust studio to create, train, fine-tune and run small Transformer language models on the CPU, no GPU needed. Its GGUF exports run in llama.cpp, Ollama and LM Studio, and the engine compiles to WebAssembly for the browser.",
      stack: ["Rust", "WebAssembly", "GGUF", "Tauri"],
      images: [
        { src: "assets/ferrum/ferrum-cpu/screenshots/app-datasets.jpg", alt: "Datasets tab for fetching and cleaning a training corpus", caption: "1. Fetch and clean a corpus" },
        { src: "assets/ferrum/ferrum-cpu/screenshots/app-prepare.jpg", alt: "Prepare tab for turning raw text into training data", caption: "2. Prepare the training data" },
        { src: "assets/ferrum/ferrum-cpu/screenshots/app-train.jpg", alt: "Train tab with corpus, model output and model shape settings", caption: "3. Train a transformer from scratch" },
        { src: "assets/ferrum/ferrum-cpu/screenshots/app-generate.jpg", alt: "Generate tab with seed text, sampling settings and live streaming", caption: "4. Generate with live streaming" },
        { src: "assets/ferrum/ferrum-cpu/screenshots/app-gguf.jpg", alt: "GGUF tab for importing and running a Llama or Qwen checkpoint", caption: "5. Import and run Llama and Qwen GGUF" },
        { src: "assets/ferrum/ferrum-cpu/screenshots/app-export.jpg", alt: "Export tab for writing a GGUF that runs in llama.cpp, Ollama and LM Studio", caption: "6. Export GGUF for llama.cpp, Ollama and LM Studio" },
        { src: "assets/ferrum/ferrum-cpu/screenshots/app-serve.jpg", alt: "Serve tab for running the model behind an HTTP server", caption: "7. Serve it over HTTP" },
        { src: "assets/ferrum/ferrum-cpu/github.jpg", alt: "The ferrum-cpu repository page on GitHub", caption: "The code is open source on GitHub" }
      ],
      run: { src: "demos/ferrum-cpu-studio/index.html", height: 760, note: "The real Ferrum SLM Studio UI running on a preloaded 620 KB model (507K params, 10 minutes of CPU training on TinyStories) via WebAssembly; Generate, Models, GGUF info, Datasets and System work, while training, fine-tuning, export and serving need the desktop app." },
      links: { demo: "", video: "", poster: "", source: "https://github.com/thomascherickal/ferrum-cpu", writeup: "" },
      useCases: "Built in Rust for air-gapped enterprise environments, privacy-first local document Q&A, and edge or developer workstation inference without GPUs. Teams can prepare datasets, train small transformer models from scratch, run deterministic CPU benchmarks, export standard GGUF checkpoints for llama.cpp or Ollama, and serve models over HTTP or WebAssembly.",
      updated: "2026-11-15"
    },
    {
      id: "ferrum-gpu",
      lane: "systems",
      status: "building",
      license: "MIT",
      title: "Ferrum SLM Studio (GPU)",
      icon: "assets/ferrum/ferrum-icon.png",
      problem: "When larger SLMs need to be deployed, teams face challenges with resource allocation and performance.",
      summary: "Train, fine-tune and run small Transformer language models on any GPU in safe Rust with wgpu and WGSL. GGUF goes in and out, every kernel is checked against a CPU reference, and inference also runs in the browser on WebGPU.",
      stack: ["Rust", "wgpu", "WGSL", "WebGPU", "GGUF"],
      images: [
        { src: "assets/ferrum/ferrum-gpu/app-device.jpg", alt: "Device tab listing the GPU adapters and WebGPU support in the browser", caption: "1. See every GPU adapter" },
        { src: "assets/ferrum/ferrum-gpu/app-model.jpg", alt: "Model tab for creating or loading a model", caption: "2. Create or load a model" },
        { src: "assets/ferrum/ferrum-gpu/app-train.jpg", alt: "Train tab with a live loss curve", caption: "3. Train with a live loss curve" },
        { src: "assets/ferrum/ferrum-gpu/app-generate.jpg", alt: "Generate tab running on the server device or in this browser", caption: "4. Generate on the server or in the browser" },
        { src: "assets/ferrum/ferrum-gpu/github.jpg", alt: "The ferrum-gpu repository page on GitHub", caption: "The code is open source on GitHub" }
      ],
      run: { src: "demos/ferrum-gpu-studio/index.html", height: 760, note: "The real Ferrum GPU GUI on a preloaded 285 KB byte-level model (171K params, trained on TinyStories) with generation on this tab's WebGPU; model load/download and GGUF upload work, while training needs the desktop app." },
      links: { demo: "", video: "", poster: "", source: "https://github.com/thomascherickal/ferrum-gpu", writeup: "" },
      useCases: "Built in safe Rust with wgpu and WGSL for high-throughput on-prem LLM serving, private batch inference, code-generation pipelines, and GPU-accelerated local RAG without recurring cloud API costs. Every custom GPU shader kernel is verified against a CPU reference, supporting GGUF import/export and zero-setup browser inference via WebGPU.",
      updated: "2026-11-15"
    },
    {
      id: "go-ai-gateway",
      lane: "systems",
      status: "complete",
      license: "MIT",
      title: "Go AI Gateway — AI Traffic Control Plane",
      problem: "Every team calls LLMs its own way, so spend, data leaks, and audit are invisible.",
      summary: "A single Go gateway compiled with TinyGo to Cloudflare Workers, backed by D1 and Workers AI with native routing across Anthropic, Gemini, Grok, Llama, DeepSeek, Qwen, OpenAI, and Mistral. Enforces per-team micro-dollar budgets, PII/secret redaction, and immutable audit logs.",
      stack: ["Go", "TinyGo", "Cloudflare Workers", "Cloudflare D1", "Workers AI"],
      images: [
        { src: "assets/go-ai-gateway/go-ai-gateway-dashboard.jpg", alt: "Go AI Gateway Control Plane Dashboard showing team budgets, model routing, and audit logs", caption: "1. Control Plane Dashboard" },
        { src: "assets/go-ai-gateway/go-ai-gateway-explorer.jpg", alt: "Go AI Gateway interactive API explorer and multi-provider request tester", caption: "2. Interactive API Explorer" },
        { src: "assets/go-ai-gateway/github.jpg", alt: "The go-ai-gateway repository page on GitHub", caption: "3. Open source on GitHub" }
      ],
      run: { src: "demos/go-ai-gateway/index.html", height: 900, note: "The real Go gateway runs as WebAssembly in this tab with mock providers and demo teams; live vendor calls, D1 storage and Cloudflare deployment need your own keys." },
      links: { demo: "", video: "", poster: "", source: "https://github.com/thomascherickal/go-ai-gateway", writeup: "" },
      useCases: "Compiled with TinyGo for Cloudflare Workers to provide centralized multi-vendor LLM routing with automatic fallbacks, per-team micro-dollar budget enforcement in D1, and real-time PII and secret redaction before prompts leave your network. Compatible with OpenAI, Anthropic, and Gemini SDKs while recording immutable compliance audit logs and cost reconciliation.",
      updated: "2026-11-16"
    },

    /* ---------- Claude automations (recorded runs) ---------- */
    {
      id: "claude-pr-review-test-gaps",
      lane: "claude",
      status: "video",
      license: "MIT",
      title: "PR review that writes missing unit tests",
      problem: "Pull requests often land without tests for new edge cases.",
      summary: "Claude reads the diff on a pull request, spots untested branches, writes unit tests and pushes them to the branch.",
      stack: ["Claude Code", "GitHub Actions", "pytest"],
      links: { demo: "", video: "", poster: "", source: "", writeup: "" },
      updated: "2026-11-16"
    },
    {
      id: "claude-commit-changelog",
      lane: "claude",
      status: "video",
      license: "MIT",
      title: "Automated changelog & release notes",
      problem: "Writing release notes from dozens of commits before a tag is tedious.",
      summary: "Claude reads the commits since the last tag, groups changes into fixes and features, and updates CHANGELOG.md.",
      stack: ["Claude Code", "GitHub Actions", "Markdown"],
      links: { demo: "", video: "", poster: "", source: "", writeup: "" },
      updated: "2026-11-16"
    },
    {
      id: "claude-readme-sync",
      lane: "claude",
      status: "video",
      license: "MIT",
      title: "Keep README & API docs in sync with code",
      problem: "CLI flags and endpoints change in code while READMEs stay outdated.",
      summary: "Claude compares the latest code changes against README.md and opens a PR with updated examples and flags.",
      stack: ["Claude Code", "GitHub Actions", "Markdown"],
      links: { demo: "", video: "", poster: "", source: "", writeup: "" },
      updated: "2026-11-16"
    },
    {
      id: "claude-lint-type-fix",
      lane: "claude",
      status: "video",
      license: "MIT",
      title: "Auto-fix lint and type errors on push",
      problem: "Small lint or type errors break CI and slow down merges.",
      summary: "When CI fails on lint or type checks, Claude runs the linter locally, applies minimal fixes and pushes a clean commit.",
      stack: ["Claude Code", "ESLint", "TypeScript"],
      links: { demo: "", video: "", poster: "", source: "", writeup: "" },
      updated: "2026-11-16"
    },
    {
      id: "claude-bug-repro-test",
      lane: "claude",
      status: "video",
      license: "MIT",
      title: "Turn a GitHub issue into a failing repro test",
      problem: "Developers spend time reproducing bug reports before they can fix them.",
      summary: "Claude reads a new bug issue, writes a minimal failing test that reproduces it and attaches it to a draft PR.",
      stack: ["Claude Code", "GitHub Issues", "node:test"],
      links: { demo: "", video: "", poster: "", source: "", writeup: "" },
      updated: "2026-11-16"
    },
    {
      id: "claude-dep-bump-check",
      lane: "claude",
      status: "video",
      license: "MIT",
      title: "Dependency update & smoke-test check",
      problem: "Routine dependency bumps pile up because nobody wants to verify them.",
      summary: "Claude updates minor dependencies, runs the test suite, fixes any small breaking import and reports the result.",
      stack: ["Claude Code", "GitHub Actions", "npm"],
      links: { demo: "", video: "", poster: "", source: "", writeup: "" },
      updated: "2026-11-16"
    },
    /* ---------- AI Systems Projects ---------- */
    {
      id: "cpp-enterprise-data-guard",
      lane: "systems",
      status: "complete",
      license: "MIT",
      title: "Enterprise Data Guard",
      problem: "Developers and employees routinely paste stack traces, config files, database URIs and customer records into AI assistants.",
      summary: "Client-side C++17 / WebAssembly secret and personal-data scanner (Emscripten data_guard.wasm) with a native GTK+ 3 Admin Control Centre, a zero-trust web dashboard and a Chrome extension that redact API keys, JWTs, credit cards, SSNs and IBANs before a single byte leaves the browser.",
      stack: ["C++17", "Emscripten", "WebAssembly", "GTK+ 3", "Chrome Extension (MV3)", "Docker"],
      images: [
        { src: "assets/cpp-enterprise-data-guard/Enterprise Data Guard UI.jpg", alt: "Enterprise Data Guard web dashboard scanning and redacting secrets and PII in the browser", caption: "1. Zero-Trust Web Dashboard" },
        { src: "assets/cpp-enterprise-data-guard/GUI-Admin.jpg", alt: "Native C++ GTK+ 3 Admin Control Centre for configuring policies, allowlists and custom rules", caption: "2. C++ Admin Control Centre" },
        { src: "assets/cpp-enterprise-data-guard/github.jpg", alt: "The cpp-enterprise-data-guard repository page on GitHub", caption: "3. Open source on GitHub" }
      ],
      run: { src: "demos/data-guard-admin/index.html", height: 780, note: "The Admin Control Centre (the C++ AdminController compiled to WebAssembly, GTK window redrawn in HTML); the web dashboard is linked below it, and the Chrome extension needs a local install." },
      extension: {
        title: "Chrome extension (Manifest V3)",
        text: "Brings the same C++ WebAssembly scanner into the AI chat sites you already use, so secrets and personal data are caught before a prompt is sent.",
        points: [
          "Active on ChatGPT, Claude, Gemini, Copilot, Perplexity and Poe.",
          "Scans on send and on paste. A warning offers Cancel, Send Anyway or Replace with Safe Redacted Prompt.",
          "Toolbar popup: on/off switch, live scan counters, quick pre-flight scan, policy toggles and policy.json import.",
          "Only the storage permission; all scanning runs locally in the extension's service worker. Nothing is uploaded.",
          "Install: unzip, open chrome://extensions, turn on Developer mode, choose Load unpacked."
        ],
        download: "assets/cpp-enterprise-data-guard/enterprise-data-guard-extension.zip",
        source: "https://github.com/thomascherickal/cpp-enterprise-data-guard/tree/main/extension"
      },
      links: { demo: "", video: "", poster: "", source: "https://github.com/thomascherickal/cpp-enterprise-data-guard", writeup: "" },
      useCases: "Built in C++17 and compiled with Emscripten to WebAssembly for zero-trust browser prompt interception before sensitive data reaches external LLMs. Includes a native GTK+ 3 Admin Control Centre for managing allowlists and custom rules, a local Chrome extension for AI chat apps, and 100% client-side secret and PII redaction.",
      updated: "2026-11-16"
    },
    {
      id: "julia-ai-roi-simulation",
      lane: "science",
      status: "complete",
      license: "MIT",
      title: "AI Adoption Business Case Simulator",
      problem: "Boards want an AI business case with honest ranges (Cautious P10, Typical P50, Best-Case P90) — not a single optimistic number.",
      summary: "Models a 325-employee AI rollout across 4 departments over 36 months using 5 forecasting lenses in Julia (Monte Carlo, Agent-Based, System Dynamics, Queueing/Bottlenecks, and Bayesian Pilot Scorecard), published as Static JSON via GitHub Actions with a 5-tab web app and interactive What-If Sliders lab.",
      stack: ["Julia", "GitHub Actions", "Static JSON", "Monte Carlo", "Agent-Based"],
      images: [
        { src: "assets/julia-ai-roi-simulation/01-executive-overview-and-scenarios.png", alt: "Executive overview and scenario comparison", caption: "1. Executive Overview & Scenarios" },
        { src: "assets/julia-ai-roi-simulation/02-tab1-monte-carlo-charts.png", alt: "10,000 What-If Futures Monte Carlo P10/P50/P90 charts", caption: "2. Monte Carlo What-If Futures" },
        { src: "assets/julia-ai-roi-simulation/03-tab1-risk-drivers-and-markdown-guide.png", alt: "Risk drivers and plain-English Markdown guide", caption: "3. Risk Drivers & Guide" },
        { src: "assets/julia-ai-roi-simulation/04-tab2-team-behavior-network.png", alt: "Agent-based team behavior and AI champion network", caption: "4. Team Behavior Network" },
        { src: "assets/julia-ai-roi-simulation/05-tab3-flywheels-and-brakes.png", alt: "System dynamics flywheels and hidden brakes", caption: "5. Flywheels & Brakes" },
        { src: "assets/julia-ai-roi-simulation/06-tab4-workflow-waiting-lines.png", alt: "Workflow waiting lines and bottleneck analysis", caption: "6. Workflow Waiting Lines" },
        { src: "assets/julia-ai-roi-simulation/07-tab5-pilot-scorecard-bayesian.png", alt: "6-month Bayesian pilot scorecard", caption: "7. Bayesian Pilot Scorecard" },
        { src: "assets/julia-ai-roi-simulation/08-cross-lens-and-strategy-comparison.png", alt: "Cross-lens and strategy comparison", caption: "8. Cross-Lens Comparison" },
        { src: "assets/julia-ai-roi-simulation/09-interactive-what-if-sliders-lab.png", alt: "Interactive What-If Sliders lab", caption: "9. Interactive What-If Lab" },
        { src: "assets/julia-ai-roi-simulation/10-markdown-guide-modal-and-mermaid.png", alt: "In-UI Markdown guide modal and Mermaid diagram", caption: "10. In-UI Markdown Guide" },
        { src: "assets/julia-ai-roi-simulation/github.jpg", alt: "The julia-ai-roi-simulation repository page on GitHub", caption: "11. Open source on GitHub" }
      ],
      run: { src: "demos/julia-roi/index.html", height: 760, note: "Runs on the pre-computed simulation results (static JSON); re-running the Julia models themselves needs a local Julia install." },
      links: { demo: "", video: "", poster: "", source: "https://github.com/thomascherickal/julia-ai-roi-simulation", writeup: "" },
      useCases: "Written in Julia to model board-ready AI adoption business cases with honest P10, P50, and P90 confidence bands instead of single-point guesses. Simulates 325 employees across four departments over 36 months using Monte Carlo, agent-based, system dynamics, queueing, and Bayesian pilot checkpoint lenses exported to an interactive web lab.",
      updated: "2026-11-17"
    }
  ],

  /* ---------- PWA apps on GitHub Pages (already built) ---------- */
  pwas: [
    {
      name: "Budget Tracker",
      purpose: "Track personal income, expenses and savings offline in your browser.",
      url: "https://thomascherickal.github.io/Budget-Tracker/",
      icon: "assets/PWAs/Budget-Tracker.jpg",
      source: "https://github.com/thomascherickal/Budget-Tracker",
      sourceDesc: "Vanilla HTML, CSS, and JavaScript progressive web app using browser localStorage and service workers for offline-first personal finance tracking. Users can log daily income and expenses, organize spending across custom categories, monitor monthly savings targets, and view instant balance summaries with zero backend servers, accounts, or external data sharing."
    },
    {
      name: "LinkedIn Profile Score",
      purpose: "Audit and score your LinkedIn profile for recruiter visibility.",
      url: "https://thomascherickal.github.io/LinkedIn-Profile-Score-App/",
      icon: "assets/PWAs/LinkedIn Authority Suite.png",
      source: "https://github.com/thomascherickal/LinkedIn-Profile-Score-App",
      sourceDesc: "Client-side profile scoring rubric and interactive audit checklist built in plain HTML, CSS, and JavaScript. Evaluates LinkedIn headlines, about sections, experience bullets, featured media, and keyword density against recruiter search criteria, giving professionals immediate, actionable feedback and a clear score breakdown without requiring login or storing personal data."
    },
    {
      name: "Top 10 AI Tools Finder",
      purpose: "Discover the top 10 AI tools tailored to your workflow and role.",
      url: "https://thomascherickal.github.io/Top-10-AI-Tools-Finder-App/",
      icon: "https://raw.githubusercontent.com/thomascherickal/Top-10-AI-Tools-Finder-App/master/Screenshot.png",
      source: "https://github.com/thomascherickal/Top-10-AI-Tools-Finder-App",
      sourceDesc: "Static client-side recommendation engine built with vanilla HTML, CSS, and JavaScript that matches user roles, goals, and daily workflows to ten curated AI tools. Evaluates productivity needs, budget constraints, and automation use cases in the browser with instant filtering, side-by-side comparisons, and zero backend servers or user tracking."
    },
    {
      name: "Tech Jobs Roadmap",
      purpose: "Interactive career roadmap for breaking into and advancing in tech roles.",
      url: "https://thomascherickal.github.io/Tech-Jobs-RoadMap-App/",
      icon: "https://raw.githubusercontent.com/thomascherickal/Tech-Jobs-RoadMap-App/master/Screenshot.png",
      source: "https://github.com/thomascherickal/Tech-Jobs-RoadMap-App",
      sourceDesc: "Interactive milestone and skill-tree web application built in vanilla HTML, CSS, and JavaScript to help engineers plan structured learning paths across modern software tracks. Users can explore role requirements, track core technical competencies, bookmark key resources, and prepare for career transitions with offline PWA support and local progress persistence."
    },
    {
      name: "Inbound Signal Scorer",
      purpose: "Score and prioritize inbound recruiter and job-search signals.",
      url: "https://thomascherickal.github.io/inbound-signal-scorer/",
      icon: "assets/PWAs/LinkedIn Inbouund Scorer.png",
      source: "https://github.com/thomascherickal/inbound-signal-scorer",
      sourceDesc: "Zero-dependency client-side scoring calculator built with vanilla HTML, CSS, and JavaScript for evaluating inbound recruiter outreach quality, role alignment, and compensation signals. Helps technical professionals quickly separate high-signal opportunities from generic templates using structured weighted criteria that run completely offline in the browser with zero data collection."
    },
    {
      name: "ATS Resume Builder Pro",
      purpose: "Build an ATS-friendly resume and view your compatibility score live.",
      url: "https://thomascherickal.github.io/ats-resume-builder-pro/",
      icon: "assets/PWAs/ATS Resume Builder.png",
      source: "https://github.com/thomascherickal/ats-resume-builder-pro",
      sourceDesc: "Browser-based resume editor built in plain HTML, CSS, and JavaScript with real-time applicant tracking keyword matching, live compatibility scoring, and structured section templates. Candidates can tailor bullet points to specific job descriptions, verify formatting compliance, save drafts locally via browser storage, and export clean print-ready PDF resumes offline."
    }
  ]
};
