import { inngest } from '@/app/api/inngest/client';
import { getProducts } from '@/app/integration/erp/tiny';

export const importProducts = inngest.createFunction(
  { id: 'import-products' },
  { event: 'test/products.import' },
  async ({ event, step }) => {
    await step.run('import-products', async () => {
      console.log('iniciou importação');
      await getProducts();
      console.log('terminou importação');
      return {};
    });

    console.log('fim de tudo');

    return { event, body: 'produtos importados' };
  },
);
