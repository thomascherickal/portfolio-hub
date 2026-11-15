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
      status: "building",
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
      updated: "2026-11-15"
    },

    /* ---------- Claude automations (recorded runs) ---------- */
    {
      id: "claude-pr-review-test-gaps",
      lane: "claude",
      status: "video",
      title: "PR review that writes the missing tests",
      problem: "AI-written code is arriving faster than senior engineers can review it.",
      summary: "A Claude Code GitHub Action reviews every pull request, flags risky changes, then opens a follow-up commit with the tests the change was missing.",
      stack: ["Claude Code GitHub Actions", "Skills", "pytest", "cargo test"],
      links: { demo: "", video: "", poster: "", source: "", writeup: "" },
      updated: "2026-11-14"
    },
    {
      id: "claude-incident-first-responder",
      lane: "claude",
      status: "video",
      title: "Incident first responder",
      problem: "On-call engineers lose the first 30 minutes of an incident gathering context.",
      summary: "When an alert fires, a Claude agent pulls logs, recent deploys and similar past incidents through MCP, then posts a draft diagnosis and runbook steps for a human to act on.",
      stack: ["Claude Agent SDK", "MCP", "GitHub Actions"],
      links: { demo: "", video: "", poster: "", source: "", writeup: "" },
      updated: "2026-11-14"
    },
    {
      id: "claude-ai-spend-report",
      lane: "claude",
      status: "video",
      title: "Weekly AI adoption and spend report",
      problem: "Leadership cannot see which teams get value from AI tools and what it costs.",
      summary: "A scheduled Claude routine turns usage exports into a one-page report per team: spend, wins, risks and the next three things to try.",
      stack: ["Claude Code routines", "Claude Agent SDK", "Python"],
      links: { demo: "", video: "", poster: "", source: "", writeup: "" },
      updated: "2026-11-14"
    },
    {
      id: "go-ai-traffic-control",
      lane: "systems",
      status: "building",
      title: "AI traffic control plane",
      problem: "Every team calls LLMs its own way, so spend, data leaks and audit are invisible.",
      summary: "A Go gateway every internal tool calls instead of the model directly: per-team budgets, personal-data redaction, model routing and a full audit log.",
      stack: ["Go", "TinyGo", "Workers", "D1", "Workers AI"],
      links: { demo: "", video: "", poster: "", source: "", writeup: "" },
      updated: "2026-11-14"
    },
    {
      id: "genai-ticket-to-plan",
      lane: "genai",
      status: "building",
      title: "Ticket to implementation plan",
      problem: "Sprint planning stalls on vague tickets and guesswork estimates.",
      summary: "Paste an issue and get affected files, an implementation plan, a test plan and an estimate with a stated confidence level.",
      stack: ["Python Workers", "FastAPI", "Workers AI"],
      links: { demo: "", video: "", poster: "", source: "", writeup: "" },
      updated: "2026-11-14"
    },
    {
      id: "rag-incident-memory",
      lane: "rag",
      status: "building",
      title: "Incident memory",
      problem: "The fix for today's outage is usually buried in a postmortem nobody remembers.",
      summary: "Retrieval over past postmortems and runbooks that returns the three most similar incidents and what fixed them, with citations.",
      stack: ["Python Workers", "Vectorize", "Workers AI"],
      links: { demo: "", video: "", poster: "", source: "", writeup: "" },
      updated: "2026-11-14"
    },
    {
      id: "rag-ai-policy-desk",
      lane: "rag",
      status: "building",
      title: "AI policy desk",
      problem: "Engineers keep asking whether they may paste client code into an AI tool.",
      summary: "Answers questions about the company's AI usage policy and the standards behind it, quoting the exact clause every time.",
      stack: ["AI Search", "Workers", "Workers AI"],
      links: { demo: "", video: "", poster: "", source: "", writeup: "" },
      updated: "2026-11-14"
    },
    {
      id: "cpp-pii-secret-guard",
      lane: "systems",
      status: "building",
      title: "Secret and personal-data guard",
      problem: "Keys and customer data leak into prompts before anyone notices.",
      summary: "A C++ scanner compiled to WebAssembly that checks text and code for secrets and personal data in the browser, before it reaches any AI tool.",
      stack: ["C++", "Emscripten", "WebAssembly"],
      links: { demo: "", video: "", poster: "", source: "", writeup: "" },
      updated: "2026-11-14"
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
    { name: "Top 10 AI Tools Finder", purpose: "Discover the top 10 AI tools tailored to your workflow and role.", url: "https://github.com/thomascherickal/Top-10-AI-Tools-Finder-App", icon: "https://raw.githubusercontent.com/thomascherickal/Top-10-AI-Tools-Finder-App/master/Screenshot.png" },
    { name: "Tech Jobs Roadmap", purpose: "Interactive career roadmap for breaking into and advancing in tech roles.", url: "https://thomascherickal.github.io/Tech-Jobs-RoadMap-App/", icon: "https://raw.githubusercontent.com/thomascherickal/Tech-Jobs-RoadMap-App/master/Screenshot.png" },
    { name: "Inbound Signal Scorer", purpose: "Score and prioritize inbound recruiter and job-search signals.", url: "https://thomascherickal.github.io/inbound-signal-scorer/", icon: "assets/PWAs/LinkedIn Inbouund Scorer.png" },
    { name: "ATS Resume Builder Pro", purpose: "Build an ATS-friendly resume and view your compatibility score live.", url: "https://thomascherickal.github.io/ats-resume-builder-pro/", icon: "assets/PWAs/ATS Resume Builder.png" }
  ]
};
