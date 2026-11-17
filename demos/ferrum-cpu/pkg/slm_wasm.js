export class Slm {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SlmFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_slm_free(ptr, 0);
    }
    /**
     * Abandon the generation in progress.
     */
    cancel() {
        wasm.slm_cancel(this.__wbg_ptr);
    }
    /**
     * Text for token ids.
     * @param {Uint32Array} ids
     * @returns {string}
     */
    decode(ids) {
        let deferred3_0;
        let deferred3_1;
        try {
            const ptr0 = passArray32ToWasm0(ids, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.slm_decode(this.__wbg_ptr, ptr0, len0);
            var ptr2 = ret[0];
            var len2 = ret[1];
            if (ret[3]) {
                ptr2 = 0; len2 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    }
    /**
     * Token ids for `text`.
     * @param {string} text
     * @returns {Uint32Array}
     */
    encode(text) {
        const ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.slm_encode(this.__wbg_ptr, ptr0, len0);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v2 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * Generate up to `max_tokens` tokens after `prompt`; stops early at any `stop` string (not
     * included) or the end-of-text token. `temperature` 0 is greedy, `top_k` 0 and `top_p` 1
     * disable those filters, `repetition_penalty` 1 disables the penalty. `seed` fixes the draw.
     * @param {string} prompt
     * @param {number} max_tokens
     * @param {number} temperature
     * @param {number} top_k
     * @param {number} top_p
     * @param {number} repetition_penalty
     * @param {number} seed
     * @param {string[]} stop
     * @returns {string}
     */
    generate(prompt, max_tokens, temperature, top_k, top_p, repetition_penalty, seed, stop) {
        let deferred4_0;
        let deferred4_1;
        try {
            const ptr0 = passStringToWasm0(prompt, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passArrayJsValueToWasm0(stop, wasm.__wbindgen_malloc);
            const len1 = WASM_VECTOR_LEN;
            const ret = wasm.slm_generate(this.__wbg_ptr, ptr0, len0, max_tokens, temperature, top_k, top_p, repetition_penalty, seed, ptr1, len1);
            var ptr3 = ret[0];
            var len3 = ret[1];
            if (ret[3]) {
                ptr3 = 0; len3 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred4_0 = ptr3;
            deferred4_1 = len3;
            return getStringFromWasm0(ptr3, len3);
        } finally {
            wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
        }
    }
    /**
     * Model facts as JSON: `{"params","vocab","context","quant","tokenizer"}`.
     * @returns {string}
     */
    info() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.slm_info(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Load a Ferrum GGUF text model from bytes.
     * @param {Uint8Array} bytes
     */
    constructor(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.slm_new(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        SlmFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The next piece of text, or `undefined` when the generation is over (or none was started).
     * Each call does one or a few tokens of work, so a page can stay responsive between calls.
     * @returns {string | undefined}
     */
    next_chunk() {
        const ret = wasm.slm_next_chunk(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * Rolling log-probability of `text` (higher is likelier; every token is scored).
     * @param {string} text
     * @returns {number}
     */
    score(text) {
        const ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.slm_score(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0];
    }
    /**
     * Begin a generation to pull with `next_chunk` (same arguments as `generate`). The chunks
     * add up to what `generate` returns. Starting again replaces a generation in progress.
     * @param {string} prompt
     * @param {number} max_tokens
     * @param {number} temperature
     * @param {number} top_k
     * @param {number} top_p
     * @param {number} repetition_penalty
     * @param {number} seed
     * @param {string[]} stop
     */
    start(prompt, max_tokens, temperature, top_k, top_p, repetition_penalty, seed, stop) {
        const ptr0 = passStringToWasm0(prompt, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayJsValueToWasm0(stop, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.slm_start(this.__wbg_ptr, ptr0, len0, max_tokens, temperature, top_k, top_p, repetition_penalty, seed, ptr1, len1);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Tokens generated so far by the latest `start` (still readable once it has ended).
     * @returns {number}
     */
    tokens_generated() {
        const ret = wasm.slm_tokens_generated(this.__wbg_ptr);
        return ret >>> 0;
    }
}
if (Symbol.dispose) Slm.prototype[Symbol.dispose] = Slm.prototype.free;

/**
 * Edge Small Language Model — causal Transformer running in WASM.
 *
 * JavaScript usage:
 * ```js
 * const resp = await fetch('model.gguf');
 * const bytes = new Uint8Array(await resp.arrayBuffer());
 * const slm = new TransformerSLMModel(bytes);
 *
 * const meta = JSON.parse(slm.metadata());
 * const vocab = meta.class_names;           // idx → char mapping
 * const contextLen = meta.input_dim;
 *
 * // Feed a context of integer token IDs
 * const context = new Float32Array([12, 5, 3, ...]);
 * const probs = slm.predict_next(context);  // Float32Array length vocab_size
 *
 * // After inference, read attention weights for visualization
 * const attn = slm.get_last_attention_weights(); // Float32Array [heads × T × T]
 * const numHeads = slm.num_heads();
 * const contextLength = slm.context_len();
 * ```
 */
export class TransformerSLMModel {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransformerSLMModelFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transformerslmmodel_free(ptr, 0);
    }
    /**
     * Number of positions currently held in the KV caches.
     * @returns {number}
     */
    cached_len() {
        const ret = wasm.transformerslmmodel_cached_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Context length (number of characters the model sees at once).
     * @returns {number}
     */
    context_len() {
        const ret = wasm.transformerslmmodel_context_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Compute Shannon entropy of a probability distribution (0 = certain, ln(V) = uniform).
     * @param {Float32Array} probs
     * @returns {number}
     */
    entropy(probs) {
        const ptr0 = passArrayF32ToWasm0(probs, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.transformerslmmodel_entropy(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * Return the self-attention weights from the LAST Transformer block's last forward pass.
     *
     * Returns a flat Float32Array of shape [num_heads × context_len × context_len].
     * For `num_heads=4` and `context_len=32`, this is 4096 floats.
     *
     * In JavaScript, index as: `attn[h * T * T + i * T + j]` where h=head, i=query pos, j=key pos.
     * @returns {Float32Array}
     */
    get_last_attention_weights() {
        const ret = wasm.transformerslmmodel_get_last_attention_weights(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Return model metadata JSON (vocab, context length, architecture details).
     * @returns {string}
     */
    metadata() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.transformerslmmodel_metadata(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Construct from GGUF bytes.
     * @param {Uint8Array} bytes
     */
    constructor(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.transformerslmmodel_new(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        TransformerSLMModelFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Number of attention heads.
     * @returns {number}
     */
    num_heads() {
        const ret = wasm.transformerslmmodel_num_heads(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Number of Transformer blocks.
     * @returns {number}
     */
    num_layers() {
        const ret = wasm.transformerslmmodel_num_layers(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Run inference on a context of token indices.
     *
     * `context` must have exactly `context_len` elements (Float32Array of usize-as-f32).
     * Returns a Float32Array of length `vocab_size` with next-token probabilities.
     * @param {Float32Array} context
     * @returns {Float32Array}
     */
    predict_next(context) {
        const ptr0 = passArrayF32ToWasm0(context, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.transformerslmmodel_predict_next(this.__wbg_ptr, ptr0, len0);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v2 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * Feed one token through the KV-cached path and return the next-token
     * probabilities. Requires a prior `prime()`. Errors when the cache is
     * full (`context_len` positions) — re-`prime` with a fresh window then.
     * @param {number} token_id
     * @returns {Float32Array}
     */
    predict_next_cached(token_id) {
        const ret = wasm.transformerslmmodel_predict_next_cached(this.__wbg_ptr, token_id);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Reset the KV caches and prime them with a context of token IDs.
     *
     * After priming, call `predict_next_cached` to extend the sequence one
     * token at a time at O(T) per token instead of re-running the full
     * O(T²) context. Returns the next-token probabilities after the last
     * context token (same as `predict_next` on the full context).
     * @param {Float32Array} context
     * @returns {Float32Array}
     */
    prime(context) {
        const ptr0 = passArrayF32ToWasm0(context, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.transformerslmmodel_prime(this.__wbg_ptr, ptr0, len0);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v2 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * Sample a next token index from probabilities using temperature scaling.
     * `probs` = output of `predict_next`. `temperature` = 1.0 is neutral.
     * Lower temperature → more deterministic. Higher → more random.
     * @param {Float32Array} probs
     * @param {number} temperature
     * @param {number} random_value
     * @returns {number}
     */
    sample_from_probs(probs, temperature, random_value) {
        const ptr0 = passArrayF32ToWasm0(probs, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.transformerslmmodel_sample_from_probs(this.__wbg_ptr, ptr0, len0, temperature, random_value);
        return ret >>> 0;
    }
    /**
     * Return the top-k token indices sorted by probability (descending).
     * @param {Float32Array} probs
     * @param {number} k
     * @returns {Uint32Array}
     */
    top_k_indices(probs, k) {
        const ptr0 = passArrayF32ToWasm0(probs, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.transformerslmmodel_top_k_indices(this.__wbg_ptr, ptr0, len0, k);
        var v2 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * Vocabulary size (number of distinct tokens).
     * @returns {number}
     */
    vocab_size() {
        const ret = wasm.transformerslmmodel_vocab_size(this.__wbg_ptr);
        return ret >>> 0;
    }
}
if (Symbol.dispose) TransformerSLMModel.prototype[Symbol.dispose] = TransformerSLMModel.prototype.free;
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg_Error_ef53bc310eb298a0: function(arg0, arg1) {
            const ret = Error(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg___wbindgen_string_get_72bdf95d3ae505b1: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_throw_1506f2235d1bdba0: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbindgen_cast_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./slm_wasm_bg.js": import0,
    };
}

const SlmFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_slm_free(ptr, 1));
const TransformerSLMModelFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transformerslmmodel_free(ptr, 1));

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let cachedFloat32ArrayMemory0 = null;
function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    return decodeText(ptr >>> 0, len);
}

let cachedUint32ArrayMemory0 = null;
function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getUint32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayF32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getFloat32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    for (let i = 0; i < array.length; i++) {
        const add = addToExternrefTable0(array[i]);
        getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasmInstance, wasm;
function __wbg_finalize_init(instance, module) {
    wasmInstance = instance;
    wasm = instance.exports;
    wasmModule = module;
    cachedDataViewMemory0 = null;
    cachedFloat32ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('slm_wasm_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
