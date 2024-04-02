import IntegrationForm from '@/components/integration-form';
import { Modal } from './modal';
import {
  fetchByIdConfigIntegration,
  updateConfigIntegration,
} from '@/app/api/v1/integration/actions';

export default async function Page({ params }: { params: { id: string } }) {
  const data = await fetchByIdConfigIntegration(params.id);

  const handleSubmit = async (data: any) => {
    'use server';

    const integration = await updateConfigIntegration(data);

    console.log('executa no servidor: ', integration);
    return true;
  };

  return (
    <Modal title="Editando" description="...">
      <IntegrationForm
        initialData={data ? data : undefined}
        onSubmitCb={handleSubmit}
      />
    </Modal>
  );
}
