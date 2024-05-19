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

export const productsUpdatedFn = inngest.createFunction(
  {
    id: 'products-updated',
  },
  {
    event: 'tiny/products.updated',
    // cron: 'TZ=Brasil/São Paulo 0 */1 * * *',
  },
  async ({ event, step }) => {
    const { date } = event.data;

    try {
      const rowCount = await step.run('import-products', async () => {
        // const fetched = await searchProducts({
        //   query,
        //   page: estimate_page,
        //   situation: active == 'S' ? 'A' : 'I',
        // });
        // await upsertProducts(fetched.products);
        // revalidatePath('/api/v1/product');
        // return fetched.products.length;

        return 0;
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
