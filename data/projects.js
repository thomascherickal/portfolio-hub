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
      book: "https://topmate.io/thomascherickal",
      site: "https://thomascherickal.com",
      consulting: "https://thedigitalfuturist.com",
      linkedin: "https://www.linkedin.com/in/thomascherickal",
      x: "https://x.com/thomazcherickal",
      patreon: "https://www.patreon.com/thomascherickal",
      newsletter: "https://thomascherickal.kit.com",
      github: "https://github.com/thomascherickal",
      brain: "https://skills.thedigitalfuturist.com"
    }
  },

  lanes: {
    claude: { label: "Automations", tone: "gold" },
    genai: { label: "Gen AI", tone: "magenta" },
    rag: { label: "RAG", tone: "magenta" },
    systems: { label: "Systems", tone: "cyan" },
    science: { label: "Scientific", tone: "violet" },
    knowledge: { label: "Knowledge", tone: "violet" }
  },

  projects: [
    /* ---------- Live demos ---------- */
    {
      id: "ferrum-cpu",
      lane: "systems",
      status: "complete",
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
      links: { demo: "", video: "", poster: "", source: "https://github.com/thomascherickal/ferrum-cpu", writeup: "" },
      useCases: "Use cases: air-gapped enterprise environments, privacy-first local document Q&A, edge/workstation inference without GPUs, and deterministic CPU benchmarking.",
      updated: "2026-11-15"
    },
    {
      id: "ferrum-gpu",
      lane: "systems",
      status: "building",
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
      links: { demo: "", video: "", poster: "", source: "https://github.com/thomascherickal/ferrum-gpu", writeup: "" },
      useCases: "Use cases: high-throughput on-prem LLM serving, private batch inference and code-generation pipelines, and GPU-accelerated local RAG without cloud API costs.",
      updated: "2026-11-15"
    },
    {
      id: "go-ai-gateway",
      lane: "systems",
      status: "complete",
      title: "Go AI Gateway — AI Traffic Control Plane",
      problem: "Every team calls LLMs its own way, so spend, data leaks, and audit are invisible.",
      summary: "A single Go gateway compiled with TinyGo to Cloudflare Workers, backed by D1 and Workers AI with native routing across Anthropic, Gemini, Grok, Llama, DeepSeek, Qwen, OpenAI, and Mistral. Enforces per-team micro-dollar budgets, PII/secret redaction, and immutable audit logs.",
      stack: ["Go", "TinyGo", "Cloudflare Workers", "Cloudflare D1", "Workers AI"],
      images: [
        { src: "assets/go-ai-gateway/go-ai-gateway-dashboard.jpg", alt: "Go AI Gateway Control Plane Dashboard showing team budgets, model routing, and audit logs", caption: "1. Control Plane Dashboard" },
        { src: "assets/go-ai-gateway/go-ai-gateway-explorer.jpg", alt: "Go AI Gateway interactive API explorer and multi-provider request tester", caption: "2. Interactive API Explorer" },
        { src: "assets/go-ai-gateway/github.jpg", alt: "The go-ai-gateway repository page on GitHub", caption: "3. Open source on GitHub" }
      ],
      links: { demo: "", video: "", poster: "", source: "https://github.com/thomascherickal/go-ai-gateway", writeup: "" },
      useCases: "Use cases: centralized multi-vendor LLM routing with fallbacks, per-team micro-dollar budget enforcement, automatic PII and secret redaction before prompts leave your network, and immutable compliance audit logging.",
      updated: "2026-11-16"
    },

    /* ---------- Claude automations (recorded runs) ---------- */
    {
      id: "claude-pr-review-test-gaps",
      lane: "claude",
      status: "video",
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
      title: "Enterprise Data Guard",
      problem: "Developers and employees routinely paste stack traces, config files, database URIs and customer records into AI assistants.",
      summary: "Client-side C++17 / WebAssembly secret and personal-data scanner (Emscripten data_guard.wasm) with a native GTK+ 3 Admin Control Centre and zero-trust web dashboard that redacts API keys, JWTs, credit cards, SSNs and IBANs before a single byte leaves the browser.",
      stack: ["C++17", "Emscripten", "WebAssembly", "GTK+ 3", "Docker"],
      images: [
        { src: "assets/cpp-enterprise-data-guard/Enterprise Data Guard UI.jpg", alt: "Enterprise Data Guard web dashboard scanning and redacting secrets and PII in the browser", caption: "1. Zero-Trust Web Dashboard" },
        { src: "assets/cpp-enterprise-data-guard/GUI-Admin.jpg", alt: "Native C++ GTK+ 3 Admin Control Centre for configuring policies, allowlists and custom rules", caption: "2. C++ Admin Control Centre" },
        { src: "assets/cpp-enterprise-data-guard/github.jpg", alt: "The cpp-enterprise-data-guard repository page on GitHub", caption: "3. Open source on GitHub" }
      ],
      links: { demo: "", video: "", poster: "", source: "https://github.com/thomascherickal/cpp-enterprise-data-guard", writeup: "" },
      useCases: "Use cases: zero-trust browser prompt interception before data reaches external LLMs, centralized security policy & allowlist management via native GTK3 GUI, and 100% client-side secret/PII redaction for regulated enterprises.",
      updated: "2026-11-16"
    },
    {
      id: "julia-ai-roi-simulator",
      lane: "science",
      status: "building",
      title: "AI adoption ROI simulator",
      problem: "Boards want an AI business case with honest ranges, not a single optimistic number.",
      summary: "A Julia Monte Carlo model of rollout speed, productivity change and cost per team, published as precomputed scenarios you can explore.",
      stack: ["Julia", "GitHub Actions", "Static JSON"],
      links: { demo: "", video: "", poster: "", source: "", writeup: "" },
      updated: "2026-11-14"
    }
  ],

  /* ---------- PWA apps on GitHub Pages (already built) ---------- */
  pwas: [
    { name: "Budget Tracker", purpose: "Track personal income, expenses and savings offline in your browser.", url: "https://thomascherickal.github.io/Budget-Tracker/", icon: "assets/PWAs/Budget-Tracker.jpg" },
    { name: "LinkedIn Profile Score", purpose: "Audit and score your LinkedIn profile for recruiter visibility.", url: "https://thomascherickal.github.io/LinkedIn-Profile-Score-App/", icon: "assets/PWAs/LinkedIn Authority Suite.png" },
    { name: "Top 10 AI Tools Finder", purpose: "Discover the top 10 AI tools tailored to your workflow and role.", url: "https://thomascherickal.github.io/Top-10-AI-Tools-Finder-App/", icon: "https://raw.githubusercontent.com/thomascherickal/Top-10-AI-Tools-Finder-App/master/Screenshot.png" },
    { name: "Tech Jobs Roadmap", purpose: "Interactive career roadmap for breaking into and advancing in tech roles.", url: "https://thomascherickal.github.io/Tech-Jobs-RoadMap-App/", icon: "https://raw.githubusercontent.com/thomascherickal/Tech-Jobs-RoadMap-App/master/Screenshot.png" },
    { name: "Inbound Signal Scorer", purpose: "Score and prioritize inbound recruiter and job-search signals.", url: "https://thomascherickal.github.io/inbound-signal-scorer/", icon: "assets/PWAs/LinkedIn Inbouund Scorer.png" },
    { name: "ATS Resume Builder Pro", purpose: "Build an ATS-friendly resume and view your compatibility score live.", url: "https://thomascherickal.github.io/ats-resume-builder-pro/", icon: "assets/PWAs/ATS Resume Builder.png" }
  ]
};
