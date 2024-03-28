import { db } from '@/db';

export const dynamic = 'force-dynamic';
export async function GET() {
  const data = await db.configIntegration.findMany({
    where: {
      active: true,
    },
  });

  return Response.json({
    message: 'OK',
    data,
  });
}
