import { inngest } from '@/app/api/inngest/client';
import {
  fetchProductDetail,
  fetchProductTags,
  updateProductDetail,
  upsertProductTags,
} from '@/app/integration/erp/tiny/product';
import {
  CONCURRENCY_KEY,
  PARALLEL_REQUESTS,
  REQUESTS_PER_MINUTE,
  THROTTLE_KEY,
} from '../config';
import { revalidatePath } from 'next/cache';

export const productSearchedFn = inngest.createFunction(
  {
    id: 'product-searched',
    concurrency: {
      limit: PARALLEL_REQUESTS,
      scope: 'account',
      key: `"${CONCURRENCY_KEY}"`,
    },
    throttle: {
      limit: REQUESTS_PER_MINUTE,
      period: '1m',
      burst: 1,
      key: `"${THROTTLE_KEY}" + "-" + event.data.id`,
    },
  },
  {
    event: 'tiny/product.searched',
  },
  async ({ event, step }) => {
    const { id } = event.data;

    try {
      await step.run('import-product-detail-and-tags', async () => {
        const [fetchedDetail, fetchedTags] = await Promise.all([
          fetchProductDetail({
            id,
          }),
          fetchProductTags({ id }),
        ]);
        await Promise.all([
          updateProductDetail(fetchedDetail),
          upsertProductTags(fetchedTags),
        ]);
        revalidatePath(`/api/v1/product/${id}`);
      });

      return {
        status: 'OK',
        message: `fetched product ${id} data from tiny`,
        params: event.data,
      };
    } catch (e) {
      let message = 'Erro desconhecido';

      if (e instanceof Error) {
        message = e.message;
      }

      console.error(e);

      return {
        error: { message },
      };
    }
  },
);
