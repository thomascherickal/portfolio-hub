// GTK-lookalike front end. Each handler below is a port of the matching callback in
// src/admin_gui/*.cpp; the logic (validation, scanning, JSON) is the C++ AdminController in wasm.
const $ = (id) => document.getElementById(id);
const SEV = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], RED = ['PLACEHOLDER', 'MASK', 'REMOVE'];
var M; let status = (t) => { $('status').textContent = t; };

function syncUiFromController() {            // ui_helpers.cpp: syncUiFromController
  const p = JSON.parse(M.policyJson());
  $('org').value = p.organization ?? '';
  $('secrets').checked = !!p.enableSecrets; $('pii').checked = !!p.enablePii; $('entropy').checked = !!p.enableEntropy;
  $('ip').checked = !!p.enableIpAddresses; $('block').checked = !!p.blockOnCritical;
  $('minsev').selectedIndex = Math.max(0, SEV.indexOf(p.minSeverity)); $('redact').selectedIndex = Math.max(0, RED.indexOf(p.redactionMode));
  $('ethr').value = p.entropyThreshold; $('maxf').value = p.maxFindingsBeforeBlock;
  $('allowView').value = (p.allowlist || []).map((a) => a + '\n').join('');
  $('ruleView').value = (p.customRules || []).map((r) => `${r.id} [${r.severity}] => ${r.pattern}\n`).join('');
  policyShape = p;
}
let policyShape = null;
function syncControllerFromUi() {            // ui_helpers.cpp: syncControllerFromUi
  const p = JSON.parse(M.policyJson());
  p.organization = $('org').value;
  p.enableSecrets = $('secrets').checked; p.enablePii = $('pii').checked; p.enableEntropy = $('entropy').checked;
  p.enableIpAddresses = $('ip').checked; p.blockOnCritical = $('block').checked;
  p.minSeverity = $('minsev').value; p.redactionMode = $('redact').value;
  p.entropyThreshold = Number($('ethr').value); p.maxFindingsBeforeBlock = Math.trunc(Number($('maxf').value));
  const err = M.setPolicyJson(JSON.stringify(p));
  if (err) status(err);
}

function pick(page) {
  document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('checked', t.dataset.page === page));
  document.querySelectorAll('.page').forEach((s) => { s.hidden = s.id !== page; });
}
document.querySelectorAll('.tab').forEach((t) => t.addEventListener('click', () => pick(t.dataset.page)));

$('addAllow').addEventListener('click', () => {
  syncControllerFromUi(); // keeps unsaved Policy-tab edits (the GTK build re-reads the model and drops them)
  if (M.addAllowlistEntry($('allowEntry').value)) { $('allowEntry').value = ''; syncUiFromController(); status('Added allowlist entry.'); }
  else status('Allowlist entry empty or already exists.');
});
$('addRule').addEventListener('click', () => {
  syncControllerFromUi();
  const err = M.addCustomRule($('ruleId').value, $('rulePat').value, $('ruleSev').value);
  if (!err) { $('ruleId').value = ''; $('rulePat').value = ''; syncUiFromController(); status('Added custom rule.'); } else status(err);
});
$('runScan').addEventListener('click', () => {
  syncControllerFromUi();
  const out = M.runTestScan($('testIn').value); $('testOut').value = out;
  const r = JSON.parse(out);
  status(`Scan complete: ${r.findings.length} finding(s), riskScore=${r.riskScore}${r.blocked ? ' [BLOCKED]' : ' [ALLOWED]'}`);
});
$('reset').addEventListener('click', () => { M.resetToDefaults(); syncUiFromController(); status('Policy reset to Enterprise defaults.'); });

// File chooser stand-ins: the C++ code still reads/writes a path, on the in-memory file system.
$('load').addEventListener('click', () => $('fileIn').click());
$('fileIn').addEventListener('change', async (e) => {
  const f = e.target.files[0]; if (!f) return;
  const path = '/' + f.name.replace(/[^\w.\-]/g, '_');
  M.FS.writeFile(path, new Uint8Array(await f.arrayBuffer()));
  const err = M.loadPolicyFromFile(path);
  if (err) status(err); else { syncUiFromController(); status('Loaded policy from ' + f.name); }
  e.target.value = '';
});
function dialog(title, hint, name, okLabel) {
  return new Promise((res) => {
    $('dlgTitle').textContent = title; $('dlgHint').textContent = hint; $('dlgName').value = name; $('dlgOk').textContent = okLabel;
    $('dialogWrap').hidden = false; $('dlgName').focus();
    const done = (v) => { $('dialogWrap').hidden = true; $('dlgOk').onclick = $('dlgCancel').onclick = null; res(v); };
    $('dlgOk').onclick = () => done($('dlgName').value || null); $('dlgCancel').onclick = () => done(null);
  });
}
$('save').addEventListener('click', async () => {
  syncControllerFromUi();
  const name = await dialog('Export Enterprise Policy JSON', 'The file is written by the C++ engine and downloaded by your browser.', 'policy.json', 'Save');
  if (!name) return;
  const path = '/' + name.replace(/[^\w.\-]/g, '_');
  const err = M.savePolicyToFile(path);
  if (err) { status(err); return; }
  const blob = new Blob([M.FS.readFile(path)], { type: 'application/json' });
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: name }); a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  status('Saved policy to ' + name);
});

createAdminModule().then((mod) => {
  M = mod;
  $('testIn').value = 'const awsKey = "AKIA1234567890ABCDEF";\nCustomer: alice@company.com, SSN: 123-45-6789\n';
  syncUiFromController(); window.__ready = true;
});
