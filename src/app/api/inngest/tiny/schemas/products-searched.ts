export type ProductsSearched = {
  data: {
    query: string | null;
    cursor: string | null;
    active: 'S' | 'N' | null;
  };
};
