import axios, { AxiosError } from 'axios'
import { Product } from '@/app/types'
axios.defaults.timeout === 120000

const fetchData = async () => {
  const url = '/api/products'
  const req1 = await axios.get<Product[]>(`${url}?chunk=1`)
  const req2 = await axios.get<Product[]>(`${url}?chunk=2`)
  const req3 = await axios.get<Product[]>(`${url}?chunk=3`)
  const req4 = await axios.get<Product[]>(`${url}?chunk=4`)
  const req5 = await axios.get<Product[]>(`${url}?chunk=5`)
  const req6 = await axios.get<Product[]>(`${url}?chunk=6`)
  const req7 = await axios.get<Product[]>(`${url}?chunk=7`)
  let products: Product[] = []
  const totalChunks = 7
  // const requests = Array.from({ length: totalChunks }).map(
  //   async (_item, i) => await axios.get<Product[]>(url)
  // )
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
    console.log(responses)
    products = responses.reduce((acc, res) => {
      return [...acc, ...res.data]
    }, [] as Product[])
  } catch (err) {
    const error = err as AxiosError
    console.log(`Error: ${error.message}`)
  }
  return products
}
/*
const fetchData = async (): Promise<Product[]> => {
  const url = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products`
  const totalChunks = 7
  let products: Product[] = []
  const endpoints = Array.from({ length: totalChunks }).map(
    (_item, i) => `${url}?chunk=${i + 1}`
  )
  try {
    const responses = await axios.all([
      ...endpoints.map((endpoint) => axios.get(endpoint)),
    ])
    products = responses.reduce((acc, res) => {
      return [...acc, ...res.data]
    }, [] as Product[])
  } catch (err) {
    const error = err as AxiosError
    console.log(`Error: ${error.message}`)
  }
  return products
}
*/
export default fetchData
