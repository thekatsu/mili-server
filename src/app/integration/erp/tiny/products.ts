import { db } from '@/app/api/db';
// import { sleep } from '@/app/lib/utils';
import { env } from 'process';

export async function importProductDetail(id: string) {
  const baseUrl = 'https://api.tiny.com.br/api2/produto.obter.php';
  const url = `${baseUrl}?token=${env.TINY_TOKEN}&id=${id}&formato=json`;

  const response = await fetch(url, {
    method: 'POST',
  });

  const data = (await response.json()).retorno;

  if (data.status === 'OK') {
    const produto = {
      id: data.produto.id,
      type: data.produto.tipo,
      idParent: data.produto.idProdutoPai,
      brand: data.produto.marca,
      category: data.produto.categoria,
      class: data.produto.classe_produto,
      slug: data.produto.slug,
      image: data.produto.anexos[0]?.anexo,
    };

    await db.product.update({
      where: {
        id: produto.id,
      },
      data: produto,
    });
    await db.$disconnect();
    return produto;
  }

  return { erro: 'Não foi possivel acionar integração' };
}

export async function importProductTag(id: string) {
  const baseUrl = 'https://api.tiny.com.br/api2/produto.obter.tags';
  const url = `${baseUrl}?token=${env.TINY_TOKEN}&id=${id}&formato=json`;

  const response = await fetch(url, {
    method: 'POST',
  });

  const data = (await response.json()).retorno;

  if (data.status === 'OK') {
    for (const { tag } of data.produto.tags) {
      await db.productTags.upsert({
        where: {
          productTagId: {
            productId: data.produto.id,
            tagId: tag.id_tag,
          },
        },
        update: { productId: data.produto.id, tagId: tag.id_tag },
        create: { productId: data.produto.id, tagId: tag.id_tag },
      });
    }
    await db.$disconnect();
    return data.produto;
  }
  return { erro: 'Não foi possivel acionar integração' };
}
