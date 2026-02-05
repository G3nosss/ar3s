## 2026-02-05 - Hardcoded External Service Endpoint
**Vulnerability:** A hardcoded API URL (`https://ar3s-compiler.duckdns.org`) was found in `src/main.js`.
**Learning:** Hardcoding URLs tightly couples the application to a specific environment and makes it difficult to change environments without code changes. It also risks exposing internal or staging endpoints in the wrong context.
**Prevention:** Always use environment variables (e.g., `import.meta.env.VITE_API_URL`) for external service endpoints. Implement runtime checks to ensure critical configuration is present.
