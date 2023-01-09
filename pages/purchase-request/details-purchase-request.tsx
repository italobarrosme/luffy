import type { NextPage } from 'next'
import DefaultLayout from '@/layouts/DefaultLayout'
import { DetailsPurchaseRequestCase } from '@/useCases/PurchaseRequestCase/index'

const DetailsPurchaseRequest: NextPage = () => {
  return (
    <>
      <DefaultLayout title='Inserir solicitação de compra'>
        <DetailsPurchaseRequestCase />
      </DefaultLayout> 
    </>
  )
}

export default DetailsPurchaseRequest