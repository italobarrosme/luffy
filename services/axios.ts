import https from 'https'
import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios'

import { useStoreListToast } from '@/store/useStoreListToast'

if (process.env.NODE_ENV === 'development') {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  })
  axios.defaults.httpsAgent = httpsAgent
}

type headerCookie = {
  Cookie: string
}



type FetchParams = {
  url?: string
  path: string
  responseType?: AxiosRequestConfig['responseType']
  headers?: AxiosRequestHeaders | headerCookie
  data?: BodyInit | JSON | Record<string, unknown>
  params?: unknown
  method?: AxiosRequestConfig['method']
  httpsAgent?: AxiosRequestConfig['httpsAgent']
  withCredentials?: boolean
}


export const axiosInstance = axios.create()

export function fetch({
  headers,
  method = 'GET',
  withCredentials = true,
  url = `${process.env.API_URL || ''}`,
  path,
  ...data
}: FetchParams): Promise<AxiosResponse> {


  // axiosInstance.interceptors.response.use(
  //   (response) => {
  //     return response
  //   },
  //   (error) => {
  //     return {
  //       error: {
  //         status: error.response?.status,
  //         message: error.response?.statusText,
  //       },
  //     }
  //   }
  // )

  return axiosInstance({
    ...data,
    headers,
    withCredentials,
    method,
    baseURL: url,
    url: path,
  })
}