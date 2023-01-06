// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetch } from '@/services/axios'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const usePurchaseRequestsDetailsFetch = async (id: any) => {
    const response = await fetch({
      path: `/PurchaseRequests(${id})`,
      headers: {
        Cookie: `B1SESSION=${req.cookies['B1SESSION']}`
      }
    })
   // return error if response is not ok
    if (response.status !== 200) {
      return res.status(response.status).json(response.data)
    }

    return res.status(200).json(response.data)

}
  const { id } = req.query

  return usePurchaseRequestsDetailsFetch(id)
}
