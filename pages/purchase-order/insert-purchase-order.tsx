import type { NextPage } from 'next'
import DefaultLayout from '@/layouts/DefaultLayout'
import { InsertPurchaseOrderCase } from '@/useCases/purchaseOrderCase/'

const PurchaseOrder: NextPage = () => {
  return (
    <>
      <DefaultLayout title='Inserir solicitação de compra'>
        <InsertPurchaseOrderCase />
      </DefaultLayout> 
    </>
  )
}

export default PurchaseOrder