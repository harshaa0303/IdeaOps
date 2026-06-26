## Styling System Overview

The IdeaOps Platform Frontend uses **Tailwind CSS v4** as its primary styling framework, configured with a comprehensive custom design token system. The project leverages the new `@tailwindcss/postcss` plugin (v4.3.1) alongside PostCSS for processing.

### Core Technology Stack

- **CSS Framework**: Tailwind CSS v4 (`tailwindcss@^4.3.1`, `@tailwindcss/postcss@^4.3.1`)
- **Build Tool**: Vite with PostCSS pipeline
- **Animation Library**: Framer Motion (`framer-motion@^12.40.0`) for complex transitions
- **Icon Set**: Lucide React (`lucide-react@^1.21.0`)
- **Font**: Inter (loaded via Google Fonts CDN)

### Design Token System

The design tokens are defined in two places for compatibility:

1. **`tailwind.config.js`** — Traditional Tailwind configuration extending the theme with:
   - **Color palettes**: Three semantic color families with full shade ranges:
     - `primary`: Indigo-based (#6366f1 at 500), used for primary actions and branding
     - `accent`: Purple-based (#a855f7 at 500), used for secondary highlights
     - `success`: Green-based (#22c55e at 500), used for positive states
   - **Typography**: Single font family (`Inter`) applied to both `sans` and `display`
   - **Custom animations**: `fade-in`, `slide-up`, `slide-down`, `scale-in`, `pulse-slow` with corresponding keyframes
   - **Backdrop blur**: Extended with `xs` breakpoint (2px)

2. **`src/index.css`** — Uses Tailwind v4's `@theme` directive to mirror the same color and font tokens as CSS custom properties, enabling direct CSS variable usage alongside utility classes.

### Dark Mode Strategy

Dark mode is implemented using Tailwind's `class` strategy (`darkMode: 'class'`):

- **Toggle mechanism**: `ThemeContext.jsx` manages dark mode state with localStorage persistence and respects `prefers-color-scheme` system preference on first load
- **Activation**: Toggles the `.dark` class on `<html>` element via `document.documentElement.classList`
- **Base styles**: `index.css` sets `color-scheme: dark` when `.dark` is active, ensuring native browser form controls adapt
- **Color adaptation**: All components use `dark:` prefixed utilities for background, text, border, and shadow adjustments

### Component Architecture Patterns

UI components follow a consistent variant/size composition pattern:

- **Variant objects**: Each component (Button, Badge) defines style variants as plain JavaScript objects mapping variant names to Tailwind utility strings
- **Size objects**: Separate size mappings for consistent spacing scales
- **Composition**: Variants and sizes are concatenated with `className` props for override capability
- **Common patterns**:
  - Gradient backgrounds for primary actions (`bg-gradient-to-r from-primary-600 to-primary-500`)
  - Shadow elevation with color-matched shadows (`shadow-primary-500/25`)
  - Hover lift effect (`hover:-translate-y-0.5`)
  - Consistent rounded corners (`rounded-xl` for buttons, `rounded-full` for badges)

### Reusable Utility Classes

`index.css` defines custom `@layer components` utilities:

- **`.glass`**: Semi-transparent backdrop-blur card style for overlays
- **`.glass-card`**: Enhanced glass effect with rounded corners and colored shadows for content cards
- **`.gradient-text`**: Multi-stop gradient text clipping for headings
- **`.gradient-bg`**: Subtle gradient backgrounds adapting to light/dark mode

### Responsive Strategy

Responsive design follows Tailwind's mobile-first breakpoints:
- Navigation collapses to hamburger menu below `md` breakpoint
- Profile/settings links hidden on small screens (`hidden sm:block`)
- Container max-width constrained to `max-w-7xl` with responsive padding

### Scrollbar Customization

Custom WebKit scrollbar styling in `index.css` provides consistent appearance across light/dark modes with slate-colored tracks and thumbs.

### Developer Conventions

1. **Use semantic color tokens** (`primary-*`, `accent-*`, `success-*`) rather than raw Tailwind colors for brand consistency
2. **Leverage variant objects** in UI components for maintainable style variations
3. **Apply dark mode utilities** (`dark:*`) to all interactive and container elements
4. **Use predefined animation classes** from config instead of inline animation definitions
5. **Prefer glass/glass-card utilities** for elevated surfaces requiring depth
6. **Compose with Framer Motion** for page-level and complex micro-interactions beyond CSS transitions
