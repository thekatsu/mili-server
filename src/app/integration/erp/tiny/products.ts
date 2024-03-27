import { db } from '@/db';

const REQUEST_PER_MINUTE = 30;

type Response = {
  retorno: {
    status_processamento: string;
    status: string;
    pagina?: number;
    numero_paginas?: number;
    produtos?: {
      produto: {
        id: string;
        data_criacao: string;
        nome: string;
        codigo: string;
        preco: number;
        preco_promocional: number;
        unidade: string;
        gtin: string;
        tipoVariacao: string;
        localizacao: string;
        preco_custo: number;
        preco_custo_medio: number;
        situacao: string;
        ncm?: string;
        origem?: string;
        gtin_embalagem?: string;
        peso_liquido?: number;
        peso_bruto?: number;
        estoque_minimo?: number;
        estoque_maximo?: number;
        unidade_por_caixa?: string;
        tipo?: string;
        classe_ipi?: string;
        valor_ipi_fixo?: number;
        cod_lista_servicos?: string;
        descricao_complementar?: string;
        obs?: string;
        garantia?: string;
        cest?: string;
        idProdutoPai?: number;
        sob_encomenda: string;
        marca?: string;
        tipoEmbalagem?: number;
        alturaEmbalagem?: number;
        larguraEmbalagem?: number;
        comprimentoEmbalagem?: number;
        diametroEmbalagem?: number;
        categoria?: string;
        classe_produto?: string;
        seo_title?: string;
        seo_description?: string;
        seo_keywords?: string;
        link_video?: string;
        slug?: string;
      };
    }[];
    codigo_erro?: Number;
    erros?: {
      erro: String;
    }[];
  };
};

export async function getProductsInfo() {
  const token = '3e534d3b2f9fa470a4e7004216d2861118fbe485';
  const products = await db.product.findMany({ select: { id: true } });

  for (const product of products) {
    const timeStart = performance.now();

    const httpResponse = await fetch(
      `https://api.tiny.com.br/api2/produto.obter.php?token=${token}&id=${product.id}&formato=json`,
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
    const prod = responseBody.retorno.produto;
    const data = {
      ncm: prod.ncm,
      origin: prod.origem,
      gtinPackaging: prod.gtin_embalagem,
      netWeight: prod.peso_liquido,
      grossWeight: prod.peso_bruto,
      minimumStock: prod.estoque_minimo,
      maximumStock: prod.estoque_maximo,
      unitsPerBox: prod.unidade_por_caixa,
      type: prod.tipo,
      IPIClass: prod.classe_ipi,
      fixedIPIValue: prod.valor_ipi_fixo,
      codeListService: prod.cod_lista_servicos,
      additionalDescription: prod.descricao_complementar,
      note: prod.obs,
      guarantee: prod.garantia,
      cest: prod.cest,
      idParent: parseInt(prod.idProdutoPai),
      brand: prod.marca,
      packagingType: parseInt(prod.tipoEmbalagem),
      packagingHeight: prod.alturaEmbalagem,
      packagingWidth: prod.larguraEmbalagem,
      packagingLength: prod.comprimentoEmbalagem,
      packagingDiameter: prod.diametroEmbalagem,
      category: prod.categoria,
      class: prod.classe_produto,
      seoTitle: prod.seo_title,
      seoDescription: prod.seo_description,
      seoKeywords: prod.seo_keywords,
      linkVideo: prod.link_video,
      slug: prod.slug,
    };

    console.log(`processando produto: ${product.id}`);

    await db.product.update({
      where: {
        id: product.id,
      },
      data: data,
    });

    const elapsedTime = parseInt((performance.now() - timeStart).toFixed(0));
    const windowTime = (60 / REQUEST_PER_MINUTE) * 1000;

    console.log(`windowTime: ${windowTime} - elapsedTime: ${elapsedTime}`);

    if (elapsedTime < windowTime) {
      const time = parseInt((windowTime - elapsedTime + 50).toFixed(0));
      console.log(`esperar por ${time}ms`);
      await sleep(time);
    }
  }
  db.$disconnect();
}

export async function getProducts() {
  const token = '3e534d3b2f9fa470a4e7004216d2861118fbe485';
  const pesquisa = '';
  let paginas = 1;
  let products;

  for (let pagina = 1; pagina <= paginas; pagina++) {
    const httpResponse = await fetch(
      `https://api.tiny.com.br/api2/produtos.pesquisa.php?token=${token}&pesquisa=${pesquisa}&situacao=A&pagina=${pagina}&formato=json`,
      {
        method: 'POST',
      },
    );

    const responseBody: Response = await httpResponse.json();

    if (responseBody.retorno.status_processamento !== '3') return [];

    paginas = responseBody.retorno.numero_paginas || 0;

    products = responseBody.retorno.produtos || [];

    for (const pro of products) {
      const product = pro.produto;
      let formattedDate = null;
      if (product.data_criacao) {
        const [data, horario] = product.data_criacao?.split(' ');
        const [dia, mes, ano] = data.split('/');
        formattedDate = new Date(`${ano}-${mes}-${dia}T${horario}.0000`);
      }

      await db.product.create({
        data: {
          id: product.id,
          creationDate: formattedDate,
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
    console.timeEnd('dbsave');
  }

  db.$disconnect();

  return products;
}

export async function getChangedProducts() {
  const token = '3e534d3b2f9fa470a4e7004216d2861118fbe485';
  const date = new Date(Date.UTC(2024, 3, 2, 0, 0, 0));
  const dataAlteracao = date.toLocaleString('pt-BR').replace(',', '');

  let paginas = 1;
  let products;

  for (let pagina = 1; pagina <= paginas; pagina++) {
    const httpResponse = await fetch(
      `https://api.tiny.com.br/api2/lista.atualizacoes.produtos?token=${token}&dataAlteracao=${dataAlteracao}&pagina=${pagina}&formato=json`,
      {
        method: 'POST',
      },
    );

    const responseBody: Response = await httpResponse.json();

    if (responseBody.retorno.status_processamento !== '3') return [];

    paginas = responseBody.retorno.numero_paginas || 0;

    products = responseBody.retorno.produtos || [];

    for (const pro of products) {
      const product = pro.produto;
      let formattedDate = null;
      if (product.data_criacao) {
        const [data, horario] = product.data_criacao?.split(' ');
        const [dia, mes, ano] = data.split('/');
        formattedDate = new Date(`${ano}-${mes}-${dia}T${horario}.0000`);
      }

      // await db.product.create({
      //   data: {
      //     id: parseInt(product.id),
      //     creationDate: formattedDate,
      //     name: product.nome,
      //     code: product.codigo,
      //     price: product.preco,
      //     promocionalPrice: product.preco_promocional,
      //     unit: product.unidade,
      //     gtin: product.gtin,
      //     variationType: product.tipoVariacao,
      //     location: product.localizacao,
      //     costPrice: product.preco_custo,
      //     averageCostPrice: product.preco_custo_medio,
      //     situation: product.situacao,
      //   },
      // });
    }
  }

  db.$disconnect();

  return products;
}

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
