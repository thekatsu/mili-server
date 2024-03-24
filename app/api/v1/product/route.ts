import { db } from '@/app/database/db';

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
