import { unstable_noStore as noStore } from 'next/cache';
import { db } from '../database/db';

export async function fetchImportProgress() {
  noStore();

  const req = await fetch('http://localhost:3000/api/v1/import', {
    method: 'GET',
  });

  return await req.json();
}
