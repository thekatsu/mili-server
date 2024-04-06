import { db } from '@/app/api/db';

export const dynamic = 'force-dynamic';
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  return Response.json(
    await db.tag.findMany({
      select: {
        id: true,
        name: true,
        tagGroup: {
          select: {
            name: true,
          },
        },
      },
    }),
  );
}
