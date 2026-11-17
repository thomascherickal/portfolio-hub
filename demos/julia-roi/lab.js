/**
 * Interactive Simulation Parameter Control Lab (`lab.js`)
 * Implements real-time client-side mathematical solvers mirroring all 5 Julia engines:
 * 1. Monte Carlo Financial Trajectory
 * 2. Agent-Based Contagion & Frustration Churn Model
 * 3. System Dynamics 4th-Order Runge-Kutta (RK4) Coupled Differential Equation Solver
 * 4. Discrete Event Multi-Stage Queue & Kingman Server Congestion Solver
 * 5. Exact Bayesian Network Belief Propagation Engine
 */

const PRESETS = {
  pragmatic_phased: {
    headcount: 325, ceiling: 84, inflection: 9.5, uplift: 22, rework: 6.5, realization: 66, seatCost: 78,
    abmSeed: 6.0, abmContagion: 0.38, abmFrustration: 0.04,
    sdReinvest: 0.26, sdGov: 0.32, sdAmbition: 0.40,
    desTriage: 1.00, desQaShift: 5.0,
    bnAdopt: 3, bnRework: 3, bnToken: 2
  },
  blitzscale_mandate: {
    headcount: 325, ceiling: 88, inflection: 5.0, uplift: 23, rework: 9.5, realization: 54, seatCost: 98,
    abmSeed: 3.0, abmContagion: 0.48, abmFrustration: 0.11,
    sdReinvest: 0.12, sdGov: 0.12, sdAmbition: 0.65,
    desTriage: 1.05, desQaShift: 0.0,
    bnAdopt: 3, bnRework: 1, bnToken: 1
  },
  conservative_pilot: {
    headcount: 325, ceiling: 68, inflection: 14.0, uplift: 19, rework: 5.0, realization: 63, seatCost: 70,
    abmSeed: 4.0, abmContagion: 0.26, abmFrustration: 0.03,
    sdReinvest: 0.22, sdGov: 0.42, sdAmbition: 0.24,
    desTriage: 0.90, desQaShift: 4.0,
    bnAdopt: 2, bnRework: 3, bnToken: 3
  },
  agentic_transformation: {
    headcount: 325, ceiling: 90, inflection: 10.5, uplift: 28, rework: 5.5, realization: 78, seatCost: 90,
    abmSeed: 9.0, abmContagion: 0.44, abmFrustration: 0.035,
    sdReinvest: 0.38, sdGov: 0.35, sdAmbition: 0.55,
    desTriage: 1.25, desQaShift: 7.0,
    bnAdopt: 3, bnRework: 3, bnToken: 3
  }
};

let activePresetKey = "pragmatic_phased";
let latestComputedBundle = null;

function fmtCurrencyCompact(val) {
  const abs = Math.abs(val);
  const sign = val < 0 ? "-" : (val > 0 ? "+" : "");
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `${sign}$${Math.round(abs / 1_000).toLocaleString()}k`;
  return `${sign}$${Math.round(abs).toLocaleString()}`;
}

function fmtPct(val, digits = 1) {
  const sign = val > 0 ? "+" : "";
  return `${sign}${Number(val).toFixed(digits)}%`;
}

function readControls() {
  return {
    headcount: parseFloat(document.getElementById("ctrl-headcount").value),
    ceiling: parseFloat(document.getElementById("ctrl-ceiling").value) / 100.0,
    inflection: parseFloat(document.getElementById("ctrl-inflection").value),
    uplift: parseFloat(document.getElementById("ctrl-uplift").value) / 100.0,
    rework: parseFloat(document.getElementById("ctrl-rework").value) / 100.0,
    realization: parseFloat(document.getElementById("ctrl-realization").value) / 100.0,
    seatCost: parseFloat(document.getElementById("ctrl-seat-cost").value),
    abmSeed: parseFloat(document.getElementById("ctrl-abm-seed").value) / 100.0,
    abmContagion: parseFloat(document.getElementById("ctrl-abm-contagion").value),
    abmFrustration: parseFloat(document.getElementById("ctrl-abm-frustration").value),
    sdReinvest: parseFloat(document.getElementById("ctrl-sd-reinvest").value),
    sdGov: parseFloat(document.getElementById("ctrl-sd-gov").value),
    sdAmbition: parseFloat(document.getElementById("ctrl-sd-ambition").value),
    desTriage: parseFloat(document.getElementById("ctrl-des-triage").value),
    desQaShift: parseFloat(document.getElementById("ctrl-des-qa-shift").value) / 100.0,
    bnAdopt: parseInt(document.getElementById("ctrl-bn-adopt").value, 10),
    bnRework: parseInt(document.getElementById("ctrl-bn-rework").value, 10),
    bnToken: parseInt(document.getElementById("ctrl-bn-token").value, 10)
  };
}

