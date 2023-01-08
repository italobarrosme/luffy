import { Table } from "@/useComponents/Table"
import { ButtonIcon } from "@/usePieces/ButtonIcon"
import { useEffect, useState } from "react"
import { getItemsList } from "@/services/purchase-request/usePurchaseRequest"
import { useStoreListToast } from "@/store/useStoreListToast"
import { useStoreModal } from "@/store/useStoreModal"

type SearchItemsProps = {
  emitItem: (item: any) => void
}

export const SearchItems = ({emitItem}: SearchItemsProps) => {

  const { addToast } = useStoreListToast()
  const { setModal } = useStoreModal()

  const GET_ITEMS = () => {
    getItemsList().then((response) => {
      const { data } = response
      setItems(data.value)
      return response
    }).catch((error) => {
      const { status: responseStatus, statusText } = error.response
      addToast({
        type: 'error',
        title: 'Erro ao buscar itens',
        message: `Erro ${responseStatus}: ${statusText}`,
        duration: 8000
      })
    })
  }

  const [items, setItems] = useState<any>([])

  const headers = [
    {
      title: '',
      fn: () => console.log('ação')
    },
    {
      title: 'Codigo',
      fn: () => console.log('Codigo')
    },
    {
      title: 'Item',
      fn: () => console.log('Item')
    },
    
  ]

  const handleEmitItem = (item: any) => {
    emitItem({
      ItemCode: item.ItemCode,
      ItemName: item.ItemName
    })

    setModal({
      isOpen: false,
      role: '',
    })
  }

  useEffect(() => {
    GET_ITEMS()
  }, [])


  return (
    <div>
      <div className="mt-4">
          <Table headerItems={headers}>
          {items ? items?.map((item: any, index: any) => (
            <tr key={index} className="border-b border-gray-200 bg-gray-300">
              <td className="p-3 text-left flex gap-4">
                <ButtonIcon width={16} height={16}  icon="material-symbols:check-circle" onClick={() => handleEmitItem(item)} />
              </td>
              <td className="p-3 text-left text-brand-dark" >
                {item.ItemCode}
              </td>
              <td className="p-3 text-left text-brand-dark">
                {item.ItemName}
              </td>
            </tr>
          ), []): null}

          {items.length === 0 ? (
            <tr className="border-b border-gray-200 bg-gray-300">
              <td className="p-3 text-left text-brand-dark" colSpan={3}>Nenhum registro encontrado</td>
            </tr>
          ): null}
        </Table>
      </div>
    </div>
  )
} 