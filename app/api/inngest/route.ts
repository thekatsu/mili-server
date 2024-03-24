import { serve } from 'inngest/next';
import { inngest } from '@/app/inngest/client';
import { importProducts } from '@/app/inngest/functions';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [importProducts],
  signingKey: process.env.INNGEST_SIGNING_KEY,
  id: 'my-app',
  logLevel: 'debug',
});

// export const { GET, POST, PUT } = serve(ingest, {
//   client: inngest,
//   serveHost: 'https://mili-server.vercel.app/',
//   servePath: '/api/inngest',
//   logLevel: 'debug',
//   baseUrl: 'https://api.inngest.com/',
//   functions: [importProducts],
// });
