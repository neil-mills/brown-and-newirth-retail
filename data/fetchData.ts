import axios, { AxiosError } from 'axios'
import { Product } from '@/app/types'

const fetchData = async (): Promise<Product[]> => {
  const url = '/api/products'
  const totalChunks = 7
  let products: Product[] = []
  const endpoints = Array.from({ length: totalChunks }).map(
    (_item, i) => `${url}?chunk=${i + 1}`
  )
  try {
    const responses = await axios.all(
      endpoints.map((endpoint) => axios.get(endpoint))
    )
    products = responses.reduce((acc, res) => {
      return [...acc, ...res.data]
    }, [] as Product[])
  } catch (err) {
    const error = err as AxiosError
    console.log(`Error: ${error.message}`)
  }
  return products
}

export default fetchData
