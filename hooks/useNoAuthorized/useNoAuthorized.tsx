import { destroyCookie } from "nookies"
import { status } from '@/constants/index'

export const useNoAuthorized = (statusEndPoint: number) => {

  if(status.statusError.includes(statusEndPoint)) {
    destroyCookie(null, 'B1SESSION', {
      path: '/',
    })
    destroyCookie(null, 'SESSION_TIMEOUT',{
      path: '/',
    })
   return window.location.href = '/auth'
  }

  return null
}