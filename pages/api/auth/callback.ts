import { setCookie } from 'nookies'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'

type SessionAndToken = (Session & { accessToken?: string, sessionTimeout?: any}) | null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: SessionAndToken = await getSession({ req })

  if (session?.accessToken) {
    setCookie({ res }, 'B1SESSION', session.accessToken, {
      path: '/',
    })

    setCookie({ res }, 'SESSION_TIMEOUT', session.sessionTimeout , {
      path: '/',
    })
    
  }

  return res.redirect('/')
}