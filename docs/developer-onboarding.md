# Developer Onboarding

This document provides the onboarding workflow for new developers joining the mega-header-mega-header-qyou monorepo.

## Prerequisites

- Node.js 20+
- npm 10+
- PostgreSQL 16+ (for `@mega-header-qyou/api`)
- Expo CLI (for `@mega-header-qyou/mobile`)

## First-time setup

```bash
# 1. Clone and install
git clone https://github.com/Mega-Header/mega-header-mega-header-qyou.git
cd mega-header-mega-header-qyou
npm install

# 2. Set up environment variables
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp apps/mobile/.env.example apps/mobile/.env
# Edit .env files with local credentials

# 3. Run database migrations (api workspace)
npm run build -w @mega-header-qyou/shared
npm run db:migrate -w @mega-header-qyou/api

# 4. Verify everything works
npm run lint
npm run typecheck
npm run test
```

## Project structure

```
mega-header-mega-header-qyou/
├── apps/
│   ├── api/          # Express + Prisma backend
│   ├── web/          # Next.js frontend
│   └── mobile/       # Expo React Native app
├── packages/
│   ├── shared/       # Zod schemas, shared logic
│   └── stellar/      # Stellar/Soroban blockchain integration
├── scripts/          # Monorepo validation and tooling
├── docs/             # Documentation
└── .github/workflows # CI pipeline
```

## Daily workflow

```bash
# Start all dev servers
npm run dev

# Check code quality
npm run lint         # ESLint
npm run typecheck    # TypeScript
npm run test         # Tests

# Build for production
npm run build
```

## Troubleshooting

- `npm run build` fails: ensure `@mega-header-qyou/shared` builds first via `npm run build -w @mega-header-qyou/shared`
- Database errors: verify `DATABASE_URL` in `apps/api/.env`
- Type errors after pull: run `npm run typecheck` to identify failures
