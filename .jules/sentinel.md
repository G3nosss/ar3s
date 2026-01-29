## 2026-01-29 - Hardcoded API Configuration
**Vulnerability:** Hardcoded API URL found in `src/main.js`.
**Learning:** Configuration was embedded directly in source code, risking exposure and making environment changes difficult.
**Prevention:** Enforce use of `import.meta.env` for all external service URLs and configuration.
