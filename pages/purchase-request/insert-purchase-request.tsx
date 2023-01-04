import type { NextPage } from 'next'
import DefaultLayout from '@/layouts/DefaultLayout'
import { InsertPurchaseRequestCase } from '@/useCases/purchaseRequestCase'

const PurchaseRequest: NextPage = () => {
  return (
    <>
      <DefaultLayout title='Inserir solicitação de compra'>
        <InsertPurchaseRequestCase />
      </DefaultLayout> 
    </>
  )
}

export default PurchaseRequest