export type FetchProductTagsProps = {
  id: string;
};

interface FetchProductTagsBase {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
  };
}

type FetchProductTagsError = FetchProductTagsBase & {
  retorno: {
    status: 'Erro';
    codigo_erro: ErrorCodes;
    erros: {
      erro: string;
    }[];
  };
};

type FetchProductTagsSuccess = FetchProductTagsBase & {
  retorno: {
    status: 'OK';
    produto: {
      id: number;
      nome: string;
      codigo: string;
      tags: {
        tag: {
          id_tag: number;
          nome_tag: string;
        };
      }[];
    };
  };
};

export type FetchProductTagsResponse =
  | FetchProductTagsError
  | FetchProductTagsSuccess;
