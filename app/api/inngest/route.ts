import { serve } from 'inngest/next';
import { inngest } from '@/app/inngest/client';
import { importProducts } from '@/app/inngest/functions';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [importProducts],
});

// export const { GET, POST, PUT } = serve(ingest, {
//   client: inngest,
//   serveHost: 'https://mili-server.vercel.app/',
//   servePath: '/api/inngest',
//   logLevel: 'debug',
//   baseUrl: 'https://api.inngest.com/',
//   functions: [importProducts],
// });
