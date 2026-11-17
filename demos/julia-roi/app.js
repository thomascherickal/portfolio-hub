/**
 * AI Adoption Business Case Simulator — 5-Paradigm Executive Controller (`app.js`)
 *
 * Features:
 * 1. Interactive buttons across ALL 5 Panes (Tab 1, Tab 2, Tab 3, Tab 4, Tab 5).
 * 2. Smooth 1-second (500ms fade-out + 500ms fade-in) animations on every pane switch,
 *    strategy switch, and sub-window chart button click via `window.animateFadeSwap`.
 * 3. Non-repetitive light-gold underlined terms (`t(key, label)`)—each term is underlined
 *    once at its primary KPI heading and guaranteed to display a plain-English tooltip.
 */

const state = window.state = {
  bundle: null,
  activeScenarioId: "pragmatic_phased",
  activeTabPanelId: "panel-mc",
  // Pane 1 (Monte Carlo) sub-window states
  activeTrajectoryKey: "cumulative_cashflow_usd",
  activeDistributionKey: "roi_pct_histogram",
  // Pane 2 (Agent-Based) sub-window states
  activeAbmView: "all_states",
  activeAbmDept: "all",
  // Pane 3 (System Dynamics) sub-window states
  activeSdStockView: "all",
  activeSdFlowView: "monthly_flows",
  activeSdLoopId: null,
  // Pane 4 (Discrete Event) sub-window states
  activeDesTrajView: "cycle_time",
  activeDesBarView: "utilization",
  // Pane 5 (Bayesian Network) sub-window states
  activeBnPresetId: "strong_pilot",
  activeBnChartView: "regime_probs",
  activeBnNodeId: "roi_regime",
  // Global scale
  scaleMultiplier: 1.0
};

function t(key, label) {
  return window.termHtml ? window.termHtml(key, label) : label;
}

