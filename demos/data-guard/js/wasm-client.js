export async function initWasmClient() {
  const wasm = await createDataGuardModule();
  return {
    getVersion: () => wasm.getVersion(),
    getDefaultPolicy: () => JSON.parse(wasm.getDefaultPolicy()),
    validatePolicy: (jsonText) => JSON.parse(wasm.validatePolicy(jsonText)),
    scanText: (text, policy) => JSON.parse(wasm.scanText(text, JSON.stringify(policy)))
  };
}

