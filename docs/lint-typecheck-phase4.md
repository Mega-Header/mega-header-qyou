# Lint, Typecheck, and Test Ergonomics — Phase 4

This document describes the Phase 4 ergonomics improvements for lint, typecheck, and test workflows.

## TypeScript Configuration

All workspaces are expected to enable strict mode and related compiler options:

| Option | Required | Description |
|--------|----------|-------------|
| `strict` | true | Enable all strict type checking |
| `noUnusedLocals` | true | Report unused local variables |
| `noUnusedParameters` | true | Report unused function parameters |
| `strictNullChecks` | true | Ensure null/undefined handling |
| `exactOptionalPropertyTypes` | true (api) | Treat optional properties strictly |
| `noImplicitOverride` | true | Require override keyword |

## ESLint Rules

Each workspace defines a set of required ESLint rules:

| Rule | Severity | Description |
|------|----------|-------------|
| `@typescript-eslint/no-unused-vars` | error | No unused variables |
| `@typescript-eslint/no-explicit-any` | warn | Avoid any type |
| `no-console` | warn | No console.log in production |

## Pre-commit Hooks

Pre-commit hooks are configured per workspace:

| Workspace | Hooks |
|-----------|-------|
| `@mega-header-qyou/api` | lint, typecheck, test |
| `@mega-header-qyou/web` | lint, typecheck |
| `@mega-header-qyou/mobile` | lint, typecheck |
| `@mega-header-qyou/shared` | typecheck |
| `@mega-header-qyou/stellar` | typecheck |

## CI Integration

| Workspace | Lint | Typecheck | Test | Timeout |
|-----------|------|-----------|------|---------|
| `@mega-header-qyou/api` | yes | yes | yes | 10 min |
| `@mega-header-qyou/web` | yes | yes | yes | 15 min |
| `@mega-header-qyou/mobile` | yes | yes | yes | 15 min |
| `@mega-header-qyou/shared` | yes | yes | no | 5 min |
| `@mega-header-qyou/stellar` | yes | yes | no | 5 min |

## Validation

Run the Phase 4 lint/typecheck workflow:

```bash
node scripts/lint-typecheck-workflow-phase4.ts
```

Run hardening checks:

```bash
node scripts/lint-typecheck-hardening-phase4.ts
```
