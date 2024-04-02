import { z } from 'zod';

export const FormSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(100),
  description: z.string().max(500),
  baseUrl: z.string().url().max(255),
  token: z.string().max(512),
  params: z.string(),
  type: z.enum(['REST', 'SOAP']),
  requestPerMinute: z.number(),
  active: z.boolean(),
});
export type formType = z.infer<typeof FormSchema>;
