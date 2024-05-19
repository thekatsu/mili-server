export type UpsertPartnersProps = {
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
