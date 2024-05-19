import { db } from '@/app/api/db';
import { GetEstimatePageByIdProps } from './get-estimate-page-by-id-types';

export async function getEstimatePageById({
  id,
  query,
  active,
  per_page = 100,
}: GetEstimatePageByIdProps) {
  const count = await db.partner.count({
    where: {
      AND: [
        {
          id: {
            lt: id,
          },
        },
        {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          active,
        },
      ],
    },
    orderBy: {
      id: 'asc',
    },
  });

  return Math.floor(count / per_page) + 1;
}
