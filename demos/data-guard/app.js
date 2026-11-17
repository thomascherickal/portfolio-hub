import { renderScanVerdict } from './js/findings-view.js';
import { loadInitialPolicy, readPolicyControls, syncPolicyControls } from './js/policy-ui.js';
import { loadStats, recordScanStats, saveStats } from './js/stats-store.js';
import { initWasmClient } from './js/wasm-client.js';

const SAMPLES = {
  safe: `Explain how WebAssembly linear memory works in C++ Emscripten builds.\nKeep the summary under 5 bullet points.`,
  secrets: `// Accidentally pasted production config!\nconst AWS_ACCESS_KEY_ID = "AKIA9876543210ZYXWVU";\nconst DATABASE_URL = "postgres://admin:SuperSecretPass99@db.prod.internal:5432/customers";\nconst OPENAI_KEY = "sk-proj-abcdefghijklmnopqrstuvwxyz123456";`,
  pii: `Please draft a polite follow-up email for this customer:\nName: Jordan Vance\nEmail: jordan.vance@acme-corp.com\nSSN: 123-45-6789\nCard: 4532-0151-1283-0366`
};

const state = {
  wasm: null,
  policy: null,
  stats: loadStats(),
  debounceTimer: null
};

function runScan(countInStats = true) {
  if (!state.wasm || !state.policy) return;
  const input = document.getElementById('promptInput').value;
  const result = state.wasm.scanText(input, state.policy);
  renderScanVerdict(input, result);
  if (countInStats && input.trim()) {
    recordScanStats(state.stats, result.findings);
  }
}

async function init() {
  saveStats(state.stats);
  const statusBadge = document.getElementById('wasmStatusBadge');

  try {
    state.wasm = await initWasmClient();
    state.policy = await loadInitialPolicy(state.wasm);
    syncPolicyControls(state.policy);
    statusBadge.textContent = `WASM v${state.wasm.getVersion()} Active`;
    statusBadge.className = 'badge badge-safe';
  } catch (err) {
    statusBadge.textContent = 'WASM Load Failed';
    statusBadge.className = 'badge badge-danger';
    console.error(err);
    return;
  }

  const promptEl = document.getElementById('promptInput');
  promptEl.addEventListener('input', () => {
    if (!document.getElementById('liveScanToggle').checked) return;
    clearTimeout(state.debounceTimer);
    state.debounceTimer = setTimeout(() => runScan(false), 120);
  });

  document.getElementById('scanNowBtn').addEventListener('click', () => runScan(true));

  document.getElementById('clearBtn').addEventListener('click', () => {
    promptEl.value = '';
    runScan(false);
  });

  document.querySelectorAll('[data-sample]').forEach((btn) => {
    btn.addEventListener('click', () => {
      promptEl.value = SAMPLES[btn.dataset.sample] || '';
      runScan(true);
    });
  });

  document.getElementById('copyRedactedBtn').addEventListener('click', async () => {
    const out = document.getElementById('redactedOutput').value;
    await navigator.clipboard.writeText(out);
    const btn = document.getElementById('copyRedactedBtn');
    const prev = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => {
      btn.textContent = prev;
    }, 1500);
  });

  for (const id of ['polSecrets', 'polPii', 'polEntropy', 'polIp', 'polRedactionMode']) {
    document.getElementById(id).addEventListener('change', () => {
      readPolicyControls(state.policy);
      runScan(false);
    });
  }

  document.getElementById('importPolicyInput').addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const validation = state.wasm.validatePolicy(text);
    if (!validation.valid) {
      alert(`Invalid policy.json:\n${validation.errors.join('\n')}`);
      return;
    }
    state.policy = JSON.parse(text);
    syncPolicyControls(state.policy);
    runScan(false);
  });

  document.getElementById('resetPolicyBtn').addEventListener('click', () => {
    state.policy = state.wasm.getDefaultPolicy();
    syncPolicyControls(state.policy);
    runScan(false);
  });

  const dialog = document.getElementById('interceptorDialog');
  document.getElementById('openInterceptorBtn').addEventListener('click', async () => {
    try {
      const resp = await fetch('./interceptor.js');
      document.getElementById('interceptorSnippet').textContent = await resp.text();
    } catch {
      document.getElementById('interceptorSnippet').textContent = '// See web/interceptor.js';
    }
    dialog.showModal();
  });
  document.getElementById('closeDialogBtn').addEventListener('click', () => dialog.close());
  document.getElementById('copyInterceptorBtn').addEventListener('click', async () => {
    const code = document.getElementById('interceptorSnippet').textContent;
    await navigator.clipboard.writeText(code);
  });
}

init();
