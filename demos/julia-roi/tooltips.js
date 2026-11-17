/**
 * Comprehensive Plain-English Executive Tooltip Database, Automatic Term Linker,
 * In-UI Rich Markdown Modal Viewer, and 1-Second Fade Animator (`tooltips.js`)
 *
 * Guarantees:
 * 1. Comprehensive Tooltip Database (`window.PLAIN_GLOSSARY`): Covers every technical term,
 *    statistic, metric, and methodology across the entire repository in <= 60 words each.
 * 2. Automatic DOM Term Linker (`window.autoUnderlineTechnicalTerms`): Automatically scans
 *    all visible text across `index.html`, `lab.html`, dynamic tables/cards, and the in-UI
 *    `explanations.md` modal, underlining every technical term in light gold and attaching
 *    an active tooltip (duplicates across panes/cards are welcomed so every occurrence works).
 * 3. Rock-Solid Inline-Styled Floating Tooltip (`#exec-glossary-popover`): Uses explicit
 *    inline `display: block` and `top`/`left` pixel coordinates + CSS `::after` backup so
 *    tooltips are 100% visible on hover, focus, or click in every browser and inside `<dialog>`.
 */

window.PLAIN_GLOSSARY = {
  // Financial & Statistical Metrics
  roi: "Return on Investment (ROI): How much net profit you make for every dollar spent, shown as a percentage. +100% ROI means you got your original investment back plus an equal amount in profit.",
  npv: "Net Profit Today (Net Present Value / NPV): Total 3-year profit minus all costs, adjusted so money earned in future years is worth slightly less than money in hand today.",
  wacc: "Cost of Capital (10% WACC): The annual return your investors expect. Future cash is discounted by 10% per year to make sure this AI project beats alternative investments.",
  p05: "Extreme Downside (P05): A severe stress-test floor where 95% of simulated outcomes do better and only 5% do worse.",
  p10: "Cautious Case (P10): A conservative outcome where 90% of simulated scenarios do better than this number, and only 10% do worse. Use this to test your downside protection.",
  p25: "Lower-Middle Case (P25): The bottom edge of the middle 50% range—75% of simulated futures turn out better than this number.",
  p50: "Typical Case (P50 / Median): The middle outcome across 10,000 simulated futures—half turn out better and half turn out worse. Safer for planning than an optimistic pitch.",
  p75: "Upper-Middle Case (P75): The top edge of the middle 50% range—only 25% of simulated futures beat this number.",
  p90: "Best Case (P90): An upside outcome that only the top 10% of simulated rollouts achieve when adoption is fast and cleanup work stays low.",
  p95: "Stretch Upside Case (P95): An exceptional outcome achieved in only the top 5% of simulated rollouts.",
  iqr: "Middle 50% Band (Interquartile Range / P25–P75): The most likely middle band of outcomes after trimming away the worst 25% and best 25% of scenarios.",
  median: "Median (Middle Outcome): The exact middle number when all 10,000 simulated results are lined up from worst to best.",
  mean: "Average (Mean): The simple mathematical average across all simulated trials.",
  std: "Spread / Volatility (Standard Deviation): Measures how widely outcomes swing from the average—a larger number means wider uncertainty.",
  quantile: "Percentile Benchmark (Quantile): A cutoff point—like P10, P50, or P90—showing what percentage of simulated futures fall below or above that result.",
  payback: "Breakeven Month (Payback Period): The month when total money saved finally catches up to total money spent on setup, training, and software licenses.",
  breakeven: "Breakeven Point: The moment cumulative cash savings equal total spending, moving your project from net investment into net profit.",
  tco: "Total 3-Year Cost (Total Cost of Ownership / TCO): Everything you spend over 36 months combined—upfront IT setup, security, training, monthly seat fees, and AI usage bills.",
  capex: "Upfront Setup Cost (CapEx): Initial money spent in Months 1–4 on IT integration, security guardrails, and data connectors before broad rollout.",

  // The 5 Scientific Simulation Methodologies
  monte_carlo: "10,000 What-If Futures (Monte Carlo Simulation): Instead of guessing one optimistic number, the computer runs your business case 10,000 times with realistic ups and downs to show your true range of outcomes.",
  abm: "Team Behavior Simulation (Agent-Based Modeling / ABM): Simulates 325 individual coworkers influencing each other—showing how champions spread good habits while frustrating AI errors cause others to quit.",
  system_dynamics: "Long-Term Flywheels & Brakes (System Dynamics / SD): Tracks how team skills compound over years, while hidden brakes like sloppy AI cleanup work and rising usage bills push back.",
  des: "Workflow Waiting Lines (Discrete Event Simulation / DES): Follows everyday work items—like support tickets or contracts—through each step to see where human reviewers get backed up.",
  bayesian_network: "Pilot Scorecard Updater (Bayesian Network / BN): A cause-and-effect decision map that takes your 6-month pilot results and updates your 3-year profit odds to guide next-stage funding.",

  // Probability Distributions & Math Concepts
  triangular: "Three-Point Estimate (Triangular Distribution): A simple way to model uncertainty using three numbers: a Cautious Low, a Most Likely Typical value, and a Best-Case High.",
  lognormal: "Right-Skewed Cost Curve (LogNormal Distribution): A realistic cost curve for IT projects where budgets rarely come in way under target, but surprises can push costs noticeably higher.",
  rk4: "Smooth Step-by-Step Solver (4th-Order Runge-Kutta / RK4): A reliable math method that calculates how compounding team skills and rising costs evolve week by week over 3 years.",
  dag: "Cause-and-Effect Map (Directed Acyclic Graph / DAG): A visual flowchart connecting root causes (like leadership support) to 6-month pilot signals and 3-year financial returns.",
  bayes_rule: "Bayes' Rule (Evidence Updating): The mathematical rule for updating your starting odds as soon as real 6-month pilot data arrives.",
  spearman: "Risk Impact Correlation (Spearman Rank Correlation): Measures how strongly a change in one assumption (like cleanup time) pushes your final 3-year profit up or down.",
  kingman: "Waiting Line Explosion Rule (Kingman's Formula): A rule from operations science showing that once human reviewers pass 85% busyness, waiting lines grow dramatically.",
  erlang: "Realistic Task Time Curve (Erlang Distribution): Models how long everyday knowledge-work tasks take—most finish near the average time, with occasional complex items taking longer.",

  // Rollout, Productivity & Behavioral Dynamics
  s_curve: "Rollout S-Curve (Logistic Adoption): How new tools spread in real life—starting slowly with a small pilot, speeding up as word spreads, and leveling off near a natural ceiling.",
  inflection: "Half-Onboard Month (Inflection Point t₀): The month when adoption reaches its fastest pace and half of your target staff are actively using AI.",
  j_curve: "Early Learning Dip (J-Curve): The temporary slowdown in the first few months when employees spend time learning new AI habits before their speed picks up.",
  gross_uplift: "Raw Time Saved (Gross Uplift): The initial percentage of time AI saves on a task before subtracting fact-checking and cleanup time.",
  rework_drag: "Cleanup & Fact-Checking Time (Rework Drag): Hours employees spend double-checking AI drafts, fixing mistakes, or cleaning up sloppy outputs before work can ship.",
  hallucination: "AI Mistakes (Hallucinations): Plausible-sounding but inaccurate facts, code bugs, or citations generated by AI that humans must catch and fix.",
  realization: "Time-to-Profit Conversion (Realization Rate): The share of saved employee hours that actually turns into real financial value—like shipping more products or avoiding extra hiring.",
  token_sprawl: "AI Usage Bill Creep (Token Sprawl): When teams move from simple chat questions to automated AI assistants that run dozens of background steps, causing monthly cloud bills to climb.",
  finops: "Cloud Cost Guardrails (FinOps): Budget controls—like caching common prompts and routing simple tasks to cheaper AI models—that stop monthly usage bills from spiraling.",
  shelfware: "Paid But Unused Seats (Shelfware): Software licenses the company keeps paying for every month after frustrated employees quietly stop using the tool.",
  champions: "AI Champions: Enthusiastic, well-trained teammates who coach their coworkers and help everyone get past early frustrations twice as fast.",
  contagion: "Coworker Word-of-Mouth (Peer Contagion): How quickly positive tips—or negative frustration—spread from one employee to their close teammates.",
  tech_debt: "Cleanup Backlog (Technical Debt): Sloppy or unverified AI work that piles up over time, forcing staff to slow down later to fix mistakes.",
  data_moat: "Company Know-How Flywheel (Data Moat): Shared prompt playbooks and company-specific workflows that make your teams faster and more accurate with AI every month.",
  flywheel: "Growth Flywheel (Reinforcing Loop): A self-reinforcing cycle where more practice leads to better shared playbooks, which in turn attracts more daily users.",
  balancing_loop: "Hidden Brake (Balancing Loop): A natural limit—like rising cleanup work or growing cloud bills—that slows down returns if left unmanaged.",
  stage3_qa: "Final Human Review Bottleneck (Stage-3 QA): When AI helps staff draft work 30% faster, the senior managers who must review and approve that work can get overwhelmed by the waiting line.",
  utilization: "Reviewer Busyness (Server Utilization %): How much of the workday human reviewers spend checking items. Above 85% busyness, waiting lines grow dramatically.",
  cycle_time: "Total Turnaround Time (Cycle Time): Total hours from the moment a task arrives (like a customer ticket or contract) until final approved delivery—including waiting line time.",
  throughput: "Monthly Completed Work (Throughput): Total number of finished pull requests, support tickets, sales proposals, or legal contracts delivered per month.",
  sla: "On-Time Delivery Rate (Service-Level Agreement / SLA): The percentage of customer tickets, contracts, or code changes finished within your promised turnaround time.",
  prior: "Day-1 Starting Estimate (Prior Probability): Your initial 3-year return forecast on Day 1 before seeing any real 6-month pilot results.",
  posterior: "Updated Forecast (Posterior Probability): Your revised 3-year return forecast after factoring in real 6-month pilot adoption, quality, and budget results.",
  stage_gate: "Next-Stage Funding Decision (Stage-Gate): A disciplined checkpoint at Month 6 where leaders decide to scale up (Green Light), fix workflow issues first, or pause spending.",
  tornado: "Biggest Risk Drivers Chart (Tornado Chart): Ranks which uncertain assumptions—like time-to-profit conversion or cleanup time—cause the widest swing in your 3-year profit.",
  waterfall: "Gross-to-Net Profit Bridge (Waterfall Chart): Step-by-step bar chart showing how raw time savings shrink after subtracting cleanup time and 3-year software costs.",
  fte: "Full-Time Employees (FTEs): The number of full-time staff members included in the rollout across your departments.",
  pull_request: "Code Change Package (Pull Request / PR): A batch of new software code submitted by an engineer that must be reviewed and approved by a senior teammate before going live.",
  rfp: "Customer Deal Proposal (Request for Proposal / RFP): A detailed sales bid and questionnaire that sales teams prepare to win enterprise contracts.",

  // Tab 2, 3, 4 & 5 Specific Metrics and Workflow Terms
  active_adopters: "Active Daily Users (Proficient + Champions): Share of employees using AI consistently in their daily workflows without abandoning the tool.",
  skeptical_stage: "Waiting & Watching (Skeptical): Employees who have not tried AI yet and are waiting to see whether teammates find it useful.",
  exploring_stage: "Learning the Ropes (Early Dip): Staff actively experimenting with AI tools who temporarily spend extra time learning prompts and checking drafts.",
  proficient_stage: "Confident Daily Users (Proficient): Employees who have overcome the learning dip and reliably save time with AI every day.",
  frustration_sensitivity: "Frustration Quit Rate: How quickly employees abandon AI after bad drafts or errors, turning paid monthly licenses into unused shelfware.",
  n_replications: "Team Simulation Replications: Number of independent 325-person rollout runs averaged to capture realistic random differences in coworker influence and habit formation.",
  reinvestment_rate: "Share Reinvested in Training: Fraction of early time savings reinvested into prompt playbooks, templates, and coaching to build compounding know-how.",
  net_momentum: "Net Momentum Score: Balance between positive Growth Flywheels (team know-how) and Hidden Brakes (cleanup backlog and rising cloud usage bills).",
  monthly_value_flow: "Monthly Value Created: Gross dollar value of employee hours saved each month before subtracting cleanup drag and software bills.",
  cleanup_cost: "3-Year Cleanup Cost: Total payroll value lost to checking errors, fixing bugs, and cleaning up sloppy AI-generated drafts.",
  guardrail_strength: "Budget & Quality Guardrails: Governance policies—prompt caching, model routing, and human review checks—that curb usage bill creep and mistakes.",
  hours_saved: "Total Hours Saved: Cumulative staff work hours freed up across Engineering, Support, Sales, and Legal after subtracting waiting lines.",
  qa_reallocation: "Extra Staff Shifted to Review: Percentage of drafting time savings reinvested into final human review so approval queues never jam.",
  draft_busyness: "First-Draft Staff Busyness: Share of workday employees spend creating initial drafts or code before submitting work for final human approval.",
  qa_busyness: "Final-Review Staff Busyness: Share of workday senior reviewers spend checking AI-assisted outputs. Exceeding 85% triggers steep waiting lines.",
  danger_line_85: "85% Traffic-Jam Danger Line: Queueing threshold where human reviewers become overloaded, causing approval wait times and SLA misses to spike.",
  workflow_health: "Workflow Health Check: Diagnostic showing whether final human reviewers remain smoothly balanced or hit an overloaded bottleneck.",
  prob_profit: "Odds of Making a Profit: Probability that 3-year net financial benefits exceed all setup, training, and software costs.",
  strong_roi_odds: "Odds of Strong Return: Updated probability of achieving at least +80% 3-year ROI once 6-month pilot results are factored in.",
  exec_support_node: "Leadership Support: Executive sponsorship, clear goals, and dedicated training time that set the foundation for strong pilot adoption.",
  pilot_signals: "6-Month Pilot Signals: Real early metrics—staff usage, cleanup rate, and usage budget control—used to update 3-year profit odds."
};

