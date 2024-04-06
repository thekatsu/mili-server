import { db } from '@/app/api/db';

export const dynamic = 'force-dynamic';
export async function GET(
  request: Request,
  { params }: { params: { type: string } },
) {
  return Response.json(
    await db.tagGroup.findMany({
      select: {
        id: true,
        name: true,
        Tag: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),
  );
}
