/*
  PORTFOLIO DATA - the only file you edit to update the hub.

  To add a project:  copy one object in `projects`, change the fields, commit, push.
  Cloudflare Pages rebuilds automatically (one build per push; 500 builds/month free).

  Field guide
  - id          unique, lowercase, hyphens only (used for links like #ferrum-cpu)
  - lane        one of: "genai", "rag", "systems", "science", "knowledge"
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
  - license     License tag shown as a badge linking to /LICENSE (all projects are Dual-License-Open-Commercial)
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
      "Live demos of the systems I build for engineering teams moving to AI-first delivery: AI-first projects, and the Rust, Go, C++ and Julia underneath them.",
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
    genai: { label: "Gen AI", tone: "gold" },
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
      license: "Dual-License-Open-Commercial",
      title: "Ferrum SLM Studio (CPU)",
      icon: "assets/ferrum/ferrum-icon.png",
      problem: "Teams need fast, private inference for small models without a GPU bill.",
      summary: "A Rust studio to create, train, fine-tune and run small Transformer language models on the CPU, no GPU needed. Its GGUF exports run in llama.cpp, Ollama and LM Studio, and the engine compiles to WebAssembly for the browser.",
      stack: ["Rust", "WebAssembly", "GGUF", "Tauri"],
      images: [
        { src: "assets/ferrum/ferrum-cpu/screenshots/dark-app-datasets.jpg", lightSrc: "assets/ferrum/ferrum-cpu/screenshots/light-app-datasets.jpg", alt: "Datasets tab for fetching and cleaning a training corpus", caption: "1. Fetch and clean a corpus" },
        { src: "assets/ferrum/ferrum-cpu/screenshots/dark-app-prepare.jpg", lightSrc: "assets/ferrum/ferrum-cpu/screenshots/light-app-prepare.jpg", alt: "Prepare tab for turning raw text into training data", caption: "2. Prepare the training data" },
        { src: "assets/ferrum/ferrum-cpu/screenshots/dark-app-models.jpg", lightSrc: "assets/ferrum/ferrum-cpu/screenshots/light-app-models.jpg", alt: "Models tab for browsing and managing local SLM checkpoints", caption: "3. Browse and manage models" },
        { src: "assets/ferrum/ferrum-cpu/screenshots/dark-app-train.jpg", lightSrc: "assets/ferrum/ferrum-cpu/screenshots/light-app-train.jpg", alt: "Train tab with corpus, model output and model shape settings", caption: "4. Train a transformer from scratch" },
        { src: "assets/ferrum/ferrum-cpu/screenshots/dark-app-finetune.jpg", lightSrc: "assets/ferrum/ferrum-cpu/screenshots/light-app-finetune.jpg", alt: "Fine-tune tab for adapting a model to domain data on CPU", caption: "5. Fine-tune on domain data" },
        { src: "assets/ferrum/ferrum-cpu/screenshots/dark-app-evaluate.jpg", lightSrc: "assets/ferrum/ferrum-cpu/screenshots/light-app-evaluate.jpg", alt: "Evaluate tab for measuring perplexity and benchmark metrics", caption: "6. Evaluate model quality" },
        { src: "assets/ferrum/ferrum-cpu/screenshots/dark-app-generate.jpg", lightSrc: "assets/ferrum/ferrum-cpu/screenshots/light-app-generate.jpg", alt: "Generate tab with seed text, sampling settings and live streaming", caption: "7. Generate with live streaming" },
        { src: "assets/ferrum/ferrum-cpu/screenshots/dark-app-gguf.jpg", lightSrc: "assets/ferrum/ferrum-cpu/screenshots/light-app-gguf.jpg", alt: "GGUF tab for importing and running a Llama or Qwen checkpoint", caption: "8. Import and run Llama and Qwen GGUF" },
        { src: "assets/ferrum/ferrum-cpu/screenshots/dark-app-export.jpg", lightSrc: "assets/ferrum/ferrum-cpu/screenshots/light-app-export.jpg", alt: "Export tab for writing a GGUF that runs in llama.cpp, Ollama and LM Studio", caption: "9. Export GGUF for llama.cpp, Ollama and LM Studio" },
        { src: "assets/ferrum/ferrum-cpu/screenshots/dark-app-serve.jpg", lightSrc: "assets/ferrum/ferrum-cpu/screenshots/light-app-serve.jpg", alt: "Serve tab for running the model behind an HTTP server", caption: "10. Serve it over HTTP" },
        { src: "assets/ferrum/ferrum-cpu/screenshots/dark-app-system.jpg", lightSrc: "assets/ferrum/ferrum-cpu/screenshots/light-app-system.jpg", alt: "System tab showing CPU threads, memory and live resource telemetry", caption: "11. System telemetry & threads" },
        { src: "assets/ferrum/ferrum-cpu/screenshots/dark-app-capable.jpg", lightSrc: "assets/ferrum/ferrum-cpu/screenshots/light-app-capable.jpg", alt: "Capable tab checking CPU and WebAssembly capabilities", caption: "12. Hardware capability check" },
        { src: "assets/ferrum/ferrum-cpu/github.jpg", lightSrc: "assets/ferrum/ferrum-cpu/github-light.jpg", alt: "The ferrum-cpu repository page on GitHub", caption: "13. The code is open source on GitHub" }
      ],
      run: { src: "demos/ferrum-cpu-studio/index.html", height: 760, note: "Runs the Ferrum SLM Studio UI on a preloaded 620 KB model via WebAssembly. Generate, Models, GGUF info, Datasets, and System work in the browser; training, fine-tuning, GGUF export, and HTTP serving require the desktop app. On mobiles and tablets, token streaming is slower and large GGUF uploads may hit browser memory limits." },
      links: { demo: "", video: "", poster: "", source: "https://github.com/thomascherickal/ferrum-cpu", writeup: "" },
      useCases: "Built in Rust for air-gapped enterprise environments, privacy-first local document Q&A, and edge or developer workstation inference without GPUs. Teams can prepare datasets, train small transformer models from scratch, run deterministic CPU benchmarks, export standard GGUF checkpoints for llama.cpp or Ollama, and serve models over HTTP or WebAssembly.",
      aiPoints: [
        "Edge & Sovereign AI: Eliminates cloud GPU dependencies by training and serving compact domain-specific Small Language Models (SLMs) directly on commodity CPUs, laptops, and air-gapped industrial hardware.",
        "Zero-Cost Prototyping & Education: Enables AI engineering teams to inspect every transformer layer, tokenization step, and loss curve locally before scaling to expensive multi-node clusters.",
        "Portable Model Interoperability: Exports standard GGUF checkpoints compatible with llama.cpp, Ollama, and LM Studio, bridging custom Rust research into production local-AI stacks.",
        "In-Browser WebAssembly Inference: Compiles the inference engine to WASM for zero-latency, privacy-preserving client-side AI assistants without server round-trips."
      ],
      updated: "2026-11-15"
    },
    {
      id: "ferrum-gpu",
      lane: "systems",
      status: "building",
      license: "Dual-License-Open-Commercial",
      title: "Ferrum SLM Studio (GPU)",
      icon: "assets/ferrum/ferrum-icon.png",
      problem: "When larger SLMs need to be deployed, teams face challenges with resource allocation and performance.",
      summary: "Train, fine-tune and run small Transformer language models on any GPU in safe Rust with wgpu and WGSL. GGUF goes in and out, every kernel is checked against a CPU reference, and inference also runs in the browser on WebGPU.",
      stack: ["Rust", "wgpu", "WGSL", "WebGPU", "GGUF"],
      images: [
        { src: "assets/ferrum/ferrum-gpu/dark-app-datasets.jpg", lightSrc: "assets/ferrum/ferrum-gpu/light-app-datasets.jpg", alt: "Datasets tab for selecting and fetching a training corpus", caption: "1. Datasets" },
        { src: "assets/ferrum/ferrum-gpu/dark-app-prepare.jpg", lightSrc: "assets/ferrum/ferrum-gpu/light-app-prepare.jpg", alt: "Prepare tab for tokenizing and formatting training data", caption: "2. Prepare training data" },
        { src: "assets/ferrum/ferrum-gpu/dark-app-gtrain.jpg", lightSrc: "assets/ferrum/ferrum-gpu/light-app-gtrain.jpg", alt: "Train tab for GPU training runs", caption: "3. GPU Train" },
        { src: "assets/ferrum/ferrum-gpu/dark-app-models.jpg", lightSrc: "assets/ferrum/ferrum-gpu/light-app-models.jpg", alt: "Models tab for managing local GPU checkpoints", caption: "4. Models" },
        { src: "assets/ferrum/ferrum-gpu/dark-app-finetune.jpg", lightSrc: "assets/ferrum/ferrum-gpu/light-app-finetune.jpg", alt: "Fine-tune tab for adapting models on GPU", caption: "5. Fine-tune" },
        { src: "assets/ferrum/ferrum-gpu/dark-app-evaluate.jpg", lightSrc: "assets/ferrum/ferrum-gpu/light-app-evaluate.jpg", alt: "Evaluate tab showing validation loss and perplexity metrics", caption: "6. Evaluate" },
        { src: "assets/ferrum/ferrum-gpu/dark-app-ggen.jpg", lightSrc: "assets/ferrum/ferrum-gpu/light-app-ggen.jpg", alt: "Generate tab for GPU text generation", caption: "7. Generate" },
        { src: "assets/ferrum/ferrum-gpu/dark-app-export.jpg", lightSrc: "assets/ferrum/ferrum-gpu/light-app-export.jpg", alt: "Export tab for saving GGUF checkpoints", caption: "8. Export GGUF" },
        { src: "assets/ferrum/ferrum-gpu/dark-app-serve.jpg", lightSrc: "assets/ferrum/ferrum-gpu/light-app-serve.jpg", alt: "Serve tab for exposing the GPU model over HTTP", caption: "9. Serve over HTTP" },
        { src: "assets/ferrum/ferrum-gpu/dark-app-capable.jpg", lightSrc: "assets/ferrum/ferrum-gpu/light-app-capable.jpg", alt: "Capable tab checking GPU and WebGPU shader capabilities", caption: "10. Hardware capabilities" },
        { src: "assets/ferrum/ferrum-gpu/dark-app-gpulab.jpg", lightSrc: "assets/ferrum/ferrum-gpu/light-app-gpulab.jpg", alt: "GPU Lab overview for shader benchmarking and inspection", caption: "11. GPU Lab" },
        { src: "assets/ferrum/ferrum-gpu/dark-app-device.jpg", lightSrc: "assets/ferrum/ferrum-gpu/light-app-device.jpg", alt: "Device tab listing GPU adapters and WebGPU support", caption: "12. GPU Adapters & WebGPU" },
        { src: "assets/ferrum/ferrum-gpu/dark-app-model.jpg", lightSrc: "assets/ferrum/ferrum-gpu/light-app-model.jpg", alt: "Lab: model tab for creating or loading a model", caption: "13. Lab: Model" },
        { src: "assets/ferrum/ferrum-gpu/dark-app-train.jpg", lightSrc: "assets/ferrum/ferrum-gpu/light-app-train.jpg", alt: "Lab: train tab with live loss curve", caption: "14. Lab: Train" },
        { src: "assets/ferrum/ferrum-gpu/dark-app-generate.jpg", lightSrc: "assets/ferrum/ferrum-gpu/light-app-generate.jpg", alt: "Lab: generate tab running on server or browser WebGPU", caption: "15. Lab: Generate" },
        { src: "assets/ferrum/ferrum-gpu/github.jpg", lightSrc: "assets/ferrum/ferrum-gpu/github-light.jpg", alt: "The ferrum-gpu repository page on GitHub", caption: "16. The code is open source on GitHub" }
      ],
      run: { src: "demos/ferrum-gpu-studio/index.html", height: 760, note: "Runs the Ferrum GPU GUI on a preloaded 285 KB model via WebGPU; generation, model inspection, and GGUF upload work in WebGPU-capable browsers, while training requires the desktop app. On mobiles and tablets without WebGPU (older iOS Safari / Android browsers), GPU inference will not work and a link to the CPU WebAssembly edition is provided." },
      links: { demo: "", video: "", poster: "", source: "https://github.com/thomascherickal/ferrum-gpu", writeup: "" },
      useCases: "Built in safe Rust with wgpu and WGSL for high-throughput on-prem LLM serving, private batch inference, code-generation pipelines, and GPU-accelerated local RAG without recurring cloud API costs. Every custom GPU shader kernel is verified against a CPU reference, supporting GGUF import/export and zero-setup browser inference via WebGPU.",
      aiPoints: [
        "Vendor-Neutral GPU Acceleration: Uses WebGPU (wgpu/WGSL) instead of proprietary CUDA lock-in, unlocking local SLM training and inference across NVIDIA, AMD, Apple Silicon, and integrated GPUs.",
        "Deterministic Kernel Verification: Cross-checks every GPU compute shader against a safe Rust CPU reference, preventing silent numerical drift in quantized inference and fine-tuning.",
        "Private Enterprise RAG & Codegen: Powers high-throughput on-premise batch processing and retrieval-augmented generation with predictable hardware costs and zero external data exposure.",
        "Browser-Native WebGPU Execution: Delivers hardware-accelerated transformer generation directly inside modern web browsers with zero local installation."
      ],
      updated: "2026-11-15"
    },
    {
      id: "valkyrie-agent-studio",
      lane: "systems",
      status: "complete",
      license: "Dual-License-Open-Commercial",
      title: "Valkyrie Agent Studio",
      problem: "Teams struggle to design, test, optimize, and ship reliable AI agents across roles without vendor lock-in or brittle scripts.",
      summary: "Standalone desktop platform (Tauri Rust Shell, TypeScript, React, FastAPI, and 242-crate Cargo Workspace) with 240 focused agents across 12 tech company roles (20 per role), free-first LLM routing, local pymoo genetic-algorithm prompt optimization, and one-click IR-to-Rust compilation.",
      stack: ["Rust", "Tauri", "TypeScript", "React", "FastAPI", "Python"],
      images: [
        { src: "assets/python-valkyrie-ai-agent-studio/dark-01-secrets-gemini-model.jpg", lightSrc: "assets/python-valkyrie-ai-agent-studio/light-01-secrets-gemini-model.jpg", alt: "Valkyrie Studio Secrets pane with Gemini Model dropdown open", caption: "1. Secrets — Gemini Model Options" },
        { src: "assets/python-valkyrie-ai-agent-studio/dark-02-secrets-openrouter-model.jpg", lightSrc: "assets/python-valkyrie-ai-agent-studio/light-02-secrets-openrouter-model.jpg", alt: "Valkyrie Studio Secrets pane with OpenRouter Model dropdown open", caption: "2. Secrets — OpenRouter Free Models" },
        { src: "assets/python-valkyrie-ai-agent-studio/dark-03-secrets-opencode-model.jpg", lightSrc: "assets/python-valkyrie-ai-agent-studio/light-03-secrets-opencode-model.jpg", alt: "Valkyrie Studio Secrets pane with OpenCode Model dropdown open", caption: "3. Secrets — OpenCode Free Models" },
        { src: "assets/python-valkyrie-ai-agent-studio/dark-04-pm-prd-architect-run.jpg", lightSrc: "assets/python-valkyrie-ai-agent-studio/light-04-pm-prd-architect-run.jpg", alt: "Product Management — PRD Architect Run pane", caption: "4. Product Management · PRD Architect — Run" },
        { src: "assets/python-valkyrie-ai-agent-studio/dark-05-pm-prd-architect-about.jpg", lightSrc: "assets/python-valkyrie-ai-agent-studio/light-05-pm-prd-architect-about.jpg", alt: "Product Management — PRD Architect About this agent pane", caption: "5. Product Management · PRD Architect — About" },
        { src: "assets/python-valkyrie-ai-agent-studio/dark-06-pm-prd-architect-create.jpg", lightSrc: "assets/python-valkyrie-ai-agent-studio/light-06-pm-prd-architect-create.jpg", alt: "Product Management — PRD Architect Create agent pane", caption: "6. Product Management · PRD Architect — Create Agent" },
        { src: "assets/python-valkyrie-ai-agent-studio/dark-07-pm-prd-architect-design.jpg", lightSrc: "assets/python-valkyrie-ai-agent-studio/light-07-pm-prd-architect-design.jpg", alt: "Product Management — PRD Architect Design pane", caption: "7. Product Management · PRD Architect — Design" },
        { src: "assets/python-valkyrie-ai-agent-studio/dark-08-pm-prd-architect-python.jpg", lightSrc: "assets/python-valkyrie-ai-agent-studio/light-08-pm-prd-architect-python.jpg", alt: "Product Management — PRD Architect Python code pane", caption: "8. Product Management · PRD Architect — Python" },
        { src: "assets/python-valkyrie-ai-agent-studio/dark-09-pm-roadmap-prioritizer-run.jpg", lightSrc: "assets/python-valkyrie-ai-agent-studio/light-09-pm-roadmap-prioritizer-run.jpg", alt: "Product Management — Roadmap Prioritizer Run pane", caption: "9. Product Management · Roadmap Prioritizer — Run" },
        { src: "assets/python-valkyrie-ai-agent-studio/dark-10-pm-roadmap-prioritizer-about.jpg", lightSrc: "assets/python-valkyrie-ai-agent-studio/light-10-pm-roadmap-prioritizer-about.jpg", alt: "Product Management — Roadmap Prioritizer About this agent pane", caption: "10. Product Management · Roadmap Prioritizer — About" },
        { src: "assets/python-valkyrie-ai-agent-studio/dark-11-pm-roadmap-prioritizer-create.jpg", lightSrc: "assets/python-valkyrie-ai-agent-studio/light-11-pm-roadmap-prioritizer-create.jpg", alt: "Product Management — Roadmap Prioritizer Create agent pane", caption: "11. Product Management · Roadmap Prioritizer — Create Agent" },
        { src: "assets/python-valkyrie-ai-agent-studio/dark-12-pm-roadmap-prioritizer-design.jpg", lightSrc: "assets/python-valkyrie-ai-agent-studio/light-12-pm-roadmap-prioritizer-design.jpg", alt: "Product Management — Roadmap Prioritizer Design pane", caption: "12. Product Management · Roadmap Prioritizer — Design" },
        { src: "assets/python-valkyrie-ai-agent-studio/dark-13-pm-roadmap-prioritizer-python.jpg", lightSrc: "assets/python-valkyrie-ai-agent-studio/light-13-pm-roadmap-prioritizer-python.jpg", alt: "Product Management — Roadmap Prioritizer Python code pane", caption: "13. Product Management · Roadmap Prioritizer — Python" },
        { src: "assets/python-valkyrie-ai-agent-studio/dark-14-swe-architecture-reviewer-run.jpg", lightSrc: "assets/python-valkyrie-ai-agent-studio/light-14-swe-architecture-reviewer-run.jpg", alt: "Software Engineering — Architecture Reviewer Run pane", caption: "14. Software Engineering · Architecture Reviewer — Run" },
        { src: "assets/python-valkyrie-ai-agent-studio/dark-15-swe-architecture-reviewer-about.jpg", lightSrc: "assets/python-valkyrie-ai-agent-studio/light-15-swe-architecture-reviewer-about.jpg", alt: "Software Engineering — Architecture Reviewer About this agent pane", caption: "15. Software Engineering · Architecture Reviewer — About" },
        { src: "assets/python-valkyrie-ai-agent-studio/dark-16-swe-architecture-reviewer-create.jpg", lightSrc: "assets/python-valkyrie-ai-agent-studio/light-16-swe-architecture-reviewer-create.jpg", alt: "Software Engineering — Architecture Reviewer Create agent pane", caption: "16. Software Engineering · Architecture Reviewer — Create Agent" },
        { src: "assets/python-valkyrie-ai-agent-studio/dark-17-swe-architecture-reviewer-design.jpg", lightSrc: "assets/python-valkyrie-ai-agent-studio/light-17-swe-architecture-reviewer-design.jpg", alt: "Software Engineering — Architecture Reviewer Design pane", caption: "17. Software Engineering · Architecture Reviewer — Design" },
        { src: "assets/python-valkyrie-ai-agent-studio/dark-18-swe-architecture-reviewer-python.jpg", lightSrc: "assets/python-valkyrie-ai-agent-studio/light-18-swe-architecture-reviewer-python.jpg", alt: "Software Engineering — Architecture Reviewer Python code pane", caption: "18. Software Engineering · Architecture Reviewer — Python" },
        { src: "assets/python-valkyrie-ai-agent-studio/dark-19-swe-pr-code-reviewer-run.jpg", lightSrc: "assets/python-valkyrie-ai-agent-studio/light-19-swe-pr-code-reviewer-run.jpg", alt: "Software Engineering — PR Code Reviewer Run pane", caption: "19. Software Engineering · PR Code Reviewer — Run" },
        { src: "assets/python-valkyrie-ai-agent-studio/dark-20-swe-pr-code-reviewer-about.jpg", lightSrc: "assets/python-valkyrie-ai-agent-studio/light-20-swe-pr-code-reviewer-about.jpg", alt: "Software Engineering — PR Code Reviewer About this agent pane", caption: "20. Software Engineering · PR Code Reviewer — About" },
        { src: "assets/python-valkyrie-ai-agent-studio/dark-21-swe-pr-code-reviewer-create.jpg", lightSrc: "assets/python-valkyrie-ai-agent-studio/light-21-swe-pr-code-reviewer-create.jpg", alt: "Software Engineering — PR Code Reviewer Create agent pane", caption: "21. Software Engineering · PR Code Reviewer — Create Agent" },
        { src: "assets/python-valkyrie-ai-agent-studio/dark-22-swe-pr-code-reviewer-design.jpg", lightSrc: "assets/python-valkyrie-ai-agent-studio/light-22-swe-pr-code-reviewer-design.jpg", alt: "Software Engineering — PR Code Reviewer Design pane", caption: "22. Software Engineering · PR Code Reviewer — Design" },
        { src: "assets/python-valkyrie-ai-agent-studio/dark-23-swe-pr-code-reviewer-python.jpg", lightSrc: "assets/python-valkyrie-ai-agent-studio/light-23-swe-pr-code-reviewer-python.jpg", alt: "Software Engineering — PR Code Reviewer Python code pane", caption: "23. Software Engineering · PR Code Reviewer — Python" },
        { src: "assets/python-valkyrie-ai-agent-studio/github.jpg", lightSrc: "assets/python-valkyrie-ai-agent-studio/github-light.jpg", alt: "The valkyrie-agent-studio repository page on GitHub", caption: "24. Open source on GitHub" }
      ],
      run: { src: "demos/valkyrie-agent-studio/index.html", height: 760, note: "Browser Sandbox covers all 12 roles and 240 agents with editable sample_data.json contracts and deterministic runs. Live FastAPI execution, local Ollama / free-tier LLM routing, pymoo GA optimization, and 242-crate Tauri/Rust compilation will not work in browsers, mobiles, or tablets and require the desktop app." },
      links: { demo: "", video: "", poster: "", source: "https://github.com/thomascherickal/valkyrie-ai-agent-studio", writeup: "" },
      useCases: "Built with Tauri, Rust, React, and FastAPI for engineering teams deploying 240 role-specific AI agents with typed YAML contracts, free-first multi-provider LLM routing, local pymoo genetic-algorithm tuning, 100% TDD enforcement, and one-click transpilation into async tokio Rust crates.",
      aiPoints: [
        "Role-Aligned Agentic Workflows: Standardizes 240 specialized agents across 12 enterprise functions—from DevOps and AppSec to FinOps and Product—replacing ad-hoc prompt scripts with typed IR contracts.",
        "Cost-Aware Free-First Routing: Automatically prioritizes free-tier cloud endpoints and local Ollama models before falling back to paid subscriptions, cutting enterprise experimentation bills.",
        "Evolutionary Prompt & Parameter Tuning: Applies local pymoo genetic algorithms to optimize temperature and token scaling across repeated runs without manual trial-and-error.",
        "Python-to-Rust Production Path: Transpiles validated agent definitions into standalone async tokio Rust crates across a 242-crate Cargo workspace for high-concurrency deployment."
      ],
      updated: "2026-11-19"
    },
    {
      id: "go-ai-gateway",
      lane: "systems",
      status: "complete",
      license: "Dual-License-Open-Commercial",
      title: "Go AI Gateway — AI Traffic Control Plane",
      problem: "Every team calls LLMs its own way, so spend, data leaks, and audit are invisible.",
      summary: "A single Go gateway compiled with TinyGo to Cloudflare Workers, backed by D1 and Workers AI with native routing across Anthropic, Gemini, Grok, Llama, DeepSeek, Qwen, OpenAI, and Mistral. Enforces per-team micro-dollar budgets, PII/secret redaction, and immutable audit logs.",
      stack: ["Go", "TinyGo", "Cloudflare Workers", "Cloudflare D1", "Workers AI"],
      images: [
        { src: "assets/go-ai-gateway/dark-01-overview.jpg", lightSrc: "assets/go-ai-gateway/light-01-overview.jpg", alt: "Go AI Gateway Control Plane Overview and KPIs", caption: "1. Control Plane Overview" },
        { src: "assets/go-ai-gateway/dark-02-teams-budgets.jpg", lightSrc: "assets/go-ai-gateway/light-02-teams-budgets.jpg", alt: "Go AI Gateway per-team budgets and keys", caption: "2. Per-Team Budgets & Keys" },
        { src: "assets/go-ai-gateway/dark-03-audit-logs.jpg", lightSrc: "assets/go-ai-gateway/light-03-audit-logs.jpg", alt: "Go AI Gateway immutable audit logs and redaction counts", caption: "3. Immutable Audit Logs" },
        { src: "assets/go-ai-gateway/dark-04-explorer.jpg", lightSrc: "assets/go-ai-gateway/light-04-explorer.jpg", alt: "Go AI Gateway interactive API explorer", caption: "4. Interactive API Explorer" },
        { src: "assets/go-ai-gateway/dark-05-bottom.jpg", lightSrc: "assets/go-ai-gateway/light-05-bottom.jpg", alt: "Go AI Gateway routing and response inspection", caption: "5. Multi-Provider Routing & Response" },
        { src: "assets/go-ai-gateway/github.jpg", lightSrc: "assets/go-ai-gateway/github-light.jpg", alt: "The go-ai-gateway repository page on GitHub", caption: "6. Open source on GitHub" }
      ],
      run: { src: "demos/go-ai-gateway/index.html", height: 900, note: "Runs the real Go gateway as WebAssembly (8.1 MB) in-memory with mock providers and demo teams. Live vendor API calls, persistent Cloudflare D1 storage, and Cloudflare Workers deployment require your own keys; on mobiles and tablets, initial WASM download is heavier on cellular networks and state resets on reload." },
      links: { demo: "", video: "", poster: "", source: "https://github.com/thomascherickal/go-ai-gateway", writeup: "" },
      useCases: "Compiled with TinyGo for Cloudflare Workers to provide centralized multi-vendor LLM routing with automatic fallbacks, per-team micro-dollar budget enforcement in D1, and real-time PII and secret redaction before prompts leave your network. Compatible with OpenAI, Anthropic, and Gemini SDKs while recording immutable compliance audit logs and cost reconciliation.",
      aiPoints: [
        "AI Governance & FinOps Control Plane: Enforces atomic per-team micro-dollar budgets in Cloudflare D1, stopping runaway agent loops and shadow AI spend before invoices spike.",
        "Multi-Vendor Resilience & Routing: Presents unified OpenAI, Anthropic, and Gemini APIs with automatic complexity routing and cross-provider failover during upstream outages.",
        "Pre-Flight Data Loss Prevention: Redacts API keys, JWTs, credit cards, and personal identifiers at the edge before prompts ever reach third-party model providers.",
        "Compliance-Ready Auditability: Captures immutable request logs with redacted SHA-256 prompt hashes for regulated enterprise security reviews."
      ],
      updated: "2026-11-16"
    },

    {
      id: "cpp-enterprise-data-guard",
      lane: "systems",
      status: "complete",
      license: "Dual-License-Open-Commercial",
      title: "Enterprise Data Guard",
      problem: "Developers and employees routinely paste stack traces, config files, database URIs and customer records into AI assistants.",
      summary: "Client-side C++17 / WebAssembly secret and personal-data scanner (Emscripten data_guard.wasm) with a native GTK+ 3 Admin Control Centre, a zero-trust web dashboard and a Chrome extension that redact API keys, JWTs, credit cards, SSNs and IBANs before a single byte leaves the browser.",
      stack: ["C++17", "Emscripten", "WebAssembly", "GTK+ 3", "Chrome Extension (MV3)", "Docker"],
      images: [
        { src: "assets/cpp-enterprise-data-guard/dark-01-dashboard-safe.jpg", lightSrc: "assets/cpp-enterprise-data-guard/light-01-dashboard-safe.jpg", alt: "Enterprise Data Guard WebAssembly dashboard with safe prompt scan", caption: "1. Zero-Trust Web Dashboard (Safe Scan)" },
        { src: "assets/cpp-enterprise-data-guard/dark-02-leaked-keys-scan.jpg", lightSrc: "assets/cpp-enterprise-data-guard/light-02-leaked-keys-scan.jpg", alt: "Enterprise Data Guard blocking leaked AWS, database URI and OpenAI keys", caption: "2. Leaked Keys Scan & Redaction" },
        { src: "assets/cpp-enterprise-data-guard/dark-03-pii-findings-table.jpg", lightSrc: "assets/cpp-enterprise-data-guard/light-03-pii-findings-table.jpg", alt: "Enterprise Data Guard detecting email, SSN and Luhn-validated credit card PII", caption: "3. Customer PII Findings Table" },
        { src: "assets/cpp-enterprise-data-guard/dark-04-policy-controls.jpg", lightSrc: "assets/cpp-enterprise-data-guard/light-04-policy-controls.jpg", alt: "Enterprise Data Guard active policy controls with placeholder redaction mode", caption: "4. Active Policy & Placeholder Redaction" },
        { src: "assets/cpp-enterprise-data-guard/dark-05-interceptor-dialog.jpg", lightSrc: "assets/cpp-enterprise-data-guard/light-05-interceptor-dialog.jpg", alt: "Enterprise Data Guard AI Tool Prompt Interceptor dialog", caption: "5. AI Tool Prompt Interceptor" },
        { src: "assets/cpp-enterprise-data-guard/github.jpg", lightSrc: "assets/cpp-enterprise-data-guard/github-light.jpg", alt: "The cpp-enterprise-data-guard repository page on GitHub", caption: "6. Open source on GitHub" }
      ],
      run: { src: "demos/data-guard-admin/index.html", height: 780, note: "Runs the C++ AdminController compiled to WebAssembly with the web dashboard linked inside. Native GTK3 file dialogs map to browser file pickers; the Chrome prompt-interception extension (.zip) will not install on Android or iOS browsers and requires desktop Chrome/Chromium." },
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
      aiPoints: [
        "Zero-Trust AI Prompt Security: Intercepts secrets, cloud credentials, database URIs, and Luhn/mod-97 validated PII inside the browser before employees paste them into ChatGPT, Claude, or Gemini.",
        "Shared C++17 / WebAssembly Core: Runs the exact same deterministic scanning engine in a native GTK+ 3 Admin GUI and in browser service workers via Emscripten.",
        "Offline Extension Protection: Guards AI web interfaces locally with zero telemetry or cloud upload, satisfying strict financial, healthcare, and legal compliance mandates.",
        "Centralized Policy Distribution: Exports signed policy.json allowlists and custom regex rules for organization-wide deployment."
      ],
      updated: "2026-11-16"
    },
    {
      id: "julia-ai-roi-simulation",
      lane: "science",
      status: "complete",
      license: "Dual-License-Open-Commercial",
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
        { src: "assets/julia-ai-roi-simulation/github.jpg", lightSrc: "assets/julia-ai-roi-simulation/github-light.jpg", alt: "The julia-ai-roi-simulation repository page on GitHub", caption: "11. Open source on GitHub" }
      ],
      run: { src: "demos/julia-roi/index.html", height: 760, note: "Runs on pre-computed simulation results (static JSON) with all 5 forecasting tabs and interactive What-If sliders. Re-running the Julia Monte Carlo and Agent-Based models themselves will not work in browsers, mobiles, or tablets and requires a local Julia installation." },
      links: { demo: "", video: "", poster: "", source: "https://github.com/thomascherickal/julia-ai-roi-simulation", writeup: "" },
      useCases: "Written in Julia to model board-ready AI adoption business cases with honest P10, P50, and P90 confidence bands instead of single-point guesses. Simulates 325 employees across four departments over 36 months using Monte Carlo, agent-based, system dynamics, queueing, and Bayesian pilot checkpoint lenses exported to an interactive web lab.",
      aiPoints: [
        "Honest AI Investment Forecasting: Replaces vendor hype with P10, P50, and P90 Monte Carlo profit ranges that account for rework, review overhead, and realistic rollout velocity.",
        "Adoption & Shelfware Dynamics: Uses agent-based modeling to show how AI champions accelerate peer adoption while poorly supported rollouts stall into unused licenses.",
        "Bottleneck & Cost-Creep Detection: Combines system dynamics and queueing theory to surface hidden code-review backlogs and rising token bills across 36-month horizons.",
        "Bayesian Pilot Governance: Equips leadership with a 6-month checkpoint scorecard to decide whether to scale, pivot, or pause."
      ],
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
      sourceDesc: "Vanilla HTML, CSS, and JavaScript progressive web app using browser localStorage and service workers for offline-first personal finance tracking. Users can log daily income and expenses, organize spending across custom categories, monitor monthly savings targets, and view instant balance summaries with zero backend servers, accounts, or external data sharing.",
      aiPoints: [
        "Local-First Privacy Architecture: Demonstrates zero-cloud client-side state persistence that keeps sensitive financial records strictly on the user's device, mirroring privacy-first AI edge principles.",
        "Offline Progressive Web App: Uses service workers and browser storage for instant load times and uninterrupted functionality in low-connectivity or air-gapped environments.",
        "AI-Assisted Rapid Delivery: Built with zero runtime frameworks to show how lean vanilla web stacks can ship fast, maintainable financial utilities.",
        "Structured Categorization: Provides clean transaction tagging and summary views ready for local export or personal budgeting workflows."
      ]
    },
    {
      name: "LinkedIn Profile Score",
      purpose: "Audit and score your LinkedIn profile for recruiter visibility.",
      url: "https://thomascherickal.github.io/LinkedIn-Profile-Score-App/",
      icon: "assets/PWAs/LinkedIn Authority Suite.png",
      source: "https://github.com/thomascherickal/LinkedIn-Profile-Score-App",
      sourceDesc: "Client-side profile scoring rubric and interactive audit checklist built in plain HTML, CSS, and JavaScript. Evaluates LinkedIn headlines, about sections, experience bullets, featured media, and keyword density against recruiter search criteria, giving professionals immediate, actionable feedback and a clear score breakdown without requiring login or storing personal data.",
      aiPoints: [
        "Deterministic Evaluation Rubrics: Encodes recruiter search heuristics into transparent, weighted scoring rules that complement LLM-based career coaching without hallucinated advice.",
        "AI-Era Talent Positioning: Helps engineers and AI practitioners surface verifiable project outcomes, technical stacks, and measurable impact in automated search feeds.",
        "Instant Client-Side Feedback: Delivers real-time diagnostic breakdowns in the browser with zero API latency, login walls, or personal data collection.",
        "Actionable Gap Remediation: Highlights weak headlines, missing keywords, and under-optimized summary sections so users can iterate immediately."
      ]
    },
    {
      name: "Top 10 AI Tools Finder",
      purpose: "Discover the top 10 AI tools tailored to your workflow and role.",
      url: "https://thomascherickal.github.io/Top-10-AI-Tools-Finder-App/",
      icon: "https://raw.githubusercontent.com/thomascherickal/Top-10-AI-Tools-Finder-App/master/Screenshot.png",
      source: "https://github.com/thomascherickal/Top-10-AI-Tools-Finder-App",
      sourceDesc: "Static client-side recommendation engine built with vanilla HTML, CSS, and JavaScript that matches user roles, goals, and daily workflows to ten curated AI tools. Evaluates productivity needs, budget constraints, and automation use cases in the browser with instant filtering, side-by-side comparisons, and zero backend servers or user tracking.",
      aiPoints: [
        "Curated AI Stack Discovery: Cuts through daily AI tool fatigue by mapping specific job roles and automation goals to ten high-signal, vetted tools.",
        "Budget & Constraint Matching: Filters recommendations by cost tier and workflow fit, helping individuals and small teams avoid overlapping SaaS subscriptions.",
        "Zero-Backend Recommendation Engine: Runs deterministic matching logic entirely in vanilla JavaScript for instant responsiveness and complete user privacy.",
        "Practical Adoption Accelerator: Bridges the gap between emerging generative AI capabilities and everyday coding, writing, and research productivity."
      ]
    },
    {
      name: "Tech Jobs Roadmap",
      purpose: "Interactive career roadmap for breaking into and advancing in tech roles.",
      url: "https://thomascherickal.github.io/Tech-Jobs-RoadMap-App/",
      icon: "https://raw.githubusercontent.com/thomascherickal/Tech-Jobs-RoadMap-App/master/Screenshot.png",
      source: "https://github.com/thomascherickal/Tech-Jobs-RoadMap-App",
      sourceDesc: "Interactive milestone and skill-tree web application built in vanilla HTML, CSS, and JavaScript to help engineers plan structured learning paths across modern software tracks. Users can explore role requirements, track core technical competencies, bookmark key resources, and prepare for career transitions with offline PWA support and local progress persistence.",
      aiPoints: [
        "AI-First Engineering Upskilling: Maps out the foundational systems, cloud, and data skills engineers need to stay relevant as AI coding assistants reshape software teams.",
        "Interactive Competency Tracking: Replaces static PDF roadmaps with clickable skill trees and persistent browser progress tracking.",
        "Structured Role Transitions: Guides developers pivoting into AI engineering, backend systems, or full-stack delivery with clear milestone sequencing.",
        "Offline-Ready Learning Companion: Installs as a lightweight PWA so learners can review tracks and checklists anywhere without network access."
      ]
    },
    {
      name: "Inbound Signal Scorer",
      purpose: "Score and prioritize inbound recruiter and job-search signals.",
      url: "https://thomascherickal.github.io/inbound-signal-scorer/",
      icon: "assets/PWAs/LinkedIn Inbound Scorer.png",
      source: "https://github.com/thomascherickal/inbound-signal-scorer",
      sourceDesc: "Zero-dependency client-side scoring calculator built with vanilla HTML, CSS, and JavaScript for evaluating inbound recruiter outreach quality, role alignment, and compensation signals. Helps technical professionals quickly separate high-signal opportunities from generic templates using structured weighted criteria that run completely offline in the browser with zero data collection.",
      aiPoints: [
        "Signal-Over-Noise Filtering: Counters the flood of AI-generated automated recruiter spam by scoring inbound messages against concrete role, stack, and compensation criteria.",
        "Transparent Decision Weighting: Turns subjective career outreach evaluation into repeatable, explainable scores directly in the browser.",
        "Privacy-Preserving Career Tooling: Keeps sensitive job-search notes and outreach evaluations strictly local with zero third-party analytics.",
        "High-ROI Time Management: Enables senior engineers and consultants to prioritize genuine, high-alignment engagements in seconds."
      ]
    },
    {
      name: "ATS Resume Builder Pro",
      purpose: "Build an ATS-friendly resume and view your compatibility score live.",
      url: "https://thomascherickal.github.io/ats-resume-builder-pro/",
      icon: "assets/PWAs/ATS Resume Builder.png",
      source: "https://github.com/thomascherickal/ats-resume-builder-pro",
      sourceDesc: "Browser-based resume editor built in plain HTML, CSS, and JavaScript with real-time applicant tracking keyword matching, live compatibility scoring, and structured section templates. Candidates can tailor bullet points to specific job descriptions, verify formatting compliance, save drafts locally via browser storage, and export clean print-ready PDF resumes offline.",
      aiPoints: [
        "Automated Screening Alignment: Prepares candidate resumes for modern AI-augmented Applicant Tracking Systems by scoring keyword overlap and structural parsability in real time.",
        "Live Tailoring Feedback Loop: Lets engineers compare their draft directly against target job descriptions without uploading confidential career history to external servers.",
        "Clean Machine-Readable Templates: Enforces single-column, parser-friendly layouts that prevent formatting glitches in automated resume ingestion pipelines.",
        "Instant Offline PDF Export: Generates print-ready documents locally with browser storage draft persistence."
      ]
    }
  ]
};
