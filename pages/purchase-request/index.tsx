import type { NextPage } from 'next'
import DefaultLayout from '@/layouts/DefaultLayout'
import { PurchaseRequestCase } from '@/useCases/PurchaseRequest/PurchaseRequestCase'

const PurchaseRequest: NextPage = () => {

  return (
    <>
      <DefaultLayout title='Purchase Request'>
        <PurchaseRequestCase />
      </DefaultLayout>
      
    </>
  )
}

export default PurchaseRequest