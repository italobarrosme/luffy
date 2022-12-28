import { Pagination } from "@/useComponents/Pagination"
import { Table } from "@/useComponents/Table"
import { useEffect, useState } from "react"
import { getPurchaseRequests } from "@/services/purchase-order/usePurchaseOrder"

export const PurchaseOrderCase = () => {

  const headers = [
    {
      title: 'N° documento',
      fn: () => console.log('N° documento')
    },
    {
      title: 'Responsável',
      fn: () => console.log('Responsável')
    },
    {
      title: 'Departamento',
      fn: () => console.log('Departamento')
    },
    {
      title: 'Assunto',
      fn: () => console.log('Assunto')
    },
    {
      title: 'Status',
      fn: () => console.log('Status')
    },
    {
      title: 'Cancelado',
      fn: () => console.log('Cancelado')
    },
  ]

  const [purchaseRequests, setPurchaseRequests] = useState<any>([])

  useEffect(() => {
    const apiCall = async () => {
      const response = await getPurchaseRequests()
      setPurchaseRequests(response?.data.value)

      return response
    }

    apiCall()
    
  }, [])

  const adpterPurchaseRequests = purchaseRequests.map((purchaseRequest: any) => {
    return {
      cancelled: purchaseRequest?.Cancelled,
      docentry: purchaseRequest?.DocEntry,
      docnum: purchaseRequest?.DocNum,
      documentStatus: purchaseRequest?.DocumentStatus,
      requesterDepertment: purchaseRequest?.RequesterDepartment,
      requesterName: purchaseRequest?.RequesterName,
    }
  })


  return (
    <>
      <Table title={'Solicitação de Compra'} headerItems={headers}>
        {adpterPurchaseRequests?.map((purchaseRequest: any, index: any) => (
          <tr key={index} className="border-b border-gray-200 bg-gray-300">
            <td className="p-3 text-left">{purchaseRequest?.docnum}</td>
            <td className="p-3 text-left">{purchaseRequest?.requesterName}</td>
            <td className="p-3 text-left">{purchaseRequest?.requesterDepertment}</td>
            <td className="p-3 text-left">{purchaseRequest?.docentry}</td>
            <td className="p-3 text-left">{purchaseRequest?.documentStatus}</td>
            <td className="p-3 text-left">{purchaseRequest?.cancelled}</td>
          </tr>
        ), [])}
      </Table>
      <Pagination currentPage={1} totalPages={10} />
    </>
  )
}