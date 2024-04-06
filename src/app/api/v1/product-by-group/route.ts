import { db } from '@/app/api/db';

export const dynamic = 'force-dynamic';
export async function GET(
  request: Request,
  { params }: { params: { type: string } },
) {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      category: true,
      image: true,
      ProductTag: {
        select: {
          tag: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    take: 100,
    where: {
      category: {
        not: null,
      },
      AND: {
        category: {
          not: {
            equals: '',
          },
        },
      },
    },
  });

  type ResponseType = {
    id: string;
    title: string;
    data: {
      id: string;
      name: string;
      image?: string | null;
      tags: {
        id: string;
        name: string;
      }[];
    }[];
  };

  const productByGroup = products
    .map((item, index, arr) => {
      const groupName = item.category?.split(' >> ')[0];
      return {
        id: groupName,
        title: groupName,
        data: [
          {
            id: item.id,
            name: item.name,
            image: item.image,
            tags: item.ProductTag.map((productTag) => {
              return {
                id: productTag.tag.id,
                name: productTag.tag.name,
              };
            }),
          },
        ],
      };
    })
    .reduce((acc: ResponseType[], curr, index, arr) => {
      const idx = acc.findIndex((item) => item.title == curr.title);
      if (idx != -1) {
        if (!acc[idx].data) {
          acc[idx].data = new Array();
        }
        acc[idx].data.push(...curr.data);
      } else {
        acc.push({
          id: !curr.id ? '' : curr.id,
          title: !curr.title ? '' : curr.title,
          data: curr.data,
        });
      }

      return acc;
    }, [] as ResponseType[]);

  // const productByGroup = products.reduce((acc, curr, index, prod) => {
  //   const groupName = curr.category?.split(' >> ')[0];
  //   console.log(curr);

  //   return { acc, ...curr };
  // }, [] as ResponseType[]);

  return Response.json(productByGroup);
}
