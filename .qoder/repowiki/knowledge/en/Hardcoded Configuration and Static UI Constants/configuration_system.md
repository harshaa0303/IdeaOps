The repository does not employ a formal configuration management system (such as `.env` files, `config/` directories, or environment variable injection via Vite). Instead, configuration is handled through two primary informal mechanisms:

1. **Hardcoded Service Credentials**: The Supabase client (`src/supabaseClient.js`) contains hardcoded URL and API Key values. This bypasses standard security practices for secret management and prevents environment-specific configuration (e.g., staging vs. production) without code changes.
2. **Static UI Constants**: Application-level domain data (categories, statuses, difficulty levels, and skills) is defined as exported constants in `src/lib/supabase.js`. These serve as the "source of truth" for UI filters and displays, centralized within the data-access layer rather than a dedicated configuration module.
3. **Build Tooling**: Standard Vite (`vite.config.js`) and Tailwind CSS (`tailwind.config.js`) configurations are present but remain at their defaults, with no custom environment-based logic or aliasing configured.

**Developer Rules:**
- **Avoid Hardcoding Secrets**: Refactor `src/supabaseClient.js` to use `import.meta.env.VITE_SUPABASE_URL` and `import.meta.env.VITE_SUPABASE_ANON_KEY` to support secure, environment-driven deployment.
- **Centralize Domain Data**: Continue using `src/lib/supabase.js` for static UI enums/constants to maintain a single source of truth, but consider moving non-data-layer constants to a dedicated `src/config/constants.js` if the list grows significantly.