import { db } from '@/db';

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
