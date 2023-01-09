// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetch } from '@/services/axios'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const PurchaseRequestsFetch = async () => {
    const response = await fetch({
      path: '/PurchaseRequests?$select=DocEntry,DocNum,Cancelled,DocumentStatus,RequesterName,RequesterDepartment,Comments',
      headers: {
        Cookie: `B1SESSION=${req.cookies['B1SESSION']}`
      }
    })
    
  
  return res.json(response.data)
}
  return PurchaseRequestsFetch()
}
