import { useEffect, useState } from "react"

import { useStoreListToast } from "@/store/useStoreListToast"
import { useRouter } from "next/router"
import { SelectInput } from "@/usePieces/SelectInput"
import { InputText } from "@/usePieces/InputText"
import { InputDate } from "@/usePieces/InputDate"
import { Table } from "@/useComponents/Table"
import { Button } from "@/usePieces/Button"

export const InsertPurchaseOrderCase = () => {
  const POST_INSER_PURCHASEREQUESTS = () => {
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
    
  }

  useEffect(() => {
    setDateNow()
  }, [])

  // const router = useRouter()

  // const { addToast } = useStoreListToast()

  const [itemsRequest, setItemsRequest] = useState<any>([])

  const [dateLaunch, setDateLaunch] = useState('')
  const [dateFinish, setDateFinish] = useState('')
  const [dateDocument, setDateDocument] = useState('')

  const setDateNow = () => {
    const date = new Date()
    const nowDate = date.toISOString().split('T')[0]

    const dateFinish = date.setDate(date.getDate() + 30)
    const dateFinishFormat = new Date(dateFinish).toISOString().split('T')[0]

    setDateLaunch(nowDate)
    setDateFinish(dateFinishFormat)
    setDateDocument(nowDate)

    return nowDate
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
      title: 'Unidade de medida',
      fn: () => console.log('Unidade de medida')
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

  const handleAddItem = () => {
    setItemsRequest([...itemsRequest, {
      code: 'I00005',
      item: 'ACHOCOLATADO1800kg',
      description: 'TESTANDO',
      unitMeasure: '1800KG',
      quantity: '1',
      costCenter1: 'APUAN',
      costCenter2: 'AMERICA',
      project: 'CHOCOLATE',
    }])
  }


  return (
    <>
      <div>
      <h2 className="text-2xl font-semibold leading-tight w-full my-4">Inserir solicitação de compra</h2>
        <div className="flex flex-col bg-brand-primary p-8 rounded-lg gap-4 text-white">
          <h2 className="text-lg font-semibold leading-tight w-full mb-4">
            Dados para solicitação
          </h2>
          <div className="flex items-center gap-4">
            <SelectInput label="Solicitante" name={'resquester'} options={[]} />
            <InputText label="Departamento" name={'departament'} defaultValue={''} />
            <SelectInput label="Filial" name={'fileia'} options={[]} />
          </div>
          <div className="flex items-center gap-4">
            <InputDate label="Data de Lançamento" name={'dateSend'} defaultValue={dateLaunch} />
            <InputDate label="Valida Ate" name={'dateFinish'} defaultValue={dateFinish} />
            <InputDate label="Data do Documento" name={'dateDocument'} defaultValue={dateDocument} />
          </div>
          <div className="flex items-center gap-4">
            <InputDate label="Data Necessaria" name="dateSend" />
          </div>
          <div className="flex items-center gap-4">
            <InputText label="Observações" name={'description'} defaultValue={'0000-00-00'} />
          </div>
        </div>
      </div>
      <div className="my-4">
      <Table title={'Itens para solicitação de compra'} headerItems={headers}>
        {itemsRequest ? itemsRequest?.map((itemsRequest: any, index: any) => (
          <tr key={index} className="border-b border-gray-200 bg-gray-300">
            <td className="p-3 text-left">
             {itemsRequest.code}
            </td>
            <td className="p-3 text-left" >
              {itemsRequest.item}
            </td>
            <td className="p-3 text-left">
              {itemsRequest.description}
            </td>
            <td className="p-3 text-left">
              {itemsRequest.unitMeasure}
            </td>
            <td className="p-3 text-left">
              {itemsRequest.quantity}
            </td>
            <td className="p-3 text-left">
              {itemsRequest.costCenter1}
            </td>
            <td className="p-3 text-left">
              {itemsRequest.costCenter2}
            </td>
            <td className="p-3 text-left">
              {itemsRequest.project}
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
      <div>
        <h2 className="text-2xl font-semibold leading-tight w-full my-4">Registrar itens</h2>
        <div className="flex flex-col bg-brand-primary p-8 rounded-lg gap-4 text-white">
          <h2 className="text-lg font-semibold leading-tight w-full mb-4">
            Informações dos itens
          </h2>
          <div className="flex items-center gap-4">
            <InputText className="w-36" label="Código do produto" name={'code'} defaultValue={''} />
            <InputText className="w-55"  label="Item" name={'description'} defaultValue={''} />
            <InputText className="w-80"  label="Descrição do item" name={'description'} defaultValue={''} />
            
          </div>
          <div className="flex items-center gap-4">
            <InputText label="Quantidade" name={'quantity'} defaultValue={''} />
            <SelectInput label="Centro de custo" name={'resquester'} options={[]} />
            <SelectInput label="Projeto" name={'fileia'} options={[]} />
          </div>
          <div className="flex items-center gap-4 my-4">
            <Button className='bg-brand-light text-brand-dark' label='Registrar novo item' onClick={handleAddItem} />
          </div>
        </div>
      </div>
    </>
  )
}