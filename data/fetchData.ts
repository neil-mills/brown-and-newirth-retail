import axios, { AxiosError } from 'axios'
import { Product } from '@/app/types'

const fetchData = async (): Promise<Product[]> => {
  const endpoint = `/api/products`
  let data: Product[] = []
  try {
    const chunkUrls = await axios<string[]>(`/api/chunks`)
    try {
      const responses = await Promise.all(
        chunkUrls.data.map(
          async (url) =>
            await axios.get(`${endpoint}?url=${url}`, { timeout: 120000 })
        )
      )
      data = responses.reduce((acc, res) => {
        return [...acc, ...res.data]
      }, [] as Product[])
      return data
    } catch (err) {
      const error = err as AxiosError
      throw new Error(error.message)
    }
  } catch (err) {
    const error = err as AxiosError
    throw new Error(error.message)
  }
}

export default fetchData
