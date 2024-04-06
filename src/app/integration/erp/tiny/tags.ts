import { db } from '@/app/api/db';
import { sleep } from '@/app/lib/utils';

const REQUEST_PER_MINUTE = 30;
const TOKEN = '3e534d3b2f9fa470a4e7004216d2861118fbe485';

export async function getTags() {
  const pesquisa = '';
  let paginas = 1;
  let tags;

  let estimatedRecords = await db.tag.count();

  const eventId = await db.integrationProgress.create({
    select: {
      id: true,
    },
    data: {
      key: 'tags',
      startDate: new Date(),
      step: 0,
      totalSteps: estimatedRecords,
    },
  });

  console.log('id do evento: ', eventId.id);

  for (let pagina = 1; pagina <= paginas; pagina++) {
    const timeStart = performance.now();

    const httpResponse = await fetch(
      `https://api.tiny.com.br/api2/tag.pesquisa.php?token=${TOKEN}&pesquisa=${pesquisa}&situacao=A&pagina=${pagina}&formato=json`,
      {
        method: 'POST',
      },
    );

    const responseBody = await httpResponse.json();
    if (responseBody.retorno.status_processamento !== '3') {
      const oneMinute = 1000 * 60;
      console.log(`esperar por ${oneMinute}ms`);
      await sleep(oneMinute);
      return;
    }

    paginas = responseBody.retorno.numero_paginas || 0;

    tags = responseBody.retorno.registros || [];

    let estimatedRecords = (paginas - 1) * 100 + tags.length;
    await db.integrationProgress.update({
      data: {
        totalSteps: estimatedRecords,
      },
      where: {
        id: eventId.id,
        key: 'tags',
      },
    });

    let step = (pagina - 1) * 100;
    for (const tag of tags) {
      step++;
      await db.integrationProgress.update({
        data: {
          step: step,
        },
        where: {
          id: eventId.id,
          key: 'tags',
        },
      });

      const registro = tag.registro;
      console.log(registro);

      const tagData = {
        id: registro.id,
        name: registro.nome,
        tagGroupId: registro.id_grupo,
      };

      await db.tag.upsert({
        where: {
          id: registro.id,
        },
        create: tagData,
        update: tagData,
      });
    }

    const elapsedTime = parseInt((performance.now() - timeStart).toFixed(0));
    const windowTime = (60 / REQUEST_PER_MINUTE) * 1000;

    console.log(`windowTime: ${windowTime} - elapsedTime: ${elapsedTime}`);

    if (elapsedTime < windowTime) {
      const time = parseInt((windowTime - elapsedTime + 50).toFixed(0));
      console.log(`esperar por ${time}ms`);
      await sleep(time);
    }
  }

  await db.integrationProgress.update({
    data: {
      step: estimatedRecords,
      endDate: new Date(),
    },
    where: {
      id: eventId.id,
      key: 'tags',
    },
  });

  db.$disconnect();

  return tags;
}
