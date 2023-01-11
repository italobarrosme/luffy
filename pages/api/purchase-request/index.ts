// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetch } from '@/services/axios'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const PurchaseRequestsFetch = async (skip: any, orderby: any, filter?: any) => {
    
    const path = `/PurchaseRequests?%24select=DocEntry,DocNum,Cancelled,DocumentStatus,RequesterName,RequesterDepartment,Comments&$skip=${skip}&$orderby=${orderby}` + (filter ? `&$filter=${filter}` : '')

    const response = await fetch({
      path,
      headers: {
        Cookie: `B1SESSION=${req.cookies['B1SESSION']}`
      }
    }).catch((error) => {
      return res.status(error.response.status).json(error.response.data)
    })

    return res.status(200).json(response?.data)
    
  
  
}
const { skip, orderby, filter } = req.query

  return PurchaseRequestsFetch(skip, orderby, filter)
}
