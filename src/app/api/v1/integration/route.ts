import { fetchConfigIntegration } from '@/api/v1/integration/actions';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await fetchConfigIntegration();

  return Response.json({
    data,
  });
}
