"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");

const PROJECTS_PATH = path.resolve(__dirname, "../data/projects.js");
const APP_PATH = path.resolve(__dirname, "../assets/app.js");

function createMockDom(options = {}) {
  const elements = new Map();
  const docListeners = {};

  function makeEl(id, tag = "div") {
    const attrs = {};
    const el = {
      id,
      tagName: tag.toUpperCase(),
      innerHTML: "",
      textContent: "",
      href: "",
      className: "",
      hidden: false,
      scrollLeft: 0,
      clientWidth: 400,
      children: [],
      classList: {
        contains: (cls) => (el.className || "").split(/\s+/).includes(cls)
      },
      listeners: {},
      inserted: [],
      replacedWith: null,
      addEventListener(type, fn) {
        (el.listeners[type] = el.listeners[type] || []).push(fn);
      },
      insertAdjacentHTML(pos, html) {
        el.inserted.push({ pos, html });
      },
      setAttribute(k, v) {
        attrs[k] = String(v);
      },
      getAttribute(k) {
        return attrs[k];
      },
      removeAttribute(k) {
        delete attrs[k];
      },
      querySelectorAll(sel) {
        if (sel === ".chip" && el._chips) return el._chips;
        return el._queryAll ? el._queryAll(sel) : [];
      },
      scrollIntoView() {
        el.scrolledIntoView = true;
      },
      replaceWith(node) {
        el.replacedWith = node;
      }
    };
    return el;
  }

  const defaultIds = [
    "main", "site-name", "site-role", "site-headline", "site-intro",
    "book-top", "book-hero", "book-foot", "brain-link", "brain-shot",
    "brain-lane", "foot-links", "hero-links", "automation-list", "demos", "demo-grid", "filters",
    "automations", "skills", "apps", "lane-index", "pwa-list", "contact"
  ];
  for (const id of defaultIds) {
    if (options.omitIds && options.omitIds.includes(id)) continue;
    elements.set(id, makeEl(id));
  }

  const document = {
    getElementById(id) {
      return elements.get(id) || null;
    },
    addEventListener(type, fn, capture) {
      (docListeners[type] = docListeners[type] || []).push({ fn, capture: !!capture });
    }
  };

  return { elements, document, docListeners, makeEl };
}

function loadAppFresh({ portfolio, dom, fetchImpl }) {
  delete require.cache[APP_PATH];
  global.window = { PORTFOLIO: portfolio };
  if (fetchImpl) global.window.fetch = fetchImpl;
  global.fetch = fetchImpl;
  global.document = dom.document;
  global.DOMParser = class {
    parseFromString(html) {
      const hasFooter = /<footer\b/i.test(html);
      const footerNode = hasFooter ? { id: "links", html } : null;
      return {
        querySelector: (sel) => (sel === "footer" ? footerNode : null)
      };
    }
  };
  require(APP_PATH);
}

describe("data/projects.js", () => {
  it("defines window.PORTFOLIO with valid site, lanes, projects, and live GitHub Pages PWA links", () => {
    delete require.cache[PROJECTS_PATH];
    global.window = {};
    require(PROJECTS_PATH);

    const p = global.window.PORTFOLIO;
    assert.ok(p && p.site && p.lanes && Array.isArray(p.projects) && Array.isArray(p.pwas));
    assert.equal(p.pwas.length, 6);
    for (const app of p.pwas) {
      assert.match(app.url, /^https:\/\/thomascherickal\.github\.io\/[^/]+\/?$/);
      assert.ok(app.name.length > 0);
      assert.ok(app.purpose.length > 0);
    }
  });
});

