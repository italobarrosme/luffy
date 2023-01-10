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
  const [isPagination, setIsPagination] = useState(false)
  const [orderby, setOrderby] = useState('DocEntry asc')

  const GET_PURCHASEREQUESTS = ({
    skip,
    orderby
  }: any) => {
    getPurchaseRequests(skip, orderby).then((response) => {
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

      if (!!!response.data['@odata.nextLink']) {
        setIsPagination(true)
      } else {
        setIsPagination(false)
      }
      
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

      if (response.status === 200) {
        addToast({
          type: 'success',
          title: `Solicitação de compra`,
          message: `Solicitação de compra cancelada com sucesso`,
          duration: 8000
        })
  
        handleCurrentPage(1)
      }
    }).catch((error) => {
      const { status: responseStatus, data  } = error.response

      addToast({
        type: 'error',
        title: `Error ${responseStatus}`,
        message: `Erro ao cancelar solicitação de compra, ${data?.error?.message}`,
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
      fn: () => {
        setOrderby('DocNum desc')

        handleCurrentPage(1)
      }
    },
    {
      title: 'Responsável',
      fn: () => {
        setOrderby('RequesterName asc')
        
        handleCurrentPage(1)
      }
    },
    {
      title: 'Departamento',
      fn: () => {
        setOrderby('RequesterDepartment desc')

        handleCurrentPage(1)
      }
    },
    {
      title: 'Assunto',
    },
    {
      title: 'Status',
    },
    {
      title: 'Cancelado',
      fn: () => {
        setOrderby('Cancelled desc')

        handleCurrentPage(1)
      }
    },
    {
      title: 'Ações',
      fn: () => {
        setOrderby('DocEntry asc')

        handleCurrentPage(1)
      }
    },
  ]


  useEffect(() => {
    GET_PURCHASEREQUESTS({
      skip: 0,
      orderby: orderby
    })
    
  }, [orderby])

  const handleCurrentPage = (currentPage: number) => {
    setCurrentPage(currentPage)

    if (currentPage === 1) {
      GET_PURCHASEREQUESTS({
        skip: 0,
        orderby: orderby
      })
    }

    if (currentPage > 1) {
      GET_PURCHASEREQUESTS({
        skip: (currentPage - 1) * 10,
        orderby: orderby
      })
    }
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
      handleCurrentPage(1)
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
      <Pagination isNextPage={isPagination} currentPage={currentPage} totalPages={10} onChangePage={handleCurrentPage} />
    </>
  )
}