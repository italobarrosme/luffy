import type { NextPage } from 'next'

import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/purchase-order')
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