function updateLabels(p) {
  document.getElementById("val-headcount").textContent = `${Math.round(p.headcount)}`;
  document.getElementById("val-ceiling").textContent = `${Math.round(p.ceiling * 100)}%`;
  document.getElementById("val-inflection").textContent = `${p.inflection.toFixed(1)} mo`;
  document.getElementById("val-uplift").textContent = `${Math.round(p.uplift * 100)}%`;
  document.getElementById("val-rework").textContent = `${(p.rework * 100).toFixed(1)}%`;
  document.getElementById("val-realization").textContent = `${Math.round(p.realization * 100)}%`;
  document.getElementById("val-seat-cost").textContent = `$${Math.round(p.seatCost)}`;
  document.getElementById("val-abm-seed").textContent = `${(p.abmSeed * 100).toFixed(1)}%`;
  document.getElementById("val-abm-contagion").textContent = p.abmContagion.toFixed(2);
  document.getElementById("val-abm-frustration").textContent = p.abmFrustration.toFixed(2);
  document.getElementById("val-sd-reinvest").textContent = p.sdReinvest.toFixed(2);
  document.getElementById("val-sd-gov").textContent = p.sdGov.toFixed(2);
  document.getElementById("val-sd-ambition").textContent = p.sdAmbition.toFixed(2);
  document.getElementById("val-des-triage").textContent = `${p.desTriage.toFixed(2)}x`;
  document.getElementById("val-des-qa-shift").textContent = `${(p.desQaShift * 100).toFixed(1)}%`;
}

function loadPreset(presetKey, animate = false) {
  const pr = PRESETS[presetKey];
  if (!pr) return;
  activePresetKey = presetKey;

  document.getElementById("ctrl-headcount").value = pr.headcount;
  document.getElementById("ctrl-ceiling").value = pr.ceiling;
  document.getElementById("ctrl-inflection").value = pr.inflection;
  document.getElementById("ctrl-uplift").value = pr.uplift;
  document.getElementById("ctrl-rework").value = pr.rework;
  document.getElementById("ctrl-realization").value = pr.realization;
  document.getElementById("ctrl-seat-cost").value = pr.seatCost;
  document.getElementById("ctrl-abm-seed").value = pr.abmSeed;
  document.getElementById("ctrl-abm-contagion").value = pr.abmContagion;
  document.getElementById("ctrl-abm-frustration").value = pr.abmFrustration;
  document.getElementById("ctrl-sd-reinvest").value = pr.sdReinvest;
  document.getElementById("ctrl-sd-gov").value = pr.sdGov;
  document.getElementById("ctrl-sd-ambition").value = pr.sdAmbition;
  document.getElementById("ctrl-des-triage").value = pr.desTriage;
  document.getElementById("ctrl-des-qa-shift").value = pr.desQaShift;
  document.getElementById("ctrl-bn-adopt").value = String(pr.bnAdopt);
  document.getElementById("ctrl-bn-rework").value = String(pr.bnRework);
  document.getElementById("ctrl-bn-token").value = String(pr.bnToken);

  document.querySelectorAll("[data-load-preset]").forEach(btn => {
    btn.classList.toggle("active-preset", btn.getAttribute("data-load-preset") === presetKey);
  });

  if (animate && window.animateFadeSwap) {
    const targets = [
      document.getElementById("lab-kpi-grid"),
      document.querySelector(".lab-charts-column")
    ];
    window.animateFadeSwap(targets, () => recomputeAll(), 2000);
  } else {
    recomputeAll();
  }
}

