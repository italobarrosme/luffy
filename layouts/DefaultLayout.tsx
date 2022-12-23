import { SidebarMenu } from '@/useComponents/SidebarMenu';
import { Navbar } from '@/useComponents/Navbar';
import Head from 'next/head'
import { Component } from './type';
import {destroyCookie} from 'nookies'

import { signOut } from 'next-auth/react'

const DefaultLayout = ({ children }: Component) => {
  
  

  const menu = [
    {
      name: 'Solicitação de Compra',
      link: '/purchase-order',
      icon: 'mdi:cart'
    }
  ]

  const navItems = [
    {
      name: 'logout',
      fn: () => (
        destroyCookie(null, '@ipog:accessToken'),
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
    <div className="font-mono flex w-screen">
      <Head>
        <title>Default Layout</title>
        <meta name="description" content="Default Layout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar menu={navItems}/>
      <SidebarMenu menu={menu} />
      <main className='h-screen justify-center w-full items-center py-12'>
        {children}
      </main>

    </div>
  )
}

export default DefaultLayout;