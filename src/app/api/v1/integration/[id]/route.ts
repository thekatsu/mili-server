import { fetchByIdConfigIntegration } from '@/api/v1/integration/actions';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const data = await fetchByIdConfigIntegration(params.id);

  return Response.json({
    data,
  });
}