function escAttr(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const PANEL_TO_PARADIGM = {
  "panel-mc": "monte_carlo",
  "panel-abm": "agent_based",
  "panel-sd": "system_dynamics",
  "panel-des": "discrete_event",
  "panel-bn": "bayesian_network"
};

function fadeSwap(targets, fn) {
  if (window.animateFadeSwap) {
    window.animateFadeSwap(targets, fn, 2000);
  } else {
    fn();
  }
}

function fmtCurrencyCompact(val) {
  const scaled = val * state.scaleMultiplier;
  const abs = Math.abs(scaled);
  const sign = scaled < 0 ? "-" : (scaled > 0 ? "+" : "");
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `${sign}$${Math.round(abs / 1_000).toLocaleString()}k`;
  return `${sign}$${Math.round(abs).toLocaleString()}`;
}

function fmtCurrencyAbs(val) {
  const scaled = val * state.scaleMultiplier;
  const abs = Math.abs(scaled);
  const prefix = scaled < 0 ? "-$" : "$";
  if (abs >= 1_000_000) return `${prefix}${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `${prefix}${Math.round(abs / 1_000).toLocaleString()}k`;
  return `${prefix}${Math.round(abs).toLocaleString()}`;
}

function fmtPct(val, digits = 1, showPlus = true) {
  const sign = val > 0 && showPlus ? "+" : "";
  return `${sign}${Number(val).toFixed(digits)}%`;
}

function fmtMonths(val) {
  if (val > 36) return "> 36m";
  return `${Number(val).toFixed(1)} mo`;
}

function getActiveScenario() {
  if (!state.bundle) return null;
  return state.bundle.scenarios.find(s => s.id === state.activeScenarioId) || state.bundle.scenarios[0];
}

async function init() {
  try {
    if (window.location.protocol === "file:" && window.PRECOMPUTED_SCENARIOS_BUNDLE) {
      state.bundle = window.PRECOMPUTED_SCENARIOS_BUNDLE;
    } else {
      try {
        const resp = await fetch("data/scenarios.json");
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        state.bundle = await resp.json();
      } catch (fetchErr) {
        if (window.PRECOMPUTED_SCENARIOS_BUNDLE) {
          state.bundle = window.PRECOMPUTED_SCENARIOS_BUNDLE;
        } else {
          throw fetchErr;
        }
      }
    }
    state.activeScenarioId = state.bundle.default_scenario_id || state.bundle.scenarios[0].id;

    const prov = document.getElementById("model-provenance");
    if (prov && state.bundle.generated_by) {
      prov.textContent = `${state.bundle.generated_by}`;
    }

    initAccessibleTabs();
    bindSubWindowButtons();
    renderAll();
  } catch (err) {
    console.error("Failed to load precomputed scenarios.json:", err);
  }
}

/**
 * Accessible Tablist controller with 1-second fade-out and fade-in transition between panes.
 */
function initAccessibleTabs() {
  const tablist = document.querySelector(".science-tablist");
  if (!tablist) return;
  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
  const panels = tabs.map(tb => document.getElementById(tb.getAttribute("data-paradigm-tab")));
  const stackEl = document.getElementById("tabpanels-stack");

  function selectTab(selectedTab, moveFocus = false) {
    const targetPanelId = selectedTab.getAttribute("data-paradigm-tab");
    if (targetPanelId === state.activeTabPanelId) return;

    tabs.forEach(tb => {
      const isSel = tb === selectedTab;
      tb.setAttribute("aria-selected", isSel ? "true" : "false");
      tb.toggleAttribute("focusgroupstart", isSel);
      tb.tabIndex = isSel ? 0 : -1;
    });

    if (moveFocus) {
      selectedTab.focus();
    }

    try {
      selectedTab.scrollIntoView({ block: "nearest", inline: "nearest", container: "nearest" });
    } catch (_) {
      selectedTab.scrollIntoView({ block: "nearest", inline: "nearest" });
    }

    fadeSwap(stackEl, () => {
      state.activeTabPanelId = targetPanelId;
      tabs.forEach((tb, idx) => {
        const isSel = tb === selectedTab;
        const panel = panels[idx];
        if (panel) {
          if (isSel) {
            panel.removeAttribute("hidden");
            panel.tabIndex = 0;
          } else {
            panel.setAttribute("hidden", "until-found");
            panel.removeAttribute("tabindex");
          }
        }
      });
      const sc = getActiveScenario();
      if (sc) renderAllParadigms(sc);
      if (window.syncInWindowMarkdown && PANEL_TO_PARADIGM[targetPanelId]) {
        window.syncInWindowMarkdown(PANEL_TO_PARADIGM[targetPanelId]);
      }
    });
  }

  tabs.forEach((tb, idx) => {
    tb.addEventListener("click", () => selectTab(tb, false));

    tb.addEventListener("keydown", (e) => {
      let nextIdx = -1;
      if (e.key === "ArrowRight") nextIdx = (idx + 1) % tabs.length;
      else if (e.key === "ArrowLeft") nextIdx = (idx - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") nextIdx = 0;
      else if (e.key === "End") nextIdx = tabs.length - 1;

      if (nextIdx !== -1) {
        e.preventDefault();
        selectTab(tabs[nextIdx], true);
      }
    });

    const panel = panels[idx];
    if (panel) {
      panel.addEventListener("beforematch", () => selectTab(tb, false));
    }
  });
}

function bindButtonGroup(selector, attrName, onSelect) {
  document.querySelectorAll(selector).forEach(btn => {
    btn.addEventListener("click", () => {
      const val = btn.getAttribute(attrName);
      document.querySelectorAll(selector).forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      onSelect(val);
    });
  });
}

function bindSubWindowButtons() {
  const slider = document.getElementById("headcount-scale-slider");
  if (slider) {
    slider.addEventListener("input", (e) => {
      state.scaleMultiplier = parseFloat(e.target.value) || 1.0;
      const sc = getActiveScenario();
      const baseHc = sc ? sc.metadata.total_headcount : 325;
      const scaledHc = Math.round(baseHc * state.scaleMultiplier);
      document.getElementById("scale-multiplier-val").textContent =
        `${state.scaleMultiplier.toFixed(2)}x (${scaledHc} Staff)`;
      renderAll();
    });
  }

  // Pane 1 sub-window buttons
  bindButtonGroup("[data-traj]", "data-traj", (val) => {
    state.activeTrajectoryKey = val;
    fadeSwap(document.getElementById("trajectory-chart-container"), () => {
      renderTrajectoryChart(getActiveScenario());
    });
  });

  bindButtonGroup("[data-dist]", "data-dist", (val) => {
    state.activeDistributionKey = val;
    fadeSwap(document.getElementById("distribution-chart-container"), () => {
      renderDistributionChart(getActiveScenario());
    });
  });

  // Pane 2 (ABM) sub-window buttons
  bindButtonGroup("[data-abm-view]", "data-abm-view", (val) => {
    state.activeAbmView = val;
    fadeSwap(document.getElementById("abm-trajectory-chart"), () => {
      const sc = getActiveScenario();
      if (sc && sc.paradigms?.agent_based) renderAbmTrajectoryChart(sc.paradigms.agent_based);
    });
  });

  bindButtonGroup("[data-abm-dept]", "data-abm-dept", (val) => {
    state.activeAbmDept = val;
    fadeSwap(document.getElementById("abm-network-chart"), () => {
      const sc = getActiveScenario();
      if (sc && sc.paradigms?.agent_based) renderAbmNetworkChart(sc.paradigms.agent_based);
    });
  });

  // Pane 3 (System Dynamics) sub-window buttons
  bindButtonGroup("[data-sd-stock]", "data-sd-stock", (val) => {
    state.activeSdStockView = val;
    state.activeSdLoopId = null;
    fadeSwap(document.getElementById("sd-stocks-chart"), () => {
      const sc = getActiveScenario();
      if (sc && sc.paradigms?.system_dynamics) renderSdTab(sc.paradigms.system_dynamics);
    });
  });

  bindButtonGroup("[data-sd-flow]", "data-sd-flow", (val) => {
    state.activeSdFlowView = val;
    fadeSwap(document.getElementById("sd-flows-chart"), () => {
      const sc = getActiveScenario();
      if (sc && sc.paradigms?.system_dynamics) renderSdFlowsChart(sc.paradigms.system_dynamics);
    });
  });

  // Pane 4 (Discrete Event) sub-window buttons
  bindButtonGroup("[data-des-traj]", "data-des-traj", (val) => {
    state.activeDesTrajView = val;
    fadeSwap(document.getElementById("des-cycle-chart"), () => {
      const sc = getActiveScenario();
      if (sc && sc.paradigms?.discrete_event) renderDesCycleChart(sc.paradigms.discrete_event);
    });
  });

  bindButtonGroup("[data-des-bar]", "data-des-bar", (val) => {
    state.activeDesBarView = val;
    fadeSwap(document.getElementById("des-utilization-chart"), () => {
      const sc = getActiveScenario();
      if (sc && sc.paradigms?.discrete_event) renderDesUtilizationChart(sc.paradigms.discrete_event);
    });
  });

  // Pane 5 (Bayesian Network) sub-window buttons
  bindButtonGroup("[data-bn-view]", "data-bn-view", (val) => {
    state.activeBnChartView = val;
    fadeSwap(document.getElementById("bn-posterior-chart"), () => {
      const sc = getActiveScenario();
      if (sc && sc.paradigms?.bayesian_network) renderBnPosteriorChart(sc.paradigms.bayesian_network);
    });
  });
}

function renderAll() {
  const sc = getActiveScenario();
  if (!sc) return;

  renderScenarioCards();
  renderBoardMemo(sc);
  renderAllParadigms(sc);
  renderCrossParadigmTable(sc);
  renderComparisonTable();
  if (window.hydrateGoldTerms) window.hydrateGoldTerms(document);
}

function renderAllParadigms(sc) {
  renderKpiGrid(sc);
  renderTrajectoryChart(sc);
  renderDistributionChart(sc);
  renderTornadoChart(sc);
  renderWaterfallChart(sc);
  renderTeamTable(sc);

  if (sc.paradigms?.agent_based) renderAbmTab(sc.paradigms.agent_based);
  if (sc.paradigms?.system_dynamics) renderSdTab(sc.paradigms.system_dynamics);
  if (sc.paradigms?.discrete_event) renderDesTab(sc.paradigms.discrete_event);
  if (sc.paradigms?.bayesian_network) renderBnTab(sc.paradigms.bayesian_network);

  if (window.hydrateGoldTerms) {
    window.hydrateGoldTerms(document.getElementById("tabpanels-stack") || document);
  }
}

function renderScenarioCards() {
  const container = document.getElementById("scenario-selector");
  container.innerHTML = "";

  for (const sc of state.bundle.scenarios) {
    const isSelected = sc.id === state.activeScenarioId;
    const roi = sc.kpis.roi_pct;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "scenario-card";
    btn.setAttribute("role", "radio");
    btn.setAttribute("aria-checked", isSelected ? "true" : "false");

    btn.innerHTML = `
      <div class="scenario-card-top">
        <span class="scenario-title">${sc.name}</span>
        <span class="scenario-badge">Typical: ${fmtPct(roi.p50)}</span>
      </div>
      <div class="scenario-tagline">${sc.tagline}</div>
      <div class="scenario-desc">${sc.description}</div>
      <div class="scenario-mini-range">
        <span>Cautious (P10): <strong class="${roi.p10 < 0 ? 'val-neg' : 'val-warn'}">${fmtPct(roi.p10)}</strong></span>
        <span>Breakeven: <strong>${fmtMonths(sc.kpis.payback_months.p50)}</strong></span>
        <span>Best (P90): <strong class="val-pos">${fmtPct(roi.p90)}</strong></span>
      </div>
    `;

    btn.addEventListener("click", () => {
      if (state.activeScenarioId === sc.id) return;
      state.activeScenarioId = sc.id;
      renderScenarioCards();
      const targets = [
        document.getElementById("board-memo-banner"),
        document.getElementById("tabpanels-stack"),
        document.getElementById("cross-paradigm-table"),
        document.getElementById("scenario-comparison-table")
      ];
      fadeSwap(targets, () => {
        renderAll();
      });
    });
    container.appendChild(btn);
  }
}

function renderBoardMemo(sc) {
  document.getElementById("scenario-recommendation").textContent = sc.board_recommendation;
  const a = sc.assumptions;
  const pills = document.getElementById("scenario-assumptions-pills");
  pills.innerHTML = `
    <span class="assumption-chip">${t("s_curve", "Max Staff Using AI")}: <strong>${a.rollout_ceiling_pct[0]}–${a.rollout_ceiling_pct[2]}%</strong></span>
    <span class="assumption-chip">Half-Onboard Month: <strong>M${a.inflection_month[0]}–M${a.inflection_month[2]}</strong></span>
    <span class="assumption-chip">${t("j_curve", "Early Learning Dip")}: <strong>-${a.j_curve_dip_pct[1]}%</strong></span>
    <span class="assumption-chip">${t("token_sprawl", "Annual Bill Creep")}: <strong>+${a.annual_token_drift_pct[0]}–${a.annual_token_drift_pct[2]}%</strong></span>
  `;
}

// ============================================================================
// TAB 1 RENDERERS: 10,000 WHAT-IF FUTURES (MONTE CARLO)
// ============================================================================

function renderKpiGrid(sc) {
  const k = sc.kpis;
  const cards = [
    {
      title: `3-Year ${t("roi", "Return on Investment (ROI)")}`,
      p50: fmtPct(k.roi_pct.p50),
      p10: fmtPct(k.roi_pct.p10),
      p90: fmtPct(k.roi_pct.p90),
      note: `Odds of Making a Profit: ${k.prob_positive_npv_pct}%`
    },
    {
      title: `3-Year ${t("npv", "Net Profit Today (NPV)")}`,
      p50: fmtCurrencyCompact(k.npv_usd.p50),
      p10: fmtCurrencyCompact(k.npv_usd.p10),
      p90: fmtCurrencyCompact(k.npv_usd.p90),
      note: `Middle 50% Band: ${fmtCurrencyCompact(k.npv_usd.p25)} to ${fmtCurrencyCompact(k.npv_usd.p75)}`
    },
    {
      title: `${t("payback", "Breakeven Month")}`,
      p50: fmtMonths(k.payback_months.p50),
      p10: `${fmtMonths(k.payback_months.p10)} (Fast)`,
      p90: `${fmtMonths(k.payback_months.p90)} (Slow)`,
      note: `Odds of Breaking Even Within 2 Yrs: ${k.prob_breakeven_within_24m_pct}%`
    },
    {
      title: `${t("tco", "Total 3-Year Cost")}`,
      p50: fmtCurrencyAbs(k.total_cost_36m_usd.p50),
      p10: fmtCurrencyAbs(k.total_cost_36m_usd.p10),
      p90: fmtCurrencyAbs(k.total_cost_36m_usd.p90),
      note: `Cleanup Drag: ${fmtCurrencyAbs(k.total_rework_drag_36m_usd.p50)}`
    },
    {
      title: `Month-36 ${t("realization", "Net Speed Gain")}`,
      p50: fmtPct(k.month36_net_productivity_uplift_pct.p50, 2),
      p10: fmtPct(k.month36_net_productivity_uplift_pct.p10, 2),
      p90: fmtPct(k.month36_net_productivity_uplift_pct.p90, 2),
      note: `Staff Using AI at M36: ${fmtPct(k.month36_adoption_pct.p50, 1, false)}`
    }
  ];

  document.getElementById("kpi-grid").innerHTML = cards.map(c => `
    <div class="kpi-card">
      <div class="kpi-title">${c.title}</div>
      <div class="kpi-median">${c.p50} <span class="p50-tag">Typical P50</span></div>
      <div class="kpi-range-box">
        <div class="range-endpoints">
          <span>P10: <strong class="p10-val">${c.p10}</strong></span>
          <span>P90: <strong class="p90-val">${c.p90}</strong></span>
        </div>
        <div class="range-bar-track"><div class="range-bar-fill"></div></div>
        <div class="val-muted">${c.note}</div>
      </div>
    </div>
  `).join("");
}

function renderTrajectoryChart(sc) {
  const container = document.getElementById("trajectory-chart-container");
  const months = sc.trajectories.months;
  const key = state.activeTrajectoryKey;
  const series = sc.trajectories[key];

  const isCurrency = key.endsWith("_usd");
  const mult = isCurrency ? state.scaleMultiplier : 1.0;

  const p10 = series.p10.map(v => v * mult);
  const p25 = series.p25.map(v => v * mult);
  const p50 = series.p50.map(v => v * mult);
  const p75 = series.p75.map(v => v * mult);
  const p90 = series.p90.map(v => v * mult);

  const W = 680, H = 280;
  const pad = { top: 20, right: 24, bottom: 36, left: 68 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;

  let minY = Math.min(0, ...p10);
  let maxY = Math.max(...p90);
  if (maxY === minY) maxY = minY + 1;
  const rangeY = maxY - minY;
  minY -= rangeY * 0.06;
  maxY += rangeY * 0.08;

  const xOf = (m) => pad.left + ((m - 1) / (months.length - 1)) * plotW;
  const yOf = (v) => pad.top + plotH - ((v - minY) / (maxY - minY)) * plotH;

  const buildPolygon = (upper, lower) => {
    const topPts = upper.map((v, i) => `${xOf(months[i]).toFixed(1)},${yOf(v).toFixed(1)}`);
    const botPts = [...lower].reverse().map((v, i) => {
      const m = months[months.length - 1 - i];
      return `${xOf(m).toFixed(1)},${yOf(v).toFixed(1)}`;
    });
    return [...topPts, ...botPts].join(" ");
  };

  const buildLine = (arr) => arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${xOf(months[i]).toFixed(1)},${yOf(v).toFixed(1)}`).join(" ");

  const fmtTick = (v) => {
    if (isCurrency) {
      if (Math.abs(v) >= 1_000_000) return `${v < 0 ? '-' : ''}$${(Math.abs(v) / 1_000_000).toFixed(1)}M`;
      return `${v < 0 ? '-' : ''}$${Math.round(Math.abs(v) / 1000)}k`;
    }
    return `${v.toFixed(1)}%`;
  };

  let gridLines = "";
  for (let i = 0; i <= 5; i++) {
    const val = minY + (i / 5) * (maxY - minY);
    const y = yOf(val);
    gridLines += `
      <line x1="${pad.left}" y1="${y}" x2="${W - pad.right}" y2="${y}" stroke="var(--border-color)" stroke-dasharray="3,3" />
      <text x="${pad.left - 8}" y="${y + 4}" text-anchor="end" fill="var(--text-secondary)" font-size="11" font-family="var(--font-mono)">${fmtTick(val)}</text>
    `;
  }

  const zeroY = yOf(0);
  const zeroLine = (minY < 0 && maxY > 0)
    ? `<line x1="${pad.left}" y1="${zeroY}" x2="${W - pad.right}" y2="${zeroY}" stroke="var(--text-secondary)" stroke-width="1.2" />`
    : "";

  const xLabels = [1, 6, 12, 18, 24, 30, 36].map(m => {
    const x = xOf(m);
    return `<text x="${x}" y="${H - 10}" text-anchor="middle" fill="var(--text-secondary)" font-size="11" font-family="var(--font-mono)">M${m}</text>`;
  }).join("");

  container.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="36-month Monte Carlo fan chart">
      ${gridLines}
      ${zeroLine}
      <polygon points="${buildPolygon(p90, p10)}" fill="var(--brand-primary)" fill-opacity="0.15" />
      <polygon points="${buildPolygon(p75, p25)}" fill="var(--brand-primary)" fill-opacity="0.30" />
      <path d="${buildLine(p10)}" fill="none" stroke="var(--warning)" stroke-width="1.3" stroke-dasharray="4,3" />
      <path d="${buildLine(p90)}" fill="none" stroke="var(--positive)" stroke-width="1.3" stroke-dasharray="4,3" />
      <path d="${buildLine(p50)}" fill="none" stroke="var(--brand-primary)" stroke-width="2.6" />
      ${xLabels}
    </svg>
  `;
}

function renderDistributionChart(sc) {
  const container = document.getElementById("distribution-chart-container");
  const key = state.activeDistributionKey;
  const hist = sc.distributions[key];
  const isNpv = key === "npv_k_usd_histogram";
  const mult = isNpv ? state.scaleMultiplier : 1.0;

  const mids = hist.bin_midpoints.map(v => v * mult);
  const densities = hist.pct_of_trials;
  const maxD = Math.max(...densities, 1);

  const W = 680, H = 280;
  const pad = { top: 24, right: 24, bottom: 36, left: 52 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;

  const nBins = mids.length;
  const barSlot = plotW / nBins;
  const barW = Math.max(2, barSlot - 3);

  let barsSvg = "";
  for (let i = 0; i < nBins; i++) {
    const bh = (densities[i] / maxD) * plotH;
    const x = pad.left + i * barSlot + 1.5;
    const y = pad.top + plotH - bh;
    const color = mids[i] < 0 ? "var(--negative)" : "var(--brand-primary)";
    barsSvg += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${bh.toFixed(1)}" fill="${color}" fill-opacity="0.78" rx="2" />`;
  }

  const metricObj = isNpv ? sc.kpis.npv_usd : sc.kpis.roi_pct;
  const scaleFactor = isNpv ? (state.scaleMultiplier / 1000.0) : 1.0;
  const minEdge = hist.bin_edges[0] * mult;
  const maxEdge = hist.bin_edges[hist.bin_edges.length - 1] * mult;
  const xForVal = (v) => pad.left + Math.min(1, Math.max(0, (v - minEdge) / (maxEdge - minEdge))) * plotW;

  const markerLine = (val, label, color) => {
    const x = xForVal(val);
    return `
      <line x1="${x.toFixed(1)}" y1="${pad.top}" x2="${x.toFixed(1)}" y2="${pad.top + plotH}" stroke="${color}" stroke-width="2" stroke-dasharray="4,2" />
      <text x="${x.toFixed(1)}" y="${pad.top - 6}" text-anchor="middle" fill="${color}" font-size="11" font-weight="700" font-family="var(--font-mono)">${label}</text>
    `;
  };

  let xAxisSvg = "";
  for (let i = 0; i <= 5; i++) {
    const v = minEdge + (i / 5) * (maxEdge - minEdge);
    const x = pad.left + (i / 5) * plotW;
    const lbl = isNpv ? `$${Math.round(v)}k` : `${Math.round(v)}%`;
    xAxisSvg += `<text x="${x.toFixed(1)}" y="${H - 10}" text-anchor="middle" fill="var(--text-secondary)" font-size="11" font-family="var(--font-mono)">${lbl}</text>`;
  }

  container.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Monte Carlo histogram distribution">
      <line x1="${pad.left}" y1="${pad.top + plotH}" x2="${W - pad.right}" y2="${pad.top + plotH}" stroke="var(--border-strong)" />
      ${barsSvg}
      ${markerLine(metricObj.p10 * scaleFactor, "P10", "var(--warning)")}
      ${markerLine(metricObj.p50 * scaleFactor, "P50", "var(--text-primary)")}
      ${markerLine(metricObj.p90 * scaleFactor, "P90", "var(--positive)")}
      ${xAxisSvg}
    </svg>
  `;
}

function renderTornadoChart(sc) {
  const container = document.getElementById("tornado-chart-container");
  const items = sc.sensitivity;
  const baseNpv = sc.kpis.npv_usd.p50 * state.scaleMultiplier;

  const W = 680, H = 265;
  const pad = { top: 24, right: 85, bottom: 22, left: 235 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;

  const values = items.flatMap(d => [d.npv_low_driver_usd * state.scaleMultiplier, d.npv_high_driver_usd * state.scaleMultiplier, baseNpv]);
  const minV = Math.min(...values);
  const maxV = Math.max(...values);
  const span = Math.max(1, maxV - minV);
  const lo = minV - span * 0.08;
  const hi = maxV + span * 0.08;

  const xOf = (v) => pad.left + ((v - lo) / (hi - lo)) * plotW;
  const baseX = xOf(baseNpv);
  const rowH = plotH / items.length;

  const rowsSvg = items.map((d, idx) => {
    const yCenter = pad.top + idx * rowH + rowH * 0.5;
    const barH = Math.min(20, rowH * 0.62);
    const vLow = d.npv_low_driver_usd * state.scaleMultiplier;
    const vHigh = d.npv_high_driver_usd * state.scaleMultiplier;
    const x1 = xOf(Math.min(vLow, vHigh));
    const x2 = xOf(Math.max(vLow, vHigh));
    const w = Math.max(3, x2 - x1);
    const swing = Math.abs(d.npv_swing_usd * state.scaleMultiplier);

    return `
      <text x="${pad.left - 10}" y="${yCenter + 4}" text-anchor="end" fill="var(--text-primary)" font-size="11.5" font-weight="600">${d.driver}</text>
      <rect x="${x1.toFixed(1)}" y="${(yCenter - barH / 2).toFixed(1)}" width="${w.toFixed(1)}" height="${barH.toFixed(1)}" fill="var(--brand-primary)" fill-opacity="0.78" rx="3" />
      <text x="${(x2 + 6).toFixed(1)}" y="${yCenter + 4}" fill="var(--text-secondary)" font-size="11" font-family="var(--font-mono)">Δ $${Math.round(swing / 1000).toLocaleString()}k</text>
    `;
  }).join("");

  container.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Tornado chart ranking key drivers of NPV variance">
      <line x1="${baseX.toFixed(1)}" y1="${pad.top - 6}" x2="${baseX.toFixed(1)}" y2="${pad.top + plotH}" stroke="var(--text-primary)" stroke-width="1.5" stroke-dasharray="3,3" />
      <text x="${baseX.toFixed(1)}" y="${pad.top - 10}" text-anchor="middle" fill="var(--text-secondary)" font-size="10.5" font-family="var(--font-mono)">Typical (${fmtCurrencyCompact(sc.kpis.npv_usd.p50)})</text>
      ${rowsSvg}
    </svg>
  `;
}

