// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetch } from '@/services/axios'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {

  const DepartamentsFetch = async (id: any) => {
    const response = await fetch({
      path: `/Departments(${id})`,
      headers: {
        Cookie: `B1SESSION=${req.cookies['B1SESSION']}`
      }
    })
  
    return res.json(response.data)
}
  
  const { id } = req.query

  return DepartamentsFetch(id)
}
