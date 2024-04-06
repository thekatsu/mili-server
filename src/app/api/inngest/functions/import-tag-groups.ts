import { inngest } from '@/app/api/inngest/client';
import { getTagGroups } from '@/app/integration/erp/tiny';

export const importTagGroups = inngest.createFunction(
  { id: 'import-tag-gorups' },
  { event: 'test/tag-groups.import' },
  async ({ event, step }) => {
    await step.run('import-tag-groups', async () => {
      console.log('iniciou importação');
      await getTagGroups();
      console.log('terminou importação');
      return {};
    });

    console.log('fim de tudo');

    return { event, body: 'grupos de tag importados' };
  },
);
