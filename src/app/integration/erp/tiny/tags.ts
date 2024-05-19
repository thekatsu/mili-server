import { db } from '@/app/api/db';
import { sleep } from '@/app/lib/utils';
import { env } from 'process';

export async function importTag(page: number = 1) {
  const baseUrl = 'https://api.tiny.com.br/api2/tag.pesquisa.php';
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
        for (const { registro: tag } of registros) {
          console.log('inserindo', tag);

          await tx.tag.upsert({
            where: {
              id: tag.id,
            },
            create: { id: tag.id, name: tag.nome, tagGroupId: tag.id_grupo },
            update: { id: tag.id, name: tag.nome, tagGroupId: tag.id_grupo },
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
