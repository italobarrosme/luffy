import type { NextPage } from 'next'

import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'


const Home: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if(status !== 'loading') {
      if (status === 'authenticated') {
        router.push('/purchase-request')
      } else {
        router.push('/auth')
      } 
    }
  }, [status, router])

  return (
    <>
    </>
  )
}

export default Home
