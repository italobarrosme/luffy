import type { NextPage } from 'next'
import Head from 'next/head'
import DefaultLayout from '@/layouts/DefaultLayout'

const PurchaseOrder: NextPage = () => {
  return (
    <>
    
      <Head>
        <title>Solicitação de Compra</title>
        <meta name="keywords" content="games" />
      </Head>
      <DefaultLayout title='default layout'>
        <div className="flex justify-center items-center h-44">
        Solicitação de Compra
        </div>
      </DefaultLayout> 
    </>
  )
}

export default PurchaseOrder