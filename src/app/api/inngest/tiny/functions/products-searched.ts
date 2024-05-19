import { inngest } from '@/app/api/inngest/client';
import {
  getEstimatePageById,
  searchProducts,
  upsertProducts,
} from '@/app/integration/erp/tiny/product';
import {
  CONCURRENCY_KEY,
  PARALLEL_REQUESTS,
  REQUESTS_PER_MINUTE,
  THROTTLE_KEY,
} from '../config';
import { revalidatePath } from 'next/cache';

export const productsSearchedFn = inngest.createFunction(
  {
    id: 'products-searched',
    rateLimit: {
      limit: 1,
      period: '1s',
      key: `event.data.query + "-" + event.data.active + "-" + event.data.cursor`,
    },
    concurrency: {
      limit: PARALLEL_REQUESTS,
      scope: 'account',
      key: `"${CONCURRENCY_KEY}"`,
    },
    throttle: {
      limit: REQUESTS_PER_MINUTE,
      period: '1m',
      burst: 1,
      key: `"${THROTTLE_KEY}"`,
    },
  },
  {
    event: 'tiny/products.searched',
  },
  async ({ event, step }) => {
    const { query, active, cursor } = event.data;

    try {
      const rowCount = await step.run('import-products', async () => {
        const estimate_page = await getEstimatePageById({
          id: cursor ? cursor : '',
          query: query ? query : '',
          active: active ? active : 'S',
          per_page: 100,
        });

        const fetched = await searchProducts({
          query,
          page: estimate_page,
          situation: active == 'S' ? 'A' : 'I',
        });
        await upsertProducts(fetched.products);
        revalidatePath('/api/v1/product');
        return fetched.products.length;
      });

      return {
        status: 'OK',
        message: `fetched ${rowCount} data from tiny`,
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
