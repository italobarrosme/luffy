import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export const middleware = async (req: NextRequest) => {
  const session = await getToken({ req, secret: process.env.SECRET! })

  if (!session) {
    return new Response("Auth requred", {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Bsic realm="Secure Area"',
      },
    })
  }

  return NextResponse.next();
}
