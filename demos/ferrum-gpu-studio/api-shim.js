// Browser stand-in for the Ferrum GPU server. The real GUI (index.html, app.js, style.css) is
// unmodified apart from relative URLs; every request to api/* is answered here, in the page.
// Model storage, loading, GGUF download/upload and generation (on this tab's WebGPU) work.
// Training and new random models need the native server's threads and are reported as desktop-only.
import { Gguf } from './web/gguf.js';
import { readConfig } from './web/llama.js';

const BUNDLED = 'ferrum-gpu-demo.gguf';
const PRESET = 'pretrained';
let bytes = null, version = 0, cfg = null;

const json = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json' } });
const err = (status, msg) => json({ error: msg }, status);

function paramsOf(c) {
  const hd = c.headDim, per = 2 * c.dim + c.dim * c.heads * hd + 2 * c.dim * c.kvHeads * hd + c.heads * hd * c.dim + 3 * c.dim * c.hidden;
  return c.vocab * c.dim * 2 + c.layers * per + c.dim;
}
function setModel(buf) {
  const c = readConfig(new Gguf(buf));
  bytes = buf; cfg = c; version += 1;
}
function modelJson() {
  if (!cfg) return null;
  return { preset: version === 1 ? PRESET : null, params: paramsOf(cfg), vocab: cfg.vocab, ctx: cfg.ctx, dim: cfg.dim, layers: cfg.layers,
    heads: cfg.heads, kv_heads: cfg.kvHeads, hidden: cfg.hidden, rope: cfg.neox ? 'neox' : 'norm', tied: false, byte_tokens: cfg.vocab === 256, version };
}
async function loadBundled() { const r = await realFetch(BUNDLED); setModel(await r.arrayBuffer()); }

async function adapters() {
  try {
    const a = navigator.gpu && await navigator.gpu.requestAdapter();
    if (!a) return [];
    const i = a.info || {};
    return [{ name: [i.vendor, i.architecture, i.description].filter(Boolean).join(' ') || 'WebGPU adapter', backend: 'WebGPU', kind: a.isFallbackAdapter ? 'Cpu' : 'DiscreteOrIntegrated',
      max_binding_mib: Math.floor(a.limits.maxStorageBufferBindingSize / 1048576) }];
  } catch { return []; }
}

const realFetch = window.fetch.bind(window);
const DESKTOP = 'Training and creating new random models need the desktop app (native threads); this browser demo runs inference on the bundled pretrained model.';

async function route(method, path, init) {
  if (path === 'api/info') {
    const ads = await adapters();
    return json({ version: 'browser-demo', device: { requested: 'gpu', active: ads.length ? 'gpu' : 'cpu', name: ads.length ? ads[0].name : 'no WebGPU adapter',
      note: ads.length ? 'This tab\'s WebGPU adapter runs every generation (both runners).' : 'No WebGPU adapter: generation is unavailable in this browser.' },
      adapters: ads, presets: [{ name: PRESET, params: paramsOf(cfg), ctx: cfg.ctx }], model: modelJson() });
  }
  if (path === 'api/model' && method === 'POST') { await loadBundled(); version = 1; return json(modelJson()); }
  if (path === 'api/model.gguf' && method === 'GET') return new Response(bytes.slice(0), { headers: { 'content-type': 'application/octet-stream' } });
  if (path === 'api/model.gguf' && method === 'PUT') {
    try { setModel(await new Response(init.body).arrayBuffer()); return json(modelJson()); } catch (e) { return err(400, String(e.message || e)); }
  }
  if (path === 'api/train' && method === 'POST') return err(501, DESKTOP);
  if (path === 'api/train/status') return json({ state: 'idle', step: 0, total: 0, losses: [], error: null, val_before: null, val_after: null });
  if (path === 'api/train/stop') return json({ state: 'idle' });
  if (path === 'api/generate' && method === 'POST') {
    const req = JSON.parse(init.body);
    const { generate } = await import('./web/browser.js');
    const { cutAtStop } = await import('./web/stop.js');
    return json({ text: cutAtStop(await generate(req), req.stop), device: 'gpu' });
  }
  return err(404, 'not available in the browser demo');
}

window.fetch = async (input, init = {}) => {
  const url = typeof input === 'string' ? input : input.url;
  const path = new URL(url, location.href).pathname.replace(/^.*?(api\/.*)$/, '$1');
  if (!/^api\//.test(path)) return realFetch(input, init);
  try { return await route((init.method || 'GET').toUpperCase(), path, init); } catch (e) { return err(500, String(e.message || e)); }
};

await loadBundled(); version = 1;

// The "Download GGUF" link is a plain navigation, so serve it from the in-memory model.
document.addEventListener('click', (e) => {
  const a = e.target.closest && e.target.closest('#download');
  if (!a) return;
  a.href = URL.createObjectURL(new Blob([bytes], { type: 'application/octet-stream' }));
}, true);