function renderWaterfallChart(sc) {
  const container = document.getElementById("waterfall-chart-container");
  const k = sc.kpis;
  const mult = state.scaleMultiplier;

  const gross = k.total_gross_benefit_36m_usd.p50 * mult;
  const rework = -k.total_rework_drag_36m_usd.p50 * mult;
  const tco = -k.total_cost_36m_usd.p50 * mult;
  const netProfit = gross + rework + tco;

  const steps = [
    { label: "Raw Time Saved", start: 0, end: gross, val: gross, color: "var(--brand-primary)" },
    { label: "Cleanup Time", start: gross, end: gross + rework, val: rework, color: "var(--warning)" },
    { label: "Total 3-Yr Cost", start: gross + rework, end: netProfit, val: tco, color: "var(--negative)" },
    { label: "3-Yr Net Gain", start: 0, end: netProfit, val: netProfit, color: netProfit >= 0 ? "var(--positive)" : "var(--negative)" }
  ];

  const W = 680, H = 265;
  const pad = { top: 28, right: 28, bottom: 34, left: 68 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;

  const minV = Math.min(0, netProfit) * 1.15;
  const maxV = Math.max(gross, netProfit) * 1.12;
  const yOf = (v) => pad.top + plotH - ((v - minV) / (maxV - minV)) * plotH;
  const zeroY = yOf(0);

  const slotW = plotW / steps.length;
  const barW = Math.min(82, slotW * 0.56);

  const barsSvg = steps.map((s, i) => {
    const x = pad.left + i * slotW + (slotW - barW) / 2;
    const yTop = yOf(Math.max(s.start, s.end));
    const yBot = yOf(Math.min(s.start, s.end));
    const bh = Math.max(3, yBot - yTop);
    const valStr = `${s.val < 0 ? '-' : '+'}$${Math.round(Math.abs(s.val) / 1000).toLocaleString()}k`;

    return `
      <rect x="${x.toFixed(1)}" y="${yTop.toFixed(1)}" width="${barW.toFixed(1)}" height="${bh.toFixed(1)}" fill="${s.color}" fill-opacity="0.85" rx="4" />
      <text x="${(x + barW / 2).toFixed(1)}" y="${(yTop - 7).toFixed(1)}" text-anchor="middle" fill="var(--text-primary)" font-size="11.5" font-weight="700" font-family="var(--font-mono)">${valStr}</text>
      <text x="${(x + barW / 2).toFixed(1)}" y="${H - 10}" text-anchor="middle" fill="var(--text-secondary)" font-size="11.5" font-weight="600">${s.label}</text>
    `;
  }).join("");

  container.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Gross-to-net value bridge chart">
      <line x1="${pad.left}" y1="${zeroY.toFixed(1)}" x2="${W - pad.right}" y2="${zeroY.toFixed(1)}" stroke="var(--border-strong)" stroke-width="1.2" />
      ${barsSvg}
    </svg>
  `;
}

function renderTeamTable(sc) {
  document.getElementById("team-table-body").innerHTML = sc.teams.map(tm => {
    const hc = Math.round(tm.headcount * state.scaleMultiplier);
    const roi = tm.roi_pct;
    const up = tm.month36_net_productivity_uplift_pct;
    const costMo = tm.cost_per_seat_monthly_usd;
    const hrs = tm.avg_monthly_hours_saved_per_fte;
    const netSeat = tm.net_benefit_per_seat_36m_usd.p50;

    return `
      <tr>
        <th scope="row">${tm.name}</th>
        <td>${hc} Staff <span class="val-muted">(${tm.ai_addressable_task_share_pct}% AI-ready work)</span></td>
        <td>$${costMo.p50}/mo <span class="val-muted">($${costMo.p10}–$${costMo.p90})</span></td>
        <td>
          <span class="val-warn">${fmtPct(up.p10, 1)}</span> /
          <strong>${fmtPct(up.p50, 1)}</strong> /
          <span class="val-pos">${fmtPct(up.p90, 1)}</span>
        </td>
        <td>${hrs.p50} hrs <span class="val-muted">(${hrs.p10}–${hrs.p90}h)</span></td>
        <td class="${netSeat >= 0 ? 'val-pos' : 'val-neg'}">${netSeat >= 0 ? '+' : '-'}$${Math.abs(Math.round(netSeat)).toLocaleString()}</td>
        <td>
          <span class="${roi.p10 < 0 ? 'val-neg' : 'val-warn'}">${fmtPct(roi.p10, 0)}</span> /
          <strong>${fmtPct(roi.p50, 0)}</strong> /
          <span class="val-pos">${fmtPct(roi.p90, 0)}</span>
        </td>
        <td><strong>${tm.prob_positive_roi_pct}%</strong></td>
      </tr>
    `;
  }).join("");
}

// ============================================================================
// TAB 2 RENDERERS: TEAM BEHAVIOR (AGENT-BASED MODELING)
// ============================================================================

function tipAttrs(termKey, title, tip) {
  if (window.svgTipAttrs) return window.svgTipAttrs(termKey, title, tip);
  return `data-tip-title="${escAttr(title)}" data-tooltip="${escAttr(tip)}"`;
}

function svgCurve(d, stroke, width, dash, title, tip, termKey = "") {
  const dashAttr = dash ? `stroke-dasharray="${dash}"` : "";
  return `
    <g class="svg-tooltip-target" tabindex="0" ${tipAttrs(termKey, title, tip)}>
      <path d="${d}" fill="none" stroke="${stroke}" stroke-width="${width}" ${dashAttr} />
      <path d="${d}" fill="none" stroke="transparent" stroke-width="14" />
    </g>
  `;
}

function renderAbmTab(abm) {
  const k = abm.kpis;
  const p = abm.parameters;

  const cards = [
    {
      title: `Team-Driven 3-Year ${t("roi", "Return (ROI)")}`,
      p50: fmtPct(k.emergent_roi_pct.p50),
      p10: fmtPct(k.emergent_roi_pct.p10),
      p90: fmtPct(k.emergent_roi_pct.p90),
      note: `Tested across ${p.n_replications} ${t("n_replications", "team simulations")}`
    },
    {
      title: `Team-Driven 3-Year ${t("npv", "Net Profit")}`,
      p50: fmtCurrencyCompact(k.emergent_npv_usd.p50),
      p10: fmtCurrencyCompact(k.emergent_npv_usd.p10),
      p90: fmtCurrencyCompact(k.emergent_npv_usd.p90),
      note: `Starting ${t("champions", "AI Champions")}: ${p.champion_seed_fraction_pct}% of staff`
    },
    {
      title: `Month-36 ${t("active_adopters", "Active Daily Users")}`,
      p50: `${k.m36_active_adopters_pct.p50}%`,
      p10: `${k.m36_active_adopters_pct.p10}%`,
      p90: `${k.m36_active_adopters_pct.p90}%`,
      note: `${t("contagion", "Word-of-Mouth")} Influence: ${p.peer_contagion_strength}`
    },
    {
      title: `Month-36 ${t("shelfware", "Unused Shelfware Seats")}`,
      p50: `${k.m36_disillusioned_churn_pct.p50}%`,
      p10: `${k.m36_disillusioned_churn_pct.p10}%`,
      p90: `${k.m36_disillusioned_churn_pct.p90}%`,
      note: `${t("frustration_sensitivity", "Frustration Quit Rate")}: ${p.frustration_sensitivity}`
    }
  ];

  document.getElementById("abm-kpi-grid").innerHTML = cards.map(c => `
    <div class="kpi-card">
      <div class="kpi-title">${c.title}</div>
      <div class="kpi-median">${c.p50} <span class="p50-tag">${t("p50", "Typical")}</span></div>
      <div class="kpi-range-box">
        <div class="range-endpoints">
          <span>${t("p10", "P10")}: <strong class="p10-val">${c.p10}</strong></span>
          <span>${t("p90", "P90")}: <strong class="p90-val">${c.p90}</strong></span>
        </div>
        <div class="range-bar-track"><div class="range-bar-fill"></div></div>
        <div class="val-muted">${c.note}</div>
      </div>
    </div>
  `).join("");

  renderAbmTrajectoryChart(abm);
  renderAbmNetworkChart(abm);

  document.getElementById("abm-team-tbody").innerHTML = abm.teams.map(tm => `
    <tr>
      <th scope="row">${tm.name}</th>
      <td>${Math.round(tm.headcount * state.scaleMultiplier)} Staff</td>
      <td>
        <span class="val-warn" data-term-key="p10" data-tip-title="Cautious Active Users (P10)" data-tooltip="Cautious Month-36 share of ${escAttr(tm.name)} using AI daily: ${tm.active_adopters_m36_pct.p10}%.">${tm.active_adopters_m36_pct.p10}%</span> /
        <strong data-term-key="active_adopters" data-tip-title="Typical Active Users (P50)" data-tooltip="Typical Month-36 share of ${escAttr(tm.name)} using AI daily: ${tm.active_adopters_m36_pct.p50}%.">${tm.active_adopters_m36_pct.p50}%</strong> /
        <span class="val-pos" data-term-key="p90" data-tip-title="Best-Case Active Users (P90)" data-tooltip="Best-case Month-36 share of ${escAttr(tm.name)} using AI daily: ${tm.active_adopters_m36_pct.p90}%.">${tm.active_adopters_m36_pct.p90}%</span>
      </td>
      <td class="val-pos"><span data-term-key="champions" data-tip-title="AI Champion Coaches" data-tooltip="Month-36 share of ${escAttr(tm.name)} acting as AI Champion coaches: ${tm.champions_m36_pct.p50}%.">${tm.champions_m36_pct.p50}%</span></td>
      <td class="${tm.disillusioned_churn_m36_pct.p50 > 12 ? 'val-neg' : 'val-warn'}"><span data-term-key="shelfware" data-tip-title="Unused Shelfware Seats" data-tooltip="Month-36 share of ${escAttr(tm.name)} who quit after frustration (paid but unused seats): ${tm.disillusioned_churn_m36_pct.p50}%.">${tm.disillusioned_churn_m36_pct.p50}%</span></td>
      <td>
        <span class="${tm.emergent_roi_pct.p10 < 0 ? 'val-neg' : 'val-warn'}" data-term-key="p10" data-tip-title="Cautious Team ROI (P10)" data-tooltip="Cautious 3-year ROI for ${escAttr(tm.name)}: ${fmtPct(tm.emergent_roi_pct.p10, 0)}.">${fmtPct(tm.emergent_roi_pct.p10, 0)}</span> /
        <strong data-term-key="roi" data-tip-title="Typical Team ROI (P50)" data-tooltip="Typical 3-year ROI for ${escAttr(tm.name)}: ${fmtPct(tm.emergent_roi_pct.p50, 0)}.">${fmtPct(tm.emergent_roi_pct.p50, 0)}</strong> /
        <span class="val-pos" data-term-key="p90" data-tip-title="Best-Case Team ROI (P90)" data-tooltip="Best-case 3-year ROI for ${escAttr(tm.name)}: ${fmtPct(tm.emergent_roi_pct.p90, 0)}.">${fmtPct(tm.emergent_roi_pct.p90, 0)}</span>
      </td>
    </tr>
  `).join("");
}

function renderAbmTrajectoryChart(abm) {
  const st = abm.state_trajectories;
  const months = st.months;
  const W = 680, H = 280;
  const pad = { top: 20, right: 24, bottom: 36, left: 62 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;

  const xOf = (m) => pad.left + ((m - 1) / (months.length - 1)) * plotW;

  if (state.activeAbmView === "cashflow") {
    const cf = st.cumulative_cashflow_usd.p50.map(v => v * state.scaleMultiplier);
    const minY = Math.min(0, ...cf) * 1.1;
    const maxY = Math.max(1000, ...cf) * 1.1;
    const yOf = (v) => pad.top + plotH - ((v - minY) / (maxY - minY)) * plotH;
    const line = (arr) => arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${xOf(months[i]).toFixed(1)},${yOf(v).toFixed(1)}`).join(" ");
    const zeroY = yOf(0);
    const endCf = fmtCurrencyCompact(st.cumulative_cashflow_usd.p50[st.cumulative_cashflow_usd.p50.length - 1]);

    document.getElementById("abm-trajectory-chart").innerHTML = `
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Team-driven cumulative cashflow">
        <line x1="${pad.left}" y1="${zeroY.toFixed(1)}" x2="${W - pad.right}" y2="${zeroY.toFixed(1)}" stroke="var(--border-strong)" stroke-dasharray="3,3" />
        ${svgCurve(line(cf), "var(--positive)", 2.8, "", "Team-Driven Cumulative Cashflow", `Net cumulative cash shaped by coworker adoption and frustration churn (Month 36: ${endCf}).`, "breakeven")}
      </svg>
    `;
    return;
  }

  const yOf = (v) => pad.top + plotH - (v / 100.0) * plotH;
  const line = (arr) => arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${xOf(months[i]).toFixed(1)},${yOf(v).toFixed(1)}`).join(" ");

  let grid = "";
  for (let pct of [0, 25, 50, 75, 100]) {
    const y = yOf(pct);
    grid += `
      <line x1="${pad.left}" y1="${y}" x2="${W - pad.right}" y2="${y}" stroke="var(--border-color)" stroke-dasharray="3,3" />
      <text x="${pad.left - 8}" y="${y + 4}" text-anchor="end" fill="var(--text-secondary)" font-size="11" font-family="var(--font-mono)">${pct}%</text>
    `;
  }

  const last = months.length - 1;
  if (state.activeAbmView === "active_vs_churn") {
    document.getElementById("abm-trajectory-chart").innerHTML = `
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Active daily users vs frustrated quitters">
        ${grid}
        ${svgCurve(line(st.active_adoption_pct.p50), "var(--positive)", 3.0, "", "Active Daily Users (%)", `Proficient + AI Champion employees actively using AI daily (Month 36: ${st.active_adoption_pct.p50[last]}%).`, "active_adopters")}
        ${svgCurve(line(st.disillusioned_pct.p50), "var(--negative)", 2.8, "5,3", "Frustrated Quitters (Shelfware)", `Employees who quit after bad drafts—creating paid unused seats (Month 36: ${st.disillusioned_pct.p50[last]}%).`, "shelfware")}
      </svg>
    `;
  } else {
    document.getElementById("abm-trajectory-chart").innerHTML = `
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Agent-Based 5-state trajectory chart">
        ${grid}
        ${svgCurve(line(st.skeptical_pct.p50), "#64748b", 2.2, "", "Waiting & Watching", `Staff not yet trying AI until coworkers share wins (Month 36: ${st.skeptical_pct.p50[last]}%).`, "skeptical_stage")}
        ${svgCurve(line(st.exploring_pct.p50), "var(--warning)", 2.2, "", "Learning (Early Dip)", `Employees experimenting while enduring the early learning dip (Month 36: ${st.exploring_pct.p50[last]}%).`, "exploring_stage")}
        ${svgCurve(line(st.proficient_pct.p50), "var(--brand-primary)", 2.6, "", "Confident Daily Users", `Employees reliably saving time with AI every day (Month 36: ${st.proficient_pct.p50[last]}%).`, "proficient_stage")}
        ${svgCurve(line(st.champion_pct.p50), "var(--positive)", 2.4, "", "AI Champions", `Power users coaching nearby coworkers twice as fast (Month 36: ${st.champion_pct.p50[last]}%).`, "champions")}
        ${svgCurve(line(st.disillusioned_pct.p50), "var(--negative)", 2.2, "5,3", "Frustrated Quitters (Shelfware)", `Employees who stopped using paid seats after frustration (Month 36: ${st.disillusioned_pct.p50[last]}%).`, "shelfware")}
      </svg>
    `;
  }
}

function renderAbmNetworkChart(abm) {
  const W = 680, H = 280;
  const net = abm.network_snapshot;
  const nodes = net.nodes;
  const edges = net.edges;
  const cx = W / 2, cy = H / 2;
  const radius = Math.min(W, H) * 0.39;

  const stateColors = {
    1: "#64748b",
    2: "var(--warning)",
    3: "var(--brand-primary)",
    4: "var(--positive)",
    5: "var(--negative)"
  };
  const stateLabels = {
    1: "Waiting & Watching",
    2: "Learning (Early Dip)",
    3: "Confident Daily User",
    4: "AI Champion Coach",
    5: "Frustrated Quitter (Shelfware)"
  };
  const stateKeys = {
    1: "skeptical_stage",
    2: "exploring_stage",
    3: "proficient_stage",
    4: "champions",
    5: "shelfware"
  };

  const degreeMap = new Map();
  edges.forEach(e => {
    degreeMap.set(e.source, (degreeMap.get(e.source) || 0) + 1);
    degreeMap.set(e.target, (degreeMap.get(e.target) || 0) + 1);
  });

  const coords = nodes.map((n, idx) => {
    const angle = (2 * Math.PI * idx) / nodes.length - Math.PI / 2;
    const rJitter = radius * (idx % 2 === 0 ? 1.0 : 0.78);
    return {
      x: cx + rJitter * Math.cos(angle),
      y: cy + rJitter * Math.sin(angle),
      node: n
    };
  });

  const deptFilter = state.activeAbmDept;

  const edgesSvg = edges.map(e => {
    const u = coords[e.source - 1];
    const v = coords[e.target - 1];
    if (!u || !v) return "";
    const match = deptFilter === "all" || u.node.team_id === deptFilter || v.node.team_id === deptFilter;
    const op = match ? "0.65" : "0.12";
    return `<line x1="${u.x.toFixed(1)}" y1="${u.y.toFixed(1)}" x2="${v.x.toFixed(1)}" y2="${v.y.toFixed(1)}" stroke="var(--border-strong)" stroke-width="1" stroke-opacity="${op}" />`;
  }).join("");

  const nodesSvg = coords.map(c => {
    const n = c.node;
    const col = stateColors[n.final_state] || "#64748b";
    const match = deptFilter === "all" || n.team_id === deptFilter;
    const r = (n.final_state === 4 ? 7.5 : 5.5) * (match ? 1.15 : 0.75);
    const op = match ? "1.0" : "0.22";
    const sLabel = stateLabels[n.final_state] || "Active";
    const sKey = stateKeys[n.final_state] || "abm";
    const deg = degreeMap.get(n.id) || 0;
    const tipTitle = `Employee #${n.agent_id} • ${n.team_name}`;
    const tipText = `Habit Stage: ${sLabel} • Skill Index: ${Number(n.skill || 0).toFixed(2)} • Peer Connections: ${deg}.`;
    return `<circle class="svg-tooltip-target" tabindex="0" ${tipAttrs(sKey, tipTitle, tipText)} cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="${r.toFixed(1)}" fill="${col}" fill-opacity="${op}" stroke="var(--bg-surface)" stroke-width="1.5" />`;
  }).join("");

  document.getElementById("abm-network-chart").innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Agent-Based peer network graph">
      ${edgesSvg}
      ${nodesSvg}
    </svg>
  `;
}

// ============================================================================
// TAB 3 RENDERERS: FLYWHEELS & BRAKES (SYSTEM DYNAMICS)
// ============================================================================

function renderSdTab(sd) {
  const k = sd.kpis;
  const p = sd.parameters;

  const cards = [
    {
      title: `3-Year ${t("flywheel", "Flywheel")} ${t("roi", "Return (ROI)")}`,
      p50: fmtPct(k.equilibrium_roi_pct),
      note: `3-Year ${t("npv", "Net Profit")}: ${fmtCurrencyCompact(k.equilibrium_npv_usd)}`
    },
    {
      title: `Month-36 ${t("data_moat", "Company Know-How Score")}`,
      p50: `${k.m36_workflow_mastery_index} pts`,
      note: `${t("reinvestment_rate", "Share Reinvested in Training")}: ${Math.round(p.reinvestment_rate * 100)}%`
    },
    {
      title: `Month-36 ${t("tech_debt", "Cleanup Backlog")}`,
      p50: `${k.m36_tech_debt_index}%`,
      note: `${t("cleanup_cost", "3-Year Cleanup Cost")}: ${fmtCurrencyAbs(k.total_tech_debt_drag_36m_usd)}`
    },
    {
      title: `Month-36 ${t("token_sprawl", "Usage Bill Growth")}`,
      p50: `${k.m36_token_sprawl_multiplier}x`,
      note: `${t("guardrail_strength", "Budget Guardrail Strength")}: ${Math.round(p.governance_damping * 100)}%`
    }
  ];

  document.getElementById("sd-kpi-grid").innerHTML = cards.map(c => `
    <div class="kpi-card">
      <div class="kpi-title">${c.title}</div>
      <div class="kpi-median">${c.p50}</div>
      <div class="kpi-range-box">
        <div class="val-muted">${c.note}</div>
      </div>
    </div>
  `).join("");

  renderSdStocksChart(sd);
  renderSdFlowsChart(sd);
  renderSdLoopsGrid(sd);
}

function renderSdStocksChart(sd) {
  const sf = sd.stocks_and_flows;
  const months = sf.months;
  const W = 680, H = 280;
  const pad = { top: 20, right: 24, bottom: 36, left: 62 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;

  const xOf = (m) => pad.left + ((m - 1) / (months.length - 1)) * plotW;
  const yOfPct = (v) => pad.top + plotH - (Math.min(130, Math.max(0, v)) / 130.0) * plotH;
  const linePct = (arr) => arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${xOf(months[i]).toFixed(1)},${yOfPct(v).toFixed(1)}`).join(" ");

  const sprawlScaled = sf.stock_token_sprawl_multiplier.map(s => (s - 1.0) * 50.0);
  const viewMode = state.activeSdStockView;
  const loopId = state.activeSdLoopId;

  const showA = (viewMode === "all" || viewMode === "flywheels") && (!loopId || loopId.includes("1"));
  const showM = (viewMode === "all" || viewMode === "flywheels") && (!loopId || loopId.includes("2") || loopId.includes("Flywheel"));
  const showD = (viewMode === "all" || viewMode === "brakes") && (!loopId || loopId.includes("Brake 1") || loopId === "B1");
  const showS = (viewMode === "all" || viewMode === "brakes") && (!loopId || loopId.includes("Brake 2") || loopId === "B2");

  const last = months.length - 1;
  const endA = sf.stock_adopted_workforce_pct[last];
  const endM = sf.stock_workflow_mastery_index[last];
  const endD = sf.stock_tech_debt_index[last];
  const endS = sf.stock_token_sprawl_multiplier[last];

  document.getElementById("sd-stocks-chart").innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="System Dynamics 4-stock trajectory">
      <line x1="${pad.left}" y1="${pad.top + plotH}" x2="${W - pad.right}" y2="${pad.top + plotH}" stroke="var(--border-strong)" />
      <g opacity="${showA ? 1.0 : 0.2}">${svgCurve(linePct(sf.stock_adopted_workforce_pct), "var(--brand-primary)", showA ? 3.0 : 1.0, "", "Staff Using AI (%)", `Growth Flywheel 1: Share of staff actively using AI (Month 36: ${endA}%).`, "s_curve")}</g>
      <g opacity="${showM ? 1.0 : 0.2}">${svgCurve(linePct(sf.stock_workflow_mastery_index), "var(--positive)", showM ? 3.0 : 1.0, "", "Company Know-How Score", `Growth Flywheel 2: Shared playbooks and role skill score (Month 36: ${endM} pts).`, "data_moat")}</g>
      <g opacity="${showD ? 1.0 : 0.2}">${svgCurve(linePct(sf.stock_tech_debt_index), "var(--negative)", showD ? 2.8 : 1.0, "5,3", "Cleanup Backlog (%)", `Hidden Brake 1: Unchecked AI mistakes slowing teams down (Month 36: ${endD}%).`, "tech_debt")}</g>
      <g opacity="${showS ? 1.0 : 0.2}">${svgCurve(linePct(sprawlScaled), "var(--warning)", showS ? 2.6 : 1.0, "", "Usage Bill Growth", `Hidden Brake 2: Cloud AI usage multiplier per active user (Month 36: ${endS}x).`, "token_sprawl")}</g>
    </svg>
  `;
}

function renderSdFlowsChart(sd) {
  const sf = sd.stocks_and_flows;
  const months = sf.months;
  const W = 680, H = 280;
  const pad = { top: 20, right: 24, bottom: 36, left: 62 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;
  const xOf = (m) => pad.left + ((m - 1) / (months.length - 1)) * plotW;
  const last = months.length - 1;

  if (state.activeSdFlowView === "cumulative_cf") {
    const cf = sf.flow_cumulative_cashflow_usd.map(v => v * state.scaleMultiplier);
    const minY = Math.min(0, ...cf) * 1.1;
    const maxY = Math.max(1000, ...cf) * 1.1;
    const yOf = (v) => pad.top + plotH - ((v - minY) / (maxY - minY)) * plotH;
    const line = (arr) => arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${xOf(months[i]).toFixed(1)},${yOf(v).toFixed(1)}`).join(" ");
    const zeroY = yOf(0);
    const endCf = fmtCurrencyCompact(sf.flow_cumulative_cashflow_usd[last]);

    document.getElementById("sd-flows-chart").innerHTML = `
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="System Dynamics cumulative cashflow">
        <line x1="${pad.left}" y1="${zeroY.toFixed(1)}" x2="${W - pad.right}" y2="${zeroY.toFixed(1)}" stroke="var(--border-strong)" stroke-dasharray="3,3" />
        ${svgCurve(line(cf), "var(--brand-primary)", 2.8, "", "Cumulative Cash ($)", `3-year cumulative net cash under flywheel and brake dynamics (Month 36: ${endCf}).`, "breakeven")}
      </svg>
    `;
    return;
  }

  if (state.activeSdFlowView === "dominance") {
    const dom = sf.loop_dominance_score;
    const minY = Math.min(0, ...dom) * 1.15;
    const maxY = Math.max(10, ...dom) * 1.15;
    const yOf = (v) => pad.top + plotH - ((v - minY) / (maxY - minY)) * plotH;
    const line = (arr) => arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${xOf(months[i]).toFixed(1)},${yOf(v).toFixed(1)}`).join(" ");
    const zeroY = yOf(0);

    document.getElementById("sd-flows-chart").innerHTML = `
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Net momentum score">
        <line x1="${pad.left}" y1="${zeroY.toFixed(1)}" x2="${W - pad.right}" y2="${zeroY.toFixed(1)}" stroke="var(--border-strong)" stroke-dasharray="3,3" />
        ${svgCurve(line(dom), "var(--positive)", 2.8, "", "Net Momentum Score", `Positive values mean Growth Flywheels outweigh Hidden Brakes (Month 36: ${dom[last]}).`, "net_momentum")}
      </svg>
    `;
    return;
  }

  const gross = sf.flow_gross_benefit_usd.map(v => v * state.scaleMultiplier);
  const drag = sf.flow_debt_drag_usd.map(v => v * state.scaleMultiplier);
  const cost = sf.flow_total_cost_usd.map(v => v * state.scaleMultiplier);
  const maxFlow = Math.max(...gross, ...drag, ...cost, 1);
  const yOfFlow = (v) => pad.top + plotH - (v / (maxFlow * 1.08)) * plotH;
  const lineFlow = (arr) => arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${xOf(months[i]).toFixed(1)},${yOfFlow(v).toFixed(1)}`).join(" ");

  document.getElementById("sd-flows-chart").innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="System Dynamics monthly inflows and outflows">
      <line x1="${pad.left}" y1="${pad.top + plotH}" x2="${W - pad.right}" y2="${pad.top + plotH}" stroke="var(--border-strong)" />
      ${svgCurve(lineFlow(gross), "var(--positive)", 2.6, "", "Monthly Value Created ($/mo)", `Gross monthly payroll value saved by AI (Month 36: ${fmtCurrencyAbs(sf.flow_gross_benefit_usd[last])}/mo).`, "monthly_value_flow")}
      ${svgCurve(lineFlow(drag), "var(--warning)", 2.3, "4,3", "Monthly Cleanup Cost ($/mo)", `Monthly hours lost fixing sloppy AI outputs (Month 36: ${fmtCurrencyAbs(sf.flow_debt_drag_usd[last])}/mo).`, "cleanup_cost")}
      ${svgCurve(lineFlow(cost), "var(--negative)", 2.3, "", "Monthly Software & Usage Bill ($/mo)", `Monthly licenses, training, and cloud AI bills (Month 36: ${fmtCurrencyAbs(sf.flow_total_cost_usd[last])}/mo).`, "token_sprawl")}
    </svg>
  `;
}

function renderSdLoopsGrid(sd) {
  const container = document.getElementById("sd-loops-grid");
  container.innerHTML = "";
  sd.causal_loops.forEach(l => {
    const isPressed = state.activeSdLoopId === l.id;
    const isFlywheel = l.type.includes("Flywheel");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "loop-card loop-card-interactive";
    btn.setAttribute("aria-pressed", isPressed ? "true" : "false");
    btn.setAttribute("data-term-key", isFlywheel ? "flywheel" : "balancing_loop");
    btn.setAttribute("data-tip-title", `${l.id}: ${l.name}`);
    btn.setAttribute("data-tooltip", `${l.type} — ${l.pathway}. ${l.impact_summary} Click to spotlight this curve on the chart.`);
    btn.innerHTML = `
      <div class="loop-card-header">
        <strong>${l.id}: ${l.name}</strong>
        <span class="scenario-badge">${l.type}</span>
      </div>
      <div class="loop-pathway">${l.pathway}</div>
      <div class="card-desc">${l.impact_summary}</div>
    `;
    btn.addEventListener("click", () => {
      state.activeSdLoopId = state.activeSdLoopId === l.id ? null : l.id;
      renderSdLoopsGrid(sd);
      fadeSwap(document.getElementById("sd-stocks-chart"), () => {
        renderSdStocksChart(sd);
      });
    });
    container.appendChild(btn);
  });
}

// ============================================================================
// TAB 4 RENDERERS: WORKFLOW WAITING LINES (DISCRETE EVENT)
// ============================================================================

function renderDesTab(des) {
  const k = des.kpis;
  const cards = [
    {
      title: `Workflow-Adjusted 3-Yr ${t("roi", "Return")}`,
      p50: fmtPct(k.process_roi_pct),
      note: `Workflow ${t("npv", "Net Profit")}: ${fmtCurrencyCompact(k.process_npv_usd)}`
    },
    {
      title: `${t("cycle_time", "Turnaround Time")} Saved`,
      p50: `-${k.cycle_time_reduction_pct}%`,
      note: `${k.baseline_avg_cycle_time_hrs}h → ${k.m36_avg_cycle_time_hrs}h avg turnaround`
    },
    {
      title: `${t("stage3_qa", "Final Human Review Wait")}`,
      p50: `${k.m36_qa_queue_wait_hrs} hrs`,
      note: `${t("qa_reallocation", "Extra Staff Shifted to Review")}: +${des.parameters.qa_capacity_reallocation_pct}%`
    },
    {
      title: `${t("hours_saved", "Total Hours Saved")} (3 Years)`,
      p50: `${Math.round(k.total_hours_saved_36m * state.scaleMultiplier).toLocaleString()} hrs`,
      note: `Across Code, Support, Sales & Legal`
    }
  ];

  document.getElementById("des-kpi-grid").innerHTML = cards.map(c => `
    <div class="kpi-card">
      <div class="kpi-title">${c.title}</div>
      <div class="kpi-median">${c.p50}</div>
      <div class="kpi-range-box">
        <div class="val-muted">${c.note}</div>
      </div>
    </div>
  `).join("");

  renderDesCycleChart(des);
  renderDesUtilizationChart(des);

  document.getElementById("des-workflow-tbody").innerHTML = des.workflows.map(w => `
    <tr>
      <th scope="row">${w.team_name}<br><span class="val-muted">${w.work_unit_name}</span></th>
      <td><span data-term-key="cycle_time" data-tip-title="Turnaround Time (${escAttr(w.team_name)})" data-tooltip="End-to-end turnaround for ${escAttr(w.work_unit_name)} changed from ${w.baseline_cycle_time_hrs}h to ${w.m36_cycle_time_hrs}h (${w.cycle_time_reduction_pct >= 0 ? '-' : '+'}${Math.abs(w.cycle_time_reduction_pct)}%).">${w.baseline_cycle_time_hrs}h → <strong>${w.m36_cycle_time_hrs}h</strong> <span class="${w.cycle_time_reduction_pct >= 0 ? 'val-pos' : 'val-neg'}">(${w.cycle_time_reduction_pct >= 0 ? '-' : '+'}${Math.abs(w.cycle_time_reduction_pct)}%)</span></span></td>
      <td><span data-term-key="draft_busyness" data-tip-title="First-Draft Staff Busyness" data-tooltip="${escAttr(w.team_name)} drafting staff busyness shifted from ${w.baseline_draft_utilization_pct}% to ${w.m36_draft_utilization_pct}%.">${w.baseline_draft_utilization_pct}% → <strong>${w.m36_draft_utilization_pct}%</strong></span></td>
      <td><span data-term-key="qa_busyness" data-tip-title="Final-Review Staff Busyness" data-tooltip="${escAttr(w.team_name)} reviewer busyness moved from ${w.baseline_qa_utilization_pct}% to ${w.m36_qa_utilization_pct}% (danger line is 85%).">${w.baseline_qa_utilization_pct}% → <strong class="${w.m36_qa_utilization_pct >= 85 ? 'val-neg' : 'val-pos'}">${w.m36_qa_utilization_pct}%</strong></span></td>
      <td><span data-term-key="stage3_qa" data-tip-title="Review Wait Line" data-tooltip="Average time ${escAttr(w.work_unit_name)} sit waiting for human approval: ${w.m36_qa_wait_hrs} hours.">${w.m36_qa_wait_hrs} hrs</span></td>
      <td><strong data-term-key="hours_saved" data-tip-title="Monthly Hours Saved" data-tooltip="Net staff hours saved every month in ${escAttr(w.team_name)} after review wait lines: ${Math.round(w.m36_hours_saved_monthly * state.scaleMultiplier).toLocaleString()} hrs/mo.">${Math.round(w.m36_hours_saved_monthly * state.scaleMultiplier).toLocaleString()} hrs/mo</strong></td>
      <td><strong data-term-key="sla" data-tip-title="On-Time Delivery Rate (SLA)" data-tooltip="Percentage of ${escAttr(w.work_unit_name)} finished within promised SLA target: ${w.m36_sla_compliance_pct}%.">${w.m36_sla_compliance_pct}%</strong></td>
      <td><span class="${w.m36_qa_utilization_pct >= 85 ? 'val-neg' : 'val-pos'}" data-term-key="workflow_health" data-tip-title="Workflow Health Check" data-tooltip="${escAttr(w.team_name)}: ${escAttr(w.bottleneck_diagnosis)} (Reviewer busyness: ${w.m36_qa_utilization_pct}%).">${w.bottleneck_diagnosis}</span></td>
    </tr>
  `).join("");
}

function renderDesCycleChart(des) {
  const tr = des.trajectories;
  const months = tr.months;
  const W = 680, H = 280;
  const pad = { top: 20, right: 24, bottom: 36, left: 58 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;
  const xOf = (m) => pad.left + ((m - 1) / (months.length - 1)) * plotW;
  const last = months.length - 1;

  if (state.activeDesTrajView === "hours_saved") {
    const hrs = tr.monthly_hours_saved.map(v => v * state.scaleMultiplier);
    const maxH = Math.max(...hrs, 100) * 1.12;
    const yOf = (v) => pad.top + plotH - (v / maxH) * plotH;
    const line = (arr) => arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${xOf(months[i]).toFixed(1)},${yOf(v).toFixed(1)}`).join(" ");

    document.getElementById("des-cycle-chart").innerHTML = `
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Monthly hours saved trajectory">
        <line x1="${pad.left}" y1="${pad.top + plotH}" x2="${W - pad.right}" y2="${pad.top + plotH}" stroke="var(--border-strong)" />
        ${svgCurve(line(hrs), "var(--positive)", 2.8, "", "Monthly Hours Saved", `Net company hours freed up per month across all 4 workflows (Month 36: ${Math.round(hrs[last]).toLocaleString()} hrs/mo).`, "hours_saved")}
      </svg>
    `;
    return;
  }

  if (state.activeDesTrajView === "queue_wait") {
    const dWait = tr.draft_stage_wait_hrs;
    const qWait = tr.qa_review_stage_wait_hrs;
    const maxW = Math.max(...dWait, ...qWait, 1) * 1.15;
    const yOf = (v) => pad.top + plotH - (v / maxW) * plotH;
    const line = (arr) => arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${xOf(months[i]).toFixed(1)},${yOf(v).toFixed(1)}`).join(" ");

    document.getElementById("des-cycle-chart").innerHTML = `
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Draft vs QA waiting line hours">
        <line x1="${pad.left}" y1="${pad.top + plotH}" x2="${W - pad.right}" y2="${pad.top + plotH}" stroke="var(--border-strong)" />
        ${svgCurve(line(dWait), "var(--brand-primary)", 2.6, "", "First-Draft Waiting Line (hrs)", `Average queue delay before drafting starts (Month 36: ${dWait[last]} hrs).`, "draft_busyness")}
        ${svgCurve(line(qWait), "var(--negative)", 2.8, "", "Final Human Review Waiting Line (hrs)", `Average queue delay waiting for human sign-off (Month 36: ${qWait[last]} hrs).`, "stage3_qa")}
      </svg>
    `;
    return;
  }

  const maxH = Math.max(...tr.baseline_cycle_time_hrs, ...tr.ai_cycle_time_hrs, 1) * 1.12;
  const yOf = (v) => pad.top + plotH - (v / maxH) * plotH;
  const line = (arr) => arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${xOf(months[i]).toFixed(1)},${yOf(v).toFixed(1)}`).join(" ");

  document.getElementById("des-cycle-chart").innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Discrete Event cycle time and queue wait trajectory">
      <line x1="${pad.left}" y1="${pad.top + plotH}" x2="${W - pad.right}" y2="${pad.top + plotH}" stroke="var(--border-strong)" />
      ${svgCurve(line(tr.baseline_cycle_time_hrs), "#64748b", 2.0, "4,3", "Old Turnaround Time (hrs)", `Pre-AI baseline turnaround across departments (${tr.baseline_cycle_time_hrs[last]} hrs).`, "cycle_time")}
      ${svgCurve(line(tr.ai_cycle_time_hrs), "var(--brand-primary)", 2.6, "", "New Turnaround Time with AI (hrs)", `AI-assisted end-to-end turnaround including review wait (Month 36: ${tr.ai_cycle_time_hrs[last]} hrs).`, "cycle_time")}
      ${svgCurve(line(tr.qa_review_stage_wait_hrs), "var(--negative)", 2.4, "", "Human Review Waiting Line (hrs)", `Time spent waiting for senior human review (Month 36: ${tr.qa_review_stage_wait_hrs[last]} hrs).`, "stage3_qa")}
    </svg>
  `;
}

function renderDesUtilizationChart(des) {
  const W = 680, H = 280;
  const pad = { top: 20, right: 24, bottom: 36, left: 54 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;
  const wfs = des.workflows;
  const slotW = plotW / wfs.length;
  const yOfU = (u) => pad.top + plotH - (u / 100.0) * plotH;
  const threshY = yOfU(85.0);

  if (state.activeDesBarView === "sla") {
    const barsSvg = wfs.map((w, idx) => {
      const cx = pad.left + idx * slotW + slotW * 0.5;
      const bw = 44;
      const hSla = (w.m36_sla_compliance_pct / 100.0) * plotH;
      const tip = `${w.team_name} (${w.work_unit_name}): ${w.m36_sla_compliance_pct}% delivered on time vs. SLA target. Review wait: ${w.m36_qa_wait_hrs} hrs.`;
      return `
        <rect class="svg-tooltip-target" tabindex="0" data-term-key="sla" data-tip-title="${escAttr(w.team_name)} • On-Time SLA" data-tooltip="${escAttr(tip)}" x="${(cx - bw / 2).toFixed(1)}" y="${(pad.top + plotH - hSla).toFixed(1)}" width="${bw}" height="${hSla.toFixed(1)}" fill="var(--positive)" rx="4" />
        <text x="${cx.toFixed(1)}" y="${(pad.top + plotH - hSla - 6).toFixed(1)}" text-anchor="middle" fill="var(--text-primary)" font-size="11" font-family="var(--font-mono)">${w.m36_sla_compliance_pct}%</text>
        <text x="${cx.toFixed(1)}" y="${H - 10}" text-anchor="middle" fill="var(--text-secondary)" font-size="11" font-weight="600">${w.team_id.replace('_', ' ')}</text>
      `;
    }).join("");

    document.getElementById("des-utilization-chart").innerHTML = `
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Department on-time SLA delivery rate">
        <line x1="${pad.left}" y1="${pad.top + plotH}" x2="${W - pad.right}" y2="${pad.top + plotH}" stroke="var(--border-strong)" />
        ${barsSvg}
      </svg>
    `;
    return;
  }

  const isBeforeAfter = state.activeDesBarView === "before_after_qa";
  const barsSvg = wfs.map((w, idx) => {
    const cx = pad.left + idx * slotW + slotW * 0.5;
    const bw = 28;
    const valLeft = isBeforeAfter ? w.baseline_qa_utilization_pct : w.m36_draft_utilization_pct;
    const valRight = w.m36_qa_utilization_pct;
    const hLeft = (valLeft / 100.0) * plotH;
    const hRight = (valRight / 100.0) * plotH;
    const leftTitle = isBeforeAfter ? `${w.team_name} • Pre-AI Review Busyness` : `${w.team_name} • First-Draft Staff Busyness`;
    const leftTip = isBeforeAfter
      ? `Before AI, final reviewers in ${w.team_name} were busy ${valLeft}% of the workday.`
      : `With AI drafting help, ${w.team_name} drafting staff are busy ${valLeft}% of the workday (down from ${w.baseline_draft_utilization_pct}%).`;
    const rightTitle = `${w.team_name} • Final-Review Busyness`;
    const rightTip = `With AI, senior reviewers in ${w.team_name} are busy ${valRight}% of the workday (${valRight >= 85 ? 'OVER 85% danger line — queue jam!' : 'smoothly below 85% danger line'}).`;
    return `
      <rect class="svg-tooltip-target" tabindex="0" ${tipAttrs(isBeforeAfter ? 'qa_busyness' : 'draft_busyness', leftTitle, leftTip)} x="${(cx - bw - 3).toFixed(1)}" y="${(pad.top + plotH - hLeft).toFixed(1)}" width="${bw}" height="${hLeft.toFixed(1)}" fill="${isBeforeAfter ? '#64748b' : 'var(--brand-primary)'}" rx="3" />
      <rect class="svg-tooltip-target" tabindex="0" data-term-key="qa_busyness" data-tip-title="${escAttr(rightTitle)}" data-tooltip="${escAttr(rightTip)}" x="${(cx + 3).toFixed(1)}" y="${(pad.top + plotH - hRight).toFixed(1)}" width="${bw}" height="${hRight.toFixed(1)}" fill="${valRight >= 85 ? 'var(--negative)' : 'var(--warning)'}" rx="3" />
      <text x="${cx.toFixed(1)}" y="${H - 10}" text-anchor="middle" fill="var(--text-secondary)" font-size="11" font-weight="600">${w.team_id.replace('_', ' ')}</text>
    `;
  }).join("");

  document.getElementById("des-utilization-chart").innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Staff busyness comparison chart">
      <g class="svg-tooltip-target" tabindex="0" data-term-key="danger_line_85" data-tip-title="85% Traffic-Jam Danger Line" data-tooltip="Once human reviewers exceed 85% busyness, waiting lines and turnaround delays grow dramatically.">
        <line x1="${pad.left}" y1="${threshY.toFixed(1)}" x2="${W - pad.right}" y2="${threshY.toFixed(1)}" stroke="var(--negative)" stroke-width="1.5" stroke-dasharray="4,3" />
        <line x1="${pad.left}" y1="${threshY.toFixed(1)}" x2="${W - pad.right}" y2="${threshY.toFixed(1)}" stroke="transparent" stroke-width="12" />
        <text x="${W - pad.right - 6}" y="${(threshY - 6).toFixed(1)}" text-anchor="end" fill="var(--negative)" font-size="10.5" font-family="var(--font-mono)">85% Traffic-Jam Danger Line</text>
      </g>
      <line x1="${pad.left}" y1="${pad.top + plotH}" x2="${W - pad.right}" y2="${pad.top + plotH}" stroke="var(--border-strong)" />
      ${barsSvg}
    </svg>
  `;
}

