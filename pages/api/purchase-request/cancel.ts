// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetch } from '@/services/axios'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const PurchaseRequestsCancelFetch = async (id: any) => {
    const response = await fetch({
      path: `/PurchaseRequests(${id})/Cancel`,
      headers: {
        Cookie: `B1SESSION=${req.cookies['B1SESSION']}`
      }
    }).catch((error) => {
      return res.status(error.response.status).json(error.response.data)
    })
    
    return res.status(200).json(response)

}
  const { id } = req.query

  return PurchaseRequestsCancelFetch(id)
}
