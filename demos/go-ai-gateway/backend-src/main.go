//go:build js && wasm && browserdemo

// Command demowasm runs the real gateway (routing, budgets, PII redaction, audit log) inside a
// browser tab. It exposes one JS function, gatewayFetch(method, path, headersJSON, body), that
// feeds the request to the gateway's own http.Handler. Providers are the built-in mock, and the
// store is the in-memory store pre-seeded with the demo teams, so no network or API key is used.
package main

import (
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"syscall/js"

	"github.com/thomas/go-ai-gateway/internal/gateway"
	"github.com/thomas/go-ai-gateway/internal/provider"
	"github.com/thomas/go-ai-gateway/internal/router"
	"github.com/thomas/go-ai-gateway/internal/store"
)

func main() {
	mock := &provider.MockProvider{}
	providers := map[string]provider.Provider{}
	for _, name := range provider.AllVendors {
		if name != router.ProviderOpenAICompat && name != router.ProviderOllama {
			providers[name] = mock
		}
	}
	prov := &provider.MultiProvider{Providers: providers}
	gw := gateway.New(gateway.Config{
		Store:          store.NewMemoryStore(true),
		Router:         router.New(router.Options{IsProviderAvailable: prov.HasProvider}),
		Provider:       prov,
		AdminTokenFunc: func() string { return "gw_admin_dev" },
	})

	js.Global().Set("gatewayFetch", js.FuncOf(func(_ js.Value, a []js.Value) any {
		method, path, hdrs, body := a[0].String(), a[1].String(), a[2], a[3].String()
		handler := js.FuncOf(func(_ js.Value, p []js.Value) any {
			resolve := p[0]
			go func() { // the handler may block on I/O, so never run it on the JS event loop
				req := httptest.NewRequest(method, path, strings.NewReader(body))
				keys := js.Global().Get("Object").Call("keys", hdrs)
				for i := 0; i < keys.Length(); i++ {
					k := keys.Index(i).String()
					req.Header.Set(k, hdrs.Get(k).String())
				}
				rec := httptest.NewRecorder()
				gw.ServeHTTP(rec, req)
				res := rec.Result()
				out, _ := io.ReadAll(res.Body)
				h := map[string]any{}
				for k := range res.Header {
					h[k] = res.Header.Get(k)
				}
				resolve.Invoke(map[string]any{"status": res.StatusCode, "headers": h, "body": string(out)})
			}()
			return nil
		})
		return js.Global().Get("Promise").New(handler)
	}))
	var _ http.Handler = gw
	js.Global().Set("gatewayReady", true)
	select {}
}
