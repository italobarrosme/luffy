// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetch } from '@/services/axios'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const PurchaseRequests = async (data: any) => {
    await fetch({
      path: `/PurchaseRequests`,
      headers: {
        Cookie: `B1SESSION=${req.cookies['B1SESSION']}`
      },
      method: "POST",
      data
    }).then((response) => {
      return res.status(200).json(response?.data)
    }).catch((error) => {
      return res.status(error.response.status).json(error.response.data)
    })

} 
  const { body } = req

  return PurchaseRequests(body)
}
