import { serve } from 'inngest/next';
import { inngest } from '@/app/api/inngest/client';
import {
  importProducts,
  importTagGroups,
  importTags,
} from '@/app/api/inngest/functions';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [importProducts, importTagGroups, importTags],
});
