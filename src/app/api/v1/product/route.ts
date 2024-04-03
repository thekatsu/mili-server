import { db } from '@/app/api/db';

export const dynamic = 'force-dynamic';
export async function GET() {
  return Response.json({
    products: await db.product.findMany({
      select: {
        id: true,
      },
      where: {
        situation: 'A',
      },
    }),
  });
}
