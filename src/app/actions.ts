'use server';
import { inngest } from './api/inngest/client';

export async function startProductImport() {
  console.log('clicou!!');
  const innStatus = await inngest.send({ name: 'test/products.import' });
  console.log(innStatus);
  return null;
}

export async function startTagGroupImport() {
  console.log('clicou!!');
  const innStatus = await inngest.send({ name: 'test/tag-groups.import' });
  console.log(innStatus);
  return null;
}

export async function startTagImport() {
  console.log('clicou!!');
  const innStatus = await inngest.send({ name: 'test/tags.import' });
  console.log(innStatus);
  return null;
}
