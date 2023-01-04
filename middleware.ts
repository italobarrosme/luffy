import { NextRequest, NextResponse,  } from 'next/server'


export default function middleware(req: NextRequest, res: NextResponse) {
  const cookie = req?.cookies.get('B1SESSION')

  const { pathname } = req.nextUrl

  if (!cookie && pathname !== '/auth') {
    
    req.nextUrl.pathname = '/auth'
    return NextResponse.redirect(req.nextUrl)
  }

  

  return NextResponse.next()
}
export const config = {
  matcher: ['/purchase-requests/:path*'],
}

