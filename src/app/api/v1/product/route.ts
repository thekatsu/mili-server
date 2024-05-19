import { db } from '@/app/api/db';
import { inngest } from '../../inngest/client';

// response revalidate every 2 seconds
// export const revalidate = 2;
// export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { type: string } },
) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const cursor = searchParams.get('cursor');
  const active = searchParams.get('active') as 'S' | 'N';

  const direction =
    (searchParams.get('direction') as 'backward' | 'forward') || undefined;
  const records = parseInt(searchParams.get('records') || '0') || 50;

  console.log('get-products');

  await inngest.send({
    name: 'tiny/products.searched',
    data: {
      query,
      cursor,
      active,
    },
  });

  let data = [];
  if (!cursor) {
    data = await db.product.findMany({
      take: records,
      where: {
        AND: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            active: active ? active : 'A',
          },
        ],
      },
      orderBy: {
        id: 'asc',
      },
    });
  } else {
    data = await db.product.findMany({
      take: records * (direction === 'backward' ? -1 : 1),
      skip: direction === 'backward' ? 1 : 0,
      cursor: {
        id: cursor,
      },
      where: {
        AND: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            active: active ? active : 'A',
          },
        ],
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  return Response.json(data);
}
