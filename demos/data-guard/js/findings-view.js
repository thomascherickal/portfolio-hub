export function renderFindingsTable(findings) {
  const tbody = document.getElementById('findingsBody');
  tbody.replaceChildren();

  if (!findings || findings.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 6;
    td.className = 'empty-cell';
    td.textContent = 'No secrets or personal data detected.';
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  for (const f of findings) {
    const tr = document.createElement('tr');

    const sevTd = document.createElement('td');
    const badge = document.createElement('span');
    badge.className =
      f.severity === 'CRITICAL' || f.severity === 'HIGH'
        ? 'badge badge-danger'
        : f.severity === 'MEDIUM'
          ? 'badge badge-warn'
          : 'badge badge-neutral';
    badge.textContent = f.severity;
    sevTd.appendChild(badge);

    const ruleTd = document.createElement('td');
    const code = document.createElement('code');
    code.textContent = f.ruleId;
    ruleTd.appendChild(code);

    const catTd = document.createElement('td');
    catTd.textContent = f.category;

    const locTd = document.createElement('td');
    locTd.textContent = `L${f.line}:C${f.column}`;

    const maskTd = document.createElement('td');
    const maskCode = document.createElement('code');
    maskCode.textContent = f.maskedMatch;
    maskTd.appendChild(maskCode);

    const descTd = document.createElement('td');
    descTd.textContent = f.description;

    tr.append(sevTd, ruleTd, catTd, locTd, maskTd, descTd);
    tbody.appendChild(tr);
  }
}

export function renderScanVerdict(input, result) {
  document.getElementById('riskScoreText').textContent = `${result.riskScore} / 100`;
  document.getElementById('riskProgress').value = result.riskScore;
  document.getElementById('redactedOutput').value = result.redactedText || '';
  document.getElementById('copyRedactedBtn').disabled = !input.length;

  const verdict = document.getElementById('verdictBadge');
  const summary = document.getElementById('findingSummary');

  if (!input.trim()) {
    verdict.textContent = 'READY';
    verdict.className = 'badge badge-safe';
    summary.textContent = 'No findings yet.';
  } else if (result.blocked) {
    verdict.textContent = 'BLOCKED BY POLICY';
    verdict.className = 'badge badge-danger';
    summary.textContent = `${result.findingCount} sensitive item(s) detected. Use redacted output before sending.`;
  } else if (result.findingCount > 0) {
    verdict.textContent = 'WARNING';
    verdict.className = 'badge badge-warn';
    summary.textContent = `${result.findingCount} low-severity item(s) detected.`;
  } else {
    verdict.textContent = 'SAFE TO SEND';
    verdict.className = 'badge badge-safe';
    summary.textContent = 'Zero secrets or personal data detected.';
  }

  renderFindingsTable(result.findings);
}

