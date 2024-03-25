import { serve } from 'inngest/next';
import { inngest } from '@/app/inngest/client';
import { importProducts } from '@/app/inngest/functions';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [importProducts],
  signingKey:
    'signkey-prod-c66c8beffbef0abee4c53dafb9c5ba1990a36c98684777c01feadeee7f55d618',
  id: 'my-app',
  logLevel: 'debug',
  baseUrl: 'https://app.inngest.com',
  serveHost: 'https://mili-server.vercel.app',
  servePath: '/api/inngest',
});

// export const { GET, POST, PUT } = serve(ingest, {
//   client: inngest,
//   serveHost: 'https://mili-server.vercel.app/',
//   servePath: '/api/inngest',
//   logLevel: 'debug',
//   baseUrl: 'https://api.inngest.com/',
//   functions: [importProducts],
// });
