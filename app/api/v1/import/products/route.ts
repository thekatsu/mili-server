import { awaitFor, dateFormat, sleep } from '@/app/api/utils';
import { db } from '@/app/database/db';
import { NextRequest, NextResponse } from 'next/server';

const BASE_TINE_URL = 'https://api.tiny.com.br/api2';

export async function GET(req: NextRequest, res: NextResponse) {
  const time_start = performance.now();
  const pesquisa = '';
  let paginas = 1;
  let products;

  for (let pagina = 1; pagina <= paginas; pagina++) {
    const block_start = performance.now();
    const httpResponse = await fetch(
      `${BASE_TINE_URL}/produtos.pesquisa.php?token=${process.env.TINY_TOKEN}&pesquisa=${pesquisa}&situacao=A&pagina=${pagina}&formato=json`,
      {
        method: 'POST',
      },
    );

    const responseBody = await httpResponse.json();

    if (responseBody.retorno.status_processamento !== '3')
      throw new Error('problema com a chamada');

    paginas = responseBody.retorno.numero_paginas || 0;

    products = responseBody.retorno.produtos || [];

    for (const pro of products) {
      const product = pro.produto;

      await db.product.create({
        data: {
          id: product.id,
          creationDate: dateFormat(product.data_criacao),
          name: product.nome,
          code: product.codigo,
          price: product.preco,
          promocionalPrice: product.preco_promocional,
          unit: product.unidade,
          gtin: product.gtin,
          variationType: product.tipoVariacao,
          location: product.localizacao,
          costPrice: product.preco_custo,
          averageCostPrice: product.preco_custo_medio,
          situation: product.situacao,
          ncm: product.ncm,
          origin: product.origem,
          gtinPackaging: product.gtin_embalagem,
          netWeight: product.peso_liquido,
          grossWeight: product.peso_bruto,
          minimumStock: product.estoque_minimo,
          maximumStock: product.estoque_maximo,
          unitsPerBox: product.unidade_por_caixa,
          type: product.tipo,
          IPIClass: product.classe_ipi,
          fixedIPIValue: product.valor_ipi_fixo,
          codeListService: product.cod_lista_servicos,
          additionalDescription: product.descricao_complementar,
          note: product.obs,
          guarantee: product.garantia,
          cest: product.cest,
          idParent: product.idProdutoPai,
          brand: product.marca,
          packagingType: product.tipoEmbalagem,
          packagingHeight: product.alturaEmbalagem,
          packagingWidth: product.larguraEmbalagem,
          packagingLength: product.comprimentoEmbalagem,
          packagingDiameter: product.diametroEmbalagem,
          category: product.categoria,
          class: product.classe_produto,
          seoTitle: product.seo_title,
          seoDescription: product.seo_description,
          seoKeywords: product.seo_keywords,
          linkVideo: product.link_video,
          slug: product.slug,
        },
      });
    }
    const block_end = performance.now();
    await awaitFor(block_end - block_start, 550);
  }

  db.$disconnect();

  const total_elapsed_time = performance.now() - time_start;

  return await Response.json({
    message: 'OK',
    total_elapsed_time,
  });
}
