import { createConfigIntegration } from '@/app/api/v1/integration/config/actions';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await createConfigIntegration({
    name: 'Teste',
    description: 'Teste',
    baseUrl: 'https://tiny.com.br/api/v1',
    requestPerMinute: 30,
    token: '',
    type: 'SOAP',
    params: '',
  });

  return Response.json({
    data,
  });
}