import { env } from 'process';
import {
  FetchSearchProductsProps,
  Products,
  SearchProductsResponse,
} from './search-products-types';

export async function searchProducts({
  query = '',
  situation = 'A',
  page = 1,
  tag_id,
  list_price_id,
  gtin,
  creation_date,
}: FetchSearchProductsProps) {
  let url = `https://api.tiny.com.br/api2/produtos.pesquisa.php?token=${env.TINY_TOKEN}`;

  url += query ? `&pesquisa=${query}` : '&pesquisa=';
  url += `&situacao=${situation}`;
  url += tag_id ? `&idTag=${tag_id}` : '';
  url += list_price_id ? `&idListaPreco=${list_price_id}` : '';
  url += gtin ? `&gtin=${gtin}` : '';
  url += creation_date ? `&dataCriacao=${creation_date.toDateString()}` : '';
  url += `&pagina=${page}`;
  url += '&formato=json';

  const response = await fetch(url, { method: 'POST' });
  const response_data: SearchProductsResponse = await response.json();
  const data = response_data.retorno;

  if (data.status !== 'OK') {
    throw new Error('Não foi realizar a consulta', {
      cause: `${data.codigo_erro}: ${data.erros[0].erro}`,
    });
  }

  const total_pages = data.numero_paginas;

  const products: Products[] = data.produtos.map(({ produto }) => ({
    id: produto.id.toString(),
    name: produto.nome,
    code: produto.codigo,
    price: produto.preco,
    unit: produto.unidade,
    variationType: produto.tipoVariacao,
    active: produto.situacao === 'A' ? 'S' : 'N',
  }));

  return {
    page,
    total_pages,
    products,
  };
}
