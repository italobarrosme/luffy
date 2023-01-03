import type { NextPage } from 'next'
import Head from 'next/head'
import DefaultLayout from '@/layouts/DefaultLayout'
import { PurchaseRequestCase } from '@/useCases/purchaseRequestCase'

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