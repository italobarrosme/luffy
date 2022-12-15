import '@/styles/globals.scss'
import '@/styles/main.scss'

import type { AppProps } from 'next/app'
import DefaultLayout from '@/layouts/DefaultLayout'


function App({ Component, pageProps }: AppProps) {
  return (
      <DefaultLayout title='default layout'>
        <Component {...pageProps} />
      </DefaultLayout>
  )
}

export default App
