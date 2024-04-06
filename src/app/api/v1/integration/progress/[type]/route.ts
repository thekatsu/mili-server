import { db } from '@/app/api/db';

export const dynamic = 'force-dynamic';
export async function GET(
  request: Request,
  { params }: { params: { type: string } },
) {
  return Response.json(
    await db.integrationProgress.findFirst({
      where: {
        key: params.type,
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
