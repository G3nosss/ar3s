## 2024-05-22 - Refactoring Inline Scripts
**Vulnerability:** Inline event handlers (`onclick`) and inline scripts in `index.html` preventing strict Content Security Policy (CSP).
**Learning:** Legacy frontend patterns often scatter logic between HTML and JS, making it hard to audit and secure. Moving to `addEventListener` centralizes logic and enables security headers.
**Prevention:** Enforce a "no inline script" policy in linting or code reviews. Use frameworks or patterns that naturally separate concerns.
