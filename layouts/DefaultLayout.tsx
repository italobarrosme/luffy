import { SidebarMenu } from '@/useComponents/SidebarMenu';
import { Navbar } from '@/useComponents/Navbar';
import Head from 'next/head'
import { Component } from './type';
import { destroyCookie } from 'nookies'

import { signOut } from 'next-auth/react'
import { useState } from 'react';

const DefaultLayout = ({ children, title }: Component) => {
  const [scrollPageY, setScrollPageY] = useState(0)

  const menu = [
    {
      name: 'Solicitação de Compra',
      link: '/purchase-request',
      icon: 'mdi:cart'
    }
  ]

  const navItems = [
    {
      name: 'logout',
      fn: () => (
        signOut({ redirect: true, callbackUrl: '/auth'}),
        destroyCookie(null, 'B1SESSION', {
          path: '/',
        }),
        destroyCookie(null, 'SESSION_TIMEOUT',{
          path: '/',
        })
      ),
      icon: 'mdi:logout'
    },
    {
      name: 'ADMIN PANEL',
    },
  ]

  const handleScroll = (event: any) => {
    const scrollPageY = event.target.scrollTop
    setScrollPageY(scrollPageY)
  }

  return (
    <div className="font-mono w-screen flex">
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar menu={navItems} scrollPageY={scrollPageY} />
      <SidebarMenu menu={menu} />
      <main onScroll={(ev) => handleScroll(ev)} className='overflow-auto h-screen justify-center w-full items-center py-20 px-6'>
        {children}
      </main>

    </div>
  )
}

export default DefaultLayout;