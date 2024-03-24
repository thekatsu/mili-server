import { Inngest } from 'inngest';

// Create a client to send and receive events
export const dynamic = 'force-dynamic';
export const inngest = new Inngest({
  id: 'mili-server',
  eventKey: process.env.INNGEST_EVENT_KEY,
});
