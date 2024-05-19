export type FetchProductDetailProps = {
  id: string;
};

interface FetchProductDetailBase {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
  };
}

type FetchProductDetailError = FetchProductDetailBase & {
  retorno: {
    status: 'Erro';
    codigo_erro: ErrorCodes;
    erros: {
      erro: string;
    }[];
  };
};

type FetchProductDetailSuccess = FetchProductDetailBase & {
  retorno: {
    status: 'OK';
    produto: {
      id: number;
      tipo: string;
      idProdutoPai: number;
      marca: string;
      categoria: string;
      classe_produto: string;
      slug: string;
      anexos: {
        anexo: string;
      }[];
    };
  };
};

export type FetchProductDetailResponse =
  | FetchProductDetailError
  | FetchProductDetailSuccess;
