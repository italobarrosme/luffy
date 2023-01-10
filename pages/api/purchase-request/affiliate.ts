// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetch } from '@/services/axios'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const AffiliateFetch = async () => {
    const response = await fetch({
      path: '/BusinessPlaces?$select=BPLID,BPLName',
      headers: {
        Cookie: `B1SESSION=${req.cookies['B1SESSION']}`
      }
    }).catch((error) => {
      return res.status(error.response.status).json(error.response.data)
    })

    return res.status(200).json(response?.data)
}
  return AffiliateFetch()
}
