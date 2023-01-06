import { useNoAuthorized } from "@/hooks/useNoAuthorized"
import { getProjects, getProfitCenters } from "@/services/purchase-request/usePurchaseRequest"
import { useStoreListToast } from "@/store/useStoreListToast"
import { Button } from "@/usePieces/Button"
import { InputText } from "@/usePieces/InputText"
import { SelectInput } from "@/usePieces/SelectInput"
import { useEffect, useState } from "react"

export type FormSetItemsRequestProps = {
  emitObject: (object: any) => void
}


export const FormSetItemsRequest = ({emitObject}:FormSetItemsRequestProps) => {
  
  const [project, setProject] = useState<any>([])

  const [DocumentLines, setDocumentLines] = useState<any>([])
  const [profitCenter1, setProfitCenter1] = useState<any>([])
  const [profitCenter2, setProfitCenter2] = useState<any>([])

  const [item, setItem] = useState<any>('ITEM FALTA API')
  
  const { addToast } = useStoreListToast()

  const GET_PROFITCENTER = () => {
    getProfitCenters().then((response) => {
      const { data } = response
      
      
      const profitCenters = data.value.map((profitCenter: any) => {
        return {
          value: profitCenter.CenterCode,
          label: profitCenter.CenterName
        }
      })

      setProfitCenter1([{
        value: '',
        label: 'Selecione um centro de custo'
      },...profitCenters])
      setProfitCenter2([{
        value: '',
        label: 'Selecione um centro de custo'
      },...profitCenters])
      
      return response
    }).catch((error) => {
      const { status: responseStatus, statusText } = error.response

      addToast({
        type: 'error',
        title: 'Erro ao buscar projetos',
        message: `Erro ao buscar projetos, ${statusText}`,
        duration: 8000
      })

      useNoAuthorized(responseStatus)
    })
  }

  const GET_PROJECT = () => {
    getProjects().then((response) => {
      const { data } = response
      const projects = data.value.map((project: any) => {
        return {
          value: project.Code,
          label: project.Name
        }
      })

      setProject([{
        value: '',
        label: 'Selecione um projeto'
      }, ...projects])
      
      return response
    }).catch((error) => {
      const { status: responseStatus, statusText } = error.response

      addToast({
        type: 'error',
        title: 'Erro ao buscar projetos',
        message: `Erro ao buscar projetos, ${statusText}`,
        duration: 8000
      })

      useNoAuthorized(responseStatus)
    })
  }

  useEffect(() => {
    GET_PROJECT()
    GET_PROFITCENTER()

    handlerItem()
  }, [])


  const handlerProject = (event: any) => {
    console.log(event.target.value, 'HERE')
    setDocumentLines({
      ...DocumentLines,
      ProjectCode: event.target.value
    })

    return
  }

  const handlerQuantity = (event: any) => {
    setDocumentLines({
      ...DocumentLines,
      Quantity: event.target.value
    })

    return
  }

  const handlerItemCode = (event: any) => {
    setDocumentLines({
      ...DocumentLines,
      ItemCode: event.target.value
    })

    return
  }

  const handlerProfitCenter1 = (event: any) => {
    setDocumentLines({
      ...DocumentLines,
      CostingCode: event.target.value
    })

    return
  }

  const handlerProfitCenter2 = (event: any) => {
    setDocumentLines({
      ...DocumentLines,
      CostingCode2: event.target.value
    })

    return
  }

  const handlerDescription = (event: any) => {
    setDocumentLines({
      ...DocumentLines,
      ItemDescription: event.target.value
    })

    return
  }

  const handlerItem = () => {
    setDocumentLines({
      ...DocumentLines,
      Item: item
    })

    return
  }

  const handlerDocumentLines = () => {
    emitObject(DocumentLines)
  }

  return (
    <div>
        <h2 className="text-2xl font-semibold leading-tight w-full my-4">Registrar itens</h2>
        <div className="flex flex-col bg-brand-primary p-8 rounded-lg gap-4 text-white">
          <h2 className="text-lg font-semibold leading-tight w-full mb-4">
            Informações dos itens
          </h2>
            <div className="flex items-center gap-4">
              <InputText className="w-36" label="Código do produto" name={'ItemCode'} defaultValue={''} onChange={handlerItemCode} />
              <InputText className="w-55"  label="Item" name={'Item'} value={item} readOnly/>
              <InputText className="w-80"  label="Descrição do item" name={'ItemDescription'} defaultValue={''} onChange={handlerDescription} />
              
            </div>
            <div className="flex items-center gap-4">
              <InputText className="w-36" type="number" label="Quantidade" name={'Quantity'} defaultValue={''} onChange={handlerQuantity} />
              <SelectInput label="Centro de custo 1" name={'CostingCode'} options={profitCenter1} onChange={(ev) => handlerProfitCenter1(ev)} />
              <SelectInput label="Centro de custo 2" name={'CostingCode2'} options={profitCenter2} onChange={(ev) => handlerProfitCenter2(ev)} />
              <SelectInput label="Projeto" name={'ProjectCode'} options={project} onChange={(ev) => handlerProject(ev)} />
            </div>
            <div className="flex items-center gap-4 my-4">
              <Button type="submit" className='bg-brand-light text-brand-dark' label='Registrar novo item' onClick={handlerDocumentLines} />
            </div>
        </div>
      </div>
  )
}