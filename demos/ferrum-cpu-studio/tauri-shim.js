// Browser stand-in for the Tauri backend of Ferrum SLM Studio, so the real, unmodified desktop UI
// runs in a web page. Generate, Models and System run in WebAssembly in this tab; commands that need
// native threads, the file system or a server answer with a plain "desktop app only" message.
(function () {
  "use strict";
  var DESKTOP = " needs the desktop app (native threads, files or a server); this browser demo runs the WebAssembly inference engine only.";
  var vfs = {};          // path -> Uint8Array (bundled model, downloads and picked files)
  var listeners = {};    // event name -> [fn]
  var worker = null, runId = 0, pending = {}, loadedPath = null, loadedInfo = null;
  var BUNDLED = "models/ferrum-demo.gguf";

  function emit(name, payload) { (listeners[name] || []).forEach(function (f) { f({ payload: payload }); }); }
  function listen(name, fn) { (listeners[name] = listeners[name] || []).push(fn); return Promise.resolve(function () {}); }
  function basename(p) { return String(p).split("/").pop(); }

  function getWorker() {
    if (worker) return worker;
    worker = new Worker("slm-worker.js", { type: "module" });
    worker.onmessage = function (e) {
      var m = e.data;
      if (m.type === "ready") { loadedInfo = JSON.parse(m.info); if (pending.load) pending.load.res(loadedInfo); }
      else if (m.type === "error" && m.id === undefined) { if (pending.load) pending.load.rej(m.message); }
      else if (m.id !== runId) { return; }
      else if (m.type === "chunk") { pending.text += m.text; emit("gen-fragment", m.text); }
      else if (m.type === "done") { if (pending.gen) pending.gen.res(); }
      else if (m.type === "error") { if (pending.gen) pending.gen.rej(m.message); }
    };
    return worker;
  }

  async function bytesOf(path) {
    if (vfs[path]) return vfs[path];
    if (path === BUNDLED) {
      var r = await fetch("ferrum-demo.gguf");
      if (!r.ok) throw "could not fetch the bundled model (HTTP " + r.status + ")";
      return (vfs[path] = new Uint8Array(await r.arrayBuffer()));
    }
    throw "File not found in this browser session: " + path + ". Use Browse to pick a .gguf from your computer, or the bundled path " + BUNDLED + ".";
  }

  async function ensureLoaded(path) {
    if (loadedPath === path && loadedInfo) return loadedInfo;
    var b = await bytesOf(path), w = getWorker();
    var copy = b.slice().buffer;
    var p = new Promise(function (res, rej) { pending.load = { res: res, rej: rej }; });
    w.postMessage({ type: "load", bytes: copy }, [copy]);
    loadedInfo = null; await p; loadedPath = path; return loadedInfo;
  }

  var commands = {
    system_stats: async function () {
      var cores = navigator.hardwareConcurrency || 1, mem = (navigator.deviceMemory || 0) * 1073741824;
      return { available: true, cpuTotal: 0, perCore: [], cores: cores, memUsed: 0, memTotal: mem, memPercent: 0, ferrumThreads: 1 };
    },
    serve_status: async function () { return { running: false }; },
    model_info: async function (a) {
      var i = await ensureLoaded(a.path), b = await bytesOf(a.path);
      return { path: a.path, bytes: b.length, format: "GGUF (" + i.quant + ")", name: basename(a.path), task: "text generation",
        inputDim: i.vocab, outputDim: i.vocab, tokenizer: i.tokenizer, merges: 0, layers: 0, kind: "model",
        details: [["Parameters", i.params.toLocaleString()], ["Context", String(i.context)]] };
    },
    generate_slm: async function (a) {
      var p = a.params, info = await ensureLoaded(p.modelPath), w = getWorker();
      var stops = (p.stop || []).map(function (s) { return s.replace(/\\n/g, "\n").replace(/\\t/g, "\t"); });
      runId += 1; pending.text = "";
      var done = new Promise(function (res, rej) { pending.gen = { res: res, rej: rej }; });
      w.postMessage({ type: "generate", id: runId, prompt: p.seedText, max_tokens: p.maxTokens > 0 ? p.maxTokens : Math.max(1, p.numChars),
        temperature: p.temp, top_k: p.topK || 0, top_p: p.topP || 1, repetition_penalty: p.repPenalty || 1,
        seed: (p.genSeed == null ? Math.floor(Math.random() * 4294967295) : p.genSeed) >>> 0, stop: stops });
      await done;
      var out = pending.text;
      if (!(p.maxTokens > 0)) out = out.slice(0, p.numChars);
      return p.seedText + out;
    },
    cancel_job: async function () { if (worker) worker.postMessage({ type: "cancel" }); },
    list_datasets: async function () {
      return [{ id: "tinystories-valid", name: "TinyStories (validation split)", source: "huggingface",
        description: "Short simple stories written by GPT-4; the corpus the demo model was trained on.", approxMb: 22,
        repo: "roneneldan/TinyStories", file: "TinyStoriesV2-GPT4-valid.txt", format: "text" }];
    },
    download_hf_file: async function (a) {
      var url = "https://huggingface.co/datasets/" + a.repo + "/resolve/" + (a.revision || "main") + "/" + a.file;
      var r = await fetch(url, a.hfToken ? { headers: { Authorization: "Bearer " + a.hfToken } } : undefined);
      if (!r.ok) throw "HuggingFace answered HTTP " + r.status;
      var b = new Uint8Array(await r.arrayBuffer()), path = (a.destDir || "downloads").replace(/\/$/, "") + "/" + basename(a.file);
      vfs[path] = b; emit("download-progress", { done: b.length, total: b.length });
      return { path: path, bytes: b.length, source: "HuggingFace (browser fetch)" };
    },
    read_text_file: async function (a) {
      var b = await bytesOf(a.path), max = a.maxBytes || b.length;
      return new TextDecoder().decode(b.slice(0, max));
    },
    save_corpus: async function (a) { var b = new TextEncoder().encode(a.text); vfs[a.path] = b; return b.length; }
  };
  ["estimate_job", "hardware_info", "capability_report", "clean_text", "download_dataset", "download_kaggle_file", "download_text",
   "evaluate_slm", "export_gguf", "gguf_info", "finetune_gguf", "run_gguf", "prepare_dataset", "tokenize_corpus", "train_slm",
   "preflight_train", "export_to_runtime", "preview_runtime_export", "serve_start", "serve_stop"].forEach(function (n) {
    commands[n] = async function () { throw "“" + n.replace(/_/g, " ") + "”" + DESKTOP; };
  });

  async function pick(kind, opts) {
    if (kind === "save") return opts && opts.defaultPath ? opts.defaultPath : "output.gguf";
    return new Promise(function (resolve) {
      var inp = document.createElement("input"); inp.type = "file";
      inp.onchange = async function () {
        var f = inp.files[0]; if (!f) return resolve(null);
        var path = "picked/" + f.name; vfs[path] = new Uint8Array(await f.arrayBuffer()); resolve(path);
      };
      inp.oncancel = function () { resolve(null); };
      inp.click();
    });
  }

  window.__TAURI__ = {
    core: { invoke: function (cmd, args) {
      var f = commands[cmd];
      return f ? f(args || {}) : Promise.reject("Unknown command: " + cmd);
    } },
    event: { listen: listen },
    dialog: { open: function (o) { return pick("open", o); }, save: function (o) { return pick("save", o); } }
  };

  // Pre-fill the model paths with the bundled model once the page has restored its settings.
  window.addEventListener("load", function () {
    setTimeout(function () {
      ["genModel", "evModel", "miPath"].forEach(function (id) { var el = document.getElementById(id); if (el && !el.value) el.value = BUNDLED; });
      
      var banner = document.getElementById("webBanner");
      if (banner) { banner.classList.remove("hidden"); banner.textContent = "Browser demo: the real Ferrum SLM Studio interface. Generate, Models and Datasets run here in WebAssembly with a preloaded model (" + BUNDLED + "). Training, Prepare, Evaluate, Export and Serve need the desktop app."; }
    }, 400);
  });
})();
