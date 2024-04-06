import { Card } from '@/app/components/import/card';

import {
  startProductImport,
  startTagGroupImport,
  startTagImport,
} from '@/app/actions';

export default async function Index() {
  return (
    <>
      <Card
        title="Importa Produto"
        action={startProductImport}
        endpointProgress="/api/v1/integration/progress/products"
      />

      <Card
        title="Importa Grupos de Tag"
        action={startTagGroupImport}
        endpointProgress="/api/v1/integration/progress/tag-groups"
      />

      <Card
        title="Importa Tags"
        action={startTagImport}
        endpointProgress="/api/v1/integration/progress/tags"
      />
    </>
  );
}
