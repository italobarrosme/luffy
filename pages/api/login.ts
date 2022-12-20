// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  user:{ 
    name: string,
    email: string,
    token: string,
  }
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ 
    user:{
        name: 'italo barros',
        email: req.body.email,
        token: 'opsdkopasopkdopaskdopkasdopkasopkdasopkdasopk',
    }
  })
}
