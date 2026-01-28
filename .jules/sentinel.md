## 2025-02-23 - Inline Handlers and Global Bridges
**Vulnerability:** Inline `onclick` handlers coupled with global window assignments.
**Learning:** The codebase explicitly relied on `window.handleVerify = handleVerify` (marked "DO NOT DELETE") solely to bridge to inline HTML handlers.
**Prevention:** Remove both the inline handler and the global assignment when refactoring to `addEventListener` to avoid dead code and global pollution.