// ============================================================================
// TAB 5 RENDERERS: PILOT SCORECARD (BAYESIAN NETWORK)
// ============================================================================

function renderBnTab(bn) {
  const presets = bn.evidence_presets;
  const activePreset = presets.find(p => p.id === state.activeBnPresetId) || presets[0];

  const btnContainer = document.getElementById("bn-preset-buttons");
  btnContainer.innerHTML = "";
  presets.forEach(pr => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "preset-btn";
    b.setAttribute("role", "radio");
    b.setAttribute("aria-checked", pr.id === activePreset.id ? "true" : "false");
    b.setAttribute("data-term-key", "pilot_signals");
    b.setAttribute("data-tip-title", pr.label);
    b.setAttribute("data-tooltip", `Stage-Gate Call: ${pr.summary.stage_gate_decision}. Updated 3-Year Return: ${fmtPct(pr.summary.expected_roi_pct)} (Odds of Profit: ${pr.summary.prob_positive_npv_pct}%). Click to apply.`);
    b.textContent = pr.label;
    b.addEventListener("click", () => {
      if (state.activeBnPresetId === pr.id) return;
      state.activeBnPresetId = pr.id;
      btnContainer.querySelectorAll(".preset-btn").forEach(x => x.setAttribute("aria-checked", "false"));
      b.setAttribute("aria-checked", "true");
      fadeSwap(
        [
          document.getElementById("bn-kpi-grid"),
          document.getElementById("bn-dag-chart"),
          document.getElementById("bn-posterior-chart")
        ],
        () => renderBnContent(bn)
      );
    });
    btnContainer.appendChild(b);
  });

  renderBnContent(bn);
}

