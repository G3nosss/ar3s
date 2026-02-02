# SENTINEL'S JOURNAL - CRITICAL LEARNINGS ONLY

## 2025-10-26 - Hardcoded API Configuration
**Vulnerability:** Hardcoded API URL in `src/main.js`.
**Learning:** Hardcoding configuration values (even non-secrets) in source code makes environment separation impossible and risks exposing internal endpoints if the code is forked.
**Prevention:** Always use environment variables (e.g., `import.meta.env`) for configuration, with validation to ensure they exist.
