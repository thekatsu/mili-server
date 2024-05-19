import { db } from '@/app/api/db';
import { UpdateProductDetailProps } from '@/app/integration/erp/tiny/product/update-product-detail-types';

export async function updateProductDetail(product: UpdateProductDetailProps) {
  await db.product.update({
    data: { ...product },
    where: {
      id: product.id,
    },
  });

  db.$disconnect();
}