function renderBnContent(bn) {
  const presets = bn.evidence_presets;
  const activePreset = presets.find(p => p.id === state.activeBnPresetId) || presets[0];
  const post = activePreset.summary;
  const prior = bn.prior_baseline;

  const gatePill = document.getElementById("bn-gate-pill");
  gatePill.textContent = post.stage_gate_decision;
  gatePill.setAttribute("tabindex", "0");
  gatePill.setAttribute("data-term-key", "stage_gate");
  gatePill.setAttribute("data-tip-title", "Next-Stage Funding Decision");
  gatePill.setAttribute("data-tooltip", `${post.stage_gate_decision} — Recommended Board action after reviewing the selected 6-month pilot scorecard.`);
  gatePill.className = "stage-gate-pill " + (
    post.stage_gate_decision.includes("GREEN") ? "val-pos" :
    post.stage_gate_decision.includes("HOLD") ? "val-neg" : "val-warn"
  );

  const cards = [
    {
      title: `${t("posterior", "Updated 3-Year Return")}`,
      p50: fmtPct(post.expected_roi_pct),
      note: `${t("prior", "Day-1 Starting Estimate")}: ${fmtPct(prior.expected_roi_pct)}`
    },
    {
      title: `Updated 3-Year ${t("npv", "Net Profit")}`,
      p50: fmtCurrencyCompact(post.expected_npv_usd),
      note: `${t("prior", "Day-1 Starting Estimate")}: ${fmtCurrencyCompact(prior.expected_npv_usd)}`
    },
    {
      title: `${t("prob_profit", "Updated Odds of Making a Profit")}`,
      p50: `${post.prob_positive_npv_pct}%`,
      note: `${t("prob_profit", "Day-1 Odds")}: ${prior.prob_positive_npv_pct}%`
    },
    {
      title: `${t("strong_roi_odds", "Odds of Strong Return")} (≥ 80% ${t("roi", "ROI")})`,
      p50: `${post.prob_strong_or_outsized_roi_pct}%`,
      note: `${t("prob_profit", "Day-1 Odds")}: ${prior.prob_strong_or_outsized_roi_pct}%`
    }
  ];

  document.getElementById("bn-kpi-grid").innerHTML = cards.map(c => `
    <div class="kpi-card">
      <div class="kpi-title">${c.title}</div>
      <div class="kpi-median">${c.p50}</div>
      <div class="kpi-range-box">
        <div class="val-muted">${c.note}</div>
      </div>
    </div>
  `).join("");

  renderBnDagChart(bn, post);
  renderBnPosteriorChart(bn);
}

