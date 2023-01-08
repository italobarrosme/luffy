import type { NextPage } from 'next'

import DefaultLayout from '@/layouts/DefaultLayout'
import { PurchaseRequestCase } from '@/useCases/purchaseRequestCase'
import { Loading } from '@/useComponents/Loading'
import { useStoreLoading } from '@/store/useStoreLoading'

const PurchaseRequest: NextPage = () => {
   const { store } = useStoreLoading()

  return (
    <>
      <DefaultLayout title='Purchase Request'>
        <PurchaseRequestCase />
      </DefaultLayout>
      {store.isLoading && <Loading />}
    </>
  )
}

export default PurchaseRequest