import { db } from '@/app/api/db';

export const dynamic = 'force-dynamic';
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  return Response.json(
    await db.tagGroup.findMany({ where: { id: params.id } }),
  );
}