function renderBnDagChart(bn, post) {
  const W = 680, H = 285;
  const nodePositions = {
    exec_support:          { x: 110, y: 65,  title: "Leadership Support", termKey: "exec_support_node" },
    governance:            { x: 110, y: 205, title: "Quality Guardrails", termKey: "guardrail_strength" },
    pilot_adoption:        { x: 300, y: 45,  title: "6M Staff Usage",     termKey: "pilot_signals" },
    rework_signal:         { x: 300, y: 140, title: "6M Cleanup Rate",    termKey: "rework_drag" },
    token_discipline:      { x: 300, y: 235, title: "6M Budget Control",  termKey: "finops" },
    sustained_realization: { x: 485, y: 95,  title: "Time-to-Profit",     termKey: "realization" },
    roi_regime:            { x: 585, y: 195, title: "3-Yr Return",        termKey: "posterior" }
  };

  const edgesSvg = bn.dag_structure.edges.map(e => {
    const u = nodePositions[e.from];
    const v = nodePositions[e.to];
    return `<line x1="${u.x + 55}" y1="${u.y}" x2="${v.x - 55}" y2="${v.y}" stroke="var(--border-strong)" stroke-width="1.6" />`;
  }).join("");

  const nodesSvg = Object.entries(nodePositions).map(([id, pos]) => {
    const probs = post.node_posteriors_pct[id] || [];
    const topProb = Math.max(...probs, 0);
    const isSel = state.activeBnNodeId === id;
    const nodeMeta = bn.dag_structure.nodes.find(n => n.id === id);
    const breakdown = nodeMeta
      ? nodeMeta.states.map((s, idx) => `${s}: ${(probs[idx] || 0).toFixed(1)}%`).join(" • ")
      : `Top Odds: ${topProb.toFixed(0)}%`;
    const tipTitle = nodeMeta ? nodeMeta.label : pos.title;
    const tipText = `${breakdown}. Click this box to inspect full state odds below.`;

    return `
      <g class="bn-dag-node svg-tooltip-target" tabindex="0" data-node-id="${id}" ${tipAttrs(pos.termKey, tipTitle, tipText)} transform="translate(${pos.x - 58}, ${pos.y - 26})" style="cursor:pointer;">
        <rect width="116" height="52" rx="6" fill="${isSel ? 'var(--bg-elevated)' : 'var(--bg-subtle)'}" stroke="var(--brand-primary)" stroke-width="${isSel ? '2.5' : '1.5'}" />
        <text x="58" y="20" text-anchor="middle" fill="var(--text-primary)" font-size="10.5" font-weight="700">${pos.title}</text>
        <text x="58" y="38" text-anchor="middle" fill="var(--brand-primary)" font-size="10" font-family="var(--font-mono)">Top Odds: ${topProb.toFixed(0)}%</text>
      </g>
    `;
  }).join("");

  const container = document.getElementById("bn-dag-chart");
  container.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="7-node Bayesian Network Decision Map">
      ${edgesSvg}
      ${nodesSvg}
    </svg>
  `;

  container.querySelectorAll(".bn-dag-node").forEach(g => {
    g.addEventListener("click", () => {
      const nodeId = g.getAttribute("data-node-id");
      state.activeBnNodeId = nodeId;
      const nodeMeta = bn.dag_structure.nodes.find(n => n.id === nodeId);
      const probs = post.node_posteriors_pct[nodeId] || [];
      if (nodeMeta) {
        const breakdown = nodeMeta.states.map((s, idx) => `${s}: ${(probs[idx] || 0).toFixed(1)}%`).join(" • ");
        const insp = document.getElementById("bn-node-inspector-text");
        if (insp) {
          fadeSwap(insp, () => {
            insp.innerHTML = `<strong>${nodeMeta.label}:</strong> ${breakdown}`;
          });
        }
      }
      renderBnDagChart(bn, post);
    });
  });
}

function renderBnPosteriorChart(bn) {
  const presets = bn.evidence_presets;
  const activePreset = presets.find(p => p.id === state.activeBnPresetId) || presets[0];
  const post = activePreset.summary;
  const prior = bn.prior_baseline;

  const W = 680, H = 285;
  const pad = { top: 24, right: 24, bottom: 36, left: 52 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;

  if (state.activeBnChartView === "pilot_signals") {
    const signals = [
      { id: "pilot_adoption", label: "High Pilot Usage", termKey: "pilot_signals" },
      { id: "rework_signal", label: "Low Cleanup Rate", termKey: "rework_drag" },
      { id: "token_discipline", label: "On-Budget Usage", termKey: "finops" },
      { id: "sustained_realization", label: "High Profit Conversion", termKey: "realization" }
    ];
    const slotW = plotW / signals.length;
    const bars = signals.map((s, i) => {
      const pPrior = (prior.node_posteriors_pct[s.id] || [0, 0, 0])[2] || 0;
      const pPost = (post.node_posteriors_pct[s.id] || [0, 0, 0])[2] || 0;
      const hPrior = (pPrior / 100.0) * plotH;
      const hPost = (pPost / 100.0) * plotH;
      const cx = pad.left + i * slotW + slotW * 0.5;
      const bw = 32;
      const tipPrior = `Day-1 Starting Odds for ${s.label}: ${pPrior.toFixed(1)}% before pilot data.`;
      const tipPost = `Updated Odds for ${s.label}: ${pPost.toFixed(1)}% after factoring in the selected 6-month pilot result.`;
      return `
        <rect class="svg-tooltip-target" tabindex="0" data-term-key="prior" data-tip-title="Day-1 Estimate • ${escAttr(s.label)}" data-tooltip="${escAttr(tipPrior)}" x="${(cx - bw - 3).toFixed(1)}" y="${(pad.top + plotH - hPrior).toFixed(1)}" width="${bw}" height="${hPrior.toFixed(1)}" fill="#64748b" fill-opacity="0.65" rx="3" />
        <rect class="svg-tooltip-target" tabindex="0" ${tipAttrs(s.termKey, `Updated Odds • ${s.label}`, tipPost)} x="${(cx + 3).toFixed(1)}" y="${(pad.top + plotH - hPost).toFixed(1)}" width="${bw}" height="${hPost.toFixed(1)}" fill="var(--positive)" rx="3" />
        <text x="${(cx + 3 + bw / 2).toFixed(1)}" y="${(pad.top + plotH - hPost - 6).toFixed(1)}" text-anchor="middle" fill="var(--text-primary)" font-size="11" font-weight="700" font-family="var(--font-mono)">${pPost.toFixed(0)}%</text>
        <text x="${cx.toFixed(1)}" y="${H - 10}" text-anchor="middle" fill="var(--text-secondary)" font-size="11" font-weight="600">${s.label}</text>
      `;
    }).join("");

    document.getElementById("bn-posterior-chart").innerHTML = `
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="6-month pilot signal probabilities">
        <line x1="${pad.left}" y1="${pad.top + plotH}" x2="${W - pad.right}" y2="${pad.top + plotH}" stroke="var(--border-strong)" />
        ${bars}
      </svg>
    `;
    return;
  }

  const regimes = [
    { key: "loss_below_0_pct", label: "Loss (< 0%)" },
    { key: "modest_0_to_80_pct", label: "Modest (0–80%)" },
    { key: "strong_80_to_160_pct", label: "Strong (80–160%)" },
    { key: "outsized_above_160_pct", label: "Standout (> 160%)" }
  ];

  const slotW = plotW / regimes.length;
  const regBars = regimes.map((r, i) => {
    const pPrior = prior.regime_probabilities_pct[r.key];
    const pPost = post.regime_probabilities_pct[r.key];
    const hPrior = (pPrior / 100.0) * plotH;
    const hPost = (pPost / 100.0) * plotH;
    const cx = pad.left + i * slotW + slotW * 0.5;
    const bw = 32;
    const tipPrior = `Day-1 Starting Odds of ${r.label} 3-Year ROI: ${pPrior.toFixed(1)}%.`;
    const tipPost = `Updated Odds of ${r.label} 3-Year ROI after 6-month pilot: ${pPost.toFixed(1)}%.`;
    return `
      <rect class="svg-tooltip-target" tabindex="0" data-term-key="prior" data-tip-title="Day-1 Estimate • ${escAttr(r.label)}" data-tooltip="${escAttr(tipPrior)}" x="${(cx - bw - 3).toFixed(1)}" y="${(pad.top + plotH - hPrior).toFixed(1)}" width="${bw}" height="${hPrior.toFixed(1)}" fill="#64748b" fill-opacity="0.65" rx="3" />
      <rect class="svg-tooltip-target" tabindex="0" data-term-key="posterior" data-tip-title="Updated Odds • ${escAttr(r.label)}" data-tooltip="${escAttr(tipPost)}" x="${(cx + 3).toFixed(1)}" y="${(pad.top + plotH - hPost).toFixed(1)}" width="${bw}" height="${hPost.toFixed(1)}" fill="var(--brand-primary)" rx="3" />
      <text x="${(cx + 3 + bw / 2).toFixed(1)}" y="${(pad.top + plotH - hPost - 6).toFixed(1)}" text-anchor="middle" fill="var(--text-primary)" font-size="11" font-weight="700" font-family="var(--font-mono)">${pPost.toFixed(1)}%</text>
      <text x="${cx.toFixed(1)}" y="${H - 10}" text-anchor="middle" fill="var(--text-secondary)" font-size="11" font-weight="600">${r.label}</text>
    `;
  }).join("");

  document.getElementById("bn-posterior-chart").innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Bayesian prior vs posterior ROI regime probability chart">
      <line x1="${pad.left}" y1="${pad.top + plotH}" x2="${W - pad.right}" y2="${pad.top + plotH}" stroke="var(--border-strong)" />
      ${regBars}
    </svg>
  `;
}

