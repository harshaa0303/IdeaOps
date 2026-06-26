## Build System Overview

This repository uses **Vite** as its build tool and development server for a React single-page application. The build system is minimal and follows standard Vite conventions with no additional CI/CD pipelines, containerization, or custom build scripts.

## Tools and Frameworks

- **Build Tool**: Vite v8.0.12 with `@vitejs/plugin-react` for React support
- **Package Manager**: npm (evidenced by `package-lock.json`)
- **CSS Processing**: PostCSS with Tailwind CSS v4.3.1 via `@tailwindcss/postcss`
- **Linting**: ESLint v10.3.0 with React-specific plugins (`eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`)

## Key Configuration Files

### `package.json`
Defines four npm scripts:
- `npm run dev` — Starts the Vite development server
- `npm run build` — Produces a production build via `vite build`, outputting to the `dist/` directory
- `npm run lint` — Runs ESLint across the project
- `npm run preview` — Serves the production build locally via `vite preview`

Version is set to `0.0.0` with no semantic versioning strategy in place.

### `vite.config.js`
Minimal configuration using only the React plugin. No custom aliasing, environment variable handling, or build optimizations are configured beyond Vite defaults.

### `postcss.config.mjs`
Configures PostCSS to use `@tailwindcss/postcss` for Tailwind CSS processing.

### `tailwind.config.js`
Defines content paths (`./index.html`, `./src/**/*.{js,ts,jsx,tsx}`), enables class-based dark mode, and extends the theme with custom color palettes (primary, accent, success), font families (Inter), and animation keyframes (fade-in, slide-up, slide-down, scale-in).

## Architecture and Conventions

- **No CI/CD**: No GitHub Actions, GitLab CI, or other pipeline configurations exist in the repository.
- **No Containerization**: No `Dockerfile` or `docker-compose.yml` present.
- **No Makefiles or shell scripts**: Build orchestration relies entirely on npm scripts.
- **Output directory**: Production builds are written to `dist/` (Vite default).
- **Module type**: ESM (`"type": "module"` in package.json).

## Developer Rules

1. Use `npm run dev` for local development; do not manually invoke `vite`.
2. Run `npm run build` before deployment; serve the resulting `dist/` directory.
3. Run `npm run lint` before committing to catch code quality issues.
4. Do not modify `node_modules/` or `dist/` directly.
5. Tailwind utility classes must be referenced in files matching the content glob patterns in `tailwind.config.js` to be included in the final CSS bundle.