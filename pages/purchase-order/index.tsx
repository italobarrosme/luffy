import type { NextPage } from 'next'
import Head from 'next/head'
import DefaultLayout from '@/layouts/DefaultLayout'
import { PurchaseOrderCase } from '@/useCases/purchaseOrderCase'

const PurchaseOrder: NextPage = () => {
  return (
    <>
      <DefaultLayout title='Purchase Order'>
        <PurchaseOrderCase />
      </DefaultLayout> 
    </>
  )
}

export default PurchaseOrder