export async function loadInitialPolicy(wasmClient) {
  for (const url of ['./policy.json', './policy.default.json']) {
    try {
      const resp = await fetch(url);
      if (resp.ok) return await resp.json();
    } catch {
      // try next fallback
    }
  }
  return wasmClient.getDefaultPolicy();
}

export function syncPolicyControls(policy) {
  if (!policy) return;
  document.getElementById('policyOrgValue').textContent =
    policy.organization || 'Enterprise Default';
  document.getElementById('polSecrets').checked = Boolean(policy.enableSecrets);
  document.getElementById('polPii').checked = Boolean(policy.enablePii);
  document.getElementById('polEntropy').checked = Boolean(policy.enableEntropy);
  document.getElementById('polIp').checked = Boolean(policy.enableIpAddresses);
  document.getElementById('polRedactionMode').value = policy.redactionMode || 'REMOVE';
}

export function readPolicyControls(policy) {
  policy.enableSecrets = document.getElementById('polSecrets').checked;
  policy.enablePii = document.getElementById('polPii').checked;
  policy.enableEntropy = document.getElementById('polEntropy').checked;
  policy.enableIpAddresses = document.getElementById('polIp').checked;
  policy.redactionMode = document.getElementById('polRedactionMode').value;
}

