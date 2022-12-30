import { Pagination } from "@/useComponents/Pagination"
import { Table } from "@/useComponents/Table"
import { useEffect, useState } from "react"
import { getPurchaseRequests } from "@/services/purchase-order/usePurchaseOrder"
import { useRouter } from "next/router"
import { useNoAuthorized } from "@/hooks/useNoAuthorized"
import { Button } from "@/usePieces/Button"

export const PurchaseOrderCase = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const [purchaseRequests, setPurchaseRequests] = useState<any>([])

  const GET_PURCHASEREQUESTS = async () => {
    await getPurchaseRequests().then((response) => {

      const adpterPurchaseRequests = response.data.value.map((purchaseRequest: any) => {
        return {
          cancelled: purchaseRequest?.Cancelled,
          docentry: purchaseRequest?.DocEntry,
          docnum: purchaseRequest?.DocNum,
          documentStatus: purchaseRequest?.DocumentStatus,
          requesterDepertment: purchaseRequest?.RequesterDepartment,
          requesterName: purchaseRequest?.RequesterName,
        }
      })

      setPurchaseRequests(adpterPurchaseRequests)
      
      return response
    }).catch((error) => {

      const { status: responseStatus } = error.response
      
      useNoAuthorized(responseStatus)
    })
    
  }

  const router = useRouter()

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
    {
      title: 'Ações',
      fn: () => console.log('Cancelado')
    },
  ]

  

  useEffect(() => {
    GET_PURCHASEREQUESTS()
    
  }, [])

  const handlerDetailsDocument = (docentry: any) => {
    alert('Clicou no botão de detalhes')
  }

  const handleCurrentPage = (currentPage: number) => {
    setCurrentPage(currentPage)
  }

  const onChangeSearch = (event: any) => {
    const { value } = event.target

    if (value) {
      const filterPurchaseRequests = purchaseRequests.filter((purchaseRequest: any) => {
        return purchaseRequest?.docnum === Number(value)
      })

      setPurchaseRequests(filterPurchaseRequests)
    }

    if (!value) {
      GET_PURCHASEREQUESTS()
    }
  }


  return (
    <>
      <Table title={'Solicitação de Compra'} headerItems={headers} onChangeSearch={onChangeSearch}>
        {purchaseRequests ? purchaseRequests?.map((purchaseRequest: any, index: any) => (
          <tr key={index} className="border-b border-gray-200 bg-gray-300">
            <td className="p-3 flex items-center gap-2">
              <span className="cursor-pointer hover:underline" onClick={(ev) => handlerDetailsDocument(ev)}>{purchaseRequest?.docnum}</span>
            </td>
            <td className="p-3 text-left" >
              {purchaseRequest?.requesterName}
            </td>
            <td className="p-3 text-left">
              {purchaseRequest?.requesterDepertment}
            </td>
            <td className="p-3 text-left">
              {purchaseRequest?.docentry}
            </td>
            <td className="p-3 text-left">
              {purchaseRequest?.documentStatus}
            </td>
            <td className="p-3 text-left">
              {purchaseRequest?.cancelled}
            </td>
            <td className="p-3 text-left">
              <Button label="action" onClick={() => alert(`Clicou na action da linha ${index}`)} />
            </td>
          </tr>
        ), []): null}

        {purchaseRequests.length === 0 ? (
          <tr className="border-b border-gray-200 bg-gray-300">
            <td className="p-3 text-left" colSpan={7}>Nenhum registro encontrado</td>
          </tr>
        ): null}
      </Table>
      <Pagination currentPage={currentPage} totalPages={10} onChangePage={handleCurrentPage} />
    </>
  )
}