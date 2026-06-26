## Overview

The IdeaOps Platform Frontend uses an **informal, ad-hoc error handling approach** built on JavaScript's native `try/catch` blocks combined with `console.error()` logging. There is no centralized error management system, no custom error types, no error boundaries, and no user-facing error notification framework.

## System/Approach Used

### 1. Data Layer Error Propagation (`src/lib/supabase.js`)

All Supabase data access functions follow a consistent pattern:
- Destructure `{ data, error }` from Supabase client responses
- Check `if (error) throw error;` to propagate errors upward
- Return data or empty arrays as fallbacks

This creates a **throw-on-error** contract where all callers must handle potential exceptions via `try/catch`.

### 2. Component-Level Error Handling

Pages and components that call data layer functions wrap async operations in `try/catch` blocks:
- **Read operations** (e.g., `fetchIdeas`, `fetchIdeaById`): Errors are logged via `console.error()` but silently swallowed — the UI continues rendering, often showing empty states or loading spinners indefinitely if data fails to load.
- **Write operations** (e.g., `insertIdea`, `updateIdeaVotes`): Similar pattern, with occasional use of `alert()` for user feedback (e.g., `SubmitIdeaPage.jsx` line 76).
- **Optimistic updates**: `IdeaDetailsPage.jsx` implements rollback on vote failure — increments UI state first, then reverts if the API call fails.

### 3. Form Validation Errors

UI components (`Input.jsx`, `Textarea.jsx`, `Select.jsx`) accept an `error` prop that:
- Changes border color to red (`border-red-500`)
- Displays error message text below the field
- Hides helper text when an error is present

However, **no page currently passes error props** to these components — form validation is handled purely through required-field checks (`canProceed()` in `SubmitIdeaPage.jsx`) without displaying inline validation errors.

### 4. No Error Boundaries

There are **zero React Error Boundary components** in the codebase. If a component throws during render, the entire app will crash with no graceful fallback.

### 5. No Centralized Error Service

No dedicated error utility module, toast/notification system for errors, or global error state management exists. Each component handles errors independently.

## Key Files

| File | Role |
|------|------|
| `src/lib/supabase.js` | Data layer — throws Supabase errors on all operations |
| `src/pages/ExplorePage.jsx` | Example of read-operation error handling (console.error only) |
| `src/pages/IdeaDetailsPage.jsx` | Example of write-operation error handling with optimistic rollback |
| `src/pages/SubmitIdeaPage.jsx` | Only page using `alert()` for user-facing error feedback |
| `src/components/features/CommentSection.jsx` | Comment submission error handling (console.error only) |
| `src/components/ui/Input.jsx` | UI component supporting error prop for form validation display |
| `src/components/ui/Textarea.jsx` | UI component supporting error prop for form validation display |

## Architecture and Conventions

### Current Patterns

1. **Throw at the data layer**: All `src/lib/supabase.js` functions throw on error, never returning `{ data, error }` tuples to callers.
2. **Catch and log at the component level**: Pages catch errors in `useEffect` hooks and async handlers, logging to console.
3. **Silent failure for reads**: Failed data loads result in empty UI states with no user notification.
4. **Alert-based feedback for writes**: Only `SubmitIdeaPage.jsx` uses `alert()` to notify users of submission failures.
5. **No error state tracking**: Components do not maintain `error` state variables to conditionally render error messages.

### Design Decisions (Implicit)

- Errors are treated as **developer concerns** (console logs) rather than **user concerns** (visible feedback).
- The app prioritizes **graceful degradation** (showing empty states) over **explicit error communication**.
- Form validation relies on **progressive disclosure** (step-by-step wizard with `canProceed()` guards) rather than inline error messages.

## Rules Developers Should Follow

### Current Conventions to Maintain

1. **Data layer functions must throw on error**: All functions in `src/lib/supabase.js` should continue using `if (error) throw error;` to maintain the throw-on-error contract.

2. **Wrap all async data calls in try/catch**: Every `useEffect` or event handler calling supabase functions must include a `try/catch` block.

3. **Log errors with context**: Use descriptive `console.error()` messages that identify the operation (e.g., `'Failed to load ideas:', err`).

4. **Use loading states**: Always pair async operations with `loading` state to prevent rendering incomplete data.

### Recommended Improvements (Not Yet Implemented)

1. **Add React Error Boundaries**: Wrap route-level components with Error Boundary components to prevent full app crashes.

2. **Introduce a toast/notification system**: Replace `console.error()` and `alert()` with a user-friendly notification component for both success and error feedback.

3. **Track error state in components**: Add `const [error, setError] = useState(null)` to pages that fetch data, and render error messages when `error` is set.

4. **Implement form validation error display**: Pass `error` props to `Input`, `Textarea`, and `Select` components when form fields fail validation.

5. **Create a centralized error utility**: Consider adding `src/lib/errors.js` with helper functions for error formatting, classification, and user-friendly message generation.

6. **Handle network timeouts**: Add timeout handling for Supabase calls to prevent indefinite loading states.
