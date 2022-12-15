import Head from 'next/head'

const DefaultLayout = ({ children }: any) => {
  return (
    <div className="font-mono">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='h-screen flex justify-center items-center'>
        {children}
      </main>

    </div>
  )
}

export default DefaultLayout;