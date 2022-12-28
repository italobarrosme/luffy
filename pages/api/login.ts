// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetch } from '@/services/axios'

type Data = {
    ['Version']: string,
    SessionId: string,
    SessionTimeout: number,
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const useFetch = async () => {
    const { user, pass } = req.body

  console.log(user, 'user')
  console.log(pass, 'password')

  const response = await fetch({
    method: 'POST',
    path: '/Login',
    data: {
      UserName: user,
      Password: pass,
      CompanyDB: 'SBOIPOGTESTE',
      Language: 29

    },
  })

  if (response.data.error) {
    throw new Error(response.data.error);
  }

  return res.status(200).json(response.data)
}

useFetch()

}
