import { inngest } from '@/app/api/inngest/client';
import { getTags } from '@/app/integration/erp/tiny';

export const importTags = inngest.createFunction(
  { id: 'import-tags' },
  { event: 'test/tags.import' },
  async ({ event, step }) => {
    await step.run('import-tags', async () => {
      console.log('iniciou importação');
      await getTags();
      console.log('terminou importação');
      return {};
    });

    console.log('fim de tudo');

    return { event, body: 'tags importadas' };
  },
);
