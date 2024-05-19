import { db } from '@/app/api/db';
import { UpsertPartnersProps } from './upsert-partners-types';

export async function upsertPartners(partners: UpsertPartnersProps[]) {
  await db.$connect();

  await Promise.all(
    partners.map((partner) =>
      db.partner.upsert({
        create: partner,
        update: partner,
        where: {
          id: partner.id,
        },
      }),
    ),
  );

  db.$disconnect();
}
