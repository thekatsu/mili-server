import { db } from '@/app/api/db';

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
