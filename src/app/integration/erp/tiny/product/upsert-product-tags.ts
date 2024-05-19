import { db } from '@/app/api/db';
import { UpsertProductTagsProps } from '@/app/integration/erp/tiny/product/upsert-product-tags-types';

export async function upsertProductTags(productTags: UpsertProductTagsProps[]) {
  await db.$connect();
  await Promise.all(
    productTags.map((prodTag) => {
      return db.productTags.upsert({
        create: prodTag,
        update: prodTag,
        where: {
          productTagId: {
            productId: prodTag.productId,
            tagId: prodTag.tagId,
          },
        },
      });
    }),
  );

  db.$disconnect();
}
