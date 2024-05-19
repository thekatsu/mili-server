export type FetchSearchProductsProps = {
  query?: string | null;
  situation?: 'A' | 'I' | 'E' | null;
  page?: number | null;
  tag_id?: number;
  list_price_id?: number;
  gtin?: string;
  creation_date?: Date;
};

interface SearchProductsBase {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    pagina: number;
    numero_paginas: number;
  };
}

type SearchProductsError = SearchProductsBase & {
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

type SearchProductsSuccess = SearchProductsBase & {
  retorno: {
    status: 'OK';
    produtos: {
      produto: {
        id: number;
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
      };
    }[];
  };
};

export type SearchProductsResponse =
  | SearchProductsError
  | SearchProductsSuccess;

export type Products = {
  id: string;
  name: string;
  code: string;
  price: number;
  unit: string;
  variationType: string;
  active: 'S' | 'N';
};
