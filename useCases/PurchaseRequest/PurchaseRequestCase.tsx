import { Pagination } from "@/useComponents/Pagination"
import { Table } from "@/useComponents/Table"
import { useEffect, useState } from "react"
import { getPurchaseRequests, postPurchaseRequestsCancel  } from "@/services/purchase-request/usePurchaseRequest"
import { formatDepartament, formatStatus, formatCanceled } from '@/utils/formatData'
import { useDebounce } from 'usehooks-ts'

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
  const [orderby, setOrderby] = useState('DocNum asc')
  const [filter, setFilter] = useState('')
  const debouncedValue = useDebounce<string>(filter, 800)

  const GET_PURCHASEREQUESTS = ({
    skip,
    orderby,
    filter
  }: any) => {
    getPurchaseRequests(skip, orderby, filter).then((response) => {
      setLoading(true)

      console.log(orderby, 'ORDERBY')

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
        if (orderby === 'DocEntry asc') {
          setOrderby('DocEntry desc')
          
        } else {
          setOrderby('DocEntry asc')
          
        }
        handleCurrentPage(1)
      }
    },
    {
      title: 'Responsável',
      fn: () => {
        if (orderby === 'RequesterName asc') {
          setOrderby('RequesterName desc')
          
        } else {
          setOrderby('RequesterName asc')
          
        }
        handleCurrentPage(1)
      }
    },
    {
      title: 'Departamento',
      fn: () => {
        if(orderby === 'RequesterDepartment asc') {
          setOrderby('RequesterDepartment desc')

        } else {
          setOrderby('RequesterDepartment asc')

        }
        handleCurrentPage(1)
      }
    },
    {
      title: 'Assunto',
      fn: () => {
        if(orderby === 'DocEntry asc') {
          setOrderby('DocEntry desc')

        } else {
          setOrderby('DocEntry asc')

        }
        handleCurrentPage(1)
      }
    },
    {
      title: 'Status',
    },
    {
      title: 'Cancelado',
      fn: () => {
        if (orderby === 'Cancelled asc') {
          setOrderby('Cancelled desc')

        } else {
          setOrderby('Cancelled asc')
        }
        handleCurrentPage(1)
      }
    },
    {
      title: 'Ações'
    },
  ]


  useEffect(() => {
    GET_PURCHASEREQUESTS({
      skip: 0,
      orderby: 'DocNum asc'
    })
    
  }, [])

  const handleCurrentPage = (currentPage: number) => {
    setCurrentPage(currentPage)
  }

  const onChangeSearch = (event: any) => {
    const { value } = event.target

    if (value) {
      setFilter(value)
    }
    if (!value) {
      handleCurrentPage(1)
    }
  }

  useEffect(() => {
    console.log(currentPage, 'CURRENT DO EFFECT')
    if (currentPage > 1) {
      GET_PURCHASEREQUESTS({
        skip: (currentPage - 1) * 20,
        orderby,
        filter
      })
    } else {
      GET_PURCHASEREQUESTS({
        skip: 0,
        orderby,
        filter
      })
    }
  }, [currentPage, orderby])

  useEffect(() => {
    if (debouncedValue) {
      GET_PURCHASEREQUESTS({
        skip: 0,
        orderby: 'DocNum asc',
        filter: `DocNum eq ${debouncedValue}`
      })
    }

  }, [debouncedValue])

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
      <Pagination isNextPage={isPagination} currentPage={currentPage} totalPages={20} onChangePage={handleCurrentPage} />
    </>
  )
}