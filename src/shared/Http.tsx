import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
type JSONValue =  string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue };

export class Http {
  instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({ baseURL })
  }
  // read
  get<R = unknown>(url: string, query?: Record<string, string>, config?: Omit<AxiosRequestConfig, 'url' | 'params' | 'method'>) {
    return this.instance.request<R>({ ...config, url: url, params: query, method: 'get' })
  }
  // create
  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'url' |'data' | 'method'>) {
    return this.instance.request<R>({ ...config, url: url, params: data, method: 'post' })
  }
  // update
  patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'url' | 'data'>) {
    return this.instance.request<R>({ ...config, url: url, params: data, method: 'patch' })
  }
  // destroy
  delete<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'params'>) {
    return this.instance.request<R>({ ...config, url: url, params: query, method: 'delete' })
  }
  // CRUD
  // create, read, update, delete
}
export const http = new Http('api/v1')

http.instance.interceptors.response.use(response => {
  console.log(response)
  return response
}, (error) => {
  if(error.response) {
    const axiosError = error as AxiosError
    if(axiosError.response?.status === 429) {
      alert('你太频繁了')
    }
  }
  throw error
})