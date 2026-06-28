# CI Pipeline

This document describes the CI pipeline workflows in the mega-header-mega-header-qyou monorepo and their expected behavior.

## Workflow overview

| Workflow file | Scope | Steps | Trigger |
|---|---|---|---|
| `backend.yml` | `@mega-header-qyou/api` | install → lint → test → build | push, PR |
| `web.yml` | `@mega-header-qyou/web` | install → lint → test → build | push, PR |
| `mobile.yml` | `@mega-header-qyou/mobile` | install → typecheck → lint → test | push, PR |
| `packages.yml` | `@mega-header-qyou/shared`, `@mega-header-qyou/stellar` | install → build → lint | push, PR |

## Pipeline phases

### Install
All workflows run `npm ci` with Node 20 and npm caching. This installs all workspace dependencies
and runs the root `postinstall` script, which builds `@mega-header-qyou/shared` and `@mega-header-qyou/stellar` first.

### Lint
Each workspace runs `eslint` via `npm run lint -w <workspace>`. The root `eslint.config.mjs` applies
TypeScript strict rules and React-specific rules for `apps/web` and `apps/mobile`.

### Test
- `@mega-header-qyou/api`: Node built-in test runner (`node --import tsx --test`) with in-memory auth repository
  — no database required
- `@mega-header-qyou/web` and `@mega-header-qyou/mobile`: Jest with framework-specific presets
- `@mega-header-qyou/shared` and `@mega-header-qyou/stellar`: No runtime tests — CI validates build + lint instead

### Build
- `@mega-header-qyou/api`: `tsc -p tsconfig.json` outputs to `dist/`
- `@mega-header-qyou/web`: `next build` outputs to `.next/`
- `@mega-header-qyou/mobile`: No build step (Expo/React Native build is handled separately)
- `@mega-header-qyou/shared` and `@mega-header-qyou/stellar`: `tsc -p tsconfig.json` outputs to `dist/`

## Failure behavior

- Any step that returns a non-zero exit code fails the workflow and blocks the PR.
- All workflows run in parallel. A failure in one workflow does not affect the others.
- The `packages.yml` workflow uses a build matrix to test `@mega-header-qyou/shared` and `@mega-header-qyou/stellar`
  independently.

## Running CI locally

```bash
# Run all checks
npm run lint
npm run typecheck
npm run test

# Single workspace
npm run lint -w @mega-header-qyou/api
npm run test -w @mega-header-qyou/web
```