/**
 * Phrase-to-Glossary Key Dictionary for Automatic Term Underlining across all UI text & Markdown guides.
 * Sorted longest-phrase-first at runtime so specific phrases match before shorter words.
 */
const AUTO_TERM_PHRASES = [
  { phrase: "Monte Carlo Simulation", key: "monte_carlo" },
  { phrase: "Monte Carlo", key: "monte_carlo" },
  { phrase: "10,000 What-If Futures", key: "monte_carlo" },
  { phrase: "Agent-Based Modeling", key: "abm" },
  { phrase: "Agent-Based", key: "abm" },
  { phrase: "ABM", key: "abm" },
  { phrase: "System Dynamics", key: "system_dynamics" },
  { phrase: "Flywheels & Brakes", key: "system_dynamics" },
  { phrase: "Discrete Event Simulation", key: "des" },
  { phrase: "Discrete Event", key: "des" },
  { phrase: "DES", key: "des" },
  { phrase: "Bayesian Networks", key: "bayesian_network" },
  { phrase: "Bayesian Network", key: "bayesian_network" },
  { phrase: "Pilot Scorecard", key: "bayesian_network" },
  { phrase: "Return on Investment", key: "roi" },
  { phrase: "ROI", key: "roi" },
  { phrase: "Net Present Value", key: "npv" },
  { phrase: "Net Profit Today", key: "npv" },
  { phrase: "NPV", key: "npv" },
  { phrase: "WACC", key: "wacc" },
  { phrase: "Cautious Case", key: "p10" },
  { phrase: "Cautious (P10)", key: "p10" },
  { phrase: "P10", key: "p10" },
  { phrase: "Typical Case", key: "p50" },
  { phrase: "Typical (P50)", key: "p50" },
  { phrase: "P50", key: "p50" },
  { phrase: "Median", key: "median" },
  { phrase: "Best Case", key: "p90" },
  { phrase: "Best-Case (P90)", key: "p90" },
  { phrase: "P90", key: "p90" },
  { phrase: "P25–P75", key: "iqr" },
  { phrase: "P25 to P75", key: "iqr" },
  { phrase: "Middle 50% Band", key: "iqr" },
  { phrase: "Interquartile", key: "iqr" },
  { phrase: "IQR", key: "iqr" },
  { phrase: "Breakeven Month", key: "payback" },
  { phrase: "Breakeven Speed", key: "payback" },
  { phrase: "Breakeven", key: "breakeven" },
  { phrase: "Payback", key: "payback" },
  { phrase: "Total 3-Year Cost", key: "tco" },
  { phrase: "TCO", key: "tco" },
  { phrase: "CapEx", key: "capex" },
  { phrase: "Rollout S-Curve", key: "s_curve" },
  { phrase: "S-Curve", key: "s_curve" },
  { phrase: "S-curve", key: "s_curve" },
  { phrase: "Rollout Ceiling", key: "s_curve" },
  { phrase: "Inflection Month", key: "inflection" },
  { phrase: "Half-Onboard Month", key: "inflection" },
  { phrase: "Early Learning Dip", key: "j_curve" },
  { phrase: "J-Curve", key: "j_curve" },
  { phrase: "J-curve", key: "j_curve" },
  { phrase: "Cleanup & Fact-Checking Time", key: "rework_drag" },
  { phrase: "Cleanup Time", key: "rework_drag" },
  { phrase: "Cleanup Drag", key: "rework_drag" },
  { phrase: "Rework Drag", key: "rework_drag" },
  { phrase: "Hallucinations", key: "hallucination" },
  { phrase: "Hallucination", key: "hallucination" },
  { phrase: "Time-to-Profit Conversion", key: "realization" },
  { phrase: "Realization Rate", key: "realization" },
  { phrase: "Profit Conversion", key: "realization" },
  { phrase: "AI Usage Bill Creep", key: "token_sprawl" },
  { phrase: "Usage Bill Growth", key: "token_sprawl" },
  { phrase: "Annual Bill Creep", key: "token_sprawl" },
  { phrase: "Bill Creep", key: "token_sprawl" },
  { phrase: "Token Sprawl", key: "token_sprawl" },
  { phrase: "FinOps", key: "finops" },
  { phrase: "Unused Shelfware Seats", key: "shelfware" },
  { phrase: "Shelfware", key: "shelfware" },
  { phrase: "shelfware", key: "shelfware" },
  { phrase: "AI Champions", key: "champions" },
  { phrase: "AI Champion", key: "champions" },
  { phrase: "Word-of-Mouth", key: "contagion" },
  { phrase: "Peer Contagion", key: "contagion" },
  { phrase: "Cleanup Backlog", key: "tech_debt" },
  { phrase: "Technical Debt", key: "tech_debt" },
  { phrase: "Tech Debt", key: "tech_debt" },
  { phrase: "Company Know-How Flywheel", key: "data_moat" },
  { phrase: "Company Know-How Score", key: "data_moat" },
  { phrase: "Know-How Flywheel", key: "data_moat" },
  { phrase: "Data Moat", key: "data_moat" },
  { phrase: "Growth Flywheels", key: "flywheel" },
  { phrase: "Growth Flywheel", key: "flywheel" },
  { phrase: "Hidden Brakes", key: "balancing_loop" },
  { phrase: "Hidden Brake", key: "balancing_loop" },
  { phrase: "Final Human Review Bottleneck", key: "stage3_qa" },
  { phrase: "Final Human Review Wait", key: "stage3_qa" },
  { phrase: "Final Human Review", key: "stage3_qa" },
  { phrase: "Human Review Waiting Line", key: "stage3_qa" },
  { phrase: "Review Wait Line", key: "stage3_qa" },
  { phrase: "Stage-3 QA", key: "stage3_qa" },
  { phrase: "Busyness (%)", key: "utilization" },
  { phrase: "Busyness", key: "utilization" },
  { phrase: "Utilization", key: "utilization" },
  { phrase: "Turnaround Time", key: "cycle_time" },
  { phrase: "Cycle Time", key: "cycle_time" },
  { phrase: "Throughput", key: "throughput" },
  { phrase: "On-Time Delivery", key: "sla" },
  { phrase: "SLA", key: "sla" },
  { phrase: "Starting Estimate", key: "prior" },
  { phrase: "Prior", key: "prior" },
  { phrase: "Updated Forecast", key: "posterior" },
  { phrase: "Updated 3-Year Return", key: "posterior" },
  { phrase: "Posterior", key: "posterior" },
  { phrase: "Next-Stage Funding Decision", key: "stage_gate" },
  { phrase: "Stage-Gate Check", key: "stage_gate" },
  { phrase: "Stage-Gate", key: "stage_gate" },
  { phrase: "Risk Drivers", key: "tornado" },
  { phrase: "Tornado", key: "tornado" },
  { phrase: "Gross-to-Net Bridge", key: "waterfall" },
  { phrase: "FTEs", key: "fte" },
  { phrase: "FTE", key: "fte" },
  { phrase: "Pull Requests", key: "pull_request" },
  { phrase: "RFPs", key: "rfp" },
  { phrase: "Triangular", key: "triangular" },
  { phrase: "LogNormal", key: "lognormal" },
  { phrase: "Runge-Kutta", key: "rk4" },
  { phrase: "RK4", key: "rk4" },
  { phrase: "Directed Acyclic Graph", key: "dag" },
  { phrase: "DAG", key: "dag" },
  { phrase: "Bayes' Rule", key: "bayes_rule" },
  { phrase: "Kingman", key: "kingman" },
  { phrase: "Active Daily Users", key: "active_adopters" },
  { phrase: "Waiting & Watching", key: "skeptical_stage" },
  { phrase: "Learning (Early Dip)", key: "exploring_stage" },
  { phrase: "Learning the Ropes", key: "exploring_stage" },
  { phrase: "Confident Daily Users", key: "proficient_stage" },
  { phrase: "Confident Daily User", key: "proficient_stage" },
  { phrase: "Frustration Quit Rate", key: "frustration_sensitivity" },
  { phrase: "Frustrated Quitters", key: "frustration_sensitivity" },
  { phrase: "Frustrated Quitter", key: "frustration_sensitivity" },
  { phrase: "team simulations", key: "n_replications" },
  { phrase: "Share Reinvested in Training", key: "reinvestment_rate" },
  { phrase: "Reinvestment in Playbooks", key: "reinvestment_rate" },
  { phrase: "Net Momentum Score", key: "net_momentum" },
  { phrase: "Monthly Value Created", key: "monthly_value_flow" },
  { phrase: "3-Year Cleanup Cost", key: "cleanup_cost" },
  { phrase: "Monthly Cleanup Cost", key: "cleanup_cost" },
  { phrase: "Budget Guardrail Strength", key: "guardrail_strength" },
  { phrase: "Quality Guardrails", key: "guardrail_strength" },
  { phrase: "Total Hours Saved", key: "hours_saved" },
  { phrase: "Hours Saved / Mo", key: "hours_saved" },
  { phrase: "Hours Saved", key: "hours_saved" },
  { phrase: "Extra Staff Shifted to Review", key: "qa_reallocation" },
  { phrase: "Shift Saved Time", key: "qa_reallocation" },
  { phrase: "First-Draft Staff Busyness", key: "draft_busyness" },
  { phrase: "Drafting Staff Busyness", key: "draft_busyness" },
  { phrase: "Final-Review Staff Busyness", key: "qa_busyness" },
  { phrase: "Review Staff Busyness", key: "qa_busyness" },
  { phrase: "85% Traffic-Jam Danger Line", key: "danger_line_85" },
  { phrase: "85% busyness danger line", key: "danger_line_85" },
  { phrase: "Workflow Health Check", key: "workflow_health" },
  { phrase: "Updated Odds of Making a Profit", key: "prob_profit" },
  { phrase: "Odds of Making a Profit", key: "prob_profit" },
  { phrase: "Day-1 Odds", key: "prob_profit" },
  { phrase: "Odds of Strong Return", key: "strong_roi_odds" },
  { phrase: "Strong Return", key: "strong_roi_odds" },
  { phrase: "Leadership Support", key: "exec_support_node" },
  { phrase: "6-Month Pilot Signals", key: "pilot_signals" },
  { phrase: "6-Month Pilot Results", key: "pilot_signals" },
  { phrase: "6-Month Pilot", key: "pilot_signals" }
].sort((a, b) => b.phrase.length - a.phrase.length);

