import { db } from '@/app/api/db';

export const dynamic = 'force-dynamic';
export async function GET(
  request: Request,
  { params }: { params: { type: string } },
) {
  return Response.json(await db.order.findMany());
}
