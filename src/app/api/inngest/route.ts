import { serve } from 'inngest/next';
import { inngest } from '@/app/api/inngest/client';
import {
  partnersSearchedFn,
  productSearchedFn,
  productsSearchedFn,
} from '@/app/api/inngest/tiny/functions';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [partnersSearchedFn, productsSearchedFn, productSearchedFn],
});
