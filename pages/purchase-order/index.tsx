import type { NextPage } from 'next'
import Head from 'next/head'
import DefaultLayout from '@/layouts/DefaultLayout'
import { PurchaseOrderCase } from '@/useCases/purchaseOrderCase'

const PurchaseOrder: NextPage = () => {
  return (
    <>
    
      <Head>
        <title>Solicitação de Compra</title>
        <meta name="keywords" content="games" />
      </Head>
      <DefaultLayout title='default layout'>
          <div className='h-full p-4 overflow-y-auto'>
            <PurchaseOrderCase />
          </div>
      </DefaultLayout> 
    </>
  )
}

export default PurchaseOrder