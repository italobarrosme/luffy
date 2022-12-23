// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetch } from '@/services/axios'

type Data = {
  user:{ 
    ['Version']: string,
    SessionId: string,
    SessionTimeout: number,
  }
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const { user, pass } = req.body

  console.log(user, 'user')
  console.log(pass, 'password')

  const response = fetch({
    method: 'POST',
    path: '/Login',
    data: {
      UserName: user,
      Password: pass,
      CompanyDB: 'SBOIPOGTESTE',
      Language: 29

    },
  })

  console.log(response)



  
}
