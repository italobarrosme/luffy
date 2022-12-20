import { SidebarMenu } from '@/useComponents/SidebarMenu';
import { Navbar } from '@/useComponents/Navbar';
import Head from 'next/head'
import { Component } from './type';

import { signOut } from 'next-auth/react'

const DefaultLayout = ({ children }: Component) => {
  
  

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
      fn: () => (
        signOut({ redirect: true, callbackUrl: '/auth'})
      ),
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
        <title>Default Layout</title>
        <meta name="description" content="Default Layout" />
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