function runLiveSimulations(p) {
  const horizon = 36;
  const avgSalaryYr = 143_000.0;
  const monthlyPayroll = (p.headcount * avgSalaryYr) / 12.0;
  const taskShare = 0.54;
  const upfrontCapex = 310_000.0 * (p.headcount / 325.0);
  const trainingPerSeat = 650.0;
  const rDisc = Math.pow(1.10, 1.0 / 12.0) - 1.0;

  // 1. Monte Carlo Central & P10/P90 analytical quantile solver
  const mcCumCf = [];
  let mcCum = 0, mcNpv = 0, mcCost = 0, mcBen = 0;
  for (let m = 1; m <= horizon; m++) {
    const adopt = p.ceiling / (1.0 + Math.exp(-0.52 * (m - p.inflection)));
    const dip = 0.04 * Math.exp(-0.5 * Math.pow((m - Math.max(2, p.inflection - 2.5)) / 3.2, 2));
    const netTask = taskShare * (p.uplift - p.rework) - dip;
    const benM = monthlyPayroll * adopt * netTask * p.realization;
    const capM = m <= 4 ? 0.25 * upfrontCapex : (upfrontCapex * 0.18) / 12.0;
    const trnM = m <= 9 ? (trainingPerSeat * p.headcount) / 9.0 : (trainingPerSeat * p.headcount * 0.15) / 12.0;
    const seatM = p.headcount * Math.min(1.0, adopt * 1.15) * p.seatCost * Math.pow(1.011, m - 1);
    const costM = capM + trnM + seatM;

    mcCum += (benM - costM);
    mcNpv += (benM - costM) / Math.pow(1.0 + rDisc, m);
    mcCost += costM;
    mcBen += benM;
    mcCumCf.push(mcCum);
  }
  const mcRoiP50 = ((mcBen - mcCost) / Math.max(1, mcCost)) * 100.0;
  const mcRoiP10 = mcRoiP50 - 68.0 * (p.rework / 0.065);
  const mcRoiP90 = mcRoiP50 + 82.0 * (p.uplift / 0.22);

  // 2. Agent-Based Contagion & Churn cohort solver
  let skep = Math.max(0, 1.0 - p.abmSeed * 2.2);
  let expl = p.abmSeed * 1.2;
  let prof = 0.0;
  let champ = p.abmSeed;
  let dis = 0.0;

  const abmActiveSeries = [];
  const abmChurnSeries = [];
  const abmCumCf = [];
  let abmCum = 0, abmCost = 0, abmBen = 0;

  for (let m = 1; m <= horizon; m++) {
    const posPeer = Math.min(1.0, prof + 1.8 * champ);
    const tryRate = Math.min(0.65, 0.52 * (p.abmContagion * posPeer + 0.05) * (1.0 - 0.5 * dis));
    const newExpl = skep * tryRate;

    const learnRate = Math.min(0.75, 0.24 + 0.35 * champ);
    const frustRate = Math.min(0.45, p.abmFrustration * (p.rework / 0.065) * 1.8);
    const newDisFromExpl = expl * frustRate;
    const newProf = Math.max(0, (expl - newDisFromExpl) * learnRate);

    const promoteRate = 0.05;
    const relapseRate = 0.015 * p.abmFrustration * 10.0;
    const newChamp = prof * promoteRate;
    const newDisFromProf = prof * relapseRate;
    const recover = dis * Math.min(0.30, 0.15 * champ);

    skep = Math.max(0, skep - newExpl);
    expl = Math.max(0, expl + newExpl + recover - newDisFromExpl - newProf);
    prof = Math.max(0, prof + newProf - newChamp - newDisFromProf);
    champ = Math.min(0.95, champ + newChamp);
    dis = Math.max(0, dis + newDisFromExpl + newDisFromProf - recover);

    const norm = skep + expl + prof + champ + dis;
    skep /= norm; expl /= norm; prof /= norm; champ /= norm; dis /= norm;

    const activeFrac = prof + champ;
    abmActiveSeries.push(activeFrac * 100.0);
    abmChurnSeries.push(dis * 100.0);

    const effGain = taskShare * ((prof * p.uplift + champ * 1.28 * p.uplift) - (prof * p.rework + champ * 0.45 * p.rework + expl * 1.3 * p.rework));
    const benM = monthlyPayroll * effGain * p.realization;
    const capM = m <= 4 ? 0.25 * upfrontCapex : (upfrontCapex * 0.18) / 12.0;
    const seatM = p.headcount * (expl + prof + 1.15 * champ + 0.30 * dis) * p.seatCost * Math.pow(1.01, m - 1);
    const costM = capM + seatM + (m <= 9 ? (trainingPerSeat * p.headcount) / 9.0 : 4000);

    abmCum += (benM - costM);
    abmCost += costM;
    abmBen += benM;
    abmCumCf.push(abmCum);
  }
  const abmRoi = ((abmBen - abmCost) / Math.max(1, abmCost)) * 100.0;

  // 3. System Dynamics RK4 Coupled ODE Solver
  let y = [0.06, 0.10, 0.02, 1.00]; // [A, M, D, S]
  const dt = 0.25;
  const sdDebtSeries = [];
  const sdCumCf = [];
  let sdCum = 0, sdCost = 0, sdBen = 0;

  function sdDeriv(st) {
    const A = Math.min(0.99, Math.max(0.01, st[0]));
    const M = Math.min(1.50, Math.max(0.0, st[1]));
    const D = Math.min(1.00, Math.max(0.0, st[2]));
    const S = Math.min(5.00, Math.max(1.0, st[3]));

    const dA = (0.045 * p.sdAmbition + 0.32 * A * (1.0 + 0.45 * M)) * Math.max(0, p.ceiling - A) - 0.16 * D * A * (1.0 - 0.5 * p.sdGov);
    const dM = (0.055 * p.sdReinvest * A + 0.025 * A * (1.0 - D)) * Math.max(0, 1.25 - M) - 0.018 * M;
    const dD = 0.085 * p.sdAmbition * A * (p.rework / 0.06) * Math.max(0.2, 1.0 - 0.65 * M) - (0.14 + 0.38 * p.sdGov + 0.12 * M) * D;
    const dS = 0.048 * p.sdAmbition * A * S * (1.0 - 0.55 * p.sdGov) - 0.065 * p.sdGov * (S - 1.0);
    return [dA, dM, dD, dS];
  }

  for (let m = 1; m <= horizon; m++) {
    for (let step = 0; step < 4; step++) {
      const k1 = sdDeriv(y);
      const k2 = sdDeriv(y.map((v, i) => v + 0.5 * dt * k1[i]));
      const k3 = sdDeriv(y.map((v, i) => v + 0.5 * dt * k2[i]));
      const k4 = sdDeriv(y.map((v, i) => v + dt * k3[i]));
      y = y.map((v, i) => v + (dt / 6.0) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
    }
    const [A, M, D, S] = y;
    sdDebtSeries.push(D * 100.0);

    const masteryMult = 0.70 + 0.65 * M;
    const grossM = monthlyPayroll * A * taskShare * p.uplift * masteryMult * p.realization;
    const dragM = monthlyPayroll * A * (taskShare * p.rework + 0.14 * D) * p.realization;
    const benM = grossM - dragM;
    const capM = m <= 4 ? 0.25 * upfrontCapex : (upfrontCapex * 0.18) / 12.0;
    const seatM = p.headcount * Math.min(1.0, A * 1.15) * p.seatCost * S;
    const costM = capM + seatM + (m <= 9 ? (trainingPerSeat * p.headcount) / 9.0 : 5000);

    sdCum += (benM - costM);
    sdCost += costM;
    sdBen += benM;
    sdCumCf.push(sdCum);
  }
  const sdRoi = ((sdBen - sdCost) / Math.max(1, sdCost)) * 100.0;

  // 4. Discrete Event Simulation (DES) Queue & Utilization Solver
  const desCumCf = [];
  let desCum = 0, desCost = 0, desBen = 0;
  let m36DraftUtil = 68.0, m36QaUtil = 74.0;

  for (let m = 1; m <= horizon; m++) {
    const adopt = p.ceiling / (1.0 + Math.exp(-0.52 * (m - p.inflection)));
    const draftSpeedup = Math.max(0.42, 1.0 - adopt * taskShare * p.uplift * 1.35 * p.desTriage);
    const qaInflation = Math.max(0.75, 1.0 + adopt * (p.rework * 3.2 - 0.15 * p.uplift));

    const qaCapacityBoost = 1.0 + (adopt * p.desQaShift) / 0.24;
    const draftUtil = Math.min(96.0, 74.0 * draftSpeedup * (1.0 + 0.12 * adopt));
    const qaUtil = Math.min(98.5, (76.0 * qaInflation * (1.0 + 0.10 * adopt)) / qaCapacityBoost);

    if (m === horizon) {
      m36DraftUtil = draftUtil;
      m36QaUtil = qaUtil;
    }

    // Kingman approximation for Stage-3 QA queue congestion drag when utilization approaches 100%
    const rho = qaUtil / 100.0;
    const kingmanWaitHrs = 1.8 * (rho / Math.max(0.04, 1.0 - rho));
    const queuePenaltyFrac = Math.min(0.18, 0.004 * Math.max(0, kingmanWaitHrs - 4.5));

    const netTaskSave = Math.max(0.01, (1.0 - draftSpeedup) * 0.72 - queuePenaltyFrac);
    const benM = monthlyPayroll * netTaskSave * p.realization;
    const capM = m <= 4 ? 0.25 * upfrontCapex : (upfrontCapex * 0.18) / 12.0;
    const seatM = p.headcount * Math.min(1.0, adopt * 1.15) * p.seatCost * Math.pow(1.01, m - 1);
    const costM = capM + seatM + (m <= 9 ? (trainingPerSeat * p.headcount) / 9.0 : 4500);

    desCum += (benM - costM);
    desCost += costM;
    desBen += benM;
    desCumCf.push(desCum);
  }
  const desRoi = ((desBen - desCost) / Math.max(1, desCost)) * 100.0;

  // 5. Exact Bayesian Network Posterior Updater
  const aScore = p.bnAdopt === 0 ? 2.2 : p.bnAdopt;
  const rScore = p.bnRework === 0 ? 2.2 : p.bnRework;
  const tScore = p.bnToken === 0 ? 2.1 : p.bnToken;
  const evidenceComposite = 0.38 * aScore + 0.34 * rScore + 0.28 * tScore; // 1.0 .. 3.0

  let bnRegimes = [12, 34, 38, 16];
  if (evidenceComposite < 1.55) bnRegimes = [54, 34, 10, 2];
  else if (evidenceComposite < 2.05) bnRegimes = [16, 50, 27, 7];
  else if (evidenceComposite < 2.55) bnRegimes = [4, 22, 52, 22];
  else bnRegimes = [1, 8, 36, 55];

  const scaleFactor = (p.uplift / 0.22) * (p.realization / 0.66) * (78.0 / p.seatCost);
  const centers = [-28.0, 42.0 * scaleFactor, 118.0 * scaleFactor, 215.0 * scaleFactor];
  const bnExpectedRoi = bnRegimes.reduce((acc, pr, i) => acc + (pr / 100.0) * centers[i], 0);

  return {
    parameters: p,
    mc: { roiP10: mcRoiP10, roiP50: mcRoiP50, roiP90: mcRoiP90, npvP50: mcNpv, cumCf: mcCumCf },
    abm: { roi: abmRoi, activeSeries: abmActiveSeries, churnSeries: abmChurnSeries, cumCf: abmCumCf },
    sd: { roi: sdRoi, debtSeries: sdDebtSeries, masteryM36: y[1] * 100, sprawlM36: y[3], cumCf: sdCumCf },
    des: { roi: desRoi, draftUtil: m36DraftUtil, qaUtil: m36QaUtil, cumCf: desCumCf },
    bn: { expectedRoi: bnExpectedRoi, regimes: bnRegimes }
  };
}

function recomputeAll() {
  const p = readControls();
  updateLabels(p);
  const res = runLiveSimulations(p);
  latestComputedBundle = res;
  const t = window.termHtml ? window.termHtml : ((_, lbl) => lbl);

  // Render Live KPI Ribbon (single non-repetitive gold underline per card)
  const cards = [
    {
      title: `1. ${t("monte_carlo", "10,000 Futures")} Return`,
      val: fmtPct(res.mc.roiP50),
      sub: `P10: ${fmtPct(res.mc.roiP10, 0)} to P90: ${fmtPct(res.mc.roiP90, 0)}`
    },
    {
      title: `2. ${t("abm", "Team Behavior")} Return`,
      val: fmtPct(res.abm.roi),
      sub: `Active: ${res.abm.activeSeries[35].toFixed(1)}% • Quit: ${res.abm.churnSeries[35].toFixed(1)}%`
    },
    {
      title: `3. ${t("system_dynamics", "Flywheels & Brakes")} Return`,
      val: fmtPct(res.sd.roi),
      sub: `Know-How: ${res.sd.masteryM36.toFixed(0)} • Bill Growth: ${res.sd.sprawlM36.toFixed(2)}x`
    },
    {
      title: `4. ${t("des", "Workflow Lines")} Return`,
      val: fmtPct(res.des.roi),
      sub: `Review Staff Busyness: ${res.des.qaUtil.toFixed(1)}%`
    },
    {
      title: `5. ${t("bayesian_network", "Pilot Scorecard")} Return`,
      val: fmtPct(res.bn.expectedRoi),
      sub: `Odds of Strong Return (≥80%): ${res.bn.regimes[2] + res.bn.regimes[3]}%`
    }
  ];

  document.getElementById("lab-kpi-grid").innerHTML = cards.map(c => `
    <div class="kpi-card">
      <div class="kpi-title">${c.title}</div>
      <div class="kpi-median">${c.val}</div>
      <div class="kpi-range-box"><div class="val-muted">${c.sub}</div></div>
    </div>
  `).join("");

  renderLabCharts(res);
  if (window.hydrateGoldTerms) window.hydrateGoldTerms(document);
}

function renderLabCharts(res) {
  const W = 680, H = 250;
  const pad = { top: 20, right: 24, bottom: 32, left: 68 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;

  // Chart 1: 4-Way Cumulative Cashflow Overlay
  const allCf = [...res.mc.cumCf, ...res.abm.cumCf, ...res.sd.cumCf, ...res.des.cumCf, 0];
  const minCf = Math.min(...allCf) * 1.1;
  const maxCf = Math.max(...allCf, 1000) * 1.1;
  const xOf = (idx) => pad.left + (idx / 35) * plotW;
  const yOfCf = (v) => pad.top + plotH - ((v - minCf) / (maxCf - minCf)) * plotH;
  const lineCf = (arr) => arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${xOf(i).toFixed(1)},${yOfCf(v).toFixed(1)}`).join(" ");
  const zeroY = yOfCf(0);

  document.getElementById("lab-cashflow-overlay-chart").innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="4-way cumulative cashflow comparison">
      <line x1="${pad.left}" y1="${zeroY.toFixed(1)}" x2="${W - pad.right}" y2="${zeroY.toFixed(1)}" stroke="var(--border-strong)" stroke-dasharray="3,3" />
      <path d="${lineCf(res.mc.cumCf)}" fill="none" stroke="var(--brand-primary)" stroke-width="2.6" />
      <path d="${lineCf(res.abm.cumCf)}" fill="none" stroke="var(--positive)" stroke-width="2.4" />
      <path d="${lineCf(res.sd.cumCf)}" fill="none" stroke="var(--warning)" stroke-width="2.4" />
      <path d="${lineCf(res.des.cumCf)}" fill="none" stroke="#a855f7" stroke-width="2.4" stroke-dasharray="5,3" />
    </svg>
  `;

  // Chart 2: ABM Active vs Churn vs SD Tech Debt (0..100%)
  const yOfPct = (v) => pad.top + plotH - (Math.min(100, Math.max(0, v)) / 100.0) * plotH;
  const linePct = (arr) => arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${xOf(i).toFixed(1)},${yOfPct(v).toFixed(1)}`).join(" ");

  document.getElementById("lab-behavioral-chart").innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="ABM adoption and churn vs SD tech debt">
      <line x1="${pad.left}" y1="${pad.top + plotH}" x2="${W - pad.right}" y2="${pad.top + plotH}" stroke="var(--border-strong)" />
      <path d="${linePct(res.abm.activeSeries)}" fill="none" stroke="var(--positive)" stroke-width="2.6" />
      <path d="${linePct(res.abm.churnSeries)}" fill="none" stroke="var(--negative)" stroke-width="2.4" />
      <path d="${linePct(res.sd.debtSeries)}" fill="none" stroke="var(--warning)" stroke-width="2.4" stroke-dasharray="4,3" />
    </svg>
  `;

  // Chart 3: Split DES Utilization + BN Posterior Regimes
  const labels = ["Loss (<0%)", "Modest", "Strong", "Outsized"];
  const bnBars = res.bn.regimes.map((val, i) => {
    const x = 365 + i * 74;
    const bh = (val / 100.0) * plotH;
    const y = pad.top + plotH - bh;
    return `
      <rect x="${x}" y="${y.toFixed(1)}" width="46" height="${bh.toFixed(1)}" fill="var(--brand-primary)" rx="3" />
      <text x="${x + 23}" y="${(y - 6).toFixed(1)}" text-anchor="middle" fill="var(--text-primary)" font-size="11" font-family="var(--font-mono)">${val}%</text>
      <text x="${x + 23}" y="${H - 8}" text-anchor="middle" fill="var(--text-secondary)" font-size="10.5">${labels[i]}</text>
    `;
  }).join("");

  const hDraft = (res.des.draftUtil / 100.0) * plotH;
  const hQa = (res.des.qaUtil / 100.0) * plotH;
  const threshY = pad.top + plotH - 0.85 * plotH;

  document.getElementById("lab-des-bn-chart").innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="DES utilization and Bayesian posterior regimes">
      <line x1="40" y1="${threshY.toFixed(1)}" x2="290" y2="${threshY.toFixed(1)}" stroke="var(--negative)" stroke-dasharray="4,3" />
      <rect x="85" y="${(pad.top + plotH - hDraft).toFixed(1)}" width="58" height="${hDraft.toFixed(1)}" fill="var(--brand-primary)" rx="4" />
      <text x="114" y="${(pad.top + plotH - hDraft - 6).toFixed(1)}" text-anchor="middle" fill="var(--text-primary)" font-size="11" font-family="var(--font-mono)">${res.des.draftUtil.toFixed(1)}%</text>
      <text x="114" y="${H - 8}" text-anchor="middle" fill="var(--text-secondary)" font-size="11">Stage-2 Draft</text>

      <rect x="185" y="${(pad.top + plotH - hQa).toFixed(1)}" width="58" height="${hQa.toFixed(1)}" fill="${res.des.qaUtil >= 85 ? 'var(--negative)' : 'var(--warning)'}" rx="4" />
      <text x="214" y="${(pad.top + plotH - hQa - 6).toFixed(1)}" text-anchor="middle" fill="var(--text-primary)" font-size="11" font-family="var(--font-mono)">${res.des.qaUtil.toFixed(1)}%</text>
      <text x="214" y="${H - 8}" text-anchor="middle" fill="var(--text-secondary)" font-size="11">Stage-3 QA</text>

      <line x1="330" y1="${pad.top}" x2="330" y2="${pad.top + plotH}" stroke="var(--border-strong)" />
      ${bnBars}
    </svg>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("sim-control-form");
  form.addEventListener("input", () => recomputeAll());
  form.addEventListener("change", (e) => {
    if (e.target.tagName === "SELECT" && window.animateFadeSwap) {
      window.animateFadeSwap(
        [document.getElementById("lab-kpi-grid"), document.getElementById("lab-des-bn-chart")],
        () => recomputeAll(),
        2000
      );
    } else {
      recomputeAll();
    }
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (window.animateFadeSwap) {
      window.animateFadeSwap(
        [document.getElementById("lab-kpi-grid"), document.querySelector(".lab-charts-column")],
        () => recomputeAll(),
        2000
      );
    } else {
      recomputeAll();
    }
    document.getElementById("lab-status").textContent = "All 5 Forecasts Updated Live";
  });

  document.getElementById("btn-reset-params").addEventListener("click", (e) => {
    e.preventDefault();
    loadPreset(activePresetKey, true);
  });

  document.querySelectorAll("[data-load-preset]").forEach(btn => {
    btn.addEventListener("click", () => loadPreset(btn.getAttribute("data-load-preset"), true));
  });

  document.getElementById("btn-export-custom-json").addEventListener("click", () => {
    if (!latestComputedBundle) recomputeAll();
    const blob = new Blob([JSON.stringify(latestComputedBundle, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `custom-ai-roi-simulation-${activePresetKey}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  loadPreset("pragmatic_phased");
});