// Build combined RegExp for automatic text-node underlining
const escapedPhrases = AUTO_TERM_PHRASES.map(item =>
  item.phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
);
const AUTO_TERM_REGEX = new RegExp(`(?<![A-Za-z0-9_])(${escapedPhrases.join("|")})(?![A-Za-z0-9_])`, "g");
const PHRASE_TO_KEY = new Map(AUTO_TERM_PHRASES.map(item => [item.phrase, item.key]));

/**
 * Helper to wrap a term in a light-gold underlined element that triggers the floating tooltip.
 */
window.termHtml = function termHtml(key, labelText) {
  const tip = window.PLAIN_GLOSSARY[key] || window.PLAIN_GLOSSARY.roi;
  const safeTip = tip.replace(/"/g, "&quot;");
  return `<span tabindex="0" role="button" class="gold-term" data-term-key="${key}" data-tooltip="${safeTip}" title="${safeTip}">${labelText}</span>`;
};

window.svgTipAttrs = function svgTipAttrs(termKey, title, tip) {
  const esc = (s) => String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const keyPart = termKey ? `data-term-key="${esc(termKey)}" ` : "";
  return `${keyPart}data-tip-title="${esc(title)}" data-tooltip="${esc(tip)}"`;
};

/**
 * Hydrates all `.gold-term` elements and automatically scans text nodes inside `root`
 * so every technical term across the entire UI has a light-gold underline and active tooltip.
 */
let isHydrating = false;

window.hydrateGoldTerms = function hydrateGoldTerms(root = document) {
  if (isHydrating) return;
  isHydrating = true;
  try {
    // 1. Walk text nodes in `root` to auto-underline technical terms not already wrapped
    const container = root === document ? document.body : root;
    if (container) {
      const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          if (!node.nodeValue || node.nodeValue.trim().length < 2) return NodeFilter.FILTER_REJECT;
          const p = node.parentElement;
          if (!p) return NodeFilter.FILTER_REJECT;
          // Skip scripts, styles, SVGs, code blocks, form inputs, tab buttons, links to raw files, and existing .gold-term spans
          if (p.closest(".gold-term, .gold-term-tab, [role='tab'], .md-file-link, #exec-glossary-popover, svg, script, style, code, pre, select, option, textarea")) {
            return NodeFilter.FILTER_REJECT;
          }
          AUTO_TERM_REGEX.lastIndex = 0;
          return AUTO_TERM_REGEX.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      });

      const nodesToReplace = [];
      let current;
      while ((current = walker.nextNode())) {
        nodesToReplace.push(current);
      }

      for (const textNode of nodesToReplace) {
        const text = textNode.nodeValue;
        const parentEl = textNode.parentElement;
        const insideInteractive = Boolean(parentEl && parentEl.closest("button, a"));
        AUTO_TERM_REGEX.lastIndex = 0;
        let lastIdx = 0;
        let match;
        const frag = document.createDocumentFragment();
        let replacedAny = false;

        while ((match = AUTO_TERM_REGEX.exec(text)) !== null) {
          const phrase = match[1];
          const key = PHRASE_TO_KEY.get(phrase);
          if (!key || !window.PLAIN_GLOSSARY[key]) continue;

          if (match.index > lastIdx) {
            frag.appendChild(document.createTextNode(text.slice(lastIdx, match.index)));
          }

          const span = document.createElement("span");
          span.className = "gold-term";
          if (!insideInteractive) {
            span.setAttribute("tabindex", "0");
            span.setAttribute("role", "button");
          }
          span.setAttribute("data-term-key", key);
          span.setAttribute("data-tooltip", window.PLAIN_GLOSSARY[key]);
          span.setAttribute("title", window.PLAIN_GLOSSARY[key]);
          span.textContent = phrase;
          frag.appendChild(span);

          lastIdx = match.index + phrase.length;
          replacedAny = true;
        }

        if (replacedAny && textNode.parentNode) {
          if (lastIdx < text.length) {
            frag.appendChild(document.createTextNode(text.slice(lastIdx)));
          }
          textNode.parentNode.replaceChild(frag, textNode);
        }
      }
    }

    // 2. Ensure every `.gold-term`, `.gold-term-tab`, `[data-term-key]`, and `[data-tooltip]` element has consistent attributes
    const els = (root || document).querySelectorAll(".gold-term, .gold-term-tab, [data-term-key], [data-tooltip]");
    els.forEach(el => {
      const key = el.getAttribute("data-term-key");
      const customTip = el.getAttribute("data-tooltip");
      const hasCustom = Boolean(customTip && el.hasAttribute("data-tip-title"));
      const tip = hasCustom
        ? customTip
        : ((key && window.PLAIN_GLOSSARY[key]) || customTip || el.getAttribute("title") || window.PLAIN_GLOSSARY.roi);
      if (el.getAttribute("data-tooltip") !== tip) el.setAttribute("data-tooltip", tip);
      if (!(el instanceof SVGElement) && el.getAttribute("title") !== tip) el.setAttribute("title", tip);
      if (!el.hasAttribute("tabindex") && el.tagName !== "BUTTON" && el.tagName !== "A" && !el.closest("button, a")) {
        el.setAttribute("tabindex", "0");
      }
      if (el.hasAttribute("popovertarget")) {
        el.removeAttribute("popovertarget");
      }
    });
  } finally {
    isHydrating = false;
  }
};

