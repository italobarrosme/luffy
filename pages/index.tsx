import type { NextPage } from 'next'

import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

import { useStoreListToast } from '@/store/useStoreListToast'

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { addToast } = useStoreListToast();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/purchase-request')
    } else {
      router.push('/auth')
    } 
  }, [status])

  return (
    <>
    </>
  )
}

export default Home
