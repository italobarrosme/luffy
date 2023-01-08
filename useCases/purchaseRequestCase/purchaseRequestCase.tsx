import { Pagination } from "@/useComponents/Pagination"
import { Table } from "@/useComponents/Table"
import { useEffect, useState } from "react"
import { getPurchaseRequests, postPurchaseRequestsCancel  } from "@/services/purchase-request/usePurchaseRequest"
import { formatDepartament, formatStatus, formatCanceled } from '@/utils/formatData'

import { useNoAuthorized } from "@/hooks/useNoAuthorized"
import { ButtonIcon } from "@/usePieces/ButtonIcon"
import { useStoreListToast } from "@/store/useStoreListToast"
import { useRouter } from "next/router"
import { useStoreLoading } from "@/store/useStoreLoading"

export const PurchaseRequestCase = () => {

  const router = useRouter()

  const { addToast } = useStoreListToast()
  const { setLoading } = useStoreLoading()
  const [currentPage, setCurrentPage] = useState(1)
  const [purchaseRequests, setPurchaseRequests] = useState<any>([])

  const GET_PURCHASEREQUESTS = () => {
    getPurchaseRequests().then((response) => {
      setLoading(true)
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

  const POST_PURCHASEREQUESTS_CANCEL = (docentry: any) => {
    postPurchaseRequestsCancel(docentry).then((response) => {
      setLoading(true)

      if (response.status === 204) {
        addToast({
          type: 'success',
          title: `Solicitação de compra`,
          message: `Solicitação de compra cancelada com sucesso`,
          duration: 8000
        })
  
        GET_PURCHASEREQUESTS()
      }
    }).catch((error) => {
      const { status: responseStatus, statusText } = error.response

      addToast({
        type: 'error',
        title: `Error ${responseStatus}`,
        message: `Erro ao cancelar solicitação de compra, ${statusText}`,
        duration: 8000
      })

      useNoAuthorized(responseStatus)
    }).finally(() => {
      setLoading(false)
    })
  }

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

  const handleInsertPurchaseRequest = () => {
    router.push('/purchase-request/insert-purchase-request')
  }

  const handlerDetailsPurchaseRequest = (id: any) => {
    router.push({
      pathname: '/purchase-request/details-purchase-request',
      query: { id: id }
    })
  }

  const handleDeletePurchaseRequest = (id: any) => {
    POST_PURCHASEREQUESTS_CANCEL(id)
  }



  return (
    <>
      <Table title={'Solicitação de Compra'} headerItems={headers} onChangeSearch={onChangeSearch} actionHeadButton={handleInsertPurchaseRequest} labelButtonHeader={'Inserir Solicitação'} >
        {purchaseRequests ? purchaseRequests?.map((purchaseRequest: any, index: any) => (
          <tr key={index} className="border-b border-gray-200 bg-gray-300">
            <td className="p-3 flex items-center gap-2">
              <span>{purchaseRequest?.docnum}</span>
            </td>
            <td className="p-3 text-left" >
              {purchaseRequest?.requesterName}
            </td>
            <td className="p-3 text-left">
              {formatDepartament(purchaseRequest?.requesterDepertment)}
            </td>
            <td className="p-3 text-left">
              {purchaseRequest?.docentry}
            </td>
            <td className="p-3 text-left">
              {formatStatus(purchaseRequest?.documentStatus)}
            </td>
            <td className="p-3 text-left">
              {formatCanceled(purchaseRequest?.cancelled)}
            </td>
            <td className="p-3 text-left flex gap-5">
              <ButtonIcon  icon="uil:trash-alt" onClick={() => handleDeletePurchaseRequest(purchaseRequest?.docentry)} />
              <ButtonIcon  icon="icon-park-outline:doc-detail" onClick={() => handlerDetailsPurchaseRequest(purchaseRequest?.docentry)} />
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