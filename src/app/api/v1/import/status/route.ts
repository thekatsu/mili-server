import { db } from '@/app/api/db';

export async function GET() {
  try {
    const total = await db.product.count();
    const imported = await db.product.count({
      where: {
        importedDetails: true,
      },
    });

    const data = {
      total,
      imported,
      progress: parseInt(((imported * 100) / total).toFixed(0)),
    };

    return Response.json(data);
  } catch (err) {
    console.error('Database Error:', err);
    return Response.json({
      error: err,
    });
  }
}
