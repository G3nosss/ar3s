## 2025-02-19 - Legacy Event Handling Pattern
**Vulnerability:** The application heavily utilizes global function exposure (e.g., `window.handleVerify = handleVerify`) combined with inline HTML event handlers (`onclick="handleVerify()"`).
**Learning:** This pattern circumvents Content Security Policy (CSP) protections against XSS, as `unsafe-inline` would be required for these handlers to function. It also makes the data flow difficult to audit.
**Prevention:** Future refactoring should prioritize moving all event binding to `addEventListener` within the JavaScript modules and removing inline handlers from HTML, enabling strict CSP.
