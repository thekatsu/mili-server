import { db } from '@/app/api/db';
import { UpsertProductsProps } from '@/app/integration/erp/tiny/product/upsert-products-types';

export async function upsertProducts(products: UpsertProductsProps[]) {
  await db.$connect();

  // console.log(Object.keys(products[0]));
  type keys = keyof (typeof products)[0];
  type keysNoId = Omit<keys, 'id'>;

  const modelKeys = Object.keys(products[0]);
  delete modelKeys[0];

  const where = Object.keys(products[0])
    .filter((key) => key !== 'id')
    .reduce(
      (obj, key) =>
        Object.assign(obj, {
          [key]: { not: { equals: products[0][key as keys] } },
        }),
      {},
    );
  // .map((key) => {
  //   const prop: keys = key as keys;

  //   return {
  //     [key]: { equals: products[0][prop] },
  //   };
  // })

  console.log(where);

  const prod = await db.product.upsert({
    create: products[0],
    update: products[0],
    where: {
      id: products[0].id,
      AND: { ...where },
    },
  });

  console.log(prod);

  // console.log(
  //   await Promise.all(
  //     products.map((prod) => {
  //       // console.log(prod.id);
  //       return db.product.updateIfDiff({
  //         create: prod,
  //         update: prod,
  //         where: {
  //           id: prod.id,
  //         },
  //       });
  //     }),
  //   ),
  // );

  db.$disconnect();
}
