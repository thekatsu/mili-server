import { fetchByIdConfigIntegration } from '@/app/api/v1/integration/config/actions';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const data = await fetchByIdConfigIntegration(params.id);

  return Response.json({
    data,
  });
}
