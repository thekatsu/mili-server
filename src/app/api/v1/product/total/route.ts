import { db } from '@/app/database/db';

export const dynamic = 'force-dynamic';
export async function GET() {
  return Response.json({
    total: await db.product.count({
      where: {
        situation: 'A',
      },
    }),
  });
}
