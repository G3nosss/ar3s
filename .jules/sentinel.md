## 2024-05-22 - Hardcoded Configuration in Client-Side Code
**Vulnerability:** Found a hardcoded API URL directly in `src/main.js` with a comment inviting users to edit the source code ("PASTE YOUR NEW LINK BELOW!").
**Learning:** This pattern encourages modifying source code for configuration, which leads to accidental commits of secrets/config and makes updates harder. It blurs the line between code and configuration.
**Prevention:** Enforce the use of environment variables (e.g., `.env`) for all configuration, even if not strictly secret, to establish a secure development lifecycle and separate concerns.
