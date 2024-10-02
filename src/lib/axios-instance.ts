import Axios, { AxiosRequestConfig } from "axios"

export const AXIOS_INSTANCE = Axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL || "",
})

export const axiosInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source()
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled")
  }

  return promise
}

type BasicError = { message: string }

export type ErrorType = BasicError

export type BodyType<BodyData> = BodyData
