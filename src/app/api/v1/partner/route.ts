import { db } from '@/app/api/db';
import { inngest } from '../../inngest/client';

// response revalidate every 2 seconds
// export const revalidate = 2;
// export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { type: string } },
) {
  // const { searchParams } = new URL(request.url);
  // const query = searchParams.get('q') || '';
  // const cursor = searchParams.get('cursor');
  // const active = searchParams.get('active') as 'Ativo' | 'Inativo';

  // const direction =
  //   (searchParams.get('direction') as 'backward' | 'forward') || undefined;
  // const records = parseInt(searchParams.get('records') || '0') || 50;

  // try {
  //   await inngest.send({
  //     name: 'tiny/partners.searched',
  //     data: {
  //       query,
  //       cursor,
  //       active,
  //     },
  //   });
  // } catch (e: any) {
  //   console.log('erro ao acionar evento', e.message);
  // }

  // // console.log(cursor, records, query, active, direction);

  // let data = [];
  // if (!cursor) {
  //   data = await db.partner.findMany({
  //     take: records,
  //     where: {
  //       AND: [
  //         {
  //           name: {
  //             contains: query,
  //             mode: 'insensitive',
  //           },
  //         },
  //         {
  //           active: active ? active : 'Ativo',
  //         },
  //       ],
  //     },
  //     orderBy: {
  //       id: 'asc',
  //     },
  //   });
  // } else {
  //   data = await db.partner.findMany({
  //     take: records * (direction === 'backward' ? -1 : 1),
  //     skip: direction === 'backward' ? 1 : 0,
  //     cursor: {
  //       id: cursor,
  //     },
  //     where: {
  //       AND: [
  //         {
  //           name: {
  //             contains: query,
  //             mode: 'insensitive',
  //           },
  //         },
  //         {
  //           active: active ? active : 'Ativo',
  //         },
  //       ],
  //     },
  //     orderBy: {
  //       id: 'asc',
  //     },
  //   });
  // }

  return Response.json({});
}
