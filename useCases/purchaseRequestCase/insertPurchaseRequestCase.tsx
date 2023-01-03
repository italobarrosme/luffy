import { useEffect, useState } from "react"

import { useStoreListToast } from "@/store/useStoreListToast"
import { useRouter } from "next/router"
import { SelectInput } from "@/usePieces/SelectInput"
import { InputText } from "@/usePieces/InputText"
import { InputDate } from "@/usePieces/InputDate"
import { Table } from "@/useComponents/Table"

export const InsertPurchaseRequestCase = () => {

  // const router = useRouter()

  // const { addToast } = useStoreListToast()
  // const [currentPage, setCurrentPage] = useState(1)
  const [purchaseRequests, setPurchaseRequests] = useState<any>([])

  const POST_INSER_PURCHASEREQUESTS = () => {
    // getPurchaseRequests().then((response) => {
    //   const adpterPurchaseRequests = response.data.value.map((purchaseRequest: any) => {
    //     return {
    //       cancelled: purchaseRequest?.Cancelled,
    //       docentry: purchaseRequest?.DocEntry,
    //       docnum: purchaseRequest?.DocNum,
    //       documentStatus: purchaseRequest?.DocumentStatus,
    //       requesterDepertment: purchaseRequest?.RequesterDepartment,
    //       requesterName: purchaseRequest?.RequesterName,
    //     }
    //   })

    //   setPurchaseRequests(adpterPurchaseRequests)
      
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
            <InputText label="Data de Lançamento" name={'dateSend'} defaultValue={''} />
            <InputText label="Valida Ate" name={'dateFinish'} defaultValue={''} />
            <InputText label="Data do Documento" name={'dateDocument'} defaultValue={''} />
          </div>
          <div className="flex items-center gap-4">
            <InputDate label="Data Necessaria" name="dateSend" />
          </div>
          <div className="flex items-center gap-4">
            <InputText label="Observações" name={'description'} defaultValue={''} />
          </div>
        </div>
      </div>
      <Table title={'Solicitação de Compra'} headerItems={headers}>
        {purchaseRequests ? purchaseRequests?.map((purchaseRequest: any, index: any) => (
          <tr key={index} className="border-b border-gray-200 bg-gray-300">
            <td className="p-3 flex items-center gap-2">
             
            </td>
            <td className="p-3 text-left" >
              
            </td>
            <td className="p-3 text-left">
             
            </td>
            <td className="p-3 text-left">
             
            </td>
            <td className="p-3 text-left">
              
            </td>
            <td className="p-3 text-left">
             
            </td>
            <td className="p-3 text-left flex gap-5">

            </td>
          </tr>
        ), []): null}

        {purchaseRequests.length === 0 ? (
          <tr className="border-b border-gray-200 bg-gray-300">
            <td className="p-3 text-left" colSpan={8}>Nenhum registro encontrado</td>
          </tr>
        ): null}
      </Table>
      <div>
        <h2 className="text-2xl font-semibold leading-tight w-full my-4">Inserir itens</h2>
        <div className="flex flex-col bg-gray-300 p-8 rounded-lg gap-4">
          <h2 className="text-lg font-semibold leading-tight w-full mb-4">
            Informações dos itens
          </h2>
          <div className="flex items-center gap-4">
            <InputText label="Código do produto" name={'code'} defaultValue={''} />
            <InputText label="Descrição do item" name={'description'} defaultValue={''} />
            
          </div>
          <div className="flex items-center gap-4">
            <InputText label="Quantidade" name={'quantity'} defaultValue={''} />
            <SelectInput label="Centro de custo" name={'resquester'} options={[]} />
            <SelectInput label="Projeto" name={'fileia'} options={[]} />
          </div>
        </div>
      </div>
    </>
  )
}