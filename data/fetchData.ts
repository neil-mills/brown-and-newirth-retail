import axios, { AxiosError } from 'axios'
import { Product } from '@/app/types'

const fetchData = async () => {
  const url = '/api/products'
  const req = await axios.get<Product[]>(url)
  const req2 = await axios.get<Product[]>(url)
  let products: Product[] = []
  const totalChunks = 7
  // const endpoints = Array.from({ length: totalChunks }).map(
  //   (_item, i) => `${url}?chunk=${i + 1}`
  // )
  try {
    const responses = await Promise.all([req, req2])
    products = responses.reduce((acc, res) => {
      return [...acc, ...res.data]
    }, [] as Product[])
  } catch (err) {
    const error = err as AxiosError
    console.log(`Error: ${error.message}`)
  }
  // await wait(4000)
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
