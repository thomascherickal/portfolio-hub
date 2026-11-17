/* Renders the hub from data/projects.js. No build step, no dependencies. */
(function () {
  "use strict";

  var data = window.PORTFOLIO;
  if (!data) {
    document.getElementById("main").insertAdjacentHTML(
      "afterbegin",
      '<p class="empty" style="padding:40px">The project list did not load. Check that data/projects.js exists and has no syntax errors.</p>'
    );
    return;
  }

  var site = data.site, lanes = data.lanes, projects = data.projects || [];
  var STATUS = { live: "Live", complete: "Complete", video: "Video", building: "Building" };

  // Escape text so data-file content can never break the page.
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function toneOf(lane) { return "tone-" + ((lanes[lane] && lanes[lane].tone) || "gold"); }
  function laneLabel(lane) { return (lanes[lane] && lanes[lane].label) || lane; }

  /* ---------- site text and links ---------- */
  document.getElementById("site-name").textContent = site.name;
  document.getElementById("site-role").textContent = site.role;
  document.getElementById("site-headline").textContent = site.headline;
  document.getElementById("site-intro").textContent = site.intro;
  ["book-top", "book-hero", "book-foot"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.href = site.links.book;
  });
  document.getElementById("brain-link").href = site.links.brain;
  document.getElementById("brain-shot").href = site.links.brain;
  var brainLane = document.getElementById("brain-lane");
  brainLane.textContent = laneLabel("knowledge");
  brainLane.className = "demo-lane " + toneOf("knowledge");

  var footLinksEl = document.getElementById("foot-links");
  if (footLinksEl) {
    var footLinks = [
      ["thomascherickal.com", site.links.site],
      ["thedigitalfuturist.com", site.links.futurist],
      ["LinkedIn", site.links.linkedin],
      ["X", site.links.x],
      ["GitHub", site.links.github],
      ["Patreon", site.links.patreon],
      ["Newsletter", site.links.newsletter]
    ];
    footLinksEl.innerHTML = footLinks
      .filter(function (l) { return l[1]; })
      .map(function (l) { return '<li><a href="' + esc(l[1]) + '" rel="me noopener">' + esc(l[0]) + "</a></li>"; })
      .join("");
  }

  var heroLinksEl = document.getElementById("hero-links");
  if (heroLinksEl) {
    var ico = {
      book: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
      globe: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
      code: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
      user: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
      mail: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
      doc: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
      star: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
    };
    var heroLinks = [
      ["Book a Session", site.links.book, ico.book],
      ["thomascherickal.com", site.links.site, ico.globe],
      ["The Digital Futurist", site.links.consulting, ico.globe],
      ["Portfolio", site.links.portfolio, ico.globe],
      ["Intelligence Repo", site.links.brain, ico.star],
      ["Pricing", site.links.pricing, ico.doc],
      ["GitHub", site.links.github, ico.code],
      ["LinkedIn", site.links.linkedin, ico.user],
      ["X (Twitter)", site.links.x, ico.user],
      ["Newsletter", site.links.newsletter, ico.mail],
      ["Substack", site.links.substack, ico.doc],
      ["Medium", site.links.medium, ico.doc],
      ["HackerNoon", site.links.hackernoon, ico.doc],
      ["Hashnode", site.links.hashnode, ico.doc],
      ["Kaggle", site.links.kaggle, ico.star],
      ["LeetCode", site.links.leetcode, ico.code],
      ["HackerRank", site.links.hackerrank, ico.code],
      ["Exercism", site.links.exercism, ico.code],
      ["Codewars", site.links.codewars, ico.code],
      ["Deep-ML", site.links.deepml, ico.star],
      ["Patreon", site.links.patreon, ico.star],
      ["Gumroad", site.links.gumroad, ico.star],
      ["Linktree", site.links.linktree, ico.globe],
      ["Quora", site.links.quora, ico.doc],
      ["Reddit", site.links.reddit, ico.user],
      ["Email", site.links.email, ico.mail]
    ];
    heroLinksEl.innerHTML = heroLinks
      .filter(function (l) { return l[1]; })
      .map(function (l) { return '<li><a class="hero-link-btn" href="' + esc(l[1]) + '" rel="me noopener">' + l[2] + "<span>" + esc(l[0]) + "</span></a></li>"; })
      .join("");
  }

  /* ---------- video frame ---------- */
  function frame(p) {
    var v = (p.links && p.links.video) || "", poster = (p.links && p.links.poster) || "";
    var title = esc(p.title);
    if (v.indexOf("yt:") === 0) {
      // Click-to-load facade: no YouTube code runs until the visitor asks for it.
      var id = esc(v.slice(3));
      return '<div class="frame">' +
        (poster ? '<img src="' + esc(poster) + '" alt="" loading="lazy">' : "") +
        '<button class="poster" data-yt="' + id + '" aria-label="Play recording: ' + title + '">' +
        (poster ? "" : '<span class="poster-title">' + title + "</span>") +
        '<span class="play" aria-hidden="true"></span></button></div>';
    }
    if (v) {
      return '<div class="frame"><video controls preload="none" playsinline' +
        (poster ? ' poster="' + esc(poster) + '"' : "") +
        ' aria-label="Recording: ' + title + '"><source src="' + esc(v) + '" type="video/mp4"></video></div>';
    }
    return '<div class="frame"><div class="poster"><span class="poster-title">Recording in progress</span>' +
      '<span class="poster-note">The full run will play here</span></div></div>';
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-yt]");
    if (!btn) return;
    var f = btn.parentElement;
    f.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + btn.getAttribute("data-yt") +
      '?autoplay=1&rel=0" title="Recording" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
  });

  function linksRow(p) {
    var l = p.links || {}, out = [];
    if (l.demo) out.push('<a href="' + esc(l.demo) + '" rel="noopener">Open the demo</a>');
    if (l.source) out.push('<a href="' + esc(l.source) + '" rel="noopener">Source code</a>');
    if (l.writeup) out.push('<a href="' + esc(l.writeup) + '" rel="noopener">Read the write-up</a>');
    if (!out.length) return "";
    return '<div class="links">' + out.join("") + "</div>" +
      (l.source && p.sourceAbout ? '<p class="source-about">' + esc(p.sourceAbout) + "</p>" : "") +
      (l.source && p.useCases ? '<p class="source-uses">' + esc(p.useCases) + "</p>" : "");
  }
  function stackList(p) {
    return '<ul class="stack" aria-label="Built with">' +
      (p.stack || []).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>";
  }
  function licenseBadge(p) {
    return p.license ? '<p class="license"><a href="LICENSE" rel="license">' + esc(p.license) + " License</a></p>" : "";
  }
  function pill(p) { return '<span class="pill pill-' + esc(p.status) + '">' + esc(STATUS[p.status] || p.status) + "</span>"; }

  /* ---------- automations ---------- */
  var autos = projects.filter(function (p) { return p.lane === "claude"; });
  document.getElementById("automation-list").innerHTML = autos.map(function (p) {
    return '<article class="automation ' + toneOf(p.lane) + '" id="' + esc(p.id) + '">' +
      frame(p) +
      "<div>" + pill(p) +
      "<h3>" + esc(p.title) + "</h3>" +
      '<p class="problem"><strong>Problem:</strong> ' + esc(p.problem) + "</p>" +
      '<p class="summary">' + esc(p.summary) + "</p>" +
      stackList(p) + licenseBadge(p) + linksRow(p) +
      '<p class="updated">Updated ' + esc(p.updated) + "</p></div></article>";
  }).join("");

  /* ---------- screenshot carousel ---------- */
  function carousel(p) {
    var imgs = p.images || [];
    if (!imgs.length) return "";
    var slides = imgs.map(function (im, i) {
      return '<figure class="car-slide" aria-label="' + (i + 1) + " of " + imgs.length + '">' +
        '<a href="' + esc(im.src) + '" target="_blank" rel="noopener" class="car-zoom" aria-label="Open full image: ' + esc(im.alt || im.caption || "screenshot") + '">' +
        '<img src="' + esc(im.src) + '" alt="' + esc(im.alt || "") + '" loading="lazy"></a>' +
        (im.caption ? "<figcaption>" + esc(im.caption) + "</figcaption>" : "") + "</figure>";
    }).join("");
    var controls = imgs.length < 2 ? "" :
      '<button class="car-btn car-prev" aria-label="Previous image">&#8249;</button>' +
      '<button class="car-btn car-next" aria-label="Next image">&#8250;</button>' +
      '<div class="car-dots">' + imgs.map(function (_, i) {
        return '<button class="car-dot" aria-label="Show image ' + (i + 1) + '"' + (i === 0 ? ' aria-current="true"' : "") + "></button>";
      }).join("") + "</div>";
    return '<div class="carousel" role="region" aria-roledescription="carousel" aria-label="Screenshots: ' + esc(p.title) + '">' +
      '<div class="car-track" tabindex="0">' + slides + "</div>" + controls + "</div>";
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest(".car-prev, .car-next, .car-dot");
    if (!b) return;
    var c = b.closest(".carousel"), t = c.querySelector(".car-track"), w = t.clientWidth;
    var n = t.children.length, i = Math.round(t.scrollLeft / w);
    if (b.classList.contains("car-prev")) i -= 1;
    else if (b.classList.contains("car-next")) i += 1;
    else i = Array.prototype.indexOf.call(c.querySelectorAll(".car-dot"), b);
    t.scrollTo({ left: ((i + n) % n) * w, behavior: "smooth" });
  });

  // scroll events do not bubble, so listen in the capture phase
  document.addEventListener("scroll", function (e) {
    var t = e.target;
    if (!t.classList || !t.classList.contains("car-track")) return;
    var i = Math.round(t.scrollLeft / t.clientWidth);
    Array.prototype.forEach.call(t.parentElement.querySelectorAll(".car-dot"), function (d, k) {
      if (k === i) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current");
    });
  }, true);

  /* ---------- Run Project: live GUI in the page ---------- */
  function safeSrc(u) { return /^(https:\/\/|[a-z0-9_\-][a-z0-9_\-\/.]*$)/i.test(u || "") ; }
  function runPanel(p) {
    var r = p.run;
    if (!r || !safeSrc(r.src)) return "";
    return '<div class="run" data-height="' + esc(r.height || 640) + '">' +
      '<div class="run-bar"><button type="button" class="btn btn-gold" data-run="' + esc(r.src) +
      '" data-title="' + esc(p.title) + '" aria-expanded="false">&#9654; Run Project</button>' +
      '<p class="run-note">' + esc(r.note || "") + "</p></div>" +
      '<div class="run-stage"></div></div>';
  }
  function extensionBlock(p) {
    var x = p.extension;
    if (!x) return "";
    return '<div class="ext"><h4>' + esc(x.title) + "</h4><p>" + esc(x.text) + "</p><ul>" +
      (x.points || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
      '<p class="ext-links">' + (x.download ? '<a href="' + esc(x.download) + '" download>Download the extension (.zip)</a>' : "") +
      (x.source ? '<a href="' + esc(x.source) + '" rel="noopener">Extension source</a>' : "") + "</p></div>";
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-run]");
    if (!b) return;
    var box = b.closest(".run"), stage = box.querySelector(".run-stage");
    if (b.getAttribute("aria-expanded") === "true") {
      stage.innerHTML = "";
      b.setAttribute("aria-expanded", "false");
      b.innerHTML = "&#9654; Run Project";
      return;
    }
    var src = b.getAttribute("data-run");
    stage.innerHTML = '<iframe class="run-frame" style="height:' + Number(box.getAttribute("data-height")) +
      'px" src="' + src + '" title="Live project: ' + b.getAttribute("data-title") +
      '" sandbox="allow-scripts allow-same-origin allow-forms allow-downloads allow-modals allow-popups"></iframe>' +
      '<p class="run-open"><a href="' + src + '" target="_blank" rel="noopener">Open full screen in a new tab</a></p>';
    b.setAttribute("aria-expanded", "true");
    b.innerHTML = "&#9632; Close Project";
  });

  /* ---------- demos with filters ---------- */
  var demos = projects.filter(function (p) { return p.lane !== "claude"; });
  var grid = document.getElementById("demo-grid");

  function renderDemos(lane) {
    var list = lane === "all" ? demos : demos.filter(function (p) { return p.lane === lane; });
    grid.innerHTML = list.length ? list.map(function (p) {
      var hasVideo = p.links && p.links.video;
      return '<article class="demo ' + toneOf(p.lane) + '" id="' + esc(p.id) + '">' +
        '<div class="demo-top"><span class="demo-lane">' +
        (p.icon ? '<img class="demo-icon" src="' + esc(p.icon) + '" alt="" width="24" height="24">' : "") +
        esc(laneLabel(p.lane)) + "</span>" + pill(p) + "</div>" +
        "<h3>" + esc(p.title) + "</h3>" +
        '<p class="problem"><strong>Problem:</strong> ' + esc(p.problem) + "</p>" +
        '<p class="summary">' + esc(p.summary) + "</p>" +
        (hasVideo ? frame(p) : "") + carousel(p) + runPanel(p) +
        stackList(p) + licenseBadge(p) + linksRow(p) + extensionBlock(p) +
        '<p class="updated">Updated ' + esc(p.updated) + "</p></article>";
    }).join("") : '<p class="empty">Nothing in this area yet.</p>';
  }

  var demoLanes = Object.keys(lanes).filter(function (k) {
    return k !== "claude" && demos.some(function (p) { return p.lane === k; });
  });
  var filters = document.getElementById("filters");
  var filterButtons = ['<button class="chip" data-lane="all" aria-pressed="true">All</button>']
    .concat(demoLanes.map(function (k) {
      return '<button class="chip" data-lane="' + esc(k) + '" aria-pressed="false">' + esc(laneLabel(k)) + "</button>";
    }));
  filterButtons.push('<button class="chip" data-lane="claude" aria-pressed="false">Claude</button>');
  filterButtons.push('<button class="chip" data-lane="knowledge" aria-pressed="false">Knowledge</button>');
  if (data.pwas && data.pwas.length) {
    filterButtons.push('<button class="chip" data-lane="apps" aria-pressed="false">Web Apps</button>');
  }
  filters.innerHTML = filterButtons.join("");

  var subAutomations = document.getElementById("automations");
  var subSkills = document.getElementById("skills");
  var subApps = document.getElementById("apps");

  function setFilter(lane) {
    Array.prototype.forEach.call(filters.querySelectorAll(".chip"), function (c) {
      c.setAttribute("aria-pressed", String(c.getAttribute("data-lane") === lane));
    });
    var isAll = lane === "all";
    var showDemos = isAll || (lane !== "claude" && lane !== "knowledge" && lane !== "apps");
    grid.hidden = !showDemos;
    if (showDemos) renderDemos(lane);
    if (subAutomations) subAutomations.hidden = !(isAll || lane === "claude");
    if (subSkills) subSkills.hidden = !(isAll || lane === "knowledge");
    if (subApps) subApps.hidden = !(isAll || lane === "apps");
  }
  filters.addEventListener("click", function (e) {
    var c = e.target.closest(".chip");
    if (c) setFilter(c.getAttribute("data-lane"));
  });
  setFilter("all");

  /* ---------- hero lane index (counts are computed, never typed) ---------- */
  function countText(lane) {
    var n = projects.filter(function (p) { return p.lane === lane; }).length;
    var live = projects.filter(function (p) { return p.lane === lane && p.status === "live"; }).length;
    return n + (n === 1 ? " project" : " projects") + (live ? ", " + live + " live" : "");
  }
  var indexLanes = Object.keys(lanes).filter(function (k) { return projects.some(function (p) { return p.lane === k; }); });
  var indexHtml = indexLanes.map(function (k) {
    return '<li><button class="lane-link ' + toneOf(k) + '" data-goto="' + esc(k) + '">' +
      '<span class="lane-name">' + esc(laneLabel(k)) + '</span><span class="lane-count">' + countText(k) + "</span></button></li>";
  });
  indexHtml.push('<li><button class="lane-link tone-violet" data-goto="knowledge"><span class="lane-name">Knowledge</span>' +
    '<span class="lane-count">1 live</span></button></li>');
  if (data.pwas && data.pwas.length) {
    indexHtml.push('<li><button class="lane-link tone-cyan" data-goto="apps"><span class="lane-name">Web apps</span>' +
      '<span class="lane-count">' + data.pwas.length + " live</span></button></li>");
  }
  var laneIndex = document.getElementById("lane-index");
  laneIndex.innerHTML = indexHtml.join("");
  laneIndex.addEventListener("click", function (e) {
    var b = e.target.closest("[data-goto]");
    if (!b) return;
    var lane = b.getAttribute("data-goto");
    setFilter(lane);
    document.getElementById("demos").scrollIntoView();
  });

  /* ---------- PWAs ---------- */
  document.getElementById("pwa-list").innerHTML = (data.pwas || []).map(function (a) {
    var icon = a.icon ? '<img src="' + esc(a.icon) + '" alt="' + esc(a.name) + ' preview">' : esc((a.name || "?").charAt(0));
    var sourceHtml = a.source
      ? '<div class="pwa-source"><div class="links"><a href="' + esc(a.url) + '" rel="noopener">Open app</a><a href="' + esc(a.source) + '" rel="noopener">Source code</a></div>' +
        (a.sourceDesc ? '<p class="source-uses">' + esc(a.sourceDesc) + "</p>" : "") + "</div>"
      : "";
    return '<li class="pwa-card">' +
      '<div class="demo-top"><span class="demo-lane tone-cyan">Web App</span><span class="pill pill-live">Live</span></div>' +
      "<h3>" + esc(a.name) + "</h3>" +
      '<p class="pwa-purpose">' + esc(a.purpose) + "</p>" +
      '<a class="pwa-card-link" href="' + esc(a.url) + '" rel="noopener"><span class="pwa-icon" aria-hidden="true">' + icon + "</span></a>" +
      sourceHtml + "</li>";
  }).join("");

  /* ---------- dynamic footer ---------- */
  var contactFooter = document.getElementById("contact");
  if (contactFooter && window.fetch) {
    fetch("footer.html")
      .then(function (res) { return res.ok ? res.text() : Promise.reject(res.status); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        var fetchedFooter = doc.querySelector("footer");
        if (fetchedFooter) {
          fetchedFooter.id = "contact";
          contactFooter.replaceWith(fetchedFooter);
        }
      })
      .catch(function () { /* Keep fallback footer if fetch fails (e.g. file://) */ });
  }
})();
