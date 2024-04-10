import axios, { AxiosError } from 'axios'
import { Product } from '@/app/types'
axios.defaults.timeout === 120000
import { getBaseUrl } from '@/app/utils'

const fetchData = async (): Promise<Product[] | AxiosError> => {
  const url = `/api/products`
  const req1 = await axios.get<Product[]>(`${url}?chunk=1`)
  const req2 = await axios.get<Product[]>(`${url}?chunk=2`)
  const req3 = await axios.get<Product[]>(`${url}?chunk=3`)
  const req4 = await axios.get<Product[]>(`${url}?chunk=4`)
  const req5 = await axios.get<Product[]>(`${url}?chunk=5`)
  const req6 = await axios.get<Product[]>(`${url}?chunk=6`)
  const req7 = await axios.get<Product[]>(`${url}?chunk=7`)
  let products: Product[] = []
  try {
    const responses = await Promise.all([
      req1,
      req2,
      req3,
      req4,
      req5,
      req6,
      req7,
    ])
    products = responses.reduce((acc, res) => {
      return [...acc, ...res.data]
    }, [] as Product[])
  } catch (err) {
    const error = err as AxiosError
    console.log(`Error: ${error.message}`)
    return error
  }
  return products
}

export default fetchData
