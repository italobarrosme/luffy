import { useState } from "react"
import { Table } from "@/useComponents/Table"

import { FormSetItemsRequest } from "../FormSetItemsRequest"
import { FormDataRequest } from "../FormDataRequest"

export const InsertPurchaseRequestCase = () => {

  

  // const POST_INSERT_PURCHASEREQUESTS = () => {
    // getPurchaseRequests().then((response) => {
    //  
    //   return response
    // }).catch((error) => {
    //   const { status: responseStatus, statusText } = error.response

    //   addToast({
    //     type: 'error',
    //     title: `Error ${responseStatus}`,
    //     message: `Erro ao buscar solicitações de compra, ${statusText}`,
    //     duration: 8000
    //   })

    //   useNoAuthorized(responseStatus)
    // })
    
  // }

  // useEffect(() => {
  // }, [])

  
  const [itemsRequest, setItemsRequest] = useState<any>([])

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

  const handleAddItem = (item: any) => {
    console.log(item, 'ITEM')

    setItemsRequest([...itemsRequest, item])
  }

  const handleDataRequest = (data: any) => {
    console.log(data, 'DATA')
  }


  return (
    <>
      <FormDataRequest  emitDataRequest={handleDataRequest}/>
      <div className="my-4">
      <Table title={'Itens para solicitação de compra'} headerItems={headers}>
        {itemsRequest ? itemsRequest?.map((itemsRequest: any, index: any) => (
          <tr key={index} className="border-b border-gray-200 bg-gray-300">
            <td className="p-3 text-left">
             {itemsRequest.Item.ItemCode}
            </td>
            <td className="p-3 text-left" >
              {itemsRequest.Item.ItemName}
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

        {itemsRequest.length === 0 ? (
          <tr className="border-b border-gray-200 bg-gray-300">
            <td className="p-3 text-left" colSpan={8}>Nenhum registro encontrado</td>
          </tr>
        ): null}
      </Table>
      </div>
      <FormSetItemsRequest emitObject={(ev) => handleAddItem(ev)} />
    </>
  )
}