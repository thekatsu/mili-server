import { inngest } from '@/app/api/inngest/client';
import {
  getEstimatePageById,
  searchPartners,
  upsertPartners,
} from '@/app/integration/erp/tiny/partner';
import {
  CONCURRENCY_KEY,
  PARALLEL_REQUESTS,
  REQUESTS_PER_MINUTE,
  THROTTLE_KEY,
} from '../config';
import { revalidatePath } from 'next/cache';

export const partnersSearchedFn = inngest.createFunction(
  {
    id: 'partners-searched',
    // rateLimit: {
    //   limit: 2,
    //   period: '1s',
    //   key: `event.data.query + "-" + event.data.active + "-" + event.data.cursor`,
    // },
    // concurrency: {
    //   limit: PARALLEL_REQUESTS,
    //   scope: 'account',
    //   key: `"${CONCURRENCY_KEY}"`,
    // },
    // throttle: {
    //   limit: REQUESTS_PER_MINUTE,
    //   period: '1m',
    //   burst: 1,
    //   key: `"${THROTTLE_KEY}"`,
    // },
  },
  {
    event: 'tiny/partners.searched',
  },
  async ({ event, step }) => {
    const { pagina, pesquisa, situacao } = event.data;

    try {
      const rowCount = await step.run('import-partners', async () => {
        const fetched = await searchPartners({
          query: pesquisa,
          page: pagina,
          situation: situacao,
        });
        await upsertPartners(fetched.partners);
        revalidatePath('/api/v1/partner');
        revalidatePath('/cadastros/clientes');
        return fetched.partners.length;
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
