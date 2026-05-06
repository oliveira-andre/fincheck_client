# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server (auto-opens browser per `vite.config.ts`).
- `npm run build` — `tsc -b` (project references) then `vite build`. Type errors fail the build.
- `npm run lint` — ESLint via flat config (`eslint.config.js`).
- `npm run preview` — Serve the production build locally.

No test runner is configured.

Node version is pinned to **22.14.0** in `.tool-versions`. The app reads `VITE_API_URL` from `.env` (see `.env.example`); without it, `httpClient` has no `baseURL` and every request fails.

## Architecture

This is the frontend for **Fincheck**, a personal finance tracker. UI text and toast messages are in **Portuguese (pt-BR)** — keep new copy consistent.

### Top-level layout

- `src/Router/` — `BrowserRouter` with an `AuthGuard` wrapper that takes `isPrivate`. Public routes (`/login`, `/register`) sit under `AuthLayout`; the only private route is `/` (Dashboard). When `signedIn` mismatches `isPrivate`, the guard redirects.
- `src/app/` — non-UI domain layer (services, hooks, entities, contexts, utils, config).
- `src/view/` — UI layer (`components/` for reusable primitives, `layouts/`, `pages/`).

### Auth flow

JWT is stored in `localStorage` under `fincheck:accessToken` (`src/app/config/localStorageKeys.ts`). `AuthProvider` (`src/app/contexts/AuthContext.tsx`):

1. Initializes `signedIn` from the presence of the token.
2. Runs the `['users', 'me']` React Query (gated by `signedIn`, `staleTime: Infinity`) to validate the session.
3. Exposes `signedIn = isSuccess && signedIn`, so the guard waits for `/me` to resolve before treating the user as authenticated.
4. On query error, toasts "Sessão expirada" and calls `signOut()`.
5. While `isFetching`, renders `<LaunchScreen />` instead of children.

`httpClient` (`src/app/services/httpClient.ts`) is the only axios instance and attaches `Authorization: Bearer <token>` via a request interceptor. **All HTTP calls must go through it** so auth and `baseURL` apply.

### Services pattern

Each backend resource is a folder under `src/app/services/<name>Service/` with one file per operation (`create.ts`, `getAll.ts`, `update.ts`, `remove.ts`) and an `index.ts` that re-exports them as a single object:

```ts
export const transactionsService = { create, getAll, update, remove };
```

When adding an endpoint, follow this shape — don't put multiple operations in one file. Filter/param types live next to the operation that uses them (e.g. `TransactionFilters` is exported from `transactionsService/getAll.ts`).

### Data layer (React Query)

- `QueryClient` is configured in `src/App.tsx` with `retry: false` and `refetchOnWindowFocus: false` — assume queries do not auto-retry.
- Domain hooks in `src/app/hooks/` (e.g. `useTransactions`, `useBankAccounts`, `useCategories`) wrap `useQuery` and return a tailored shape (`{ transactions, isFetching, refetchTransactions, ... }`). Prefer extending these hooks over calling `useQuery` directly in components.
- Note: `useTransactions` uses a static `queryKey: ['transactions']` regardless of filters; the controller refetches on filter change via `useEffect`. Preserve this pattern (or change it deliberately) when touching transaction queries.

### Page = controller + view

Pages follow a **controller hook + view component** split:

- `useLoginController.ts`, `useRegisterController.ts`, `useTransactionsController.ts`, `useAccountsController.ts`, etc. own all state, react-hook-form setup, Zod schemas, mutations, and handlers.
- The matching `index.tsx` is a near-pure render of the controller's return value.

When adding a page or non-trivial component, mirror this split rather than inlining logic in JSX.

### Forms

`react-hook-form` + `@hookform/resolvers/zod` + `zod` is the standard stack. Define the schema in the controller, infer the form type via `z.infer<typeof schema>`, and pass `errors[field]?.message` to the shared `Input` component.

### Dashboard modal state

`DashboardContext` (`src/view/pages/Dashboard/components/DashboardContext/`) centralizes all modal open/close state and the "being edited" entity for the Dashboard (accounts, transactions, categories). New dashboard modals should plumb their `isOpen` / `open*` / `close*` / `*BeingEdited` state through this context rather than holding local state in the modal itself.

### UI primitives

Reusable components live in `src/view/components/` (`Button`, `Input`, `Modal`, `DatePicker`, `Select`, `Popover`, `DropdownMenu`, etc.) and are typically thin wrappers over Radix UI or Headless UI styled with Tailwind. Use `cn` (`src/app/utils/cn.ts`, `clsx` + `tailwind-merge`) for conditional class merging.

Tailwind is the styling system; theme extensions (custom colors, etc.) live in `tailwind.config.js`.

### Entities

Shared domain types live in `src/app/entities/` (`BankAccount`, `Category`, `Transaction`, `User`). Reuse these everywhere — don't redeclare shapes inline in services or components.
