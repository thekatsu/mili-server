// 'use server';

// import { db } from '@/app/api/db';
// import { z } from 'zod';

// const FormSchema = z.object({
//   id: z.string().uuid(),
//   name: z.string().max(100),
//   description: z.string().max(500),
//   baseUrl: z.string().url().max(255),
//   token: z.string().max(512),
//   params: z.string(),
//   type: z.enum(['REST', 'SOAP']),
//   requestPerMinute: z.number(),
//   active: z.boolean(),
// });

// export type FormSchemaType = z.infer<typeof FormSchema>;
// export async function fetchConfigIntegration(): Promise<FormSchemaType[]> {
//   try {
//     const data = await db.configIntegration.findMany({
//       where: {
//         active: true,
//       },
//     });

//     return data.map((row) => ({
//       id: row.id,
//       name: row.name,
//       description: row.description,
//       baseUrl: row.baseUrl,
//       token: row.token,
//       params: row.params?.toString() || '{}',
//       type: row.type,
//       requestPerMinute: row.requestPerMinute,
//       active: row.active,
//     }));
//   } catch (err) {
//     console.error('Database error: ', err);
//     throw new Error('Failed to fetch Config Integration data.');
//   }
// }

// export async function fetchByIdConfigIntegration(
//   id: string,
// ): Promise<FormSchemaType | null> {
//   try {
//     const data = await db.configIntegration.findUnique({
//       where: {
//         id,
//       },
//     });

//     if (!data) return null;

//     return {
//       id: data.id,
//       name: data.name,
//       description: data.description,
//       baseUrl: data.baseUrl,
//       token: data.token,
//       params: data.params?.toString() || '{}',
//       type: data.type,
//       requestPerMinute: data.requestPerMinute,
//       active: data.active,
//     };
//   } catch (err) {
//     console.error('Database error: ', err);
//     throw new Error('Failed to fetch Config Integration one data.');
//   }
// }

// const CreateFormSchema = FormSchema.omit({ id: true, active: true });
// export type CreateFormSchemaProps = z.infer<typeof CreateFormSchema>;
// export async function createConfigIntegration(
//   data: CreateFormSchemaProps,
// ): Promise<FormSchemaType> {
//   try {
//     // Create one ConfigIntegration
//     const created = await db.configIntegration.create({
//       data: {
//         name: data.name,
//         description: data.description,
//         baseUrl: data.baseUrl,
//         requestPerMinute: data.requestPerMinute,
//         token: data.token,
//         type: data.type,
//         active: true,
//       },
//     });

//     return {
//       id: created.id,
//       name: created.name,
//       description: created.description,
//       baseUrl: created.baseUrl,
//       token: created.token,
//       params: created.params?.toString() || '{}',
//       type: created.type,
//       requestPerMinute: created.requestPerMinute,
//       active: created.active,
//     };
//   } catch (err) {
//     console.error('Database error: ', err);
//     throw new Error('Failed to fetch Config Integration data.');
//   }
// }

// export async function updateConfigIntegration(
//   data: FormSchemaType,
// ): Promise<FormSchemaType> {
//   try {
//     // Create one ConfigIntegration
//     const updated = await db.configIntegration.update({
//       where: {
//         id: data.id,
//       },
//       data: {
//         name: data.name,
//         description: data.description,
//         baseUrl: data.baseUrl,
//         requestPerMinute: data.requestPerMinute,
//         token: data.token,
//         type: data.type,
//         active: true,
//       },
//     });

//     return {
//       id: updated.id,
//       name: updated.name,
//       description: updated.description,
//       baseUrl: updated.baseUrl,
//       token: updated.token,
//       params: updated.params?.toString() || '{}',
//       type: updated.type,
//       requestPerMinute: updated.requestPerMinute,
//       active: updated.active,
//     };
//   } catch (err) {
//     console.error('Database error: ', err);
//     throw new Error('Failed to update Config Integration data.');
//   }
// }
