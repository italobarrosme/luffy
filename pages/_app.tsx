import '@/styles/globals.scss'
import '@/styles/main.scss'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { ListToast } from '@/useComponents/ListToast'
import { useStoreListToast } from '@/store/useStoreListToast'

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { data } = useStoreListToast()

  return (
    <>
    {<ListToast position={data.position} list={data.list} />}
    <SessionProvider session={session}>
        <Component {...pageProps} />
    </SessionProvider>
    </>
  )
}

export default App
