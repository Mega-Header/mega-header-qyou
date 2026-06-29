# Workspace Scripts and Package Boundaries — Phase 5 Behavior

## Overview

The Phase 5 workspace scripts and package boundaries contract defines the expected
workspace structure, script dependencies, build ordering, and import boundary rules
across all workspaces in the mega-header-mega-header-qyou monorepo.

## Contract Structure

The contract (`workspace-scripts-contract-phase5.ts`) exports:

- **`WorkspaceScriptsPhase5Contract`** — per-workspace contract type
- **`PHASE5_CONTRACTS`** — contract instances for all 5 workspaces
- **`getPhase5Contract(name)`** — lookup helper
- **`validatePhase5Contract(contract)`** — validation function

## Build Order

| Build Order | Workspace | Type |
|-------------|-----------|------|
| 1 | `@mega-header-qyou/shared` | Shared package |
| 2 | `@mega-header-qyou/stellar` | Shared package |
| 3 | `@mega-header-qyou/api` | Application |
| 4 | `@mega-header-qyou/web` | Application |
| 5 | `@mega-header-qyou/mobile` | Application |

## Script Dependencies

### @mega-header-qyou/api
| Script | Depends On | Post-Build | Required Env Vars |
|--------|-----------|------------|-------------------|
| build | @mega-header-qyou/shared | prisma:generate | DATABASE_URL, JWT_SECRET |
| test | build | — | — |
| dev | @mega-header-qyou/shared | — | DATABASE_URL, JWT_SECRET |
| lint | — | — | — |
| typecheck | — | — | — |

### @mega-header-qyou/web
| Script | Depends On | Required Env Vars |
|--------|-----------|-------------------|
| build | @mega-header-qyou/shared, @mega-header-qyou/api | NEXT_PUBLIC_API_URL |
| test | build | — |
| dev | @mega-header-qyou/shared | NEXT_PUBLIC_API_URL |
| lint | — | — |
| typecheck | — | — |

### @mega-header-qyou/mobile
| Script | Depends On |
|--------|-----------|
| dev | @mega-header-qyou/shared |
| test | @mega-header-qyou/shared |
| lint | — |
| typecheck | — |
| build | @mega-header-qyou/shared |

### @mega-header-qyou/shared
| Script | Depends On |
|--------|-----------|
| build | — |
| lint | — |
| typecheck | — |

### @mega-header-qyou/stellar
| Script | Depends On |
|--------|-----------|
| build | @mega-header-qyou/shared |
| lint | — |
| typecheck | — |

## Import Boundary Rules

| Workspace | Allowed Imports | Forbidden Imports |
|-----------|----------------|-------------------|
| @mega-header-qyou/api | @mega-header-qyou/shared, @mega-header-qyou/stellar | @mega-header-qyou/web, @mega-header-qyou/mobile |
| @mega-header-qyou/web | @mega-header-qyou/shared | @mega-header-qyou/stellar, @mega-header-qyou/mobile, @mega-header-qyou/api |
| @mega-header-qyou/mobile | @mega-header-qyou/shared | @mega-header-qyou/stellar, @mega-header-qyou/web, @mega-header-qyou/api |
| @mega-header-qyou/shared | — | @mega-header-qyou/api, @mega-header-qyou/web, @mega-header-qyou/mobile, @mega-header-qyou/stellar |
| @mega-header-qyou/stellar | @mega-header-qyou/shared | @mega-header-qyou/api, @mega-header-qyou/web, @mega-header-qyou/mobile |

## Validation Rules

- Build order must be respected — no workspace may depend on a workspace with a higher build order
- Shared packages must build before application packages
- Shared packages must not depend on application packages
- Required env vars must be present in `.env.example`
- Forbidden imports must not appear in workspace `tsconfig.json` paths
- All required scripts must be declared in workspace `package.json`
