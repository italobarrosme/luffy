import { SidebarMenu } from '@/useComponents/SidebarMenu';
import { Navbar } from '@/useComponents/Navbar';
import Head from 'next/head'

const DefaultLayout = ({ children }: any) => {
  const menu = [
    {
      name: 'Solicitação de Compra',
      link: '/about',
      icon: 'mdi:cart'
    }
  ]

  const navItems = [
    {
      name: 'logout',
      fn: () => {},
      icon: 'mdi:logout'
    },
    {
      name: 'admin',
      fn: () => {},
      icon: 'mdi:account'
    },
  ]

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
      <SidebarMenu menu={menu} />
      <Navbar menu={navItems}/>

    </div>
  )
}

export default DefaultLayout;