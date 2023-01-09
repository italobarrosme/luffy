import { useNoAuthorized } from "@/hooks/useNoAuthorized"
import { getPurchaseRequestsDetails } from "@/services/purchase-request/usePurchaseRequest"
import { useStoreListToast } from "@/store/useStoreListToast"
import { useStoreLoading } from "@/store/useStoreLoading"
import { Table } from "@/useComponents/Table"
import { InputDate } from "@/usePieces/InputDate"
import { InputText } from "@/usePieces/InputText"

import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export const DetailsPurchaseRequestCase = () => {

  const router = useRouter()
  const { id } = router.query

  const { addToast } = useStoreListToast()
  const [detailsPurchaseRequest, setDetailsPurchaseRequest] = useState<any>()

  const { setLoading, store } = useStoreLoading()

  const headers = [
    {
      title: 'Codigo',
      fn: () => console.log('Codigo')
    },
    {
      title: 'Item',
      fn: () => console.log('Item')
    },
    {
      title: 'Descrição do item',
      fn: () => console.log('Descrição do item')
    },
    {
      title: 'Quantidade',
      fn: () => console.log('Quantidade')
    },
    {
      title: 'Centro de Custo 1',
      fn: () => console.log('Cancelado')
    },
    {
      title: 'Centro de Custo 2',
      fn: () => console.log('Cancelado')
    },
    {
      title: 'Projeto',
      fn: () => console.log('Projeto')
    },
  ]


  const filterData = (date: any) => {
    return date.split('T')[0]
  }

  const GET_PURCHASE_REQUEST_DETAILS = (id: any) => {
    
    getPurchaseRequestsDetails(id).then((response) => {
      setLoading(true)

      const adpterPurchaseRequestsDetails = {
          affiliate: response.data?.BPLName,
          cancelled: response.data?.Cancelled,
          docentry: response.data?.DocEntry,
          docnum: response.data?.DocNum,
          documentStatus: response.data?.DocumentStatus,
          requesterDepertment: response.data?.RequesterDepartment,
          requesterName: response.data?.RequesterName,
          documentLines: response.data?.DocumentLines,
          docDueDate: response.data?.DocDueDate,
          docDate: response.data?.DocDate,
          requriedDate: response.data?.RequriedDate,
          taxDate: response.data?.TaxDate,

      }
      
      console.log(store, 'store')

      setDetailsPurchaseRequest(adpterPurchaseRequestsDetails)
      
      return response
    }).catch((error) => {
      const { status: responseStatus, statusText } = error.response

      addToast({
        type: 'error',
        title: `Error ${responseStatus}`,
        message: `Erro ao buscar solicitações de compra, ${statusText}`,
        duration: 8000
      })

      useNoAuthorized(responseStatus)
    }).finally(() => {
      setLoading(false)
    })
  }

  
  
  

  useEffect(() => {
    if (id) {
      GET_PURCHASE_REQUEST_DETAILS(id)
    }
  }, [id])



  return (
    <>
      {detailsPurchaseRequest ? <div>
      <h2 className="text-2xl font-semibold leading-tight w-full my-4">Detalhe da solicitação de compra</h2>
        <div className="flex flex-col bg-brand-primary p-8 rounded-lg gap-4 text-white">
          <h2 className="text-lg font-semibold leading-tight w-full mb-4">
            Dados para solicitação
          </h2>
          <div className="flex items-center gap-4">
            <InputText label="Solicitante" name={'requesterName'} value={detailsPurchaseRequest.requesterName} readOnly   />
            <InputText label="Departamento" name={'departament'} value={detailsPurchaseRequest.requesterDepertment} readOnly />
            <InputText label="Filial" name={'fileia'} value={detailsPurchaseRequest.affiliate} readOnly />
          </div>
          <div className="flex items-center gap-4">
            <InputDate label="Data de Lançamento" name={'TaxDate'} value={filterData(detailsPurchaseRequest.taxDate)} readOnly/>
            <InputDate label="Valida Ate" name={'DocDueDate'} value={filterData(detailsPurchaseRequest.docDueDate)}  readOnly/>
            <InputDate label="Data do Documento" name={'DocDate'}  value={filterData(detailsPurchaseRequest.docDate)}  readOnly />
          </div>
          <div className="flex items-center gap-4">
            <InputDate label="Data Necessaria" name={'RequriedDate'} value={filterData(detailsPurchaseRequest.requriedDate)} readOnly  />
          </div>
          <div className="flex items-center gap-4">
            <InputText label="Observações" name={'Comments'} value={detailsPurchaseRequest.Comments}  readOnly/>
          </div>
        </div>
        <div className="mt-4">
          <Table title={'Itens para solicitação de compra'} headerItems={headers}>
          {detailsPurchaseRequest.documentLines ? detailsPurchaseRequest.documentLines?.map((itemsRequest: any, index: any) => (
            <tr key={index} className="border-b border-gray-200 bg-gray-300">
              <td className="p-3 text-left">
              {itemsRequest.ItemCode}
              </td>
              <td className="p-3 text-left" >
                {itemsRequest.Item || 'Nome não retornado'}
              </td>
              <td className="p-3 text-left">
                {itemsRequest.ItemDescription}
              </td>
              <td className="p-3 text-left">
                {itemsRequest.Quantity}
              </td>
              <td className="p-3 text-left">
                {itemsRequest.CostingCode}
              </td>
              <td className="p-3 text-left">
                {itemsRequest.CostingCode2}
              </td>
              <td className="p-3 text-left">
                {itemsRequest.ProjectCode}
              </td>
            </tr>
          ), []): null}

          {detailsPurchaseRequest.itemsRequest?.length === 0 ? (
            <tr className="border-b border-gray-200 bg-gray-300">
              <td className="p-3 text-left" colSpan={8}>Nenhum registro encontrado</td>
            </tr>
          ): null}
        </Table>
      </div>
      </div>: null}
    </>
  )
}