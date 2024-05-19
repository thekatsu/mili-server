import { Inngest, EventSchemas } from 'inngest';
import { Events } from '@/app/api/inngest/tiny/events';

// Create a client to send and receive events

export const inngest = new Inngest({
  id: 'my-app',
  schemas: new EventSchemas().fromRecord<Events>(),
});
