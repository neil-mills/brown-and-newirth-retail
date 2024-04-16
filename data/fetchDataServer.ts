import axios, { AxiosError } from 'axios'
import { Product } from '@/app/types'
import { cache } from 'react'

const fetchDataServer = cache(async (): Promise<Product[]> => {
  let data: Product[] = []
  try {
    const chunkUrls = await axios<string[]>(
      `https://staging.retailer.brownandnewirth.com/wp-json/productData/v1/concat?files-only=1`,
      { timeout: 120000 }
    )
    try {
      const responses = await Promise.all(
        chunkUrls.data.map(
          async (url) => await axios.get(url, { timeout: 120000 })
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
})

export default fetchDataServer
