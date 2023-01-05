import { Button } from "@/usePieces/Button"
import { InputText } from "@/usePieces/InputText"
import { SelectInput } from "@/usePieces/SelectInput"
import { useState } from "react"

export type FormSetItemsRequestProps = {
  emitItemsRequest: (itemsRequest: any) => void
}


export const FormSetItemsRequest = ({emitItemsRequest}:FormSetItemsRequestProps) => {

  const [itemsRequest, setItemsRequest] = useState<any>([])


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

    emitItemsRequest(itemsRequest)
  }

  return (
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
  )
}