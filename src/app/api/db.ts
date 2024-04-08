import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { db: PrismaClient };

export const db =
  globalForPrisma.db ||
  new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
    ],
  });

// db.$on('query', (e) => {
//   console.log('Query: ' + e.query);
//   console.log('Params: ' + e.params);
//   console.log('Duration: ' + e.duration + 'ms');
// });

if (process.env.NODE_ENV !== 'production') globalForPrisma.db = db;
