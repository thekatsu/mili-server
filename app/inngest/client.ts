import { Inngest } from 'inngest';

// Create a client to send and receive events

export const inngest = new Inngest({
  id: 'mili-server',
  env: process.env.BRANCH,
});
