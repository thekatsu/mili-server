import { env } from 'process';
import {
  FetchSearchPartnersProps,
  Partner,
  SearchPartnersResponse,
} from './search-partners-types';

export async function searchPartners({
  query = '',
  situation = 'Ativo',
  page = 1,
  cpf_cnpj,
  idVendedor,
  nomeVendedor,
  dataCriacao,
  dataMinimaAtualizacao,
}: FetchSearchPartnersProps) {
  let url = `https://api.tiny.com.br/api2/contatos.pesquisa.php?token=${env.TINY_TOKEN}`;

  url += query ? `&pesquisa=${query}` : '&pesquisa=';
  url += `&situacao=${situation}`;
  url += cpf_cnpj ? `&cpf_cnpj=${cpf_cnpj}` : '';
  url += idVendedor ? `&idVendedor=${idVendedor}` : '';
  url += nomeVendedor ? `&nomeVendedor=${nomeVendedor}` : '';
  url += dataCriacao ? `&dataCriacao=${dataCriacao}` : '';
  url += dataMinimaAtualizacao
    ? `&dataMinimaAtualizacao=${dataMinimaAtualizacao}`
    : '';
  url += `&pagina=${page}`;
  url += '&formato=json';

  const response = await fetch(url, { method: 'POST' });
  const response_data: SearchPartnersResponse = await response.json();
  const data = response_data.retorno;

  if (data.status !== 'OK') {
    throw new Error('Não foi realizar a consulta', {
      cause: `${data.codigo_erro}: ${data.erros[0].erro}`,
    });
  }

  const total_pages = data.numero_paginas;

  const partners: Partner[] = data.contatos.map(({ contato }) => {
    let createdAt = new Date();

    if (contato.data_criacao) {
      const [date, hours] = contato.data_criacao.split(' ');
      const [day, month, year] = date.split('/');
      const [hour, minute, second] = hours.split(':');
      createdAt = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hour),
        parseInt(minute),
        parseInt(second),
      );
    }

    return {
      id: contato.id.toString(),
      code: contato.codigo,
      name: contato.nome,
      nickname: contato.fantasia ? contato.fantasia : contato.nome,
      type: contato.tipo_pessoa,
      taxID: contato.cpf_cnpj,
      email: contato.email,
      phone: contato.fone,
      idSeller: contato.id_vendedor
        ? parseInt(contato.id_vendedor.toString())
        : null,
      sellerName: contato.nome_vendedor,
      active: contato.situacao,
      createdAt: createdAt,
      updatedAt: new Date(),
    };
  });

  return {
    page,
    total_pages,
    partners,
  };
}