/**
 * 1-Second Fade-Out and Fade-In Transition Helper (`durationMs = 1000`: 500ms fade out + 500ms fade in).
 */
const activeFadeAnimations = new WeakMap();

window.animateFadeSwap = function animateFadeSwap(elements, updateFn, totalDurationMs = 2000) {
  const list = (Array.isArray(elements) ? elements : [elements]).filter(Boolean);
  if (list.length === 0) {
    if (updateFn) updateFn();
    window.hydrateGoldTerms(document);
    return;
  }

  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const halfDuration = prefersReduced ? 120 : Math.round(totalDurationMs / 2);

  list.forEach(el => {
    const prev = activeFadeAnimations.get(el);
    if (prev) {
      if (prev.timer) clearTimeout(prev.timer);
      if (prev.anim) {
        try { prev.anim.cancel(); } catch (_) {}
      }
      el.style.opacity = "1";
    }
  });

  list.forEach((el, idx) => {
    let animOut = null;
    if (typeof el.animate === "function") {
      animOut = el.animate(
        [{ opacity: 1 }, { opacity: 0.04 }],
        { duration: halfDuration, easing: "ease-in-out", fill: "forwards" }
      );
    } else {
      el.style.transition = `opacity ${halfDuration}ms ease-in-out`;
      el.style.opacity = "0.04";
    }

    const timer = setTimeout(() => {
      if (idx === 0 && updateFn) {
        updateFn();
        window.hydrateGoldTerms(document);
      }

      if (animOut) {
        try { animOut.cancel(); } catch (_) {}
      }

      if (typeof el.animate === "function") {
        const animIn = el.animate(
          [{ opacity: 0.04 }, { opacity: 1 }],
          { duration: halfDuration, easing: "ease-in-out", fill: "forwards" }
        );
        activeFadeAnimations.set(el, { anim: animIn, timer: null });
        animIn.onfinish = () => {
          try { animIn.cancel(); } catch (_) {}
          el.style.opacity = "1";
          activeFadeAnimations.delete(el);
        };
      } else {
        el.style.opacity = "1";
        activeFadeAnimations.delete(el);
      }
    }, halfDuration);

    activeFadeAnimations.set(el, { anim: animOut, timer });
  });
};

