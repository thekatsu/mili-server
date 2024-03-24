import { Inngest } from 'inngest';

// Create a client to send and receive events
const client = new Inngest({
  id: 'my-app',
  eventKey: process.env.INNGEST_EVENT_KEY,
  env: process.env.NODE_ENV,
  baseUrl: 'https://app.inngest.com',
  isDev: false,
});

if (process.env.INNGEST_EVENT_KEY) {
  console.log('event key: ', process.env.INNGEST_EVENT_KEY);
  client.setEventKey(process.env.INNGEST_EVENT_KEY);
}
export const inngest = client;
