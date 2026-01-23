## 2025-02-18 - Inline Event Handlers Removal
**Vulnerability:** Inline event handlers (e.g., `onclick="..."`) prevent the implementation of a strict Content Security Policy (CSP), specifically the need for `unsafe-inline` in `script-src`.
**Learning:** Refactoring legacy inline handlers to `addEventListener` in a Vite project requires ensuring that the script attaching listeners runs *after* the DOM elements are created. Since `type="module"` scripts are deferred by default, they can safely query DOM elements.
**Prevention:** Avoid `onclick` in HTML. Use `id`s and attach listeners in the main module script.
