import { useState } from "react"
import { Table } from "@/useComponents/Table"

import { FormSetItemsRequest } from "../FormSetItemsRequest"
import { FormDataRequest } from "../FormDataRequest"
import { Button } from "@/usePieces/Button"
import { postPurchaseRequests } from "@/services/purchase-request/usePurchaseRequest"
import { useStoreListToast } from "@/store/useStoreListToast"
import { useStoreLoading } from "@/store/useStoreLoading"

export const InsertPurchaseRequestCase = () => {

  const { addToast } = useStoreListToast()
  const { setLoading } = useStoreLoading()
  
  const [itemsRequest, setItemsRequest] = useState<any>([])

  const [dataRequest, setDataRequest] = useState<any>({
    DocDate: '',
    DocDueDate: '',
    TaxDate: '',
    Comments: '',
    BPL_IDAssignedToInvoice: '',
    RequriedDate: '',
    Resquester: '',
    DocumentLines: [
    ]
  })

  const POST_PURCHASE_REQUEST = (data: any) => {
    postPurchaseRequests(data).then((res) => {
      setLoading(true)
      

      if(res.status === 200) {
        addToast({
          title: 'Sucesso',
          message: 'Solicitação de compra inserida com sucesso',
          duration: 8000,
          type: 'success'
        })
      }

    }).catch((err) => {
      addToast({
        title: 'Erro',
        message: 'Erro ao inserir solicitação de compra',
        duration: 8000,
        type: 'error'
      })
    }).finally(() => {
      setLoading(false)
    })
  }

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
    // {
    //   title: 'Centro de Custo 1',
    //   fn: () => console.log('Cancelado')
    // },
    // {
    //   title: 'Centro de Custo 2',
    //   fn: () => console.log('Cancelado')
    // },
    {
      title: 'Projeto',
      fn: () => console.log('Projeto')
    },
  ]

  const handlerAddItem = (item: any) => {
    setItemsRequest([...itemsRequest, item])


    setDataRequest({
      ...dataRequest,
      DocumentLines: [...dataRequest.DocumentLines, {
        ItemCode: item.Item.ItemCode,
        ShipDate: dataRequest?.DocDate,
        Quantity: item.Quantity,
        CostingCode: item.CostingCode,
        CostingCode2: item.CostingCode2,
        ProjectCode: item.ProjectCode,
      }]
    })
  }

  const handlerDataRequest = (data: any) => {
    if (data) {
      setDataRequest({
        ...dataRequest,
        DocDate: data.DocDate,
        DocDueDate: data.DocDueDate,
        TaxDate: data.TaxDate,
        Comments: data.Comments,
        BPL_IDAssignedToInvoice: data.BPL_IDAssignedToInvoice,
        RequriedDate: data.RequriedDate,
        Resquester: data.EmployeeID,
      })
    }
  }

  const handlerPostPurchaseRequest = (data: any) => {
    POST_PURCHASE_REQUEST(data)
  }

  return (
    <>
      <FormDataRequest  emitDataRequest={handlerDataRequest}/>
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
            {/* <td className="p-3 text-left">
              {itemsRequest.CostingCode}
            </td>
            <td className="p-3 text-left">
              {itemsRequest.CostingCode2}
            </td> */}
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
      <FormSetItemsRequest emitObject={(ev) => handlerAddItem(ev)} />
      <div className="mt-4">
        <Button className="bg-green-500" icon={'mdi:cube-send'} type="button" label={'Inserir solicitação de compra'} onClick={() => handlerPostPurchaseRequest(dataRequest)} />
      </div>
    </>
  )
}