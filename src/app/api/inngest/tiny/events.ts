import {
  PartnersSearched,
  ProductSearched,
  ProductsSearched,
  ProductsUpdated,
} from '@/app/api/inngest/tiny/schemas';

export type Events = {
  'tiny/partners.searched': PartnersSearched;
  'tiny/products.searched': ProductsSearched;
  'tiny/product.searched': ProductSearched;
  'tiny/products.updated': ProductsUpdated;
};