// ============================================================================
// CROSS-PARADIGM & CROSS-SCENARIO TABLES
// ============================================================================

function renderCrossParadigmTable(sc) {
  const rows = sc.cross_paradigm_comparison || [];
  const keyMap = {
    monte_carlo: "monte_carlo",
    agent_based: "abm",
    system_dynamics: "system_dynamics",
    discrete_event: "des",
    bayesian_network: "bayesian_network"
  };
  const folderMap = {
    monte_carlo: "monte-carlo",
    agent_based: "agent-based",
    system_dynamics: "system-dynamics",
    discrete_event: "discrete-event",
    bayesian_network: "bayesian-network"
  };
  document.getElementById("cross-paradigm-tbody").innerHTML = rows.map(r => {
    const gKey = keyMap[r.paradigm_id] || "monte_carlo";
    const folder = folderMap[r.paradigm_id] || "monte-carlo";
    return `
      <tr>
        <th scope="row">
          <div>${t(gKey, r.paradigm_name)}</div>
          <div style="display:flex; flex-wrap:wrap; gap:0.35rem; margin-block-start:0.35rem;">
            <button type="button" class="btn-secondary" style="padding:0.2rem 0.45rem; font-size:0.72rem;" data-open-md="${r.paradigm_id}">📖 Modal</button>
          </div>
        </th>
        <td>${r.mechanism}</td>
        <td class="${r.downside_roi_pct < 0 ? 'val-neg' : 'val-warn'}">${fmtPct(r.downside_roi_pct)}</td>
        <td><strong>${fmtPct(r.central_roi_pct)}</strong></td>
        <td class="val-pos">${fmtPct(r.upside_roi_pct)}</td>
        <td><strong>${fmtCurrencyCompact(r.central_npv_usd)}</strong></td>
        <td style="white-space:normal; min-inline-size:260px; font-family:var(--font-sans);">${r.primary_insight}</td>
      </tr>
    `;
  }).join("");
}

