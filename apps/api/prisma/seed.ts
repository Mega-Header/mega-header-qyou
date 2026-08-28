// #827: seed script for local development
// Run: pnpm --filter @mega-header-qyou/api exec ts-node prisma/seed.ts
// Or add "prisma": { "seed": "ts-node prisma/seed.ts" } to package.json
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('Password1!', 10);
  await prisma.user.upsert({
    where: { email: 'dev@mega-header-qyou.local' },
    update: {},
    create: { email: 'dev@mega-header-qyou.local', passwordHash: hash },
  });
  console.log('Seeded: dev@mega-header-qyou.local / Password1!');
}

main().finally(() => prisma.$disconnect());
