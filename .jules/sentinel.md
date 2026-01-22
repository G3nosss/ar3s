## 2024-05-23 - Hardcoded Configuration vs Environment Variables
**Vulnerability:** Hardcoded API URL (`https://ar3s-compiler.duckdns.org`) found in source code.
**Learning:** Hardcoding configuration makes it difficult to change environments (dev/prod) and can accidentally expose internal URLs or secrets if the codebase is public. It also violates the separation of config from code.
**Prevention:** Always use environment variables (e.g., `import.meta.env.VITE_API_URL`) for configuration that might change between environments or contains sensitive locations. Ensure `.env` files are added to `.gitignore` to prevent accidental commits.

## 2024-05-23 - Defense in Depth: Security Headers
**Improvement:** Added basic security headers (`X-Frame-Options`, `X-Content-Type-Options`) to `netlify.toml`.
**Learning:** Default deployments often lack basic security headers. Explicitly configuring them reduces the attack surface (e.g., clickjacking, MIME sniffing) with minimal effort.