describe("assets/app.js", () => {
  it("shows an error banner when window.PORTFOLIO is missing", () => {
    const dom = createMockDom();
    loadAppFresh({ portfolio: null, dom });
    assert.equal(dom.elements.get("main").inserted.length, 1);
    assert.match(dom.elements.get("main").inserted[0].html, /did not load/);
  });

  it("renders all projects, PWAs, filters, hero index, and handles all interactions", async () => {
    delete require.cache[PROJECTS_PATH];
    global.window = {};
    require(PROJECTS_PATH);
    const realPortfolio = global.window.PORTFOLIO;

    const customPortfolio = {
      site: {
        ...realPortfolio.site,
        links: { ...realPortfolio.site.links, futurist: "https://thedigitalfuturist.com" }
      },
      lanes: {
        ...realPortfolio.lanes
      },
      projects: [
        ...realPortfolio.projects,
        {
          id: "test-yt-poster",
          lane: "claude",
          status: "video",
          title: "YT & Poster <test>",
          problem: "Problem & \"quote\"",
          summary: "Summary 'single'",
          stack: ["Go"],
          links: { demo: "https://example.com/demo", video: "yt:abc123", poster: "p.jpg", source: "https://example.com/src", writeup: "https://example.com/post" },
          useCases: "Use case text",
          updated: "2026-11-16"
        },
        {
          id: "test-yt-no-poster",
          lane: "claude",
          status: "live",
          title: "YT No Poster",
          problem: "P",
          summary: "S",
          links: { video: "yt:xyz789" },
          updated: "2026-11-16"
        },
        {
          id: "test-mp4-poster",
          lane: "systems",
          status: "unknown-status",
          title: null,
          problem: "P",
          summary: "S",
          images: [{ src: "one.jpg" }, { src: "two.jpg", alt: "Two", caption: "Two cap" }],
          links: { video: "clip.mp4", poster: "clip.jpg" },
          updated: "2026-11-16"
        },
        {
          id: "test-mp4-no-poster",
          lane: "unknown-lane",
          status: "complete",
          title: "MP4 No Poster",
          problem: "P",
          summary: "S",
          images: [{ src: "single.jpg", caption: "Only one" }],
          links: undefined,
          updated: "2026-11-16"
        }
      ],
      pwas: [
        ...realPortfolio.pwas,
        { name: "", purpose: "Fallback initial", url: "https://thomascherickal.github.io/Demo/", icon: "" }
      ]
    };

    const dom = createMockDom();
    let fetchResolve;
    const fetchPromise = new Promise((r) => { fetchResolve = r; });
    const fetchImpl = () => fetchPromise;

    loadAppFresh({ portfolio: customPortfolio, dom, fetchImpl });

    // Verify site metadata & foot links
    assert.equal(dom.elements.get("site-name").textContent, customPortfolio.site.name);
    assert.match(dom.elements.get("foot-links").innerHTML, /thedigitalfuturist\.com/);
    assert.match(dom.elements.get("automation-list").innerHTML, /youtube-nocookie|data-yt="abc123"/);
    assert.match(dom.elements.get("demo-grid").innerHTML, /car-zoom/);
    assert.match(dom.elements.get("pwa-list").innerHTML, /pill-live/);

    // Resolve dynamic footer fetch with valid <footer>
    fetchResolve({ ok: true, text: async () => '<footer id="links">ok</footer>' });
    await new Promise((r) => setTimeout(r, 0));
    assert.equal(dom.elements.get("contact").replacedWith.id, "contact");

    // Test document click handlers: YouTube facade
    const ytParent = { innerHTML: "" };
    const ytBtn = { parentElement: ytParent, getAttribute: () => "abc123" };
    for (const h of dom.docListeners.click) {
      h.fn({ target: { closest: (s) => (s === "button[data-yt]" ? ytBtn : null) } });
    }
    assert.match(ytParent.innerHTML, /youtube-nocookie\.com\/embed\/abc123/);

    // Run Project: real HTML carries the button and extension block
    assert.match(dom.elements.get("demo-grid").innerHTML, /href="demos\/data-guard-admin\/index\.html" target="_blank"/);
    assert.match(dom.elements.get("demo-grid").innerHTML, /Chrome extension/);
    const stage = { innerHTML: "" };
    const runBtn = {
      attrs: { "aria-expanded": "false", "data-run": "demos/x/index.html", "data-title": "T" },
      innerHTML: "",
      getAttribute(k) { return this.attrs[k]; },
      setAttribute(k, v) { this.attrs[k] = v; },
      closest: () => ({ getAttribute: () => "600", querySelector: () => stage })
    };
    const clickRun = () => { for (const h of dom.docListeners.click) h.fn({ target: { closest: (s) => (s === "button[data-run]" ? runBtn : null) } }); };
    clickRun();
    assert.match(stage.innerHTML, /<iframe[^>]+src="demos\/x\/index\.html"/);
    clickRun();
    assert.equal(stage.innerHTML, "");

    // Test carousel click handlers: prev, next, dot
    let scrolledTo = null;
    const dot1 = { classList: { contains: () => false } };
    const dot2 = { classList: { contains: () => false } };
    const track = {
      clientWidth: 400,
      scrollLeft: 400,
      children: [{}, {}],
      scrollTo: (opts) => { scrolledTo = opts; }
    };
    const car = {
      querySelector: () => track,
      querySelectorAll: () => [dot1, dot2]
    };
    const makeCarBtn = (cls) => ({
      classList: { contains: (c) => c === cls },
      closest: () => car
    });
    for (const btn of [makeCarBtn("car-prev"), makeCarBtn("car-next"), { classList: { contains: () => false }, closest: () => car }]) {
      for (const h of dom.docListeners.click) {
        h.fn({ target: { closest: (s) => (s.includes("car-prev") ? btn : null) } });
      }
    }
    assert.ok(scrolledTo);

    // Test carousel scroll handler (both matching and non-matching)
    const d0 = dom.makeEl("d0");
    const d1 = dom.makeEl("d1");
    const scrollTrack = {
      classList: { contains: (c) => c === "car-track" },
      scrollLeft: 400,
      clientWidth: 400,
      parentElement: { querySelectorAll: () => [d0, d1] }
    };
    for (const h of dom.docListeners.scroll) {
      h.fn({ target: { classList: null } });
      h.fn({ target: scrollTrack });
    }
    assert.equal(d1.getAttribute("aria-current"), "true");

    // Test filter chips & lane-index clicks
    const chipAll = dom.makeEl("c-all"); chipAll.setAttribute("data-lane", "all");
    const chipClaude = dom.makeEl("c-claude"); chipClaude.setAttribute("data-lane", "claude");
    const chipKnowledge = dom.makeEl("c-knowledge"); chipKnowledge.setAttribute("data-lane", "knowledge");
    const chipApps = dom.makeEl("c-apps"); chipApps.setAttribute("data-lane", "apps");
    const chipEmpty = dom.makeEl("c-empty"); chipEmpty.setAttribute("data-lane", "nonexistent");
    const filtersEl = dom.elements.get("filters");
    filtersEl._chips = [chipAll, chipClaude, chipKnowledge, chipApps, chipEmpty];

    for (const chip of [chipClaude, chipKnowledge, chipApps, chipEmpty, chipAll, null]) {
      for (const fn of filtersEl.listeners.click) {
        fn({ target: { closest: () => chip } });
      }
    }
    assert.match(dom.elements.get("demo-grid").innerHTML, /Ferrum|Nothing in this area/);

    const laneIndexEl = dom.elements.get("lane-index");
    for (const target of [{ closest: () => null }, { closest: () => ({ getAttribute: () => "systems" }) }]) {
      for (const fn of laneIndexEl.listeners.click) {
        fn({ target });
      }
    }
    assert.equal(dom.elements.get("demos").scrolledIntoView, true);
  });

  it("handles empty projects/pwas, missing optional DOM nodes, and failed/non-footer fetch", async () => {
    const dom = createMockDom({ omitIds: ["book-foot", "foot-links", "automations", "skills", "apps"] });
    const minimalPortfolio = {
      site: { name: "N", role: "R", headline: "H", intro: "I", links: { book: "b", brain: "br" } },
      lanes: { systems: { label: "Systems", tone: "cyan" } },
      projects: undefined,
      pwas: undefined
    };

    // Non-ok fetch
    loadAppFresh({ portfolio: minimalPortfolio, dom, fetchImpl: () => Promise.resolve({ ok: false, status: 404 }) });
    await new Promise((r) => setTimeout(r, 0));

    // Fetch returning HTML without <footer>
    loadAppFresh({ portfolio: minimalPortfolio, dom, fetchImpl: () => Promise.resolve({ ok: true, text: async () => "<div>no footer</div>" }) });
    await new Promise((r) => setTimeout(r, 0));
    assert.equal(dom.elements.get("contact").replacedWith, null);

    // Missing #contact element
    const domNoContact = createMockDom({ omitIds: ["contact"] });
    loadAppFresh({ portfolio: minimalPortfolio, dom: domNoContact });
  });
});
