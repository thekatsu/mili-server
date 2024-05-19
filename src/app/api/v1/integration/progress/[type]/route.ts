import { db } from '@/app/api/db';

export const dynamic = 'force-dynamic';
export async function GET(
  request: Request,
  { params }: { params: { type: string } },
) {
  const event: { [key: string]: string } = {
    tags: 'integration/tags.import',
    'tag-groups': 'integration/tag-groups.import',
    products: 'integration/products.import',
  };

  return Response.json(
    await db.integrationProgress.findFirst({
      where: {
        key: event[params.type],
      },
      orderBy: [
        {
          startDate: 'desc',
        },
        {
          endDate: { sort: 'desc', nulls: 'last' },
        },
      ],
    }),
  );
}
