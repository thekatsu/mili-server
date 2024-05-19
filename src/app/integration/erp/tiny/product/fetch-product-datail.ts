import { env } from 'process';
import {
  FetchProductDetailProps,
  FetchProductDetailResponse,
} from '@/app/integration/erp/tiny/product/fetch-product-datail-types';

export async function fetchProductDetail({ id }: FetchProductDetailProps) {
  const url = `https://api.tiny.com.br/api2/produto.obter.php?token=${env.TINY_TOKEN}&id=${id}&formato=json`;

  const response = await fetch(url, {
    method: 'POST',
  });

  const response_data: FetchProductDetailResponse = await response.json();
  const data = response_data.retorno;

  if (data.status !== 'OK') {
    throw new Error('Não foi realizar a consulta', {
      cause: `${data.codigo_erro}: ${data.erros[0].erro}`,
    });
  }
  const product = {
    id: data.produto.id.toString(),
    type: data.produto.tipo,
    idParent: data.produto.idProdutoPai.toString(),
    brand: data.produto.marca,
    category: data.produto.categoria,
    class: data.produto.classe_produto,
    slug: data.produto.slug,
    image: data.produto.anexos[0]?.anexo,
  };

  return product;
}
