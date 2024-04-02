import { fetchByIdConfigIntegration } from '@/app/api/v1/integration/actions';
import { FormEdit } from '@/app/setting/integration/[id]/edit/form-data';

export default async function Page({ params }: { params: { id: string } }) {
  const data = fetchByIdConfigIntegration(params.id);

  return (
    <div className="grid md:grid-cols-[50%_1fr]">
      <FormEdit formData={data} />
    </div>
  );
}
