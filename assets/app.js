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
  var STATUS = { live: "Live", video: "Video", building: "Building" };

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
    return out.length ? '<div class="links">' + out.join("") + "</div>" : "";
  }
  function stackList(p) {
    return '<ul class="stack" aria-label="Built with">' +
      (p.stack || []).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>";
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
      stackList(p) + linksRow(p) +
      '<p class="updated">Updated ' + esc(p.updated) + "</p></div></article>";
  }).join("");

  /* ---------- screenshot carousel ---------- */
  function carousel(p) {
    var imgs = p.images || [];
    if (!imgs.length) return "";
    var slides = imgs.map(function (im, i) {
      return '<figure class="car-slide" aria-label="' + (i + 1) + " of " + imgs.length + '">' +
        '<img src="' + esc(im.src) + '" alt="' + esc(im.alt || "") + '" loading="lazy">' +
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

  /* ---------- demos with filters ---------- */
  var demos = projects.filter(function (p) { return p.lane !== "claude"; });
  var grid = document.getElementById("demo-grid");

  function renderDemos(lane) {
    var list = lane === "all" ? demos : demos.filter(function (p) { return p.lane === lane; });
    grid.innerHTML = list.length ? list.map(function (p) {
      var hasVideo = p.links && p.links.video;
      return '<article class="demo ' + toneOf(p.lane) + '" id="' + esc(p.id) + '">' +
        (hasVideo ? frame(p) : "") + carousel(p) +
        '<div class="demo-top"><span class="demo-lane">' +
        (p.icon ? '<img class="demo-icon" src="' + esc(p.icon) + '" alt="" width="24" height="24">' : "") +
        esc(laneLabel(p.lane)) + "</span>" + pill(p) + "</div>" +
        "<h3>" + esc(p.title) + "</h3>" +
        '<p class="problem"><strong>Problem:</strong> ' + esc(p.problem) + "</p>" +
        '<p class="summary">' + esc(p.summary) + "</p>" +
        stackList(p) + linksRow(p) +
        '<p class="updated">Updated ' + esc(p.updated) + "</p></article>";
    }).join("") : '<p class="empty">Nothing in this area yet.</p>';
  }

  var demoLanes = Object.keys(lanes).filter(function (k) {
    return k !== "claude" && demos.some(function (p) { return p.lane === k; });
  });
  var filters = document.getElementById("filters");
  filters.innerHTML = ['<button class="chip" data-lane="all" aria-pressed="true">All</button>']
    .concat(demoLanes.map(function (k) {
      return '<button class="chip" data-lane="' + esc(k) + '" aria-pressed="false">' + esc(laneLabel(k)) + "</button>";
    })).join("");

  function setFilter(lane) {
    Array.prototype.forEach.call(filters.querySelectorAll(".chip"), function (c) {
      c.setAttribute("aria-pressed", String(c.getAttribute("data-lane") === lane));
    });
    renderDemos(lane);
  }
  filters.addEventListener("click", function (e) {
    var c = e.target.closest(".chip");
    if (c) setFilter(c.getAttribute("data-lane"));
  });
  renderDemos("all");

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
    if (lane === "claude") return document.getElementById("automations").scrollIntoView();
    if (lane === "knowledge") return document.getElementById("brain-title").scrollIntoView();
    if (lane === "apps") return document.getElementById("apps").scrollIntoView();
    setFilter(lane);
    document.getElementById("demos").scrollIntoView();
  });

  /* ---------- PWAs ---------- */
  document.getElementById("pwa-list").innerHTML = (data.pwas || []).map(function (a) {
    var icon = a.icon ? '<img src="' + esc(a.icon) + '" alt="">' : esc((a.name || "?").charAt(0));
    return '<li><a href="' + esc(a.url) + '" rel="noopener"><span class="pwa-icon" aria-hidden="true">' + icon + "</span>" +
      '<span><span class="pwa-name">' + esc(a.name) + ' <span class="pill pill-live">Live</span></span><span class="pwa-purpose">' + esc(a.purpose) + "</span></span></a></li>";
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
