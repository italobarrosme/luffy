import { InputDate } from "@/usePieces/InputDate"
import { InputText } from "@/usePieces/InputText"
import { SelectInput } from "@/usePieces/SelectInput"
import { useEffect, useState } from "react"
import { getAffiliate, getEmployees } from "@/services/purchase-request/usePurchaseRequest"
import { useStoreListToast } from "@/store/useStoreListToast"
import { useNoAuthorized } from "@/hooks/useNoAuthorized"

export type FormDataRequestProps = {
  emitDataRequest: (data: any) => void
}


export const FormDataRequest = ({emitDataRequest}:FormDataRequestProps) => {
  const { addToast } = useStoreListToast()

  
  const [dateLaunch, setDateLaunch] = useState('')
  const [dateFinish, setDateFinish] = useState('')
  const [dateDocument, setDateDocument] = useState('')
  
  const [employees, setEmployees] = useState<any>([])
  const [affiliates, setAffiliates] = useState<any>([])
  
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

  const GET_EMPLOYEES = () => {
    getEmployees().then((response) => {
      const { data } = response
      const employees = data.value.map((employee: any) => {
        return {
          value: employee.EmployeeID,
          label: employee.FirstName + ' ' + employee.LastName
        }
      })

      setEmployees(employees)
      
      return response
    }).catch((error) => {
      const { status: responseStatus, statusText } = error.response

      addToast({
        type: 'error',
        title: `Error ${responseStatus}`,
        message: `Erro ao buscar funcionarios, ${statusText}`,
        duration: 8000
      })

      useNoAuthorized(responseStatus)
    })
  }

  const GET_AFFILIATE = () => {
    getAffiliate().then((response) => {
      const { data } = response
      const affiliates = data.value.map((affiliate: any) => {
        return {
          value: affiliate.BPLID,
          label: affiliate.BPLName
        }
      })

      setAffiliates(affiliates)
      
      return response
    }).catch((error) => {
      const { status: responseStatus, statusText } = error.response

      addToast({
        type: 'error',
        title: `Error ${responseStatus}`,
        message: `Erro ao buscar afiliados, ${statusText}`,
        duration: 8000
      })

      useNoAuthorized(responseStatus)
    })
  }


  useEffect(() => {
    setDateNow()
    GET_EMPLOYEES()
    GET_AFFILIATE()
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-semibold leading-tight w-full my-4">Inserir solicitação de compra</h2>
        <div className="flex flex-col bg-brand-primary p-8 rounded-lg gap-4 text-white">
          <h2 className="text-lg font-semibold leading-tight w-full mb-4">
            Dados para solicitação
          </h2>
          <div className="flex items-center gap-4">
            <SelectInput label="Solicitante" name={'resquester'} options={employees} />
            <InputText label="Departamento" name={'departament'} defaultValue={''} />
            <SelectInput label="Filial" name={'fileia'} options={affiliates} />
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
  )
}