function initExecutiveTooltips() {
  document.body.classList.add("js-tooltips-ready");
  let pop = document.getElementById("exec-glossary-popover");
  if (!pop) {
    pop = document.createElement("div");
    pop.id = "exec-glossary-popover";
    pop.setAttribute("role", "tooltip");
    pop.innerHTML = `<div class="tooltip-content"><strong id="exec-tip-title">Plain-English Explanation</strong><p id="exec-tip-body"></p></div>`;
    document.body.appendChild(pop);
  }

  const TRIGGER_SELECTOR = ".gold-term, .gold-term-tab, [data-term-key], [data-tooltip]";
  const titleEl = document.getElementById("exec-tip-title");
  const bodyEl = document.getElementById("exec-tip-body");
  let activeTrigger = null;
  let hideTimeout = null;

  function getTargetElement(rawTarget) {
    if (!rawTarget) return null;
    return rawTarget.nodeType === 1 ? rawTarget : rawTarget.parentElement;
  }

  function positionPopoverNear(trigger) {
    if (!trigger || !trigger.isConnected) return;
    const rect = trigger.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return;

    // If a modal <dialog> is currently open and the trigger is inside it, ensure the tooltip lives inside the top-layer <dialog>
    const openDialog = trigger.closest("dialog[open]");
    const targetParent = openDialog || document.body;
    if (pop.parentElement !== targetParent) {
      targetParent.appendChild(pop);
    }

    // Force inline display & visibility so no stylesheet cascade can hide it
    pop.style.display = "block";
    pop.style.visibility = "visible";
    pop.style.opacity = "1";
    pop.style.position = "fixed";
    pop.style.zIndex = "2147483647";

    const popW = Math.min(320, window.innerWidth - 24);
    pop.style.width = `${popW}px`;
    pop.style.maxWidth = `${popW}px`;

    const popRect = pop.getBoundingClientRect();
    const popH = popRect.height || 96;

    let top = rect.top - popH - 10;
    if (top < 10) {
      top = Math.min(window.innerHeight - popH - 10, rect.bottom + 10);
    }

    let left = rect.left + rect.width / 2 - popW / 2;
    left = Math.max(12, Math.min(window.innerWidth - popW - 12, left));

    pop.style.top = `${Math.round(top)}px`;
    pop.style.left = `${Math.round(left)}px`;
    pop.style.insetBlockStart = `${Math.round(top)}px`;
    pop.style.insetInlineStart = `${Math.round(left)}px`;
    pop.style.margin = "0";
  }

  function showForTrigger(trigger) {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
    const key = trigger.getAttribute("data-term-key");
    const customTip = trigger.getAttribute("data-tooltip");
    const glossaryTip = key ? window.PLAIN_GLOSSARY[key] : "";
    const hasCustom = Boolean(customTip && trigger.hasAttribute("data-tip-title"));
    const text = (hasCustom ? customTip : (glossaryTip || customTip || trigger.getAttribute("title"))) || "";
    if (!text) return;

    if (activeTrigger && activeTrigger !== trigger) {
      activeTrigger.removeAttribute("aria-describedby");
    }
    activeTrigger = trigger;

    const customTitle = trigger.getAttribute("data-tip-title");
    const tabMain = trigger.querySelector ? trigger.querySelector(".tab-label-main") : null;
    const rawTitle = customTitle || (tabMain ? tabMain.textContent : trigger.textContent) || "Plain-English Explanation";
    titleEl.textContent = rawTitle.replace(/\s+/g, " ").trim().slice(0, 90);
    bodyEl.textContent = text;
    trigger.setAttribute("aria-describedby", "exec-glossary-popover");

    document.querySelectorAll(".gold-term-active").forEach(el => el.classList.remove("gold-term-active"));
    trigger.classList.add("gold-term-active");

    pop.classList.add("tooltip-visible");
    positionPopoverNear(trigger);
  }

  function hideTooltip(immediate = false) {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
    const doHide = () => {
      pop.classList.remove("tooltip-visible");
      pop.style.display = "none";
      if (activeTrigger) {
        activeTrigger.removeAttribute("aria-describedby");
      }
      document.querySelectorAll(".gold-term-active").forEach(el => el.classList.remove("gold-term-active"));
      activeTrigger = null;
    };
    if (immediate) {
      doHide();
    } else {
      hideTimeout = setTimeout(doHide, 150);
    }
  }

  window.hydrateGoldTerms(document);
  const mo = new MutationObserver((mutations) => {
    const hasRelevant = mutations.some(m => {
      const tEl = getTargetElement(m.target);
      return tEl && !tEl.closest("#exec-glossary-popover");
    });
    if (hasRelevant) {
      window.hydrateGoldTerms(document);
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });

  // Bind both mouseover and pointerover for universal desktop/touch compatibility across HTML and SVG elements
  const handleHover = (e) => {
    const targetEl = getTargetElement(e.target);
    const trigger = targetEl && targetEl.closest ? targetEl.closest(TRIGGER_SELECTOR) : null;
    if (trigger) {
      showForTrigger(trigger);
    } else if (activeTrigger && (!targetEl || !targetEl.closest || !targetEl.closest("#exec-glossary-popover"))) {
      hideTooltip(false);
    }
  };

  document.addEventListener("mouseover", handleHover);
  document.addEventListener("pointerover", handleHover);

  document.addEventListener("focusin", (e) => {
    const targetEl = getTargetElement(e.target);
    const trigger = targetEl && targetEl.closest ? targetEl.closest(TRIGGER_SELECTOR) : null;
    if (trigger) showForTrigger(trigger);
  });

  document.addEventListener("focusout", (e) => {
    const targetEl = getTargetElement(e.target);
    const trigger = targetEl && targetEl.closest ? targetEl.closest(TRIGGER_SELECTOR) : null;
    if (trigger) hideTooltip(false);
  });

  document.addEventListener("click", (e) => {
    const targetEl = getTargetElement(e.target);
    const trigger = targetEl && targetEl.closest ? targetEl.closest(".gold-term, .svg-tooltip-target") : null;
    if (trigger) {
      showForTrigger(trigger);
    } else if (activeTrigger && (!targetEl || !targetEl.closest || !targetEl.closest("#exec-glossary-popover, .gold-term-tab"))) {
      hideTooltip(true);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && activeTrigger) {
      hideTooltip(true);
    }
  });

  window.addEventListener("scroll", () => {
    if (activeTrigger) positionPopoverNear(activeTrigger);
  }, { passive: true });
}

/**
 * Full-Featured GitHub-Flavored Markdown (GFM) Parser & In-UI Modal Viewer
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseInlineMarkdown(text) {
  let out = escapeHtml(text);
  out = out.replace(/`([^`]+)`/g, "<code class=\"md-inline-code\">$1</code>");
  out = out.replace(/\*\*\*([^*]+)\*\*\*/g, "<strong><em>$1</em></strong>");
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
  out = out.replace(/~~([^~]+)~~/g, "<del>$1</del>");
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, lbl, url) => {
    const safeUrl = url.replace(/^(javascript|data|vbscript):/i, "#");
    return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="md-link">${lbl}</a>`;
  });
  return out;
}

window.renderMarkdownToHtml = function renderMarkdownToHtml(md) {
  if (!md) return "<p>No explanation content available.</p>";
  const lines = String(md).replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (/^\s*$/.test(line)) {
      i++;
      continue;
    }

    const fenceMatch = line.match(/^```(\w*)\s*$/);
    if (fenceMatch) {
      const lang = fenceMatch[1] || "text";
      const codeLines = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        codeLines.push(escapeHtml(lines[i]));
        i++;
      }
      i++;
      if (lang.toLowerCase() === "mermaid") {
        html.push(`<div class="mermaid">${codeLines.join("\n")}</div>`);
      } else {
        html.push(`<pre class="md-code-block" data-lang="${escapeHtml(lang)}"><code>${codeLines.join("\n")}</code></pre>`);
      }
      continue;
    }

    if (/^(\*{3,}|-{3,}|_{3,})\s*$/.test(line.trim())) {
      html.push("<hr class=\"md-hr\">");
      i++;
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      html.push(`<h${level} class="md-h${level}">${parseInlineMarkdown(headingMatch[2].trim())}</h${level}>`);
      i++;
      continue;
    }

    if (/^\s*>\s?/.test(line)) {
      const quoteLines = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^\s*>\s?/, ""));
        i++;
      }
      html.push(`<blockquote class="md-blockquote"><p>${quoteLines.map(parseInlineMarkdown).join("<br>")}</p></blockquote>`);
      continue;
    }

    if (line.includes("|") && i + 1 < lines.length && /^\s*\|?[\s:-]+\|[\s|:-]*$/.test(lines[i + 1])) {
      const parseRow = (r) => r.trim().replace(/^\||\|$/g, "").split("|").map(c => c.trim());
      const headers = parseRow(line);
      const aligns = parseRow(lines[i + 1]).map(a => {
        if (a.startsWith(":") && a.endsWith(":")) return "center";
        if (a.endsWith(":")) return "right";
        return "left";
      });
      i += 2;
      const bodyRows = [];
      while (i < lines.length && lines[i].includes("|") && !/^\s*$/.test(lines[i])) {
        bodyRows.push(parseRow(lines[i]));
        i++;
      }
      const theadHtml = `<thead><tr>${headers.map((h, idx) => `<th style="text-align:${aligns[idx] || 'left'}">${parseInlineMarkdown(h)}</th>`).join("")}</tr></thead>`;
      const tbodyHtml = `<tbody>${bodyRows.map(r => `<tr>${r.map((c, idx) => `<td style="text-align:${aligns[idx] || 'left'}">${parseInlineMarkdown(c)}</td>`).join("")}</tr>`).join("")}</tbody>`;
      html.push(`<div class="table-wrapper md-table-wrapper" tabindex="0" role="region" aria-label="Explanation Table"><table class="md-table">${theadHtml}${tbodyHtml}</table></div>`);
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        const rawItem = lines[i].replace(/^\s*[-*]\s+/, "");
        const taskMatch = rawItem.match(/^\[([ xX])\]\s+(.*)$/);
        if (taskMatch) {
          const checked = taskMatch[1].toLowerCase() === "x";
          items.push(`<li class="md-task-item"><input type="checkbox" disabled ${checked ? "checked" : ""}> <span>${parseInlineMarkdown(taskMatch[2])}</span></li>`);
        } else {
          items.push(`<li>${parseInlineMarkdown(rawItem)}</li>`);
        }
        i++;
      }
      html.push(`<ul class="md-ul">${items.join("")}</ul>`);
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        const rawItem = lines[i].replace(/^\s*\d+\.\s+/, "");
        items.push(`<li>${parseInlineMarkdown(rawItem)}</li>`);
        i++;
      }
      html.push(`<ol class="md-ol">${items.join("")}</ol>`);
      continue;
    }

    const paraLines = [];
    while (
      i < lines.length &&
      !/^\s*$/.test(lines[i]) &&
      !/^```/.test(lines[i]) &&
      !/^(#{1,6})\s+/.test(lines[i]) &&
      !/^\s*>\s?/.test(lines[i]) &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !/^(\*{3,}|-{3,}|_{3,})\s*$/.test(lines[i].trim())
    ) {
      paraLines.push(parseInlineMarkdown(lines[i].trim()));
      i++;
    }
    if (paraLines.length > 0) {
      html.push(`<p class="md-p">${paraLines.join(" ")}</p>`);
    } else {
      i++;
    }
  }

  return html.join("\n");
};

const EXPLANATION_FILE_MAP = {
  monte_carlo:      { folder: "monte-carlo",      title: "Tab 1 • 10,000 What-If Futures (Monte Carlo)", path: "src/simulations/monte-carlo/explanations.md", webPath: "explanations/monte-carlo/explanations.md" },
  agent_based:      { folder: "agent-based",      title: "Tab 2 • Team Behavior (Agent-Based Modeling)", path: "src/simulations/agent-based/explanations.md", webPath: "explanations/agent-based/explanations.md" },
  system_dynamics:  { folder: "system-dynamics",  title: "Tab 3 • Long-Term Flywheels & Brakes (System Dynamics)", path: "src/simulations/system-dynamics/explanations.md", webPath: "explanations/system-dynamics/explanations.md" },
  discrete_event:   { folder: "discrete-event",   title: "Tab 4 • Workflow Waiting Lines (Discrete Event)", path: "src/simulations/discrete-event/explanations.md", webPath: "explanations/discrete-event/explanations.md" },
  bayesian_network: { folder: "bayesian-network", title: "Tab 5 • Pilot Scorecard Updater (Bayesian Network)", path: "src/simulations/bayesian-network/explanations.md", webPath: "explanations/bayesian-network/explanations.md" }
};

const mdCache = new Map();
let activeInWindowMode = "monte_carlo";

async function fetchExplanationMarkdown(paradigmId) {
  if (mdCache.has(paradigmId)) return mdCache.get(paradigmId);
  const metaList = window.state?.bundle?.paradigms_metadata || window.PRECOMPUTED_SCENARIOS_BUNDLE?.paradigms_metadata;
  if (metaList) {
    const found = metaList.find(m => m.id === paradigmId);
    if (found && found.explanation_markdown) {
      mdCache.set(paradigmId, found.explanation_markdown);
      return found.explanation_markdown;
    }
  }
  if (window.location.protocol !== "file:") {
    const info = EXPLANATION_FILE_MAP[paradigmId] || EXPLANATION_FILE_MAP.monte_carlo;
    try {
      const resp = await fetch(`${info.webPath}`);
      if (resp.ok) {
        const txt = await resp.text();
        mdCache.set(paradigmId, txt);
        return txt;
      }
    } catch (_) {}
    try {
      const resp = await fetch("data/scenarios.json");
      if (resp.ok) {
        const b = await resp.json();
        const found = (b.paradigms_metadata || []).find(m => m.id === paradigmId);
        if (found && found.explanation_markdown) {
          mdCache.set(paradigmId, found.explanation_markdown);
          return found.explanation_markdown;
        }
      }
    } catch (_) {}
  }
  return "# Guide Unavailable\nCould not load `explanations.md`.";
}

let mermaidInitialized = false;
function renderMermaidDiagrams(container) {
  if (!container || typeof window.mermaid === "undefined") return;
  const nodes = Array.from(container.querySelectorAll(".mermaid")).filter(n => !n.getAttribute("data-processed"));
  if (nodes.length === 0) return;
  try {
    if (!mermaidInitialized) {
      const isDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      window.mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        securityLevel: "loose",
        themeVariables: {
          primaryColor: "#2563eb",
          primaryTextColor: "#ffffff",
          primaryBorderColor: "#1d4ed8",
          secondaryColor: "#059669",
          secondaryTextColor: "#ffffff",
          tertiaryColor: "#d97706",
          lineColor: isDark ? "#93c5fd" : "#334155",
          fontFamily: "system-ui, -apple-system, sans-serif"
        }
      });
      mermaidInitialized = true;
    }
    window.mermaid.run({ nodes }).catch(() => {});
  } catch (_) {}
}

window.renderInlineTabGuides = async function renderInlineTabGuides() {
  const entries = Object.entries(EXPLANATION_FILE_MAP);
  await Promise.all(entries.map(async ([id, info]) => {
    const host = document.getElementById(`md-inline-${id}`);
    if (!host) return;
    const mdText = await fetchExplanationMarkdown(id);
    host.innerHTML = `
      <details open class="tab-inline-md-details">
        <summary class="in-window-md-header" style="cursor:pointer;">
          <div>
            <span class="memo-label">Plain-English Simulation Guide (Rendered Markdown)</span>
            <strong>${info.title}</strong>
          </div>
        </summary>
        <article class="md-rendered-body">${window.renderMarkdownToHtml(mdText)}</article>
      </details>
    `;
    window.hydrateGoldTerms(host);
    renderMermaidDiagrams(host);
  }));
};

window.renderInWindowMarkdownSection = async function renderInWindowMarkdownSection(mode = activeInWindowMode) {
  activeInWindowMode = mode;
  const bodyEl = document.getElementById("in-window-md-body");
  if (!bodyEl) return;

  const pathEl = document.getElementById("in-window-md-path");
  const titleEl = document.getElementById("in-window-md-title");
  const rawLinkEl = document.getElementById("in-window-md-raw-link");

  document.querySelectorAll("[data-inwindow-md]").forEach(el => {
    const val = el.getAttribute("data-inwindow-md");
    const isActive = val === mode;
    el.classList.toggle("active", isActive);
    el.classList.toggle("active-md-link", isActive);
    if (el.tagName === "BUTTON") {
      el.setAttribute("aria-pressed", isActive ? "true" : "false");
    }
  });

  let html = "";
  if (mode === "all") {
    if (pathEl) pathEl.textContent = "All 5 Plain-English Executive Guides";
    if (titleEl) titleEl.textContent = "All 5 Simulation Plain-English Guides (Rendered Markdown)";
    const parts = await Promise.all(
      Object.entries(EXPLANATION_FILE_MAP).map(async ([id, info]) => {
        const mdText = await fetchExplanationMarkdown(id);
        return `
          <div class="in-window-md-part">
            <div class="md-links-bar" style="margin-block-end:0.75rem;">
              <span class="badge-pill">${info.title}</span>
            </div>
            ${window.renderMarkdownToHtml(mdText)}
          </div>
        `;
      })
    );
    html = parts.join('<hr class="md-guide-divider">');
  } else {
    const info = EXPLANATION_FILE_MAP[mode] || EXPLANATION_FILE_MAP.monte_carlo;
    const mdText = await fetchExplanationMarkdown(mode);
    if (pathEl) pathEl.textContent = "Plain-English Executive Guide";
    if (titleEl) titleEl.textContent = info.title;
    html = window.renderMarkdownToHtml(mdText);
  }

  bodyEl.innerHTML = html;
  window.hydrateGoldTerms(bodyEl);
  renderMermaidDiagrams(bodyEl);
};

window.syncInWindowMarkdown = function syncInWindowMarkdown(paradigmId) {
  if (!paradigmId || activeInWindowMode === "all") return;
  if (EXPLANATION_FILE_MAP[paradigmId]) {
    window.renderInWindowMarkdownSection(paradigmId);
  }
};

function initMarkdownModalAndHeartbeat() {
  let dialog = document.getElementById("markdown-explanation-dialog");
  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.id = "markdown-explanation-dialog";
    dialog.setAttribute("closedby", "any");
    dialog.setAttribute("aria-labelledby", "md-dialog-title");
    dialog.className = "md-modal-dialog";
    dialog.innerHTML = `
      <div class="md-dialog-inner" id="md-dialog-inner">
        <header class="md-dialog-header">
          <div>
            <span class="memo-label" id="md-dialog-path">Plain-English Executive Guide</span>
            <h2 id="md-dialog-title">Plain-English Simulation Guide</h2>
          </div>
          <form method="dialog">
            <button type="submit" class="btn-secondary" autofocus>✕ Close Guide (Esc)</button>
          </form>
        </header>
        <div class="md-dialog-switcher" role="group" aria-label="Switch Simulation Guide">
          <button type="button" class="tab-btn" data-open-md="monte_carlo">1. 10,000 Futures</button>
          <button type="button" class="tab-btn" data-open-md="agent_based">2. Team Behavior</button>
          <button type="button" class="tab-btn" data-open-md="system_dynamics">3. Flywheels &amp; Brakes</button>
          <button type="button" class="tab-btn" data-open-md="discrete_event">4. Waiting Lines</button>
          <button type="button" class="tab-btn" data-open-md="bayesian_network">5. Pilot Scorecard</button>
        </div>
        <article class="md-rendered-body" id="md-rendered-body"></article>
      </div>
    `;
    document.body.appendChild(dialog);
  }

  if (!("closedBy" in HTMLDialogElement.prototype)) {
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isDialogContent = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isDialogContent) {
        closeMarkdownModal();
      }
    });
  }

  async function openMarkdownModal(paradigmId) {
    const info = EXPLANATION_FILE_MAP[paradigmId] || EXPLANATION_FILE_MAP.monte_carlo;
    const mdText = await fetchExplanationMarkdown(paradigmId);

    const pathEl = document.getElementById("md-dialog-path");
    const titleEl = document.getElementById("md-dialog-title");
    const rawLinkEl = document.getElementById("md-dialog-raw-link");
    const bodyEl = document.getElementById("md-rendered-body");

    dialog.querySelectorAll("[data-open-md]").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-open-md") === paradigmId);
    });

    const updateContent = () => {
      pathEl.textContent = info.path;
      titleEl.textContent = info.title;
      if (rawLinkEl) {
        rawLinkEl.href = info.webPath;
        rawLinkEl.textContent = `📄 Open ${info.path} ↗`;
      }
      bodyEl.innerHTML = window.renderMarkdownToHtml(mdText);
      window.hydrateGoldTerms(bodyEl);
      renderMermaidDiagrams(bodyEl);
    };

    if (!dialog.open) {
      updateContent();
      dialog.removeAttribute("data-closing");
      dialog.showModal();
    } else if (window.animateFadeSwap) {
      window.animateFadeSwap(bodyEl, updateContent, 2000);
    } else {
      updateContent();
    }
  }

  async function closeMarkdownModal() {
    if (!dialog.open) return;
    dialog.setAttribute("data-closing", "");
    const animations = dialog.getAnimations({ subtree: true });
    if (animations.length > 0) {
      await Promise.race([
        Promise.allSettled(animations.map(a => a.finished)),
        new Promise(r => setTimeout(r, 1000))
      ]);
    }
    dialog.removeAttribute("data-closing");
    dialog.close();
  }

  dialog.addEventListener("cancel", (e) => {
    e.preventDefault();
    closeMarkdownModal();
  });

  document.addEventListener("click", (e) => {
    const openBtn = e.target && e.target.closest ? e.target.closest("[data-open-md]") : null;
    if (openBtn) {
      e.preventDefault();
      openMarkdownModal(openBtn.getAttribute("data-open-md"));
      return;
    }

    const inWindowBtn = e.target && e.target.closest ? e.target.closest("[data-inwindow-md]") : null;
    if (inWindowBtn) {
      e.preventDefault();
      const mode = inWindowBtn.getAttribute("data-inwindow-md");
      window.renderInWindowMarkdownSection(mode);
      if (!inWindowBtn.closest("#explanations-section")) {
        const sec = document.getElementById("explanations-section");
        if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });

  // Render inline tab guides & Section 5 in-window Markdown automatically
  window.renderInlineTabGuides();
  window.renderInWindowMarkdownSection("monte_carlo");

  if (window.location.protocol !== "file:") {
    function sendHeartbeat() {
      fetch("/__heartbeat", { method: "POST", keepalive: true }).catch(() => {});
    }
    sendHeartbeat();
    setInterval(sendHeartbeat, 3000);

    window.addEventListener("pagehide", () => {
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/__tab_closed", "closed");
      } else {
        fetch("/__tab_closed", { method: "POST", keepalive: true }).catch(() => {});
      }
    });
  }
}

function initThemeToggle() {
  const applyTheme = (theme) => {
    const isDark = theme === "dark";
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
    const btn = document.getElementById("theme-toggle-btn");
    if (btn) {
      btn.setAttribute("aria-pressed", isDark ? "true" : "false");
      btn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
      btn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    }
  };

  let saved = "light";
  try {
    saved = localStorage.getItem("ai-roi-theme") || "light";
  } catch (_) {}
  applyTheme(saved === "dark" ? "dark" : "light");

  const btn = document.getElementById("theme-toggle-btn");
  if (btn) {
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem("ai-roi-theme", next);
      } catch (_) {}
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initExecutiveTooltips();
  initMarkdownModalAndHeartbeat();
});
