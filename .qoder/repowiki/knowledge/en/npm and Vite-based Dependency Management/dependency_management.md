The IdeaOps Platform Frontend uses **npm** as its primary package manager, managed via `package.json` and locked with `package-lock.json` (lockfileVersion 3). The project is built using **Vite**, which handles module bundling and dependency resolution for the React application.

### Key Systems and Tools
- **Package Manager**: npm. Dependencies are declared in `package.json` under `dependencies` (runtime) and `devDependencies` (build-time/tooling).
- **Build Tool**: Vite (`vite.config.js`). It uses the `@vitejs/plugin-react` plugin to handle JSX/TSX transformation and HMR.
- **Styling Pipeline**: Tailwind CSS v4 is integrated via `@tailwindcss/postcss` in `postcss.config.mjs`, moving away from the traditional `tailwindcss` PostCSS plugin to the new dedicated PostCSS plugin for v4.
- **Registry**: All dependencies are resolved from the public npm registry (`https://registry.npmjs.org`), as seen in `package-lock.json`. There is no configuration for private registries or vendoring.

### Conventions and Rules
1. **Versioning Strategy**: The project uses caret (`^`) versioning for most dependencies (e.g., `"react": "^19.2.6"`), allowing minor and patch updates while preventing major version bumps during `npm install`.
2. **Dependency Separation**: 
   - **Runtime**: Core libraries like `react`, `react-dom`, `react-router-dom`, `@supabase/supabase-js`, and `framer-motion` are kept in `dependencies`.
   - **Dev**: Build tools (`vite`, `@vitejs/plugin-react`), linters (`eslint`, `@eslint/js`), and styling processors (`tailwindcss`, `postcss`, `autoprefixer`) are in `devDependencies`.
3. **Lockfile Integrity**: The presence of `package-lock.json` ensures deterministic builds. Developers should commit this file to maintain consistent dependency trees across environments.
4. **No Vendoring**: The project relies on `node_modules` for dependency resolution. There is no `vendor` directory or GOPRIVATE-style isolation, typical for standard Node.js/React workflows.