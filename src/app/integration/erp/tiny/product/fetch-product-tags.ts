import { env } from 'process';
import {
  FetchProductTagsProps,
  FetchProductTagsResponse,
} from '@/app/integration/erp/tiny/product/fetch-product-tags-types';

export async function fetchProductTags({ id }: FetchProductTagsProps) {
  const url = `https://api.tiny.com.br/api2/produto.obter.tags?token=${env.TINY_TOKEN}&id=${id}&formato=json`;

  const response = await fetch(url, {
    method: 'POST',
  });

  const response_data: FetchProductTagsResponse = await response.json();
  const data = response_data.retorno;

  if (data.status !== 'OK') {
    throw new Error('Não foi realizar a consulta', {
      cause: `${data.codigo_erro}: ${data.erros[0].erro}`,
    });
  }
  const productTags = data.produto.tags.map(({ tag }) => ({
    productId: id.toString(),
    tagId: tag.id_tag.toString(),
  }));

  return productTags;
}