function renderComparisonTable() {
  document.getElementById("comparison-table-body").innerHTML = state.bundle.scenarios.map(sc => {
    const k = sc.kpis;
    const p = sc.paradigms;
    const isCurrent = sc.id === state.activeScenarioId;
    const abmRoi = p.agent_based.kpis.emergent_roi_pct.p50;
    const sdRoi = p.system_dynamics.kpis.equilibrium_roi_pct;
    const desRoi = p.discrete_event.kpis.process_roi_pct;
    const bnRoi = p.bayesian_network.prior_baseline.expected_roi_pct;

    return `
      <tr style="${isCurrent ? 'outline: 2px solid var(--brand-primary); outline-offset: -2px;' : ''}">
        <th scope="row">${sc.name} ${isCurrent ? '<span class="scenario-badge">Active</span>' : ''}</th>
        <td>
          <span class="${k.roi_pct.p10 < 0 ? 'val-neg' : 'val-warn'}">${fmtPct(k.roi_pct.p10, 0)}</span> /
          <strong>${fmtPct(k.roi_pct.p50, 0)}</strong> /
          <span class="val-pos">${fmtPct(k.roi_pct.p90, 0)}</span>
        </td>
        <td class="${abmRoi < 0 ? 'val-neg' : 'val-pos'}"><strong>${fmtPct(abmRoi)}</strong></td>
        <td class="${sdRoi < 0 ? 'val-neg' : 'val-pos'}"><strong>${fmtPct(sdRoi)}</strong></td>
        <td class="${desRoi < 0 ? 'val-neg' : 'val-pos'}"><strong>${fmtPct(desRoi)}</strong></td>
        <td class="val-pos"><strong>${fmtPct(bnRoi)}</strong></td>
        <td><strong>${fmtCurrencyCompact(k.npv_usd.p50)}</strong></td>
        <td>${fmtMonths(k.payback_months.p50)}</td>
      </tr>
    `;
  }).join("");
}

document.addEventListener("DOMContentLoaded", init);
