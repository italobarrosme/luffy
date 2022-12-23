import https from 'https'

if (process.env.NODE_ENV === 'development') {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  })
  axios.defaults.httpsAgent = httpsAgent
}

import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios'

type FetchParams = {
  url?: string
  path: string
  responseType?: AxiosRequestConfig['responseType']
  headers?: AxiosRequestHeaders
  data?: BodyInit | JSON | Record<string, unknown>
  params?: unknown
  method?: AxiosRequestConfig['method']
  httpsAgent?: AxiosRequestConfig['httpsAgent']
}

export function fetch({
  headers,
  method = 'GET',
  url = `${process.env.API_URL || ''}`,
  path,
  ...data
}: FetchParams): Promise<AxiosResponse> {
  const axiosInstance = axios.create()

  return axiosInstance({
    ...data,
    method,
    baseURL: url,
    url: path,
  })
}