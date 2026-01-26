## 2025-02-12 - Hardcoded API Configuration
**Vulnerability:** The application used a hardcoded API URL (`https://ar3s-compiler.duckdns.org`) in the frontend source code, making it difficult to change environments and potentially exposing internal endpoints.
**Learning:** Hardcoded configurations limit deployment flexibility and should be externalized.
**Prevention:** Use environment variables (e.g., `import.meta.env.VITE_API_URL`) and provide a fallback or validation mechanism, documented in `.env.example`.
