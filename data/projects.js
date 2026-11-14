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
  - updated     YYYY-MM-DD, shown on the card
*/

window.PORTFOLIO = {
  site: {
    name: "Thomas Cherickal",
    role: "Generative AI Consultant",
    brand: "The Digital Futurist",
    headline: "Working proof that a software company can run AI-first. The Future is Now.",
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
      brain: "https://brain.thedigitalfuturist.com"
    }
  },

  lanes: {
    claude:    { label: "Automations",        tone: "gold" },
    genai:     { label: "Gen AI",             tone: "magenta" },
    rag:       { label: "RAG",                tone: "magenta" },
    systems:   { label: "Systems",            tone: "cyan" },
    science:   { label: "Scientific",         tone: "violet" },
    knowledge: { label: "Knowledge",          tone: "violet" }
  },

  projects: [
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

    /* ---------- Live demos ---------- */
    {
      id: "rust-SLM-creation-training-export-engine for CPU",
      lane: "systems",
      status: "building",
      title: "Ferrum SLM Studio (CPU)",
      problem: "Teams need fast, private inference for small models without a GPU bill.",
      summary: "A full Rust SLM Studio for creation, training, fine-tuning, and exporting to GGUF on CPUcompiled to WebAssembly, showing tokens per second and memory use live in the browser.",
      stack: ["Rust", "WebAssembly", "Zero-Dependency"],
      links: { demo: "", video: "", poster: "", source: "", writeup: "" },
      updated: "2026-11-14"
    },
    {
      id: "rust-SLM-creation-training-export-engine for GPU",
      lane: "systems",
      status: "building",
      title: "Ferrum SLM Studio (GPU)",
      problem: "When larger SLMs need to be deployed, teams face challenges with resource allocation and performance.",
      summary: "A full Rust SLM Studio for creation, training, fine-tuning, and exporting to GGUF on GPU compiled to WebAssembly, showing tokens per second and memory use live in the browser.",
      stack: ["Rust", "WebAssembly", "Zero-Dependency"],
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
    },
    {
      id: "second-brain-engineering-handbook",
      lane: "knowledge",
      status: "building",
      title: "Agent-readable engineering handbook",
      problem: "People and coding agents follow different, drifting versions of the team's rules.",
      summary: "One Markdown handbook published for people with Quartz and for agents with llms.txt, so both read the same source of truth.",
      stack: ["Markdown", "Quartz", "Cloudflare Pages"],
      links: { demo: "", video: "", poster: "", source: "", writeup: "" },
      updated: "2026-11-14"
    }
  ],

  /* ---------- PWA apps on GitHub Pages (already built) ---------- */
  pwas: [
    { name: "PWA app one",   purpose: "TODO: one-line purpose", url: "https://thedigitalfuturist.com/", icon: "" },
    { name: "PWA app two",   purpose: "TODO: one-line purpose", url: "https://thedigitalfuturist.com/", icon: "" },
    { name: "PWA app three", purpose: "TODO: one-line purpose", url: "https://thedigitalfuturist.com/", icon: "" },
    { name: "PWA app one",   purpose: "TODO: one-line purpose", url: "https://thedigitalfuturist.com/", icon: "" },
    { name: "PWA app two",   purpose: "TODO: one-line purpose", url: "https://thedigitalfuturist.com/", icon: "" },
    { name: "PWA app three", purpose: "TODO: one-line purpose", url: "https://thedigitalfuturist.com/", icon: "" }
  ]
};
