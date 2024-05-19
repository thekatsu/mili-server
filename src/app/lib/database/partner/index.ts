'use server';

import { db } from '@/app/api/db';
import { inngest } from '@/app/api/inngest/client';
import { Partner, Prisma } from '@prisma/client';

import {
  unstable_noStore as noStore,
  unstable_cache as cache,
} from 'next/cache';

const fetchPartners = async (
  query: string,
  active: string,
  page: number,
  perPage: number,
): Promise<{ data: Partner[]; rowCount: number }> => {
  // noStore();

  const limit = perPage;
  const offset = (page - 1) * limit;
  try {
    const estimate_page = Math.floor((page * perPage) / 100);
    // await inngest.send({
    //   name: 'tiny/partners.searched',
    //   data: {
    //     pesquisa: query,
    //     // cpf_cnpj:
    //     // idVendedor:
    //     // nomeVendedor:
    //     situacao: active,
    //     pagina: estimate_page == 0 ? 1 : estimate_page,
    //   },
    // });

    const where: Prisma.PartnerWhereInput = {
      OR: [
        { id: { contains: query, mode: 'insensitive' } },
        { code: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } },
        { name: { contains: query, mode: 'insensitive' } },
        { nickname: { contains: query, mode: 'insensitive' } },
        { phone: { contains: query, mode: 'insensitive' } },
        { sellerName: { contains: query, mode: 'insensitive' } },
        { taxID: { contains: query, mode: 'insensitive' } },
        { type: { contains: query, mode: 'insensitive' } },
      ],
      active: { equals: active },
    };

    const partners = await db.partner.findMany({
      where,
      take: limit,
      skip: offset,
    });

    const rowCount = await db.partner.count({
      where,
    });

    return {
      data: partners,
      rowCount,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch partners.');
  }
};

export const fetchFilteredPartners = fetchPartners;
//cache(fetchPartners, ['fetchPartners'], {
//   revalidate: 1,
//   tags: ['parther'],
// });
