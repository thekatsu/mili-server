import { db } from '@/app/api/db';
import { env } from 'process';

export async function importTagGroup(page: number = 1) {
  const baseUrl = 'http://api.tiny.com.br/api2/grupo.tag.pesquisa.php';
  const url = `${baseUrl}?token=${env.TINY_TOKEN}&pesquisa=&pagina=${page}&formato=json`;

  const response = await fetch(url, {
    method: 'POST',
  });

  const data = (await response.json()).retorno;

  let total_pages = 0;
  if (data.status === 'OK') {
    total_pages = data.numero_paginas;

    const registros = data.registros;

    const inserted = await db.$transaction(
      async (tx) => {
        for (const { registro: tagGroup } of registros) {
          console.log('inserindo', tagGroup);
          await tx.tagGroup.upsert({
            where: {
              id: tagGroup.id,
            },
            create: { id: tagGroup.id, name: tagGroup.nome },
            update: { id: tagGroup.id, name: tagGroup.nome },
          });
        }

        return registros.length;
      },
      {
        timeout: 30000,
      },
    );

    console.log('inserted', inserted);
  }

  await db.$disconnect();

  return {
    page,
    total_pages,
  };
}
