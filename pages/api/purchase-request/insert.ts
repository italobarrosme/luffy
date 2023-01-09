// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetch } from '@/services/axios'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const PurchaseRequests = async (data: any) => {
    const response = await fetch({
      path: `/PurchaseRequests`,
      headers: {
        Cookie: `B1SESSION=${req.cookies['B1SESSION']}`
      },
      method: "POST",
      data
    })
    try {
      return res.status(200).json(response.data)
    } catch (error) {
      return res.status(400).json({ error })
    }

} 
  const { body } = req

  return PurchaseRequests(body)
}
