/**
 * Enterprise Data Guard — Browser AI Tool Prompt Interceptor
 * Runs 100% client-side using the C++ WebAssembly scanner (data_guard.wasm).
 * Attach to any web AI tool page to scan prompts before they leave the browser.
 */
(function () {
  if (window.__dataGuardInterceptorActive) return;
  window.__dataGuardInterceptorActive = true;

  async function initInterceptor() {
    if (typeof createDataGuardModule !== 'function') {
      console.warn('[DataGuard] WASM module loader not found on page.');
      return;
    }
    const wasm = await createDataGuardModule();
    const policyJson = wasm.getDefaultPolicy();

    document.addEventListener(
      'keydown',
      (event) => {
        if (event.key !== 'Enter' || event.shiftKey) return;
        const target = event.target;
        if (!target) return;
        const isInput =
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable ||
          (target.tagName === 'INPUT' && target.type === 'text');
        if (!isInput) return;

        const text = target.value !== undefined ? target.value : target.innerText || '';
        if (!text.trim()) return;

        const result = JSON.parse(wasm.scanText(text, policyJson));
        if (result.blocked) {
          event.preventDefault();
          event.stopPropagation();
          const summary = result.findings
            .map((f) => `- [${f.severity}] ${f.ruleId}: ${f.maskedMatch}`)
            .join('\n');
          const useRedacted = window.confirm(
            `Enterprise Data Guard blocked this prompt (${result.findingCount} finding(s), risk ${result.riskScore}/100):\n\n${summary}\n\nClick OK to replace your prompt with the safe redacted version.`
          );
          if (useRedacted) {
            if (target.value !== undefined) {
              target.value = result.redactedText;
            } else {
              target.innerText = result.redactedText;
            }
          }
        }
      },
      true
    );
  }

  initInterceptor();
})();

