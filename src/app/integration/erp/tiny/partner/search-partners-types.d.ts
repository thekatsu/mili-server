export type FetchSearchPartnersProps = {
  query?: string | null;
  situation?: string | null;
  page?: number | null;
  cpf_cnpj?: string | null;
  idVendedor?: number | null;
  nomeVendedor?: string | null;
  dataCriacao?: Date | null;
  dataMinimaAtualizacao?: Date | null;
};

interface SearchPartnersBase {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    pagina: number;
    numero_paginas: number;
  };
}

type SearchPartnersError = SearchPartnersBase & {
  retorno: {
    status_processamento: number;
    status: 'Erro';
    pagina: number;
    numero_paginas: number;
    codigo_erro: ErrorCodes;
    erros: {
      erro: string;
    }[];
  };
};

type SearchPartnersSuccess = SearchPartnersBase & {
  retorno: {
    status: 'OK';
    contatos: {
      contato: {
        id: string;
        codigo: string;
        nome: string;
        fantasia: string;
        tipo_pessoa: string;
        cpf_cnpj: string;
        endereco: string;
        numero: string;
        complemento: string;
        bairro: string;
        cep: string;
        cidade: string;
        uf: string;
        email: string;
        fone: string;
        id_lista_preco: number;
        id_vendedor: number;
        nome_vendedor: string;
        situacao: string;
        data_criacao: string;
      };
    }[];
  };
};

export type SearchPartnersResponse =
  | SearchPartnersError
  | SearchPartnersSuccess;

export type Partner = {
  id: string;
  code: string;
  name: string;
  nickname: string;
  type: string;
  taxID: string;
  email: string;
  phone: string;
  idSeller: number | null;
  sellerName: string;
  active: string;
  createdAt: Date;
  updatedAt: Date;
};
