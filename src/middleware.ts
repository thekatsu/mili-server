import { NextResponse, NextRequest } from 'next/server';

type RedirectEntry = {
  destination: '/cadastros';
  permanent: boolean;
};

export async function middleware(request: NextRequest) {
  const pathname: RedirectEntry['destination'] = request.nextUrl
    .pathname as RedirectEntry['destination'];

  const redirectData = {
    '/cadastros': {
      destination: '/cadastros/clientes',
      permanent: true,
    },
  };
  const url = request.nextUrl.clone();

  if (redirectData[pathname]) {
    const statusCode = redirectData[pathname].permanent ? 308 : 307;
    url.pathname = redirectData[pathname].destination;
    return NextResponse.redirect(url, statusCode);
  }

  // No redirect found, continue without redirecting
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/registrations/:path',
// };
