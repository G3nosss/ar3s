# Sentinel's Journal

## 2025-02-12 - Hardcoded Configuration & Environment Security
**Vulnerability:** Hardcoded backend API URL (`https://ar3s-compiler.duckdns.org`) found in `src/main.js`.
**Learning:** Hardcoding endpoints ties the build to a specific environment and risks exposing internal/staging endpoints if the code is open-sourced or shared. Additionally, `.env` files were not in `.gitignore`, posing a risk of secret leakage.
**Prevention:** Always use environment variables (e.g., `import.meta.env.VITE_API_URL`) for external service endpoints. Ensure `.env` is globally ignored in `.gitignore` before creating local config files.
