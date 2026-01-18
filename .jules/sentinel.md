## 2024-01-18 - Hardcoded API Configuration in Frontend
**Vulnerability:** Hardcoded API URL ("https://ar3s-compiler.duckdns.org") was found in `src/main.js`.
**Learning:** Developers likely hardcoded the URL for convenience during local testing and committed it, bypassing the intended `.env` configuration flow. This exposes internal infrastructure details and makes environment switching error-prone.
**Prevention:** Enforce environment variable usage via `import.meta.env` (Vite) or `process.env`. Add `.env.example` to the repository to guide developers on required configuration and ensure `.env` is git-ignored.
