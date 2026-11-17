const STORAGE_KEY = 'dataguard_local_stats_v1';

export function loadStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore storage errors
  }
  return { scans: 0, secrets: 0, pii: 0 };
}

export function saveStats(stats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // ignore storage errors
  }
  document.getElementById('statScans').textContent = String(stats.scans);
  document.getElementById('statSecrets').textContent = String(stats.secrets);
  document.getElementById('statPii').textContent = String(stats.pii);
}

export function recordScanStats(stats, findings) {
  stats.scans += 1;
  for (const f of findings) {
    if (f.category === 'SECRET') stats.secrets += 1;
    else if (f.category === 'PII') stats.pii += 1;
  }
  saveStats(stats);
}

