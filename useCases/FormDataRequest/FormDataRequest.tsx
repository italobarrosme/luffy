import { InputDate } from "@/usePieces/InputDate"
import { InputText } from "@/usePieces/InputText"
import { SelectInput } from "@/usePieces/SelectInput"
import { ChangeEvent, useEffect, useState } from "react"
import { getAffiliate, getEmployees, getDepartments } from "@/services/purchase-request/usePurchaseRequest"
import { useStoreListToast } from "@/store/useStoreListToast"
import { useNoAuthorized } from "@/hooks/useNoAuthorized"
import { useStoreLoading } from "@/store/useStoreLoading"

export type FormDataRequestProps = {
  emitDataRequest: (data: any) => void
}


export const FormDataRequest = ({emitDataRequest}:FormDataRequestProps) => {
  const { addToast } = useStoreListToast()
  const { setLoading, store } = useStoreLoading()
  
  const [taxDate, setTaxDate] = useState('')
  const [docDueDate, setDocDueDate] = useState('')
  const [docDate, setDocDate] = useState('')
  const [requriedDate, setRequriedDate] = useState('')
  
  const [employees, setEmployees] = useState<any>([])
  const [affiliates, setAffiliates] = useState<any>([])
  const [department, setDepartment] = useState<any>({
    value: '',
    label: ''
  })

  const [documentData, setDocumentData] = useState<any>()
  
  const setDateNow = () => {
    const date = new Date()
    const nowDate = date.toISOString().split('T')[0]
    
    const dateDue= date.setMonth(date.getMonth() + 1)
    const dateDueFormat = new Date(dateDue).toISOString().split('T')[0]
    
    setTaxDate(nowDate)
    setDocDueDate(dateDueFormat)
    setDocDate(nowDate)
    
    return nowDate
  }

  const GET_DEPARTMENT = (id: any) => {
    getDepartments(id).then((response) => {
      setLoading(true)
      const { data } = response
      const department = 
        {
          value: data.Code,
          label: data.Name
        }

        setDepartment(department)
      
      return response
    
    }).catch((error) => {
      const { status: responseStatus, statusText } = error.response

      addToast({
        type: 'error',
        title: `Error ${responseStatus}`,
        message: `Erro ao buscar departamentos, ${statusText}`,
        duration: 8000
      })

      useNoAuthorized(responseStatus)
    }).finally(() => {
      setLoading(false)
    })
  }

  const GET_EMPLOYEES = () => {
    getEmployees().then((response) => {
      setLoading(true)
      const { data } = response
      const employees = data.value.map((employee: any) => {
        return {
          value: employee.EmployeeID,
          label: employee.FirstName + ' ' + employee.LastName
        }
      })

      setEmployees([{
        value: '',
        label: 'Selecione um funcionario'
      }, ...employees])
      
      
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
    }).finally(() => {
      setLoading(false)
    })
  }

  const GET_AFFILIATE = () => {
    getAffiliate().then((response) => {
      setLoading(true)
      const { data } = response
      const affiliates = data.value.map((affiliate: any) => {
        return {
          value: affiliate.BPLID,
          label: affiliate.BPLName
        }
      })

      setAffiliates([{
        value: '',
        label: 'Selecione uma filial'
      }, ...affiliates])
      
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
    }).finally(() => {
      setLoading(false)
    })
  }

  const handlerEmployees = (event: any) => {
    GET_DEPARTMENT(event.target.value)
    setDocumentData({
      ...documentData,
      EmployeeID: event.target.value
    })

    return
  }

  const handlerAffiliates = (event: any) => {
    setDocumentData({
      ...documentData,
      BPL_IDAssignedToInvoice: event.target.value
    })

    return
  }

  const handlerDocDate = (event: any) => {

    setDocumentData({
      ...documentData,
      DocDate: event.target.value
    })

    setDocDate(event.target.value)

    return
  }

  const handlerDocDueDate = (event: any) => {
    setDocumentData({
      ...documentData,
      DocDueDate: event.target.value
    })

    setDocDueDate(event.target.value)

    return
  }

  const handlerRequriedDate = (event: any) => {

    console.log(event.target.value, 'VALUE')
    setDocumentData({
      ...documentData,
      RequiredDate: event.target.value
    })

    setRequriedDate(event.target.value)

    return
  }

  const handlerTaxDate = (event: any) => {

    
    setDocumentData({
      ...documentData,
      TaxDate: event.target.value
    })
    setTaxDate(event.target.value)

    return
  }

  const handlerComments = (event: any) => {

    setDocumentData({
      ...documentData,
      Comments: event.target.value
    })

    return
  }

  useEffect(() => {
    emitDataRequest(documentData)
  }, [documentData])

  useEffect(() => {
    setDocumentData({
      ...documentData,
      DocDate: docDate,
      DocDueDate: docDueDate,
      TaxDate: taxDate,
      RequriedDate: requriedDate
    })

    console.log(documentData)
  }, [docDate, docDueDate, taxDate, requriedDate])

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
            <SelectInput label="Solicitante" name={'requesterName'} options={employees} onChange={(ev) => handlerEmployees(ev)}  />
            <InputText label="Departamento" name={'requesterDepertment'} value={department.label} readOnly />
            <SelectInput label="Filial" name={'affiliate'} className="w-144" options={affiliates} onChange={(ev) => handlerAffiliates(ev)} />
          </div>
          <div className="flex items-center gap-4">
            <InputDate label="Data de Lançamento" name={'TaxDate'} value={taxDate} onChange={(ev) => handlerTaxDate(ev)} />
            <InputDate label="Valida Ate" name={'DocDueDate'} value={docDueDate}  onChange={(ev) => handlerDocDueDate(ev)} />
            <InputDate label="Data do Documento" name={'DocDate'}  value={docDate}  onChange={(ev) => handlerDocDate(ev)}  />
          </div>
          <div className="flex items-center gap-4">
          <InputDate label="Data Necessaria" name={'RequriedDate'} value={requriedDate} onChange={(ev) => handlerRequriedDate(ev)}  />
          </div>
          <div className="flex items-center gap-4">
          <InputText label="Observações" name={'Comments'} defaultValue={''} onChange={(ev) => handlerComments(ev)} />
        </div>
      </div>
    </div>
  )
}