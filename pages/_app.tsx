import '@/styles/globals.scss'
import '@/styles/main.scss'

import type { AppProps } from 'next/app'
import  Auth from '@/pages/auth'
import DefaultLayout from '@/layouts/DefaultLayout'
import { SessionProvider } from "next-auth/react"
import AuthtLayout from '@/layouts/AuthLayout'


function App({ Component, pageProps }: AppProps) {
  console.log(pageProps, 'PAGEPROPS')
  return (
    <SessionProvider session={pageProps.session}>
      {pageProps.session ?
      <DefaultLayout title='default layout'>
        <Component {...pageProps} />
      </DefaultLayout> 
      :
      <AuthtLayout title='auth layout'>
        <Auth />
      </AuthtLayout>}
    </SessionProvider>
  )
}

export default App
