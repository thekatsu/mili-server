'use server';
import { inngest } from './api/inngest/client';

// export async function searchProducts(query: string) {
//   return await inngest.send({
//     name: 'tiny/products.searched',
//     data: {
//       query,
//     },
//   });
// }

// export async function startProductImport() {
//   const innStatus = await inngest.send({ name: 'integration/products.import' });
//   console.log(innStatus);
//   return null;
// }

// export async function startTagGroupImport() {
//   const innStatus = await inngest.send({
//     name: 'integration/tag-groups.import',
//   });
//   console.log(innStatus);
//   return null;
// }

// export async function startTagImport() {
//   const innStatus = await inngest.send({ name: 'integration/tags.import' });
//   console.log('inns', innStatus);
//   return null;
// }
