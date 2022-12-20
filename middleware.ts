import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {
  const cookie = req?.cookies.get('@ipog:accessToken')
  const { pathname } = req.nextUrl

  if (!cookie && pathname !== '/auth') {
    req.nextUrl.pathname = '/auth'
    return NextResponse.redirect(req.nextUrl)
  }

  return NextResponse.next()
}
export const config = {
  matcher: ['/purchase-order/:path*'],
}